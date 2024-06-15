'use client'
import SearchPokeman from "./components/SearchPokeman";
import PokemanCard from "./components/PokemanCard";
import { useState } from "react";


export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
    <SearchPokeman onSearch={handleSearch}    onTypeChange={setSelectedType}/>
    <PokemanCard searchQuery={searchQuery}  selectedType={selectedType} />
    </>
  );
}
