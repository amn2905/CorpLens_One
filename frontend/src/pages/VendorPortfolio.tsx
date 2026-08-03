import React, { useState } from 'react';
import { Briefcase, Search, ExternalLink, ShieldCheck } from 'lucide-react';
import { mockCompanies } from '../services/api';
import { RiskBadge } from '../components/RiskBadge';
import { useNavigate } from 'react-router-dom';

export const VendorPortfolio: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const filtered = mockCompanies.filter(c =>
    !query || c.name.toLowerCase().includes(query.toLowerCase()) || c.primary_domain.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6 font-sans">
      {/* Header Banner */}
      <div className="clay-panel p-6 bg-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold text-[#1E293B] font-heading tracking-tight flex items-center gap-3">
              <Briefcase className="h-6 w-6 text-[#3B82F6]" />
              Third-Party Risk Management (TPRM Grid)
            </h1>
            <span className="text-xs font-mono font-bold bg-[#EEF6FF] text-[#3B82F6] border border-[#DCE7F5] px-3 py-1 rounded-full">
              7-Pillar Scoring
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
            Vendor risk evaluation matrix, continuous SLA monitoring, and automated due diligence attestation.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 font-mono text-xs">
          <div className="p-3 bg-[#EEF6FF] border border-[#DCE7F5] rounded-[16px] text-center">
            <div className="text-[10px] text-[#64748B] uppercase font-bold">Total Vendors</div>
            <div className="text-base font-black text-[#1E293B]">{filtered.length} Portfolio</div>
          </div>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="clay-card p-4 flex items-center gap-3">
        <Search className="w-4 h-4 text-[#94A3B8] ml-2" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search vendor portfolio by company name or domain..."
          className="clay-input w-full px-4 py-2 text-xs font-mono"
        />
      </div>

      {/* Portfolio Clay Table */}
      <div className="clay-table-container">
        <table className="clay-table text-left">
          <thead>
            <tr>
              <th>Vendor Entity</th>
              <th>Primary Domain</th>
              <th>Industry Sector</th>
              <th>Risk Score Rating</th>
              <th>Confidence</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => {
              const score = c.risk_score || 3.5;
              return (
                <tr key={c.id} className="cursor-pointer" onClick={() => navigate(`/workspace/${c.id}`)}>
                  <td className="font-bold text-[#1E293B] font-heading flex items-center gap-3">
                    <div className="w-8 h-8 rounded-[10px] bg-[#EEF6FF] text-[#3B82F6] font-extrabold text-xs flex items-center justify-center border border-[#DCE7F5]">
                      {c.name.charAt(0)}
                    </div>
                    <span>{c.name}</span>
                  </td>
                  <td className="text-[#3B82F6] font-mono font-bold text-xs">{c.primary_domain}</td>
                  <td className="text-[#64748B]">{c.industry || 'Technology'}</td>
                  <td>
                    <RiskBadge score={score} />
                  </td>
                  <td className="text-emerald-600 font-mono font-bold text-xs">98% (ISO 27037)</td>
                  <td className="text-right">
                    <button className="clay-button-secondary px-3 py-1.5 text-xs inline-flex items-center gap-1">
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
  );
};
