import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        users: [],
        isLoggedIn: false,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isLoggedIn = false;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(postLogin.fulfilled, (state, action) => {
                if (action.payload.error) {
                    state.userIsLoggedIn = false;
                    state.user = null;
                    state.errorMessage = action.payload.message;
                } else {
                    state.userIsLoggedIn = true;
                    state.user = action.payload;
                }
            })
            .addCase(postLogin.rejected, (state) => {
                state.userIsLoggedIn = false;
                state.user = null;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                if (action.payload.error) {
                    state.users = [];
                    state.errorMessage = action.payload.message;
                } else {
                    state.users = action.payload;
                }
            })
            .addCase(getAllUsers.rejected, (state) => {
                state.users = [];
            })
    }
});

export const { logout } = userSlice.actions;

export const postLogin = createAsyncThunk('usuarios/postLogin', async (credentials) => {
    const loginFetch = await fetch('http://localhost:7500/users/login', {
        method: 'POST',
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            email: credentials.username,
            password: credentials.password,
        }),
    });
    const userData = await loginFetch.json();
    if (loginFetch.status === 200) {
        return userData;
    } else {
        return {
            error: true,
            message: userData.error.message,
        }
    }
});

export const getAllUsers = createAsyncThunk('usuarios/getAllUsers', async (params, { getState }) => {
    const state = getState();
    console.log(state);
    const usersFetch = await fetch('http://localhost:7500/users', {
        headers: {
            Authorization: `Bearer ${state.user.user.token}`
        }
    });
    const usersData = await usersFetch.json();
    if (usersFetch.status === 200) {
        return usersData;
    } else {
        return {
            error: true,
            message: usersData.error.message,
        }
    }
});

export default userSlice.reducer;
