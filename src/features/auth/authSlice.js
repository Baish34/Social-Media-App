import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk("auth/register", async(userData) => {
    const response = await axios.post("https://social-media-app-backend-omega.vercel.app/user/register", userData)
    return response.data
})

export const loginUser = createAsyncThunk("auth/login", async (loginData) => {
    const response = await axios.post("https://social-media-app-backend-omega.vercel.app/user/login", loginData);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  });

  const authSlice = createSlice({
    name: "auth",
    initialState: { user: null, token: localStorage.getItem("token") || null, status: "idle", error: null },
    reducers: {
      logout: (state) => {
        localStorage.removeItem("token");
        state.user = null;
        state.token = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(registerUser.fulfilled, (state, action) => {
          state.status = "succeeded";
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          state.token = action.payload.token;
        });
    },
  });
  
  export const { logout } = authSlice.actions;
  export default authSlice.reducer;