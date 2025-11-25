import React from 'react';
import TypeBadge from './TypeBadge';
import { getTypeGradient } from '../utils/typeColors';
import './PokemonCard.css';

const PokemonCard = ({ pokemon, onClick, isFavorite, onToggleFavorite }) => {
    const gradient = getTypeGradient(pokemon.types);

    return (
        <div
            className="pokemon-card"
            style={{ background: gradient }}
            onClick={onClick}
        >
            <button
                className={`pokemon-card__favorite ${isFavorite ? 'pokemon-card__favorite--active' : ''}`}
                onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(pokemon.id);
                }}
                aria-label="Toggle favorite"
            >
                {isFavorite ? '❤️' : '🤍'}
            </button>

            <div className="pokemon-card__number">#{String(pokemon.id).padStart(3, '0')}</div>

            <div className="pokemon-card__image-wrapper">
                <img
                    src={pokemon.spriteSmall}
                    alt={pokemon.name}
                    loading="lazy"
                    className="pokemon-card__image"
                />
            </div>

            <div className="pokemon-card__info">
                <h3 className="pokemon-card__name">{pokemon.name}</h3>
                <div className="pokemon-card__types">
                    {pokemon.types.map(({ type }) => (
                        <TypeBadge key={type.name} type={type.name} size="small" />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PokemonCard;
