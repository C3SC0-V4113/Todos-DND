import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "./";

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
