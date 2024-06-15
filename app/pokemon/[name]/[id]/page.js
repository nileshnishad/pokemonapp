"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

const PokemonDetailsPage = ({ params: { id } }) => {
  const [pokemonDetails, setPokemonDetails] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((response) => response.json())
        .then((data) => setPokemonDetails(data))
        .catch((error) =>
          console.error("Error fetching Pokemon details:", error)
        );
    }
  }, [id]);

  if (!pokemonDetails) {
    return (
      <div>
        <Link href="/">
          <p className="text-blue-500">&lt; Back</p>
        </Link>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <> 
      <div className="flex items-center justify-start">
        <Link href="/">
          <p className="text-blue-500 m-4"> Home</p>
        </Link>
        &gt; {pokemonDetails.name}
      </div>
      <Link href="/">
        <p className="text-blue-500 m-4">&lt; Back</p>
      </Link>
      <div className="flex justify-center mt-4">
        <div
          className="bg-white rounded-lg shadow-lg  m-4"
          style={{ minWidth: "300px" }}
        >
          <div className="flex  bg-gray-200  justify-center">
            <img
              src={pokemonDetails.sprites.front_default}
              alt={pokemonDetails.name}
              className=""
              style={{ minHeight: "300px" }}
            />
          </div>
          <div className="bg-orange-300 p-4">
          <div className="mt-4 flex items-center">
            <h1 className="text-xl font-bold mr-2">Name:</h1>
            <span>{pokemonDetails.name}</span>
          </div>
          <div className="mt-4 flex items-center">
            <h2 className="text-xl font-semibold mr-2">Type:</h2>
            <span>
              {pokemonDetails.types.map((type) => type.type.name).join(", ")}
            </span>
          </div>
          <div className="mt-4 flex ">
            <h2 className="text-xl font-semibold mr-2">Stats:</h2>
            <span>
              {pokemonDetails.stats
                .map((stat) => `${stat.stat.name}: ${stat.base_stat}`)
                .join(", ")}
            </span>
          </div>
          <div className="mt-4 flex ">
            <h2 className="text-xl font-semibold mr-2">Abilities:</h2>
            <span>
              {pokemonDetails.abilities
                .map((ability) => ability.ability.name)
                .join(", ")}
            </span>
          </div>
          <div className="mt-4 flex ">
            <h2 className="text-xl font-semibold mr-2">Moves:</h2>
            <span>
              {pokemonDetails.moves
                .slice(0, 5)
                .map((move) => move.move.name)
                .join(", ")}
            </span>
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PokemonDetailsPage;
