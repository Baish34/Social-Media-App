import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/register",
        userData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for user login
export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        credentials
      );
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to fetch all users
export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:3000/users");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to fetch user profile and posts
export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/profile", {
        headers: { Authorization: token },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to follow a user
export const followUser = createAsyncThunk(
  "user/followUser",
  async (userId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:3000/follow/${userId}`,
        {},
        {
          headers: { Authorization: token },
        }
      );

      console.log("Follow response data:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const unfollowUser = createAsyncThunk(
  "user/unfollowUser",
  async (userId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:3000/unfollow/${userId}`,
        {},
        {
          headers: { Authorization: token },
        }
      );
      console.log("Unfollow response data:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateAvatar = createAsyncThunk(
  "user/updateAvatar",
  async ({ avatarUrl }, { rejectWithValue, getState }) => {
    try {
      const { user } = getState();
      const userId = user?.userInfo?._id;

      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:3000/user/avatar",
        { avatarUrl, userId },
        {
          headers: { Authorization: token },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


// Async thunk to bookmark a post
export const bookmarkPost = createAsyncThunk(
  "user/bookmarkPost",
  async (postId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:3000/bookmark/${postId}`,
        {},
        { headers: { Authorization: token } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to remove a post from bookmarks
export const removeBookmark = createAsyncThunk(
  "user/removeBookmark",
  async (postId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:3000/bookmark/${postId}`,
        { headers: { Authorization: token } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for protected data (e.g., admin data)
export const fetchProtectedData = createAsyncThunk(
  "user/fetchProtectedData",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/admin/api/data", {
        headers: { Authorization: token },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

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
    bookmarks: [],
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
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(followUser.fulfilled, (state, action) => {
        const userId = action.payload.userId;
        if (!state.following.includes(userId)) {
          state.following.push(userId);
        }
      })
      .addCase(followUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(bookmarkPost.fulfilled, (state, action) => {
        const postId = action.payload.postId;
        if (!state.bookmarks.includes(postId)) {
          state.bookmarks.push(postId);
        }
      })
      .addCase(bookmarkPost.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(removeBookmark.fulfilled, (state, action) => {
        const postId = action.payload.postId;
        state.bookmarks = state.bookmarks.filter((id) => id !== postId);
      })
      .addCase(removeBookmark.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(unfollowUser.fulfilled, (state, action) => {
        const userId = action.payload.userId;
        state.following = state.following.filter((id) => id !== userId);
      })
      .addCase(unfollowUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchProtectedData.fulfilled, (state, action) => {
        state.protectedData = action.payload;
      })
      .addCase(fetchProtectedData.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateAvatar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = {
          ...state.userInfo,
          avatar: action.payload.avatar,
        };
      })
      .addCase(updateAvatar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update avatar";
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
