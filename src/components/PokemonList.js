import { useState , useEffect } from "react";

export default function PokemonList() {
  const [pokemon, setPokemon] = useState([]);
  const [offset, setOffset]= useState(0);

  useEffect (() => {
  
    async function loadPokemon() {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}`);
      const data = await response.json();
      setPokemon(data.results);
    } catch (error) {
      console.log(error);
    }
  }

  loadPokemon ();
}, [offset]);

const handleNextPage = () => {
  setOffset((prevOffset) => prevOffset + 20);
};
const handlePreviousPage = () => {
  if (offset >=20){
setOffset((prevOffset) => prevOffset - 20);
  }
};

return (
  <main>
    <button type="button" onClick={handlePreviousPage}>Previous Page</button>
    <button type="button" onClick={handleNextPage}>Next Page</button>
    <ul>
      {pokemon.map(({ name }) => (
        <li key={name}>{name}</li>
      ))}
    </ul>
  </main>
);
}