import React, { useState } from 'react';
import { Palette, X } from 'lucide-react';
import { THEME_COLORS, THEME_EFFECTS } from '@/config/theme.config';

/**
 * THEME CUSTOMIZER
 * 
 * Component cho phép thay đổi màu trực tiếp từ UI (giống Figma Variables)
 * Chỉ để demo - Trong production cần lưu vào database/localStorage
 */

interface ThemeCustomizerProps {
  onClose?: () => void;
}

export const ThemeCustomizer: React.FC<ThemeCustomizerProps> = ({ onClose }) => {
  const [tempPrimary, setTempPrimary] = useState(THEME_COLORS.primary);
  const [tempSecondary, setTempSecondary] = useState(THEME_COLORS.secondary);
  const [tempSuccess, setTempSuccess] = useState(THEME_COLORS.success);
  const [tempWarning, setTempWarning] = useState(THEME_COLORS.warning);

  const presets = [
    { name: 'Cyber Cyan (Mặc định)', primary: '#00F0FF', secondary: '#FFD700', success: '#00FF88', warning: '#FF8C42' },
    { name: 'Neon Red', primary: '#FF0055', secondary: '#FFD700', success: '#00FF88', warning: '#FF8C42' },
    { name: 'Electric Purple', primary: '#AA00FF', secondary: '#FFD700', success: '#00FF88', warning: '#FF8C42' },
    { name: 'Matrix Green', primary: '#00FF41', secondary: '#FFD700', success: '#00FF88', warning: '#FF8C42' },
    { name: 'Gold Luxury', primary: '#FFD700', secondary: '#00F0FF', success: '#00FF88', warning: '#FF8C42' },
  ];

  const applyPreset = (preset: typeof presets[0]) => {
    setTempPrimary(preset.primary);
    setTempSecondary(preset.secondary);
    setTempSuccess(preset.success);
    setTempWarning(preset.warning);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-8"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(10px)' }}
    >
      <div 
        className="rounded-[24px] p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar"
        style={{
          ...THEME_EFFECTS.cardBase,
          border: `2px solid ${THEME_COLORS.primary}`,
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Palette size={32} style={{ color: THEME_COLORS.primary }} />
            <h2 
              style={{ 
                fontSize: '1.875rem',
                fontWeight: 800,
                color: THEME_COLORS.textPrimary,
              }}
            >
              Theme Customizer
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="hover:scale-110 transition-transform"
            style={{ color: THEME_COLORS.textSecondary }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Preset Themes */}
        <div className="mb-8">
          <div 
            className="uppercase tracking-wider mb-4"
            style={{ 
              fontSize: '0.875rem',
              fontWeight: 600,
              color: THEME_COLORS.textSecondary,
            }}
          >
            Giao diện có sẵn
          </div>
          <div className="grid grid-cols-2 gap-4">
            {presets.map((preset, index) => (
              <button
                key={index}
                onClick={() => applyPreset(preset)}
                className="rounded-2xl p-4 text-left transition-all hover:scale-105"
                style={{
                  ...THEME_EFFECTS.cardBase,
                  border: `1px solid ${preset.primary}40`,
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div 
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: preset.primary }}
                  ></div>
                  <div 
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: preset.secondary }}
                  ></div>
                </div>
                <div style={{ fontWeight: 600, color: THEME_COLORS.textPrimary }}>
                  {preset.name}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Colors */}
        <div className="space-y-6">
          <div 
            className="uppercase tracking-wider mb-4"
            style={{ 
              fontSize: '0.875rem',
              fontWeight: 600,
              color: THEME_COLORS.textSecondary,
            }}
          >
            Tùy chỉnh màu sắc
          </div>

          {/* Primary Color */}
          <div className="rounded-2xl p-4" style={THEME_EFFECTS.cardBase}>
            <label className="block mb-3" style={{ fontWeight: 600, color: THEME_COLORS.textPrimary }}>
              Màu chính (Primary)
            </label>
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={tempPrimary}
                onChange={(e) => setTempPrimary(e.target.value)}
                className="w-16 h-16 rounded-xl cursor-pointer"
                style={{ border: `2px solid ${tempPrimary}` }}
              />
              <div className="flex-1">
                <input
                  type="text"
                  value={tempPrimary}
                  onChange={(e) => setTempPrimary(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl font-mono"
                  style={{
                    ...THEME_EFFECTS.cardBase,
                    color: THEME_COLORS.textPrimary,
                  }}
                />
              </div>
            </div>
            <div className="mt-3 text-sm" style={{ color: THEME_COLORS.textSecondary }}>
              Áp dụng cho: Viền bàn ACTIVE, Timer, Nút Thanh toán, Header
            </div>
          </div>

          {/* Secondary Color */}
          <div className="rounded-2xl p-4" style={THEME_EFFECTS.cardBase}>
            <label className="block mb-3" style={{ fontWeight: 600, color: THEME_COLORS.textPrimary }}>
              Màu phụ (Secondary) - Tiền
            </label>
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={tempSecondary}
                onChange={(e) => setTempSecondary(e.target.value)}
                className="w-16 h-16 rounded-xl cursor-pointer"
                style={{ border: `2px solid ${tempSecondary}` }}
              />
              <div className="flex-1">
                <input
                  type="text"
                  value={tempSecondary}
                  onChange={(e) => setTempSecondary(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl font-mono"
                  style={{
                    ...THEME_EFFECTS.cardBase,
                    color: THEME_COLORS.textPrimary,
                  }}
                />
              </div>
            </div>
            <div className="mt-3 text-sm" style={{ color: THEME_COLORS.textSecondary }}>
              Áp dụng cho: Tổng tiền trên card, Grand Total hóa đơn
            </div>
          </div>

          {/* Success Color */}
          <div className="rounded-2xl p-4" style={THEME_EFFECTS.cardBase}>
            <label className="block mb-3" style={{ fontWeight: 600, color: THEME_COLORS.textPrimary }}>
              Màu Available (Success)
            </label>
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={tempSuccess}
                onChange={(e) => setTempSuccess(e.target.value)}
                className="w-16 h-16 rounded-xl cursor-pointer"
                style={{ border: `2px solid ${tempSuccess}` }}
              />
              <div className="flex-1">
                <input
                  type="text"
                  value={tempSuccess}
                  onChange={(e) => setTempSuccess(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl font-mono"
                  style={{
                    ...THEME_EFFECTS.cardBase,
                    color: THEME_COLORS.textPrimary,
                  }}
                />
              </div>
            </div>
            <div className="mt-3 text-sm" style={{ color: THEME_COLORS.textSecondary }}>
              Áp dụng cho: Bàn trống, Nút Đặt món, Status ONLINE
            </div>
          </div>

          {/* Warning Color */}
          <div className="rounded-2xl p-4" style={THEME_EFFECTS.cardBase}>
            <label className="block mb-3" style={{ fontWeight: 600, color: THEME_COLORS.textPrimary }}>
              Màu Reserved (Warning)
            </label>
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={tempWarning}
                onChange={(e) => setTempWarning(e.target.value)}
                className="w-16 h-16 rounded-xl cursor-pointer"
                style={{ border: `2px solid ${tempWarning}` }}
              />
              <div className="flex-1">
                <input
                  type="text"
                  value={tempWarning}
                  onChange={(e) => setTempWarning(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl font-mono"
                  style={{
                    ...THEME_EFFECTS.cardBase,
                    color: THEME_COLORS.textPrimary,
                  }}
                />
              </div>
            </div>
            <div className="mt-3 text-sm" style={{ color: THEME_COLORS.textSecondary }}>
              Áp dụng cho: Bàn đặt trước, Nút Tạm dừng
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div 
          className="mt-8 rounded-2xl p-6"
          style={{
            backgroundColor: `${THEME_COLORS.primary}1A`,
            border: `1px solid ${THEME_COLORS.primary}40`,
          }}
        >
          <div 
            className="uppercase tracking-wider mb-3"
            style={{ 
              fontSize: '0.75rem',
              fontWeight: 600,
              color: THEME_COLORS.primary,
            }}
          >
            💡 HƯỚNG DẪN ÁP DỤNG
          </div>
          <div style={{ fontSize: '0.875rem', color: THEME_COLORS.textSecondary, lineHeight: 1.6 }}>
            1. Chọn giao diện có sẵn hoặc tùy chỉnh màu thủ công<br />
            2. Mở file: <code className="px-2 py-1 rounded" style={{ backgroundColor: THEME_COLORS.bgCard, color: THEME_COLORS.primary }}>/src/config/theme.config.ts</code><br />
            3. Thay đổi giá trị màu trong <code className="px-2 py-1 rounded" style={{ backgroundColor: THEME_COLORS.bgCard, color: THEME_COLORS.primary }}>THEME_COLORS</code><br />
            4. Save file → Refresh trình duyệt → Hoàn tất!
          </div>
        </div>
      </div>
    </div>
  );
};
