import React, { useState } from 'react';
import { GitBranch, ChevronRight, ChevronDown, Shield, Cloud, Cpu, Package, AlertTriangle } from 'lucide-react';

interface SupplyNode {
  id: string;
  name: string;
  type: 'Company' | 'Supplier' | 'SubProcessor' | 'CloudProvider' | 'TechVendor' | 'Dependency';
  riskScore?: number;
  riskTier?: string;
  domain?: string;
  country?: string;
  children?: SupplyNode[];
}

const SUPPLY_CHAIN_DATA: SupplyNode = {
  id: 'cmp-001',
  name: 'Acme Global Financial Group',
  type: 'Company',
  riskScore: 28.5, riskTier: 'Low', domain: 'acmeglobal.com', country: 'United States',
  children: [
    {
      id: 'sup-cf', name: 'Cloudflare Inc.', type: 'Supplier',
      riskScore: 12.0, riskTier: 'Low', domain: 'cloudflare.com', country: 'United States',
      children: [
        { id: 'sp-cf-1', name: 'Cloudflare Anycast Backbone', type: 'SubProcessor', riskScore: 8.0, riskTier: 'Low', country: 'Global' },
        { id: 'sp-cf-2', name: 'Cloudflare R2 Storage', type: 'SubProcessor', riskScore: 10.0, riskTier: 'Low', country: 'United States' }
      ]
    },
    {
      id: 'sup-aws', name: 'Amazon Web Services (AWS)', type: 'CloudProvider',
      riskScore: 15.0, riskTier: 'Low', domain: 'aws.amazon.com', country: 'United States',
      children: [
        { id: 'sp-aws-1', name: 'AWS KMS — Encryption Management', type: 'SubProcessor', riskScore: 7.0, riskTier: 'Low', country: 'United States' },
        { id: 'sp-aws-2', name: 'AWS CloudFront CDN', type: 'SubProcessor', riskScore: 8.0, riskTier: 'Low', country: 'Global' },
        { id: 'sp-aws-3', name: 'AWS RDS PostgreSQL', type: 'SubProcessor', riskScore: 10.0, riskTier: 'Low', country: 'us-east-1' }
      ]
    },
    {
      id: 'sup-digicert', name: 'DigiCert SSL Authority', type: 'Supplier',
      riskScore: 9.0, riskTier: 'Low', domain: 'digicert.com', country: 'United States',
      children: []
    },
    {
      id: 'tech-nginx', name: 'Nginx Open Source (F5)', type: 'TechVendor',
      riskScore: 22.0, riskTier: 'Low', domain: 'nginx.org',
      children: [
        { id: 'dep-nginx-1', name: 'CVE-2023-38606 (HTTP/2 Reset)', type: 'Dependency', riskScore: 53.0, riskTier: 'Medium' }
      ]
    },
    {
      id: 'tech-react', name: 'React Framework (Meta OSS)', type: 'TechVendor',
      riskScore: 5.0, riskTier: 'Low', domain: 'react.dev',
      children: []
    }
  ]
};

const RISK_COLORS: Record<string, string> = {
  Low: 'bg-zinc-900 border-white/20 text-white',
  Medium: 'bg-zinc-800 border-white/30 text-white',
  High: 'bg-white border-white text-black',
  Critical: 'bg-white border-white text-black',
};

const TYPE_ICONS: Record<string, React.ReactNode> = {
  Company: <Shield className="h-4 w-4" />,
  Supplier: <Package className="h-4 w-4" />,
  SubProcessor: <GitBranch className="h-3.5 w-3.5" />,
  CloudProvider: <Cloud className="h-4 w-4" />,
  TechVendor: <Cpu className="h-4 w-4" />,
  Dependency: <AlertTriangle className="h-3.5 w-3.5" />,
};

