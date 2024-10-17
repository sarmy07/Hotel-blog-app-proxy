import { configureStore } from "@reduxjs/toolkit";
import { blogApi } from "./features/blogs/blogsApi";
import { authApi } from "./features/auth/authApi";
import authReducer from "./features/auth/authSlice";
import { commentApi } from "./features/comments/commentApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      blogApi.middleware,
      authApi.middleware,
      commentApi.middleware
    ),
  devTools: process.env.NODE_ENV !== "production",
});
