import React from 'react';
import { Card } from './Card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export interface KPICardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  description?: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  change,
  trend = 'neutral',
  description,
  subtitle,
  icon,
}) => {
  return (
    <Card className="relative overflow-hidden bg-white border-slate-200">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
          {title}
        </span>
        {icon && (
          <div className="p-2 rounded-lg bg-blue-50 border border-blue-100 text-blue-600">
            {icon}
          </div>
        )}
      </div>

      <div className="mt-2.5 flex items-baseline justify-between">
        <span className="text-2xl font-extrabold text-slate-900 font-heading tracking-tight">
          {value}
        </span>

        {change && (
          <span
            className={`inline-flex items-center text-xs font-mono font-bold px-2 py-0.5 rounded ${
              trend === 'up'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : trend === 'down'
                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                : 'bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            {trend === 'up' && <TrendingUp className="mr-1 h-3 w-3" />}
            {trend === 'down' && <TrendingDown className="mr-1 h-3 w-3" />}
            {trend === 'neutral' && <Minus className="mr-1 h-3 w-3" />}
            {change}
          </span>
        )}
      </div>

      {(subtitle || description) && (
        <p className="mt-2 text-xs text-slate-500 font-sans">
          {subtitle || description}
        </p>
      )}
    </Card>
  );
};
