import React from 'react';
import { Play, Pause, Utensils, Repeat, CreditCard, MoreHorizontal } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface MobileActionBarProps {
    isVisible: boolean;
    isTableActive: boolean;
    tableName?: string;

    // Actions
    onStart?: (e?: React.MouseEvent) => void;
    onStop?: (e?: React.MouseEvent) => void;
    onOrder?: (e?: React.MouseEvent) => void;
    onSwitch?: (e?: React.MouseEvent) => void;
    onPay?: (e?: React.MouseEvent) => void;
    onMenu?: (e?: React.MouseEvent) => void;
}

export const MobileActionBar: React.FC<MobileActionBarProps> = ({
    isVisible,
    isTableActive,
    tableName,
    onStart,
    onStop,
    onOrder,
    onSwitch,
    onPay,
    onMenu
}) => {
    const { theme } = useTheme();

    if (!isVisible) return null;

    return (
        <div
            className="md:hidden fixed bottom-2 left-2 right-2 z-50 p-2 rounded-2xl border border-white/10 backdrop-blur-md shadow-2xl pointer-events-auto animate-in slide-in-from-bottom-5 flex flex-col gap-2"
            style={{ backgroundColor: `${theme.bgCard}F2` }} // ~95% opacity
        >
            {/* Table Name Header */}
            {tableName && (
                <div className="flex justify-between items-center px-2 pb-1 border-b border-white/5">
                    <span className="text-xs font-bold text-zinc-400 uppercase">ĐANG ĐIỀU KHIỂN:</span>
                    <span className="text-sm font-extrabold text-white">{tableName}</span>
                </div>
            )}

            {/* Mobile Action Container: Grid 5 cols, Gap 2 */}
            <div className="grid grid-cols-5 gap-2 w-full">

                {/* 1. START/STOP */}
                <button
                    className="action-btn flex flex-col items-center justify-center gap-1 p-1.5 rounded-xl bg-white/5 active:scale-95 transition-transform border border-white/5"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); isTableActive ? onStop?.(e) : onStart?.(e); }}
                >
                    {isTableActive ?
                        <Pause size={18} style={{ color: theme.warning, fill: 'currentColor' }} /> :
                        <Play size={18} style={{ color: theme.success, fill: 'currentColor' }} />
                    }
                    <span
                        className="text-[9px] font-bold uppercase"
                        style={{ color: isTableActive ? theme.warning : theme.success }}
                    >
                        {isTableActive ? 'TẠM DỪNG' : 'BẮT ĐẦU'}
                    </span>
                </button>

                {/* 2. ORDER */}
                <button
                    className="action-btn flex flex-col items-center justify-center gap-1 p-1.5 rounded-xl bg-white/5 active:scale-95 transition-transform border border-white/5"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); onOrder?.(e); }}
                >
                    <Utensils size={18} style={{ color: theme.warning }} />
                    <span className="text-[9px] font-bold text-white uppercase">GỌI MÓN</span>
                </button>

                {/* 3. SWITCH */}
                <button
                    className="action-btn flex flex-col items-center justify-center gap-1 p-1.5 rounded-xl bg-white/5 active:scale-95 transition-transform border border-white/5"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); onSwitch?.(e); }}
                >
                    <Repeat size={18} style={{ color: theme.primary }} />
                    <span className="text-[9px] font-bold text-white uppercase">CHUYỂN</span>
                </button>

                {/* 4. PAY */}
                <button
                    className="action-btn flex flex-col items-center justify-center gap-1 p-1.5 rounded-xl bg-white/5 active:scale-95 transition-transform border border-white/5"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); onPay?.(e); }}
                >
                    <CreditCard size={18} style={{ color: theme.secondary }} />
                    <span className="text-[9px] font-bold uppercase" style={{ color: theme.secondary }}>T.TOÁN</span>
                </button>

                {/* 5. MENU/OTHER */}
                <button
                    className="action-btn flex flex-col items-center justify-center gap-1 p-1.5 rounded-xl bg-white/5 active:scale-95 transition-transform border border-white/5"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); onMenu?.(e); }}
                >
                    <MoreHorizontal size={18} style={{ color: theme.textMuted }} />
                    <span className="text-[9px] font-bold uppercase" style={{ color: theme.textMuted }}>KHÁC</span>
                </button>

            </div>
        </div>
    );
};
