import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    ids: [],
  },
  reducers: {
    addToFavorite: (state, action) => {
      const id = action.payload;
      if (!state.ids.includes(id)) state.ids.push(id);
    },
    removeFromFavorite: (state, action) => {
      const id = action.payload;
      state.ids = state.ids.filter((x) => x !== id);
    },
    toggleFavorite: (state, action) => {
      const id = action.payload;
      if (state.ids.includes(id)) {
        state.ids = state.ids.filter((x) => x !== id);
      } else {
        state.ids.push(id);
      }
    },
  },
});

export const { addToFavorite, removeFromFavorite, toggleFavorite } =
  favoriteSlice.actions;

export default favoriteSlice.reducer;

export const selectFavoriteIds = (state) => state.favorite.ids;

export const selectFavoritePokemons = (state) => {
  const ids = state.favorite.ids;
  return state.pokemon.list.filter((p) => ids.includes(p.id));
};
