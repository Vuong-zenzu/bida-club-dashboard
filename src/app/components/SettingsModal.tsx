import React, { useState, useEffect } from 'react';
import { Palette, X, Layout, Coffee, Sun, Moon, Clock, DollarSign } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useTableContext } from '@/context/TableContext';
import { useMenuContext } from '@/context/MenuContext';
import { THEME_COLORS, THEME_EFFECTS } from '@/config/theme.config';

interface SettingsModalProps {
    onClose: () => void;
}

type TabType = 'INTERFACE' | 'TABLES' | 'MENU';

export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState<TabType>('INTERFACE');
    const {
        theme,
        updateTheme,
        mode,
        toggleMode,
        timeFormat,
        setTimeFormat,
        currencyFormat,
        setCurrencyFormat
    } = useTheme();
    const { tables, updateTable, setTableCount } = useTableContext();
    const { menuItems, addMenuItem, updateMenuItem, deleteMenuItem, categories } = useMenuContext();

    // Theme State (Now synced with Context)
    const [tempPrimary, setTempPrimary] = useState(theme.primary);
    const [tempSecondary, setTempSecondary] = useState(theme.secondary);

    // Sync local state when theme changes (e.g. if updated from elsewhere or reset)
    useEffect(() => {
        setTempPrimary(theme.primary);
        setTempSecondary(theme.secondary);
    }, [theme]);

    // Menu Management State
    const [showAddMenuForm, setShowAddMenuForm] = useState(false);
    // Local state for new item form only
    const [newItem, setNewItem] = useState({ name: '', price: '', cat: 'Đồ uống' });

    const themePresets = [
        { name: 'Cyber Cyan', primary: '#00F0FF', secondary: '#FFD700', success: '#00FF88', warning: '#FF8C42' },
        { name: 'Neon Red', primary: '#FF0055', secondary: '#FFD700', success: '#00FF88', warning: '#FF8C42' },
        { name: 'Electric Purple', primary: '#AA00FF', secondary: '#FFD700', success: '#00FF88', warning: '#FF8C42' },
        { name: 'Matrix Green', primary: '#00FF41', secondary: '#FFD700', success: '#00FF88', warning: '#FF8C42' },
        { name: 'Gold Luxury', primary: '#FFD700', secondary: '#00F0FF', success: '#00FF88', warning: '#FF8C42' },
    ];

    const applyTheme = (primary: string, secondary: string, success: string, warning: string) => {
        setTempPrimary(primary);
        setTempSecondary(secondary);

        updateTheme({
            primary,
            secondary,
            success,
            warning
        });
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-8"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(10px)' }}
        >
            <div
                className="rounded-[24px] w-full max-w-5xl h-[90vh] md:h-[85vh] flex flex-col overflow-hidden"
                style={{
                    ...THEME_EFFECTS.cardBase,
                    border: `1px solid ${theme.primary}40`,
                    backgroundColor: theme.bgPrimary, // Use dynamic bgPrimary
                }}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 md:p-6 border-b border-white/10 shrink-0">
                    <div className="flex items-center gap-3">
                        <h2 className="text-xl md:text-2xl font-extrabold tracking-tight" style={{ color: theme.textPrimary }}>CÀI ĐẶT HỆ THỐNG</h2>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-transform text-zinc-400 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                {/* Content Layout */}
                <div className="flex flex-col md:flex-row flex-1 overflow-hidden">

                    {/* Sidebar Tabs (Vertical on Desktop, Horizontal Scroll on Mobile) */}
                    <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/10 shrink-0">
                        <div className="flex md:flex-col overflow-x-auto md:overflow-y-auto p-2 md:p-4 gap-2 custom-scrollbar">
                            <button
                                onClick={() => setActiveTab('INTERFACE')}
                                className={`flex-shrink-0 flex items-center gap-2 md:gap-3 px-3 py-2 md:px-4 md:py-3 rounded-xl transition-all font-semibold whitespace-nowrap ${activeTab === 'INTERFACE' ? 'shadow-lg' : 'hover:bg-white/5'}`}
                                style={activeTab === 'INTERFACE' ? { backgroundColor: theme.primary, color: '#000' } : { color: theme.textSecondary }}
                            >
                                <Palette size={18} className="md:w-5 md:h-5" />
                                <span className="text-sm md:text-base">Giao diện</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('TABLES')}
                                className={`flex-shrink-0 flex items-center gap-2 md:gap-3 px-3 py-2 md:px-4 md:py-3 rounded-xl transition-all font-semibold whitespace-nowrap ${activeTab === 'TABLES' ? 'shadow-lg' : 'hover:bg-white/5'}`}
                                style={activeTab === 'TABLES' ? { backgroundColor: theme.primary, color: '#000' } : { color: theme.textSecondary }}
                            >
                                <Layout size={18} className="md:w-5 md:h-5" />
                                <span className="text-sm md:text-base">Cài đặt Bàn</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('MENU')}
                                className={`flex-shrink-0 flex items-center gap-2 md:gap-3 px-3 py-2 md:px-4 md:py-3 rounded-xl transition-all font-semibold whitespace-nowrap ${activeTab === 'MENU' ? 'shadow-lg' : 'hover:bg-white/5'}`}
                                style={activeTab === 'MENU' ? { backgroundColor: theme.primary, color: '#000' } : { color: theme.textSecondary }}
                            >
                                <Coffee size={18} className="md:w-5 md:h-5" />
                                <span className="text-sm md:text-base">Thực đơn</span>
                            </button>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 p-4 md:p-8 overflow-y-auto" style={{ backgroundColor: theme.bgPrimary }}>

                        {/* TAB: INTERFACE (Old ThemeCustomizer) */}
                        {activeTab === 'INTERFACE' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">

                                {/* 1. General Settings (New) */}
                                <div>
                                    <h3 className="text-xl font-bold mb-4" style={{ color: theme.textPrimary }}>Cấu hình chung</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                                        {/* Light/Dark Mode */}
                                        <div className="p-4 rounded-xl border border-white/10" style={{ backgroundColor: theme.bgCard }}>
                                            <label className="block text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: theme.textSecondary }}>
                                                <Sun size={16} /> Chế độ hiển thị
                                            </label>
                                            <button
                                                onClick={toggleMode}
                                                className="w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all"
                                                style={{
                                                    backgroundColor: mode === 'LIGHT' ? '#fff' : '#000',
                                                    borderColor: theme.primary,
                                                    color: mode === 'LIGHT' ? '#000' : '#fff'
                                                }}
                                            >
                                                <span className="font-bold">{mode === 'LIGHT' ? 'Light Mode' : 'Dark Mode'}</span>
                                                {mode === 'LIGHT' ? <Sun size={20} className="text-orange-500" /> : <Moon size={20} className="text-blue-400" />}
                                            </button>
                                        </div>

                                        {/* Time Format */}
                                        <div className="p-4 rounded-xl border border-white/10" style={{ backgroundColor: theme.bgCard }}>
                                            <label className="block text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: theme.textSecondary }}>
                                                <Clock size={16} /> Kiểu giờ
                                            </label>
                                            <div className="flex gap-2 p-1 rounded-lg bg-black/20">
                                                <button
                                                    onClick={() => setTimeFormat('12H')}
                                                    className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${timeFormat === '12H' ? 'shadow-md' : 'text-zinc-500 hover:text-zinc-300'}`}
                                                    style={timeFormat === '12H' ? { backgroundColor: theme.primary, color: '#000' } : {}}
                                                >
                                                    12H (AM/PM)
                                                </button>
                                                <button
                                                    onClick={() => setTimeFormat('24H')}
                                                    className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${timeFormat === '24H' ? 'shadow-md' : 'text-zinc-500 hover:text-zinc-300'}`}
                                                    style={timeFormat === '24H' ? { backgroundColor: theme.primary, color: '#000' } : {}}
                                                >
                                                    24H
                                                </button>
                                            </div>
                                        </div>

                                        {/* Currency Format */}
                                        <div className="p-4 rounded-xl border border-white/10" style={{ backgroundColor: theme.bgCard }}>
                                            <label className="block text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: theme.textSecondary }}>
                                                <DollarSign size={16} /> Đơn vị tiền tệ
                                            </label>
                                            <div className="flex gap-2 p-1 rounded-lg bg-black/20">
                                                <button
                                                    onClick={() => setCurrencyFormat('FULL')}
                                                    className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${currencyFormat === 'FULL' ? 'shadow-md' : 'text-zinc-500 hover:text-zinc-300'}`}
                                                    style={currencyFormat === 'FULL' ? { backgroundColor: theme.primary, color: '#000' } : {}}
                                                >
                                                    Đầy đủ (đ)
                                                </button>
                                                <button
                                                    onClick={() => setCurrencyFormat('COMPACT')}
                                                    className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${currencyFormat === 'COMPACT' ? 'shadow-md' : 'text-zinc-500 hover:text-zinc-300'}`}
                                                    style={currencyFormat === 'COMPACT' ? { backgroundColor: theme.primary, color: '#000' } : {}}
                                                >
                                                    Rút gọn (k)
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                {/* 2. Theme Presets */}
                                <div>
                                    <h3 className="text-xl font-bold mb-4" style={{ color: theme.textPrimary }}>Giao diện mẫu</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {themePresets.map((preset, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => applyTheme(preset.primary, preset.secondary, preset.success, preset.warning)}
                                                className="p-4 rounded-xl border border-white/10 hover:border-white/30 transition-all text-left group"
                                                style={{ backgroundColor: theme.bgCard }}
                                            >
                                                <div className="flex gap-2 mb-2">
                                                    <div className="w-4 h-4 rounded-full shadow-lg" style={{ background: preset.primary }}></div>
                                                    <div className="w-4 h-4 rounded-full shadow-lg" style={{ background: preset.secondary }}></div>
                                                </div>
                                                <div className="font-semibold group-hover:brightness-110" style={{ color: theme.textSecondary }}>{preset.name}</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold mb-4" style={{ color: theme.textPrimary }}>Màu sắc tùy chỉnh</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="p-4 rounded-xl border border-white/10" style={{ backgroundColor: theme.bgCard }}>
                                            <label className="block text-sm font-semibold mb-2" style={{ color: theme.textSecondary }}>Màu Chính (Primary)</label>
                                            <div className="flex gap-4">
                                                <input
                                                    type="color"
                                                    value={tempPrimary}
                                                    onChange={e => {
                                                        const newVal = e.target.value;
                                                        setTempPrimary(newVal);
                                                        updateTheme({ primary: newVal });
                                                    }}
                                                    className="w-12 h-12 rounded cursor-pointer bg-transparent border-0"
                                                />
                                                <input
                                                    type="text"
                                                    value={tempPrimary}
                                                    onChange={e => {
                                                        const newVal = e.target.value;
                                                        setTempPrimary(newVal);
                                                        updateTheme({ primary: newVal });
                                                    }}
                                                    className="flex-1 border border-white/10 rounded px-3 font-mono"
                                                    style={{ backgroundColor: 'rgba(0,0,0,0.2)', color: theme.textPrimary }}
                                                />
                                            </div>
                                        </div>
                                        <div className="p-4 rounded-xl border border-white/10" style={{ backgroundColor: theme.bgCard }}>
                                            <label className="block text-sm font-semibold mb-2" style={{ color: theme.textSecondary }}>Màu Phụ (Secondary)</label>
                                            <div className="flex gap-4">
                                                <input
                                                    type="color"
                                                    value={tempSecondary}
                                                    onChange={e => {
                                                        const newVal = e.target.value;
                                                        setTempSecondary(newVal);
                                                        updateTheme({ secondary: newVal });
                                                    }}
                                                    className="w-12 h-12 rounded cursor-pointer bg-transparent border-0"
                                                />
                                                <input
                                                    type="text"
                                                    value={tempSecondary}
                                                    onChange={e => {
                                                        const newVal = e.target.value;
                                                        setTempSecondary(newVal);
                                                        updateTheme({ secondary: newVal });
                                                    }}
                                                    className="flex-1 border border-white/10 rounded px-3 font-mono"
                                                    style={{ backgroundColor: 'rgba(0,0,0,0.2)', color: theme.textPrimary }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB: TABLES (Real Data) */}
                        {activeTab === 'TABLES' && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/10">
                                    <div>
                                        <h3 className="text-xl font-bold text-white">Cấu hình Bàn</h3>
                                        <p className="text-sm text-zinc-400">Quản lý số lượng và đơn giá</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2 bg-black/20 px-3 py-2 rounded-lg border border-white/10">
                                            <span className="text-sm text-zinc-400">Tổng số bàn:</span>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => setTableCount(Math.max(1, tables.length - 1))}
                                                    className="w-8 h-8 flex items-center justify-center rounded bg-white/5 hover:bg-white/10 border border-white/10 text-white"
                                                >
                                                    -
                                                </button>
                                                <span className="font-mono font-bold text-xl min-w-[2ch] text-center text-white">{tables.length}</span>
                                                <button
                                                    onClick={() => setTableCount(tables.length + 1)}
                                                    className="w-8 h-8 flex items-center justify-center rounded bg-white/5 hover:bg-white/10 border border-white/10 text-white"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid gap-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                                    {tables.map(table => (
                                        <div key={table.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 gap-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center font-bold text-lg text-white shrink-0 shadow-inner border border-white/5">
                                                    {table.id}
                                                </div>
                                                <div className="flex-1">
                                                    <label className="text-xs text-zinc-500 uppercase block mb-1">Tên bàn</label>
                                                    <input
                                                        type="text"
                                                        value={table.name}
                                                        onChange={(e) => updateTable(table.id, { name: e.target.value })}
                                                        className="bg-transparent border-b border-zinc-700 text-white font-bold focus:border-white focus:outline-none w-full md:w-48"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-6">
                                                <div>
                                                    <div className="text-xs text-zinc-500 uppercase mb-1">Trạng thái</div>
                                                    <div className={`text-sm font-bold ${table.status === 'ACTIVE' ? 'text-green-500' :
                                                        table.status === 'PAUSED' ? 'text-yellow-500' : 'text-zinc-500'
                                                        }`}>
                                                        {table.status}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-xs text-zinc-500 uppercase mb-1">Giá giờ (VNĐ)</div>
                                                    <div className="flex items-center gap-1">
                                                        <input
                                                            type="number"
                                                            value={table.hourlyRate}
                                                            onChange={(e) => updateTable(table.id, { hourlyRate: Number(e.target.value) })}
                                                            className="w-24 bg-transparent border-b border-zinc-700 text-right font-mono font-bold text-green-400 focus:border-green-400 focus:outline-none"
                                                        />
                                                        <span className="text-zinc-500 text-sm">/h</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* TAB: MENU (Context Data) */}
                        {activeTab === 'MENU' && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/10">
                                    <div>
                                        <h3 className="text-xl font-bold text-white">Quản lý Thực đơn</h3>
                                        <p className="text-sm text-zinc-400">Thêm, sửa, xóa món ăn, thức uống</p>
                                    </div>
                                    <button
                                        onClick={() => setShowAddMenuForm(true)}
                                        className="px-4 py-2 rounded-lg bg-green-500/20 text-green-500 font-bold hover:bg-green-500/30 border border-green-500/30"
                                    >
                                        + Món mới
                                    </button>
                                </div>

                                {/* Add Item Form */}
                                {showAddMenuForm && (
                                    <div className="p-4 rounded-xl bg-white/10 border border-white/20 mb-4 animate-in fade-in zoom-in duration-200">
                                        <h4 className="font-bold text-white mb-3">Thêm món mới</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                            <input
                                                type="text"
                                                placeholder="Tên món (VD: Sting)"
                                                value={newItem.name}
                                                onChange={e => setNewItem({ ...newItem, name: e.target.value })}
                                                className="bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-green-500"
                                            />
                                            <input
                                                type="number"
                                                placeholder="Giá (VD: 15000)"
                                                value={newItem.price}
                                                onChange={e => setNewItem({ ...newItem, price: e.target.value })}
                                                className="bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-green-500"
                                            />
                                            <select
                                                value={newItem.cat}
                                                onChange={e => setNewItem({ ...newItem, cat: e.target.value })}
                                                className="bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-green-500"
                                            >
                                                {categories.map((cat, idx) => (
                                                    <option key={idx} value={cat} className="bg-zinc-800 text-white">{cat}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="flex justify-end gap-3">
                                            <button
                                                onClick={() => setShowAddMenuForm(false)}
                                                className="px-4 py-2 rounded-lg text-zinc-400 hover:text-white"
                                            >
                                                Hủy
                                            </button>
                                            <button
                                                onClick={() => {
                                                    if (newItem.name && newItem.price) {
                                                        addMenuItem({
                                                            name: newItem.name,
                                                            price: Number(newItem.price),
                                                            category: newItem.cat
                                                        });
                                                        setNewItem({ name: '', price: '', cat: categories[0] || 'Đồ uống' });
                                                        setShowAddMenuForm(false);
                                                    }
                                                }}
                                                className="px-4 py-2 rounded-lg bg-green-500 text-black font-bold hover:bg-green-400"
                                            >
                                                Lưu món
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                                    {menuItems.map((item) => (
                                        <div key={item.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors group">
                                            <div>
                                                <div className="font-bold text-white group-hover:text-primary transition-colors">{item.name}</div>
                                                <div className="text-xs text-zinc-500">{item.category}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-mono font-bold text-yellow-500">{item.price.toLocaleString()}đ</div>
                                                <div className="flex gap-2 justify-end mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => {
                                                            const newPrice = prompt("Nhập giá mới:", item.price.toString());
                                                            if (newPrice && !isNaN(Number(newPrice))) {
                                                                updateMenuItem(item.id, { price: Number(newPrice) });
                                                            }
                                                        }}
                                                        className="text-xs px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-zinc-300"
                                                    >
                                                        Sửa giá
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            if (confirm(`Xóa món ${item.name}?`)) deleteMenuItem(item.id);
                                                        }}
                                                        className="text-xs px-2 py-1 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400"
                                                    >
                                                        Xóa
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};
