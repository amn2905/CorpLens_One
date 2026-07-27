import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'default',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold transition-all rounded-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    default: 'bg-surface hover:bg-surface-hover text-text-main border border-border-subtle shadow-sm',
    primary: 'bg-primary hover:bg-primary-hover text-white border border-blue-400/30 shadow-lg shadow-blue-600/25',
    outline: 'bg-transparent border border-border-subtle text-blue-300 hover:text-white hover:bg-blue-950/40',
    ghost: 'bg-transparent hover:bg-surface text-text-muted hover:text-text-main',
    danger: 'bg-risk-critical/15 hover:bg-risk-critical/25 text-red-300 border border-risk-critical/40',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-xs px-4 py-2 gap-2',
    lg: 'text-sm px-5 py-2.5 gap-2.5',
  };

  return (
    <button
      className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin shrink-0" />
      ) : leftIcon ? (
        <span className="shrink-0">{leftIcon}</span>
      ) : null}
      <span>{children}</span>
      {rightIcon && !isLoading && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
};
