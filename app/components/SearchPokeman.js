'use client'
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; 

const SearchPokemon = ( { onSearch,onTypeChange }) => {
  const [pokemonList, setPokemonList] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [pokemonTypes, setPokemonTypes] = useState([]);

  
  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1000');
        const pokemonNames = response.data.results.map(pokemon => pokemon.name);
        setPokemonList(pokemonNames);
      } catch (err) {
        setError(err);
      }
    };
    const fetchPokemonTypes = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/type');
        const types = response.data.results.map(type => type.name);
        setPokemonTypes(types);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPokemonList();
    fetchPokemonTypes();
  }, []); 

 
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  const handleSelectChange = (event) => {
    setSelectedPokemon(event.target.value);
    onSearch(event.target.value);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
    onTypeChange(event.target.value);
  };

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
      <div className="flex-1 w-full">
          <label htmlFor="pokemon-type-select" className="block text-gray-700 mb-2">Select Pokémon Type</label>
          <select
            id="pokemon-type-select"
            value={selectedType}
            onChange={handleTypeChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select a Pokémon Type</option>
            {pokemonTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div className="flex-1 w-full">
        <label htmlFor="pokemon-search" className="block text-gray-700 mb-2">Search Pokémon</label>
          <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FontAwesomeIcon icon={faSearch} className="text-gray-500" />

            </div>
            <input
              type="text"
              id="pokemon-search"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search..."
              className="w-full p-2 pl-10 border border-gray-300 rounded outline-none"
            />
            <button className="absolute right-0 top-0 h-full bg-blue-800 text-white p-2 rounded-r-md" 
             onClick={() => onSearch(searchTerm)}>Search</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPokemon;
