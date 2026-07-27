import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'low' | 'medium' | 'high' | 'critical' | 'default' | 'cyan' | 'outline';
}

export const Badge: React.FC<BadgeProps> = ({ children, className, variant = 'default', ...props }) => {
  const base = 'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold border tracking-wider uppercase';

  const variants = {
    low: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    medium: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    high: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
    critical: 'bg-rose-500/15 text-rose-400 border-rose-500/40 animate-pulse',
    cyan: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
    default: 'bg-slate-800/60 text-slate-300 border-slate-700/60',
    outline: 'bg-transparent text-slate-400 border-slate-700',
  };

  return (
    <span className={twMerge(clsx(base, variants[variant], className))} {...props}>
      <span className={clsx('w-1.5 h-1.5 rounded-full', {
        'bg-emerald-400': variant === 'low',
        'bg-amber-400': variant === 'medium',
        'bg-orange-400': variant === 'high',
        'bg-rose-400': variant === 'critical',
        'bg-sky-400': variant === 'cyan',
        'bg-slate-400': variant === 'default' || variant === 'outline',
      })} />
      {children}
    </span>
  );
};
