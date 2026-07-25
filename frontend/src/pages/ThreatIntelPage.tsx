import React, { useState } from 'react';
import { ShieldAlert, Rss, AlertTriangle, CheckCircle2, Clock, ExternalLink, Filter } from 'lucide-react';

interface ThreatItem {
  id: string;
  cve_id: string;
  title: string;
  cvss_score: number;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  affected_tech: string;
  affected_vendors: string[];
  description: string;
  published_date: string;
  source: string;
  kev_listed: boolean;
  remediation: string;
}

const THREAT_FEED: ThreatItem[] = [
  {
    id: 't1', cve_id: 'CVE-2024-21626', title: 'runc Container Breakout — Process CWD File Descriptor Leak',
    cvss_score: 9.8, severity: 'CRITICAL', affected_tech: 'runc / containerd runtime',
    affected_vendors: ['Nexus Dynamics Defense Solutions (nexusdynamics.io)'],
    description: 'Critical privilege escalation vulnerability in runc container runtime. Allows container breakout via file descriptor leak in process working directory. Actively exploited in wild.',
    published_date: '2024-02-01', source: 'NIST NVD / CISA KEV',
    kev_listed: true, remediation: 'Upgrade runc to v1.1.12 or later. Rebuild all container images.'
  },
  {
    id: 't2', cve_id: 'CVE-2023-5567', title: 'WordPress Gutenberg XSS via Block Content Injection',
    cvss_score: 8.1, severity: 'HIGH', affected_tech: 'WordPress 6.1.x / Gutenberg Plugin',
    affected_vendors: ['Nexus Dynamics Defense Solutions (nexusdynamics.io)'],
    description: 'Cross-site scripting vulnerability in WordPress Gutenberg block editor. Allows authenticated users to inject malicious scripts that execute in the context of admin sessions.',
    published_date: '2023-11-15', source: 'NIST NVD / WPScan',
    kev_listed: false, remediation: 'Upgrade WordPress to 6.4 or later. Apply automatic security updates.'
  },
  {
    id: 't3', cve_id: 'CVE-2023-38606', title: 'Nginx HTTP/2 Rapid Reset DDoS Amplification',
    cvss_score: 5.3, severity: 'MEDIUM', affected_tech: 'Nginx 1.24.0 / HTTP/2',
    affected_vendors: ['Acme Global Financial Group (acmeglobal.com) — WAF Mitigated ✓'],
    description: 'HTTP/2 Rapid Reset attack enables amplified DDoS via multiple RST_STREAM frames. Affects Nginx 1.24.0 and prior. Note: Acme Global\'s Cloudflare WAF has deployed L7 mitigations — risk effectively mitigated.',
    published_date: '2023-10-10', source: 'NIST NVD / Google Threat Analysis',
    kev_listed: false, remediation: 'Apply WAF L7 rate limiting rules (deployed). Upgrade Nginx to 1.25.3.'
  },
  {
    id: 't4', cve_id: 'CVE-2024-3094', title: 'XZ Utils Supply Chain Backdoor (CVE-2024-3094)',
    cvss_score: 10.0, severity: 'CRITICAL', affected_tech: 'xz-utils 5.6.0–5.6.1 (liblzma)',
    affected_vendors: [],
    description: 'State-sponsored supply chain compromise in xz-utils liblzma library. Backdoor allows unauthorized SSH authentication bypass on affected Linux distributions. Tracked as nation-state attack.',
    published_date: '2024-03-29', source: 'NIST NVD / CISA KEV / US-CERT',
    kev_listed: true, remediation: 'Downgrade xz-utils to 5.4.x. Audit all Linux package mirrors. No tracked entities confirmed affected.'
  },
  {
    id: 't5', cve_id: 'CVE-2023-44487', title: 'HTTP/2 Rapid Reset Attack — Protocol-Level Amplification',
    cvss_score: 7.5, severity: 'HIGH', affected_tech: 'HTTP/2 Protocol Implementations (Apache, Nginx, Go)',
    affected_vendors: [],
    description: 'Protocol-level DDoS amplification affecting all HTTP/2 server implementations. Affects Apache 2.4.55, Go net/http, and Nginx. Cloudflare deployed zero-day mitigation at edge.',
    published_date: '2023-10-10', source: 'NIST NVD / Cloudflare Research',
    kev_listed: false, remediation: 'Apply vendor-specific patches. Enable HTTP/2 stream limits. Deploy WAF rate limiting.'
  }
];

const SEVERITY_STYLES: Record<string, string> = {
  CRITICAL: 'bg-white text-black border-white',
  HIGH: 'bg-zinc-800 text-white border-zinc-500',
  MEDIUM: 'bg-zinc-900 text-zinc-200 border-zinc-600',
  LOW: 'bg-zinc-950 text-zinc-500 border-zinc-800'
};

