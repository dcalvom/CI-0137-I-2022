import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import appSlice from "./Slices/appSlice";
import cartSlice from "./Slices/cartSlice";
import userSlice from "./Slices/userSlice";

const reducers = combineReducers({
  app: appSlice,
  user: userSlice,
  cart: cartSlice,
});

const rootPersistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(rootPersistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
