import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PokemonDetailContent from "../components/PokemonDetailContent";

function Detail() {
  const { id } = useParams();
  const pokemon = useSelector((state) =>
    state.pokemon.list.find((p) => p.id === Number(id))
  );

  return <PokemonDetailContent pokemon={pokemon} />;
}

export default Detail;
