'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number; // 0 to 1
  label?: string;
  showPercentage?: boolean;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeStyles = {
  sm: 'h-1.5',
  md: 'h-3',
  lg: 'h-5',
};

export function ProgressBar({
  value,
  label,
  showPercentage = false,
  color = '#1B4965',
  size = 'md',
  className = '',
}: ProgressBarProps) {
  const percentage = Math.round(Math.min(1, Math.max(0, value)) * 100);

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-sm text-gray-600">{label}</span>}
          {showPercentage && (
            <span className="text-sm font-medium text-gray-700">{percentage}%</span>
          )}
        </div>
      )}
      <div className={`w-full bg-gray-100 rounded-full overflow-hidden ${sizeStyles[size]}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`h-full rounded-full`}
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}
