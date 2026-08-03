import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => (
  <div
    className={twMerge(
      clsx(
        'rounded-[20px] border border-[#DCE7F5] bg-white p-5 shadow-[0_6px_18px_rgba(120,160,210,0.15)] transition-all hover:shadow-[0_10px_24px_rgba(120,160,210,0.22)]',
        className
      )
    )}
    {...props}
  >
    {children}
  </div>
);

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => (
  <div className={twMerge(clsx('flex flex-col space-y-1 pb-3 border-b border-[#EEF6FF] mb-3', className))} {...props}>
    {children}
  </div>
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ className, children, ...props }) => (
  <h3 className={twMerge(clsx('text-sm font-extrabold text-[#1E293B] font-heading tracking-wide flex items-center justify-between', className))} {...props}>
    {children}
  </h3>
);

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ className, children, ...props }) => (
  <p className={twMerge(clsx('text-xs text-[#64748B]', className))} {...props}>
    {children}
  </p>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => (
  <div className={twMerge(clsx('space-y-3', className))} {...props}>
    {children}
  </div>
);
