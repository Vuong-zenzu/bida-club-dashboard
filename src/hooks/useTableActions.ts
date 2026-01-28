import { useCallback, useState } from 'react';

/**
 * useTableActions
 * 
 * Logic for handling table interactions.
 * Returns handlers that should be triggered by UI buttons.
 */
export const useTableActions = (tableId: string) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const startTable = useCallback(async (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setIsLoading(true);
        setError(null);
        console.log(`[Action] Starting Table ${tableId}...`);

        try {
            // Replace with your actual API call
            const response = await fetch(`/api/tables/${tableId}/start`, { method: 'POST' });
            if (!response.ok) {
                throw new Error('Failed to start table.');
            }
            console.log(`[Action] Table ${tableId} started successfully.`);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('An unknown error occurred.'));
        } finally {
            setIsLoading(false);
        }
    }, [tableId]);

    const stopTable = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        console.log(`[Action] Stop Table ${tableId}`);
    }, [tableId]);

    const switchTable = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        console.log(`[Action] Switch Table ${tableId}`);
    }, [tableId]);

    const orderTable = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        console.log(`[Action] Order for Table ${tableId}`);
    }, [tableId]);

    const payTable = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        console.log(`[Action] Pay Table ${tableId}`);
    }, [tableId]);

    const openMenu = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        console.log(`[Action] Open Menu for Table ${tableId}`);
    }, [tableId]);

    return {
        startTable,
        stopTable,
        switchTable,
        orderTable,
        payTable,
        openMenu,
        isLoading,
        error,
    };
};
