import React from 'react';
import PokemonCard from './PokemonCard';
import './PokemonList.css';

const PokemonList = ({ pokemon, onPokemonClick, favorites, onToggleFavorite, loading }) => {
    if (loading) {
        return (
            <div className="pokemon-list__loading">
                <div className="container">
                    <div className="pokemon-grid">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="pokemon-card-skeleton skeleton" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (pokemon.length === 0) {
        return (
            <div className="pokemon-list__empty">
                <div className="container">
                    <div className="empty-state">
                        <span className="empty-state__icon">🔍</span>
                        <h3 className="empty-state__title">No Pokémon Found</h3>
                        <p className="empty-state__message">
                            Try adjusting your search or filters
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="pokemon-list">
            <div className="container">
                <div className="pokemon-list__count">
                    Showing <strong>{pokemon.length}</strong> Pokémon
                </div>
                <div className="pokemon-grid">
                    {pokemon.map((p) => (
                        <PokemonCard
                            key={p.id}
                            pokemon={p}
                            onClick={() => onPokemonClick(p)}
                            isFavorite={favorites.includes(p.id)}
                            onToggleFavorite={onToggleFavorite}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PokemonList;
