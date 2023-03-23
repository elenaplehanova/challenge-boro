import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    deletedCards: [],
};

const deletedCardsSlice = createSlice({
    name: "deletedCards",
    initialState,
    reducers: {
        addNewDeletedCard(state, action) {
            state.deletedCards.push(action.payload.card);
        },
        resetDeletedCards(state) {
            state.deletedCards = initialState.deletedCards;
        },
    },
});

export const { addNewDeletedCard, resetDeletedCards } = deletedCardsSlice.actions;

export default deletedCardsSlice.reducer;
