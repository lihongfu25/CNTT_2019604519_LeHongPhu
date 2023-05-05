import { createSlice } from "@reduxjs/toolkit";

export const issueSlice = createSlice({
    name: "issue",
    initialState: [],
    reducers: {
        setIssues: (state, action) => {
            return action.payload;
        },
        removeIssue: (state, action) => {
            return state.filter((issue) => issue.issueId !== action.payload);
        },
    },
});

export const { setIssues, removeIssue } = issueSlice.actions;
export default issueSlice.reducer;
