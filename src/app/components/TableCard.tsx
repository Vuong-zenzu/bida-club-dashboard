import React from 'react';
import { Clock } from 'lucide-react';
import { THEME_COLORS, THEME_EFFECTS, getStatusColor, formatCurrency } from '@/config/theme.config';

/**
 * COMPONENT MASTER - TABLE CARD
 * 
 * Component "Bàn gốc" với Constraints và Variables
 * 
 * CONSTRAINTS:
 * - Table Number: Top-Left (luôn ở góc trên trái)
 * - Timer: Center-Center (luôn ở giữa)
 * - Total Amount: Bottom-Right (luôn ở góc dưới phải)
 * - Sub-stats: Bottom-Left → Bottom-Right (căn đều)
 * 
 * VARIABLES:
 * - Tất cả màu sắc lấy từ THEME_COLORS
 * - Thay đổi THEME_COLORS.primary → Tự động cập nhật toàn bộ
 */

interface TableCardProps {
  tableNumber: string;
  status: 'ACTIVE' | 'AVAILABLE' | 'RESERVED';
  time?: string;
  hourlyFee?: number;
  serviceFee?: number;
  totalAmount?: number;
  onClick?: () => void;
  isSelected?: boolean;
}

export const TableCard: React.FC<TableCardProps> = ({ 
  tableNumber, 
  status, 
  time = '00:00:00',
  hourlyFee = 50000,
  serviceFee = 10000,
  totalAmount = 60000,
  onClick,
  isSelected = false
}) => {
  const statusColor = getStatusColor(status);
  const isActive = status === 'ACTIVE';
  
  // Determine if card should have glow effect
  const shouldGlow = isActive && isSelected;
  
  // Calculate glow styles dynamically from theme
  const glowStyles = shouldGlow ? THEME_EFFECTS.cyberGlow(statusColor) : {};
  
  return (
    <div
      onClick={onClick}
      className={`
        relative rounded-[24px] p-6 cursor-pointer
        transition-all duration-300 hover:scale-[1.02]
        min-h-[280px]
      `}
      style={{
        ...(shouldGlow ? glowStyles : THEME_EFFECTS.cardBase),
        ...(isSelected && !shouldGlow ? { 
          border: `2px solid ${THEME_COLORS.primary}` 
        } : {}),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* CONSTRAINT: TOP-LEFT - Table Number */}
      <div 
        className="relative z-10"
        style={{
          position: 'absolute',
          top: '24px',
          left: '24px',
        }}
      >
        <div 
          className="uppercase tracking-wider mb-1" 
          style={{ 
            fontSize: '0.75rem', 
            fontWeight: 600,
            color: THEME_COLORS.textSecondary,
          }}
        >
          TABLE
        </div>
        <div 
          className="tracking-tight" 
          style={{ 
            fontSize: '3rem',
            fontWeight: 800,
            color: THEME_COLORS.textPrimary,
          }}
        >
          {tableNumber}
        </div>
      </div>

      {/* CONSTRAINT: CENTER-CENTER - Digital Timer with Cyan Glow */}
      {isActive && (
        <div 
          className="relative z-10 flex items-center justify-center"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div 
            className="flex items-center gap-3 px-6 py-4 rounded-2xl"
            style={{
              backgroundColor: `${THEME_COLORS.primary}1A`, // 10% opacity
              border: `1px solid ${THEME_COLORS.primary}`,
              filter: `drop-shadow(0 0 8px ${THEME_COLORS.primary}80) drop-shadow(0 0 30px ${THEME_COLORS.primary}33)`,
            }}
          >
            <Clock style={{ color: THEME_COLORS.primary }} size={24} />
            <div 
              className="font-mono tracking-wider" 
              style={{ 
                fontSize: '1.875rem',
                fontWeight: 700,
                color: THEME_COLORS.primary,
              }}
            >
              {time}
            </div>
          </div>
        </div>
      )}

      {/* CONSTRAINT: BOTTOM-LEFT to BOTTOM-RIGHT - Sub-stats */}
      <div 
        className="relative z-10 space-y-2"
        style={{
          position: 'absolute',
          bottom: '80px',
          left: '24px',
          right: '24px',
        }}
      >
        <div className="flex justify-between items-center">
          <span style={{ color: THEME_COLORS.textSecondary, fontSize: '0.875rem' }}>
            Giá giờ:
          </span>
          <span style={{ color: THEME_COLORS.textPrimary, fontWeight: 600 }}>
            {formatCurrency(hourlyFee)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span style={{ color: THEME_COLORS.textSecondary, fontSize: '0.875rem' }}>
            Phí dịch vụ:
          </span>
          <span style={{ color: THEME_COLORS.textPrimary, fontWeight: 600 }}>
            {formatCurrency(serviceFee)}
          </span>
        </div>
        <div 
          className="my-3"
          style={{
            height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.2), transparent)',
          }}
        ></div>
      </div>

      {/* CONSTRAINT: BOTTOM-RIGHT - Total Amount (Gold) */}
      <div 
        className="relative z-10 flex justify-between items-end"
        style={{
          position: 'absolute',
          bottom: '24px',
          left: '24px',
          right: '24px',
        }}
      >
        {/* Status Label - Bottom Left */}
        <div 
          className="uppercase tracking-wider" 
          style={{ 
            fontSize: '0.75rem',
            fontWeight: 600,
            color: THEME_COLORS.textMuted,
          }}
        >
          {status}
        </div>
        
        {/* Total Amount - Bottom Right (CONSTRAINT: Luôn ở góc dưới phải) */}
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.75rem', color: THEME_COLORS.textSecondary, marginBottom: '4px' }}>
            Tổng tiền
          </div>
          <div 
            style={{ 
              fontSize: '1.5rem',
              fontWeight: 800,
              color: THEME_COLORS.secondary, // Gold color from variables
            }}
          >
            {formatCurrency(totalAmount)}
          </div>
        </div>
      </div>

      {/* Glowing orb effect - Background decoration */}
      <div 
        className="absolute top-4 right-4 w-16 h-16 rounded-full blur-2xl opacity-30 pointer-events-none"
        style={{ backgroundColor: statusColor }}
      ></div>
    </div>
  );
};
