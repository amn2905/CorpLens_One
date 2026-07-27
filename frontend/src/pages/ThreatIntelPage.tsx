import React, { useState } from 'react';
import { Rss, Search, ShieldAlert, AlertTriangle, ExternalLink, Grid, Shield, Layers } from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export const ThreatIntelPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState('ALL');

  const mitreTactics = [
    { id: 'TA0001', name: 'Initial Access', count: 4, severity: 'CRITICAL', technique: 'T1190 Exploit Public-Facing Application' },
    { id: 'TA0002', name: 'Execution', count: 2, severity: 'HIGH', technique: 'T1059 Command and Scripting Interpreter' },
    { id: 'TA0003', name: 'Persistence', count: 1, severity: 'MEDIUM', technique: 'T1543 Create or Modify System Process' },
    { id: 'TA0004', name: 'Privilege Escalation', count: 3, severity: 'CRITICAL', technique: 'T1068 Exploitation for Privilege Escalation' },
    { id: 'TA0005', name: 'Defense Evasion', count: 0, severity: 'LOW', technique: 'T1027 Obfuscated Files or Information' },
    { id: 'TA0011', name: 'Command & Control', count: 2, severity: 'HIGH', technique: 'T1071 Application Layer Protocol' }
  ];

  const cveFeed = [
    {
      cve_id: 'CVE-2024-21626',
      severity: 'CRITICAL',
      cvss: 9.8,
      mitre_tactic: 'Privilege Escalation (T1068)',
      technology: 'runc / Docker Container Engine',
      summary: 'Process.cwd file descriptor leak leading to container breakout and root host privilege escalation.',
      published: '2024-01-31',
      affected_targets: ['Nexus Dynamics Defense', 'CloudScale Inc']
    },
    {
      cve_id: 'CVE-2023-38606',
      severity: 'HIGH',
      cvss: 7.5,
      mitre_tactic: 'Initial Access (T1190)',
      technology: 'Nginx Web Server 1.24.0',
      summary: 'HTTP/2 Rapid Reset DoS condition allowing attacker to cause memory exhaustion on web endpoints.',
      published: '2023-10-10',
      affected_targets: ['Acme Global Financial']
    },
    {
      cve_id: 'CVE-2024-3094',
      severity: 'CRITICAL',
      cvss: 10.0,
      mitre_tactic: 'Execution (T1059)',
      technology: 'XZ Utils 5.6.0 / liblzma',
      summary: 'Malicious backdoor in XZ Utils compression library enabling unauthorized SSH remote code execution.',
      published: '2024-03-29',
      affected_targets: ['Apex Cyber Solutions']
    }
  ];

  const filtered = cveFeed.filter(item => {
    const q = query.toLowerCase();
    const matchQuery = !q || item.cve_id.toLowerCase().includes(q) || item.technology.toLowerCase().includes(q) || item.summary.toLowerCase().includes(q);
    const matchSev = severityFilter === 'ALL' || item.severity === severityFilter;
    return matchQuery && matchSev;
  });

  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto bg-slate-50 text-slate-900 font-sans min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-heading flex items-center gap-3">
              <Rss className="h-6 w-6 text-blue-600" />
              Cyber Threat Intelligence & MITRE ATT&CK Matrix
            </h1>
            <Badge variant="cyan">NVD Real-time Sync</Badge>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            MITRE ATT&CK framework mapping for correlated CVE vulnerability advisories and threat vectors.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="bg-white border border-slate-200 text-slate-800 rounded-xl px-3 py-2 text-xs font-mono outline-none shadow-sm cursor-pointer"
          >
            <option value="ALL">Severity: ALL</option>
            <option value="CRITICAL">Severity: CRITICAL</option>
            <option value="HIGH">Severity: HIGH</option>
            <option value="MEDIUM">Severity: MEDIUM</option>
          </select>
        </div>
      </div>

      {/* MITRE ATT&CK Heatmap Grid */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide font-heading flex items-center gap-2">
            <Grid className="w-4 h-4 text-blue-600" />
            MITRE ATT&CK Enterprise Matrix Correlation
          </h3>
          <span className="text-xs font-mono text-slate-500 font-bold">6 Active Tactics Flagged</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {mitreTactics.map((t) => (
            <div
              key={t.id}
              className={`p-4 rounded-xl border space-y-2 text-xs font-mono transition-all ${
                t.severity === 'CRITICAL' ? 'bg-rose-50 border-rose-200 text-rose-900' :
                t.severity === 'HIGH' ? 'bg-amber-50 border-amber-200 text-amber-900' :
                'bg-slate-50 border-slate-200 text-slate-800'
              }`}
            >
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{t.id}</div>
              <div className="font-extrabold text-sm font-heading">{t.name}</div>
              <div className="text-[11px] font-bold">{t.count} Correlated CVEs</div>
              <div className="text-[9px] opacity-80 truncate">{t.technique}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400 ml-2" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search CVE ID, technology (e.g. Nginx, Docker, XZ), or MITRE tactic..."
          className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2 text-xs font-mono text-slate-900 outline-none focus:bg-white focus:border-blue-600 transition-all"
        />
      </div>

      {/* CVE Advisory Grid */}
      <div className="space-y-4">
        {filtered.map(cve => (
          <div key={cve.cve_id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <span className="font-extrabold text-base text-slate-900 font-mono flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-rose-600" />
                  {cve.cve_id}
                </span>
                <Badge variant={cve.severity === 'CRITICAL' ? 'critical' : 'high'}>
                  {cve.severity} (CVSS {cve.cvss})
                </Badge>
              </div>
              <span className="text-xs font-mono text-slate-400">Published: {cve.published}</span>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed font-sans">
              {cve.summary}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs font-mono">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 text-[10px] block">AFFECTED TECHNOLOGY</span>
                <span className="font-bold text-slate-900">{cve.technology}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 text-[10px] block">MITRE ATT&CK TACTIC</span>
                <span className="font-bold text-blue-600">{cve.mitre_tactic}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 text-[10px] block">IMPACTED MONITORED ENTITIES</span>
                <span className="font-bold text-rose-600">{cve.affected_targets.join(', ')}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
