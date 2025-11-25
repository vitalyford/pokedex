import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'pokedex-favorites';

export const useFavorites = () => {
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem(FAVORITES_KEY);
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (pokemonId) => {
        setFavorites(prev => {
            if (prev.includes(pokemonId)) {
                return prev.filter(id => id !== pokemonId);
            } else {
                return [...prev, pokemonId];
            }
        });
    };

    const isFavorite = (pokemonId) => {
        return favorites.includes(pokemonId);
    };

    return { favorites, toggleFavorite, isFavorite };
};
