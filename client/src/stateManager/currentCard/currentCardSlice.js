import { createSlice } from '@reduxjs/toolkit';

export const currentCardSlice = createSlice({
    name: 'currentCard',
    initialState: {
        value: -1,
    },
    reducers: {
        setCurrentCard: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setCurrentCard } = currentCardSlice.actions;

export default currentCardSlice.reducer;