import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        itemsCount: 0,
        cart: [],
    },
    reducers: {
        addItemToCart: (state, action) => {
            state.itemsCount += action.payload.product.quantity;
            state.cart.push(action.payload.product);
        },
        removeItemFromCart: (state, action) => {
            state.itemsCount -= action.payload.product.quantity;
            state.cart = state.cart.filter(item => {
                return item.product.id !== action.payload.product.product.id;
            });
        },
        emptyCar: (state) => {
            state.itemsCount = 0;
            state.cart = [];
        }
    }
});

export const { addItemToCart, removeItemFromCart } = cartSlice.actions;

export default cartSlice.reducer;
