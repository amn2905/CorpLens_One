import React, { useState } from 'react';
import { Settings, Users, Key, ToggleLeft, ToggleRight, Activity, Database, Cpu, Wifi, Shield, Copy, RefreshCw, CheckCircle2, AlertTriangle } from 'lucide-react';

interface ApiKey { id: string; name: string; key: string; created: string; last_used: string; scopes: string[]; }
interface AuditEntry { timestamp: string; user: string; action: string; resource: string; result: string; ip: string; }
interface FeatureFlag { id: string; name: string; description: string; enabled: boolean; }

const API_KEYS: ApiKey[] = [
  { id: 'key-001', name: 'Production API Key', key: 'clai_prod_••••••••••••••••••••••••••••••••', created: '2026-01-01', last_used: '2026-07-22', scopes: ['read:companies', 'read:reports', 'write:cases'] },
  { id: 'key-002', name: 'CI/CD Pipeline Key', key: 'clai_ci_••••••••••••••••••••••••••••••••••', created: '2026-03-15', last_used: '2026-07-21', scopes: ['read:companies', 'read:analytics'] },
];

const AUDIT_LOG: AuditEntry[] = [
  { timestamp: '2026-07-22 15:48:23', user: 'sarah.jenkins@acme.com', action: 'LOGIN', resource: 'Auth', result: 'SUCCESS', ip: '192.168.1.10' },
  { timestamp: '2026-07-22 15:42:11', user: 'michael.chen@acme.com', action: 'EXPORT_REPORT', resource: 'Case case-002', result: 'SUCCESS', ip: '192.168.1.12' },
  { timestamp: '2026-07-22 14:30:05', user: 'sarah.jenkins@acme.com', action: 'SANCTIONS_SCREEN', resource: 'cmp-002', result: 'SUCCESS', ip: '192.168.1.10' },
  { timestamp: '2026-07-22 13:15:44', user: 'api_key:key-002', action: 'GET_COMPANY', resource: 'cmp-001', result: 'SUCCESS', ip: '10.0.0.5' },
  { timestamp: '2026-07-22 11:00:30', user: 'admin@corplens.ai', action: 'UPDATE_FEATURE_FLAG', resource: 'supply_chain_intel', result: 'SUCCESS', ip: '127.0.0.1' },
  { timestamp: '2026-07-21 18:22:01', user: 'michael.chen@acme.com', action: 'CREATE_CASE', resource: 'case-002', result: 'SUCCESS', ip: '192.168.1.12' },
];

const SYSTEM_HEALTH = [
  { name: 'Backend API', status: 'Healthy', latency: '18ms', icon: Cpu },
  { name: 'PostgreSQL', status: 'Healthy', latency: '4ms', icon: Database },
  { name: 'Neo4j Graph', status: 'Healthy', latency: '12ms', icon: Activity },
  { name: 'Redis Cache', status: 'Healthy', latency: '1ms', icon: Wifi },
  { name: 'Celery Workers', status: 'Healthy', latency: '—', icon: RefreshCw },
  { name: 'Sanctions Engine', status: 'Healthy', latency: '22ms', icon: Shield },
];

