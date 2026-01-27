import React from 'react';
import { LayoutDashboard, ShoppingCart, DollarSign, Settings } from 'lucide-react';

interface SidebarProps {
  activeItem?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeItem = 'dashboard' }) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'orders', icon: ShoppingCart, label: 'Orders' },
    { id: 'revenue', icon: DollarSign, label: 'Revenue' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="w-24 bg-[#0B0E11] border-r border-white/10 flex flex-col items-center py-8 gap-8">
      <div className="w-12 h-12 flex items-center justify-center">
        <div className="text-2xl">✦</div>
      </div>

      <div className="flex-1 flex flex-col gap-8">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          return (
            <button
              key={item.id}
              className={`
                flex flex-col items-center gap-2 px-4 py-3 rounded-lg transition-all
                ${isActive 
                  ? 'text-[#00F0FF]' 
                  : 'text-gray-500 hover:text-gray-300'
                }
              `}
              style={{
                filter: isActive ? 'drop-shadow(0 0 10px rgba(0, 240, 255, 0.4))' : 'none'
              }}
            >
              <Icon size={24} strokeWidth={1.5} />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
