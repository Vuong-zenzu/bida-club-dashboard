import React from 'react';
import { Wine, Coffee, Utensils, GlassWater } from 'lucide-react';

export const MenuItems: React.FC = () => {
  const items = [
    { icon: Wine, label: 'Beverages' },
    { icon: Coffee, label: 'Coffee' },
    { icon: Utensils, label: 'Snacks' },
    { icon: GlassWater, label: 'Drinks' },
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-white mb-4" style={{ fontSize: '1.125rem', fontWeight: 600 }}>
        Menu Items
      </h3>
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <button
            key={index}
            className="
              w-full py-3 px-6 rounded-xl
              cyber-card
              text-gray-300 hover:text-white
              transition-all duration-200
              flex items-center gap-3
            "
          >
            <Icon size={20} strokeWidth={1.5} />
            <span style={{ fontSize: '0.875rem' }}>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};
