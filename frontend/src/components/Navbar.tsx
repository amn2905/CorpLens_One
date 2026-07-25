import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, Plus, X, AlertTriangle, ShieldCheck, ChevronRight } from 'lucide-react';
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
    <header className="h-16 border-b border-blue-900/40 sticky top-0 z-40 flex items-center justify-between px-6"
      style={{ background: 'rgba(1, 4, 20, 0.95)', backdropFilter: 'blur(24px)' }}>

      {/* Top blue gradient accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] gradient-accent" />

      {/* Brand */}
      <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
        <CorpLensLogo size={36} />
        <div>
          <span className="font-extrabold text-lg text-white tracking-wider flex items-center gap-2">
            CORPLENS
            <span className="text-[10px] bg-blue-600/20 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded font-mono tracking-widest uppercase">
              AI
            </span>
          </span>
        </div>
      </div>

      {/* Global Search Bar */}
      <div className="flex-1 max-w-xl mx-8 relative">
        <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-blue-400/60" />
        <input
          ref={searchInputRef}
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); onSearch(e.target.value); }}
          placeholder="Search company, domain, CVE-2024-21626, OFAC..."
          className="w-full glass-input rounded-xl pl-10 pr-14 py-2.5 text-sm font-mono"
        />
        <kbd className="absolute right-3 top-2.5 text-[10px] text-blue-400/60 font-mono bg-blue-950/60 px-1.5 py-0.5 rounded border border-blue-800/40 pointer-events-none">
          Ctrl+K
        </kbd>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 relative">
        <button
          onClick={onOpenNewScan}
          className="glass-btn-primary flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold tracking-wide uppercase"
        >
          <Plus className="h-4 w-4 stroke-[3]" />
          New OSINT Scan
        </button>

        {/* Notifications */}
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="p-2.5 text-blue-300 hover:text-white rounded-xl relative transition-all border border-blue-800/40 hover:border-blue-500/50 hover:bg-blue-950/50"
          title="OSINT Alerts"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-blue-400 animate-ping" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-blue-500" />
        </button>

        {/* Notification Drawer */}
        {showNotifications && (
          <div className="absolute right-12 top-14 w-80 glass-panel rounded-2xl p-4 space-y-3 z-50 border border-blue-500/20 shadow-2xl glow-blue">
            <div className="flex items-center justify-between border-b border-blue-900/40 pb-2">
              <span className="text-xs font-bold text-white tracking-wider flex items-center gap-1.5">
                <Bell className="h-3.5 w-3.5 text-blue-400" />
                OSINT Real-time Alerts
              </span>
              <button onClick={() => setShowNotifications(false)} className="text-blue-400 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-2">
              {notifications.map((n) => (
                <div key={n.id} className="p-2.5 rounded-xl bg-blue-950/40 border border-blue-800/30 text-xs space-y-1 hover:border-blue-500/40 transition-all cursor-pointer">
                  <div className="flex items-center justify-between font-bold text-white">
                    <span className="flex items-center gap-1.5 text-[11px]">
                      {n.type === 'critical'
                        ? <AlertTriangle className="h-3 w-3 text-red-400" />
                        : <ShieldCheck className="h-3 w-3 text-blue-400" />}
                      {n.title}
                    </span>
                    <span className="text-[10px] text-blue-400/60 font-mono">{n.time}</span>
                  </div>
                  <p className="text-[11px] text-blue-100/70 leading-tight">{n.msg}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => { setShowNotifications(false); navigate('/monitoring'); }}
              className="text-[11px] text-blue-400 hover:text-blue-300 font-semibold flex items-center justify-center gap-1 mx-auto w-full pt-1 border-t border-blue-900/40 transition-colors"
            >
              View Monitoring Dashboard <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        )}

        <div className="h-6 w-px bg-blue-900/40 mx-1" />

        {/* User Avatar */}
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-full bg-blue-900/60 border border-blue-500/40 flex items-center justify-center font-bold text-xs text-blue-200"
            style={{ boxShadow: '0 0 12px rgba(59,130,246,0.20)' }}>
            {user?.full_name?.charAt(0) || 'A'}
          </div>
          <div className="hidden md:block text-left">
            <div className="text-xs font-bold text-white">{user?.full_name}</div>
            <div className="text-[10px] text-blue-400/70 font-mono">{user?.role}</div>
          </div>
        </div>
      </div>
    </header>
  );
};
