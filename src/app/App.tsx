import React, { useState } from 'react';
import { Palette } from 'lucide-react';
import { TableCard } from '@/app/components/TableCard';
import { ControlPanel } from '@/app/components/ControlPanel';
import { ThemeCustomizer } from '@/app/components/ThemeCustomizer';
import { THEME_COLORS, THEME_EFFECTS } from '@/config/theme.config';

function App() {
  const [selectedTable, setSelectedTable] = useState<string | null>('01');
  const [showThemeCustomizer, setShowThemeCustomizer] = useState(false);

  // 12 bàn (4x3 grid)
  const tables = [
    { tableNumber: '01', status: 'ACTIVE' as const, time: '02:15:30', hourlyFee: 50000, serviceFee: 10000, totalAmount: 150000 },
    { tableNumber: '02', status: 'ACTIVE' as const, time: '01:45:12', hourlyFee: 50000, serviceFee: 10000, totalAmount: 120000 },
    { tableNumber: '03', status: 'AVAILABLE' as const, hourlyFee: 50000, serviceFee: 10000, totalAmount: 0 },
    { tableNumber: '04', status: 'RESERVED' as const, hourlyFee: 50000, serviceFee: 10000, totalAmount: 0 },
    { tableNumber: '05', status: 'ACTIVE' as const, time: '00:30:45', hourlyFee: 60000, serviceFee: 12000, totalAmount: 72000 },
    { tableNumber: '06', status: 'AVAILABLE' as const, hourlyFee: 60000, serviceFee: 12000, totalAmount: 0 },
    { tableNumber: '07', status: 'ACTIVE' as const, time: '03:20:00', hourlyFee: 70000, serviceFee: 15000, totalAmount: 280000 },
    { tableNumber: '08', status: 'RESERVED' as const, hourlyFee: 70000, serviceFee: 15000, totalAmount: 0 },
    { tableNumber: '09', status: 'AVAILABLE' as const, hourlyFee: 50000, serviceFee: 10000, totalAmount: 0 },
    { tableNumber: '10', status: 'ACTIVE' as const, time: '01:10:25', hourlyFee: 50000, serviceFee: 10000, totalAmount: 90000 },
    { tableNumber: '11', status: 'AVAILABLE' as const, hourlyFee: 60000, serviceFee: 12000, totalAmount: 0 },
    { tableNumber: '12', status: 'ACTIVE' as const, time: '00:55:00', hourlyFee: 60000, serviceFee: 12000, totalAmount: 72000 },
  ];

  // Mock invoice items for selected table
  const invoiceItems = selectedTable === '01' ? [
    { name: 'Coca Cola', quantity: 2, price: 15000 },
    { name: 'Café Sữa Đá', quantity: 1, price: 25000 },
    { name: 'Mì xào hải sản', quantity: 1, price: 55000 },
    { name: 'Snack Lay\'s', quantity: 3, price: 12000 },
    { name: 'Trà đào', quantity: 2, price: 30000 },
    { name: 'Thuốc lá Marlboro', quantity: 1, price: 35000 },
  ] : selectedTable === '02' ? [
    { name: 'Tiger Beer', quantity: 4, price: 25000 },
    { name: 'Bò khô', quantity: 2, price: 45000 },
  ] : [];

  const selectedTableData = tables.find(t => t.tableNumber === selectedTable);

  return (
    <div className="dark">
      <div 
        className="min-h-screen text-white flex"
        style={{ backgroundColor: THEME_COLORS.bgPrimary }}
      >
        {/* Main Content - Left Side */}
        <div className="flex-1 p-8 overflow-y-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h1 
                className="tracking-tight" 
                style={{ 
                  fontSize: '3rem',
                  fontWeight: 800, 
                  letterSpacing: '-0.02em',
                  color: THEME_COLORS.primary,
                }}
              >
                CYBER LUXURY BILLIARD
              </h1>
              
              {/* Theme Customizer Button */}
              <button
                onClick={() => setShowThemeCustomizer(true)}
                className="rounded-2xl px-6 py-3 flex items-center gap-3 transition-all hover:scale-105"
                style={{
                  ...THEME_EFFECTS.cardBase,
                  border: `1px solid ${THEME_COLORS.primary}`,
                }}
              >
                <Palette size={20} style={{ color: THEME_COLORS.primary }} />
                <span style={{ fontWeight: 600, color: THEME_COLORS.textPrimary }}>
                  Đổi màu
                </span>
              </button>
            </div>
            <div className="flex items-center gap-6" style={{ color: THEME_COLORS.textSecondary }}>
              <div className="flex items-center gap-2">
                <div 
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: THEME_COLORS.primary }}
                ></div>
                <span>{new Date().toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div 
                className="font-mono" 
                style={{ 
                  fontWeight: 600,
                  color: THEME_COLORS.primary,
                }}
              >
                {new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </div>
            </div>
          </div>

          {/* 4x3 Grid of Tables */}
          <div className="grid grid-cols-4 gap-6">
            {tables.map((table) => (
              <TableCard
                key={table.tableNumber}
                tableNumber={table.tableNumber}
                status={table.status}
                time={table.time}
                hourlyFee={table.hourlyFee}
                serviceFee={table.serviceFee}
                totalAmount={table.totalAmount}
                onClick={() => setSelectedTable(table.tableNumber)}
                isSelected={selectedTable === table.tableNumber}
              />
            ))}
          </div>

          {/* Footer Stats */}
          <div className="grid grid-cols-3 gap-6 mt-8">
            <div className="rounded-[24px] p-6" style={THEME_EFFECTS.cardBase}>
              <div 
                className="uppercase tracking-wider mb-2" 
                style={{ 
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: THEME_COLORS.textSecondary,
                }}
              >
                Đang hoạt động
              </div>
              <div style={{ fontSize: '2.25rem', fontWeight: 800, color: THEME_COLORS.primary }}>
                {tables.filter(t => t.status === 'ACTIVE').length}/12
              </div>
            </div>
            <div className="rounded-[24px] p-6" style={THEME_EFFECTS.cardBase}>
              <div 
                className="uppercase tracking-wider mb-2" 
                style={{ 
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: THEME_COLORS.textSecondary,
                }}
              >
                Doanh thu hôm nay
              </div>
              <div style={{ fontSize: '2.25rem', fontWeight: 800, color: THEME_COLORS.secondary }}>
                2.5M
              </div>
            </div>
            <div className="rounded-[24px] p-6" style={THEME_EFFECTS.cardBase}>
              <div 
                className="uppercase tracking-wider mb-2" 
                style={{ 
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: THEME_COLORS.textSecondary,
                }}
              >
                Trạng thái hệ thống
              </div>
              <div 
                className="flex items-center gap-2" 
                style={{ 
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: THEME_COLORS.success,
                }}
              >
                <div 
                  className="w-3 h-3 rounded-full animate-pulse"
                  style={{ backgroundColor: THEME_COLORS.success }}
                ></div>
                ONLINE
              </div>
            </div>
          </div>
        </div>

        {/* Control Panel - Right Side */}
        <ControlPanel 
          selectedTable={selectedTable}
          tableTime={selectedTableData?.time || '00:00:00'}
          invoiceItems={invoiceItems}
        />
      </div>

      {/* Theme Customizer Modal */}
      {showThemeCustomizer && (
        <ThemeCustomizer onClose={() => setShowThemeCustomizer(false)} />
      )}
    </div>
  );
}

export default App;
