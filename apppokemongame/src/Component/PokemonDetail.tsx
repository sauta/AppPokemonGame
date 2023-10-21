import React, { useState, useEffect } from "react";
import axios from "axios";

interface Pokemon {
    name: string;
    sprites: {
        front_default: string;
    };
    // Agrega otras propiedades del objeto Pokemon según lo que necesites
}

const PokemonDetail: React.FC = () => {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);

    useEffect(() => {
        const getPokemonData = async () => {
            try {
                const response = await axios.get<Pokemon>("https://pokeapi.co/api/v2/pokemon/25");
                setPokemon(response.data);
            } catch (error) {
                console.error("Error fetching Pokemon data: ", error);
            }
        };

        getPokemonData();
    }, []);

    if (!pokemon) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{pokemon.name}</h2>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            {/* Mostrar otros datos del pokemon según tus necesidades */}
        </div>
    );
};

export default PokemonDetail;
