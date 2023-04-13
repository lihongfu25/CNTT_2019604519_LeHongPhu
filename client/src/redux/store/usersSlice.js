import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
    name: "users",
    initialState: [],
    reducers: {
        setUsers: (action) => {
            return action.payload;
        },
    },
});

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;