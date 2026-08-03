import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export interface TrendDataPoint {
  date: string;
  avgRiskScore: number;
  criticalCVEs: number;
  monitoredEntities: number;
}

const DEFAULT_TREND_DATA: TrendDataPoint[] = [
  { date: 'Jul 01', avgRiskScore: 3.2, criticalCVEs: 12, monitoredEntities: 45 },
  { date: 'Jul 05', avgRiskScore: 3.8, criticalCVEs: 15, monitoredEntities: 48 },
  { date: 'Jul 10', avgRiskScore: 4.1, criticalCVEs: 21, monitoredEntities: 50 },
  { date: 'Jul 15', avgRiskScore: 3.6, criticalCVEs: 18, monitoredEntities: 52 },
  { date: 'Jul 20', avgRiskScore: 4.8, criticalCVEs: 29, monitoredEntities: 55 },
  { date: 'Jul 25', avgRiskScore: 4.2, criticalCVEs: 24, monitoredEntities: 58 },
  { date: 'Jul 27', avgRiskScore: 3.9, criticalCVEs: 20, monitoredEntities: 60 },
];

export interface TrendChartProps {
  data?: TrendDataPoint[];
  title?: string;
  subtitle?: string;
  height?: number;
}

export const TrendChart: React.FC<TrendChartProps> = ({
  data = DEFAULT_TREND_DATA,
  title = 'Risk Aggregation Trend',
  subtitle = 'Daily portfolio-wide risk coefficient fluctuations',
  height = 240,
}) => {
  return (
    <div className="w-full">
      {title && (
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-sm font-extrabold text-[#1E293B] font-heading tracking-wide">
              {title}
            </h4>
            {subtitle && <p className="text-xs text-[#64748B]">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-[#3B82F6] font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
              Portfolio Score
            </span>
            <span className="flex items-center gap-1.5 text-rose-600 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              High-Risk Incidents
            </span>
          </div>
        </div>
      )}

      <div style={{ width: '100%', height }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="riskColorLight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="cveColorLight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.20} />
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#EEF6FF" vertical={false} />

            <XAxis
              dataKey="date"
              stroke="#94A3B8"
              fontSize={11}
              fontFamily="JetBrains Mono"
              tickLine={false}
              axisLine={{ stroke: '#DCE7F5' }}
            />

            <YAxis
              stroke="#94A3B8"
              fontSize={11}
              fontFamily="JetBrains Mono"
              tickLine={false}
              axisLine={false}
              domain={[0, 10]}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                borderColor: '#DCE7F5',
                borderRadius: '14px',
                color: '#1E293B',
                fontSize: '12px',
                boxShadow: '0 6px 18px rgba(120, 160, 210, 0.15)',
              }}
            />

            <Area
              type="monotone"
              dataKey="avgRiskScore"
              name="Portfolio Risk Score"
              stroke="#3B82F6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#riskColorLight)"
            />

            <Area
              type="monotone"
              dataKey="criticalCVEs"
              name="Critical Vulnerabilities"
              stroke="#EF4444"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#cveColorLight)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
