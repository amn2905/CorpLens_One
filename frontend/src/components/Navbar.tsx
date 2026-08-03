import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, Plus, X, AlertTriangle, ShieldCheck, Building, ChevronDown, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { CorpLensLogo } from './Logo';

interface NavbarProps {
  onOpenNewScan: () => void;
  onSearch: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenNewScan, onSearch }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [tenant, setTenant] = useState('Enterprise Sentinel Ops');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const notifications = [
    { id: 'n-1', title: 'CRITICAL CVE DETECTED', msg: 'CVE-2024-21626 (Container breakout) flagged on Nexus Dynamics', time: '10m ago', type: 'critical' },
    { id: 'n-2', title: 'SANCTION WATCHLIST MATCH', msg: 'Fuzzy match 84% on OFAC SDN for Nexus Commercial Trading', time: '1h ago', type: 'warning' },
    { id: 'n-3', title: 'OSINT SCAN COMPLETE', msg: 'Acme Global Financial Group digital footprint updated', time: '3h ago', type: 'info' }
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="h-16 border-b border-slate-200 sticky top-0 z-40 flex items-center justify-between px-6 bg-white shadow-sm font-sans">
      {/* Top blue accent line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-blue-600" />

      {/* Brand & Tagline */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')} title="CorpLens One — One platform for intelligence, investigations, compliance, risk, and AI.">
          <CorpLensLogo size={36} />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base text-slate-900 tracking-tight font-heading group-hover:text-blue-600 transition-colors">
                CorpLens One
              </span>
              <span className="text-[9px] bg-blue-50 text-blue-600 border border-blue-200 px-2 py-0.5 rounded-md font-mono font-bold uppercase tracking-wider">
                v1.0.0
              </span>
            </div>
            <span className="text-[11px] text-slate-600 font-bold block -mt-0.5 font-sans hidden xl:block">
              The Operating System for Enterprise Intelligence
            </span>
          </div>
        </div>

        {/* Tenant Switcher */}
        <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-slate-200 text-xs font-mono">
          <Building className="w-3.5 h-3.5 text-blue-600" />
          <select
            value={tenant}
            onChange={(e) => setTenant(e.target.value)}
            className="bg-slate-100 border border-slate-200 text-slate-800 font-bold rounded-lg px-2.5 py-1 text-[11px] outline-none cursor-pointer hover:bg-slate-200 transition-colors"
          >
            <option value="Enterprise Sentinel Ops">Tenant: Global Risk Ops</option>
            <option value="US East Division">Tenant: US East Division</option>
            <option value="EMEA Compliance Group">Tenant: EMEA Compliance</option>
          </select>
        </div>
      </div>

      {/* Global Unified Search Bar */}
      <div className="flex-1 max-w-lg mx-6 relative">
        <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
        <input
          ref={searchInputRef}
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); onSearch(e.target.value); }}
          placeholder="Global Search (companies, CVEs, OFAC SDN, executives)..."
          className="w-full bg-slate-100 border border-slate-200 rounded-xl pl-10 pr-14 py-2 text-xs font-mono text-slate-900 focus:bg-white focus:border-blue-600 transition-all outline-none"
        />
        <kbd className="absolute right-3 top-2 text-[10px] text-slate-400 font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 pointer-events-none">
          Ctrl+K
        </kbd>
      </div>

      {/* Right Action Bar */}
      <div className="flex items-center gap-3 relative">
        <button
          onClick={onOpenNewScan}
          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all shadow-sm"
        >
          <Plus className="h-4 w-4 stroke-[3]" />
          + New Investigation
        </button>

        {/* Notifications */}
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="p-2 text-slate-600 hover:text-slate-900 rounded-xl relative transition-all border border-slate-200 hover:bg-slate-100"
          title="High-Priority Alerts"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-blue-600 animate-ping" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-blue-600" />
        </button>

        {/* User Pill */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs shadow-sm">
            AS
          </div>
          <div className="hidden xl:block text-left text-[11px]">
            <span className="font-bold text-slate-900 block leading-tight">Alex Sterling</span>
            <span className="text-slate-500 text-[10px]">Lead Security Analyst</span>
          </div>
        </div>

        {/* Notification Drawer */}
        {showNotifications && (
          <div className="absolute right-12 top-14 w-80 bg-white rounded-2xl p-4 space-y-3 z-50 border border-slate-200 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-bold text-slate-900 tracking-wider flex items-center gap-1.5 font-heading">
                <Bell className="h-3.5 w-3.5 text-blue-600" />
                Sentinel High-Priority Alerts
              </span>
              <button onClick={() => setShowNotifications(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {notifications.map((n) => (
                <div key={n.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-[11px] font-heading">{n.title}</span>
                    <span className="text-[9px] font-mono text-slate-400">{n.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug font-sans">{n.msg}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
