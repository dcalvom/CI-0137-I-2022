export const itemReducers = {
    clearState: (state) => {
        state.item = null;
        state.success = false;
        state.errorMessage = "";
    }
};