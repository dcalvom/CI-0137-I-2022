import { createSlice } from "@reduxjs/toolkit";
import { itemReducers } from "./reducers";
import { createItem, onCreateItemFullfiled, onCreateItemRejected } from "./requests/createItem";

const itemSlice = createSlice({
    name: 'item',
    initialState: {
        item: null,
        success: false,
        errorMessage: "",
    },
    reducers: itemReducers,
    extraReducers(builder) {
        builder
            .addCase(createItem.fulfilled, onCreateItemFullfiled)
            .addCase(createItem.rejected, onCreateItemRejected)
    }
});

export const { clearState } = itemSlice.actions;

export default itemSlice.reducer;
