// Pokemon Type to Color Mapping
export const TYPE_COLORS = {
  normal: '#a8a878',
  fire: '#f08030',
  water: '#6890f0',
  electric: '#f8d030',
  grass: '#78c850',
  ice: '#98d8d8',
  fighting: '#c03028',
  poison: '#a040a0',
  ground: '#e0c068',
  flying: '#a890f0',
  psychic: '#f85888',
  bug: '#a8b820',
  rock: '#b8a038',
  ghost: '#705898',
  dragon: '#7038f8',
  dark: '#705848',
  steel: '#b8b8d0',
  fairy: '#ee99ac',
};

// Get gradient background for a Pokemon based on its types
export const getTypeGradient = (types) => {
  if (!types || types.length === 0) return 'var(--type-normal)';
  
  const primaryType = types[0].type.name;
  
  if (types.length === 1) {
    return `var(--type-${primaryType})`;
  }
  
  // Dual type: blend both types
  const secondaryType = types[1].type.name;
  const color1 = TYPE_COLORS[primaryType];
  const color2 = TYPE_COLORS[secondaryType];
  
  return `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`;
};

// Get solid color for badges
export const getTypeColor = (typeName) => {
  return TYPE_COLORS[typeName] || TYPE_COLORS.normal;
};
