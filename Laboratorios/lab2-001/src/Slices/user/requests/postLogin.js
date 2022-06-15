import { createAsyncThunk } from "@reduxjs/toolkit";
import Mixpanel from "../../../services/mixpanel";

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

export const onPostLoginFullfiled = (state, action) => {
    if (action.payload.error) {
        state.userIsLoggedIn = false;
        state.user = null;
        state.errorMessage = action.payload.message;
    } else {
        Mixpanel.identify(action.payload.id);
        Mixpanel.people.set({
            $name: action.payload.name,
            $email: action.payload.email,
            birthdate: action.payload.birthday,
        });
        state.userIsLoggedIn = true;
        state.user = action.payload;
    }
};

export const onPostLoginRejected = (state) => {
    state.userIsLoggedIn = false;
    state.user = null;
}