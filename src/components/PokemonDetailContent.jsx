import FlipCard from "./FlipCard";

function PokemonDetailContent({ pokemon }) {
  if (!pokemon) {
    return <p className="text-center">포켓몬 정보를 찾을 수 없습니다.</p>;
  }

  return (
    <section className="p-4">
      <h1 className="text-2xl font-bold capitalize mb-4">{pokemon.nameKo || pokemon.name}</h1>

      <div className="flex justify-center mb-6">
        <FlipCard
          frontSrc={pokemon.frontImage}
          backSrc={pokemon.backImage}
          alt={pokemon.nameKo || pokemon.name}
        />
      </div>

      <p className="text-gray-700 whitespace-pre-line">{pokemon.description}</p>
    </section>
  );
}

export default PokemonDetailContent;
