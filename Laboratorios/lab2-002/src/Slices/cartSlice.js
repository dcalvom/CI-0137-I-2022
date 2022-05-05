import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        countOfItems: 0,
    },
    reducers: {
        addItem: (state) => {
            state.countOfItems++;
        },
        removeItem: (state) => {
            state.countOfItems--;
        },
    },
});

export const { addItem, removeItem,} = cartSlice.actions;

export default cartSlice.reducer;
