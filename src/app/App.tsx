import { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';
import { TableCard } from '@/app/components/TableCard';
import { MobileActionBar } from '@/components/MobileActionBar';
import { ControlPanel } from '@/app/components/ControlPanel';
import { SettingsModal } from '@/app/components/SettingsModal';
import { TransferModal } from '@/app/components/dialogs/TransferModal';
import { OrderModal } from '@/app/components/dialogs/OrderModal';
import { PaymentModal } from '@/app/components/dialogs/PaymentModal';
import { THEME_COLORS, THEME_EFFECTS } from '@/config/theme.config';
import { RevenueReport } from '@/app/pages/RevenueReport';
import { useTheme } from '@/context/ThemeContext';


import { useTableContext } from '@/context/TableContext';

function App() {
  const [currentView, setCurrentView] = useState<'DASHBOARD' | 'REVENUE'>('DASHBOARD');
  const [selectedTableId, setSelectedTableId] = useState<string | null>('01');
  const { tables, startSession, togglePause } = useTableContext();
  const { theme, formatMoney, formatTime } = useTheme();

  const [showThemeCustomizer, setShowThemeCustomizer] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Clock state
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Get selected table data from the Single Source of Truth
  const selectedTableData = tables.find(t => t.id === selectedTableId);

  // Prepare Invoice Items data for ControlPanel
  const invoiceItems = selectedTableData?.menuItems || [];

  if (currentView === 'REVENUE') {
    return <RevenueReport onBack={() => setCurrentView('DASHBOARD')} />;
  }

  // Action Handlers
  const handleStartTable = (id: string) => {
    startSession(id);
    setSelectedTableId(id);
  };

  const handleStopTable = (id: string) => {
    // In a real app this might open a confirmation or directly stop if payment handled elsewhere
    // For now we assume PaymentModal handles the stop
    console.log('Stop request for code', id);
  }

  return (
    <div className={`dark ${theme === THEME_COLORS ? '' : 'light'}`} onContextMenu={(e) => e.preventDefault()}>
      <div
        // [LAYOUT MAIN] Mobile: Col | Desktop: Row
        className="min-h-screen text-white flex flex-col lg:flex-row"
        style={{ backgroundColor: theme.bgPrimary, color: theme.textPrimary }}
      >
        {/* Main Content - Left Side */}
        {/* [PADDING] Responsive padding */}
        <div className="flex-1 p-4 md:p-8 overflow-y-auto">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <div className="flex items-center justify-between mb-3">
              <h1
                // [TYPOGRAPHY] Responsive Font Size
                className="tracking-tight text-3xl md:text-5xl font-extrabold"
                style={{
                  letterSpacing: '-0.02em',
                  color: theme.primary,
                }}
              >
                CYBER LUXURY BILLIARD
              </h1>

              {/* Settings Button */}
              <button
                onClick={() => setShowThemeCustomizer(true)}
                className="rounded-2xl px-4 py-2 md:px-6 md:py-3 flex items-center gap-2 md:gap-3 transition-all hover:scale-105"
                style={{
                  ...THEME_EFFECTS.cardBase,
                  border: `1px solid ${theme.primary}`,
                  backgroundColor: theme.bgCard
                }}
              >
                <Settings size={20} style={{ color: theme.primary }} />
                <span className="hidden md:inline" style={{ fontWeight: 600, color: theme.textPrimary }}>
                  Cài đặt
                </span>
              </button>
            </div>
            <div className="flex items-center gap-4 md:gap-6 text-sm md:text-base" style={{ color: theme.textSecondary }}>
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: theme.primary }}
                ></div>
                <span>{currentTime.toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div
                className="font-mono"
                style={{
                  fontWeight: 600,
                  color: theme.primary,
                }}
              >
                {formatTime(currentTime)}
              </div>
            </div>
          </div>

          {/* [GRID SYSTEM] 1 -> 2 -> 3 -> 4 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6">
            {tables.map((table) => (
              <TableCard
                key={table.id}
                id={table.id}
                onClick={() => setSelectedTableId(table.id)}
                isSelected={selectedTableId === table.id}
                onOrder={() => { setSelectedTableId(table.id); setShowOrderModal(true); }}
                onSwitch={() => { setSelectedTableId(table.id); setShowTransferModal(true); }}
                onPay={() => { setSelectedTableId(table.id); setShowPaymentModal(true); }}
                onClose={() => setSelectedTableId(null)}
              />
            ))}
          </div>

          {/* Footer Stats - Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-6 md:mt-8">
            <div className="rounded-[24px] p-6" style={{ ...THEME_EFFECTS.cardBase, backgroundColor: theme.bgCard }}>
              <div
                className="uppercase tracking-wider mb-2"
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: theme.textSecondary,
                }}
              >
                Đang hoạt động
              </div>
              <div style={{ fontSize: '2.25rem', fontWeight: 800, color: theme.primary }}>
                {tables.filter(t => t.status === 'ACTIVE').length}/12
              </div>
            </div>
            <button
              onClick={() => setCurrentView('REVENUE')}
              className="rounded-[24px] p-6 text-left w-full transition-transform hover:scale-105"
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
                Doanh thu hôm nay
              </div>
              <div style={{ fontSize: '2.25rem', fontWeight: 800, color: theme.secondary }}>

                {/* Logic: Calculated live revenue */}
                {formatMoney(tables.reduce((acc, t) => acc + t.orderTotal, 0))}
              </div>
            </button>
            <div className="rounded-[24px] p-6" style={{ ...THEME_EFFECTS.cardBase, backgroundColor: theme.bgCard }}>
              <div
                className="uppercase tracking-wider mb-2"
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: theme.textSecondary,
                }}
              >
                Trạng thái hệ thống
              </div>
              <div
                className="flex items-center gap-2"
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: theme.success,
                }}
              >
                <div
                  className="w-3 h-3 rounded-full animate-pulse"
                  style={{ backgroundColor: theme.success }}
                ></div>
                ONLINE
              </div>
            </div>
          </div>
        </div>

        <ControlPanel
          selectedTable={selectedTableId}
          tableName={selectedTableData?.name}
          startTime={selectedTableData?.startTime ?? null}
          duration={selectedTableData?.duration}
          invoiceItems={invoiceItems}
          isTableActive={selectedTableData?.status === 'ACTIVE'}
          onStart={() => selectedTableId && handleStartTable(selectedTableId)}
          onTransfer={() => selectedTableId && setShowTransferModal(true)}
          onOrder={() => selectedTableId && setShowOrderModal(true)}
          onPayment={() => selectedTableId && setShowPaymentModal(true)}
          onPause={() => selectedTableId && togglePause(selectedTableId)}
        />
      </div>

      <MobileActionBar
        isVisible={!!selectedTableId}
        isTableActive={selectedTableData?.status === 'ACTIVE'}
        tableName={selectedTableData?.name}
        onStart={() => selectedTableId && handleStartTable(selectedTableId)}
        onStop={() => selectedTableId && handleStopTable(selectedTableId)}
        onOrder={() => selectedTableId && setShowOrderModal(true)}
        onSwitch={() => selectedTableId && setShowTransferModal(true)}
        onPay={() => selectedTableId && setShowPaymentModal(true)}
        onMenu={() => console.log('Menu', selectedTableId)}
      />

      {/* Settings Modal */}
      {showThemeCustomizer && (
        <SettingsModal onClose={() => setShowThemeCustomizer(false)} />
      )}

      {/* DIALOGS */}
      {selectedTableId && (
        <>
          <TransferModal
            isOpen={showTransferModal}
            onClose={() => setShowTransferModal(false)}
            sourceTable={selectedTableId}
          />
          <OrderModal
            isOpen={showOrderModal}
            onClose={() => setShowOrderModal(false)}
            tableNumber={selectedTableId}
          />
          <PaymentModal
            isOpen={showPaymentModal}
            onClose={() => setShowPaymentModal(false)}
            tableNumber={selectedTableId}
          />
        </>
      )}
    </div>

  );
}

export default App;