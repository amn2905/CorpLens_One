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
}) => {
  const [selectedCell, setSelectedCell] = useState<VendorHeatmapNode | null>(vendors[0] || null);

  const getCellColor = (risk: number) => {
    if (risk >= 8.5) return '#1D4ED8';
    if (risk >= 6.5) return '#2563EB';
    if (risk >= 4.5) return '#3B82F6';
    if (risk >= 2.5) return '#93C5FD';
    return '#DBEAFE';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 font-sans">
      {/* 10x10 Heatmap Grid */}
      <div className="lg:col-span-8 grid grid-cols-10 gap-1.5 p-3.5 rounded-[20px] bg-[#F4F9FF] border border-[#DCE7F5]">
        {vendors.slice(0, 100).map((v) => {
          const isSelected = selectedCell?.id === v.id;
          const bg = getCellColor(v.risk_score);
          return (
            <button
              key={v.id}
              onClick={() => setSelectedCell(v)}
              title={`${v.name} | Risk: ${v.risk_score}`}
              className={`h-7 w-full rounded-[6px] transition-all transform hover:scale-105 ${
                isSelected ? 'ring-2 ring-[#3B82F6] scale-105 z-10 shadow-md' : ''
              }`}
              style={{ backgroundColor: bg }}
            />
          );
        })}
      </div>

      {/* Selected Vendor Detail Panel */}
      <div className="lg:col-span-4 rounded-[20px] border border-[#DCE7F5] bg-[#F4F9FF] p-4 flex flex-col justify-between">
        {selectedCell ? (
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h5 className="font-extrabold text-sm text-[#1E293B] font-heading">
                  {selectedCell.name}
                </h5>
                <p className="text-xs font-mono text-[#3B82F6] font-bold">
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
                Score {selectedCell.risk_score}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono py-2 border-y border-[#DCE7F5] text-[#64748B]">
              <div>
                <span className="text-[#94A3B8] text-[10px] uppercase font-bold block">DEPENDENCY WEIGHT</span>
                <span className="font-bold text-[#1E293B]">{(selectedCell.dependency_weight * 100).toFixed(0)}%</span>
              </div>
              <div>
                <span className="text-[#94A3B8] text-[10px] uppercase font-bold block">CRITICAL CVES</span>
                <span className={selectedCell.criticalCVEs > 0 ? 'font-bold text-rose-600' : 'text-[#64748B]'}>
                  {selectedCell.criticalCVEs} Advisories
                </span>
              </div>
            </div>

            <p className="text-xs text-[#64748B]">
              Industry: <strong className="text-[#1E293B]">{selectedCell.industry}</strong>
            </p>

            <button className="clay-button-secondary w-full py-2 text-xs font-bold">
              Inspect Entity Telemetry →
            </button>
          </div>
        ) : (
          <div className="text-xs text-[#94A3B8] text-center py-10 italic">
            Click any cell in the heatmap matrix to view vendor telemetry.
          </div>
        )}
      </div>
    </div>
  );
};
