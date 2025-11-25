import React from 'react';
import TypeBadge from './TypeBadge';
import './Modal.css';

const Modal = ({ pokemon, isOpen, onClose }) => {
    React.useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen || !pokemon) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose} aria-label="Close modal">
                    ✕
                </button>

                <div className="modal-header">
                    <div className="modal-header__info">
                        <span className="modal-number">#{String(pokemon.id).padStart(3, '0')}</span>
                        <h2 className="modal-title">{pokemon.name}</h2>
                    </div>
                    <div className="modal-types">
                        {pokemon.types.map(({ type }) => (
                            <TypeBadge key={type.name} type={type.name} size="large" />
                        ))}
                    </div>
                </div>

                <div className="modal-body">
                    <div className="modal-image-section">
                        <img
                            src={pokemon.sprite}
                            alt={pokemon.name}
                            className="modal-image"
                        />
                    </div>

                    <div className="modal-stats-section">
                        <h3 className="modal-section-title">Stats</h3>
                        <div className="stat-bars">
                            {pokemon.stats.map(({ stat, base_stat }) => (
                                <div key={stat.name} className="stat-bar">
                                    <div className="stat-bar__label">
                                        <span className="stat-name">{stat.name.replace('-', ' ')}</span>
                                        <span className="stat-value">{base_stat}</span>
                                    </div>
                                    <div className="stat-bar__track">
                                        <div
                                            className="stat-bar__fill"
                                            style={{
                                                width: `${Math.min((base_stat / 255) * 100, 100)}%`,
                                                backgroundColor: getStatColor(base_stat)
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="modal-details-section">
                        <div className="detail-item">
                            <span className="detail-label">Height</span>
                            <span className="detail-value">{(pokemon.height / 10).toFixed(1)} m</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Weight</span>
                            <span className="detail-value">{(pokemon.weight / 10).toFixed(1)} kg</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Generation</span>
                            <span className="detail-value">Gen {pokemon.generation}</span>
                        </div>
                    </div>

                    <div className="modal-abilities-section">
                        <h3 className="modal-section-title">Abilities</h3>
                        <div className="abilities-list">
                            {pokemon.abilities.map(({ ability, is_hidden }) => (
                                <span key={ability.name} className={`ability-badge ${is_hidden ? 'ability-badge--hidden' : ''}`}>
                                    {ability.name.replace('-', ' ')}
                                    {is_hidden && ' (Hidden)'}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper function to color stat bars
const getStatColor = (value) => {
    if (value >= 120) return '#22c55e'; // Green
    if (value >= 80) return '#3b82f6'; // Blue
    if (value >= 50) return '#f59e0b'; // Orange
    return '#ef4444'; // Red
};

export default Modal;
