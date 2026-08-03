import React from 'react';
import { GitBranch, Layers, ShieldCheck, ArrowRight } from 'lucide-react';

export const SupplyChainPage: React.FC = () => {
  const tiers = [
    {
      tier: 'Tier 1 (Direct Vendors)',
      count: 14,
      risk: 'Low Risk (2.4/10.0)',
      entities: ['CloudScale Inc', 'Apex Cyber Solutions', 'Titan Energy']
    },
    {
      tier: 'Tier 2 (Sub-Contractors)',
      count: 38,
      risk: 'Medium Risk (4.8/10.0)',
      entities: ['Vortex Systems', 'Veritas Logistics', 'Starlight Comms']
    },
    {
      tier: 'Tier 3 (4th-Party Providers)',
      count: 92,
      risk: 'High Risk (7.2/10.0)',
      entities: ['Nexus Dynamics Defense', 'Aegis Infrastructure']
    }
  ];

  return (
    <div className="space-y-6 font-sans">
      {/* Header Banner */}
      <div className="clay-panel p-6 bg-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold text-[#1E293B] font-heading tracking-tight flex items-center gap-3">
              <GitBranch className="h-6 w-6 text-[#3B82F6]" />
              Multi-Tier Supply Chain & 4th-Party Concentration
            </h1>
            <span className="text-xs font-mono font-bold bg-[#EEF6FF] text-[#3B82F6] border border-[#DCE7F5] px-3 py-1 rounded-full">
              Graph Correlated
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
            Deep-dive 4th-party vendor dependencies, cloud concentration risk, and supply chain single-point-of-failure mapping.
          </p>
        </div>
      </div>

      {/* Multi-tier Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiers.map((t, idx) => (
          <div key={idx} className="clay-card p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#EEF6FF] pb-3">
              <span className="font-extrabold text-sm text-[#1E293B] font-heading flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#3B82F6]" />
                {t.tier}
              </span>
              <span className="text-xs font-mono font-bold bg-[#EEF6FF] text-[#3B82F6] border border-[#DCE7F5] px-2.5 py-0.5 rounded-full">
                {t.count} Suppliers
              </span>
            </div>

            <div className="text-xs font-mono text-[#64748B]">
              Risk Posture: <strong className="text-[#1E293B]">{t.risk}</strong>
            </div>

            <div className="space-y-2 pt-2 border-t border-[#EEF6FF]">
              <span className="text-[10px] font-mono text-[#94A3B8] uppercase tracking-wider block">Key Monitored Suppliers</span>
              {t.entities.map((e, i) => (
                <div key={i} className="p-3 rounded-[14px] bg-[#F4F9FF] border border-[#DCE7F5] text-xs font-bold text-[#1E293B] flex items-center justify-between">
                  <span>{e}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#3B82F6]" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
