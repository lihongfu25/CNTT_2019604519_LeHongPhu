import { createSlice } from "@reduxjs/toolkit";

export const issueSlice = createSlice({
    name: "issue",
    initialState: [],
    reducers: {
        setIssues: (state, action) => {
            return action.payload;
        },
    },
});

export const { setIssues } = issueSlice.actions;
export default issueSlice.reducer;
