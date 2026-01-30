import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { THEME_COLORS, LIGHT_THEME_COLORS } from '@/config/theme.config';

type ThemeMode = 'LIGHT' | 'DARK';
type TimeFormat = '12H' | '24H';
type CurrencyFormat = 'FULL' | 'COMPACT';

interface Theme {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    bgPrimary: string;
    bgCard: string;
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
}

interface ThemeContextType {
    theme: Theme;
    mode: ThemeMode;
    timeFormat: TimeFormat;
    currencyFormat: CurrencyFormat;
    updateTheme: (newColors: Partial<Theme>) => void;
    toggleMode: () => void;
    setTimeFormat: (format: TimeFormat) => void;
    setCurrencyFormat: (format: CurrencyFormat) => void;
    formatMoney: (amount: number) => string;
    formatTime: (date: Date | number) => string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Load persisted settings
    const savedMode = localStorage.getItem('bida-theme-mode') as ThemeMode || 'DARK';
    const savedTime = localStorage.getItem('bida-time-format') as TimeFormat || '24H';
    const savedCurrency = localStorage.getItem('bida-currency-format') as CurrencyFormat || 'FULL';

    const [mode, setMode] = useState<ThemeMode>(savedMode);
    const [timeFormat, setTimeFormatState] = useState<TimeFormat>(savedTime);
    const [currencyFormat, setCurrencyFormatState] = useState<CurrencyFormat>(savedCurrency);

    // Initial theme based on mode
    const [theme, setTheme] = useState<Theme>(savedMode === 'LIGHT' ? { ...LIGHT_THEME_COLORS } : { ...THEME_COLORS });

    // Persist and Sync
    useEffect(() => {
        localStorage.setItem('bida-theme-mode', mode);
        setTheme(prev => ({
            ...prev,
            ...(mode === 'LIGHT' ? LIGHT_THEME_COLORS : THEME_COLORS)
        }));
    }, [mode]);

    useEffect(() => {
        localStorage.setItem('bida-time-format', timeFormat);
    }, [timeFormat]);

    useEffect(() => {
        localStorage.setItem('bida-currency-format', currencyFormat);
    }, [currencyFormat]);

    const updateTheme = useCallback((newColors: Partial<Theme>) => {
        setTheme(prev => ({ ...prev, ...newColors }));
    }, []);

    const toggleMode = useCallback(() => {
        setMode(prev => prev === 'DARK' ? 'LIGHT' : 'DARK');
    }, []);

    const setTimeFormat = useCallback((format: TimeFormat) => setTimeFormatState(format), []);
    const setCurrencyFormat = useCallback((format: CurrencyFormat) => setCurrencyFormatState(format), []);

    // Formatters
    const formatMoney = useCallback((amount: number) => {
        if (currencyFormat === 'COMPACT') {
            if (amount >= 1000000) return `${(amount / 1000000).toLocaleString('vi-VN')}M`;
            if (amount >= 1000) return `${(amount / 1000).toLocaleString('vi-VN')}k`;
        }
        return amount.toLocaleString('vi-VN') + 'đ';
    }, [currencyFormat]);

    const formatTime = useCallback((dateInput: Date | number) => {
        const date = typeof dateInput === 'number' ? new Date(dateInput) : dateInput;
        return date.toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: timeFormat === '12H'
        });
    }, [timeFormat]);

    // Sync to CSS variables
    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--color-primary', theme.primary);
        root.style.setProperty('--color-secondary', theme.secondary);
        root.style.setProperty('--color-success', theme.success);
        root.style.setProperty('--color-warning', theme.warning);
        root.style.setProperty('--color-bg-primary', theme.bgPrimary); // Ensure background variable usage
        root.style.setProperty('--color-bg-card', theme.bgCard); // Ensure card background variable usage
        root.style.setProperty('--color-text-primary', theme.textPrimary);

        // Tailwind/Custom overrides
        root.style.setProperty('--primary', theme.primary);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{
            theme,
            mode,
            timeFormat,
            currencyFormat,
            updateTheme,
            toggleMode,
            setTimeFormat,
            setCurrencyFormat,
            formatMoney,
            formatTime
        }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
