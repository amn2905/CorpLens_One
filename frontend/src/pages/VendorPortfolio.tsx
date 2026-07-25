import React, { useState } from 'react';
import { Briefcase, CheckCircle2, AlertTriangle, ShieldCheck, Plus, X, ChevronRight, Globe, Calendar, Cpu } from 'lucide-react';
import { RiskBadge } from '../components/RiskBadge';

interface Vendor {
  id: string;
  name: string;
  domain: string;
  tier: string;
  service: string;
  riskScore: number;
  sigScore: string;
  status: string;
  country: string;
  lastAssessment: string;
  cves: number;
  techStack: string[];
  complianceFlags: string[];
}

const VENDORS: Vendor[] = [
  {
    id: 'vnd-001', name: 'Amazon Web Services (AWS)', domain: 'aws.amazon.com',
    tier: 'Tier 1 — Critical', service: 'Cloud Hosting Infrastructure & IaaS',
    riskScore: 18.2, sigScore: '96.5 / 100', status: 'Compliant',
    country: 'United States', lastAssessment: '2026-07-01',
    cves: 0, techStack: ['AWS EC2', 'AWS S3', 'AWS RDS', 'AWS KMS'],
    complianceFlags: ['SOC 2 Type II ✓', 'ISO 27001 ✓', 'PCI DSS ✓', 'FedRAMP ✓']
  },
  {
    id: 'vnd-002', name: 'Stripe Payment Gateway', domain: 'stripe.com',
    tier: 'Tier 1 — Critical', service: 'Credit Card & PCI DSS Payment Processing',
    riskScore: 22.4, sigScore: '98.0 / 100', status: 'Compliant',
    country: 'United States', lastAssessment: '2026-06-15',
    cves: 0, techStack: ['Stripe API', 'TLS 1.3', 'PCI DSS v4.0'],
    complianceFlags: ['PCI DSS Level 1 ✓', 'SOC 2 Type II ✓', 'ISO 27001 ✓']
  },
  {
    id: 'vnd-003', name: 'Nexus Dynamics Tech', domain: 'nexusdynamics.io',
    tier: 'Tier 2 — High Risk', service: 'Contractor Software Engineering',
    riskScore: 68.4, sigScore: '71.0 / 100', status: 'Under Assessment',
    country: 'Unknown', lastAssessment: '2026-07-18',
    cves: 2, techStack: ['WordPress 6.1.1', 'Apache 2.4.41', 'Containerd'],
    complianceFlags: ['SOC 2 — Not Verified ⚠️', 'OFAC Match Under Review ⚠️']
  },
  {
    id: 'vnd-004', name: 'Cloudflare Inc.', domain: 'cloudflare.com',
    tier: 'Tier 1 — Critical', service: 'WAF, CDN & DDoS Protection',
    riskScore: 12.0, sigScore: '99.0 / 100', status: 'Compliant',
    country: 'United States', lastAssessment: '2026-07-10',
    cves: 0, techStack: ['Cloudflare WAF', 'Anycast CDN', 'Workers'],
    complianceFlags: ['SOC 2 Type II ✓', 'ISO 27001 ✓', 'GDPR ✓', 'HIPAA ✓']
  },
];

const STATUS_STYLE: Record<string, string> = {
  'Compliant': 'bg-white text-black border-white',
  'Under Assessment': 'bg-zinc-800 text-white border-zinc-600',
  'Non-Compliant': 'bg-zinc-900 text-zinc-400 border-zinc-700'
};