const SupplyNodeCard: React.FC<{ node: SupplyNode; depth: number }> = ({ node, depth }) => {
  const [expanded, setExpanded] = useState(depth < 2);
  const hasChildren = node.children && node.children.length > 0;
  const indentClass = depth === 0 ? '' : depth === 1 ? 'ml-8' : depth === 2 ? 'ml-16' : 'ml-24';

  return (
    <div className={`space-y-2 ${indentClass}`}>
      <div className={`glass-card p-4 rounded-xl border ${RISK_COLORS[node.riskTier || 'Low']} transition-all`}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-zinc-900/80 border border-white/10 flex items-center justify-center text-zinc-300 shrink-0">
              {TYPE_ICONS[node.type]}
            </div>
            <div>
              <div className="font-extrabold text-sm leading-tight">{node.name}</div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[9px] font-mono opacity-60 uppercase tracking-wider">{node.type}</span>
                {node.domain && <span className="text-[9px] font-mono opacity-50">{node.domain}</span>}
                {node.country && <span className="text-[9px] opacity-40">• {node.country}</span>}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {node.riskScore !== undefined && (
              <div className="text-right">
                <div className="font-extrabold font-mono text-xs">{node.riskScore} / 100</div>
                <div className="text-[9px] opacity-60">{node.riskTier} Risk</div>
              </div>
            )}
            {hasChildren && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="h-6 w-6 rounded border border-white/20 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity"
              >
                {expanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
              </button>
            )}
          </div>
        </div>
      </div>

      {hasChildren && expanded && (
        <div className="space-y-2 border-l-2 border-white/10 ml-4 pl-2">
          {node.children!.map(child => (
            <SupplyNodeCard key={child.id} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export const SupplyChainPage: React.FC = () => {
  const [selectedCompany, setSelectedCompany] = useState('cmp-001');

  return (
    <div className="p-8 space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-wider flex items-center gap-3">
            <GitBranch className="h-6 w-6 text-white" />
            Supply Chain Intelligence
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Multi-level dependency mapping — Company → Suppliers → Sub-Processors → Cloud → Tech Vendors
          </p>
        </div>
        <select
          value={selectedCompany}
          onChange={e => setSelectedCompany(e.target.value)}
          className="glass-input px-3 py-2 rounded-lg text-xs font-bold"
        >
          <option value="cmp-001" className="bg-black">Acme Global Financial Group</option>
          <option value="cmp-002" className="bg-black">Nexus Dynamics Defense</option>
        </select>
      </div>

      {/* Risk Summary Bar */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Tier 1 Suppliers', value: 3, sub: 'Direct dependencies', },
          { label: 'Sub-Processors', value: 5, sub: 'Secondary cloud processors' },
          { label: '4th-Party Overlap', value: 1, sub: 'Shared with Nexus Dynamics' },
        ].map(s => (
          <div key={s.label} className="glass-panel p-4 rounded-xl border border-white/10">
            <div className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest">{s.label}</div>
            <div className="text-2xl font-extrabold text-white font-mono mt-1">{s.value}</div>
            <div className="text-[10px] text-zinc-600 mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="glass-panel p-6 rounded-2xl border border-white/10">
        <div className="text-xs font-extrabold text-zinc-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <GitBranch className="h-3.5 w-3.5" />
          Interactive Supply Chain Tree — {selectedCompany === 'cmp-001' ? 'Acme Global Financial Group' : 'Nexus Dynamics Defense'}
        </div>
        <div className="space-y-2">
          <SupplyNodeCard node={SUPPLY_CHAIN_DATA} depth={0} />
        </div>
      </div>

      <div className="bg-zinc-950 border border-white/10 rounded-xl p-4 text-xs text-zinc-400 leading-relaxed">
        <span className="font-bold text-white">⚠️ 4th-Party Concentration Risk: </span>
        Both <span className="text-white font-mono">Acme Global</span> and <span className="text-white font-mono">Nexus Dynamics</span> share Amazon Web Services (AWS us-east-1) as a cloud infrastructure provider. A single AWS region outage creates a correlated risk event across your tracked portfolio.
      </div>
    </div>
  );
};
