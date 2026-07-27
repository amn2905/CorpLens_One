import React, { useState } from 'react';
import { 
  Building2, 
  ShieldAlert, 
  FolderOpen, 
  ShieldCheck, 
  ArrowUpRight, 
  ArrowDownRight, 
  ExternalLink,
  Activity,
  Search,
  Filter,
  Flame,
  AlertTriangle,
  Download,
  Bell,
  CheckCircle2,
  Lock,
  Layers,
  Rss
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockCompanies, api } from '../services/api';
import { KPICard } from '../components/ui/KPICard';
import { TrendChart } from '../components/ui/TrendChart';
import { RiskHeatmap } from '../components/ui/RiskHeatmap';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

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
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto bg-slate-50 text-slate-900 font-sans min-h-screen">
      {/* ─────────────────────────────────────────────────────────────
          1. CORPLENS ONE HERO BRAND & EXECUTIVE HEADER
      ───────────────────────────────────────────────────────────── */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight font-heading flex items-center gap-2.5">
                <span>CorpLens One</span>
              </h1>
              <Badge variant="cyan">AI-Powered Corporate Intelligence Platform</Badge>
              <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md">
                ISO/IEC 27037 Attested
              </span>
            </div>

            <p className="text-xs font-bold text-slate-700 mt-2 font-sans leading-relaxed">
              <strong className="text-blue-600 font-extrabold uppercase tracking-wider text-[11px] mr-2">Official Tagline:</strong>
              Smarter Intelligence. Better Decisions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const url = api.getReportDownloadUrl('cmp-001', 'pdf');
                api.downloadFile(url, 'CorpLens_One_Portfolio_Executive_Brief.pdf');
              }}
              leftIcon={<Download className="w-4 h-4 text-slate-500" />}
            >
              Export Brief (PDF)
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/cases')}
              leftIcon={<FolderOpen className="w-4 h-4 text-blue-600" />}
            >
              Investigation Board
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/ai-assistant')}
              leftIcon={<Activity className="w-4 h-4" />}
            >
              Launch AI Copilot
            </Button>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. MODULE A: 4 KPI WIDGETS WITH SPARKLINES
      ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard
          title="Monitored Target Entities"
          value="14 Vendors"
          change="+2 new"
          trend="up"
          subtitle="Active OSINT Baseline Ingestion"
          icon={<Building2 className="w-4 h-4" />}
        />
        <KPICard
          title="Critical Vulnerabilities SLA"
          value="3 High Risk"
          change="Action Required"
          trend="down"
          subtitle="Score >= 7.0 / 10.0"
          icon={<ShieldAlert className="w-4 h-4 text-rose-600" />}
        />
        <KPICard
          title="Active Investigations"
          value="8 Open Cases"
          change="3 Peer Review"
          trend="neutral"
          subtitle="Kanban Workflow Operational"
          icon={<FolderOpen className="w-4 h-4" />}
        />
        <KPICard
          title="Compliance & Attestation"
          value="99.4%"
          change="ISO 27037"
          trend="up"
          subtitle="Zero Non-Conformities"
          icon={<ShieldCheck className="w-4 h-4 text-emerald-600" />}
        />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. 3-COLUMN ANALYTICS & LIVE THREAT FEED HUB
      ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trend Area Chart (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          <TrendChart title="30-Day Cross-Portfolio Risk Aggregation Trend" height={320} />
        </div>

        {/* Real-time Alert Ticker Column (1 Col) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide font-heading flex items-center gap-2">
                <Bell className="w-4 h-4 text-blue-600 animate-pulse" />
                Live Sentinel Alert Feed
              </h3>
              <span className="text-[10px] font-mono font-bold bg-blue-50 text-blue-600 border border-blue-200 px-2 py-0.5 rounded">
                Real-time Sync
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              High-priority alerts ingested from NVD, OFAC, and Certificate Transparency logs.
            </p>
          </div>

          <div className="space-y-3 my-2">
            {recentAlerts.map((alt) => (
              <div key={alt.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1 hover:border-blue-300 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs text-slate-900 font-heading">{alt.title}</span>
                  <Badge variant={alt.severity === 'CRITICAL' ? 'critical' : alt.severity === 'HIGH' ? 'medium' : 'low'}>
                    {alt.severity}
                  </Badge>
                </div>
                <div className="text-xs text-slate-700 font-sans">
                  Entity: <strong className="text-slate-900 font-heading">{alt.entity}</strong>
                </div>
                <p className="text-[11px] text-slate-500 leading-tight font-sans">{alt.detail}</p>
                <div className="text-[10px] font-mono text-slate-400 pt-1">{alt.time}</div>
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            className="w-full text-center"
            onClick={() => navigate('/monitoring')}
          >
            View Live Monitoring Center →
          </Button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. 10x10 RISK HEATMAP MATRIX & DENSITY SECTION
      ───────────────────────────────────────────────────────────── */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide font-heading flex items-center gap-2">
              <Flame className="w-4 h-4 text-rose-600" />
              Vendor Risk Probability vs Impact Matrix (10x10 Grid Density)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Heatmap cell density mapping vendor vulnerability score against business impact probability.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-blue-100 border border-blue-200 inline-block" /> Low (1-3)</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-blue-500 inline-block" /> Medium (4-6)</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-blue-800 inline-block" /> High (7-10)</span>
          </div>
        </div>

        <RiskHeatmap />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          5. HIGH-DENSITY TARGET DIRECTORY TABLE WITH STICKY HEADERS
      ───────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4">
        {/* Table Header Bar */}
        <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide font-heading flex items-center gap-2">
              <Building2 className="w-4.5 h-4.5 text-blue-600" />
              Monitored Target Entities Directory
            </h3>
            <span className="text-xs font-mono font-bold bg-blue-50 text-blue-600 border border-blue-200 px-2.5 py-0.5 rounded-lg">
              {filteredCompanies.length} Monitored
            </span>
          </div>

          {/* Search & Filter Controls */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                placeholder="Filter entity or domain..."
                className="bg-slate-100 border border-slate-200 text-slate-900 pl-9 pr-3 py-1.5 text-xs rounded-lg font-mono w-56 outline-none focus:bg-white focus:border-blue-600 transition-all"
              />
            </div>

            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="bg-slate-100 border border-slate-200 text-slate-800 font-bold text-xs rounded-lg px-3 py-1.5 outline-none cursor-pointer"
            >
              <option value="ALL">Tier: All</option>
              <option value="CRITICAL">Tier: Critical</option>
              <option value="HIGH">Tier: High</option>
              <option value="MEDIUM">Tier: Medium</option>
              <option value="LOW">Tier: Low</option>
            </select>
          </div>
        </div>

        {/* High-Density Table with Sticky Header */}
        <div className="overflow-x-auto max-h-[500px]">
          <table className="sentinel-table text-left">
            <thead>
              <tr>
                <th>Entity Name</th>
                <th>Primary Domain</th>
                <th>Industry Sector</th>
                <th>Risk Rating</th>
                <th>Attested Confidence</th>
                <th>CVE Exposure</th>
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
                    className="cursor-pointer transition-colors"
                  >
                    <td className="font-extrabold text-slate-900 font-heading flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 font-bold text-xs flex items-center justify-center">
                        {c.name.charAt(0)}
                      </div>
                      <span>{c.name}</span>
                    </td>
                    <td className="text-blue-600 font-mono font-bold text-xs">{c.primary_domain}</td>
                    <td className="text-slate-600 font-sans">{c.industry || 'Technology'}</td>
                    <td>
                      <Badge variant={score >= 7.0 ? 'critical' : score >= 4.0 ? 'medium' : 'low'}>
                        {score.toFixed(1)} / 10.0
                      </Badge>
                    </td>
                    <td className="text-emerald-700 font-mono font-bold">98% (ISO 27037)</td>
                    <td className="font-mono text-xs">
                      {c.cve_findings.length > 0 ? (
                        <span className="text-rose-600 font-bold">{c.cve_findings.length} Critical CVEs</span>
                      ) : (
                        <span className="text-slate-400">0 Advisories</span>
                      )}
                    </td>
                    <td className="text-right">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/workspace/${c.id}`);
                        }}
                      >
                        Profile <ExternalLink className="w-3 h-3 ml-1" />
                      </Button>
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
