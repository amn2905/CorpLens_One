import React from 'react';

interface RiskBadgeProps {
  score: number;
  tier?: 'Low' | 'Medium' | 'High' | 'Critical';
  size?: 'sm' | 'md' | 'lg';
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ score, tier, size = 'md' }) => {
  let computedTier = tier;
  if (!computedTier) {
    if (score <= 30) computedTier = 'Low';
    else if (score <= 60) computedTier = 'Medium';
    else if (score <= 80) computedTier = 'High';
    else computedTier = 'Critical';
  }

  const badgeStyles = {
    Low: 'bg-zinc-900 text-zinc-300 border-zinc-700',
    Medium: 'bg-zinc-800 text-zinc-200 border-zinc-600',
    High: 'bg-white/10 text-white border-white/30 font-bold',
    Critical: 'bg-white text-black font-extrabold border-white shadow-lg glow-white'
  }[computedTier];

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs font-mono',
    lg: 'px-3.5 py-1.5 text-sm font-mono font-bold'
  }[size];

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md border tracking-tight ${badgeStyles} ${sizeStyles}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${
        computedTier === 'Critical' ? 'bg-black animate-ping' :
        computedTier === 'High' ? 'bg-white animate-pulse' :
        'bg-zinc-400'
      }`} />
      <span>{score.toFixed(1)} / 100</span>
      <span className="opacity-80 uppercase text-[10px] tracking-wider font-sans">({computedTier})</span>
    </span>
  );
};
