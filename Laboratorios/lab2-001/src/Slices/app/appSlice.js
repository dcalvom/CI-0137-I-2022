import { createSlice } from "@reduxjs/toolkit";
import themes from "../../utils/themes";
import { postLogin } from "../user/requests/postLogin";

const appSlice = createSlice({
    name: 'app',
    initialState: {
        theme: themes.light,
        currentTheme: "light",
        language: 'es',
        loading: false,
    },
    reducers: {
        switchTheme: (state) => {
            const newTheme = state.currentTheme === "light" ? "dark" : "light";
            state.currentTheme = newTheme;
            state.theme = themes[newTheme];
        },
        toggleLoading: (state) => {
            state.loading = !state.loading;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(postLogin.pending, (state) => {
                state.loading = true;
            })
            .addCase(postLogin.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(postLogin.rejected, (state) => {
                state.loading = false;
            })
    }
});

export const { switchTheme, toggleLoading } = appSlice.actions;

export default appSlice.reducer;
