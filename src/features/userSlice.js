import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for user registration
export const registerUser = createAsyncThunk("user/register", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post("http://localhost:3000/register", userData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Async thunk for user login
export const loginUser = createAsyncThunk("user/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post("http://localhost:3000/login", credentials);
    localStorage.setItem("token", response.data.token); 
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Async thunk to fetch all users
export const fetchUsers = createAsyncThunk("user/fetchUsers", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("http://localhost:3000/users");
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Async thunk to fetch user profile and posts
export const fetchUserProfile = createAsyncThunk("user/fetchUserProfile", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:3000/profile", {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Async thunk for following a user
export const followUser = createAsyncThunk(
  "user/followUser",
  async (userId, { getState, rejectWithValue }) => {
    const { user } = getState(); // Access the current user state
    try {
      const response = await axios.post(`http://localhost:3000/follow/${userId}`, {}, {
        headers: {
          Authorization: `Bearer ${user.token}`, // Use token for authorization
        },
      });
      return response.data; // Return the response data
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle error
    }
  }
);

// Async thunk for unfollowing a user
export const unfollowUser = createAsyncThunk(
  "user/unfollowUser",
  async (userId, { getState, rejectWithValue }) => {
    const { user } = getState(); // Access the current user state
    try {
      const response = await axios.post(`http://localhost:3000/unfollow/${userId}`, {}, {
        headers: {
          Authorization: `Bearer ${user.token}`, // Use token for authorization
        },
      });
      return response.data; // Return the response data
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle error
    }
  }
);


// Async thunk for protected data (e.g., admin data)
export const fetchProtectedData = createAsyncThunk("user/fetchProtectedData", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:3000/admin/api/data", {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,       
    token: localStorage.getItem("token") || null, 
    status: "idle",
    error: null,
    users: [],           
    protectedData: null, 
    profile: null,
    following: [],
  },
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      state.token = null;
      localStorage.removeItem("token"); 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userInfo = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userInfo = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.payload;
      })
      
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload; // Stores profile and posts data
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(followUser.fulfilled, (state, action) => {
        state.following.push(action.payload.userId); // Add the followed user to the following list
      })
      .addCase(followUser.rejected, (state, action) => {
        state.error = action.payload; // Handle any errors during follow
      })
      .addCase(unfollowUser.fulfilled, (state, action) => {
        state.following = state.following.filter((id) => id !== action.payload.userId); // Remove the unfollowed user from the following list
      })
      .addCase(unfollowUser.rejected, (state, action) => {
        state.error = action.payload; // Handle any errors during unfollow
      })
      .addCase(fetchProtectedData.fulfilled, (state, action) => {
        state.protectedData = action.payload;
      })
      .addCase(fetchProtectedData.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