export const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'health' | 'api_keys' | 'features' | 'audit'>('health');
  const [features, setFeatures] = useState<FeatureFlag[]>([
    { id: 'supply_chain_intel', name: 'Supply Chain Intelligence', description: 'Multi-tier vendor dependency mapping and 4th-party risk analysis', enabled: true },
    { id: 'executive_intel', name: 'Executive Intelligence', description: 'Leadership profiles, board mapping, and career timeline analysis', enabled: true },
    { id: 'threat_intel_center', name: 'Threat Intelligence Center', description: 'Public CVE advisory feed with portfolio correlation', enabled: true },
    { id: 'case_management', name: 'Case Management System', description: 'Full investigation lifecycle workflow and analyst task management', enabled: true },
    { id: 'ai_copilot', name: 'AI Intelligence Copilot', description: 'Multi-step reasoning AI assistant with investigation memory', enabled: true },
    { id: 'neo4j_graph', name: 'Graph Explorer (Neo4j)', description: 'Entity relationship topology visualization and traversal', enabled: true },
    { id: 'stix_export', name: 'STIX 2.1 Export', description: 'Threat intelligence export in STIX/TAXII format for SIEM integration', enabled: false },
    { id: 'saml_sso', name: 'SAML 2.0 SSO', description: 'Enterprise single sign-on via Okta, Azure AD, or Ping Identity', enabled: false },
  ]);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const toggleFeature = (id: string) => {
    setFeatures(prev => prev.map(f => f.id === id ? { ...f, enabled: !f.enabled } : f));
  };

  const copyKey = (key: string, id: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      <div className="pb-4 border-b border-white/10">
        <h1 className="text-2xl font-extrabold text-white tracking-wider flex items-center gap-3">
          <Settings className="h-6 w-6 text-white" />
          Enterprise Administration
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Tenant management, API keys, feature flags, system health, and security audit log
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 gap-1">
        {([
          { id: 'health', label: '⚡ System Health' },
          { id: 'api_keys', label: '🔑 API Keys' },
          { id: 'features', label: '🎛️ Feature Flags' },
          { id: 'audit', label: '📋 Audit Log' },
        ] as const).map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 text-[11px] font-extrabold uppercase tracking-wider transition-all ${
              activeTab === tab.id ? 'text-white border-b-2 border-white' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* System Health */}
      {activeTab === 'health' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SYSTEM_HEALTH.map(srv => {
              const Icon = srv.icon;
              return (
                <div key={srv.name} className="glass-panel p-5 rounded-xl border border-white/10 flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-zinc-900 border border-white/20 flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-extrabold text-white text-xs">{srv.name}</div>
                    <div className="text-[10px] font-mono text-zinc-500 mt-0.5">Latency: {srv.latency}</div>
                  </div>
                  <div className="flex items-center gap-1.5 text-[9px] font-black text-white bg-white/10 px-2 py-1 rounded border border-white/20 uppercase">
                    <CheckCircle2 className="h-2.5 w-2.5" /> {srv.status}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="glass-panel p-5 rounded-xl border border-white/10">
            <div className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest mb-4">Platform Architecture</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              {[
                { label: 'API Version', value: 'v2.0.0' },
                { label: 'Backend', value: 'FastAPI / Python 3.11' },
                { label: 'Frontend', value: 'React 18 / TypeScript' },
                { label: 'Graph DB', value: 'Neo4j 5.x' },
                { label: 'Auth', value: 'JWT / SAML 2.0 (UI)' },
                { label: 'Exports', value: 'PDF / CSV / STIX 2.1 (UI)' },
                { label: 'Cache', value: 'Redis 7.x' },
                { label: 'Queue', value: 'Celery + RabbitMQ' },
              ].map(item => (
                <div key={item.label} className="bg-zinc-950 p-3 rounded-xl border border-white/10">
                  <div className="text-[9px] text-zinc-500 uppercase font-bold">{item.label}</div>
                  <div className="text-xs font-mono text-white mt-1">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* API Keys */}
      {activeTab === 'api_keys' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button className="glass-btn-primary px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2">
              <Key className="h-4 w-4" /> Generate New Key
            </button>
          </div>
          {API_KEYS.map(k => (
            <div key={k.id} className="glass-panel p-5 rounded-xl border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-extrabold text-white text-sm">{k.name}</div>
                  <div className="text-[10px] text-zinc-500 font-mono">{k.id} • Created {k.created} • Last used {k.last_used}</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => copyKey(k.key, k.id)} className="glass-btn px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1.5">
                    {copiedKey === k.id ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    {copiedKey === k.id ? 'Copied!' : 'Copy'}
                  </button>
                  <button className="px-3 py-1.5 rounded-lg text-[10px] font-bold border border-zinc-800 text-zinc-500 hover:text-white hover:border-white/30 transition-all">Revoke</button>
                </div>
              </div>
              <div className="font-mono text-[10px] text-zinc-400 bg-zinc-950 px-3 py-2 rounded-lg border border-white/10">{k.key}</div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {k.scopes.map(s => (
                  <span key={s} className="text-[9px] font-mono text-zinc-300 bg-zinc-900 border border-white/10 px-2 py-0.5 rounded">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Feature Flags */}
      {activeTab === 'features' && (
        <div className="space-y-2">
          {features.map(f => (
            <div key={f.id} className="glass-panel p-4 rounded-xl border border-white/10 flex items-center gap-4">
              <button onClick={() => toggleFeature(f.id)} className="shrink-0">
                {f.enabled
                  ? <ToggleRight className="h-7 w-7 text-white" />
                  : <ToggleLeft className="h-7 w-7 text-zinc-600" />
                }
              </button>
              <div className="flex-1">
                <div className={`font-extrabold text-sm ${f.enabled ? 'text-white' : 'text-zinc-500'}`}>{f.name}</div>
                <div className="text-[10px] text-zinc-500 mt-0.5">{f.description}</div>
              </div>
              <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded border ${f.enabled ? 'bg-white text-black border-white' : 'bg-zinc-950 text-zinc-500 border-zinc-800'}`}>
                {f.enabled ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Audit Log */}
      {activeTab === 'audit' && (
        <div className="glass-panel rounded-xl border border-white/10 overflow-hidden">
          <div className="p-4 border-b border-white/10 text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest">Security Audit Log — Last 100 Events</div>
          <table className="w-full text-left">
            <thead className="bg-zinc-950 text-[9px] uppercase text-zinc-500 font-extrabold tracking-widest border-b border-white/10">
              <tr>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Resource</th>
                <th className="py-3 px-4">IP</th>
                <th className="py-3 px-4 text-right">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {AUDIT_LOG.map((entry, i) => (
                <tr key={i} className="hover:bg-zinc-900/30 transition-colors">
                  <td className="py-3 px-4 text-[9px] font-mono text-zinc-500">{entry.timestamp}</td>
                  <td className="py-3 px-4 text-[10px] font-mono text-zinc-200">{entry.user}</td>
                  <td className="py-3 px-4">
                    <span className="text-[9px] font-black uppercase text-white bg-zinc-900 border border-white/10 px-2 py-0.5 rounded">{entry.action}</span>
                  </td>
                  <td className="py-3 px-4 text-[10px] text-zinc-400 font-mono">{entry.resource}</td>
                  <td className="py-3 px-4 text-[9px] font-mono text-zinc-600">{entry.ip}</td>
                  <td className="py-3 px-4 text-right">
                    <span className="text-[9px] font-black bg-white text-black px-2 py-0.5 rounded uppercase">{entry.result}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
