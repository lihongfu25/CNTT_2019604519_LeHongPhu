import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
    name: "notification",
    initialState: [],
    reducers: {
        setNotifications: (state, action) => {
            return action.payload;
        },
    },
});

export const { setNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
