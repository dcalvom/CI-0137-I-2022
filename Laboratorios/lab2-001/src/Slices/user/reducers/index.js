export const userReducers = {
    logout: (state) => {
        state.userIsLoggedIn = false;
        state.user = null;
    }
};