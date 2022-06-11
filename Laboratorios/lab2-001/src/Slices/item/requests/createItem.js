import { createAsyncThunk } from "@reduxjs/toolkit";

export const createItem = createAsyncThunk('item/createItem', async ({ item, foto }) => {
    const form = new FormData();
    form.append('file', foto);
    const uploadFetch = await fetch('http://localhost:7500/upload', {
        method: 'POST',
        body: form,
    });
    const uploadData = await uploadFetch.json();
    item.foto = uploadData.url;
    const itemFetch = await fetch('http://localhost:7500/items', {
        method: 'POST',
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(item),
    });
    const itemData = await itemFetch.json();
    if (itemFetch.status === 200) {
        return itemData;
    } else {
        return {
            error: true,
            message: itemData.error.message,
        }
    }
});

export const onCreateItemFullfiled = (state, action) => {
    if (action.payload.error) {
        state.success = false;
        state.item = null;
        state.errorMessage = action.payload.message;
    } else {
        state.success = true;
        state.item = action.payload;
    }
};

export const onCreateItemRejected = (state) => {
    state.success = false;
    state.item = null;
}