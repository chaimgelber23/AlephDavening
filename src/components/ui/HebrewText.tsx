'use client';

import { cn } from '@/lib/utils';

interface HebrewTextProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  withTransliteration?: string;
  transliterationMode?: 'full' | 'faded' | 'tap' | 'off';
  onClick?: () => void;
}

const sizeClasses = {
  sm: 'text-lg',
  md: 'text-2xl',
  lg: 'text-4xl',
  xl: 'text-5xl',
  '2xl': 'text-7xl',
};

export function HebrewText({
  children,
  size = 'lg',
  className,
  withTransliteration,
  transliterationMode = 'full',
  onClick,
}: HebrewTextProps) {
  return (
    <div className={cn('flex flex-col items-center gap-1', className)} onClick={onClick}>
      <span
        dir="rtl"
        className={cn(
          "font-['Noto_Serif_Hebrew',serif] text-[#1A1A2E] leading-[2]",
          sizeClasses[size],
          onClick && 'cursor-pointer hover:text-[#1B4965] transition-colors'
        )}
      >
        {children}
      </span>
      {withTransliteration && transliterationMode !== 'off' && (
        <span
          className={cn(
            'text-center transition-opacity',
            transliterationMode === 'full' && 'text-base text-gray-500',
            transliterationMode === 'faded' && 'text-xs text-gray-300',
            transliterationMode === 'tap' && 'text-sm text-gray-400 opacity-0 hover:opacity-100'
          )}
        >
          {withTransliteration}
        </span>
      )}
    </div>
  );
}
