// Simple fuzzy matching algorithm
const fuzzyMatch = (query, target) => {
    const queryLower = query.toLowerCase();
    const targetLower = target.toLowerCase();

    // Exact match
    if (targetLower.includes(queryLower)) return true;

    // Fuzzy match - check if query letters appear in order
    let queryIndex = 0;
    for (let i = 0; i < targetLower.length && queryIndex < queryLower.length; i++) {
        if (targetLower[i] === queryLower[queryIndex]) {
            queryIndex++;
        }
    }

    return queryIndex === queryLower.length;
};

// Calculate match score (higher is better)
const getMatchScore = (query, target) => {
    const queryLower = query.toLowerCase();
    const targetLower = target.toLowerCase();

    // Exact match gets highest score
    if (targetLower === queryLower) return 1000;

    // Starts with query gets high score
    if (targetLower.startsWith(queryLower)) return 500;

    // Contains query gets medium score
    if (targetLower.includes(queryLower)) return 100;

    // Fuzzy match gets low score
    if (fuzzyMatch(query, target)) return 10;

    return 0;
};

export const useFuzzySearch = (items, searchTerm, searchKeys = ['name']) => {
    if (!searchTerm || searchTerm.trim() === '') {
        return items;
    }

    const query = searchTerm.trim();

    // Check if searching by ID (e.g., "#25" or "25")
    const idMatch = query.match(/^#?(\d+)$/);
    if (idMatch) {
        const id = parseInt(idMatch[1]);
        return items.filter(item => item.id === id);
    }

    // Fuzzy search across specified keys
    const matches = items
        .map(item => {
            let maxScore = 0;

            for (const key of searchKeys) {
                const value = item[key];
                if (typeof value === 'string') {
                    const score = getMatchScore(query, value);
                    maxScore = Math.max(maxScore, score);
                } else if (Array.isArray(value)) {
                    // Handle arrays (e.g., types, abilities)
                    for (const subItem of value) {
                        const subValue = typeof subItem === 'object' ? subItem.type?.name || subItem.ability?.name : subItem;
                        if (subValue) {
                            const score = getMatchScore(query, subValue);
                            maxScore = Math.max(maxScore, score);
                        }
                    }
                }
            }

            return { item, score: maxScore };
        })
        .filter(({ score }) => score > 0)
        .sort((a, b) => b.score - a.score)
        .map(({ item }) => item);

    return matches;
};
