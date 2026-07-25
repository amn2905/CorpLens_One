import React, { useState } from 'react';
import { Bell, ShieldAlert, CheckCircle2, RefreshCw, Send, X, FolderOpen, Info, Zap, Wifi, Lock, AlertTriangle } from 'lucide-react';

interface Alert {
  id: string;
  domain: string;
  company: string;
  type: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'INFO';
  desc: string;
  time: string;
  dismissed: boolean;
  track: 'CVE' | 'DNS' | 'SSL' | 'Tech';
}

const ALERTS: Alert[] = [
  { id: 'a501', domain: 'nexusdynamics.io', company: 'Nexus Dynamics', type: 'CVE Disclosure', severity: 'CRITICAL', desc: 'CVE-2024-21626 (runc container breakout, CVSS 9.8) — ACTIVELY EXPLOITED in wild. Emergency patch required.', time: '12 mins ago', dismissed: false, track: 'CVE' },
  { id: 'a502', domain: 'nexusdynamics.io', company: 'Nexus Dynamics', type: 'Technology Drift', severity: 'HIGH', desc: 'WordPress 6.1.1 detected (outdated). WordPress 6.4.2 is the current stable release. XSS vulnerability CVE-2023-5567 applies.', time: '45 mins ago', dismissed: false, track: 'Tech' },
  { id: 'a503', domain: 'acmeglobal.com', company: 'Acme Global', type: 'SSL Certificate Renewal', severity: 'INFO', desc: 'TLS certificate renewed via DigiCert RSA SHA256. Valid until Nov 2026. New fingerprint recorded.', time: '2 hours ago', dismissed: false, track: 'SSL' },
  { id: 'a504', domain: 'acmeglobal.com', company: 'Acme Global', type: 'DNS Record Change', severity: 'MEDIUM', desc: 'MX record updated: new mail relay added (mail3.acmeglobal.com → Google Workspace). SPF/DKIM config verified.', time: '6 hours ago', dismissed: false, track: 'DNS' },
  { id: 'a505', domain: 'nexusdynamics.io', company: 'Nexus Dynamics', type: 'DNS Record Change', severity: 'HIGH', desc: 'New subdomain detected: api-dev.nexusdynamics.io — Unprotected endpoint, no WAF, direct IP exposure. Investigate immediately.', time: '1 day ago', dismissed: false, track: 'DNS' },
  { id: 'a506', domain: 'acmeglobal.com', company: 'Acme Global', type: 'Technology Drift', severity: 'INFO', desc: 'Nginx version updated from 1.24.0 to 1.25.3. CVE-2023-38606 patch now applied. Risk score updated.', time: '2 days ago', dismissed: false, track: 'Tech' },
];

const SEVERITY_STYLES: Record<string, string> = {
  CRITICAL: 'bg-white text-black border-white',
  HIGH: 'bg-zinc-800 text-white border-zinc-500',
  MEDIUM: 'bg-zinc-900 text-zinc-300 border-zinc-600',
  INFO: 'bg-zinc-950 text-zinc-500 border-zinc-800'
};

const TRACK_ICONS: Record<string, React.ReactNode> = {
  CVE: <ShieldAlert className="h-3.5 w-3.5" />,
  DNS: <Wifi className="h-3.5 w-3.5" />,
  SSL: <Lock className="h-3.5 w-3.5" />,
  Tech: <Zap className="h-3.5 w-3.5" />,
};

