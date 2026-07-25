import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Building2, ShieldAlert, Network, Bot, BarChart3,
  Clock, Briefcase, Bell, CheckSquare, Share2, Settings, ShieldCheck,
  FolderOpen, GitBranch, Users, Rss
} from 'lucide-react';

interface NavItem { to: string; label: string; icon: React.FC<{className?: string}>; }

const NAV_SECTIONS: { title: string; items: NavItem[] }[] = [
  {
    title: 'Core Intelligence',
    items: [
      { to: '/', label: 'Dashboard', icon: LayoutDashboard },
      { to: '/workspace/cmp-001', label: 'Company Intelligence', icon: Building2 },
      { to: '/analytics', label: 'Risk Analytics', icon: BarChart3 },
    ]
  },
  {
    title: 'Investigation',
    items: [
      { to: '/cases', label: 'Case Management', icon: FolderOpen },
      { to: '/timeline', label: 'OSINT Timeline', icon: Clock },
      { to: '/graph', label: 'Graph Explorer', icon: Network },
      { to: '/ai-assistant', label: 'AI Copilot', icon: Bot },
    ]
  },
  {
    title: 'Risk & Compliance',
    items: [
      { to: '/sanctions', label: 'Sanctions Screening', icon: ShieldAlert },
      { to: '/threat-intel', label: 'Threat Intelligence', icon: Rss },
      { to: '/tprm', label: 'Vendor TPRM', icon: Briefcase },
      { to: '/monitoring', label: 'Live Monitoring', icon: Bell },
    ]
  },
  {
    title: 'Enterprise Tools',
    items: [
      { to: '/executives', label: 'Executive Intel', icon: Users },
      { to: '/supply-chain', label: 'Supply Chain', icon: GitBranch },
      { to: '/tasks', label: 'Tasks & Approvals', icon: CheckSquare },
      { to: '/integrations', label: 'Integrations', icon: Share2 },
    ]
  },
  {
    title: 'Admin',
    items: [
      { to: '/admin', label: 'Enterprise Admin', icon: Settings },
    ]
  }
];

export const Sidebar: React.FC = () => {
  return (
    <aside
      className="w-64 flex flex-col justify-between h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto"
      style={{
        background: 'rgba(1, 4, 20, 0.92)',
        backdropFilter: 'blur(24px)',
        borderRight: '1px solid rgba(37, 99, 235, 0.15)'
      }}
    >
      <div className="p-4 space-y-5">
        {NAV_SECTIONS.map((section) => (
          <div key={section.title}>
            {/* Section header */}
            <div className="text-[9px] font-extrabold text-blue-500/50 uppercase tracking-[0.18em] px-3 mb-2">
              {section.title}
            </div>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all relative group ${
                        isActive
                          ? 'text-white'
                          : 'text-blue-300/50 hover:text-blue-100 hover:bg-blue-950/50'
                      }`
                    }
                    style={({ isActive }) => isActive ? {
                      background: 'rgba(37, 99, 235, 0.15)',
                      border: '1px solid rgba(59, 130, 246, 0.22)',
                      boxShadow: '0 0 16px rgba(37, 99, 235, 0.12)'
                    } : {}}
                  >
                    {({ isActive }) => (
                      <>
                        {/* Active left accent bar */}
                        {isActive && (
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 nav-active-bar rounded-r" />
                        )}
                        <Icon className={`h-3.5 w-3.5 shrink-0 ${isActive ? 'text-blue-400' : ''}`} />
                        <span className={isActive ? 'text-white font-bold' : ''}>{item.label}</span>
                        {isActive && (
                          <span className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-400 shrink-0" />
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Status */}
      <div className="p-4 border-t" style={{ borderColor: 'rgba(37, 99, 235, 0.15)' }}>
        <div className="p-3 rounded-xl text-xs space-y-2" style={{
          background: 'rgba(3, 9, 30, 0.85)',
          border: '1px solid rgba(37, 99, 235, 0.18)'
        }}>
          <div className="flex items-center justify-between font-extrabold text-[11px] uppercase tracking-wider text-blue-100">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
              Security
            </span>
            <span className="text-[8px] text-white bg-blue-600 px-1.5 py-0.5 rounded font-black tracking-wider uppercase" style={{ boxShadow: '0 0 8px rgba(37,99,235,0.5)' }}>
              Active
            </span>
          </div>
          <div className="space-y-0.5 text-[9px] font-mono" style={{ color: 'rgba(147, 197, 253, 0.40)' }}>
            <div>SAML 2.0 / SCIM Enabled</div>
            <div>STIX 2.1 SIEM Export Ready</div>
            <div>RLS Row-Level Isolation ON</div>
          </div>
        </div>

        <div className="text-[9px] font-mono text-blue-800 text-center mt-2">
          {NAV_SECTIONS.reduce((s, sec) => s + sec.items.length, 0)} modules active
        </div>
      </div>
    </aside>
  );
};
