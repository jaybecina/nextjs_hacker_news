import { configureStore } from "@reduxjs/toolkit";
import articleReducer from "./Articles/articleSlice";
export const store = configureStore({
  reducer: {
    article: articleReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
