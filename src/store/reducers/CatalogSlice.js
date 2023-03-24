import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    catalog: [],
    packOfCards: [],
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

            function byField(fieldName) {
                return (a, b) => (a[fieldName] > b[fieldName] ? 1 : -1);
            }

            state.catalog = state.catalog.sort(byField(field));
        },
    },
});

export const {
    deleteCardFromCatalog,
    fillCatalog,
    filterCatalogByField,
    resetCatalog,
    setNewPackOfCards,
    markDeletedCards,
} = catalogSlice.actions;

export default catalogSlice.reducer;
