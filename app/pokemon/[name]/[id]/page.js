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
      <Link href="/">
        <p className="text-blue-500 m-4">&lt; Back</p>
      </Link>
      <div className="m-4 flex items-center">
        {" "}
        <Link href="/">
          <p className="text-blue-500 m-4"> Home</p>
        </Link>{" "}
        &gt; {pokemonDetails.name}
      </div>
      <div className="flex justify-center mt-8">
        <div
          className="bg-white rounded-lg shadow-lg p-4 m-4 "
          style={{ minWidth: "300px" }}
        >
          <div className="flex justify-center">
            <img
              src={pokemonDetails.sprites.front_default}
              alt={pokemonDetails.name}
              className="mt-4 "
            />
          </div>
          <div className="mt-4 flex items-center">
            <h1 className="text-xl font-bold ">Name : </h1>{" "}
            {pokemonDetails.name}
          </div>
          <div className="mt-4 flex items-center">
            <h2 className="text-xl font-semibold">Type:</h2>

            {pokemonDetails.types.map((type, index) => (
              <span key={index}> {[type.type.name].join(",")}</span>
            ))}
          </div>
          <div className="mt-4 flex">
            <h2 className="text-xl font-semibold">Stats:</h2>
            {pokemonDetails.stats.map((stat, index) => (
              <span key={index}>
                {stat.stat.name}: {stat.base_stat}
              </span>
            ))}
          </div>
          <div className="mt-4 flex">
            <h2 className="text-xl font-semibold">Abilities:</h2>
            {pokemonDetails.abilities.map((ability, index) => (
              <span key={index}>{ability.ability.name}</span>
            ))}
          </div>
          <div className="mt-4 flex">
            <h2 className="text-xl font-semibold">Moves:</h2>

            {pokemonDetails.moves.slice(0, 5).map((move, index) => (
              <span key={index}>{move.move.name}</span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PokemonDetailsPage;
