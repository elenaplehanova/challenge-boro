import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pageNumber: 1,
    maxPageNumber: 1,
    numberOfCardsPerPage: 15,
};

const paginationSlice = createSlice({
    name: "pagination",
    initialState,
    reducers: {
        setMaxPageNumber(state, action) {
            let catalog = action.payload.catalog;
            let deletedCards = action.payload.deletedCards;
            state.maxPageNumber = Math.ceil(
                (catalog.length - deletedCards.length) / state.numberOfCardsPerPage
            );
        },
        changePageNumber(state, action) {
            let isForward = action.payload.isForward;
            state.pageNumber = isForward ? ++state.pageNumber : --state.pageNumber;
        },
    },
});

export const { setMaxPageNumber, changePageNumber } = paginationSlice.actions;

export default paginationSlice.reducer;
