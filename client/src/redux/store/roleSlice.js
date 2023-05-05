import { createSlice } from "@reduxjs/toolkit";

export const roleSlice = createSlice({
    name: "role",
    initialState: [],
    reducers: {
        setRoles: (state, action) => {
            return action.payload;
        },
    },
});

export const { setRoles } = roleSlice.actions;
export default roleSlice.reducer;
