import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPokemons = createAsyncThunk(
  "pokemon/fetchPokemons",
  async () => {
    const ids = Array.from({ length: 151 }, (_, i) => i + 1);

    const pokemons = await Promise.all(
      ids.map(async (id) => {
        const pokemonRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokemonData = await pokemonRes.json();

        const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
        const speciesData = await speciesRes.json();

        const nameKo =
          speciesData.names.find((n) => n.language.name === "ko")?.name || "";

        const description =
          speciesData.flavor_text_entries.find((el) => el.language.name === "ko")
            ?.flavor_text ||
          speciesData.flavor_text_entries.find((el) => el.language.name === "en")
            ?.flavor_text ||
          "";

        return {
          id,
          name: pokemonData.name,
          nameKo,
          frontImage: pokemonData.sprites.front_default,
          backImage: pokemonData.sprites.back_default,
          description,
        };
      })
    );

    return pokemons;
  }
);


const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemons.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchPokemons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default pokemonSlice.reducer;
