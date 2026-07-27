import React, { useState } from 'react';
import { ShieldAlert, Search, ShieldCheck } from 'lucide-react';
import { api } from '../services/api';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

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
    <div className="p-8 space-y-8 max-w-7xl mx-auto bg-slate-50 text-slate-900 font-sans min-h-screen">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-2xl font-extrabold text-slate-900 font-heading tracking-tight flex items-center gap-3">
          <ShieldAlert className="h-6 w-6 text-blue-600" />
          Sanctions, PEP & Watchlist Screening
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Automated fuzzy string matching against US OFAC SDN, EU Consolidated, UN Security Council, and UK HMT watchlists.
        </p>
      </div>

      {/* Search Input Bar */}
      <form onSubmit={handleScreen} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search corporate entity, executive, or domain (e.g. Nexus Dynamics, Acme, Vostok)..."
            className="w-full bg-slate-100 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 font-mono outline-none focus:bg-white focus:border-blue-600 transition-all"
          />
        </div>
        <Button
          type="submit"
          disabled={isScreening}
          variant="primary"
          isLoading={isScreening}
        >
          Screen Entity
        </Button>
      </form>

      {/* Queue Table Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200 font-extrabold text-slate-900 text-sm font-heading flex items-center justify-between">
          <span className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-blue-600" />
            Watchlist Matches & Analyst Adjudication Queue
          </span>
          <span className="text-xs font-mono text-slate-500 font-bold">Total Matches: {results.length}</span>
        </div>

        <div className="divide-y divide-slate-100">
          {results.map((match, idx) => (
            <div key={match.id || idx} className="p-6 space-y-4 hover:bg-slate-50 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-base font-extrabold text-slate-900 font-heading flex items-center gap-3">
                    <span>{match.entity_name}</span>
                    <Badge variant={match.status === 'Clear' ? 'low' : 'critical'}>
                      {match.status}
                    </Badge>
                  </div>
                  <div className="text-xs text-slate-500 font-mono mt-1">
                    Source: <strong className="text-slate-800">{match.list_source}</strong> ({match.matched_record_id})
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                    Match Confidence: <span className="text-rose-600">{(match.match_score * 100).toFixed(0)}%</span>
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-sans bg-slate-50 p-3 rounded-xl border border-slate-200">
                {match.notes}
              </p>

              <div className="flex items-center justify-end gap-3 pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleAdjudicate(idx, match.id, 'False Positive')}
                >
                  Mark False Positive
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleAdjudicate(idx, match.id, 'Confirmed Match')}
                >
                  Confirm Match & Escalate
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
