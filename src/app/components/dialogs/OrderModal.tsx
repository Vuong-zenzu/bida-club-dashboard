import React, { useState } from 'react';
import { X, Search, Plus, Minus } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useTableContext } from '@/context/TableContext';
import { useMenuContext } from '@/context/MenuContext';

interface OrderModalProps {
    isOpen: boolean;
    onClose: () => void;
    tableNumber: string;
}

export const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose, tableNumber }) => {
    const { theme, formatMoney } = useTheme();
    const { getTable, updateOrder } = useTableContext();
    const { menuItems, categories } = useMenuContext(); // Use Context
    const [activeCategory, setActiveCategory] = useState('Đồ uống');

    if (!isOpen) return null;

    const table = getTable(tableNumber);
    const activeOrderItems = table?.menuItems || [];

    // Filter items based on active category
    const filteredItems = menuItems.filter(item => item.category === activeCategory);

    const handleAddItem = (item: typeof menuItems[0]) => {
        updateOrder(tableNumber, item.id, 1, item.price, item.name);
    };

    const handleUpdateQuantity = (itemId: string, delta: number) => {
        updateOrder(tableNumber, itemId, delta);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in">
            <div
                className="w-full max-w-4xl h-[90vh] md:h-[80vh] rounded-[24px] flex flex-col md:flex-row overflow-hidden shadow-2xl border border-white/10"
                style={{ backgroundColor: theme.bgPrimary }}
            >

                {/* LEFT: Menu Browse */}
                <div className="flex-1 flex flex-col border-b md:border-b-0 md:border-r border-white/10 min-h-0">
                    {/* Header */}
                    <div className="p-4 md:p-6 border-b border-white/10 shrink-0">
                        <div className="flex justify-between items-center mb-4 md:hidden">
                            <h2 className="text-xl font-bold text-white">THỰC ĐƠN</h2>
                            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full">
                                <X size={24} className="text-zinc-400" />
                            </button>
                        </div>
                        <h2 className="hidden md:block text-xl font-bold mb-4" style={{ color: theme.textPrimary }}>THỰC ĐƠN</h2>

                        {/* Categories */}
                        <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`
                    px-4 py-2 rounded-xl whitespace-nowrap text-sm font-bold transition-all
                    ${activeCategory === cat
                                            ? 'text-black'
                                            : 'bg-white/5 text-zinc-400 hover:bg-white/10'
                                        }
                  `}
                                    style={{
                                        backgroundColor: activeCategory === cat ? theme.textPrimary : undefined,
                                        color: activeCategory === cat ? theme.bgPrimary : undefined
                                    }}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Grid Items */}
                    <div className="flex-1 overflow-y-auto p-4 md:p-6">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                            {filteredItems.map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => handleAddItem(item)}
                                    className="p-3 md:p-4 rounded-xl hover:bg-white/5 border border-white/5 text-left transition-all group active:scale-95"
                                    style={{ backgroundColor: theme.bgCard }}
                                >
                                    <div className="font-bold group-hover:text-primary transition-colors mb-1 truncate" style={{ color: theme.textPrimary }}>{item.name}</div>
                                    <div className="text-sm font-mono" style={{ color: theme.textMuted }}>{formatMoney(item.price)}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT: Current Order (Bottom on Mobile) */}
                <div className="w-full md:w-[350px] flex flex-col h-[40%] md:h-auto shrink-0 border-t md:border-t-0 border-white/10 shadow-2xl z-10" style={{ backgroundColor: theme.bgCard }}>
                    <div className="p-4 md:p-6 border-b border-white/10 flex justify-between items-center shrink-0">
                        <div>
                            <div className="text-xs font-bold text-zinc-500 uppercase">Đang gọi cho</div>
                            <div className="text-2xl font-extrabold" style={{ color: theme.textPrimary }}>BÀN {tableNumber}</div>
                        </div>
                        <button onClick={onClose} className="hidden md:block p-2 hover:bg-white/10 rounded-full">
                            <X size={20} className="text-zinc-400" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-black/20">
                        {activeOrderItems.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-zinc-500 text-center">
                                <div className="hidden md:flex w-16 h-16 rounded-full bg-white/5 items-center justify-center mb-4">
                                    <Search size={24} className="opacity-50" />
                                </div>
                                <div className="text-sm">Chưa chọn món</div>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {activeOrderItems.map(item => (
                                    <div key={item.id} className="flex items-center justify-between p-2 md:p-3 bg-white/5 rounded-xl">
                                        <div className="flex-1 mr-2 overflow-hidden">
                                            <div className="font-bold text-sm truncate" style={{ color: theme.textPrimary }}>{item.name}</div>
                                            <div className="text-xs text-zinc-400">{formatMoney(item.price)}</div>
                                        </div>
                                        <div className="flex items-center gap-2 md:gap-3 shrink-0">
                                            <button
                                                onClick={() => handleUpdateQuantity(item.id, -1)}
                                                className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 active:scale-95"
                                            >
                                                <Minus size={14} style={{ color: theme.textPrimary }} />
                                            </button>
                                            <span className="font-bold w-4 text-center" style={{ color: theme.textPrimary }}>{item.quantity}</span>
                                            <button
                                                onClick={() => handleUpdateQuantity(item.id, 1)}
                                                className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 active:scale-95"
                                            >
                                                <Plus size={14} style={{ color: theme.textPrimary }} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="p-4 md:p-6 border-t border-white/10 shrink-0 bg-zinc-900/50 backdrop-blur-md">
                        <div className="flex justify-between mb-4 text-sm">
                            <span className="text-zinc-400">Tạm tính:</span>
                            <span className="font-bold text-lg" style={{ color: theme.textPrimary }}>{formatMoney(activeOrderItems.reduce((s, i) => s + i.price * i.quantity, 0))}</span>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-full py-3 md:py-4 rounded-xl font-extrabold text-zinc-900 hover:opacity-90 transition-all active:scale-95 shadow-lg"
                            style={{ backgroundColor: theme.success }}
                        >
                            XÁC NHẬN
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};
