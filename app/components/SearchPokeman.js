'use client';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import useFetch from '../hooks/useFetch';

const SearchPokemon = ({ onSearch, onTypeChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const { data: pokemonTypes, loading: loadingPokemonTypes } = useFetch('https://pokeapi.co/api/v2/type');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  const handleSelectChange = (event) => {
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
            onChange={handleSelectChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select a Pokémon Type</option>
            {pokemonTypes?.results.map((type) => (
              <option key={type.name} value={type.name}>{type.name}</option>
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
            <button className="absolute right-0 top-0 h-full bg-blue-800 text-white p-2 rounded-r-md" onClick={() => onSearch(searchTerm)}>Search</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPokemon;