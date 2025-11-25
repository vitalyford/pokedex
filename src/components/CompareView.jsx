import React, { useState } from 'react';
import TypeBadge from './TypeBadge';
import { useFuzzySearch } from '../hooks/useFuzzySearch';
import './CompareView.css';

const CompareView = ({ compareList, onRemove, allPokemon, onAdd }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const calculateTotal = (stats) => {
        return stats.reduce((total, { base_stat }) => total + base_stat, 0);
    };

    const getStatName = (name) => {
        const names = {
            'hp': 'HP',
            'attack': 'ATK',
            'defense': 'DEF',
            'special-attack': 'SP.ATK',
            'special-defense': 'SP.DEF',
            'speed': 'SPD'
        };
        return names[name] || name;
    };

    // Filter available Pokemon using search
    const searchResults = useFuzzySearch(allPokemon, searchTerm, ['name', 'types']);
    const availablePokemon = searchResults.filter(
        pokemon => !compareList.find(p => p.id === pokemon.id)
    );

    return (
        <div className="compare-view">
            <div className="container">
                <div className="compare-view__header">
                    <h2>Compare Pokémon Stats</h2>
                    <p className="compare-view__subtitle">
                        {compareList.length === 0 ? 'Search and select Pokemon below to add them to comparison' :
                            `Comparing ${compareList.length} of 6 Pokémon`}
                    </p>
                </div>

                {compareList.length > 0 && (
                    <div className="compare-grid">
                        {compareList.map((pokemon) => {
                            const total = calculateTotal(pokemon.stats);
                            const maxTotal = Math.max(...compareList.map(p => calculateTotal(p.stats)));
                            const isHighest = total === maxTotal && compareList.length > 1;

                            return (
                                <div key={pokemon.id} className={`compare-card ${isHighest ? 'compare-card--highest' : ''}`}>
                                    <button
                                        className="compare-card__remove"
                                        onClick={() => onRemove(pokemon)}
                                        aria-label="Remove from comparison"
                                    >
                                        ✕
                                    </button>

                                    {isHighest && (
                                        <div className="compare-card__badge">👑 Highest Total</div>
                                    )}

                                    <div className="compare-card__header">
                                        <img
                                            src={pokemon.sprite}
                                            alt={pokemon.name}
                                            className="compare-card__image"
                                        />
                                        <div className="compare-card__info">
                                            <span className="compare-card__number">#{String(pokemon.id).padStart(3, '0')}</span>
                                            <h3 className="compare-card__name">{pokemon.name}</h3>
                                            <div className="compare-card__types">
                                                {pokemon.types.map(({ type }) => (
                                                    <TypeBadge key={type.name} type={type.name} size="small" />
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="compare-card__total">
                                        <span className="total-label">Base Stat Total</span>
                                        <span className="total-value">{total}</span>
                                    </div>

                                    <div className="compare-card__stats">
                                        {pokemon.stats.map(({ stat, base_stat }) => (
                                            <div key={stat.name} className="stat-row">
                                                <span className="stat-row__label">{getStatName(stat.name)}</span>
                                                <div className="stat-row__bar">
                                                    <div
                                                        className="stat-row__fill"
                                                        style={{ width: `${(base_stat / 255) * 100}%` }}
                                                    />
                                                </div>
                                                <span className="stat-row__value">{base_stat}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {compareList.length < 6 && (
                    <div className="compare-view__add-section">
                        <h3>Add More Pokémon ({availablePokemon.length} available)</h3>

                        <div className="compare-search">
                            <span className="compare-search__icon">🔍</span>
                            <input
                                type="text"
                                className="compare-search__input"
                                placeholder="Search Pokémon by name or type..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            {searchTerm && (
                                <button
                                    className="compare-search__clear"
                                    onClick={() => setSearchTerm('')}
                                    aria-label="Clear search"
                                >
                                    ✕
                                </button>
                            )}
                        </div>

                        <div className="pokemon-select-grid">
                            {availablePokemon.map((pokemon) => (
                                <button
                                    key={pokemon.id}
                                    className="pokemon-select-card"
                                    onClick={() => onAdd(pokemon)}
                                >
                                    <img src={pokemon.spriteSmall} alt={pokemon.name} loading="lazy" />
                                    <span className="pokemon-select-card__name">{pokemon.name}</span>
                                    <span className="pokemon-select-card__id">#{pokemon.id}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CompareView;
