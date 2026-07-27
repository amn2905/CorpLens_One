import React from 'react';
import { Users, Building2, ShieldCheck } from 'lucide-react';
import { Badge } from '../components/ui/Badge';

export const ExecutivePage: React.FC = () => {
  const executives = [
    { name: 'Marcus Vance', title: 'Chief Executive Officer', company: 'Acme Global Financial', holdings: '12%', status: 'Clear' },
    { name: 'Sarah Chen', title: 'VP of Technology & Cloud Infrastructure', company: 'Nexus Dynamics Defense', holdings: '4%', status: 'Review Required' },
    { name: 'David Sterling', title: 'Board Director', company: 'Titan Energy Corp', holdings: '8%', status: 'Clear' },
  ];

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto bg-slate-50 text-slate-900 font-sans min-h-screen">
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-2xl font-extrabold text-slate-900 font-heading tracking-tight flex items-center gap-3">
          <Users className="h-6 w-6 text-blue-600" />
          Executive Leadership & Board Connections
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Board of directors tracking, beneficial ownership, and PEP sanction screening.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
        {executives.map((e, idx) => (
          <div key={idx} className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors text-xs font-mono">
            <div>
              <span className="font-bold text-slate-900 text-sm block font-heading">{e.name}</span>
              <span className="text-slate-500 text-xs">{e.title} — <strong className="text-slate-800">{e.company}</strong></span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-slate-600">Equity: <strong className="text-slate-900">{e.holdings}</strong></span>
              <Badge variant={e.status === 'Clear' ? 'low' : 'medium'}>{e.status}</Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
