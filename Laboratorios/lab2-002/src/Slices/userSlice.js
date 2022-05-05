import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        isLoggedIn: false,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isLoggedIn = false;
        },
        login: (state) => {
            state.isLoggedIn = true;
        }
    }
});

export const { logout, login } = userSlice.actions;

export default userSlice.reducer;
