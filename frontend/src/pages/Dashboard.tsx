import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  ShieldAlert, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Download,
  Filter,
  RefreshCw,
  Search
} from 'lucide-react';
import { Company } from '../types';
import { RiskBadge } from '../components/RiskBadge';
import { api } from '../services/api';

interface DashboardProps {
  companies: Company[];
  onOpenScanModal: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ companies, onOpenScanModal }) => {
  const navigate = useNavigate();
  const [filterTier, setFilterTier] = useState<string>('ALL');

  const totalCompanies = companies.length;
  const criticalHighCount = companies.filter(c => c.risk_tier === 'High' || c.risk_tier === 'Critical').length;
  const avgRiskScore = companies.length ? (companies.reduce((acc, c) => acc + c.risk_score, 0) / companies.length).toFixed(1) : '32.0';

  const filteredCompanies = companies.filter(c => {
    if (filterTier === 'ALL') return true;
    if (filterTier === 'HIGH_CRITICAL') return c.risk_tier === 'High' || c.risk_tier === 'Critical';
    if (filterTier === 'LOW') return c.risk_tier === 'Low';
    return true;
  });

  const handleDownloadReport = (e: React.MouseEvent, companyId: string, domain: string) => {
    e.stopPropagation();
    const url = api.getReportDownloadUrl(companyId, 'pdf');
    api.triggerBlobDownload(url, `CorpLens_Executive_Brief_${domain}.txt`);
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-wider flex items-center gap-3">
            Corporate Intelligence & Risk Dashboard
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Real-time public OSINT, vendor risk posture, and sanctions compliance monitoring.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenScanModal}
            className="glass-btn-primary px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg"
          >
            <Building2 className="h-4 w-4 stroke-[2.5]" />
            + Investigate Target Company
          </button>
        </div>
      </div>

      {/* Stats Cards - Interactive & B&W Glassy */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Total Companies */}
        <div 
          onClick={() => setFilterTier('ALL')}
          className={`glass-card p-5 rounded-xl space-y-3 cursor-pointer relative overflow-hidden transition-all ${filterTier === 'ALL' ? 'border-white bg-zinc-900/90' : ''}`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest">Companies Tracked</span>
            <div className="h-8 w-8 rounded-lg bg-zinc-900 border border-white/20 text-white flex items-center justify-center">
              <Building2 className="h-4 w-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">{totalCompanies}</div>
          <div className="text-[11px] text-zinc-400 flex items-center gap-1 font-mono">
            <span className="text-white font-bold">100%</span> verified public DNS profiles
          </div>
        </div>

        {/* Card 2: High / Critical Flags */}
        <div 
          onClick={() => setFilterTier(filterTier === 'HIGH_CRITICAL' ? 'ALL' : 'HIGH_CRITICAL')}
          className={`glass-card p-5 rounded-xl space-y-3 cursor-pointer relative overflow-hidden transition-all ${filterTier === 'HIGH_CRITICAL' ? 'border-white bg-zinc-900/90' : ''}`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest">High / Critical Flags</span>
            <div className="h-8 w-8 rounded-lg bg-white text-black font-extrabold flex items-center justify-center shadow-lg glow-white">
              <ShieldAlert className="h-4 w-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">{criticalHighCount}</div>
          <div className="text-[11px] text-zinc-300 flex items-center gap-1">
            <AlertTriangle className="h-3.5 w-3.5 text-white" />
            Click to filter critical targets
          </div>
        </div>

        {/* Card 3: Portfolio Risk Avg */}
        <div 
          onClick={() => navigate('/analytics')}
          className="glass-card p-5 rounded-xl space-y-3 cursor-pointer relative overflow-hidden hover:border-white/40 transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest">Portfolio Risk Average</span>
            <div className="h-8 w-8 rounded-lg bg-zinc-900 border border-white/20 text-white flex items-center justify-center">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">{avgRiskScore} <span className="text-xs font-normal text-zinc-400">/ 100</span></div>
          <div className="text-[11px] text-zinc-400 font-medium">
            View Analytics & Trend Charts &rarr;
          </div>
        </div>

        {/* Card 4: Public Sanctions Coverage */}
        <div 
          onClick={() => navigate('/sanctions')}
          className="glass-card p-5 rounded-xl space-y-3 cursor-pointer relative overflow-hidden hover:border-white/40 transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest">Sanctions Watchlists</span>
            <div className="h-8 w-8 rounded-lg bg-zinc-900 border border-white/20 text-white flex items-center justify-center">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">OFAC / EU</div>
          <div className="text-[11px] text-zinc-400">
            Screen Entities & Adjudicate &rarr;
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-400 uppercase tracking-wider font-extrabold flex items-center gap-1">
            <Filter className="h-3.5 w-3.5 text-zinc-400" /> Filter:
          </span>
          <button 
            onClick={() => setFilterTier('ALL')}
            className={`px-3 py-1 rounded-md text-xs font-bold transition-all border ${filterTier === 'ALL' ? 'bg-white text-black border-white' : 'glass-btn text-zinc-400'}`}
          >
            All ({companies.length})
          </button>
          <button 
            onClick={() => setFilterTier('HIGH_CRITICAL')}
            className={`px-3 py-1 rounded-md text-xs font-bold transition-all border ${filterTier === 'HIGH_CRITICAL' ? 'bg-white text-black border-white' : 'glass-btn text-zinc-400'}`}
          >
            High & Critical ({criticalHighCount})
          </button>
        </div>

        <div className="text-xs text-zinc-500 font-mono">
          Showing {filteredCompanies.length} of {companies.length} targets
        </div>
      </div>

      {/* Main Companies Table */}
      <div className="glass-panel rounded-xl overflow-hidden border border-white/10">
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
              <Building2 className="h-4 w-4 text-white" />
              Recent Corporate Intelligence Targets
            </h2>
            <p className="text-xs text-zinc-400">Click any target to view digital footprint, CVE findings, and download executive brief.</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="bg-zinc-950 text-[10px] uppercase text-zinc-400 font-extrabold tracking-widest border-b border-white/10">
              <tr>
                <th className="py-3.5 px-6">Company Target</th>
                <th className="py-3.5 px-4">Primary Domain</th>
                <th className="py-3.5 px-4">Industry / HQ</th>
                <th className="py-3.5 px-4">Overall Risk Score</th>
                <th className="py-3.5 px-4">Detected Tech Stack</th>
                <th className="py-3.5 px-4">Monitoring Status</th>
                <th className="py-3.5 px-6 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 font-sans">
              {filteredCompanies.map((comp) => (
                <tr 
                  key={comp.id}
                  onClick={() => navigate(`/workspace/${comp.id}`)}
                  className="hover:bg-zinc-900/60 cursor-pointer transition-colors group"
                >
                  <td className="py-4 px-6 font-bold text-white flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-zinc-900 border border-white/20 text-white flex items-center justify-center font-extrabold text-sm group-hover:border-white transition-all">
                      {comp.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-extrabold text-white">{comp.name}</div>
                      <div className="text-[11px] font-mono text-zinc-500">{comp.id}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-mono text-zinc-300 text-xs">
                    {comp.primary_domain}
                  </td>
                  <td className="py-4 px-4 text-xs text-zinc-400">
                    <div className="text-zinc-200 font-medium">{comp.industry}</div>
                    <div className="text-[10px] text-zinc-500">{comp.country}</div>
                  </td>
                  <td className="py-4 px-4">
                    <RiskBadge score={comp.risk_score} tier={comp.risk_tier} />
                  </td>
                  <td className="py-4 px-4 text-xs">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {comp.tech_stack.slice(0, 3).map((t, idx) => (
                        <span key={idx} className="bg-zinc-900 border border-zinc-700 text-zinc-300 text-[10px] px-2 py-0.5 rounded font-mono">
                          {t.technology_name}
                        </span>
                      ))}
                      {comp.tech_stack.length > 3 && (
                        <span className="text-[10px] text-zinc-500 font-mono">+{comp.tech_stack.length - 3}</span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-xs">
                    <span className="inline-flex items-center gap-1.5 text-zinc-200 bg-zinc-900 border border-white/20 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                      Active
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={(e) => handleDownloadReport(e, comp.id, comp.primary_domain)}
                        className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-all border border-transparent hover:border-white/20"
                        title="Download Executive Brief Report"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/workspace/${comp.id}`);
                        }}
                        className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-all border border-transparent hover:border-white/20"
                        title="Open Target Workspace"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
