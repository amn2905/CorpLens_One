import React from 'react';
import { Bell, Activity, Globe } from 'lucide-react';
import { Badge } from '../components/ui/Badge';

export const MonitoringPage: React.FC = () => {
  const alerts = [
    { id: '1', title: 'TLS Certificate Expiry Warning', entity: 'Acme Global Financial', detail: 'DigiCert RSA certificate expires in 14 days.', severity: 'medium', time: '10m ago' },
    { id: '2', title: 'Critical CVE Advisory Published', entity: 'Nexus Dynamics Defense', detail: 'CVE-2024-21626 (Container breakout) flagged on Docker daemon.', severity: 'critical', time: '1h ago' },
    { id: '3', title: 'Sanctions Watchlist Match', entity: 'Nexus Commercial Trading', detail: '84% match confidence against OFAC SDN list.', severity: 'high', time: '3h ago' },
  ];

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto bg-slate-50 text-slate-900 font-sans min-h-screen">
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-2xl font-extrabold text-slate-900 font-heading tracking-tight flex items-center gap-3">
          <Bell className="h-6 w-6 text-blue-600" />
          Continuous Real-time Monitoring & Alert Ticker
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Automated SLA monitoring, digital certificate expiration tracking, and threat feed watchers.
        </p>
      </div>

      <div className="space-y-4">
        {alerts.map(a => (
          <div key={a.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-sm text-slate-900 font-heading flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-600" />
                {a.title}
              </span>
              <Badge variant={a.severity === 'critical' ? 'critical' : a.severity === 'high' ? 'medium' : 'low'}>
                {a.severity.toUpperCase()}
              </Badge>
            </div>
            <p className="text-xs text-slate-600 font-sans">
              Entity: <strong className="text-slate-900">{a.entity}</strong> — {a.detail}
            </p>
            <span className="text-[10px] font-mono text-slate-400 block pt-1">{a.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
