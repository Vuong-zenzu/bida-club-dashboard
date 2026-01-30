import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { SessionRecord } from '@/types/history';

interface HistoryContextType {
    sessions: SessionRecord[];
    addSession: (record: Omit<SessionRecord, 'id'>) => void;
    getSessionsByDate: (date: Date) => SessionRecord[];
    clearHistory: () => void;
    getTodayRevenue: () => number;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export const HistoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Initialize from localStorage
    const [sessions, setSessions] = useState<SessionRecord[]>(() => {
        const saved = localStorage.getItem('bida-history-sessions');
        return saved ? JSON.parse(saved) : [];
    });

    // Persistence
    useEffect(() => {
        localStorage.setItem('bida-history-sessions', JSON.stringify(sessions));
    }, [sessions]);

    const addSession = useCallback((record: Omit<SessionRecord, 'id'>) => {
        const newSession: SessionRecord = {
            ...record,
            id: crypto.randomUUID(), // Using native randomUUID
        };
        // Prepend to list (newest first)
        setSessions(prev => [newSession, ...prev]);
    }, []);

    const getSessionsByDate = useCallback((date: Date) => {
        const dateStr = date.toISOString().split('T')[0];
        return sessions.filter(s => s.date.startsWith(dateStr));
    }, [sessions]);

    const clearHistory = useCallback(() => {
        setSessions([]);
        localStorage.removeItem('bida-history-sessions');
    }, []);

    const getTodayRevenue = useCallback(() => {
        const today = new Date().toISOString().split('T')[0];
        return sessions
            .filter(s => s.date.startsWith(today))
            .reduce((sum, s) => sum + s.totalAmount, 0);
    }, [sessions]);

    return (
        <HistoryContext.Provider value={{ sessions, addSession, getSessionsByDate, clearHistory, getTodayRevenue }}>
            {children}
        </HistoryContext.Provider>
    );
};

export const useHistory = () => {
    const context = useContext(HistoryContext);
    if (context === undefined) {
        throw new Error('useHistory must be used within a HistoryProvider');
    }
    return context;
};
