import { createSlice } from "@reduxjs/toolkit";

export const projectSlice = createSlice({
    name: "project",
    initialState: [],
    reducers: {
        setProjects: (state, action) => {
            return action.payload;
        },
    },
});

export const { setProjects } = projectSlice.actions;
export default projectSlice.reducer;
