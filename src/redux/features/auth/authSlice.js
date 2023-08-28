import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

import { axiosPublicInstance } from "../../../configs/axios";

import { retrieveAccessToken } from "../../../configs/helpers";

const initialState = {
    loading: false,
    user: {
        isAuthenticated: Boolean(retrieveAccessToken()?.token),
        username: retrieveAccessToken()?.username,
        token: retrieveAccessToken()?.token,
        exp: retrieveAccessToken()?.exp,
    },
};

export const registerUser = createAsyncThunk("auth/register", (payload) => {
    return axiosPublicInstance.post("/api/auth/register", payload).then(({ data }) => {
        const token = data.data.accessToken;

        localStorage.setItem("token", token);
        const { username, exp } = jwtDecode(token);

        return { username, token, exp };
    });
});

export const loginUser = createAsyncThunk("auth/login", (payload) => {
    console.log("Logging user", payload);

    return axiosPublicInstance.post("/api/auth/login", payload).then(({ data }) => {
        const token = data.accessToken;

        localStorage.setItem("token", token);
        const { username, exp } = jwtDecode(token);

        return { username, token, exp };
    });
});

export const refreshUser = createAsyncThunk("auth/refresh", (setIsAuthenticated) => {
    return axiosPublicInstance.get("/api/auth/refresh", { withCredentials: true }).then(({ data }) => {
        localStorage.setItem("token", data.accessToken);
        setIsAuthenticated(true);

        const { username, token, exp } = retrieveAccessToken();
        return { username, token, exp };
    });
});

export const logoutUser = createAsyncThunk("auth/logout", () => {
    return axiosPublicInstance.get("/api/auth/logout").then(() => {
        localStorage.removeItem("token");

        return;
    });
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user.isAuthenticated = true;
            state.user.username = action.payload.username;
            state.user.token = action.payload.token;
            state.user.exp = action.payload.exp;
        });
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user.isAuthenticated = true;
            state.user.username = action.payload.username;
            state.user.token = action.payload.token;
            state.user.exp = action.payload.exp;
        });
        builder.addCase(refreshUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(refreshUser.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.username = action.payload.username;
            state.token = action.payload.token;
            state.exp = action.payload.exp;
        });
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.isAuthenticated = false;
            state.username = null;
            state.token = null;
            state.exp = null;
        });
    },
});

export default authSlice.reducer;
