import React from 'react';

interface RiskBadgeProps {
  score: number;
  tier?: 'Low' | 'Medium' | 'High' | 'Critical';
  size?: 'sm' | 'md' | 'lg';
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ score, tier, size = 'md' }) => {
  let computedTier = tier;
  if (!computedTier) {
    if (score <= 3.9 || score <= 30) computedTier = 'Low';
    else if (score <= 6.9 || score <= 60) computedTier = 'Medium';
    else if (score <= 8.9 || score <= 80) computedTier = 'High';
    else computedTier = 'Critical';
  }

  const badgeStyles = {
    Low: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Medium: 'bg-amber-50 text-amber-700 border-amber-200',
    High: 'bg-orange-50 text-orange-700 border-orange-200',
    Critical: 'bg-rose-50 text-rose-700 border-rose-200 font-bold'
  }[computedTier];

  const dotStyles = {
    Low: 'bg-emerald-500',
    Medium: 'bg-amber-500',
    High: 'bg-orange-500',
    Critical: 'bg-rose-500 animate-pulse'
  }[computedTier];

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-[11px] rounded-lg',
    md: 'px-2.5 py-1 text-xs font-mono rounded-xl',
    lg: 'px-3.5 py-1.5 text-sm font-mono font-bold rounded-xl'
  }[size];

  // If score is on 0-10 scale or 0-100 scale, format cleanly
  const displayScore = score <= 10 ? score.toFixed(1) : (score / 10).toFixed(1);

  return (
    <span className={`inline-flex items-center gap-1.5 border shadow-sm ${badgeStyles} ${sizeStyles}`}>
      <span className={`h-2 w-2 rounded-full ${dotStyles}`} />
      <span>{displayScore} / 10.0</span>
      <span className="opacity-90 uppercase text-[10px] tracking-wider font-sans font-bold">({computedTier})</span>
    </span>
  );
};
