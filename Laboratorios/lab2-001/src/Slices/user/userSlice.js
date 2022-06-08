import { createSlice } from "@reduxjs/toolkit";
import { userReducers } from "./reducers";
import { getUsers, onGetUsersFullfiled, onGetUsersRejected } from "./requests/getUsers";
import { onPostLoginFullfiled, onPostLoginRejected, postLogin } from "./requests/postLogin";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        userIsLoggedIn: false,
        errorMessage: "",
        users: null,
    },
    reducers: userReducers,
    extraReducers(builder) {
        builder
            .addCase(postLogin.fulfilled, onPostLoginFullfiled)
            .addCase(postLogin.rejected, onPostLoginRejected)
            .addCase(getUsers.fulfilled, onGetUsersFullfiled)
            .addCase(getUsers.rejected, onGetUsersRejected)
    }
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
