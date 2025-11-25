import React from 'react';
import ThemeToggle from './ThemeToggle';
import { GEN_LIMITS } from '../hooks/usePokemonData';
import './Header.css';

const Header = ({ theme, toggleTheme, selectedGen, onGenSelect, compareMode, onToggleCompareMode, compareCount }) => {
    return (
        <header className="header">
            <div className="container">
                <div className="header__content">
                    <div className="header__logo">
                        <h1 className="header__title">
                            <span className="header__pokeball">⚪</span>
                            Pokédex
                        </h1>
                        <p className="header__subtitle">Gen 1-7 • 809 Pokémon</p>
                    </div>

                    <div className="header__controls">
                        {!compareMode && (
                            <div className="gen-selector">
                                <button
                                    className={`gen-btn ${selectedGen === 'all' ? 'gen-btn--active' : ''}`}
                                    onClick={() => onGenSelect('all')}
                                >
                                    All
                                </button>
                                <button
                                    className={`gen-btn gen-btn--favorites ${selectedGen === 'favorites' ? 'gen-btn--active' : ''}`}
                                    onClick={() => onGenSelect('favorites')}
                                >
                                    ⭐ Favorites
                                </button>
                                {Object.keys(GEN_LIMITS).map(gen => (
                                    <button
                                        key={gen}
                                        className={`gen-btn ${selectedGen === parseInt(gen) ? 'gen-btn--active' : ''}`}
                                        onClick={() => onGenSelect(parseInt(gen))}
                                    >
                                        Gen {gen}
                                    </button>
                                ))}
                            </div>
                        )}

                        <button
                            className={`compare-toggle ${compareMode ? 'compare-toggle--active' : ''}`}
                            onClick={onToggleCompareMode}
                        >
                            ⚔️ Compare {compareMode && compareCount > 0 && `(${compareCount})`}
                        </button>

                        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
