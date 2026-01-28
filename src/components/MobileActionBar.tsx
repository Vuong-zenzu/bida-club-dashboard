import React from 'react';
import { Play, Pause, Utensils, Repeat, CreditCard, MoreHorizontal } from 'lucide-react';
import { THEME_COLORS } from '@/config/theme.config';

interface MobileActionBarProps {
    isVisible: boolean;
    isTableActive: boolean;

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
    onStart,
    onStop,
    onOrder,
    onSwitch,
    onPay,
    onMenu
}) => {
    if (!isVisible) return null;

    return (
        <div
            className="md:hidden fixed bottom-2 left-2 right-2 z-50 p-2 rounded-2xl border border-white/10 backdrop-blur-md shadow-2xl pointer-events-auto animate-in slide-in-from-bottom-5"
            style={{ backgroundColor: `${THEME_COLORS.bgCard}F2` }} // ~95% opacity
        >
            {/* Mobile Action Container: Grid 5 cols, Gap 2 */}
            <div className="grid grid-cols-5 gap-2 w-full">

                {/* 1. START/STOP */}
                <button
                    className="action-btn flex flex-col items-center justify-center gap-1 p-1.5 rounded-xl bg-white/5 active:scale-95 transition-transform border border-white/5"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); isTableActive ? onStop?.(e) : onStart?.(e); }}
                >
                    {isTableActive ? <Pause size={18} className="text-yellow-500 fill-current" /> : <Play size={18} className="text-green-500 fill-current" />}
                    <span className={`text-[9px] font-bold uppercase ${isTableActive ? 'text-yellow-400' : 'text-green-400'}`}>
                        {isTableActive ? 'TẠM DỪNG' : 'BẮT ĐẦU'}
                    </span>
                </button>

                {/* 2. ORDER */}
                <button
                    className="action-btn flex flex-col items-center justify-center gap-1 p-1.5 rounded-xl bg-white/5 active:scale-95 transition-transform border border-white/5"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); onOrder?.(e); }}
                >
                    <Utensils size={18} className="text-orange-400" />
                    <span className="text-[9px] font-bold text-white uppercase">GỌI MÓN</span>
                </button>

                {/* 3. SWITCH */}
                <button
                    className="action-btn flex flex-col items-center justify-center gap-1 p-1.5 rounded-xl bg-white/5 active:scale-95 transition-transform border border-white/5"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); onSwitch?.(e); }}
                >
                    <Repeat size={18} className="text-blue-400" />
                    <span className="text-[9px] font-bold text-white uppercase">CHUYỂN</span>
                </button>

                {/* 4. PAY */}
                <button
                    className="action-btn flex flex-col items-center justify-center gap-1 p-1.5 rounded-xl bg-white/5 active:scale-95 transition-transform border border-white/5"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); onPay?.(e); }}
                >
                    <CreditCard size={18} className="text-yellow-400" />
                    <span className="text-[9px] font-bold text-yellow-400 uppercase">T.TOÁN</span>
                </button>

                {/* 5. MENU/OTHER */}
                <button
                    className="action-btn flex flex-col items-center justify-center gap-1 p-1.5 rounded-xl bg-white/5 active:scale-95 transition-transform border border-white/5"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); onMenu?.(e); }}
                >
                    <MoreHorizontal size={18} className="text-gray-400" />
                    <span className="text-[9px] font-bold text-gray-400 uppercase">KHÁC</span>
                </button>

            </div>
        </div>
    );
};
