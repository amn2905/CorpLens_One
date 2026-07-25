import React, { useState, useEffect } from 'react';
import { Network, Filter, Building2, RefreshCw } from 'lucide-react';
import { GraphExplorer } from '../components/GraphExplorer';
import { api, mockCompanies } from '../services/api';
import { Company } from '../types';

export const GraphPage: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>(mockCompanies);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>('');
  const [layoutName, setLayoutName] = useState<string>('breadthfirst');

  useEffect(() => {
    api.getCompanies().then(setCompanies);
  }, []);

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-wider flex items-center gap-3">
            <Network className="h-6 w-6 text-white" />
            Graph Intelligence & Relationship Explorer (Neo4j)
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Visualizing multi-entity connections across Target Cases, Domains, Cloud Infrastructure, and CVE exposure.
          </p>
        </div>

        {/* Case Target Selector Dropdown */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-zinc-950 p-1.5 rounded-xl border border-white/10">
            <Building2 className="h-4 w-4 text-white ml-2" />
            <select
              value={selectedCompanyId}
              onChange={(e) => setSelectedCompanyId(e.target.value)}
              className="bg-transparent text-xs text-white font-bold py-1 pr-3 focus:outline-none cursor-pointer"
            >
              <option value="" className="bg-black text-white">All Target Cases (Global Topology)</option>
              {companies.map((comp) => (
                <option key={comp.id} value={comp.id} className="bg-black text-white">
                  Case: {comp.name} ({comp.primary_domain})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 bg-zinc-950 p-1.5 rounded-xl border border-white/10">
            <Filter className="h-3.5 w-3.5 text-zinc-400 ml-2" />
            <select
              value={layoutName}
              onChange={(e) => setLayoutName(e.target.value)}
              className="bg-transparent text-xs text-zinc-300 font-mono py-1 pr-3 focus:outline-none cursor-pointer"
            >
              <option value="breadthfirst" className="bg-black text-white">Breadthfirst Layout</option>
              <option value="cose" className="bg-black text-white">Physics Force (Cose)</option>
              <option value="concentric" className="bg-black text-white">Concentric Circles</option>
              <option value="circle" className="bg-black text-white">Ring Radial</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full min-h-0">
        <GraphExplorer companyId={selectedCompanyId || undefined} layoutName={layoutName} />
      </div>
    </div>
  );
};
