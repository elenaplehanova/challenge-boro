import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    catalog: [],
};

const catalogSlice = createSlice({
    name: "catalog",
    initialState,
    reducers: {
        fillCatalog(state, action) {
            state.catalog = action.payload.catalog;
        },
        resetCatalog(state) {
            let newCatalog = state.catalog.map((item) => {
                return item.deleted ? { ...item, deleted: false } : item;
            });

            state.catalog = newCatalog;
        },
        deleteCardFromCatalog(state, action) {
            let card = action.payload.card;
            let newCatalog = state.catalog.map((item) => {
                return item.image === card.image ? { ...item, deleted: true } : item;
            });

            state.catalog = newCatalog;
        },
        markDeletedCards(state, action) {
            let deletedCards = action.payload.deletedCards;
            let newCatalog = state.catalog;
            deletedCards.forEach((deletedCard) => {
                const index = newCatalog.findIndex((card) => card.image === deletedCard.image);
                newCatalog[index] = { ...newCatalog[index], deleted: true };
            });

            state.catalog = newCatalog;
        },
    },
});

export const { deleteCardFromCatalog, fillCatalog, resetCatalog, markDeletedCards } =
    catalogSlice.actions;

export default catalogSlice.reducer;
