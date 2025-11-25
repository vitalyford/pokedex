import { useState, useEffect } from 'react';

const GEN_LIMITS = {
    1: { start: 1, end: 151 },
    2: { start: 152, end: 251 },
    3: { start: 252, end: 386 },
    4: { start: 387, end: 493 },
    5: { start: 494, end: 649 },
    6: { start: 650, end: 721 },
    7: { start: 722, end: 809 }
};

const CACHE_KEY = 'pokedex-pokemon-data';
const CACHE_TIMESTAMP_KEY = 'pokedex-cache-timestamp';
const CACHE_DURATION = 1000 * 60 * 60 * 24; // 24 hours

export const usePokemonData = () => {
    const [allPokemon, setAllPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPokemonData = async () => {
            try {
                // Check cache first
                const cachedData = localStorage.getItem(CACHE_KEY);
                const cacheTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
                const now = Date.now();

                if (cachedData && cacheTimestamp && (now - parseInt(cacheTimestamp)) < CACHE_DURATION) {
                    console.log('Loading Pokemon data from cache');
                    setAllPokemon(JSON.parse(cachedData));
                    setLoading(false);
                    return;
                }

                console.log('Fetching Pokemon data from API...');

                // Fetch list of all Pokemon (Gen 1-7: IDs 1-809)
                const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=809');
                const data = await response.json();

                // Fetch detailed data for each Pokemon
                const pokemonDetails = await Promise.all(
                    data.results.map(async (pokemon, index) => {
                        const id = index + 1;
                        const detailResponse = await fetch(pokemon.url);
                        const details = await detailResponse.json();

                        return {
                            id,
                            name: details.name,
                            types: details.types,
                            sprite: details.sprites.other['official-artwork'].front_default || details.sprites.front_default,
                            spriteSmall: details.sprites.front_default,
                            stats: details.stats,
                            height: details.height,
                            weight: details.weight,
                            abilities: details.abilities,
                            generation: getGeneration(id)
                        };
                    })
                );

                // Cache the data
                localStorage.setItem(CACHE_KEY, JSON.stringify(pokemonDetails));
                localStorage.setItem(CACHE_TIMESTAMP_KEY, now.toString());

                setAllPokemon(pokemonDetails);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching Pokemon data:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchPokemonData();
    }, []);

    return { allPokemon, loading, error };
};

// Helper function to determine generation
const getGeneration = (id) => {
    for (const [gen, limits] of Object.entries(GEN_LIMITS)) {
        if (id >= limits.start && id <= limits.end) {
            return parseInt(gen);
        }
    }
    return 1;
};

export { GEN_LIMITS };
