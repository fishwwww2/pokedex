import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemons } from "../RTK/pokemonSlice";
import DetailModal from "../components/DetailModal";
import "../styles/card.css";

function Main() {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.pokemon);

  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    if (list.length === 0) dispatch(fetchPokemons());
  }, [dispatch, list.length]);

  if (loading) return <p className="text-center mt-20">로딩 중...</p>;

  return (
    <>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 타이틀 영역 */}
      {/* 나중에 디자인 수정... */}
      <div className="bg-gradient-to-r from-red-500 to-rose-400 text-white py-10 px-6 mb-6 rounded-b-3xl shadow-lg text-center">
        <h1 className="text-4xl font-extrabold tracking-wide">
          Pokédex
        </h1>

        {/* 검색창 */}
        {/* 기능 구현 미완성 */}
        <div className="mt-6 max-w-md">
          <div className="bg-white rounded-full flex items-center px-4 py-2 shadow">
            <span className="text-gray-400 mr-2">🔍</span>
            <input
              type="text"
              placeholder="포켓몬 이름 검색..."
              className="flex-1 outline-none text-gray-700 bg-transparent"
            />
          </div>
        </div>
      </div>
        {/* 포켓몬 카드 그리드 */}
        <section className="p-6 bg-gray-50 min-h-screen">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-4">
            {list.map((pokemon) => (
              <div
                key={pokemon.id}
                className="pokemon-card"
                onClick={() => setSelectedPokemon(pokemon)}
              >
                <button className="favorite-btn">♥</button>

                <img
                  src={pokemon.frontImage}
                  alt={pokemon.name}
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
