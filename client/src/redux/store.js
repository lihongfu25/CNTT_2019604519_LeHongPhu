import { configureStore } from "@reduxjs/toolkit";
import issueReducer from "./store/issueSlice";
import loginReducer from "./store/loginSlice";
import notificationReducer from "./store/notificationSlice";
import projectReducer from "./store/projectSlice";
import roleReducer from "./store/roleSlice";
import tabReducer from "./store/tabSlice";
import userReducer from "./store/userSlice";
import usersReducer from "./store/usersSlice";
const store = configureStore({
    reducer: {
        tab: tabReducer,
        role: roleReducer,
        user: userReducer,
        login: loginReducer,
        users: usersReducer,
        issue: issueReducer,
        project: projectReducer,
        notification: notificationReducer,
    },
});

export default store;
