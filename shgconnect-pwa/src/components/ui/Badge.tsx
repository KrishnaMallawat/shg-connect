import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'saffron' | 'violet' | 'blue';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  icon
}) => {
  const baseStyle = 'inline-flex items-center gap-1 font-semibold rounded-full tracking-wide select-none';

  const variantStyles: Record<string, string> = {
    success:  'bg-[#E6F4EE] text-[#1A6B4A] border border-[#A7D9BC]',
    warning:  'bg-amber-50 text-amber-700 border border-amber-200',
    error:    'bg-red-50 text-red-700 border border-red-200',
    info:     'bg-[#EBF3FF] text-[#1D5FA8] border border-[#BFDBFE]',
    neutral:  'bg-gray-100 text-gray-600 border border-gray-200',
    saffron:  'bg-[#FFF0E5] text-[#E8720C] border border-[#FED7AA] font-semibold',
    violet:   'bg-[#EDE9FE] text-[#6D28D9] border border-[#C4B5FD]',
    blue:     'bg-[#EBF3FF] text-[#1D5FA8] border border-[#BFDBFE]',
  };

  const sizeStyles: Record<string, string> = {
    sm: 'text-[10px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
  };

  return (
    <span className={`${baseStyle} ${variantStyles[variant] || variantStyles.neutral} ${sizeStyles[size]}`}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