export const VendorPortfolio: React.FC = () => {
  const [selected, setSelected] = useState<Vendor | null>(null);
  const [filterTier, setFilterTier] = useState('All');

  const filtered = filterTier === 'All' ? VENDORS : VENDORS.filter(v => v.tier.includes(filterTier));
  const avgRisk = (VENDORS.reduce((s, v) => s + v.riskScore, 0) / VENDORS.length).toFixed(1);

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-wider flex items-center gap-3">
            <Briefcase className="h-6 w-6 text-white" />
            Vendor & Third-Party Risk Management
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Continuous OSINT re-assessment, tiering, and SIG questionnaire compliance tracking
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select value={filterTier} onChange={e => setFilterTier(e.target.value)} className="glass-input px-3 py-2 rounded-lg text-xs font-bold">
            <option value="All" className="bg-black">All Tiers</option>
            <option value="Critical" className="bg-black">Tier 1 — Critical</option>
            <option value="High" className="bg-black">Tier 2 — High Risk</option>
          </select>
          <button className="glass-btn-primary px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2">
            <Plus className="h-4 w-4 stroke-[3]" /> Add Vendor
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Vendors', value: VENDORS.length },
          { label: 'Tier 1 Critical', value: VENDORS.filter(v => v.tier.includes('Critical')).length },
          { label: 'Pending Assessment', value: VENDORS.filter(v => v.status === 'Under Assessment').length },
          { label: 'Avg Risk Score', value: avgRisk },
        ].map(s => (
          <div key={s.label} className="glass-panel p-4 rounded-xl border border-white/10">
            <div className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest">{s.label}</div>
            <div className="text-3xl font-extrabold text-white font-mono mt-1">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Vendor Table */}
      <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden">
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-xs font-extrabold text-white uppercase tracking-wider">Vendor Inventory & OSINT Risk Score</h2>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-950 text-[10px] uppercase text-zinc-500 font-extrabold tracking-widest border-b border-white/10">
            <tr>
              <th className="py-3.5 px-6">Vendor Name</th>
              <th className="py-3.5 px-4">Risk Tier</th>
              <th className="py-3.5 px-4">Service</th>
              <th className="py-3.5 px-4">OSINT Score</th>
              <th className="py-3.5 px-4">SIG Score</th>
              <th className="py-3.5 px-6 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.map(v => (
              <tr
                key={v.id}
                onClick={() => setSelected(v)}
                className="hover:bg-zinc-900/40 cursor-pointer transition-colors"
              >
                <td className="py-4 px-6">
                  <div className="font-extrabold text-white text-xs">{v.name}</div>
                  <div className="text-[10px] font-mono text-zinc-400">{v.domain}</div>
                </td>
                <td className="py-4 px-4 text-xs font-bold text-zinc-300">{v.tier}</td>
                <td className="py-4 px-4 text-xs text-zinc-500">{v.service}</td>
                <td className="py-4 px-4"><RiskBadge score={v.riskScore} /></td>
                <td className="py-4 px-4 text-xs font-mono text-zinc-200 font-bold">{v.sigScore}</td>
                <td className="py-4 px-6 text-right">
                  <span className={`text-[9px] px-2.5 py-1 rounded font-black uppercase border ${STATUS_STYLE[v.status]}`}>{v.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Vendor Detail Slide-in Panel */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-end">
          <div className="w-full max-w-xl h-full glass-panel border-l border-white/20 flex flex-col overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-white/10 flex items-start justify-between gap-4">
              <div>
                <div className="text-[10px] font-mono text-zinc-500 uppercase">{selected.id}</div>
                <h2 className="font-extrabold text-white text-base mt-0.5">{selected.name}</h2>
                <div className="text-xs font-mono text-zinc-400 mt-0.5">{selected.domain} • {selected.country}</div>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`text-[9px] px-2.5 py-1 rounded font-black uppercase border ${STATUS_STYLE[selected.status]}`}>{selected.status}</span>
                  <span className="text-[9px] text-zinc-500 font-mono">{selected.tier}</span>
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="text-zinc-500 hover:text-white"><X className="h-5 w-5" /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-zinc-950 p-3.5 rounded-xl border border-white/10">
                  <div className="text-[9px] text-zinc-500 uppercase font-bold">OSINT Risk Score</div>
                  <div className="text-xl font-extrabold text-white font-mono">{selected.riskScore} / 100</div>
                </div>
                <div className="bg-zinc-950 p-3.5 rounded-xl border border-white/10">
                  <div className="text-[9px] text-zinc-500 uppercase font-bold">SIG Questionnaire</div>
                  <div className="text-xl font-extrabold text-white font-mono">{selected.sigScore}</div>
                </div>
              </div>

              <div>
                <div className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest mb-2 flex items-center gap-1.5"><Cpu className="h-3.5 w-3.5" /> Detected Technology Stack</div>
                <div className="flex flex-wrap gap-1.5">
                  {selected.techStack.map(t => (
                    <span key={t} className="text-[10px] font-mono text-zinc-200 bg-zinc-900 border border-white/10 px-2.5 py-1 rounded">{t}</span>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest mb-2 flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5" /> Compliance Status</div>
                <div className="space-y-1.5">
                  {selected.complianceFlags.map(f => (
                    <div key={f} className={`text-[10px] font-mono px-3 py-1.5 rounded-lg border ${f.includes('✓') ? 'bg-zinc-950 text-zinc-200 border-white/10' : 'bg-white text-black border-white'}`}>{f}</div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest mb-2 flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> Assessment History</div>
                <div className="text-xs text-zinc-300 bg-zinc-950 p-3 rounded-xl border border-white/10 font-mono">
                  Last Assessment: {selected.lastAssessment}<br />
                  Active CVEs: {selected.cves}<br />
                  Service: {selected.service}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
