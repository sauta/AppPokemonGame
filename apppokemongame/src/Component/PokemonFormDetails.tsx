import React, { useState, useEffect } from "react";
import axios from "axios";

const PokemonFormDetails: React.FC = () => {
    const [pokemonFormDetails, setPokemonFormDetails] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://pokeapi.co/api/v2/pokemon-form/1/");
                setPokemonFormDetails(response.data);
            } catch (error) {
                console.error("Error fetching Pokemon form details: ", error);
            }
        };

        fetchData();
    }, []);

    if (!pokemonFormDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Pokemon Form Details</h1>
            <h2>Name: {pokemonFormDetails?.name}</h2>
            <h3>Types: {pokemonFormDetails?.types?.map((type: any) => type.type.name).join(", ")}</h3>
            <h3>Abilities: {pokemonFormDetails?.abilities?.map((ability: any) => ability.ability.name).join(", ")}</h3>
            <h3>Base Stats:</h3>
            {pokemonFormDetails?.stats?.map((stat: any) => (
                <div key={stat?.stat?.name}>
                    <strong>{stat?.stat?.name}:</strong> {stat?.base_stat}
                </div>
            ))}
            <h3>Sprite:</h3>
            <img src={pokemonFormDetails?.sprites?.front_default} alt={pokemonFormDetails?.name} />
        </div>
    );
};

export default PokemonFormDetails;
