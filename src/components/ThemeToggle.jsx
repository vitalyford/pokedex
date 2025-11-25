import React from 'react';
import './ThemeToggle.css';

const ThemeToggle = ({ theme, toggleTheme }) => {
    return (
        <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
        >
            <div className={`theme-toggle__track theme-toggle__track--${theme}`}>
                <div className="theme-toggle__thumb">
                    {theme === 'light' ? '☀️' : '🌙'}
                </div>
            </div>
        </button>
    );
};

export default ThemeToggle;
