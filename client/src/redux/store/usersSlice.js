import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
    name: "users",
    initialState: [],
    reducers: {
        setUsers: (state, action) => {
            return action.payload;
        },
        setUserRole: (state, action) => {
            return state.map((user) => {
                if (user.userId === action.payload.userId)
                    return { ...user, roleId: action.payload.roleId };
                else return user;
            });
        },
        removeUser: (state, action) => {
            return state.filter((user) => user.userId !== action.payload);
        },
        addUser: (state, action) => {
            return [...state, action.payload];
        },
    },
});

export const { setUsers, setUserRole, removeUser, addUser } =
    usersSlice.actions;
export default usersSlice.reducer;
