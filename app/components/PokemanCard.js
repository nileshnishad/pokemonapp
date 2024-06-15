"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import Skeleton from "../utils/Skeleton";

const PokemonCard = ({ searchQuery, selectedType }) => {
  const { data: getPokemonData, loading, error } = useFetch(
    "https://pokeapi.co/api/v2/pokemon?limit=1000"
  );

  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    if (getPokemonData && getPokemonData.results) {
      const fetchDetailedData = async () => {
        try {
          const promises = getPokemonData.results.map((pokemon) =>
            axios.get(pokemon.url)
          );
          const responses = await Promise.all(promises);
          const detailedPokemonData = responses.map((response) => ({
            id: response.data.id,
            name: response.data.name,
            url: response.data.sprites.front_default,
            types: response.data.types.map((type) => type.type.name),
          }));
          setPokemonData(detailedPokemonData);
        } catch (error) {
          console.error("Error fetching Pokemon details:", error);
        }
      };

      fetchDetailedData();
    }
  }, [getPokemonData]);

  const filteredPokemon = pokemonData.filter((pokemon) => {
    const matchesSearch = pokemon.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType = selectedType
      ? pokemon.types.includes(selectedType)
      : true;
    return matchesSearch && matchesType;
  });

  if (loading) {
    return <Skeleton type="card" count="12"/>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
      {filteredPokemon.map((pokemon, id) => (
        <Link
          href="/pokemon/[pokemon]"
          as={`/pokemon/${pokemon.name}/${pokemon.id}`}
          key={id}
        >
          <div className="bg-gray-200 rounded-lg overflow-hidden shadow-md m-4 flex flex-col">
            <img src={pokemon.url} alt={pokemon.name} className="w-full h-auto" />
            <div className="p-4 flex flex-col items-start">
              <h2 className="text-xl font-semibold mb-2">{pokemon.name}</h2>
              <p className="text-blue-400 py-2  rounded">Details {">"}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PokemonCard;
