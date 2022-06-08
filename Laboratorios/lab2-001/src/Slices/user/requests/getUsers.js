import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUsers = createAsyncThunk('usuarios/getUsers', async (params, { getState }) => {
    const state = getState();
    const usersFetch = await fetch('http://localhost:7500/users', {
        headers: {
            "Authorization": `Bearer ${state.user.user.token}`,
            "Content-type": "application/json",
        },
    });
    const usersData = await usersFetch.json();
    console.log("usersDate: ", usersData);
    if (usersFetch.status === 200) {
        return usersData;
    } else {
        return {
            error: true,
            message: usersData.error.message,
        }
    }
});

export const onGetUsersFullfiled = (state, action) => {
    if (action.payload.error) {
        state.users = null;
        state.errorMessage = action.payload.message;
    } else {
        state.users = action.payload;
    }
};

export const onGetUsersRejected = (state) => {
    state.users = null;
}