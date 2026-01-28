import React, { useState } from 'react';
import { ArrowLeft, Calendar, TrendingUp, DollarSign, Clock, FileSpreadsheet } from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    LineChart, Line, AreaChart, Area
} from 'recharts';
import { THEME_COLORS, THEME_EFFECTS, formatCurrency } from '@/config/theme.config';

interface RevenueReportProps {
    onBack: () => void;
}

export const RevenueReport: React.FC<RevenueReportProps> = ({ onBack }) => {
    const [timeRange, setTimeRange] = useState<'WEEK' | 'MONTH'>('WEEK');

    // Mock Data
    const dailyData = [
        { name: 'T2', revenue: 2500000, orders: 15 },
        { name: 'T3', revenue: 3200000, orders: 20 },
        { name: 'T4', revenue: 2800000, orders: 18 },
        { name: 'T5', revenue: 4100000, orders: 25 },
        { name: 'T6', revenue: 5500000, orders: 35 },
        { name: 'T7', revenue: 7200000, orders: 42 },
        { name: 'CN', revenue: 6800000, orders: 40 },
    ];

    const historyData = [
        { id: 'HD001', table: '01', timeIn: '10:30', timeOut: '12:45', total: 350000, status: 'Completed' },
        { id: 'HD002', table: '05', timeIn: '11:00', timeOut: '13:00', total: 420000, status: 'Completed' },
        { id: 'HD003', table: '03', timeIn: '14:15', timeOut: '16:30', total: 280000, status: 'Completed' },
        { id: 'HD004', table: '02', timeIn: '15:00', timeOut: '17:15', total: 550000, status: 'Completed' },
        { id: 'HD005', table: '08', timeIn: '18:30', timeOut: '20:45', total: 890000, status: 'Completed' },
    ];

    return (
        <div className="min-h-screen bg-zinc-950 text-white p-6 animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={onBack}
                    className="p-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 transition-colors border border-white/10"
                >
                    <ArrowLeft size={24} className="text-zinc-400" />
                </button>
                <div>
                    <h1 className="text-3xl font-bold text-white">Báo Cáo Doanh Thu</h1>
                    <p className="text-zinc-500">Chi tiết hoạt động kinh doanh</p>
                </div>
                <div className="ml-auto flex bg-zinc-900 rounded-xl p-1 border border-white/10">
                    <button
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-green-500 hover:bg-white/5 transition-all"
                    >
                        <FileSpreadsheet size={18} />
                        Xuất Excel
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* LEFT: Charts */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Revenue Chart */}
                    <div className="bg-zinc-900/50 rounded-[24px] p-6 border border-white/5">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold flex items-center gap-2">
                                <TrendingUp size={20} className="text-green-500" />
                                Biểu đồ doanh thu
                            </h3>
                            <div className="flex gap-4">
                                <div>
                                    <div className="text-sm text-zinc-500 font-semibold mb-1">Hôm nay</div>
                                    <div className="text-2xl font-black text-white">4.2M</div>
                                </div>
                                <div className="pl-4 border-l border-white/10">
                                    <div className="text-sm text-zinc-500 font-semibold mb-1">Tháng này</div>
                                    <div className="text-2xl font-black text-primary" style={{ color: THEME_COLORS.primary }}>128.5M</div>
                                </div>
                            </div>

                            {/* Toggle inside Chart */}
                            <div className="flex bg-zinc-800/50 rounded-lg p-1 border border-white/5">
                                <button
                                    onClick={() => setTimeRange('WEEK')}
                                    className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${timeRange === 'WEEK' ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                                >
                                    Tuần
                                </button>
                                <button
                                    onClick={() => setTimeRange('MONTH')}
                                    className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${timeRange === 'MONTH' ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                                >
                                    Tháng
                                </button>
                            </div>
                        </div>

                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={dailyData}>
                                    <defs>
                                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor={THEME_COLORS.primary} stopOpacity={0.3} />
                                            <stop offset="95%" stopColor={THEME_COLORS.primary} stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                    <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000000}M`} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#18181b', borderColor: '#333', borderRadius: '12px' }}
                                        itemStyle={{ color: '#fff' }}
                                        formatter={(value: number) => formatCurrency(value)}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke={THEME_COLORS.primary}
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorRevenue)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Orders Chart */}
                    <div className="bg-zinc-900/50 rounded-[24px] p-6 border border-white/5">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold flex items-center gap-2">
                                <Clock size={20} className="text-blue-500" />
                                Lượt khách
                            </h3>
                            <div className="text-2xl font-black text-white">195</div>
                        </div>

                        <div className="h-[200px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={dailyData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                    <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip
                                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                        contentStyle={{ backgroundColor: '#18181b', borderColor: '#333', borderRadius: '12px' }}
                                    />
                                    <Bar dataKey="orders" fill={THEME_COLORS.secondary} radius={[6, 6, 0, 0]} barSize={40} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* RIGHT: History List */}
                <div className="lg:col-span-1 bg-zinc-900/50 rounded-[24px] p-6 border border-white/5 flex flex-col h-[calc(100vh-8rem)]">
                    <h3 className="font-bold mb-6 flex items-center gap-2">
                        <DollarSign size={20} className="text-yellow-500" />
                        Giao dịch gần đây
                    </h3>

                    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-3">
                        {historyData.map((item) => (
                            <div key={item.id} className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-bold text-white">Bàn {item.table}</span>
                                    <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-500 font-bold">{item.status}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm text-zinc-400 mb-2">
                                    <div className="flex items-center gap-1">
                                        <Clock size={14} />
                                        {item.timeIn} - {item.timeOut}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center pt-2 border-t border-white/5">
                                    <span className="text-xs text-zinc-500">{item.id}</span>
                                    <span className="font-mono font-bold text-primary" style={{ color: THEME_COLORS.primary }}>
                                        {formatCurrency(item.total)}
                                    </span>
                                </div>
                            </div>
                        ))}

                        {/* More dummy items to test scroll */}
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={`d-${i}`} className="p-4 rounded-xl bg-white/5 border border-white/5 opacity-50">
                                <div className="h-4 bg-white/10 rounded w-1/3 mb-2"></div>
                                <div className="h-3 bg-white/5 rounded w-1/2"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
