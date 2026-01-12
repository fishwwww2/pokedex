import PokemonDetailContent from "./PokemonDetailContent";

export default function DetailModal({ pokemon, onClose }) {
  if (!pokemon) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <PokemonDetailContent pokemon={pokemon} />
      </div>
    </div>
  );
}
