function PokemonDetailContent({ pokemon }) {
  if (!pokemon) {
    return <p className="text-center">포켓몬 정보를 찾을 수 없습니다.</p>;
  }

  return (
    <section className="p-4">
      <h1 className="text-2xl font-bold capitalize mb-4">{pokemon.nameKo || pokemon.name}</h1>

      <div className="flex gap-4 mb-4">
        <img src={pokemon.frontImage} alt="front" />
        <img src={pokemon.backImage} alt="back" />
      </div>

      <p className="text-gray-700 whitespace-pre-line">{pokemon.description}</p>
    </section>
  );
}

export default PokemonDetailContent;
