import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'low' | 'medium' | 'high' | 'critical' | 'default' | 'cyan' | 'outline';
}

export const Badge: React.FC<BadgeProps> = ({ children, className, variant = 'default', ...props }) => {
  const base = 'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border tracking-wider uppercase';

  const variants = {
    low: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    medium: 'bg-amber-50 text-amber-700 border-amber-200',
    high: 'bg-orange-50 text-orange-700 border-orange-200',
    critical: 'bg-rose-50 text-rose-700 border-rose-200',
    cyan: 'bg-[#EEF6FF] text-[#3B82F6] border-[#DCE7F5]',
    default: 'bg-[#F4F9FF] text-[#1E293B] border-[#DCE7F5]',
    outline: 'bg-transparent text-[#64748B] border-[#DCE7F5]',
  };

  return (
    <span className={twMerge(clsx(base, variants[variant], className))} {...props}>
      <span className={clsx('w-1.5 h-1.5 rounded-full', {
        'bg-emerald-500': variant === 'low',
        'bg-amber-500': variant === 'medium',
        'bg-orange-500': variant === 'high',
        'bg-rose-500': variant === 'critical',
        'bg-[#3B82F6]': variant === 'cyan',
        'bg-[#64748B]': variant === 'default' || variant === 'outline',
      })} />
      {children}
    </span>
  );
};
