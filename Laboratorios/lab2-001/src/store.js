import { combineReducers, configureStore } from "@reduxjs/toolkit";
import appSlice from "./Slices/app/appSlice";
import cartSlice from "./Slices/cart/cartSlice";
import userSlice from "./Slices/user/userSlice";
import itemSlice from "./Slices/item/itemSlice";

const reducers = combineReducers({
    app: appSlice,
    user: userSlice,
    cart: cartSlice,
    item: itemSlice,
})

const store = configureStore({
    reducer: reducers,
});

export default store;
