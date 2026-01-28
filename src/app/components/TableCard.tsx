import React from 'react';
import { Clock, Play, Pause, Repeat, CreditCard, Utensils, MoreHorizontal } from 'lucide-react';
import { THEME_COLORS, THEME_EFFECTS, getStatusColor, formatCurrency } from '@/config/theme.config';

// ----------------------------------------------------------------------
// INTERFACES
// ----------------------------------------------------------------------

interface TableCardProps {
  tableNumber: string;
  status: 'ACTIVE' | 'AVAILABLE' | 'RESERVED';
  time?: string;
  hourlyFee?: number;
  serviceFee?: number;
  totalAmount?: number;
  onClick?: () => void;
  isSelected?: boolean;

  // Action Handlers
  onStart?: (e?: React.MouseEvent) => void;
  onStop?: (e?: React.MouseEvent) => void;
  onOrder?: (e?: React.MouseEvent) => void;
  onPay?: (e?: React.MouseEvent) => void;
  onSwitch?: (e?: React.MouseEvent) => void;
  onMenu?: (e?: React.MouseEvent) => void;
}

// ----------------------------------------------------------------------
// COMPONENT
// ----------------------------------------------------------------------

export const TableCard: React.FC<TableCardProps> = ({
  tableNumber,
  status,
  time = '00:00:00',
  hourlyFee = 50000,
  serviceFee = 10000,
  totalAmount = 60000,
  onClick,
  isSelected = false,

  // Default handlers with stopPropagation
  onStart = (e) => e?.stopPropagation(),
  onStop = (e) => e?.stopPropagation(),
  onOrder = (e) => e?.stopPropagation(),
  onPay = (e) => e?.stopPropagation(),
  onSwitch = (e) => e?.stopPropagation(),
  onMenu = (e) => e?.stopPropagation(),
}) => {
  const statusColor = getStatusColor(status);
  const isActive = status === 'ACTIVE';

  // Visual Effects
  const shouldGlow = isActive && isSelected;
  const glowStyles = shouldGlow ? THEME_EFFECTS.cyberGlow(statusColor) : {};
  const showStats = isSelected ? 'block' : 'hidden md:block';

  return (
    <>
      <div
        onClick={onClick}
        className={`
          relative rounded-[24px] cursor-pointer
          transition-all duration-300 hover:scale-[1.02]
          flex flex-col
          p-4 md:p-6
          min-h-auto lg:min-h-[280px]
          lg:block
          group
          z-10
        `}
        style={{
          ...(shouldGlow ? glowStyles : THEME_EFFECTS.cardBase),
          ...(isSelected && !shouldGlow ? { border: `2px solid ${THEME_COLORS.primary}` } : {}),
          ...(isSelected ? { paddingBottom: '20px' } : {})
        }}
      >
        {/* HEADER: NUMBER & TIMER */}
        <div className="flex justify-between items-start mb-0 lg:mb-0 lg:block lg:static">
          {/* Table Number */}
          <div className="lg:absolute lg:top-6 lg:left-6 z-10 pointer-events-none">
            <div className="uppercase tracking-wider mb-1 text-xs md:text-sm font-semibold text-zinc-400">
              TABLE
            </div>
            <div className="tracking-tight text-[2.5rem] md:text-[3rem] font-extrabold text-white leading-none">
              {tableNumber}
            </div>
          </div>

          {/* Timer (Active) */}
          {isActive && (
            <div className="lg:absolute lg:top-6 lg:right-6 z-10 mt-1 lg:mt-0">
              <div
                className="flex items-center gap-1.5 md:gap-2 px-2.5 py-1.5 md:px-3 md:py-2 rounded-xl border backdrop-blur-sm"
                style={{
                  backgroundColor: `${THEME_COLORS.primary}1A`,
                  borderColor: `${THEME_COLORS.primary}40`,
                }}
              >
                <Clock style={{ color: THEME_COLORS.primary }} className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <div className="font-mono tracking-wider text-xs md:text-base font-bold text-emerald-400">
                  {time}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SPACER for Mobile Layout */}
        <div className={`flex-1 lg:hidden ${showStats === 'block' ? 'min-h-4' : ''}`}></div>

        {/* MAIN STATS (Prices) */}
        <div className={`
          lg:absolute lg:bottom-20 lg:left-6 lg:right-6 z-10 
          space-y-1.5 md:space-y-2 
          mt-4 lg:mt-0 mb-4 lg:mb-0
          ${showStats}
        `}>
          <div className="flex justify-between items-center text-sm">
            <span className="text-zinc-400">Giá giờ:</span>
            <span className="font-semibold text-white">{formatCurrency(hourlyFee)}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-zinc-400">Phí dịch vụ:</span>
            <span className="font-semibold text-white">{formatCurrency(serviceFee)}</span>
          </div>
          <div className="my-2 md:my-3 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>

        {/* DESKTOP ACTIONS (Absolute Right, Z-Index High) */}
        <div className="hidden md:flex flex-row gap-2 absolute right-6 bottom-36 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 pointer-events-none group-hover:pointer-events-auto">
          <button
            className="action-btn p-2.5 rounded-xl bg-zinc-900/95 border border-white/10 hover:bg-zinc-800 hover:scale-105 transition-all shadow-lg backdrop-blur-md cursor-pointer"
            title={isActive ? "Tạm dừng" : "Bắt đầu"}
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); isActive ? onStop?.(e) : onStart?.(e); }}
          >
            {isActive ? <Pause size={18} className="text-yellow-500 fill-current" /> : <Play size={18} className="text-green-500 fill-current" />}
          </button>

          {isActive && (
            <>
              <button
                className="action-btn p-2.5 rounded-xl bg-zinc-900/95 border border-white/10 hover:bg-zinc-800 hover:scale-105 transition-all shadow-lg backdrop-blur-md cursor-pointer"
                title="Gọi món"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onOrder?.(e); }}
              >
                <Utensils size={18} className="text-orange-400" />
              </button>

              <button
                className="action-btn p-2.5 rounded-xl bg-zinc-900/95 border border-white/10 hover:bg-zinc-800 hover:scale-105 transition-all shadow-lg backdrop-blur-md cursor-pointer"
                title="Chuyển bàn"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onSwitch?.(e); }}
              >
                <Repeat size={18} className="text-blue-400" />
              </button>

              <button
                className="action-btn p-2.5 rounded-xl bg-zinc-900/95 border border-white/10 hover:bg-zinc-800 hover:scale-105 transition-all shadow-lg backdrop-blur-md cursor-pointer"
                title="Thanh toán"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onPay?.(e); }}
              >
                <CreditCard size={18} className="text-yellow-400" />
              </button>

              <button
                className="action-btn p-2.5 rounded-xl bg-zinc-900/95 border border-white/10 hover:bg-zinc-800 hover:scale-105 transition-all shadow-lg backdrop-blur-md cursor-pointer"
                title="Khác"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onMenu?.(e); }}
              >
                <MoreHorizontal size={18} className="text-gray-400" />
              </button>
            </>
          )}
        </div>

        {/* BOTTOM ROW: STATUS & TOTAL */}
        <div className={`
            lg:absolute lg:bottom-6 lg:left-6 lg:right-6 z-10 
            flex justify-between items-end
            ${showStats}
          `}>
          <div className="uppercase tracking-wider text-[0.65rem] md:text-xs font-semibold text-zinc-500">
            {status}
          </div>

          <div className="text-right">
            <div className="text-[0.65rem] md:text-xs mb-1 text-zinc-400">
              Tổng tiền
            </div>
            <div className="text-xl md:text-2xl font-extrabold" style={{ color: THEME_COLORS.primary }}>
              {formatCurrency(totalAmount)}
            </div>
          </div>
        </div>

        {/* GLOW EFFECT */}
        <div
          className="absolute top-4 right-4 w-12 h-12 md:w-16 md:h-16 rounded-full blur-2xl opacity-30 pointer-events-none z-0"
          style={{ backgroundColor: statusColor }}
        ></div>
      </div>

      {/* MOBILE BOTTOM BAR MOVED TO MobileActionBar.tsx */}
    </>
  );
};