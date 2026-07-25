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
            'background-color': '#27272a',
            'label': 'data(label)',
            'color': '#ffffff',
            'font-size': '11px',
            'font-weight': 'bold',
            'font-family': 'monospace',
            'text-valign': 'bottom',
            'text-margin-y': 6,
            'width': 36,
            'height': 36,
            'border-width': 2,
            'border-color': '#ffffff'
          }
        },
        {
          selector: 'node[type = "Company"]',
          style: {
            'background-color': '#ffffff',
            'color': '#ffffff',
            'width': 48,
            'height': 48,
            'border-width': 4,
            'border-color': '#a1a1aa'
          }
        },
        {
          selector: 'node[type = "CVE"]',
          style: {
            'background-color': '#000000',
            'shape': 'diamond',
            'width': 34,
            'height': 34,
            'border-width': 2,
            'border-color': '#ffffff'
          }
        },
        {
          selector: 'node[type = "Sanctions"]',
          style: {
            'background-color': '#ffffff',
            'shape': 'star',
            'width': 40,
            'height': 40,
            'border-width': 2,
            'border-color': '#000000'
          }
        },
        {
          selector: 'node[type = "CloudProvider"]',
          style: {
            'background-color': '#52525b',
            'shape': 'round-rectangle',
            'width': 42,
            'height': 42
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 2,
            'line-color': '#52525b',
            'target-arrow-color': '#a1a1aa',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            'label': 'data(label)',
            'font-size': '9px',
            'color': '#a1a1aa',
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
    <div className="w-full h-full min-h-[550px] relative rounded-2xl border border-white/10 bg-black/90 overflow-hidden">
      <div className="absolute top-4 left-4 z-10 bg-zinc-950/90 border border-white/20 p-3.5 rounded-xl text-xs space-y-2 backdrop-blur-xl shadow-xl">
        <div className="font-extrabold text-white uppercase tracking-wider flex items-center justify-between gap-4">
          <span>Neo4j Graph Topology</span>
          <span className="font-mono text-[10px] text-black bg-white px-2 py-0.5 rounded font-black">
            {nodeCount} NODES
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-[10px] text-zinc-400 font-mono">
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-white border border-black"/> Company Target</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-zinc-600"/> Cloud Supplier</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rotate-45 bg-black border border-white"/> CVE Vulnerability</span>
        </div>
      </div>
      <div ref={containerRef} className="w-full h-full min-h-[550px]" />
    </div>
  );
};
