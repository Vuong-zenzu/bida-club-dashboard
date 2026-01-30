import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

export interface MenuItem {
    id: string;
    name: string;
    price: number;
    category: string;
}

interface MenuContextType {
    menuItems: MenuItem[];
    addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
    updateMenuItem: (id: string, updates: Partial<MenuItem>) => void;
    deleteMenuItem: (id: string) => void;
    categories: string[];
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

const DEFAULT_MENU: MenuItem[] = [
    { id: '1', name: 'Coca Cola', price: 15000, category: 'Đồ uống' },
    { id: '2', name: 'Pepsi', price: 15000, category: 'Đồ uống' },
    { id: '3', name: 'Sting Dâu', price: 18000, category: 'Đồ uống' },
    { id: '4', name: 'Redbull', price: 20000, category: 'Đồ uống' },
    { id: '5', name: 'Café Đen', price: 20000, category: 'Đồ uống' },
    { id: '6', name: 'Café Sữa', price: 25000, category: 'Đồ uống' },
    { id: '7', name: 'Mì Trứng', price: 30000, category: 'Đồ ăn' },
    { id: '8', name: 'Mì Bò', price: 45000, category: 'Đồ ăn' },
    { id: '9', name: 'Cơm Chiên', price: 50000, category: 'Đồ ăn' },
    { id: '10', name: 'Marlboro', price: 35000, category: 'Thuốc lá' },
    { id: '11', name: '555', price: 40000, category: 'Thuốc lá' },
];

const CATEGORIES = ['Đồ uống', 'Đồ ăn', 'Thuốc lá', 'Khác'];

const getInitialMenu = (): MenuItem[] => {
    const saved = localStorage.getItem('bida-menu');
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (e) {
            console.error('Failed to parse menu', e);
        }
    }
    return DEFAULT_MENU;
};

export const MenuProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [menuItems, setMenuItems] = useState<MenuItem[]>(getInitialMenu);

    useEffect(() => {
        localStorage.setItem('bida-menu', JSON.stringify(menuItems));
    }, [menuItems]);

    const addMenuItem = useCallback((item: Omit<MenuItem, 'id'>) => {
        setMenuItems(prev => {
            const newId = Date.now().toString();
            return [...prev, { ...item, id: newId }];
        });
    }, []);

    const updateMenuItem = useCallback((id: string, updates: Partial<MenuItem>) => {
        setMenuItems(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
    }, []);

    const deleteMenuItem = useCallback((id: string) => {
        setMenuItems(prev => prev.filter(item => item.id !== id));
    }, []);

    return (
        <MenuContext.Provider value={{ menuItems, addMenuItem, updateMenuItem, deleteMenuItem, categories: CATEGORIES }}>
            {children}
        </MenuContext.Provider>
    );
};

export const useMenuContext = () => {
    const context = useContext(MenuContext);
    if (context === undefined) {
        throw new Error('useMenuContext must be used within a MenuProvider');
    }
    return context;
};
