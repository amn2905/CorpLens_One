import React from 'react';
import { Network } from 'lucide-react';
import { GraphExplorer } from '../components/GraphExplorer';
import { Badge } from '../components/ui/Badge';

export const GraphPage: React.FC = () => {
  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto bg-slate-50 text-slate-900 font-sans min-h-screen">
      <div className="border-b border-slate-200 pb-5">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-extrabold text-slate-900 font-heading tracking-tight flex items-center gap-3">
            <Network className="h-6 w-6 text-blue-600" />
            Graph Relationship Topology Sandbox
          </h1>
          <Badge variant="cyan">Neo4j Cypher 5.18</Badge>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Cytoscape.js canvas mapping corporate parent-subsidiary trees, board connections, and shared IP infrastructure.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm min-h-[500px]">
        <GraphExplorer companyId="cmp-001" />
      </div>
    </div>
  );
};
