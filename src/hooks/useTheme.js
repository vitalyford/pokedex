import { useState, useEffect } from 'react';

// Custom hook for theme management
export const useTheme = () => {
    const [theme, setTheme] = useState(() => {
        // Check localStorage first
        const savedTheme = localStorage.getItem('pokedex-theme');
        if (savedTheme) return savedTheme;

        // Fall back to system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }

        return 'light';
    });

    useEffect(() => {
        // Apply theme to root element
        document.documentElement.setAttribute('data-theme', theme);

        // Save to localStorage
        localStorage.setItem('pokedex-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    return { theme, toggleTheme };
};
