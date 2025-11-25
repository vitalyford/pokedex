import { useState, useEffect, useRef } from 'react';

export const useVirtualization = (items, itemHeight = 250, containerHeight = 600) => {
    const [visibleRange, setVisibleRange] = useState({ start: 0, end: 20 });
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!scrollContainerRef.current) return;

            const scrollTop = scrollContainerRef.current.scrollTop;
            const start = Math.floor(scrollTop / itemHeight);
            const visibleCount = Math.ceil(containerHeight / itemHeight);
            const end = start + visibleCount + 5; // Buffer of 5 items

            setVisibleRange({ start: Math.max(0, start - 5), end: Math.min(items.length, end) });
        };

        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            handleScroll(); // Initial calculation
        }

        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, [items.length, itemHeight, containerHeight]);

    const visibleItems = items.slice(visibleRange.start, visibleRange.end);
    const totalHeight = items.length * itemHeight;
    const offsetY = visibleRange.start * itemHeight;

    return {
        scrollContainerRef,
        visibleItems,
        totalHeight,
        offsetY,
        visibleRange
    };
};
