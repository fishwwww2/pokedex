import { useState } from "react";
import FavoriteButton from "./favoriteButton";
import "../styles/card.css";

export default function PokemonCard({ pokemon, onClick }) {
  const [isImageLoading, setIsImageLoading] = useState(true);

  return (
    <div className="pokemon-card" onClick={onClick}>
      <FavoriteButton pokemonId={pokemon.id} />

      {isImageLoading && (
        <div className="img-loading-text">로딩 중...</div>
      )}

      <img
        src={pokemon.frontImage}
        alt={pokemon.nameKo || pokemon.name}
        className={`pokemon-img ${isImageLoading ? "is-loading" : ""}`}
        onLoad={() => setIsImageLoading(false)}
        onError={() => setIsImageLoading(false)}
      />

      <span className="pokemon-id">
        {pokemon.id.toString().padStart(3, "0")}
      </span>

      <h2 className="pokemon-name">{pokemon.nameKo || pokemon.name}</h2>
    </div>
  );
}
