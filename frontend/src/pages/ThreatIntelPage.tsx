import React, { useState } from 'react';
import { Rss, Search, ShieldAlert, Grid, Shield, Layers } from 'lucide-react';

export const ThreatIntelPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState('ALL');

  const mitreTactics = [
    { id: 'TA0001', name: 'Initial Access', count: 4, severity: 'CRITICAL', technique: 'T1190 Exploit Public-Facing Application' },
    { id: 'TA0002', name: 'Execution', count: 2, severity: 'HIGH', technique: 'T1059 Command Scripting' },
    { id: 'TA0003', name: 'Persistence', count: 1, severity: 'MEDIUM', technique: 'T1543 System Process' },
    { id: 'TA0004', name: 'Privilege Escalation', count: 3, severity: 'CRITICAL', technique: 'T1068 Exploitation' },
    { id: 'TA0005', name: 'Defense Evasion', count: 0, severity: 'LOW', technique: 'T1027 Obfuscated Files' },
    { id: 'TA0011', name: 'Command & Control', count: 2, severity: 'HIGH', technique: 'T1071 App Protocol' }
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
    <div className="space-y-6 font-sans">
      {/* Header Banner */}
      <div className="clay-panel p-6 bg-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold text-[#1E293B] font-heading tracking-tight flex items-center gap-3">
              <Rss className="h-6 w-6 text-[#3B82F6]" />
              Threat Intelligence & MITRE ATT&CK Matrix
            </h1>
            <span className="text-xs font-mono font-bold bg-[#EEF6FF] text-[#3B82F6] border border-[#DCE7F5] px-3 py-1 rounded-full">
              NVD Sync
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
            MITRE ATT&CK enterprise matrix mapping for correlated CVE advisories and active attack vector telemetry.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="bg-white border border-[#DCE7F5] text-[#1E293B] font-bold text-xs rounded-[14px] px-3 py-2 outline-none cursor-pointer shadow-inner"
          >
            <option value="ALL">Severity: ALL</option>
            <option value="CRITICAL">Severity: CRITICAL</option>
            <option value="HIGH">Severity: HIGH</option>
            <option value="MEDIUM">Severity: MEDIUM</option>
          </select>
        </div>
      </div>

      {/* MITRE Grid */}
      <div className="clay-card p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[#EEF6FF] pb-3">
          <h3 className="text-sm font-extrabold text-[#1E293B] uppercase tracking-wide font-heading flex items-center gap-2">
            <Grid className="w-4 h-4 text-[#3B82F6]" />
            MITRE ATT&CK Matrix Correlation
          </h3>
          <span className="text-xs font-mono font-bold text-[#64748B]">6 Tactics Flagged</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {mitreTactics.map((t) => (
            <div
              key={t.id}
              className={`p-4 rounded-[16px] border space-y-2 text-xs font-mono ${
                t.severity === 'CRITICAL' ? 'bg-rose-50 border-rose-200 text-rose-900' :
                t.severity === 'HIGH' ? 'bg-orange-50 border-orange-200 text-orange-900' :
                'bg-[#F4F9FF] border-[#DCE7F5] text-[#1E293B]'
              }`}
            >
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">{t.id}</div>
              <div className="font-extrabold text-sm font-heading">{t.name}</div>
              <div className="text-[11px] font-bold">{t.count} CVEs</div>
              <div className="text-[9px] opacity-80 truncate">{t.technique}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="clay-card p-4 flex items-center gap-3">
        <Search className="w-4 h-4 text-[#94A3B8] ml-2" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search CVE ID, technology (e.g. Nginx, Docker, XZ), or MITRE tactic..."
          className="clay-input w-full px-4 py-2 text-xs font-mono"
        />
      </div>

      {/* CVE Advisory Cards */}
      <div className="space-y-4">
        {filtered.map(cve => (
          <div key={cve.cve_id} className="clay-card p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EEF6FF] pb-3">
              <div className="flex items-center gap-3">
                <span className="font-extrabold text-base text-[#1E293B] font-mono flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-rose-600" />
                  {cve.cve_id}
                </span>
                <span className="text-xs font-mono font-bold bg-rose-50 text-rose-700 border border-rose-200 px-2.5 py-0.5 rounded-full">
                  {cve.severity} (CVSS {cve.cvss})
                </span>
              </div>
              <span className="text-xs font-mono text-[#94A3B8]">Published: {cve.published}</span>
            </div>

            <p className="text-xs text-[#1E293B] leading-relaxed">
              {cve.summary}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs font-mono">
              <div className="p-3 bg-[#F4F9FF] rounded-[14px] border border-[#DCE7F5]">
                <span className="text-[#64748B] text-[10px] uppercase font-bold block">AFFECTED TECH</span>
                <span className="font-bold text-[#1E293B]">{cve.technology}</span>
              </div>
              <div className="p-3 bg-[#F4F9FF] rounded-[14px] border border-[#DCE7F5]">
                <span className="text-[#64748B] text-[10px] uppercase font-bold block">MITRE TACTIC</span>
                <span className="font-bold text-[#3B82F6]">{cve.mitre_tactic}</span>
              </div>
              <div className="p-3 bg-[#F4F9FF] rounded-[14px] border border-[#DCE7F5]">
                <span className="text-[#64748B] text-[10px] uppercase font-bold block">IMPACTED TARGETS</span>
                <span className="font-bold text-rose-600">{cve.affected_targets.join(', ')}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
