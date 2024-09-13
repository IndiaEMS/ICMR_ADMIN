import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    signupData: null,
    loading: false,
    // No need to JSON.parse the token as it's a string, not a JSON object
    token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
    // The user object can be JSON, so JSON.parse is fine for the user data
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setSignupData(state, value) {
            state.signupData = value.payload;
        },
        setLoading(state, value) {
            state.loading = value.payload;
        },
        setToken(state, value) {
            state.token = value.payload;
        },
        setUser(state, value) {
            state.user = value.payload;
        },
    },
});

export const { setSignupData, setLoading, setToken, setUser } = authSlice.actions;

export default authSlice.reducer;
