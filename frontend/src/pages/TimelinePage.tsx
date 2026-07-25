import React from 'react';
import { Clock, ShieldAlert, FileText, Globe, Newspaper } from 'lucide-react';

export const TimelinePage: React.FC = () => {
  const events = [
    {
      date: '2026-06-15',
      type: 'News',
      title: 'Corporate Series C $50M Expansion Announced',
      severity: 'LOW',
      icon: Newspaper,
      desc: 'Public press release announcing European regulatory compliance expansion.'
    },
    {
      date: '2026-04-10',
      type: 'SSL Certificate',
      title: 'DigiCert TLS RSA CA Certificate Issued',
      severity: 'INFO',
      icon: Globe,
      desc: 'Public CT log entry (RFC 6962) confirmed new valid TLS certificate.'
    },
    {
      date: '2024-01-31',
      type: 'Vulnerability',
      title: 'NVD Disclosed CVE-2024-21626 (Critical)',
      severity: 'HIGH',
      icon: ShieldAlert,
      desc: 'Containerd process cwd file descriptor leak published on NIST NVD catalog.'
    },
    {
      date: '2023-10-10',
      type: 'Vulnerability',
      title: 'CVE-2023-38606 HTTP/2 Rapid Reset Correlated',
      severity: 'MEDIUM',
      icon: ShieldAlert,
      desc: 'Correlated against public Nginx 1.24.0 web server header.'
    }
  ];

  return (
    <div className="p-8 space-y-8 max-w-5xl mx-auto">
      <div className="pb-4 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
          <Clock className="h-6 w-6 text-blue-400" />
          OSINT Investigation Timeline Engine
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Chronological timeline of public events, CT cert issuances, CVE disclosures, and leadership announcements.
        </p>
      </div>

      <div className="relative border-l-2 border-slate-800 ml-4 pl-6 space-y-8">
        {events.map((evt, idx) => {
          const Icon = evt.icon;
          return (
            <div key={idx} className="relative group">
              <div className="absolute -left-[33px] top-1.5 h-4 w-4 rounded-full bg-slate-900 border-2 border-blue-500 flex items-center justify-center">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              </div>

              <div className="glass-panel p-5 rounded-xl border border-slate-800 space-y-2 group-hover:border-blue-500/30 transition-all">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-blue-400 font-semibold">{evt.date}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    evt.severity === 'HIGH' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30' :
                    evt.severity === 'MEDIUM' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' :
                    'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  }`}>
                    {evt.type}
                  </span>
                </div>
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <Icon className="h-4 w-4 text-slate-400" />
                  {evt.title}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{evt.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
