import React from 'react';

export const QuickActions: React.FC = () => {
  const actions = [
    { label: 'Start Table', color: 'bg-[#00F0FF]', hoverColor: 'hover:bg-[#00D9E6]' },
    { label: 'Move Table', color: 'bg-[#6366F1]', hoverColor: 'hover:bg-[#4F46E5]' },
    { label: 'Merge Table', color: 'bg-[#A855F7]', hoverColor: 'hover:bg-[#9333EA]' },
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-white mb-4" style={{ fontSize: '1.125rem', fontWeight: 600 }}>
        Quick Actions
      </h3>
      {actions.map((action, index) => (
        <button
          key={index}
          className={`
            w-full py-3 px-6 rounded-xl
            ${action.color} ${action.hoverColor}
            text-white transition-all duration-200
            shadow-lg hover:shadow-xl
          `}
          style={{
            fontWeight: 600,
            filter: `drop-shadow(0 4px 12px ${action.color.replace('bg-', 'rgba').replace('[', '').replace(']', ', 0.4)')}`,
          }}
        >
          {action.label}
        </button>
      ))}
    </div>
  );
};
