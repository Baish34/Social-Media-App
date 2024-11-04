import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import postReducer from "../features/postSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    posts: postReducer,
  },
});
