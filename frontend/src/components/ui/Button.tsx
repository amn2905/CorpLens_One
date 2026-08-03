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
  const baseStyles = 'inline-flex items-center justify-center font-bold transition-all rounded-[14px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed font-sans';

  const variants = {
    default: 'bg-[#EEF6FF] hover:bg-[#DBEAFE] text-[#3B82F6] border border-[#DCE7F5]',
    primary: 'bg-[#3B82F6] hover:bg-[#2563EB] text-white shadow-[0_4px_12px_rgba(59,130,246,0.25)] hover:shadow-[0_6px_16px_rgba(59,130,246,0.35)]',
    outline: 'bg-[#EEF6FF] hover:bg-[#DBEAFE] text-[#3B82F6] border border-[#DCE7F5]',
    ghost: 'bg-transparent hover:bg-[#EEF6FF] text-[#64748B] hover:text-[#1E293B]',
    danger: 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200',
  };

  const sizes = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
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
