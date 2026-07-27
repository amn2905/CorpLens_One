import React from 'react';
import { BarChart3 } from 'lucide-react';
import { KPICard } from '../components/ui/KPICard';
import { TrendChart } from '../components/ui/TrendChart';

export const AnalyticsDashboard: React.FC = () => {
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto bg-slate-50 text-slate-900 font-sans min-h-screen">
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-2xl font-extrabold text-slate-900 font-heading tracking-tight flex items-center gap-3">
          <BarChart3 className="h-6 w-6 text-blue-600" />
          Enterprise Risk Analytics & Trends
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Historical risk distribution, pillar breakdown, and cross-portfolio vulnerability metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <KPICard title="PORTFOLIO COMPOSITE SCORE" value="3.9 / 10.0" change="-0.2 pts" trend="down" />
        <KPICard title="CVE VULNERABILITY COUNT" value="14 Advisories" change="3 Critical" trend="up" />
        <KPICard title="SANCTIONS SCREENING SCORE" value="0.98 Confidence" change="100% Attested" trend="neutral" />
      </div>

      <TrendChart title="30-Day Cross-Portfolio Risk Evolution" height={320} />
    </div>
  );
};
