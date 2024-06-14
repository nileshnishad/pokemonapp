"use client";

import React from "react";
import Link from "next/link";
// import { revalidatePath } from 'next/cache'
const pokemonData = [
  {
    name: "Bulbasaur",
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
  },
  {
    name: "Charmander",
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
  },
  {
    name: "Squirtle",
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
  },
  {
    name: "Bulbasaur",
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
  },
  {
    name: "Charmander",
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
  },
  {
    name: "Squirtle",
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
  },
  {
    name: "Bulbasaur",
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
  },
  {
    name: "Charmander",
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
  },
  {
    name: "Squirtle",
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
  },
];

const PokemanCard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {pokemonData.map((pokemon, index) => (
        <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md m-4 flex flex-col">
          <img
            src={pokemon.imageUrl}
            alt={pokemon.name}
            className="w-full h-auto"
          />
          <div className="p-4 flex flex-col items-start">
            <h2 className="text-xl font-semibold mb-2">{pokemon.name}</h2>
            {/* <button className="text-blue-400 py-2 px-4 rounded" onClick={handlepokemon}>
            Details {">"}
          </button> */}
            <Link
              href="/pokemon/[pokemon]"
              as={`/pokemon/${pokemon.name}`}
            >
              <p className="text-blue-400 py-2 px-4 rounded">Details {">"}</p>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PokemanCard;
