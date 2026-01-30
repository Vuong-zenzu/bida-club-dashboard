import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';

export interface Table {
    id: string;
    name: string; // Added name property
    status: 'ACTIVE' | 'AVAILABLE' | 'RESERVED' | 'PAUSED';
    startTime: number | null; // Timestamp in milliseconds
    duration: number; // Duration in seconds (saved when paused)
    orderTotal: number;
    hourlyRate: number;
    menuItems: Array<{ id: string; name: string; quantity: number; price: number }>;
}

interface TableContextType {
    tables: Table[];
    getTable: (id: string) => Table | undefined;
    startSession: (id: string) => void;
    stopSession: (id: string) => void;
    togglePause: (id: string) => void;
    transferSession: (fromId: string, toId: string) => void;
    updateOrder: (tableId: string, itemId: string, quantity: number, price?: number, name?: string) => void;
    updateTable: (id: string, updates: Partial<Table>) => void;
    setTableCount: (count: number) => void;
}

const TableContext = createContext<TableContextType | undefined>(undefined);

const DEFAULT_TABLE_COUNT = 12;

const createTable = (id: string): Table => ({
    id,
    name: `Table ${id}`,
    status: 'AVAILABLE',
    startTime: null,
    duration: 0,
    orderTotal: 0,
    hourlyRate: 50000,
    menuItems: []
});

const getInitialTables = (): Table[] => {
    const saved = localStorage.getItem('bida-tables');
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (e) {
            console.error('Failed to parse saved tables', e);
        }
    }
    return Array.from({ length: DEFAULT_TABLE_COUNT }, (_, i) =>
        createTable((i + 1).toString().padStart(2, '0'))
    );
};

export const TableProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [tables, setTables] = useState<Table[]>(getInitialTables);

    // Persist tables to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('bida-tables', JSON.stringify(tables));
    }, [tables]);

    const getTable = useCallback((id: string) => tables.find(t => t.id === id), [tables]);

    const updateTable = useCallback((id: string, updates: Partial<Table>) => {
        setTables(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
    }, []);

    const setTableCount = useCallback((count: number) => {
        setTables(prev => {
            const currentCount = prev.length;
            if (count === currentCount) return prev;

            if (count > currentCount) {
                // Add tables
                const newTables = [...prev];
                for (let i = currentCount; i < count; i++) {
                    const id = (i + 1).toString().padStart(2, '0');
                    newTables.push(createTable(id));
                }
                return newTables;
            } else {
                // Remove tables (only if AVAILABLE)
                // In a real app we might check status, but for "Settings" strict enforcement:
                // We will just slice, effectively deleting the highest IDs.
                return prev.slice(0, count);
            }
        });
    }, []);

    const startSession = useCallback((id: string) => {
        setTables(prev => prev.map(t =>
            t.id === id ? { ...t, status: 'ACTIVE', startTime: Date.now(), duration: 0 } : t
        ));
    }, []);

    const stopSession = useCallback((id: string) => {
        setTables(prev => prev.map(t =>
            t.id === id ? { ...t, status: 'AVAILABLE', startTime: null, duration: 0, orderTotal: 0, menuItems: [] } : t
        ));
    }, []);

    const togglePause = useCallback((id: string) => {
        setTables(prev => prev.map(t => {
            if (t.id !== id) return t;

            if (t.status === 'ACTIVE' && t.startTime) {
                // Pause: Save duration, clear startTime
                // elapsedSinceStart includes previous duration because startTime was backdated on resume
                const elapsedSinceStart = Math.floor((Date.now() - t.startTime) / 1000);
                return { ...t, status: 'PAUSED', duration: elapsedSinceStart, startTime: null };
            } else if (t.status === 'PAUSED') {
                // Resume: Reset startTime relative to saved duration
                // effectiveStartTime = Now - (SavedDuration * 1000)
                const effectiveStartTime = Date.now() - (t.duration * 1000); // Wait, duration is seconds? Yes.
                return { ...t, status: 'ACTIVE', startTime: effectiveStartTime };
            } else if (t.status === 'ACTIVE' && !t.startTime) {
                // Should not happen if active, but safe guard
                return { ...t, status: 'PAUSED', startTime: null };
            }
            // For available/reserved, do nothing
            return t;
        }));
    }, []);

    const transferSession = useCallback((fromId: string, toId: string) => {
        setTables(prev => {
            const fromTable = prev.find(t => t.id === fromId);
            // Support moving both ACTIVE and PAUSED sessions
            if (!fromTable || (fromTable.status !== 'ACTIVE' && fromTable.status !== 'PAUSED')) return prev;

            return prev.map(t => {
                if (t.id === fromId) {
                    // STRICT RESET: Source table becomes AVAILABLE
                    return {
                        ...t,
                        status: 'AVAILABLE',
                        startTime: null,
                        duration: 0,
                        orderTotal: 0,
                        menuItems: []
                    };
                }
                if (t.id === toId) {
                    // COPY TO TARGET: Inherit all session properties
                    return {
                        ...t,
                        status: fromTable.status, // Keep same status (ACTIVE/PAUSED)
                        startTime: fromTable.startTime,
                        duration: fromTable.duration, // Copy duration for paused state correct resumption
                        orderTotal: fromTable.orderTotal,
                        menuItems: JSON.parse(JSON.stringify(fromTable.menuItems)) // Deep copy items
                    };
                }
                return t;
            });
        });
    }, []);

    const updateOrder = useCallback((tableId: string, itemId: string, quantity: number, price?: number, name?: string) => {
        setTables(prev => prev.map(t => {
            if (t.id !== tableId) return t;

            let newItems = [...t.menuItems];
            const existingIndex = newItems.findIndex(i => i.id === itemId);

            if (existingIndex > -1) {
                // Update existing
                const item = newItems[existingIndex];
                const newQty = item.quantity + quantity;
                if (newQty <= 0) {
                    newItems.splice(existingIndex, 1);
                } else {
                    newItems[existingIndex] = { ...item, quantity: newQty };
                }
            } else if (quantity > 0 && price && name) {
                // Add new
                newItems.push({ id: itemId, name, price, quantity });
            }

            const newTotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            return { ...t, menuItems: newItems, orderTotal: newTotal };
        }));
    }, []);

    return (
        <TableContext.Provider value={{ tables, getTable, startSession, stopSession, togglePause, transferSession, updateOrder, updateTable, setTableCount }}>
            {children}
        </TableContext.Provider>
    );
};

export const useTableContext = () => {
    const context = useContext(TableContext);
    if (context === undefined) {
        throw new Error('useTableContext must be used within a TableProvider');
    }
    return context;
};
