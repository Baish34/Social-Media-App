import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
    "auth/register",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                "https://social-media-app-backend-omega.vercel.app/user/register",
                userData
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message || "Registration failed");
        }
    }
);

export const loginUser = createAsyncThunk(
    "auth/login",
    async (loginData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                "https://social-media-app-backend-omega.vercel.app/user/login",
                { ...loginData, secret: "supersecretkey" } 
            );
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
            }
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Login failed");
        }
    }
);


const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: localStorage.getItem("token") || null,
        status: "idle",
        error: null,
    },
    reducers: {
        logout: (state) => {
            localStorage.removeItem("token");
            state.user = null;
            state.token = null;
            state.status = "idle";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.status = "succeeded";
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(loginUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.token = action.payload.token;
                state.user = action.payload.user;
                state.status = "succeeded";
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
