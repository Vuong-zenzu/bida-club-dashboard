import React, { useState } from 'react';
import { ArrowLeft, TrendingUp, DollarSign, Clock, FileSpreadsheet } from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    AreaChart, Area
} from 'recharts';
import { THEME_EFFECTS } from '@/config/theme.config';
import { useTheme } from '@/context/ThemeContext';
import { useHistory } from '@/context/HistoryContext';


interface RevenueReportProps {
    onBack: () => void;
}

export const RevenueReport: React.FC<RevenueReportProps> = ({ onBack }) => {
    const { theme, formatMoney, formatTime } = useTheme();
    const { sessions, getTodayRevenue } = useHistory();

    const [timeRange, setTimeRange] = useState<'WEEK' | 'MONTH'>('WEEK');

    // Calculate Data
    const todayRevenue = getTodayRevenue();

    // Simple aggregation for chart (Last 7 days)
    const dailyData = React.useMemo(() => {
        const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
        const data = Array.from({ length: 7 }, (_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - (6 - i));
            const dateStr = d.toISOString().split('T')[0];
            const dayRevenue = sessions
                .filter(s => s.date.startsWith(dateStr))
                .reduce((sum, s) => sum + s.totalAmount, 0);
            const dayOrders = sessions.filter(s => s.date.startsWith(dateStr)).length;

            return {
                name: days[d.getDay()],
                revenue: dayRevenue,
                orders: dayOrders
            };
        });
        return data;
    }, [sessions]);

    // Calculate month revenue
    const monthRevenue = React.useMemo(() => {
        const thisMonth = new Date().toISOString().slice(0, 7);
        return sessions
            .filter(s => s.date.startsWith(thisMonth))
            .reduce((sum, s) => sum + s.totalAmount, 0);
    }, [sessions]);

    const totalOrders = sessions.length;

    return (
        <div
            className="min-h-screen text-white p-6 animate-in slide-in-from-right duration-300"
            style={{ backgroundColor: theme.bgPrimary }}
        >
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={onBack}
                    className="p-3 rounded-xl transition-colors border border-white/10"
                    style={{ backgroundColor: theme.bgCard }}
                >
                    <ArrowLeft size={24} className="text-zinc-400" />
                </button>
                <div>
                    <h1 className="text-3xl font-bold text-white">Báo Cáo Doanh Thu</h1>
                    <p style={{ color: theme.textMuted }}>Chi tiết hoạt động kinh doanh</p>
                </div>
                <div className="ml-auto flex rounded-xl p-1 border border-white/10" style={{ backgroundColor: theme.bgCard }}>
                    <button
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold hover:bg-white/5 transition-all"
                        style={{ color: theme.success }}
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
                    <div
                        className="rounded-[24px] p-6"
                        style={{ ...THEME_EFFECTS.cardBase }}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold flex items-center gap-2">
                                <TrendingUp size={20} style={{ color: theme.success }} />
                                Biểu đồ doanh thu
                            </h3>
                            <div className="flex gap-4">
                                <div>
                                    <div className="text-sm font-semibold mb-1" style={{ color: theme.textMuted }}>Hôm nay</div>
                                    <div className="text-2xl font-black text-white">{formatMoney(todayRevenue)}</div>
                                </div>
                                <div className="pl-4 border-l border-white/10">
                                    <div className="text-sm font-semibold mb-1" style={{ color: theme.textMuted }}>Tháng này</div>
                                    <div className="text-2xl font-black" style={{ color: theme.primary }}>{formatMoney(monthRevenue)}</div>
                                </div>
                            </div>

                            {/* Toggle inside Chart */}
                            <div className="flex rounded-lg p-1 border border-white/5" style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
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
                                            <stop offset="5%" stopColor={theme.primary} stopOpacity={0.3} />
                                            <stop offset="95%" stopColor={theme.primary} stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                    <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000000}M`} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: theme.bgCard, borderColor: '#333', borderRadius: '12px' }}
                                        itemStyle={{ color: '#fff' }}
                                        formatter={(value: number) => formatMoney(value)}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke={theme.primary}
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorRevenue)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Orders Chart */}
                    <div
                        className="rounded-[24px] p-6"
                        style={{ ...THEME_EFFECTS.cardBase }}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold flex items-center gap-2">
                                <Clock size={20} className="text-blue-500" />
                                Lượt khách
                            </h3>
                            <div className="text-2xl font-black text-white">{totalOrders}</div>
                        </div>

                        <div className="h-[200px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={dailyData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                    <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip
                                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                        contentStyle={{ backgroundColor: theme.bgCard, borderColor: '#333', borderRadius: '12px' }}
                                    />
                                    <Bar dataKey="orders" fill={theme.secondary} radius={[6, 6, 0, 0]} barSize={40} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* RIGHT: History List */}
                <div
                    className="lg:col-span-1 rounded-[24px] p-6 flex flex-col h-[calc(100vh-8rem)]"
                    style={{ ...THEME_EFFECTS.cardBase }}
                >
                    <h3 className="font-bold mb-6 flex items-center gap-2">
                        <DollarSign size={20} style={{ color: theme.secondary }} />
                        Giao dịch gần đây
                    </h3>

                    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-3">
                        {sessions.map((item) => (
                            <div key={item.id} className="p-4 rounded-xl hover:bg-white/10 transition-colors border border-white/5" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-bold text-white">{item.tableName}</span>
                                    <span
                                        className="text-xs px-2 py-1 rounded-full font-bold"
                                        style={{ backgroundColor: `${theme.success}20`, color: theme.success }}
                                    >
                                        Completed
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-sm text-zinc-400 mb-2">
                                    <div className="flex items-center gap-1">
                                        <Clock size={14} />
                                        {formatTime(new Date(item.startTime))} - {formatTime(new Date(item.endTime))}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center pt-2 border-t border-white/5">
                                    <span className="text-xs text-zinc-500">{item.id.slice(0, 8)}...</span>
                                    <span className="font-mono font-bold" style={{ color: theme.primary }}>
                                        {formatMoney(item.totalAmount)}
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
