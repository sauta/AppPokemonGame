import React, { useState, useEffect } from "react";
import axios from "axios";

const PokemonForms: React.FC = () => {
    const [pokemonForms, setPokemonForms] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://pokeapi.co/api/v2/pokemon-form/");
                setPokemonForms(response.data.results);
            } catch (error) {
                console.error("Error fetching Pokemon forms: ", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Pokemon Forms</h1>
            <ul>
                {pokemonForms.map((form: any) => (
                    <li key={form.name}>
                        <strong>Name:</strong> {form.name}<br />
                        <strong>URL:</strong> {form.url}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PokemonForms;
