import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import themes from "../utils/theme";

const appSlice = createSlice({
    name: 'app',
    initialState: {
        theme: themes.light,
        language: 'es',
        loading: false,
        promo: "",
    },
    reducers: {
        toLight: (state) => {
            state.theme = themes.light;
        },
        toDark: (state) => {
            state.theme = themes.dark;
        },
        startLoading: (state) => {
            state.loading = true;
        },
        stopLoading: (state) => {
            state.loading = false;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPromo.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPromo.fulfilled, (state, action) => {
                state.loading = false;
                state.promo = action.payload;
            })
            .addCase(fetchPromo.rejected, (state) => {
                state.loading = false;
                alert("ERROR AL PEDIR LAS ALERTAS");
            })
    }
});

export const fetchPromo = createAsyncThunk('promo/fetchPromo', async () => {
    const promoFetch = await fetch("https://api.ticolitas.com/alertas");
    const promoBody = await promoFetch.json();
    return promoBody[0].alerta;
});

export const { toLight, toDark, startLoading, stopLoading } = appSlice.actions;

export default appSlice.reducer;
