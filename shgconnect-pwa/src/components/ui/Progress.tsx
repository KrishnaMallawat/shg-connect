import React from 'react';

interface ProgressProps {
  value: number;
  max?: number;
  label?: string;
  sublabel?: string;
  variant?: 'green' | 'saffron' | 'blue' | 'violet';
  className?: string;
  showPercent?: boolean;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  label,
  sublabel,
  variant = 'green',
  className = '',
  showPercent = false,
}) => {
  const percentage = Math.min(Math.max(Math.round((value / max) * 100), 0), 100);

  const barGradients: Record<string, string> = {
    green:   'linear-gradient(90deg, #1A6B4A 0%, #2D9B6A 100%)',
    saffron: 'linear-gradient(90deg, #C55E08 0%, #E8720C 100%)',
    blue:    'linear-gradient(90deg, #1D5FA8 0%, #3B82F6 100%)',
    violet:  'linear-gradient(90deg, #5B21B6 0%, #7C3AED 100%)',
  };

  return (
    <div className={`space-y-1.5 ${className}`}>
      {(label || sublabel) && (
        <div className="flex justify-between items-center text-xs font-medium text-gray-700">
          {label && <span>{label}</span>}
          <span className="text-gray-400">
            {showPercent ? `${percentage}%` : sublabel}
          </span>
        </div>
      )}
      <div className="w-full rounded-full h-2.5 overflow-hidden" style={{ background: '#E4E8EF' }}>
        <div
          className="h-full transition-all duration-700 rounded-full"
          style={{
            width: `${percentage}%`,
            background: barGradients[variant] || barGradients.green,
          }}
        />
      </div>
    </div>
  );
};
