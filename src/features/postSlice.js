import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/posts";

// Async thunk to fetch all posts
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

// Async thunk to fetch posts by user ID
export const fetchUserPosts = createAsyncThunk(
  "posts/fetchUserPosts",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3000/posts/user/${userId}`);
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to like a post
export const likePosts = createAsyncThunk("posts/likePosts", async (postId, { rejectWithValue }) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(
      `http://localhost:3000/like/${postId}`,
      {},
      {
        headers: { Authorization: token },
      }
    );
    return { postId, ...response.data };
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Async thunk to unlike a post
export const unlikePosts = createAsyncThunk("posts/unlikePosts", async (postId, { rejectWithValue }) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(
      `http://localhost:3000/like/${postId}`,
      {},
      {
        headers: { Authorization: token },
      }
    );
    return { postId, ...response.data };
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Async thunk to create a new post
export const createPost = createAsyncThunk(
  "posts/createPost",
  async (postData) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(API_URL, postData, {
      headers: { Authorization: token },
    });
    return response.data;
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUserPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload; 
      })
      .addCase(fetchUserPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(likePosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(likePosts.fulfilled, (state, action) => {
        state.loading = false;
        const post = state.posts.find(post => post._id === action.payload.postId);
        if (post) {
          post.likes = action.payload.likes;
        }
      })
      .addCase(likePosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(unlikePosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(unlikePosts.fulfilled, (state, action) => {
        state.loading = false;
        const post = state.posts.find(post => post._id === action.payload.postId);
        if (post) {
          post.likes = action.payload.likes;
        }
      })
      .addCase(unlikePosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default postSlice.reducer;
