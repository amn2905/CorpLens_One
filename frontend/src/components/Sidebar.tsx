import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Building2, ShieldAlert, Network, Bot, BarChart3,
  Clock, Briefcase, Bell, CheckSquare, Share2, Settings, ShieldCheck,
  FolderOpen, GitBranch, Users, Rss
} from 'lucide-react';

interface NavItem { to: string; label: string; icon: React.FC<{className?: string}>; }

const NAV_ITEMS: NavItem[] = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/workspace/cmp-001', label: 'Companies', icon: Building2 },
  { to: '/ai-assistant', label: 'CorpLens AI', icon: Bot },
  { to: '/cases', label: 'Investigations', icon: FolderOpen },
  { to: '/sanctions', label: 'Compliance', icon: ShieldAlert },
  { to: '/tprm', label: 'Third Party Risk', icon: Briefcase },
  { to: '/supply-chain', label: 'Supply Chain', icon: GitBranch },
  { to: '/threat-intel', label: 'Threat Intelligence', icon: Rss },
  { to: '/graph', label: 'Knowledge Graph', icon: Network },
  { to: '/analytics', label: 'Reports', icon: BarChart3 },
  { to: '/monitoring', label: 'Monitoring', icon: Bell },
  { to: '/integrations', label: 'Settings', icon: Share2 },
  { to: '/admin', label: 'Admin', icon: Settings },
];

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 shrink-0 flex flex-col justify-between h-[calc(100vh-6rem)] bg-[#F4F9FF] border border-[#DCE7F5] rounded-[24px] shadow-[0_6px_18px_rgba(120,160,210,0.12)] p-3.5 font-sans overflow-y-auto">
      <div className="space-y-1">
        <div className="text-[10px] font-extrabold text-[#64748B] uppercase tracking-wider px-3 mb-2 font-heading">
          Platform OS
        </div>
        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-[14px] text-xs transition-all relative group font-medium ${
                    isActive
                      ? 'bg-[#EEF6FF] text-[#3B82F6] font-extrabold border border-[#DCE7F5] shadow-sm'
                      : 'text-[#64748B] hover:text-[#1E293B] hover:bg-[#EEF6FF]/60'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Animated Left Selected Pill Indicator */}
                    {isActive && (
                      <span className="absolute left-0 top-2 bottom-2 w-1 bg-[#3B82F6] rounded-r-full animate-pulse" />
                    )}
                    <Icon className={`h-4 w-4 shrink-0 transition-colors ${isActive ? 'text-[#3B82F6]' : 'text-[#94A3B8] group-hover:text-[#3B82F6]'}`} />
                    <span className="truncate">{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Security Status Box */}
      <div className="pt-3 border-t border-[#DCE7F5] mt-4">
        <div className="p-3.5 rounded-[16px] bg-white border border-[#DCE7F5] shadow-[0_4px_12px_rgba(120,160,210,0.10)] space-y-2">
          <div className="flex items-center justify-between font-bold text-[11px] text-[#1E293B]">
            <span className="flex items-center gap-1.5 font-heading">
              <ShieldCheck className="h-4 w-4 text-[#3B82F6]" />
              System Status
            </span>
            <span className="text-[9px] text-[#22C55E] bg-[#22C55E]/10 border border-[#22C55E]/20 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
              Active
            </span>
          </div>
          <div className="space-y-1 text-[10px] text-[#64748B] font-mono">
            <div className="flex items-center justify-between">
              <span>RLS Multi-Tenant:</span>
              <span className="font-bold text-[#1E293B]">ON</span>
            </div>
            <div className="flex items-center justify-between">
              <span>ISO 27037 Digest:</span>
              <span className="font-bold text-[#1E293B]">SHA-256</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
