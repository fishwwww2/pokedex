import { useDispatch, useSelector } from "react-redux";
import { addToFavorite, removeFromFavorite, selectFavoriteIds } from "../RTK/favoriteSlice";

export default function FavoriteButton({ pokemonId }) {
  const dispatch = useDispatch();
  const favoriteIds = useSelector(selectFavoriteIds);

  const isFav = favoriteIds.includes(pokemonId);

  const handleClick = (e) => {
    e.stopPropagation();
    if (isFav) dispatch(removeFromFavorite(pokemonId));
    else dispatch(addToFavorite(pokemonId));
  };

  return (
    <button
    className={`favorite-btn ${isFav ? "is-favorite" : ""}`}
    onClick={handleClick}
    >
    ♥
    </button>

  );
}
