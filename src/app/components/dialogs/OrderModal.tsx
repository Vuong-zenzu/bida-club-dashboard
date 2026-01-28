import React, { useState } from 'react';
import { X, Search, Plus, Minus } from 'lucide-react';
import { THEME_COLORS, formatCurrency } from '@/config/theme.config';

interface OrderModalProps {
    isOpen: boolean;
    onClose: () => void;
    tableNumber: string;
}

export const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose, tableNumber }) => {
    if (!isOpen) return null;

    const categories = ['Đồ uống', 'Đồ ăn', 'Thuốc lá', 'Khác'];
    const [activeCategory, setActiveCategory] = useState(categories[0]);

    // Mock Menu Items
    const menuItems = [
        { id: 1, name: 'Coca Cola', price: 15000, category: 'Đồ uống' },
        { id: 2, name: 'Pepsi', price: 15000, category: 'Đồ uống' },
        { id: 3, name: 'Sting Dâu', price: 18000, category: 'Đồ uống' },
        { id: 4, name: 'Redbull', price: 20000, category: 'Đồ uống' },
        { id: 5, name: 'Café Đen', price: 20000, category: 'Đồ uống' },
        { id: 6, name: 'Café Sữa', price: 25000, category: 'Đồ uống' },
        { id: 7, name: 'Mì Trứng', price: 30000, category: 'Đồ ăn' },
        { id: 8, name: 'Mì Bò', price: 45000, category: 'Đồ ăn' },
        { id: 9, name: 'Cơm Chiên', price: 50000, category: 'Đồ ăn' },
        { id: 10, name: 'Marlboro', price: 35000, category: 'Thuốc lá' },
        { id: 11, name: '555', price: 40000, category: 'Thuốc lá' },
    ];

    const filteredItems = menuItems.filter(item => item.category === activeCategory);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in">
            <div
                className="w-full max-w-4xl h-[80vh] rounded-[24px] flex overflow-hidden shadow-2xl border border-white/10"
                style={{ backgroundColor: THEME_COLORS.bgPrimary }}
            >

                {/* LEFT: Menu Browse */}
                <div className="flex-1 flex flex-col border-r border-white/10">
                    {/* Header */}
                    <div className="p-6 border-b border-white/10">
                        <h2 className="text-xl font-bold text-white mb-4">THỰC ĐƠN</h2>
                        {/* Categories */}
                        <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`
                    px-4 py-2 rounded-xl whitespace-nowrap text-sm font-bold transition-all
                    ${activeCategory === cat
                                            ? 'bg-white text-black'
                                            : 'bg-white/5 text-zinc-400 hover:bg-white/10'
                                        }
                  `}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Grid Items */}
                    <div className="flex-1 overflow-y-auto p-6">
                        <div className="grid grid-cols-3 gap-4">
                            {filteredItems.map(item => (
                                <button
                                    key={item.id}
                                    className="p-4 rounded-xl bg-zinc-800/50 hover:bg-zinc-800 border border-white/5 text-left transition-all group"
                                >
                                    <div className="font-bold text-white group-hover:text-primary transition-colors mb-1">{item.name}</div>
                                    <div className="text-zinc-400 text-sm font-mono">{formatCurrency(item.price)}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT: Current Order */}
                <div className="w-[350px] flex flex-col bg-zinc-900/50">
                    <div className="p-6 border-b border-white/10 flex justify-between items-center">
                        <div>
                            <div className="text-xs font-bold text-zinc-500 uppercase">Đang gọi cho</div>
                            <div className="text-2xl font-extrabold text-white">BÀN {tableNumber}</div>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full">
                            <X size={20} className="text-zinc-400" />
                        </button>
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center text-zinc-500 p-8 text-center">
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                            <Search size={24} className="opacity-50" />
                        </div>
                        <div className="text-sm">Chưa có món nào được chọn</div>
                    </div>

                    <div className="p-6 border-t border-white/10">
                        <button
                            className="w-full py-4 rounded-xl font-extrabold text-zinc-900 hover:opacity-90 transition-all"
                            style={{ backgroundColor: THEME_COLORS.success }}
                        >
                            XÁC NHẬN
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};
