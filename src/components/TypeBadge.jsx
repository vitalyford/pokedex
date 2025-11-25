import React from 'react';
import { getTypeColor } from '../utils/typeColors';
import './TypeBadge.css';

const TypeBadge = ({ type, size = 'medium' }) => {
    const color = getTypeColor(type);

    return (
        <span
            className={`type-badge type-badge--${size}`}
            style={{ backgroundColor: color }}
        >
            {type}
        </span>
    );
};

export default TypeBadge;
