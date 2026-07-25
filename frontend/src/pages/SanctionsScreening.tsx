import React, { useState } from 'react';
import { ShieldAlert, Search, CheckCircle, XCircle, AlertTriangle, ShieldCheck, Filter } from 'lucide-react';
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
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="pb-4 border-b border-white/10">
        <h1 className="text-2xl font-extrabold text-white tracking-wider flex items-center gap-3">
          <ShieldAlert className="h-6 w-6 text-white" />
          Sanctions, PEP & Watchlist Screening (Public Registers)
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Automated fuzzy string matching against US OFAC SDN, EU Consolidated, UN Security Council, and UK HMT watchlists.
        </p>
      </div>

      {/* Search Input Bar - B&W Glassy */}
      <form onSubmit={handleScreen} className="glass-panel p-5 rounded-2xl border border-white/10 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search corporate entity, executive, or domain (e.g. Nexus Dynamics, Acme, Vostok)..."
            className="w-full glass-input rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 font-mono"
          />
        </div>
        <button 
          type="submit" 
          disabled={isScreening}
          className="glass-btn-primary px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
        >
          {isScreening ? 'Running Fuzzy Match...' : 'Screen Entity'}
        </button>
      </form>

      {/* Queue Table Container */}
      <div className="glass-panel rounded-2xl overflow-hidden border border-white/10">
        <div className="p-5 border-b border-white/10 font-extrabold text-white text-sm uppercase tracking-wider flex items-center justify-between">
          <span className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-white" />
            Watchlist Matches & Analyst Adjudication Queue
          </span>
          <span className="text-xs font-mono text-zinc-400">Total Matches: {results.length}</span>
        </div>

        <div className="divide-y divide-zinc-800/80">
          {results.map((match, idx) => (
            <div key={match.id || idx} className="p-6 space-y-4 hover:bg-zinc-900/40 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-base font-extrabold text-white flex items-center gap-3">
                    <span>{match.entity_name}</span>
                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-mono font-black border uppercase tracking-wider ${
                      match.status === 'Clear' ? 'bg-zinc-900 text-zinc-400 border-zinc-700' :
                      match.status === 'False Positive' ? 'bg-zinc-800 text-zinc-300 border-zinc-600' :
                      match.status === 'Confirmed True Positive' ? 'bg-white text-black border-white glow-white' :
                      'bg-zinc-900 text-white border-white/40'
                    }`}>
                      {match.status}
                    </span>
                  </div>
                  <div className="text-xs text-zinc-400 mt-1 font-mono">
                    Watchlist Source: <span className="text-white font-bold">{match.list_source}</span> • Match Confidence: <span className="font-mono text-white font-extrabold">{(match.match_score * 100).toFixed(0)}%</span>
                  </div>
                </div>

                {match.status === 'Under Review' && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleAdjudicate(idx, match.id, 'False Positive')}
                      className="glass-btn px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5"
                    >
                      <XCircle className="h-3.5 w-3.5 text-zinc-400" />
                      Mark False Positive
                    </button>
                    <button
                      onClick={() => handleAdjudicate(idx, match.id, 'Confirmed True Positive')}
                      className="glass-btn-primary px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow"
                    >
                      <CheckCircle className="h-3.5 w-3.5 stroke-[3]" />
                      Confirm True Positive
                    </button>
                  </div>
                )}
              </div>

              <div className="text-xs text-zinc-300 bg-zinc-950 p-3.5 rounded-xl border border-white/10 font-sans leading-relaxed">
                {match.notes}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
