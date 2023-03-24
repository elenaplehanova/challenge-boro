import { combineReducers, configureStore } from "@reduxjs/toolkit";
import catalogReducer from "./reducers/CatalogSlice";
import deletedCardsReducer from "./reducers/DeletedCardsSlice";
import paginationReducer from "./reducers/PaginationSlice";
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["deletedCardsReducer"],
};

const rootReducer = combineReducers({
    catalogReducer,
    deletedCardsReducer,
    paginationReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
