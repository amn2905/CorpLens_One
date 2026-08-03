import React from 'react';
import { Bell, Activity, Globe } from 'lucide-react';

export const MonitoringPage: React.FC = () => {
  const alerts = [
    { id: '1', title: 'TLS Certificate Expiry Warning', entity: 'Acme Global Financial', detail: 'DigiCert RSA certificate expires in 14 days.', severity: 'MEDIUM', time: '10m ago' },
    { id: '2', title: 'Critical CVE Advisory Published', entity: 'Nexus Dynamics Defense', detail: 'CVE-2024-21626 (Container breakout) flagged on Docker daemon.', severity: 'CRITICAL', time: '1h ago' },
    { id: '3', title: 'Sanctions Watchlist Match', entity: 'Nexus Commercial Trading', detail: '84% match confidence against OFAC SDN list.', severity: 'HIGH', time: '3h ago' },
  ];

  return (
    <div className="space-y-6 font-sans">
      {/* Header Banner */}
      <div className="clay-panel p-6 bg-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold text-[#1E293B] font-heading tracking-tight flex items-center gap-3">
              <Bell className="h-6 w-6 text-[#3B82F6]" />
              Continuous Telemetry & Real-Time Alert Center
            </h1>
            <span className="text-xs font-mono font-bold bg-[#EEF6FF] text-[#3B82F6] border border-[#DCE7F5] px-3 py-1 rounded-full">
              Live Feed Active
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
            Automated SLA monitoring, digital certificate expiration tracking, and real-time advisory alerts.
          </p>
        </div>
      </div>

      {/* Alert Feed Cards */}
      <div className="space-y-4">
        {alerts.map(a => (
          <div key={a.id} className="clay-card p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-sm text-[#1E293B] font-heading flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#3B82F6]" />
                {a.title}
              </span>
              <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                a.severity === 'CRITICAL' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                a.severity === 'HIGH' ? 'bg-orange-50 text-orange-700 border border-orange-200' :
                'bg-amber-50 text-amber-700 border border-amber-200'
              }`}>
                {a.severity}
              </span>
            </div>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Target Entity: <strong className="text-[#1E293B]">{a.entity}</strong> — {a.detail}
            </p>
            <span className="text-[10px] font-mono text-[#94A3B8] block pt-1">{a.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
