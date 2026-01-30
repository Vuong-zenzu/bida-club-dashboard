import React from 'react';
import { CreditCard, MoveRight, Pause, ShoppingBag, Play } from 'lucide-react';
import { THEME_EFFECTS } from '@/config/theme.config';
import { useTheme } from '@/context/ThemeContext';
import { useTableTimer } from '@/hooks/useTableTimer';

interface InvoiceItem {
  name: string;
  quantity: number;
  price: number;
}

interface ControlPanelProps {
  selectedTable: string | null;
  tableName?: string;
  startTime?: number | null;
  duration?: number; // Accept duration for paused state
  invoiceItems?: InvoiceItem[];
  isTableActive?: boolean;

  // Actions
  onStart?: () => void;
  onPayment?: () => void;
  onTransfer?: () => void;
  onPause?: () => void;
  onOrder?: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  selectedTable,
  tableName,
  startTime,
  duration = 0,
  invoiceItems = [],
  onPayment,
  onTransfer,
  onPause,
  onOrder,
  onStart,
  isTableActive = false
}) => {
  const { theme, formatMoney } = useTheme();
  // Use hook to get live time string
  const timeDisplay = useTableTimer(startTime ?? null, duration);

  const subtotal = invoiceItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1; // 10% VAT
  const grandTotal = subtotal + tax;

  return (
    <div
      className="w-full lg:w-[420px] border-t lg:border-t-0 lg:border-l p-4 md:p-8 space-y-6 flex flex-col h-auto lg:h-screen overflow-y-auto lg:overflow-hidden pb-32 lg:pb-8"
      style={{
        backgroundColor: theme.bgPrimary,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        color: theme.textPrimary
      }}
    >
      {/* Status Header */}
      <div
        className="rounded-[24px] p-6"
        style={{ ...THEME_EFFECTS.cardBase, backgroundColor: theme.bgCard }}
      >
        <div
          className="uppercase tracking-wider mb-2"
          style={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: theme.textSecondary,
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
                color: theme.primary,
              }}
            >
              {tableName || selectedTable}
            </div>
            <div className="flex items-center justify-between">
              <span style={{ color: theme.textSecondary }}>Thời gian:</span>
              <span
                className="font-mono"
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: theme.primary,
                }}
              >
                {timeDisplay}
              </span>
            </div>
          </>
        ) : (
          <div
            className="text-center py-8"
            style={{ color: theme.textMuted }}
          >
            Chọn một bàn để xem chi tiết
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {/* Action Buttons */}
      {isTableActive ? (
        <div className="grid grid-cols-2 gap-4">
          {/* Payment Button - Gradient using Primary Color */}
          <button
            onClick={onPayment}
            className="rounded-[24px] p-6 transition-all duration-300 hover:scale-105 flex flex-col items-center gap-3"
            style={{
              background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primary}CC 100%)`,
              filter: `drop-shadow(0 0 8px ${theme.primary}80) drop-shadow(0 0 30px ${theme.primary}33)`,
            }}
          >
            <CreditCard size={32} style={{ color: theme.bgPrimary }} />
            <span
              className="uppercase tracking-wider"
              style={{
                fontWeight: 800,
                fontSize: '0.875rem',
                color: theme.bgPrimary,
              }}
            >
              Thanh toán
            </span>
          </button>

          {/* Move Table */}
          <button
            onClick={onTransfer}
            className="rounded-[24px] p-6 hover:bg-white/10 transition-all duration-300 flex flex-col items-center gap-3"
            style={{ ...THEME_EFFECTS.cardBase, backgroundColor: theme.bgCard }}
          >
            <MoveRight size={32} style={{ color: theme.primary }} />
            <span
              className="uppercase tracking-wider"
              style={{
                fontWeight: 800,
                fontSize: '0.875rem',
                color: theme.textPrimary,
              }}
            >
              Chuyển bàn
            </span>
          </button>

          {/* Pause */}
          <button
            onClick={onPause}
            className="rounded-[24px] p-6 hover:bg-white/10 transition-all duration-300 flex flex-col items-center gap-3"
            style={{ ...THEME_EFFECTS.cardBase, backgroundColor: theme.bgCard }}
          >
            <Pause size={32} style={{ color: theme.warning }} />
            <span
              className="uppercase tracking-wider"
              style={{
                fontWeight: 800,
                fontSize: '0.875rem',
                color: theme.textPrimary,
              }}
            >
              Tạm dừng
            </span>
          </button>

          {/* Order */}
          <button
            onClick={onOrder}
            className="rounded-[24px] p-6 hover:bg-white/10 transition-all duration-300 flex flex-col items-center gap-3"
            style={{ ...THEME_EFFECTS.cardBase, backgroundColor: theme.bgCard }}
          >
            <ShoppingBag size={32} style={{ color: theme.success }} />
            <span
              className="uppercase tracking-wider"
              style={{
                fontWeight: 800,
                fontSize: '0.875rem',
                color: theme.textPrimary,
              }}
            >
              Đặt món
            </span>
          </button>
        </div>
      ) : (
        <button
          onClick={onStart}
          className="w-full rounded-[24px] p-8 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex flex-col items-center justify-center gap-4 group"
          style={{
            ...THEME_EFFECTS.cardBase,
            border: `2px dashed ${theme.primary}`,
            backgroundColor: theme.bgCard
          }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center transition-colors group-hover:bg-primary/20"
            style={{ backgroundColor: `${theme.primary}15` }}
          >
            <Play size={32} style={{ color: theme.primary }} className="ml-1" />
          </div>
          <div className="text-center">
            <div className="text-lg font-bold mb-1" style={{ color: theme.textPrimary }}>BẮT ĐẦU TÍNH GIỜ</div>
            <div className="text-sm text-zinc-400">Nhấn để mở bàn này</div>
          </div>
        </button>
      )}

      {/* Invoice Preview */}
      <div
        className="rounded-[24px] p-6 flex-1 flex flex-col overflow-hidden"
        style={{ ...THEME_EFFECTS.cardBase, backgroundColor: theme.bgCard }}
      >
        <div
          className="uppercase tracking-wider mb-4"
          style={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: theme.textSecondary,
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
                      color: theme.textPrimary,
                    }}
                  >
                    {item.name}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: theme.textSecondary }}>
                    {item.quantity} x {formatMoney(item.price)}
                  </div>
                </div>
                <div style={{ fontWeight: 700, color: theme.textPrimary }}>
                  {formatMoney(item.price * item.quantity)}
                </div>
              </div>
            ))
          ) : (
            <div
              className="text-center py-8"
              style={{ color: theme.textMuted }}
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
            <div className="flex justify-between" style={{ fontSize: '0.875rem', color: theme.textSecondary }}>
              <span>Tạm tính:</span>
              <span>{formatMoney(subtotal)}</span>
            </div>
            <div className="flex justify-between" style={{ fontSize: '0.875rem', color: theme.textSecondary }}>
              <span>VAT (10%):</span>
              <span>{formatMoney(tax)}</span>
            </div>
            <div
              className="my-3"
              style={{
                height: '1px',
                background: `linear-gradient(to right, transparent, ${theme.secondary}80, transparent)`,
              }}
            ></div>
            <div className="flex justify-between items-center">
              <span
                className="uppercase tracking-wider"
                style={{
                  fontWeight: 700,
                  color: theme.textPrimary,
                }}
              >
                Tổng cộng:
              </span>
              <span
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: theme.secondary,
                }}
              >
                {formatMoney(grandTotal)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
