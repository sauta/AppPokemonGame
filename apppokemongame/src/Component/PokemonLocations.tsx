import React, { useState, useEffect } from "react";
import axios from "axios";

const PokemonLocations: React.FC = () => {
    const [locations, setLocations] = useState<any[]>([]);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get("https://pokeapi.co/api/v2/location");
                setLocations(response.data.results);
            } catch (error) {
                console.error("Error fetching Pokemon locations: ", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Pokemon Locations</h1>
            <ul>
                {locations.map((location: any) => (
                    <li key={location.name}>{location.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default PokemonLocations;