export const ThreatIntelPage: React.FC = () => {
  const [selectedThreat, setSelectedThreat] = useState<ThreatItem | null>(null);
  const [filterSeverity, setFilterSeverity] = useState<string>('All');

  const filtered = filterSeverity === 'All' ? THREAT_FEED : THREAT_FEED.filter(t => t.severity === filterSeverity);
  const affectsTracked = THREAT_FEED.filter(t => t.affected_vendors.length > 0).length;

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-wider flex items-center gap-3">
            <ShieldAlert className="h-6 w-6 text-white" />
            Threat Intelligence Center
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Public CVE advisories, CISA KEV bulletins, and portfolio correlation
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={filterSeverity}
            onChange={e => setFilterSeverity(e.target.value)}
            className="glass-input px-3 py-2 rounded-lg text-xs font-bold"
          >
            {['All', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map(s => (
              <option key={s} value={s} className="bg-black">{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Advisories', value: THREAT_FEED.length },
          { label: 'CRITICAL / HIGH', value: THREAT_FEED.filter(t => ['CRITICAL', 'HIGH'].includes(t.severity)).length },
          { label: 'CISA KEV Listed', value: THREAT_FEED.filter(t => t.kev_listed).length },
          { label: 'Affecting Portfolio', value: affectsTracked },
        ].map(stat => (
          <div key={stat.label} className="glass-panel p-4 rounded-xl border border-white/10">
            <div className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest">{stat.label}</div>
            <div className="text-2xl font-extrabold text-white font-mono mt-1">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Main Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* CVE Feed List */}
        <div className="lg:col-span-2 space-y-3">
          <div className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest flex items-center gap-2 mb-1">
            <Rss className="h-3.5 w-3.5" /> Public CVE Advisory Feed
          </div>
          {filtered.map(threat => (
            <div
              key={threat.id}
              onClick={() => setSelectedThreat(threat)}
              className={`glass-card p-4 rounded-xl border cursor-pointer transition-all ${
                selectedThreat?.id === threat.id ? 'border-white/40' : 'border-white/10 hover:border-white/25'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-black text-white">{threat.cve_id}</span>
                <div className="flex items-center gap-1.5">
                  {threat.kev_listed && (
                    <span className="text-[8px] font-black bg-white text-black px-1.5 py-0.5 rounded uppercase">KEV</span>
                  )}
                  <span className={`text-[9px] px-2 py-0.5 rounded font-black uppercase border ${SEVERITY_STYLES[threat.severity]}`}>
                    {threat.severity}
                  </span>
                </div>
              </div>
              <div className="text-xs font-bold text-zinc-200 leading-tight mb-1">{threat.title}</div>
              <div className="text-[10px] text-zinc-500 font-mono">CVSS {threat.cvss_score} • {threat.affected_tech}</div>
              {threat.affected_vendors.length > 0 && (
                <div className="mt-2 text-[9px] font-bold text-white bg-white/10 px-2 py-1 rounded">
                  ⚠️ Affects {threat.affected_vendors.length} tracked vendor(s)
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Detail Pane */}
        <div className="lg:col-span-3">
          {selectedThreat ? (
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-5 sticky top-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-mono font-black text-white">{selectedThreat.cve_id}</span>
                    <span className={`text-[9px] px-2 py-0.5 rounded font-black uppercase border ${SEVERITY_STYLES[selectedThreat.severity]}`}>
                      {selectedThreat.severity}
                    </span>
                    {selectedThreat.kev_listed && (
                      <span className="text-[9px] font-black bg-white text-black px-2 py-0.5 rounded uppercase">CISA KEV</span>
                    )}
                  </div>
                  <h2 className="font-extrabold text-white text-sm leading-tight">{selectedThreat.title}</h2>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-2xl font-extrabold text-white font-mono">{selectedThreat.cvss_score}</div>
                  <div className="text-[9px] text-zinc-500">CVSS Score</div>
                </div>
              </div>

              <div>
                <div className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest mb-1">Affected Technology</div>
                <div className="text-xs font-mono text-zinc-200 bg-zinc-950 px-3 py-2 rounded-lg border border-white/10">{selectedThreat.affected_tech}</div>
              </div>

              <div>
                <div className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest mb-1">Technical Description</div>
                <p className="text-xs text-zinc-200 leading-relaxed">{selectedThreat.description}</p>
              </div>

              {selectedThreat.affected_vendors.length > 0 && (
                <div>
                  <div className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <AlertTriangle className="h-3.5 w-3.5" /> Portfolio Impact
                  </div>
                  {selectedThreat.affected_vendors.map((v, i) => (
                    <div key={i} className="bg-white text-black text-xs font-bold px-3 py-2 rounded-lg">{v}</div>
                  ))}
                </div>
              )}

              <div>
                <div className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Remediation
                </div>
                <p className="text-xs text-zinc-200 leading-relaxed bg-zinc-950 p-3 rounded-lg border border-white/10">{selectedThreat.remediation}</p>
              </div>

              <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono border-t border-white/10 pt-3">
                <span>Published: {selectedThreat.published_date}</span>
                <span>Source: {selectedThreat.source}</span>
              </div>
            </div>
          ) : (
            <div className="glass-panel p-12 rounded-2xl border border-white/10 flex items-center justify-center text-zinc-500 text-xs">
              Select a CVE advisory to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
