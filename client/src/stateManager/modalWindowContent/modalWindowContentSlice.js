import { createSlice } from '@reduxjs/toolkit';

export const modalWindowContentSlice = createSlice({
    name: 'modalWindowContent',
    initialState: {
        value: <div className='empty-content'></div>,
    },
    reducers: { 
        setModalContent: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setModalContent } = modalWindowContentSlice.actions;

export default modalWindowContentSlice.reducer;