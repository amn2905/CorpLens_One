import React, { useState } from 'react';
import { Badge } from './Badge';

export interface VendorHeatmapNode {
  id: string;
  name: string;
  domain: string;
  risk_score: number;
  dependency_weight: number;
  industry: string;
  criticalCVEs: number;
}

const GENERATE_MOCK_HEATMAP_DATA = (): VendorHeatmapNode[] => {
  const sampleNames = [
    'Acme Financial', 'Nexus Dynamics', 'CloudScale Inc', 'Apex Cyber',
    'Aegis Defense', 'Vortex Systems', 'Quantum Bio', 'Titan Energy',
    'Starlight Comms', 'Veritas Logistics', 'Hyperion Aerospace', 'Cygnus Media'
  ];

  const result: VendorHeatmapNode[] = [];
  for (let i = 1; i <= 100; i++) {
    const name = `${sampleNames[(i - 1) % sampleNames.length]} #${Math.ceil(i / 12)}`;
    const risk = Number((((i * 37) % 95) / 10 + 0.5).toFixed(1));
    const dep = Number((((i * 13) % 90) / 100 + 0.1).toFixed(2));
    result.push({
      id: `v-${i}`,
      name,
      domain: `${name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
      risk_score: risk,
      dependency_weight: dep,
      industry: i % 2 === 0 ? 'Software & Cloud' : 'Defense & FinTech',
      criticalCVEs: risk > 7.0 ? Math.floor(risk * 1.5) : 0,
    });
  }
  return result;
};

export interface RiskHeatmapProps {
  vendors?: VendorHeatmapNode[];
  title?: string;
  subtitle?: string;
}

export const RiskHeatmap: React.FC<RiskHeatmapProps> = ({
  vendors = GENERATE_MOCK_HEATMAP_DATA(),
  title = 'Vendor Risk Heatmap',
  subtitle = 'Relational probability vs Risk probability density matrix',
}) => {
  const [selectedCell, setSelectedCell] = useState<VendorHeatmapNode | null>(vendors[0] || null);

  // Light theme blue gradient shades matching the prototype image
  const getCellColor = (risk: number) => {
    if (risk >= 8.5) return '#1d4ed8'; // Dark Blue
    if (risk >= 6.5) return '#2563eb'; // Blue
    if (risk >= 4.5) return '#3b82f6'; // Bright Blue
    if (risk >= 2.5) return '#93c5fd'; // Light Blue
    return '#dbeafe'; // Very Light Blue
  };

  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
        <div>
          <h4 className="text-sm font-bold text-slate-900 font-heading tracking-wide">
            {title}
          </h4>
          <p className="text-xs text-slate-500">{subtitle}</p>
        </div>

        {/* Prototype Gradient Legend */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-400">Low</span>
          <div className="flex gap-1">
            <span className="w-4 h-4 rounded bg-blue-100" />
            <span className="w-4 h-4 rounded bg-blue-300" />
            <span className="w-4 h-4 rounded bg-blue-500" />
            <span className="w-4 h-4 rounded bg-blue-600" />
            <span className="w-4 h-4 rounded bg-blue-800" />
          </div>
          <span className="text-slate-400">High</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* 10x10 Heatmap Grid */}
        <div className="lg:col-span-8 grid grid-cols-10 gap-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
          {vendors.slice(0, 100).map((v) => {
            const isSelected = selectedCell?.id === v.id;
            const bg = getCellColor(v.risk_score);
            return (
              <button
                key={v.id}
                onClick={() => setSelectedCell(v)}
                title={`${v.name} | Risk: ${v.risk_score}`}
                className={`h-7 w-full rounded transition-all transform hover:scale-105 ${
                  isSelected ? 'ring-2 ring-blue-600 scale-105 z-10 shadow-md' : ''
                }`}
                style={{ backgroundColor: bg }}
              />
            );
          })}
        </div>

        {/* Selected Vendor Detail Panel */}
        <div className="lg:col-span-4 rounded-xl border border-slate-200 bg-slate-50 p-4 flex flex-col justify-between">
          {selectedCell ? (
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h5 className="font-bold text-sm text-slate-900 font-heading">
                    {selectedCell.name}
                  </h5>
                  <p className="text-xs font-mono text-blue-600">
                    {selectedCell.domain}
                  </p>
                </div>
                <Badge
                  variant={
                    selectedCell.risk_score >= 7.0
                      ? 'critical'
                      : selectedCell.risk_score >= 4.0
                      ? 'medium'
                      : 'low'
                  }
                >
                  Risk {selectedCell.risk_score}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono py-2 border-y border-slate-200 text-slate-600">
                <div>
                  <span className="text-slate-400 text-[10px] block">DEPENDENCY WEIGHT</span>
                  <span className="font-bold text-slate-900">{(selectedCell.dependency_weight * 100).toFixed(0)}%</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">CRITICAL CVES</span>
                  <span className={selectedCell.criticalCVEs > 0 ? 'font-bold text-rose-600' : 'text-slate-600'}>
                    {selectedCell.criticalCVEs} Advisories
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600">
                Industry: <strong className="text-slate-900">{selectedCell.industry}</strong>
              </p>

              <button className="w-full mt-2 bg-white border border-slate-300 hover:bg-slate-100 py-1.5 rounded-lg text-xs font-bold text-slate-800 transition-colors shadow-sm">
                Inspect Entity Intelligence →
              </button>
            </div>
          ) : (
            <div className="text-xs text-slate-400 text-center py-10">
              Click any cell in the heatmap to view vendor detail.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
