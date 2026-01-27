import React from 'react';
import { CreditCard, MoveRight, Pause, ShoppingBag } from 'lucide-react';
import { THEME_COLORS, THEME_EFFECTS, formatCurrency } from '@/config/theme.config';

interface InvoiceItem {
  name: string;
  quantity: number;
  price: number;
}

interface ControlPanelProps {
  selectedTable: string | null;
  tableTime?: string;
  invoiceItems?: InvoiceItem[];
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ 
  selectedTable, 
  tableTime = '00:00:00',
  invoiceItems = []
}) => {
  const subtotal = invoiceItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1; // 10% VAT
  const grandTotal = subtotal + tax;

  return (
    <div 
      className="w-[420px] border-l p-8 space-y-6 flex flex-col h-screen overflow-hidden"
      style={{
        backgroundColor: THEME_COLORS.bgPrimary,
        borderColor: 'rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* Status Header */}
      <div 
        className="rounded-[24px] p-6"
        style={THEME_EFFECTS.cardBase}
      >
        <div 
          className="uppercase tracking-wider mb-2" 
          style={{ 
            fontSize: '0.875rem',
            fontWeight: 600,
            color: THEME_COLORS.textSecondary,
          }}
        >
          BÀN ĐƯỢC CHỌN
        </div>
        {selectedTable ? (
          <>
            <div 
              className="mb-4" 
              style={{ 
                fontSize: '3rem',
                fontWeight: 800,
                color: THEME_COLORS.primary,
              }}
            >
              {selectedTable}
            </div>
            <div className="flex items-center justify-between">
              <span style={{ color: THEME_COLORS.textSecondary }}>Thời gian:</span>
              <span 
                className="font-mono" 
                style={{ 
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: THEME_COLORS.primary,
                }}
              >
                {tableTime}
              </span>
            </div>
          </>
        ) : (
          <div 
            className="text-center py-8"
            style={{ color: THEME_COLORS.textMuted }}
          >
            Chọn một bàn để xem chi tiết
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        {/* Payment Button - Gradient using Primary Color */}
        <button 
          className="rounded-[24px] p-6 transition-all duration-300 hover:scale-105 flex flex-col items-center gap-3"
          style={{
            background: `linear-gradient(135deg, ${THEME_COLORS.primary} 0%, ${THEME_COLORS.primary}CC 100%)`,
            filter: `drop-shadow(0 0 8px ${THEME_COLORS.primary}80) drop-shadow(0 0 30px ${THEME_COLORS.primary}33)`,
          }}
        >
          <CreditCard size={32} style={{ color: THEME_COLORS.bgPrimary }} />
          <span 
            className="uppercase tracking-wider" 
            style={{ 
              fontWeight: 800, 
              fontSize: '0.875rem',
              color: THEME_COLORS.bgPrimary,
            }}
          >
            Thanh toán
          </span>
        </button>

        {/* Move Table */}
        <button 
          className="rounded-[24px] p-6 hover:bg-white/10 transition-all duration-300 flex flex-col items-center gap-3"
          style={THEME_EFFECTS.cardBase}
        >
          <MoveRight size={32} style={{ color: THEME_COLORS.primary }} />
          <span 
            className="uppercase tracking-wider" 
            style={{ 
              fontWeight: 800, 
              fontSize: '0.875rem',
              color: THEME_COLORS.textPrimary,
            }}
          >
            Chuyển bàn
          </span>
        </button>

        {/* Pause */}
        <button 
          className="rounded-[24px] p-6 hover:bg-white/10 transition-all duration-300 flex flex-col items-center gap-3"
          style={THEME_EFFECTS.cardBase}
        >
          <Pause size={32} style={{ color: THEME_COLORS.warning }} />
          <span 
            className="uppercase tracking-wider" 
            style={{ 
              fontWeight: 800, 
              fontSize: '0.875rem',
              color: THEME_COLORS.textPrimary,
            }}
          >
            Tạm dừng
          </span>
        </button>

        {/* Order */}
        <button 
          className="rounded-[24px] p-6 hover:bg-white/10 transition-all duration-300 flex flex-col items-center gap-3"
          style={THEME_EFFECTS.cardBase}
        >
          <ShoppingBag size={32} style={{ color: THEME_COLORS.success }} />
          <span 
            className="uppercase tracking-wider" 
            style={{ 
              fontWeight: 800, 
              fontSize: '0.875rem',
              color: THEME_COLORS.textPrimary,
            }}
          >
            Đặt món
          </span>
        </button>
      </div>

      {/* Invoice Preview */}
      <div 
        className="rounded-[24px] p-6 flex-1 flex flex-col overflow-hidden"
        style={THEME_EFFECTS.cardBase}
      >
        <div 
          className="uppercase tracking-wider mb-4" 
          style={{ 
            fontSize: '0.875rem',
            fontWeight: 600,
            color: THEME_COLORS.textSecondary,
          }}
        >
          HÓA ĐƠN
        </div>
        
        {/* Scrollable Items List */}
        <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2 custom-scrollbar">
          {invoiceItems.length > 0 ? (
            invoiceItems.map((item, index) => (
              <div 
                key={index} 
                className="flex justify-between items-start pb-3"
                style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}
              >
                <div className="flex-1">
                  <div 
                    className="mb-1" 
                    style={{ 
                      fontWeight: 600,
                      color: THEME_COLORS.textPrimary,
                    }}
                  >
                    {item.name}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: THEME_COLORS.textSecondary }}>
                    {item.quantity} x {formatCurrency(item.price)}
                  </div>
                </div>
                <div style={{ fontWeight: 700, color: THEME_COLORS.textPrimary }}>
                  {formatCurrency(item.price * item.quantity)}
                </div>
              </div>
            ))
          ) : (
            <div 
              className="text-center py-8"
              style={{ color: THEME_COLORS.textMuted }}
            >
              Chưa có món nào
            </div>
          )}
        </div>

        {/* Totals */}
        {invoiceItems.length > 0 && (
          <div 
            className="space-y-2 pt-4"
            style={{ borderTop: '1px solid rgba(255, 255, 255, 0.2)' }}
          >
            <div className="flex justify-between" style={{ fontSize: '0.875rem', color: THEME_COLORS.textSecondary }}>
              <span>Tạm tính:</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between" style={{ fontSize: '0.875rem', color: THEME_COLORS.textSecondary }}>
              <span>VAT (10%):</span>
              <span>{formatCurrency(tax)}</span>
            </div>
            <div 
              className="my-3"
              style={{
                height: '1px',
                background: `linear-gradient(to right, transparent, ${THEME_COLORS.secondary}80, transparent)`,
              }}
            ></div>
            <div className="flex justify-between items-center">
              <span 
                className="uppercase tracking-wider" 
                style={{ 
                  fontWeight: 700,
                  color: THEME_COLORS.textPrimary,
                }}
              >
                Tổng cộng:
              </span>
              <span 
                style={{ 
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: THEME_COLORS.secondary,
                }}
              >
                {formatCurrency(grandTotal)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
