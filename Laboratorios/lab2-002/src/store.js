import { combineReducers, configureStore } from "@reduxjs/toolkit";
import appSlice from "./Slices/appSlice";
import cartSlice from "./Slices/cartSlice";
import userSlice from "./Slices/userSlice";

const reducers = combineReducers({
    app: appSlice,
    user: userSlice,
    cart: cartSlice
});

const store = configureStore({
    reducer: reducers,
});

export default store;
