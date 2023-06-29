import { configureStore } from "@reduxjs/toolkit";
import tmdbSlice from "../features/tmdb/tmdbSlice";

export const store = configureStore({
  reducer: {
    tmdb: tmdbSlice,
  },
});
