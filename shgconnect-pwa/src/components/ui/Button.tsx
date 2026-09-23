import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost' | 'violet';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyle =
    'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

  const variantStyles: Record<string, string> = {
    primary:
      'text-white shadow-sm hover:shadow-md focus-visible:ring-[#1A6B4A]',
    secondary:
      'text-white shadow-sm hover:shadow-md focus-visible:ring-[#E8720C]',
    outline:
      'bg-white text-gray-700 hover:bg-gray-50 border border-[#E4E8EF] hover:border-[#A7D9BC] shadow-sm focus-visible:ring-[#1A6B4A]',
    danger:
      'bg-red-600 hover:bg-red-700 text-white shadow-sm border border-red-700 focus-visible:ring-red-500',
    ghost:
      'bg-transparent hover:bg-gray-100 text-gray-700 focus-visible:ring-gray-400',
    violet:
      'text-white shadow-sm hover:shadow-md focus-visible:ring-[#6D28D9]',
  };

  const variantInlineStyles: Record<string, React.CSSProperties> = {
    primary: { background: 'linear-gradient(135deg, #1A6B4A 0%, #145739 100%)' },
    secondary: { background: 'linear-gradient(135deg, #E8720C 0%, #C55E08 100%)' },
    violet: { background: 'linear-gradient(135deg, #6D28D9 0%, #5B21B6 100%)' },
    outline: {},
    danger: {},
    ghost: {},
  };

  const sizeStyles: Record<string, string> = {
    sm: 'text-xs px-3 py-1.5 min-h-[34px] gap-1.5',
    md: 'text-sm px-4 py-2.5 min-h-[42px] gap-2',
    lg: 'text-[15px] px-6 py-3 min-h-[50px] gap-2.5',
  };

  return (
    <button
      className={`${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      style={variantInlineStyles[variant]}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
};
