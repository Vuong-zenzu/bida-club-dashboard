import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * useTableTimer
 * 
 * Logic for managing individual table timers.
 * Handles parsing "HH:MM:SS" strings and ticking.
 */
export const useTableTimer = (initialTimeStr: string = '00:00:00', isRunning: boolean = false) => {
    // Helper to parse HH:MM:SS to seconds
    const parseSeconds = useCallback((timeStr: string) => {
        const [h, m, s] = timeStr.split(':').map(Number);
        return (h || 0) * 3600 + (m || 0) * 60 + (s || 0);
    }, []);

    // Helper to format seconds to HH:MM:SS
    const formatTime = useCallback((totalSeconds: number) => {
        const h = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
        const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
        const s = (totalSeconds % 60).toString().padStart(2, '0');
        return `${h}:${m}:${s}`;
    }, []);

    const [seconds, setSeconds] = useState(() => parseSeconds(initialTimeStr));
    const [active, setActive] = useState(isRunning);
    const startTimeRef = useRef<number | null>(null);
    const lastSyncSecondsRef = useRef(seconds); // Keep track of the last known seconds
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Sync with props when they change
    useEffect(() => {
        const newSeconds = parseSeconds(initialTimeStr);
        setSeconds(newSeconds);
        lastSyncSecondsRef.current = newSeconds; // Update our reference on external change
        setActive(isRunning);
    }, [initialTimeStr, isRunning, parseSeconds]);

    // Timer logic using Delta time (Date.now()) to prevent drift
    useEffect(() => {
        if (active) {
            // Adjust start time based on the most recent 'seconds' value
            startTimeRef.current = Date.now() - (lastSyncSecondsRef.current * 1000);

            intervalRef.current = setInterval(() => {
                if (startTimeRef.current) {
                    const now = Date.now();
                    const newSeconds = Math.floor((now - startTimeRef.current) / 1000);
                    setSeconds(newSeconds);
                }
            }, 1000);
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
        // The dependency array is correct. We only want to restart the interval
        // when the active state changes.
    }, [active]);

    const start = useCallback(() => {
        setActive(true);
    }, []);

    const stop = useCallback(() => {
        setActive(false);
        lastSyncSecondsRef.current = seconds; // Save current time when stopping
    }, []);

    const reset = useCallback(() => {
        setActive(false);
        setSeconds(0);
    }, []);

    return {
        time: formatTime(seconds),
        seconds,
        start,
        stop,
        reset,
    };
};
