import React from 'react';
import { Users, Building2, ShieldCheck, Award } from 'lucide-react';

export const ExecutivePage: React.FC = () => {
  const executives = [
    { name: 'Marcus Vance', title: 'Chief Executive Officer', company: 'Acme Global Financial', holdings: '12%', status: 'Clear' },
    { name: 'Sarah Chen', title: 'VP of Technology & Cloud Infrastructure', company: 'Nexus Dynamics Defense', holdings: '4%', status: 'Review Required' },
    { name: 'David Sterling', title: 'Board Director', company: 'Titan Energy Corp', holdings: '8%', status: 'Clear' },
  ];

  return (
    <div className="space-y-6 font-sans">
      {/* Header Banner */}
      <div className="clay-panel p-6 bg-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold text-[#1E293B] font-heading tracking-tight flex items-center gap-3">
              <Users className="h-6 w-6 text-[#3B82F6]" />
              Executive Leadership & Board Directory
            </h1>
            <span className="text-xs font-mono font-bold bg-[#EEF6FF] text-[#3B82F6] border border-[#DCE7F5] px-3 py-1 rounded-full">
              PEP & Sanctions Screened
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
            Board of directors tracking, beneficial ownership percentage, and Politically Exposed Persons (PEP) screening.
          </p>
        </div>
      </div>

      <div className="clay-card p-6 space-y-3">
        <div className="space-y-3">
          {executives.map((e, idx) => (
            <div key={idx} className="p-4 rounded-[16px] bg-[#F4F9FF] border border-[#DCE7F5] flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
              <div>
                <span className="font-extrabold text-sm text-[#1E293B] block font-heading">{e.name}</span>
                <span className="text-[#64748B] text-xs font-sans">{e.title} — <strong className="text-[#1E293B]">{e.company}</strong></span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[#64748B]">Equity: <strong className="text-[#1E293B]">{e.holdings}</strong></span>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                  e.status === 'Clear' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  {e.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
