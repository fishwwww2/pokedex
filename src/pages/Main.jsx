import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemons } from "../RTK/pokemonSlice";

import DetailModal from "../components/DetailModal";
import PokemonCard from "../components/PokemonCard";


import { getRegExp } from "korean-regexp";
import FavoriteButton from "../components/favoriteButton";
import { Link } from "react-router-dom";
import { selectFavoriteIds } from "../RTK/favoriteSlice";

import "../styles/card.css";



function Main() {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.pokemon);

  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const favoriteIds = useSelector(selectFavoriteIds);


  useEffect(() => {
    if (list.length === 0) dispatch(fetchPokemons());
  }, [dispatch, list.length]);

  const filteredList = useMemo(() => {
    const q = searchTerm.trim();
    if (!q) return list;

    const regex = getRegExp(q);
    return list.filter((p) => {
      const name = p.nameKo || p.name;
      return regex.test(name);
    });
  }, [list, searchTerm]);

  if (loading) return <p className="text-center mt-20">로딩 중...</p>;

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 타이틀 영역 */}
          <div className="bg-gradient-to-r from-red-500 to-rose-400 text-white py-10 px-6 mb-6 rounded-b-3xl shadow-lg relative">

            {/* 중앙 타이틀 */}
            <h1 className="text-4xl font-extrabold tracking-wide text-center">
              Pokédex
            </h1>

            {/* 오른쪽 상단 찜 버튼 */}
            <Link to="/favorites" className="favorite-link" aria-label="favorites">
              ♥
              {favoriteIds.length > 0 && (
                <span className="favorite-badge">{favoriteIds.length}</span>
              )}
            </Link>


            {/* 검색창 */}
          <div className="mt-6 max-w-md mx-auto">
            <div className="bg-white rounded-full flex items-center px-4 py-2 shadow">
              <span className="text-gray-400 mr-2">🔍</span>
              <input
                type="text"
                placeholder="포켓몬 이름 검색..."
                className="flex-1 outline-none text-gray-700 bg-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  className="text-gray-400 hover:text-gray-600"
                  onClick={() => setSearchTerm("")}
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 포켓몬 카드 그리드 */}
        <section className="p-6 bg-gray-50 min-h-screen">
          {filteredList.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">
              검색 결과가 없습니다.
            </p>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-4">
              {filteredList.map((pokemon) => (
                <PokemonCard
                  key={pokemon.id}
                  pokemon={pokemon}
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

                  <h2 className="pokemon-name">
                    {pokemon.nameKo || pokemon.name}
                  </h2>
                </PokemonCard>
              ))}
            </div>
          )}
        </section>

        {/* 팝업 */}
        {selectedPokemon && (
          <DetailModal
            pokemon={selectedPokemon}
            onClose={() => setSelectedPokemon(null)}
          />
        )}
      </div>
    </>
  );
}

export default Main;
