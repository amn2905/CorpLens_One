import React from 'react';
import { BarChart3, TrendingDown, PieChart as PieIcon, Globe } from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export const AnalyticsDashboard: React.FC = () => {
  const trendData = [
    { month: 'Jan', avg_score: 35.2 },
    { month: 'Feb', avg_score: 34.0 },
    { month: 'Mar', avg_score: 33.1 },
    { month: 'Apr', avg_score: 31.8 },
    { month: 'May', avg_score: 30.5 },
    { month: 'Jun', avg_score: 28.5 }
  ];

  const industryData = [
    { industry: 'Finance', avg_risk: 26.5 },
    { industry: 'Defense SaaS', avg_risk: 64.2 },
    { industry: 'Biotech', avg_risk: 42.0 },
    { industry: 'Retail', avg_risk: 38.4 }
  ];

  const techDistribution = [
    { name: 'Nginx', value: 14, color: '#ffffff' },
    { name: 'React', value: 12, color: '#d4d4d8' },
    { name: 'Cloudflare WAF', value: 15, color: '#a1a1aa' },
    { name: 'WordPress', value: 5, color: '#71717a' },
    { name: 'Apache', value: 4, color: '#3f3f46' }
  ];

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="pb-4 border-b border-white/10">
        <h1 className="text-2xl font-extrabold text-white tracking-wider flex items-center gap-3">
          <BarChart3 className="h-6 w-6 text-white" />
          Enterprise Risk & OSINT Analytics Dashboard
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Sector risk benchmarking, portfolio score evolution over time, and tech distribution analytics.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Trend Chart */}
        <div className="glass-panel p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-white" />
              Portfolio Risk Score Evolution (6-Month Trend)
            </h3>
            <span className="text-[10px] text-black bg-white px-2 py-0.5 rounded font-black tracking-wider uppercase">
              -19% RISK REDUCTION
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ffffff" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#ffffff" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="month" stroke="#a1a1aa" fontSize={11} />
                <YAxis stroke="#a1a1aa" fontSize={11} domain={[0, 50]} />
                <Tooltip contentStyle={{ background: '#09090b', borderColor: '#3f3f46', borderRadius: '8px', fontSize: '11px', color: '#fff' }} />
                <Area type="monotone" dataKey="avg_score" stroke="#ffffff" strokeWidth={3} fillOpacity={1} fill="url(#riskGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Industry Risk Comparison Bar Chart */}
        <div className="glass-panel p-6 rounded-2xl space-y-4">
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-white" />
            Industry Sector Risk Score Benchmarks
          </h3>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={industryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="industry" stroke="#a1a1aa" fontSize={11} />
                <YAxis stroke="#a1a1aa" fontSize={11} />
                <Tooltip contentStyle={{ background: '#09090b', borderColor: '#3f3f46', borderRadius: '8px', fontSize: '11px', color: '#fff' }} />
                <Bar dataKey="avg_risk" fill="#e4e4e7" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tech Stack Distribution Pie */}
        <div className="glass-panel p-6 rounded-2xl space-y-4 lg:col-span-1">
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
            <PieIcon className="h-4 w-4 text-white" />
            Detected Web Technologies
          </h3>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={techDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={75}>
                  {techDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#09090b', borderColor: '#3f3f46', borderRadius: '8px', fontSize: '11px', color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap gap-2 text-xs font-mono">
            {techDistribution.map((t, idx) => (
              <span key={idx} className="flex items-center gap-1.5 bg-zinc-950 px-2 py-1 rounded border border-white/10">
                <span className="h-2 w-2 rounded-full" style={{ background: t.color }} />
                {t.name} ({t.value})
              </span>
            ))}
          </div>
        </div>

        {/* Geographic & Infrastructure Distribution */}
        <div className="glass-panel p-6 rounded-2xl space-y-4 lg:col-span-2">
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
            <Globe className="h-4 w-4 text-white" />
            Geographic & Hosting Provider Footprint
          </h3>

          <div className="grid grid-cols-2 gap-4 text-xs font-mono">
            <div className="bg-zinc-950 p-4 rounded-xl border border-white/10 space-y-2">
              <div className="text-zinc-400 font-extrabold uppercase text-[10px]">Hosting Provider Share</div>
              <div className="space-y-1.5">
                <div className="flex justify-between"><span>Cloudflare Edge</span><span className="font-bold text-white">65%</span></div>
                <div className="flex justify-between"><span>Amazon Web Services</span><span className="font-bold text-zinc-300">25%</span></div>
                <div className="flex justify-between"><span>Google Cloud</span><span className="font-bold text-zinc-400">10%</span></div>
              </div>
            </div>

            <div className="bg-zinc-950 p-4 rounded-xl border border-white/10 space-y-2">
              <div className="text-zinc-400 font-extrabold uppercase text-[10px]">Country HQ Distribution</div>
              <div className="space-y-1.5">
                <div className="flex justify-between"><span>United States</span><span className="font-bold text-white">60%</span></div>
                <div className="flex justify-between"><span>United Kingdom</span><span className="font-bold text-zinc-300">25%</span></div>
                <div className="flex justify-between"><span>Germany / EU</span><span className="font-bold text-zinc-400">15%</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
