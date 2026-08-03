import React, { useState } from 'react';
import { ShieldAlert, Search, ShieldCheck, CheckCircle2, AlertTriangle, FileCheck, Layers, Award } from 'lucide-react';
import { api } from '../services/api';

export const SanctionsScreening: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isScreening, setIsScreening] = useState(false);
  const [results, setResults] = useState<any[]>([
    {
      id: 'snc-101',
      entity_name: 'Nexus Commercial Trading LLC',
      list_source: 'US OFAC SDN List (Sectoral Sanctions)',
      match_score: 0.84,
      matched_record_id: 'OFAC-SDN-94821',
      status: 'Under Review',
      notes: 'Fuzzy match (84% confidence) against designated entity under E.O. 14024. Compliance adjudication required.',
      category: 'Corporate Entity'
    },
    {
      id: 'snc-102',
      entity_name: 'Acme Industrial Defense Exports',
      list_source: 'EU Consolidated Sanctions List',
      match_score: 0.76,
      matched_record_id: 'EU-SANCT-77412',
      status: 'Under Review',
      notes: 'Fuzzy match against entity listed for restrictive measures on dual-use technology.',
      category: 'Dual-Use Supplier'
    }
  ]);

  const complianceFrameworks = [
    { name: 'ISO/IEC 27001:2022', score: '100% Compliant', controls: '93 / 93 Controls Attested', status: 'Passed' },
    { name: 'SOC 2 Type II', score: 'Attested Clean', controls: '5 Trust Services Criteria', status: 'Passed' },
    { name: 'PCI DSS v4.0', score: 'Level 1 Certified', controls: '12 Requirement Groups', status: 'Passed' },
    { name: 'EU GDPR / CCPA', score: 'Privacy Shielded', controls: 'Data Protection Impact Assessment', status: 'Passed' }
  ];

  const handleScreen = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setIsScreening(true);
    const matches = await api.screenSanction(searchTerm);
    setResults(matches);
    setIsScreening(false);
  };

  const handleAdjudicate = async (index: number, matchId: string, newStatus: string) => {
    const updated = [...results];
    updated[index].status = newStatus;
    setResults(updated);
    await api.adjudicateSanction(matchId, newStatus);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header Banner */}
      <div className="clay-panel p-6 bg-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold text-[#1E293B] font-heading tracking-tight flex items-center gap-3">
              <ShieldAlert className="h-6 w-6 text-[#3B82F6]" />
              Compliance & Sanctions Governance
            </h1>
            <span className="text-xs font-mono font-bold bg-[#EEF6FF] text-[#3B82F6] border border-[#DCE7F5] px-3 py-1 rounded-full">
              Real-time Watchlist Screening
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
            Automated fuzzy string matching across US OFAC SDN, UN Security Council, EU Consolidated, and UK HMT sanctions registries.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 font-mono text-xs">
          <div className="p-3 bg-[#EEF6FF] border border-[#DCE7F5] rounded-[16px] text-center">
            <div className="text-[10px] text-[#64748B] uppercase font-bold">Watchlists Synced</div>
            <div className="text-base font-black text-[#1E293B]">4 Registries</div>
          </div>
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-[16px] text-center text-emerald-700">
            <div className="text-[10px] uppercase font-bold">Pass Rate</div>
            <div className="text-base font-black">99.4%</div>
          </div>
        </div>
      </div>

      {/* Compliance Framework Scorecards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {complianceFrameworks.map((fw, idx) => (
          <div key={idx} className="clay-card p-5 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold font-heading text-[#1E293B]">
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#3B82F6]" />
                {fw.name}
              </span>
              <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
                {fw.status}
              </span>
            </div>
            <div className="text-lg font-black text-[#1E293B] font-mono">{fw.score}</div>
            <div className="text-[11px] text-[#64748B] font-mono">{fw.controls}</div>
          </div>
        ))}
      </div>

      {/* Fuzzy Screening Search Bar */}
      <form onSubmit={handleScreen} className="clay-card p-5 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-[#94A3B8]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search entity name, executive, or domain for fuzzy sanctions screening (e.g. Nexus, Acme)..."
            className="clay-input w-full pl-10 pr-4 py-3 text-xs font-mono"
          />
        </div>
        <button
          type="submit"
          disabled={isScreening}
          className="clay-button-primary px-6 py-3 text-xs flex items-center gap-2 font-bold shrink-0 disabled:opacity-50"
        >
          <Search className="w-4 h-4" />
          {isScreening ? 'Screening Watchlists...' : 'Screen Entity'}
        </button>
      </form>

      {/* Matches Adjudication Queue */}
      <div className="clay-card p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[#EEF6FF] pb-4">
          <h3 className="text-sm font-extrabold text-[#1E293B] uppercase tracking-wide font-heading flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-[#3B82F6]" />
            Watchlist Matches & Analyst Adjudication Queue
          </h3>
          <span className="text-xs font-mono font-bold text-[#64748B]">Total Items: {results.length}</span>
        </div>

        <div className="space-y-4">
          {results.map((match, idx) => (
            <div key={match.id || idx} className="p-5 rounded-[16px] bg-[#F4F9FF] border border-[#DCE7F5] space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-base font-extrabold text-[#1E293B] font-heading flex items-center gap-3">
                    <span>{match.entity_name}</span>
                    <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full ${
                      match.status === 'Confirmed Match' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                      match.status === 'False Positive' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {match.status}
                    </span>
                  </div>
                  <div className="text-xs text-[#64748B] font-mono mt-1">
                    List Source: <strong className="text-[#1E293B]">{match.list_source}</strong> ({match.matched_record_id})
                  </div>
                </div>

                <div className="font-mono text-xs font-bold text-[#1E293B] bg-white px-3 py-1.5 rounded-[12px] border border-[#DCE7F5] shadow-sm">
                  Match Score: <span className="text-rose-600 font-extrabold">{(match.match_score * 100).toFixed(0)}%</span>
                </div>
              </div>

              <p className="text-xs text-[#64748B] leading-relaxed bg-white p-3 rounded-[12px] border border-[#DCE7F5]">
                {match.notes}
              </p>

              <div className="flex items-center justify-end gap-3 pt-1">
                <button
                  onClick={() => handleAdjudicate(idx, match.id, 'False Positive')}
                  className="clay-button-secondary px-4 py-2 text-xs"
                >
                  Mark False Positive
                </button>
                <button
                  onClick={() => handleAdjudicate(idx, match.id, 'Confirmed Match')}
                  className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-[14px] shadow-sm transition-all"
                >
                  Confirm Match & Escalate
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
