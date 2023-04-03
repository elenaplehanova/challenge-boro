import { createSlice } from "@reduxjs/toolkit";
import uuid from "react-uuid";

const initialState = {
    catalog: [],
    packOfCards: [],
    catalogAsTree: [],
};

function byField(fieldName) {
    return (a, b) => (a[fieldName] > b[fieldName] ? 1 : -1);
}

const catalogSlice = createSlice({
    name: "catalog",
    initialState,
    reducers: {
        fillCatalog(state, action) {
            state.catalog = action.payload.catalog.map((item) => {
                return { ...item, filename: item.image.split("/").at(-1) };
            });
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
            let newCatalog = [...state.catalog];
            deletedCards.forEach((deletedCard) => {
                const index = newCatalog.findIndex((card) => card.image === deletedCard.image);
                newCatalog[index] = { ...newCatalog[index], deleted: true };
            });

            state.catalog = newCatalog;
        },
        setNewPackOfCards(state, action) {
            let pageNumber = action.payload.pageNumber - 1;
            let numberOfCardsPerPage = action.payload.numberOfCardsPerPage;
            let catalogWithoutDeleted = state.catalog.filter((card) => !card.deleted);

            state.packOfCards = catalogWithoutDeleted.slice(
                pageNumber * numberOfCardsPerPage,
                pageNumber * numberOfCardsPerPage + numberOfCardsPerPage
            );
        },
        filterCatalogByField(state, action) {
            let field = action.payload.field;
            state.catalog.sort(byField(field));
        },
        fillCatalogAsTree(state) {
            let categoriesMap = new Map();
            [...state.catalog].sort(byField("category")).forEach((item) => {
                if (categoriesMap.has(item.category)) {
                    let oldValue = categoriesMap.get(item.category);
                    categoriesMap.set(item.category, [...oldValue, { ...item }]);
                } else {
                    categoriesMap.set(item.category, [{ ...item }]);
                }
            });

            state.catalogAsTree = [
                {
                    id: uuid(),
                    name: "Images",
                    children: Array.from(categoriesMap, ([name, children]) => ({
                        id: uuid(),
                        name,
                        children,
                    })),
                },
            ];
        },
    },
});

export const {
    deleteCardFromCatalog,
    fillCatalog,
    filterCatalogByField,
    fillCatalogAsTree,
    resetCatalog,
    setNewPackOfCards,
    markDeletedCards,
} = catalogSlice.actions;

export default catalogSlice.reducer;
