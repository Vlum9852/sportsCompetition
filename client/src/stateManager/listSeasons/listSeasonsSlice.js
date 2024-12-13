import { createSlice } from '@reduxjs/toolkit';

export const listSeasonsSlice = createSlice({
    name: "listSeasons",
    initialState: {
        value: [],
    },
    reducers: {
        setListSeasons: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { setListSeasons } = listSeasonsSlice.actions;

export default listSeasonsSlice.reducer;