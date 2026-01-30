import { useState, useEffect, useCallback } from 'react';

/**
 * useTableTimer
 * 
 * Logic for managing individual table timers using timestamps.
 * Accepts a startTime (timestamp) and returns formatted duration.
 */
export const useTableTimer = (startTime: number | null, staticSeconds: number = 0) => {

    // Helper to format seconds to HH:MM:SS
    const formatTime = useCallback((totalSeconds: number) => {
        const h = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
        const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
        const s = (totalSeconds % 60).toString().padStart(2, '0');
        return `${h}:${m}:${s}`;
    }, []);

    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        if (!startTime) {
            setSeconds(staticSeconds || 0);
            return;
        }

        // Initial set
        const calculateSeconds = () => Math.floor((Date.now() - startTime) / 1000);
        setSeconds(calculateSeconds());

        // Update every second
        const interval = setInterval(() => {
            setSeconds(calculateSeconds());
        }, 1000);

        return () => clearInterval(interval);
    }, [startTime, staticSeconds]);

    return formatTime(seconds);
};
