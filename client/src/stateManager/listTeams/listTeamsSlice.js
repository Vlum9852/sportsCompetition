import { createSlice } from '@reduxjs/toolkit';

export const listTeamsSlice = createSlice({
    name: "listTeamsSlice",
    initialState: {
        value: [],
    },
    reducers: {
        setListTeams: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { setListTeams } = listTeamsSlice.actions;

export default listTeamsSlice.reducer;