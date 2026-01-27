# 🎮 CYBER LUXURY BILLIARD MANAGEMENT SYSTEM

## 📚 HỆ THỐNG COMPONENT GIỐNG FIGMA

### 🎨 1. VARIABLES (Biến số)
**File:** `/src/config/theme.config.ts`

```typescript
export const THEME_COLORS = {
  primary: '#00F0FF',     // Màu chính - Cyan
  secondary: '#FFD700',   // Màu phụ - Gold
  success: '#00FF88',     // Available - Green
  warning: '#FF8C42',     // Reserved - Orange
}
```

**Cách thay đổi:**
1. Mở file `/src/config/theme.config.ts`
2. Đổi giá trị màu
3. Save → Refresh browser → Done!

**Hoặc dùng UI:**
- Click nút "Đổi màu" ở góc phải header
- Chọn preset hoặc tùy chỉnh màu
- Copy mã màu và paste vào file config

---

### 🧩 2. MASTER COMPONENT (Component Bàn Gốc)
**File:** `/src/app/components/TableCard.tsx`

Tất cả 12 bàn đều sử dụng cùng 1 component.
Thay đổi component này → Cập nhật toàn bộ 12 bàn!

**Props:**
- `tableNumber` - Số bàn
- `status` - ACTIVE | AVAILABLE | RESERVED
- `time` - Thời gian chơi (chỉ hiện khi ACTIVE)
- `hourlyFee` - Giá giờ
- `serviceFee` - Phí dịch vụ
- `totalAmount` - Tổng tiền (màu Gold)

---

### 📍 3. CONSTRAINTS (Ràng buộc vị trí)

Mỗi phần tử trong TableCard có vị trí cố định:

```typescript
// Table Number - TOP-LEFT
position: absolute;
top: 24px;
left: 24px;

// Timer - CENTER-CENTER
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);

// Total Amount - BOTTOM-RIGHT
position: absolute;
bottom: 24px;
right: 24px;
```

**Kết quả:** Khi resize card, các phần tử vẫn giữ đúng vị trí!

---

### ✨ 4. EFFECT STYLES (Hiệu ứng)

**File:** `/src/styles/theme.css`

```css
.cyber-glow-cyan {
  border: 1px solid #00F0FF;
  filter: drop-shadow(0 0 8px rgba(0, 240, 255, 0.5)) 
          drop-shadow(0 0 30px rgba(0, 240, 255, 0.2));
  backdrop-filter: blur(20px);
}

.cyber-card {
  background-color: rgba(26, 29, 35, 0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

**Sử dụng:**
```tsx
<div className="cyber-card rounded-3xl">...</div>
<div className="cyber-glow-cyan rounded-3xl">...</div>
```

---

## 🗂️ CẤU TRÚC FILE

```
/src
├── /config
│   └── theme.config.ts          ⭐ VARIABLES - Thay đổi màu ở đây
├── /app
│   ├── App.tsx                  📄 Main layout
│   └── /components
│       ├── TableCard.tsx        🧩 MASTER COMPONENT - Bàn gốc
│       ├── ControlPanel.tsx     🎛️ Panel điều khiển
│       └── ThemeCustomizer.tsx  🎨 UI đổi màu
└── /styles
    ├── theme.css                ✨ EFFECT STYLES
    └── fonts.css
```

---

## 🚀 CÁCH SỬ DỤNG

### Thay đổi màu toàn hệ thống (3 cách):

**Cách 1: Dùng UI (Nhanh nhất)**
1. Click nút "Đổi màu" ở header
2. Chọn preset hoặc tùy chỉnh
3. Copy mã màu và paste vào `/src/config/theme.config.ts`

**Cách 2: Sửa file trực tiếp**
1. Mở `/src/config/theme.config.ts`
2. Đổi `primary: '#00F0FF'` → `primary: '#FF0055'`
3. Save file

**Cách 3: Dùng hướng dẫn chi tiết**
- Đọc file `/HUONG_DAN_THAY_DOI_MAU.md`

---

### Tạo bàn mới:

```tsx
<TableCard
  tableNumber="13"
  status="ACTIVE"
  time="01:30:00"
  hourlyFee={50000}
  serviceFee={10000}
  totalAmount={100000}
  onClick={() => handleSelectTable('13')}
  isSelected={selectedTable === '13'}
/>
```

---

### Thay đổi layout bàn:

**Hiện tại:** 4x3 grid (12 bàn)
```tsx
<div className="grid grid-cols-4 gap-6">
```

**Đổi sang:** 3x4 grid (12 bàn)
```tsx
<div className="grid grid-cols-3 gap-6">
```

**Đổi sang:** 5x2 grid (10 bàn)
```tsx
<div className="grid grid-cols-5 gap-6">
```

---

## 🎯 FEATURES

✅ **Variables System** - Đổi màu 1 chỗ, cập nhật toàn bộ
✅ **Master Component** - 1 component cho tất cả bàn
✅ **Constraints** - Vị trí cố định khi resize
✅ **Effect Styles** - Cyber Glow reusable
✅ **Theme Customizer UI** - Đổi màu trực tiếp từ giao diện
✅ **Responsive** - Tự động điều chỉnh theo màn hình
✅ **Dark Mode Only** - Cyberpunk luxury style

---

## 🎨 COLOR PRESETS

1. **Cyber Cyan** (Mặc định): `#00F0FF`
2. **Neon Red**: `#FF0055`
3. **Electric Purple**: `#AA00FF`
4. **Matrix Green**: `#00FF41`
5. **Gold Luxury**: `#FFD700`

---

## 📝 LƯU Ý

- ⚠️ KHÔNG hard-code màu trong component
- ✅ LUÔN dùng `THEME_COLORS.primary` thay vì `#00F0FF`
- ✅ LUÔN dùng `formatCurrency()` để format tiền
- ✅ LUÔN dùng `THEME_EFFECTS.cardBase` cho card background

---

**Made with 💙 for Cyber Luxury Billiard**
