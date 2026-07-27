import React from 'react';
import { Settings, Users, Shield, Database } from 'lucide-react';
import { Badge } from '../components/ui/Badge';

export const AdminPage: React.FC = () => {
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto bg-slate-50 text-slate-900 font-sans min-h-screen">
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-2xl font-extrabold text-slate-900 font-heading tracking-tight flex items-center gap-3">
          <Settings className="h-6 w-6 text-blue-600" />
          Enterprise Tenant Admin & Governance
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          PostgreSQL Row-Level Security (RLS) policies, RBAC user permissions, and audit log inspection.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
          <h3 className="font-extrabold text-sm text-slate-900 font-heading flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-600" />
            Active Users & Roles
          </h3>
          <p className="text-xs text-slate-500 font-sans">
            4 Users assigned (Admin, Analyst, Auditor, Viewer).
          </p>
          <Badge variant="cyan">RBAC Active</Badge>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
          <h3 className="font-extrabold text-sm text-slate-900 font-heading flex items-center gap-2">
            <Database className="w-4 h-4 text-blue-600" />
            PostgreSQL RLS Policy
          </h3>
          <p className="text-xs text-slate-500 font-sans">
            Multi-tenant data isolation strictly enforced.
          </p>
          <Badge variant="low">RLS Enabled</Badge>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
          <h3 className="font-extrabold text-sm text-slate-900 font-heading flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-600" />
            System Health Readiness
          </h3>
          <p className="text-xs text-slate-500 font-sans">
            PostgreSQL, Neo4j & Redis status: Healthy.
          </p>
          <Badge variant="low">100% Uptime</Badge>
        </div>
      </div>
    </div>
  );
};
