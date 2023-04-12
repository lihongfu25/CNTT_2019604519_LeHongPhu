import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./store/userSlice";
import usersReducer from "./store/usersSlice";
import tabReducer from "./store/tabSlice";
import issueReducer from "./store/issueSlice";
import projectReducer from "./store/projectSlice";
import notificationReducer from "./store/notificationSlice";
const store = configureStore({
    reducer: {
        tab: tabReducer,
        user: userReducer,
        users: usersReducer,
        issue: issueReducer,
        project: projectReducer,
        notification: notificationReducer,
    },
});

export default store;
