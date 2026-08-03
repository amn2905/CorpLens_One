import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, Plus, X, Building, Command } from 'lucide-react';
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
    <header className="h-16 sticky top-3 z-40 flex items-center justify-between px-5 bg-white border border-[#DCE7F5] rounded-[20px] shadow-[0_6px_18px_rgba(120,160,210,0.15)] mb-4 font-sans">
      {/* Brand Logo & Title */}
      <div className="flex items-center gap-4">
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => navigate('/')} 
          title="CorpLens One — The Operating System for Enterprise Intelligence"
        >
          <CorpLensLogo size={36} />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base text-[#1E293B] tracking-tight font-heading group-hover:text-[#3B82F6] transition-colors">
                CorpLens One
              </span>
              <span className="text-[10px] bg-[#EEF6FF] text-[#3B82F6] border border-[#DCE7F5] px-2 py-0.5 rounded-full font-mono font-bold uppercase tracking-wider">
                v1.0.0
              </span>
            </div>
            <span className="text-[11px] text-[#64748B] font-medium block -mt-0.5 font-sans hidden xl:block">
              The Operating System for Enterprise Intelligence
            </span>
          </div>
        </div>

        {/* Tenant Switcher */}
        <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-[#DCE7F5] text-xs font-mono">
          <Building className="w-4 h-4 text-[#3B82F6]" />
          <select
            value={tenant}
            onChange={(e) => setTenant(e.target.value)}
            className="bg-[#F4F9FF] border border-[#DCE7F5] text-[#1E293B] font-bold rounded-[12px] px-3 py-1.5 text-[11px] outline-none cursor-pointer hover:bg-[#EEF6FF] transition-colors shadow-inner"
          >
            <option value="Enterprise Sentinel Ops">Tenant: Global Risk Ops</option>
            <option value="US East Division">Tenant: US East Division</option>
            <option value="EMEA Compliance Group">Tenant: EMEA Compliance</option>
          </select>
        </div>
      </div>

      {/* Global Unified Search Bar */}
      <div className="flex-1 max-w-md mx-6 relative">
        <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-[#94A3B8]" />
        <input
          ref={searchInputRef}
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); onSearch(e.target.value); }}
          placeholder="Search entities, CVEs, sanctions, executives..."
          className="w-full bg-[#F4F9FF] border border-[#DCE7F5] rounded-[14px] pl-10 pr-16 py-2 text-xs font-mono text-[#1E293B] focus:bg-white focus:border-[#3B82F6] transition-all outline-none shadow-inner"
        />
        <kbd className="absolute right-3 top-2 text-[10px] text-[#64748B] font-mono bg-white px-1.5 py-0.5 rounded-[8px] border border-[#DCE7F5] pointer-events-none flex items-center gap-0.5">
          <Command className="w-2.5 h-2.5" /> K
        </kbd>
      </div>

      {/* Right Action Bar */}
      <div className="flex items-center gap-3 relative">
        <button
          onClick={onOpenNewScan}
          className="clay-button-primary flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-wide"
        >
          <Plus className="h-4 w-4 stroke-[3]" />
          + New Investigation
        </button>

        {/* Notifications Button */}
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="p-2 text-[#64748B] hover:text-[#1E293B] rounded-[14px] relative transition-all border border-[#DCE7F5] bg-[#F4F9FF] hover:bg-[#EEF6FF]"
          title="High-Priority Alerts"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#3B82F6] animate-ping" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#3B82F6]" />
        </button>

        {/* User Profile Pill */}
        <div className="flex items-center gap-2 pl-2 border-l border-[#DCE7F5]">
          <div className="w-8 h-8 rounded-full bg-[#3B82F6] text-white font-bold flex items-center justify-center text-xs shadow-sm">
            AS
          </div>
          <div className="hidden xl:block text-left text-[11px]">
            <span className="font-bold text-[#1E293B] block leading-tight">Alex Sterling</span>
            <span className="text-[#64748B] text-[10px]">Lead Risk Analyst</span>
          </div>
        </div>

        {/* Notification Drawer Dropdown */}
        {showNotifications && (
          <div className="absolute right-12 top-14 w-80 bg-white rounded-[20px] p-4 space-y-3 z-50 border border-[#DCE7F5] shadow-[0_10px_24px_rgba(120,160,210,0.22)]">
            <div className="flex items-center justify-between border-b border-[#EEF6FF] pb-2">
              <span className="text-xs font-bold text-[#1E293B] tracking-wider flex items-center gap-1.5 font-heading">
                <Bell className="h-3.5 w-3.5 text-[#3B82F6]" />
                Sentinel Priority Alerts
              </span>
              <button onClick={() => setShowNotifications(false)} className="text-[#94A3B8] hover:text-[#1E293B]">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {notifications.map((n) => (
                <div key={n.id} className="p-3 rounded-[14px] bg-[#F4F9FF] border border-[#DCE7F5] text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#1E293B] text-[11px] font-heading">{n.title}</span>
                    <span className="text-[9px] font-mono text-[#64748B]">{n.time}</span>
                  </div>
                  <p className="text-[11px] text-[#64748B] leading-snug font-sans">{n.msg}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
