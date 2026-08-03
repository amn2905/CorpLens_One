import React, { useEffect, useRef, useState } from 'react';
import cytoscape from 'cytoscape';
import { api } from '../services/api';

interface GraphExplorerProps {
  companyId?: string;
  layoutName?: string;
}

export const GraphExplorer: React.FC<GraphExplorerProps> = ({ companyId, layoutName = 'breadthfirst' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [graphData, setGraphData] = useState<{ nodes: any[]; edges: any[] }>({ nodes: [], edges: [] });
  const [nodeCount, setNodeCount] = useState(0);

  useEffect(() => {
    api.getGraphTopology(companyId).then((data) => {
      setGraphData(data);
      setNodeCount(data.nodes?.length || 0);
    });
  }, [companyId]);

  useEffect(() => {
    if (!containerRef.current || !graphData.nodes.length) return;

    const cy = cytoscape({
      container: containerRef.current,
      style: [
        {
          selector: 'node',
          style: {
            'background-color': '#EEF6FF',
            'label': 'data(label)',
            'color': '#1E293B',
            'font-size': '11px',
            'font-weight': 'bold',
            'font-family': 'Inter, sans-serif',
            'text-valign': 'bottom',
            'text-margin-y': 6,
            'width': 38,
            'height': 38,
            'border-width': 2,
            'border-color': '#3B82F6'
          }
        },
        {
          selector: 'node[type = "Company"]',
          style: {
            'background-color': '#3B82F6',
            'color': '#1E293B',
            'width': 48,
            'height': 48,
            'border-width': 3,
            'border-color': '#DCE7F5'
          }
        },
        {
          selector: 'node[type = "CVE"]',
          style: {
            'background-color': '#EF4444',
            'shape': 'diamond',
            'color': '#1E293B',
            'width': 34,
            'height': 34,
            'border-width': 2,
            'border-color': '#FCA5A5'
          }
        },
        {
          selector: 'node[type = "Sanctions"]',
          style: {
            'background-color': '#F59E0B',
            'shape': 'star',
            'color': '#1E293B',
            'width': 40,
            'height': 40,
            'border-width': 2,
            'border-color': '#FDE68A'
          }
        },
        {
          selector: 'node[type = "CloudProvider"]',
          style: {
            'background-color': '#64748B',
            'shape': 'round-rectangle',
            'color': '#1E293B',
            'width': 42,
            'height': 42
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 2,
            'line-color': '#93C5FD',
            'target-arrow-color': '#3B82F6',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            'label': 'data(label)',
            'font-size': '9px',
            'color': '#64748B',
            'text-rotation': 'autorotate'
          }
        }
      ],
      elements: [...graphData.nodes, ...graphData.edges],
      layout: {
        name: layoutName as any,
        directed: true,
        padding: 40
      }
    });

    return () => cy.destroy();
  }, [graphData, layoutName]);

  return (
    <div className="w-full h-full min-h-[550px] relative clay-panel bg-white overflow-hidden">
      <div className="absolute top-4 left-4 z-10 bg-white/95 border border-[#DCE7F5] p-3.5 rounded-[16px] text-xs space-y-2 backdrop-blur-md shadow-sm">
        <div className="font-extrabold text-[#1E293B] uppercase tracking-wider flex items-center justify-between gap-4 font-heading">
          <span>Neo4j Graph Topology</span>
          <span className="font-mono text-[10px] text-[#3B82F6] bg-[#EEF6FF] border border-[#DCE7F5] px-2 py-0.5 rounded-full font-bold">
            {nodeCount} NODES
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-[10px] text-[#64748B] font-mono">
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]"/> Company Target</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-[#64748B]"/> Cloud Supplier</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rotate-45 bg-[#EF4444]"/> CVE Vulnerability</span>
        </div>
      </div>
      <div ref={containerRef} className="w-full h-full min-h-[550px]" />
    </div>
  );
};
