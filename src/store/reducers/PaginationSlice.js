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
            let length = action.payload.length;
            state.maxPageNumber = Math.ceil(length / state.numberOfCardsPerPage);
        },
        changePageNumber(state, action) {
            let isForward = action.payload.isForward;
            isForward ? ++state.pageNumber : --state.pageNumber;
        },
    },
});

export const { setMaxPageNumber, changePageNumber } = paginationSlice.actions;

export default paginationSlice.reducer;
