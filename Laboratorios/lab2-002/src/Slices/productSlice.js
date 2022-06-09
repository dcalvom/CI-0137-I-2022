import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: 'product',
    initialState: {
        success: false,
        product: null,
        errorMessage: null,
    },
    reducers: {
        cleanState: (state) => {
            state.success = false;
            state.product = null;
            state.errorMessage = null;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(createProduct.fulfilled, (state, action) => {
                if (action.payload.error) {
                    state.success = false;
                    state.product = null;
                    state.errorMessage = action.payload.message;
                } else {
                    state.success = true;
                    state.product = action.payload;
                    state.errorMessage = null;
                }
            })
            .addCase(createProduct.rejected, (state) => {
                state.success = false;
                state.product = null;
                state.errorMessage = "Ocurrió un error al crear el producto.";
            })
    }
});

export const { cleanState } = productSlice.actions;

export const createProduct = createAsyncThunk('products/createProduct', async ({ product, productPicture }) => {
    const formData = new FormData();
    formData.append('file', productPicture);
    const uploadFileFetch = await fetch('http://localhost:7500/upload', {
        method: 'POST',
        body: formData,
    });
    const uploadFileData = await uploadFileFetch.json();
    product.picture = uploadFileData.url;
    const createProductFetch = await fetch('http://localhost:7500/products', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product),
    });
    const productData = await createProductFetch.json();
    if (createProductFetch.status === 200) {
        return productData;
    } else {
        return {
            error: true,
            message: productData.error.message,
        }
    }
});

export default productSlice.reducer;
