"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";


const PokemonCard = ({searchQuery}) => {
    const [pokemonData, setPokemonData] = useState(null)
    const [filteredPokemon, setFilteredPokemon] = useState([]);


    useEffect(() => {
      const fetchData = async () => {
          try {
              const promises = Array.from({ length: 1000 }, (_, index) =>
                  axios.get(`https://pokeapi.co/api/v2/pokemon/${index + 1}`)
              );
              const responses = await Promise.all(promises);
              const pokemonDetails = responses.map(response => ({
                  id:response.data.id,
                  name: response.data.name,
                  url: response.data.sprites.front_default
              }));
              setPokemonData(pokemonDetails);
          } catch (error) {
              console.error('Error fetching Pokemon data:', error);
          }
      };

      fetchData();
  }, []);
  useEffect(() => {
    if (pokemonData) {
      const filtered = pokemonData.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPokemon(filtered);
    }
  }, [searchQuery, pokemonData]);

    if (!pokemonData) {
      return <div>Loading...</div>;
    }

    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
      {filteredPokemon.map((pokemon, id) => (
        <div key={id} className="bg-white rounded-lg overflow-hidden shadow-md m-4 flex flex-col">
          <img
            src={pokemon.url}
            alt={pokemon.name}
            className="w-full h-auto"
          />
          <div className="p-4 flex flex-col items-start">
            <h2 className="text-xl font-semibold mb-2">{pokemon.name}</h2>
            <Link
              href="/pokemon/[pokemon]"
              as={`/pokemon/${pokemon.name}/${pokemon.id}`}
            >
              <p className="text-blue-400 py-2 px-4 rounded">Details {">"}</p>
            </Link>
          </div>
        </div>
      ))}
    </div>

    );
};

export default PokemonCard;
