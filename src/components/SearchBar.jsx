import React from 'react';
import { debounce } from '../utils/debounce';
import './SearchBar.css';

const POKEMON_TYPES = [
    'normal', 'fire', 'water', 'electric', 'grass', 'ice',
    'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
    'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
];

const SearchBar = ({ searchTerm, onSearchChange, selectedTypes, onTypeToggle }) => {
    const [localSearch, setLocalSearch] = React.useState(searchTerm);

    // Sync local state with prop changes
    React.useEffect(() => {
        setLocalSearch(searchTerm);
    }, [searchTerm]);

    const debouncedSearch = React.useMemo(
        () => debounce((value) => onSearchChange(value), 150),
        [onSearchChange]
    );

    const handleSearchInput = (e) => {
        const value = e.target.value;
        setLocalSearch(value);
        debouncedSearch(value);
    };

    return (
        <div className="search-bar">
            <div className="container">
                <div className="search-bar__content">
                    <div className="search-input-wrapper">
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search by name, ID, type, or ability..."
                            value={localSearch}
                            onChange={handleSearchInput}
                        />
                        {localSearch && (
                            <button
                                className="search-clear"
                                onClick={() => {
                                    setLocalSearch('');
                                    onSearchChange('');
                                }}
                                aria-label="Clear search"
                            >
                                ✕
                            </button>
                        )}
                    </div>

                    <div className="type-filters">
                        <span className="type-filters__label">Filter by Type:</span>
                        <div className="type-filters__list">
                            {POKEMON_TYPES.map(type => (
                                <button
                                    key={type}
                                    className={`type-filter-btn type-filter-btn--${type} ${selectedTypes.includes(type) ? 'type-filter-btn--active' : ''
                                        }`}
                                    onClick={() => onTypeToggle(type)}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
