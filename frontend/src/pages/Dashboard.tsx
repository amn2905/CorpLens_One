import React, { useState } from 'react';
import { 
  Building2, 
  ShieldAlert, 
  FolderOpen, 
  ShieldCheck, 
  ArrowUpRight, 
  ExternalLink,
  Activity,
  Search,
  Flame,
  Download,
  Bell,
  CheckCircle2,
  Lock,
  Layers,
  Rss,
  TrendingUp,
  Briefcase
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockCompanies, api } from '../services/api';
import { TrendChart } from '../components/ui/TrendChart';
import { RiskHeatmap } from '../components/ui/RiskHeatmap';
import { RiskBadge } from '../components/RiskBadge';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [filterQuery, setFilterQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState('ALL');

  const filteredCompanies = mockCompanies.filter((c) => {
    const q = filterQuery.toLowerCase();
    const matchQuery = !q || c.name.toLowerCase().includes(q) || c.primary_domain.toLowerCase().includes(q);
    const matchTier = selectedTier === 'ALL' || c.risk_tier.toUpperCase() === selectedTier;
    return matchQuery && matchTier;
  });

  const recentAlerts = [
    {
      id: 'alt-1',
      title: 'CRITICAL CVE FLAGGED',
      entity: 'Nexus Dynamics Defense',
      detail: 'CVE-2024-21626 (Container breakout) mapped on Docker host stack.',
      severity: 'CRITICAL',
      time: '12m ago'
    },
    {
      id: 'alt-2',
      title: 'SANCTIONS WATCHLIST MATCH',
      entity: 'Nexus Commercial Trading',
      detail: 'Fuzzy string match (84% confidence) against US OFAC SDN List.',
      severity: 'HIGH',
      time: '1h ago'
    },
    {
      id: 'alt-3',
      title: 'TLS CERTIFICATE RENEWED',
      entity: 'Acme Global Financial Group',
      detail: 'DigiCert RSA SHA256 certificate issued for *.acmeglobal.com.',
      severity: 'LOW',
      time: '3h ago'
    }
  ];

  return (
    <div className="space-y-6 font-sans">
      {/* ─────────────────────────────────────────────────────────────
          1. EXECUTIVE HERO BANNER & QUICK ACTIONS
      ───────────────────────────────────────────────────────────── */}
      <div className="clay-panel p-6 bg-white flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-extrabold text-[#1E293B] tracking-tight font-heading">
              Executive Intelligence Overview
            </h1>
            <span className="text-xs bg-[#EEF6FF] text-[#3B82F6] border border-[#DCE7F5] px-3 py-1 rounded-full font-mono font-bold uppercase tracking-wider">
              v1.0.0 Enterprise OS
            </span>
            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> ISO/IEC 27037 Attested
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-2 leading-relaxed">
            Continuous 7-pillar OSINT telemetry ingestion across SEC filings, Certificate Transparency, NIST vulnerabilities, and global sanction registries.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => {
              const url = api.getReportDownloadUrl('cmp-001', 'pdf');
              api.downloadFile(url, 'CorpLens_One_Portfolio_Executive_Brief.pdf');
            }}
            className="clay-button-secondary px-4 py-2.5 text-xs flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-[#3B82F6]" />
            Export Executive Brief (PDF)
          </button>

          <button
            onClick={() => navigate('/cases')}
            className="clay-button-secondary px-4 py-2.5 text-xs flex items-center gap-2"
          >
            <FolderOpen className="w-4 h-4 text-[#3B82F6]" />
            Investigation Board
          </button>

          <button
            onClick={() => navigate('/ai-assistant')}
            className="clay-button-primary px-5 py-2.5 text-xs flex items-center gap-2"
          >
            <Activity className="w-4 h-4" />
            Launch CorpLens AI
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. TOP EXECUTIVE KPI CARDS (FINANCE / GRC SAAS STYLE)
      ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* KPI 1 */}
        <div className="clay-card p-5 space-y-3">
          <div className="flex items-center justify-between text-[#64748B] text-xs font-bold font-heading">
            <span>Monitored Entities</span>
            <div className="w-8 h-8 rounded-full bg-[#EEF6FF] text-[#3B82F6] flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-[#1E293B]">14 Targets</div>
            <div className="text-xs text-[#22C55E] font-bold flex items-center gap-1 mt-0.5">
              <TrendingUp className="w-3.5 h-3.5" /> +2 Added this week
            </div>
          </div>
          <div className="text-[11px] text-[#94A3B8] font-mono border-t border-[#EEF6FF] pt-2">
            Continuous Passive Telemetry Active
          </div>
        </div>

        {/* KPI 2 */}
        <div className="clay-card p-5 space-y-3">
          <div className="flex items-center justify-between text-[#64748B] text-xs font-bold font-heading">
            <span>Vulnerability SLA</span>
            <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-[#1E293B]">3 High Risk</div>
            <div className="text-xs text-rose-600 font-bold flex items-center gap-1 mt-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" /> Action Required (CVE-2024-21626)
            </div>
          </div>
          <div className="text-[11px] text-[#94A3B8] font-mono border-t border-[#EEF6FF] pt-2">
            NIST NVD Advisory Index Synced
          </div>
        </div>

        {/* KPI 3 */}
        <div className="clay-card p-5 space-y-3">
          <div className="flex items-center justify-between text-[#64748B] text-xs font-bold font-heading">
            <span>Open Investigations</span>
            <div className="w-8 h-8 rounded-full bg-[#EEF6FF] text-[#3B82F6] flex items-center justify-center">
              <FolderOpen className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-[#1E293B]">8 Active Cases</div>
            <div className="text-xs text-[#3B82F6] font-bold flex items-center gap-1 mt-0.5">
              3 Cases in Peer Review
            </div>
          </div>
          <div className="text-[11px] text-[#94A3B8] font-mono border-t border-[#EEF6FF] pt-2">
            Kanban Lifecycle Board Operational
          </div>
        </div>

        {/* KPI 4 */}
        <div className="clay-card p-5 space-y-3">
          <div className="flex items-center justify-between text-[#64748B] text-xs font-bold font-heading">
            <span>Sanctions & Compliance</span>
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-[#1E293B]">99.4% Pass Rate</div>
            <div className="text-xs text-emerald-600 font-bold flex items-center gap-1 mt-0.5">
              OFAC / UN / EU Clean
            </div>
          </div>
          <div className="text-[11px] text-[#94A3B8] font-mono border-t border-[#EEF6FF] pt-2">
            Fuzzy Name Screening Active
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. 3-COLUMN ANALYTICS & LIVE ALERTS HUB
      ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trend Area Chart (2 Cols) */}
        <div className="lg:col-span-2 clay-card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#EEF6FF] pb-3">
            <div>
              <h3 className="text-sm font-extrabold text-[#1E293B] uppercase tracking-wide font-heading">
                30-Day Composite Risk Trend
              </h3>
              <p className="text-xs text-[#64748B]">Average risk score movement across monitored target portfolios.</p>
            </div>
            <span className="text-[10px] font-mono font-bold bg-[#EEF6FF] text-[#3B82F6] border border-[#DCE7F5] px-2.5 py-1 rounded-full">
              P95 Latency: 42ms
            </span>
          </div>
          <TrendChart title="" height={280} />
        </div>

        {/* Real-time Alert Ticker Column (1 Col) */}
        <div className="clay-card p-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-[#EEF6FF] pb-3">
              <h3 className="text-sm font-extrabold text-[#1E293B] uppercase tracking-wide font-heading flex items-center gap-2">
                <Bell className="w-4 h-4 text-[#3B82F6] animate-pulse" />
                Live Sentinel Feed
              </h3>
              <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-600 border border-emerald-200 px-2 py-0.5 rounded-full">
                Live Sync
              </span>
            </div>
            <p className="text-xs text-[#64748B] mt-1">High-priority alerts ingested from public advisory feeds.</p>
          </div>

          <div className="space-y-3 my-2">
            {recentAlerts.map((alt) => (
              <div key={alt.id} className="p-3 rounded-[14px] bg-[#F4F9FF] border border-[#DCE7F5] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[11px] text-[#1E293B] font-heading">{alt.title}</span>
                  <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full ${
                    alt.severity === 'CRITICAL' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                    alt.severity === 'HIGH' ? 'bg-orange-50 text-orange-700 border border-orange-200' :
                    'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}>
                    {alt.severity}
                  </span>
                </div>
                <div className="text-xs text-[#1E293B]">
                  Target: <strong className="font-bold">{alt.entity}</strong>
                </div>
                <p className="text-[11px] text-[#64748B] leading-snug">{alt.detail}</p>
                <div className="text-[10px] font-mono text-[#94A3B8] pt-0.5">{alt.time}</div>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate('/monitoring')}
            className="clay-button-secondary w-full py-2 text-xs text-center font-bold"
          >
            View Live Monitoring Center →
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. 10x10 RISK HEATMAP MATRIX
      ───────────────────────────────────────────────────────────── */}
      <div className="clay-card p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EEF6FF] pb-4">
          <div>
            <h3 className="text-sm font-extrabold text-[#1E293B] uppercase tracking-wide font-heading flex items-center gap-2">
              <Flame className="w-4 h-4 text-rose-500" />
              Risk Probability vs Impact Heatmap Matrix
            </h3>
            <p className="text-xs text-[#64748B] mt-0.5">
              Heatmap cell density mapping target vulnerability severity against operational business impact.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-[#64748B]">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-blue-100 border border-blue-200 inline-block" /> Low (1-3)</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-blue-400 inline-block" /> Medium (4-6)</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-blue-600 inline-block" /> High (7-10)</span>
          </div>
        </div>

        <RiskHeatmap />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          5. TARGET DIRECTORY CLAY TABLE
      ───────────────────────────────────────────────────────────── */}
      <div className="clay-table-container space-y-4">
        <div className="p-5 border-b border-[#DCE7F5] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#F4F9FF]">
          <div className="flex items-center gap-3">
            <h3 className="text-sm font-extrabold text-[#1E293B] uppercase tracking-wide font-heading flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#3B82F6]" />
              Monitored Target Directory
            </h3>
            <span className="text-xs font-mono font-bold bg-[#EEF6FF] text-[#3B82F6] border border-[#DCE7F5] px-3 py-0.5 rounded-full">
              {filteredCompanies.length} Monitored
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-[#94A3B8]" />
              <input
                type="text"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                placeholder="Search company or domain..."
                className="clay-input pl-9 pr-3 py-1.5 text-xs font-mono w-56"
              />
            </div>

            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="bg-white border border-[#DCE7F5] text-[#1E293B] font-bold text-xs rounded-[14px] px-3 py-1.5 outline-none cursor-pointer shadow-inner"
            >
              <option value="ALL">Tier: All</option>
              <option value="CRITICAL">Tier: Critical</option>
              <option value="HIGH">Tier: High</option>
              <option value="MEDIUM">Tier: Medium</option>
              <option value="LOW">Tier: Low</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto max-h-[500px]">
          <table className="clay-table text-left">
            <thead>
              <tr>
                <th>Entity Name</th>
                <th>Primary Domain</th>
                <th>Industry Sector</th>
                <th>Risk Rating</th>
                <th>Attestation</th>
                <th>CVE Advisories</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCompanies.map((c) => {
                const score = c.risk_score || 3.5;
                return (
                  <tr
                    key={c.id}
                    onClick={() => navigate(`/workspace/${c.id}`)}
                    className="cursor-pointer"
                  >
                    <td className="font-bold text-[#1E293B] font-heading flex items-center gap-3">
                      <div className="w-8 h-8 rounded-[10px] bg-[#EEF6FF] border border-[#DCE7F5] text-[#3B82F6] font-extrabold text-xs flex items-center justify-center">
                        {c.name.charAt(0)}
                      </div>
                      <span>{c.name}</span>
                    </td>
                    <td className="text-[#3B82F6] font-mono font-bold text-xs">{c.primary_domain}</td>
                    <td className="text-[#64748B]">{c.industry || 'Technology'}</td>
                    <td>
                      <RiskBadge score={score} />
                    </td>
                    <td className="text-emerald-700 font-mono font-bold text-xs">98% (ISO 27037)</td>
                    <td className="font-mono text-xs">
                      {c.cve_findings.length > 0 ? (
                        <span className="text-rose-600 font-bold">{c.cve_findings.length} Critical CVEs</span>
                      ) : (
                        <span className="text-[#94A3B8]">0 Advisories</span>
                      )}
                    </td>
                    <td className="text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/workspace/${c.id}`);
                        }}
                        className="clay-button-secondary px-3 py-1.5 text-xs inline-flex items-center gap-1"
                      >
                        Profile <ExternalLink className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
