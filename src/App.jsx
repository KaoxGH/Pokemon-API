import { Button } from "./assets/components/Button";
import Card from "./assets/components/Card";

import "./sass/App.scss";
import { TiArrowLeftOutline, TiArrowRightOutline } from "react-icons/ti";
import { useState, useEffect } from "react";

function App() {
  const [pokemonId, setPokemonId] = useState(1);
  const [pokemonEvolutions, setPokemonEvolutions] = useState([]);

  useEffect(() => {
    getEvolutions(pokemonId);
  }, [pokemonId]);

  async function getEvolutions(id) {
    const response = await fetch(
      `https://pokeapi.co/api/v2/evolution-chain/${id}/`
    );
    const data = await response.json();

    let pokemonEvoArray = [];
    let pokemonNameLv1 = data.chain.species.name;
    let pokemonLv1Img = await getPokemonImgs(pokemonNameLv1);
    let pokemonLv1Stats = await getPokemonStats(pokemonNameLv1);
    pokemonEvoArray.push([pokemonNameLv1, pokemonLv1Img, pokemonLv1Stats]);

    if (data.chain.evolves_to.length !== 0) {
      let pokemonNameLv2 = data.chain.evolves_to[0].species.name;
      let pokemonLv2Img = await getPokemonImgs(pokemonNameLv2);
      let pokemonLv2Stats = await getPokemonStats(pokemonNameLv2);
      pokemonEvoArray.push([pokemonNameLv2, pokemonLv2Img, pokemonLv2Stats]);

      if (data.chain.evolves_to[0].evolves_to.length !== 0) {
        let pokemonNameLv3 =
          data.chain.evolves_to[0].evolves_to[0].species.name;
        let pokemonLv3Img = await getPokemonImgs(pokemonNameLv3);
        let pokemonLv3Stats = await getPokemonStats(pokemonNameLv3);
        pokemonEvoArray.push([pokemonNameLv3, pokemonLv3Img, pokemonLv3Stats]);
      }
    }
    setPokemonEvolutions(pokemonEvoArray);
  }

  async function getPokemonImgs(name) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
    const data = await response.json();
    return data.sprites.other["official-artwork"].front_default;
  }

  async function getPokemonStats(name){
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();
    let baseExperience = data.base_experience
    let height = data.height
    let weight = data.weight
    let types = data.types.map(typeObj => typeObj.type.name);
    return [baseExperience,height,weight,types]
  }

  function prevClick() {
    pokemonId <= 1 ? setPokemonId(1) : setPokemonId(pokemonId - 1);
  }
  function nextClick() {
    setPokemonId(pokemonId + 1);
  }

  return (
    <div className="app">
      {/* tarjetas*/}
      <div className={`card-container card${pokemonEvolutions.length}`}>
        {pokemonEvolutions.map((pokemon) => (
          <Card 
          key={pokemon[0]}
          length={pokemonEvolutions.length} 
          name={pokemon[0]} 
          img={pokemon[1]} 
          stats={pokemon[2]} />
        ))}
      </div>
      <div className="buttons-container">
        <Button icon={<TiArrowLeftOutline />} handleClick={prevClick} />

        <Button icon={<TiArrowRightOutline />} handleClick={nextClick} />
      </div>
    </div>
  );
}

export default App;