export const MonitoringPage: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>(ALERTS);
  const [filterSeverity, setFilterSeverity] = useState<string>('All');
  const [filterTrack, setFilterTrack] = useState<string>('All');

  const dismiss = (id: string) => setAlerts(prev => prev.map(a => a.id === id ? { ...a, dismissed: true } : a));

  const visible = alerts
    .filter(a => !a.dismissed)
    .filter(a => filterSeverity === 'All' || a.severity === filterSeverity)
    .filter(a => filterTrack === 'All' || a.track === filterTrack);

  const critical = alerts.filter(a => a.severity === 'CRITICAL' && !a.dismissed).length;
  const high = alerts.filter(a => a.severity === 'HIGH' && !a.dismissed).length;

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-wider flex items-center gap-3">
            <Bell className="h-6 w-6 text-white" />
            Continuous OSINT Monitoring Center
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Real-time drift monitoring across DNS, SSL certs, technology stack, and CVE feeds
          </p>
        </div>
        <button className="glass-btn-primary px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2">
          <RefreshCw className="h-4 w-4 stroke-[3]" /> Run Scan
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Alerts', value: alerts.filter(a => !a.dismissed).length, icon: Bell },
          { label: 'Critical', value: critical, icon: ShieldAlert },
          { label: 'High', value: high, icon: AlertTriangle },
          { label: 'Domains Tracked', value: 2, icon: Wifi },
        ].map(stat => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="glass-panel p-4 rounded-xl border border-white/10">
              <div className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest">{stat.label}</div>
              <div className="text-3xl font-extrabold text-white font-mono mt-1">{stat.value}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alert Feed */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center gap-3 mb-2">
            <div className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
              <ShieldAlert className="h-3.5 w-3.5" /> Live Alert Feed
            </div>
            <select value={filterSeverity} onChange={e => setFilterSeverity(e.target.value)} className="glass-input px-2 py-1 rounded text-[10px] font-bold ml-auto">
              {['All', 'CRITICAL', 'HIGH', 'MEDIUM', 'INFO'].map(s => <option key={s} value={s} className="bg-black">{s}</option>)}
            </select>
            <select value={filterTrack} onChange={e => setFilterTrack(e.target.value)} className="glass-input px-2 py-1 rounded text-[10px] font-bold">
              {['All', 'CVE', 'DNS', 'SSL', 'Tech'].map(s => <option key={s} value={s} className="bg-black">{s}</option>)}
            </select>
          </div>

          {visible.length === 0 && (
            <div className="glass-panel p-8 rounded-xl border border-white/10 text-center text-zinc-500 text-xs">
              No active alerts matching filters
            </div>
          )}

          {visible.map(alert => (
            <div key={alert.id} className="glass-card p-4 rounded-xl border border-white/10">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className={`h-8 w-8 rounded-lg border flex items-center justify-center shrink-0 ${SEVERITY_STYLES[alert.severity]}`}>
                    {TRACK_ICONS[alert.track]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs font-mono font-black text-white">{alert.domain}</span>
                      <span className={`text-[9px] px-2 py-0.5 rounded font-black uppercase border ${SEVERITY_STYLES[alert.severity]}`}>{alert.severity}</span>
                      <span className="text-[9px] font-mono text-zinc-500">{alert.type}</span>
                    </div>
                    <p className="text-xs text-zinc-200 leading-relaxed">{alert.desc}</p>
                    <div className="text-[10px] text-zinc-500 font-mono mt-1">{alert.time}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => dismiss(alert.id)}
                    className="text-[9px] font-bold text-zinc-500 hover:text-white px-2 py-1 rounded border border-zinc-800 hover:border-white/30 transition-all uppercase tracking-wide"
                  >
                    Dismiss
                  </button>
                  <button className="text-[9px] font-bold text-black bg-white px-2 py-1 rounded uppercase tracking-wide hover:bg-zinc-200 transition-all">
                    Investigate
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Panel */}
        <div className="space-y-4">
          {/* Monitoring Tracks */}
          <div className="glass-panel p-5 rounded-xl border border-white/10 space-y-3">
            <div className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest">Monitoring Tracks</div>
            {[
              { label: 'CVE Disclosures', desc: 'NIST NVD + CISA KEV', active: true, count: 2, icon: ShieldAlert },
              { label: 'SSL Certificates', desc: 'CT Log Monitoring', active: true, count: 1, icon: Lock },
              { label: 'DNS Records', desc: 'A / MX / CNAME / TXT', active: true, count: 2, icon: Wifi },
              { label: 'Tech Stack Drift', desc: 'Wappalyzer Fingerprint', active: true, count: 2, icon: Zap },
            ].map(track => {
              const Icon = track.icon;
              return (
                <div key={track.label} className="flex items-center justify-between text-xs bg-zinc-950 p-3 rounded-xl border border-white/10">
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-3.5 w-3.5 text-zinc-300" />
                    <div>
                      <div className="font-bold text-white text-xs">{track.label}</div>
                      <div className="text-[9px] text-zinc-500">{track.desc}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono text-zinc-400">{track.count} alerts</span>
                    <span className="text-emerald-400 text-[9px] font-black">Active</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Outbound Channels */}
          <div className="glass-panel p-5 rounded-xl border border-white/10 space-y-3">
            <div className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
              <Send className="h-3.5 w-3.5" /> Outbound Channels
            </div>
            {[
              { name: 'Slack Webhook', target: '#security-alerts', status: 'Active' },
              { name: 'Microsoft Teams', target: 'TPRM Risk Channel', status: 'Active' },
              { name: 'Email Digest', target: 'analyst@corplens.ai', status: 'Active' },
              { name: 'Splunk SIEM', target: 'HTTP Event Collector', status: 'Active' },
            ].map(ch => (
              <div key={ch.name} className="flex items-center justify-between bg-zinc-950 p-3 rounded-xl border border-white/10 text-xs">
                <div>
                  <div className="font-bold text-white">{ch.name}</div>
                  <div className="text-[9px] text-zinc-500 font-mono">{ch.target}</div>
                </div>
                <span className="text-[9px] font-black text-white bg-white/10 px-2 py-0.5 rounded border border-white/20">Active</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
