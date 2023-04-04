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
            if (state.pageNumber > state.maxPageNumber) {
                state.pageNumber = state.maxPageNumber;
            }
        },
        setPageNumber(state, action) {
            state.pageNumber = action.payload.pageNumber;
        },
    },
});

export const { setMaxPageNumber, setPageNumber } = paginationSlice.actions;

export default paginationSlice.reducer;
