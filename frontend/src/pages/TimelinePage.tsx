import React from 'react';
import { Clock, Globe, ShieldAlert, Cpu } from 'lucide-react';

export const TimelinePage: React.FC = () => {
  const events = [
    { date: '2026-07-27 10:15', title: 'OSINT Scan Triggered', desc: 'Acme Global Financial digital footprint baseline refreshed.', icon: Globe },
    { date: '2026-07-26 14:30', title: 'Sanctions Screening Alert', desc: 'Fuzzy match 84% on OFAC SDN for Nexus Commercial Trading.', icon: ShieldAlert },
    { date: '2026-07-25 09:00', title: 'CVE Advisory Correlated', desc: 'CVE-2024-21626 flagged on Docker host stack for Nexus Dynamics.', icon: Cpu },
  ];

  return (
    <div className="space-y-6 font-sans">
      {/* Header Banner */}
      <div className="clay-panel p-6 bg-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold text-[#1E293B] font-heading tracking-tight flex items-center gap-3">
              <Clock className="h-6 w-6 text-[#3B82F6]" />
              Chronological OSINT Telemetry Timeline
            </h1>
            <span className="text-xs font-mono font-bold bg-[#EEF6FF] text-[#3B82F6] border border-[#DCE7F5] px-3 py-1 rounded-full">
              Audit Stream Active
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
            Historical sequence of scan events, threat telemetry alerts, and analyst case updates.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {events.map((e, idx) => {
          const Icon = e.icon;
          return (
            <div key={idx} className="clay-card p-5 flex items-start gap-4">
              <div className="p-2.5 rounded-[12px] bg-[#EEF6FF] border border-[#DCE7F5] text-[#3B82F6] shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h4 className="font-extrabold text-sm text-[#1E293B] font-heading">{e.title}</h4>
                  <span className="text-[10px] font-mono text-[#94A3B8]">{e.date}</span>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed">{e.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
