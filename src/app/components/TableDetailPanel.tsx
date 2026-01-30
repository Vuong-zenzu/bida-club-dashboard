import React from 'react';
import { formatCurrency } from '@/config/theme.config';
import { useTheme } from '@/context/ThemeContext';

interface Props {
  tableNumber?: string;
  time?: string;
  hourlyFee?: number;
  serviceFee?: number;
  totalAmount?: number;
}

export const TableDetailPanel: React.FC<Props> = ({
  tableNumber = '--',
  time = '00:00:00',
  hourlyFee = 0,
  serviceFee = 0,
  totalAmount = 0,
}) => {
  const { theme } = useTheme();
  return (
    <div
      className="h-full p-4 flex flex-col gap-4"
      style={{
        background: theme.bgCard,
        borderRight: `1px solid ${theme.primary}20`,
      }}
    >
      <div>
        <div className="text-xs uppercase tracking-wider text-gray-400">
          Bàn
        </div>
        <div className="text-3xl font-extrabold text-white">
          {tableNumber}
        </div>
      </div>

      <div className="font-mono text-lg text-cyan-400">
        ⏱ {time}
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Giá giờ</span>
          <span>{formatCurrency(hourlyFee)}</span>
        </div>
        <div className="flex justify-between">
          <span>Phí dịch vụ</span>
          <span>{formatCurrency(serviceFee)}</span>
        </div>
      </div>

      <div className="mt-auto">
        <div className="text-xs text-gray-400 mb-1">Tổng tiền</div>
        <div className="text-2xl font-bold text-yellow-400">
          {formatCurrency(totalAmount)}
        </div>
      </div>
    </div>
  );
};
