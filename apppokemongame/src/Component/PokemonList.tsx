import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Pagination from "./PaginationProps";
import loadingGif from "./loading.gif"; // Ruta al archivo GIF de carga

interface Pokemon {
    name: string;
    url: string;
    image: string; // Nueva propiedad para almacenar la URL de la imagen
}

interface PokemonListResponse {
    count: number;
    results: Pokemon[];
}


const PokemonList: React.FC = () => {
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false); // Estado para rastrear si las imágenes están cargando

    // Calcula el rango de páginas a mostrar
    const getPokemonList = useCallback(async (page: number) => {
        setLoading(true); // Establece el estado de carga a verdadero cuando comienza la carga de imágenes
        try {
            const response = await axios.get<PokemonListResponse>(`https://pokeapi.co/api/v2/pokemon?limit=6&offset=${(page - 1) * 6}`);
            const pokemonData = await Promise.all(
                response.data.results.map(async (pokemon) => {
                    const detailsResponse = await axios.get(pokemon.url);
                    const image = detailsResponse.data.sprites.front_default;
                    return { ...pokemon, image };
                })
            );
            setTimeout(() => {
                setLoading(false); // Cambia el estado de loading después de un segundo
            }, 50);
            setPokemonList(pokemonData);
            setTotalPages(Math.ceil(response.data.count / 6)); // Calcula el total de páginas basado en el total de Pokémon
           
        } catch (error) {
            console.error("Error fetching Pokemon list: ", error);
        } 
    }, []); 

    useEffect(() => {
        getPokemonList(currentPage); 
    }, [currentPage]);


    return (
        <div className="container mt-4">
            <h2>Pokemon List</h2>
            {loading && <div className="text-center">Cargando...</div>} {/* Muestra el mensaje de carga si loading es verdadero */}
            <div className="row">
                {pokemonList.map((pokemon) => (
                    <div key={pokemon.name} className="col-md-4 mb-4">
                        <div className="card">
                            <img src={loading ? loadingGif : pokemon.image} className="card-img-top" alt={pokemon.name} />
                             <div className="card-body">
                                <h5 className="card-title">{pokemon.name}</h5>
                                {/* Agrega más información del Pokémon según tus necesidades */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
    );
};

export default PokemonList;
