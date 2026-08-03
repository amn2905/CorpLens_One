import React from 'react';
import { Network, Share2, Layers } from 'lucide-react';
import { GraphExplorer } from '../components/GraphExplorer';

export const GraphPage: React.FC = () => {
  return (
    <div className="space-y-6 font-sans">
      {/* Header Banner */}
      <div className="clay-panel p-6 bg-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold text-[#1E293B] font-heading tracking-tight flex items-center gap-3">
              <Network className="h-6 w-6 text-[#3B82F6]" />
              Knowledge Graph & Entity Topology
            </h1>
            <span className="text-xs font-mono font-bold bg-[#EEF6FF] text-[#3B82F6] border border-[#DCE7F5] px-3 py-1 rounded-full">
              Neo4j v5.18 Engine
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
            Cytoscape.js force-directed topology mapping corporate subsidiary hierarchies, executive leadership, shared ASN infrastructure, and CVE exposure.
          </p>
        </div>
      </div>

      <div className="clay-panel p-4 min-h-[600px] bg-white">
        <GraphExplorer companyId="cmp-001" />
      </div>
    </div>
  );
};
