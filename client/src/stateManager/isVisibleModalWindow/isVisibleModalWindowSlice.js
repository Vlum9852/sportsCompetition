import { createSlice } from '@reduxjs/toolkit';

export const isVisibleModalWindowSlice = createSlice({
    name: 'isVisibleModalWindow',
    initialState: {
        value: false,
    },
    reducers: { 
        setVisibleModal: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setVisibleModal } = isVisibleModalWindowSlice.actions;

export default isVisibleModalWindowSlice.reducer;