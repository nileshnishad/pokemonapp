'use client'
import SearchPokeman from "./components/SearchPokeman";
import PokemanCard from "./components/PokemanCard";
import { useState } from "react";


export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
    <SearchPokeman onSearch={handleSearch} />
    <PokemanCard searchQuery={searchQuery} />
    </>
  );
}
