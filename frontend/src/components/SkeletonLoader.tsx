import React from 'react';

interface SkeletonProps {
  className?: string;
  count?: number;
}

export const SkeletonLoader: React.FC<SkeletonProps> = ({ className = "h-4 w-full", count = 1 }) => {
  return (
    <div className="space-y-2 animate-pulse">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className={`rounded-lg bg-blue-950/40 border border-blue-800/30 ${className}`}
        />
      ))}
    </div>
  );
};
