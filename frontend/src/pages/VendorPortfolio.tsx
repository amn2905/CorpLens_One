import React, { useState } from 'react';
import { Briefcase, Search, ExternalLink } from 'lucide-react';
import { mockCompanies } from '../services/api';
import { Badge } from '../components/ui/Badge';
import { useNavigate } from 'react-router-dom';

export const VendorPortfolio: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const filtered = mockCompanies.filter(c =>
    !query || c.name.toLowerCase().includes(query.toLowerCase()) || c.primary_domain.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto bg-slate-50 text-slate-900 font-sans min-h-screen">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-2xl font-extrabold text-slate-900 font-heading tracking-tight flex items-center gap-3">
          <Briefcase className="h-6 w-6 text-blue-600" />
          Third-Party Vendor Risk Portfolio (TPRM Grid)
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Complete vendor portfolio risk evaluation matrix, SLA monitoring, and 7-pillar vulnerability scores.
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400 ml-2" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search vendor portfolio by company name or domain..."
          className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2 text-xs font-mono text-slate-900 outline-none focus:bg-white focus:border-blue-600 transition-all"
        />
      </div>

      {/* Portfolio Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-slate-100 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
            <tr>
              <th className="p-4">Vendor Entity</th>
              <th className="p-4">Domain</th>
              <th className="p-4">Industry</th>
              <th className="p-4">Risk Score</th>
              <th className="p-4">Confidence</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map(c => {
              const risk = c.risk_score || 3.5;
              return (
                <tr key={c.id} className="hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => navigate(`/workspace/${c.id}`)}>
                  <td className="p-4 font-bold text-slate-900">{c.name}</td>
                  <td className="p-4 text-blue-600">{c.primary_domain}</td>
                  <td className="p-4 text-slate-600">{c.industry || 'Technology'}</td>
                  <td className="p-4">
                    <Badge variant={risk >= 7.0 ? 'critical' : risk >= 4.0 ? 'medium' : 'low'}>
                      {risk} / 10.0
                    </Badge>
                  </td>
                  <td className="p-4 text-emerald-600 font-bold">96%</td>
                  <td className="p-4 text-right">
                    <span className="text-blue-600 font-bold flex items-center justify-end gap-1">
                      Profile <ExternalLink className="w-3 h-3" />
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
