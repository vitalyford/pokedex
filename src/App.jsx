import React, { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import PokemonList from './components/PokemonList';
import Modal from './components/Modal';
import CompareView from './components/CompareView';
import { useTheme } from './hooks/useTheme';
import { usePokemonData, GEN_LIMITS } from './hooks/usePokemonData';
import { useFuzzySearch } from './hooks/useFuzzySearch';
import { useFavorites } from './hooks/useFavorites';
import './App.css';

function App() {
  const { theme, toggleTheme } = useTheme();
  const { allPokemon, loading, error } = usePokemonData();
  const { favorites, toggleFavorite } = useFavorites();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGen, setSelectedGen] = useState('all');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [compareList, setCompareList] = useState([]);

  // Filter by generation or favorites
  const genFilteredPokemon = React.useMemo(() => {
    if (selectedGen === 'all') return allPokemon;
    if (selectedGen === 'favorites') {
      return allPokemon.filter(p => favorites.includes(p.id));
    }

    const limits = GEN_LIMITS[selectedGen];
    return allPokemon.filter(p => p.id >= limits.start && p.id <= limits.end);
  }, [allPokemon, selectedGen, favorites]);

  // Filter by types
  const typeFilteredPokemon = React.useMemo(() => {
    if (selectedTypes.length === 0) return genFilteredPokemon;

    return genFilteredPokemon.filter(p =>
      p.types.some(({ type }) => selectedTypes.includes(type.name))
    );
  }, [genFilteredPokemon, selectedTypes]);

  // Apply fuzzy search
  const searchResults = useFuzzySearch(
    typeFilteredPokemon,
    searchTerm,
    ['name', 'types', 'abilities']
  );

  const handleTypeToggle = (type) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handlePokemonClick = (pokemon) => {
    if (compareMode) {
      handleToggleCompare(pokemon);
    } else {
      setSelectedPokemon(pokemon);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedPokemon(null), 300);
  };

  const handleToggleCompare = (pokemon) => {
    setCompareList(prev => {
      if (prev.find(p => p.id === pokemon.id)) {
        return prev.filter(p => p.id !== pokemon.id);
      } else if (prev.length < 6) {
        return [...prev, pokemon];
      }
      return prev;
    });
  };

  const toggleCompareMode = () => {
    setCompareMode(!compareMode);
    if (compareMode) {
      setCompareList([]);
    }
  };

  if (error) {
    return (
      <div className="app-error">
        <h2>Error Loading Pokédex</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="app">
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        selectedGen={selectedGen}
        onGenSelect={setSelectedGen}
        compareMode={compareMode}
        onToggleCompareMode={toggleCompareMode}
        compareCount={compareList.length}
      />

      {!compareMode ? (
        <>
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedTypes={selectedTypes}
            onTypeToggle={handleTypeToggle}
          />

          <PokemonList
            pokemon={searchResults}
            onPokemonClick={handlePokemonClick}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            loading={loading}
          />

          <Modal
            pokemon={selectedPokemon}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        </>
      ) : (
        <CompareView
          compareList={compareList}
          onRemove={(pokemon) => handleToggleCompare(pokemon)}
          allPokemon={searchResults}
          onAdd={handleToggleCompare}
        />
      )}
    </div>
  );
}

export default App;
