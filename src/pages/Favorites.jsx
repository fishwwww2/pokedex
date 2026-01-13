import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemons } from "../RTK/pokemonSlice";
import { selectFavoritePokemons } from "../RTK/favoriteSlice";
import DetailModal from "../components/DetailModal";
import FavoriteButton from "../components/favoriteButton";
import "../styles/card.css";

export default function Favorites() {
  const dispatch = useDispatch();
  const favoritePokemons = useSelector(selectFavoritePokemons);
  const { list, loading } = useSelector((state) => state.pokemon);

  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    if (list.length === 0) dispatch(fetchPokemons());
  }, [dispatch, list.length]);

  if (loading) return <p className="text-center mt-20">로딩 중...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold mb-6">내 찜 목록</h2>

      {favoritePokemons.length === 0 ? (
        <p className="text-gray-500">아직 찜한 포켓몬이 없습니다.</p>
      ) : (
        <section className="p-6 bg-gray-50 min-h-screen">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-4">
            {favoritePokemons.map((pokemon) => (
              <div
                key={pokemon.id}
                className="pokemon-card"
                onClick={() => setSelectedPokemon(pokemon)}
              >
                <FavoriteButton pokemonId={pokemon.id} />

                <img
                  src={pokemon.frontImage}
                  alt={pokemon.nameKo || pokemon.name}
                  className="pokemon-img"
                />

                <span className="pokemon-id">
                  {pokemon.id.toString().padStart(3, "0")}
                </span>

                <h2 className="pokemon-name">{pokemon.nameKo || pokemon.name}</h2>
              </div>
            ))}
          </div>
        </section>
      )}

      {selectedPokemon && (
        <DetailModal
          pokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />
      )}
    </div>
  );
}
