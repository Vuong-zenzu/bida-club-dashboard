/**
 * CYBER LUXURY THEME CONFIGURATION
 * 
 * Đây là file "Variables" giống Figma
 * Thay đổi màu ở đây sẽ tự động áp dụng cho toàn bộ ứng dụng
 * 
 * Ví dụ: Đổi primary từ Cyan (#00F0FF) sang Đỏ (#FF0055)
 * → Tất cả viền bàn, nút, timer sẽ tự động đổi màu
 */

export const THEME_COLORS = {
  // Primary Colors (Có thể thay đổi theo yêu cầu khách hàng)
  primary: '#00F0FF',        // Cyan - Màu chính
  secondary: '#FFD700',      // Gold - Màu phụ (tiền, tổng cộng)
  success: '#00FF88',        // Green - Trạng thái available
  warning: '#FF8C42',        // Orange - Trạng thái reserved

  // Background Colors (Dark Mode Default)
  bgPrimary: '#0B0E11',      // Nền chính
  bgCard: '#1A1D23',         // Nền card (60% opacity khi dùng)

  // Text Colors
  textPrimary: '#FFFFFF',
  textSecondary: '#9CA3AF',
  textMuted: '#6B7280',
} as const;

export const LIGHT_THEME_COLORS = {
  // Primary Colors (Keep Brand Identity)
  primary: '#00B8D9',        // Darker Cyan for visibility on white
  secondary: '#D9B700',      // Darker Gold
  success: '#059669',        // Darker Green
  warning: '#D97706',        // Darker Orange

  // Background Colors (Light Mode)
  bgPrimary: '#F3F4F6',      // Light Gray
  bgCard: '#FFFFFF',         // White

  // Text Colors
  textPrimary: '#111827',    // Gray 900
  textSecondary: '#4B5563',  // Gray 600
  textMuted: '#9CA3AF',      // Gray 400
} as const;

export type ThemeColors = typeof THEME_COLORS;

export const THEME_EFFECTS = {
  // Glow Effects - Tự động tính toán từ primary color
  cyberGlow: (color: string, opacity1 = 0.5, opacity2 = 0.2) => ({
    border: `1px solid ${color}`,
    filter: `drop-shadow(0 0 8px ${color}${Math.round(opacity1 * 255).toString(16).padStart(2, '0')}) drop-shadow(0 0 30px ${color}${Math.round(opacity2 * 255).toString(16).padStart(2, '0')})`,
    backdropFilter: 'blur(20px)',
  }),

  // Card Base Style
  cardBase: {
    backgroundColor: `${THEME_COLORS.bgCard}99`, // 60% opacity
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },

  // Border Radius
  borderRadius: {
    sm: '12px',
    md: '16px',
    lg: '24px',  // Mặc định cho cards
    xl: '32px',
  },
} as const;

export const THEME_TYPOGRAPHY = {
  fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
  fontWeights: {
    regular: 400,
    medium: 600,
    bold: 700,
    extrabold: 800,
  },
} as const;

/**
 * CÁCH THAY ĐỔI MÀU TOÀN BỘ HỆ THỐNG:
 * 
 * 1. Đổi màu Cyan sang Đỏ:
 *    THEME_COLORS.primary = '#FF0055'
 * 
 * 2. Đổi màu Gold sang Xanh dương:
 *    THEME_COLORS.secondary = '#0055FF'
 * 
 * 3. Save file → Tất cả components tự động cập nhật!
 */

// Helper function để lấy màu theo status
export const getStatusColor = (status: 'ACTIVE' | 'AVAILABLE' | 'RESERVED') => {
  switch (status) {
    case 'ACTIVE':
      return THEME_COLORS.primary;
    case 'AVAILABLE':
      return THEME_COLORS.success;
    case 'RESERVED':
      return THEME_COLORS.warning;
  }
};

// Helper function để format currency
export const formatCurrency = (amount: number): string => {
  return amount.toLocaleString('vi-VN') + 'đ';
};
