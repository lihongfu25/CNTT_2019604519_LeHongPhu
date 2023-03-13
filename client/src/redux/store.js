import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./store/userSlice";
// import cartReducer from "../pages/Cart/cartSlice";
// import managerReducer from "../layout/ManagerLayout/managerSlice";
const store = configureStore({
    reducer: {
        // cart: cartReducer,
        user: userReducer,
        // manager: managerReducer,
    },
});

export default store;
