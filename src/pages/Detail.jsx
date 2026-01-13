import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemons } from "../RTK/pokemonSlice";
import { useParams } from "react-router-dom";
import PokemonDetailContent from "../components/PokemonDetailContent";

function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.pokemon);

  useEffect(() => {
    if (list.length === 0) {
      dispatch(fetchPokemons());
    }
  }, [list.length, dispatch]);

  const pokemon = list.find((p) => p.id === Number(id));

  if (loading || list.length === 0) {
    return <p className="text-center mt-20">로딩 중...</p>;
  }

  return <PokemonDetailContent pokemon={pokemon} />;
}

export default Detail;
