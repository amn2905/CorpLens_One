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
    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-sm font-bold text-slate-900 font-heading tracking-wide">
            {title}
          </h4>
          <p className="text-xs text-slate-500">{subtitle}</p>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="flex items-center gap-1.5 text-blue-600 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
            Portfolio Score
          </span>
          <span className="flex items-center gap-1.5 text-rose-600 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
            High-Risk Incidents
          </span>
        </div>
      </div>

      <div style={{ width: '100%', height }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="riskColorLight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="cveColorLight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#DC2626" stopOpacity={0.20} />
                <stop offset="95%" stopColor="#DC2626" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />

            <XAxis
              dataKey="date"
              stroke="#94a3b8"
              fontSize={11}
              fontFamily="JetBrains Mono"
              tickLine={false}
              axisLine={{ stroke: '#e2e8f0' }}
            />

            <YAxis
              stroke="#94a3b8"
              fontSize={11}
              fontFamily="JetBrains Mono"
              tickLine={false}
              axisLine={false}
              domain={[0, 10]}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                borderColor: '#cbd5e1',
                borderRadius: '8px',
                color: '#0f172a',
                fontSize: '12px',
                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
              }}
            />

            <Area
              type="monotone"
              dataKey="avgRiskScore"
              name="Portfolio Risk Score"
              stroke="#2563EB"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#riskColorLight)"
            />

            <Area
              type="monotone"
              dataKey="criticalCVEs"
              name="Critical Vulnerabilities"
              stroke="#DC2626"
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
