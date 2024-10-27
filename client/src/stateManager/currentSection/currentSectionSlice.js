import { createSlice } from '@reduxjs/toolkit';

export const currentSectionSlice = createSlice({
    name: 'currentSection',
    initialState: {
        value: 'teams',
    },
    reducers: {
        setCurrentSection: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setCurrentSection } = currentSectionSlice.actions;

export default currentSectionSlice.reducer;