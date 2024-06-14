'use client'

import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react';

const PokemonDetailsPage = ({params: {name}}) => {
  const  pokemonname  = name; 
  console.log("namefound",name);
  const [pokemonDetails, setPokemonDetails] = useState(null);

  useEffect(() => {
    if (pokemonname) { 
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonname}`) 
        .then(response => response.json())
        .then(data => setPokemonDetails(data))
        .catch(error => console.error('Error fetching Pokemon details:', error));
    }
  }, [pokemonname]); 

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
    <div>
      <Link href="/">
        <p className="text-blue-500">&lt; Back</p>
      </Link>
      <h1>{pokemonDetails.name}</h1>
      <img src={pokemonDetails.sprites.front_default} alt={pokemonDetails.name} />
      {/* Display other details of the Pokemon */}
    </div>
  );
};

export default PokemonDetailsPage;
