import React from 'react';
import { GitBranch, Layers, ShieldCheck, AlertTriangle, ArrowRight } from 'lucide-react';
import { Badge } from '../components/ui/Badge';

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
    <div className="p-8 space-y-8 max-w-7xl mx-auto bg-slate-50 text-slate-900 font-sans min-h-screen">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5">
        <div className="flex items-center gap-2.5">
          <h1 className="text-2xl font-extrabold text-slate-900 font-heading tracking-tight flex items-center gap-3">
            <GitBranch className="h-6 w-6 text-blue-600" />
            Multi-Tier Supply Chain & 4th-Party Concentration
          </h1>
          <Badge variant="cyan">Graph Correlated</Badge>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Deep-dive 4th-party vendor dependencies, cloud concentration risk, and supply chain single-point-of-failure mapping.
        </p>
      </div>

      {/* Multi-tier Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiers.map((t, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="font-extrabold text-sm text-slate-900 font-heading flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-600" />
                {t.tier}
              </span>
              <span className="text-xs font-mono font-bold bg-blue-50 text-blue-600 border border-blue-200 px-2 py-0.5 rounded">
                {t.count} Suppliers
              </span>
            </div>

            <div className="text-xs font-mono text-slate-600">
              Risk Posture: <strong className="text-slate-900">{t.risk}</strong>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Key Monitored Suppliers</span>
              {t.entities.map((e, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 flex items-center justify-between">
                  <span>{e}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
