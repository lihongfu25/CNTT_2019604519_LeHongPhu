import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./store/userSlice";
import tabReducer from "./store/tabSlice";
const store = configureStore({
    reducer: {
        tab: tabReducer,
        user: userReducer,
    },
});

export default store;
