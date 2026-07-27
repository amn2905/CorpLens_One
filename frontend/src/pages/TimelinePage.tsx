import React from 'react';
import { Clock, Globe, ShieldAlert, Cpu } from 'lucide-react';
import { Badge } from '../components/ui/Badge';

export const TimelinePage: React.FC = () => {
  const events = [
    { date: '2026-07-27 10:15', title: 'OSINT Scan Triggered', desc: 'Acme Global Financial digital footprint baseline refreshed.', icon: Globe },
    { date: '2026-07-26 14:30', title: 'Sanctions Screening Alert', desc: 'Fuzzy match 84% on OFAC SDN for Nexus Commercial Trading.', icon: ShieldAlert },
    { date: '2026-07-25 09:00', title: 'CVE Advisory Correlated', desc: 'CVE-2024-21626 flagged on Docker host stack for Nexus Dynamics.', icon: Cpu },
  ];

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto bg-slate-50 text-slate-900 font-sans min-h-screen">
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-2xl font-extrabold text-slate-900 font-heading tracking-tight flex items-center gap-3">
          <Clock className="h-6 w-6 text-blue-600" />
          Chronological OSINT Event Timeline
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Historical sequence of scan events, telemetry alerts, and analyst case updates.
        </p>
      </div>

      <div className="space-y-4">
        {events.map((e, idx) => {
          const Icon = e.icon;
          return (
            <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-start gap-4 hover:shadow-md transition-all">
              <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h4 className="font-extrabold text-sm text-slate-900 font-heading">{e.title}</h4>
                  <span className="text-[10px] font-mono text-slate-400">{e.date}</span>
                </div>
                <p className="text-xs text-slate-600 font-sans">{e.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
