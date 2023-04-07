import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentTab: undefined,
};

export const tabSlice = createSlice({
    name: "tab",
    initialState: initialState,
    reducers: {
        changeCurrentTab: (state, action) => {
            state.currentTab = action.payload;
        },
    },
});

export const { changeCurrentTab } = tabSlice.actions;
export default tabSlice.reducer;
