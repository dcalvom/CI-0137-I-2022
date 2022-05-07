import { combineReducers, configureStore } from "@reduxjs/toolkit";
import appSlice from "./Slices/app/appSlice";
import cartSlice from "./Slices/cart/cartSlice";
import userSlice from "./Slices/user/userSlice";

const reducers = combineReducers({
    app: appSlice,
    user: userSlice,
    cart: cartSlice,
})

const store = configureStore({
    reducer: reducers,
});

export default store;
