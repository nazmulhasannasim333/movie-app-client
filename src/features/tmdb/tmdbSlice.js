import { createSlice } from "@reduxjs/toolkit";

export const tmdbSlice = createSlice({
  name: "tmdb",
  initialState: {
    url: {},
    genres: {},
  },
  reducers: {
    getApiConfigaration: (state, action) => {
      state.url = action.payload;
    },
    getGenres: (state, action) => {
      state.genres = action.payload;
    },
  },
});

export const { getApiConfigaration, getGenres } = tmdbSlice.actions;

export default tmdbSlice.reducer;
