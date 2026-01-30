import React from 'react';
import { Clock, Play, Pause, Repeat, CreditCard, Utensils, MoreHorizontal, X } from 'lucide-react';
import { THEME_EFFECTS, formatCurrency } from '@/config/theme.config';
import { useTheme } from '@/context/ThemeContext';
import { useTableContext } from '@/context/TableContext';
import { useTableTimer } from '@/hooks/useTableTimer';

interface TableCardProps {
  id: string; // Changed from tableNumber to match context logic usage
  isSelected?: boolean;
  onClick?: () => void;
  // Action Handlers passed from parent or handled internally
  onPay?: (e: React.MouseEvent) => void;
  onMenu?: (e: React.MouseEvent) => void;
  onOrder?: (e: React.MouseEvent) => void;
  onSwitch?: (e: React.MouseEvent) => void;
  onClose?: (e: React.MouseEvent) => void;
  menuItems?: { name: string; quantity: number; price: number }[];
}

export const TableCard: React.FC<TableCardProps> = ({
  id,
  onClick,
  isSelected = false,
  onPay,
  onMenu,
  onOrder,
  onSwitch,
  onClose,
}) => {
  const { theme } = useTheme();
  // ----------------------------------------------------------------------
  // LOGIC INTEGRATION
  // ----------------------------------------------------------------------
  // Get latest table data from Context to ensure sync, OR rely on props if passed down
  // But wait, TableCard is receiving ID. It should probably get data from context inside?
  // Previous ViewFile showed it uses useTableContext to get 'tables'.
  const { tables, togglePause, startSession } = useTableContext();
  const tableData = tables.find(t => t.id === id);
  // Use context data if available (preferred for real-time updates), else fall back to props if any
  const status = tableData?.status || 'AVAILABLE';
  const startTime = tableData?.startTime || null;
  const duration = tableData?.duration || 0;
  const hourlyRate = tableData?.hourlyRate || 0;
  const orderTotal = tableData?.orderTotal || 0;
  // If we want to use the passed menuItems, fine. But context is safer.
  // Actually, if we use context, we don't strictly need the prop, but let's keep it for flexibility.
  // Let's override localized menuItems with context data.
  const contextMenuItems = tableData?.menuItems || [];

  // NOTE: For the Mobile View implementation below, we should use `contextMenuItems` (or `menuItems` which we will alias)
  // Let's alias it for clarity in the JSX below
  const activeMenuItems = contextMenuItems;

  if (!tableData) return null;

  const isActive = status === 'ACTIVE';
  const isPaused = status === 'PAUSED';

  // Timer Hook
  const time = useTableTimer(startTime, duration);
  // Actually useTableTimer needs update to handle start+duration logic or just display what we have. 
  // For now let's use the context data directly or update hook.
  // Correction: useTableTimer only takes startTime. We need to handle paused display.

  // Derived Calculations
  let currentDurationSeconds = duration;
  if (isActive && startTime) {
    currentDurationSeconds += Math.floor((Date.now() - startTime) / 1000);
  }

  const hourlyFee = Math.floor((currentDurationSeconds / 3600) * hourlyRate);
  const serviceFee = orderTotal;
  const totalAmount = hourlyFee + serviceFee;

  // ----------------------------------------------------------------------
  // UI MAPPING (Restoring original UI variables)
  // ----------------------------------------------------------------------
  const statusColor = isActive ? theme.success : (status === 'RESERVED' ? theme.warning : (isPaused ? theme.warning : theme.textMuted));

  // Visual Effects
  const shouldGlow = isActive && isSelected;
  const glowStyles = shouldGlow ? THEME_EFFECTS.cyberGlow(statusColor) : {};
  const showStats = isSelected ? 'block' : 'hidden md:block';

  const handleStartStop = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isActive || isPaused) togglePause(id);
    else startSession(id);
  };

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
          ...(isSelected && !shouldGlow ? { border: `2px solid ${theme.primary}` } : {}),
          ...(isSelected ? { paddingBottom: '20px' } : {})
        }}
      >
        {/* MOBILE CLOSE BUTTON */}
        {isSelected && (
          <button
            className="md:hidden absolute top-4 right-4 z-40 p-2 bg-white/10 rounded-full active:scale-95 backdrop-blur-md"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onClose?.(e); }}
          >
            <X size={16} className="text-white/70" />
          </button>
        )}

        {/* HEADER: NUMBER & TIMER */}
        <div className="flex justify-between items-start mb-0 lg:mb-0 lg:block lg:static">
          {/* Table Number */}
          <div className="lg:absolute lg:top-6 lg:left-6 z-10 pointer-events-none">
            <div className="uppercase tracking-wider mb-1 text-xs md:text-sm font-semibold text-zinc-400">
              TABLE
            </div>
            <div className="tracking-tight text-[1.5rem] md:text-[2rem] font-extrabold text-white leading-none whitespace-nowrap">
              {tableData.name}
            </div>
          </div>

          {/* Timer (Active) */}
          {(isActive || isPaused) && (
            <div className="lg:absolute lg:top-6 lg:right-6 z-10 mt-1 lg:mt-0">
              <div
                className="flex items-center gap-1.5 md:gap-2 px-2.5 py-1.5 md:px-3 md:py-2 rounded-xl border backdrop-blur-sm"
                style={{
                  backgroundColor: `${theme.primary}1A`,
                  borderColor: `${theme.primary}40`,
                }}
              >
                <Clock style={{ color: theme.primary }} className="w-3.5 h-3.5 md:w-4 md:h-4" />
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
            title={isActive ? "Tạm dừng" : "Tiếp tục"}
            onClick={handleStartStop}
          >
            {isActive ? <Pause size={18} className="text-yellow-500 fill-current" /> : <Play size={18} className="text-green-500 fill-current" />}
          </button>

          {(isActive || isPaused) && (
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

        {/* MOBILE LAYOUT CONTENT (Below Header) */}
        {/* Only show when active or paused */}
        {(isActive || isPaused) && (
          <div className="md:hidden mt-4 flex gap-3 h-[140px]">
            {/* LEFT: Scrollable Order List */}
            <div className="flex-1 bg-black/20 rounded-lg p-2 overflow-y-auto border border-white/5 custom-scrollbar">
              {activeMenuItems && activeMenuItems.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {activeMenuItems.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs border-b border-white/5 pb-1 last:border-0 last:pb-0">
                      <span className="text-white/90 truncate pr-2 font-medium">{item.name}</span>
                      <div className="flex items-center gap-2 whitespace-nowrap">
                        <span className="text-blue-400 font-bold">x{item.quantity}</span>
                        <span className="text-yellow-500">{(item.price * item.quantity).toLocaleString()}đ</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-white/30 text-xs italic">
                  Chưa gọi món
                </div>
              )}
            </div>

            {/* RIGHT: Fixed Action Buttons Column */}
            <div className="flex flex-col justify-between shrink-0 w-10">
              {/* NEW: Play/Pause Button */}
              <button
                className="action-btn w-10 h-10 rounded-xl border flex items-center justify-center active:scale-95 shadow-lg"
                style={{
                  backgroundColor: isActive ? `${theme.warning}20` : `${theme.success}20`,
                  borderColor: isActive ? `${theme.warning}50` : `${theme.success}50`
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  togglePause?.(id);
                }}
              >
                {isActive ? (
                  <Pause size={18} style={{ color: theme.warning, fill: 'currentColor' }} />
                ) : (
                  <Play size={18} style={{ color: theme.success, fill: 'currentColor' }} />
                )}
              </button>

              <button
                className="action-btn w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/50 flex items-center justify-center active:scale-95"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onOrder?.(e); }}
              >
                <Utensils size={18} className="text-orange-400" />
              </button>

              <button
                className="action-btn w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/50 flex items-center justify-center active:scale-95"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onSwitch?.(e); }}
              >
                <Repeat size={18} className="text-blue-400" />
              </button>

              <button
                className="action-btn w-10 h-10 rounded-xl bg-yellow-500/20 border border-yellow-500/50 flex items-center justify-center active:scale-95"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onPay?.(e); }}
              >
                <CreditCard size={18} className="text-yellow-400" />
              </button>
            </div>
          </div>
        )}

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
            <div className="text-xl md:text-2xl font-extrabold" style={{ color: theme.primary }}>
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