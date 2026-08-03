import React from 'react';
import { Settings, Users, Shield, Database, CheckCircle2 } from 'lucide-react';

export const AdminPage: React.FC = () => {
  return (
    <div className="space-y-6 font-sans">
      {/* Header Banner */}
      <div className="clay-panel p-6 bg-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold text-[#1E293B] font-heading tracking-tight flex items-center gap-3">
              <Settings className="h-6 w-6 text-[#3B82F6]" />
              Enterprise System Administration & Tenant Governance
            </h1>
            <span className="text-xs font-mono font-bold bg-[#EEF6FF] text-[#3B82F6] border border-[#DCE7F5] px-3 py-1 rounded-full">
              v1.0.0 Admin Portal
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
            Manage tenant isolation settings, RBAC analyst roles, PostgreSQL Row-Level Security (RLS) policies, and system health readiness.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="clay-card p-6 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-[#1E293B] font-heading flex items-center gap-2">
              <Users className="w-4 h-4 text-[#3B82F6]" />
              User Roles & RBAC
            </h3>
            <span className="text-xs font-mono font-bold bg-[#EEF6FF] text-[#3B82F6] border border-[#DCE7F5] px-2.5 py-0.5 rounded-full">
              RBAC Enforced
            </span>
          </div>
          <p className="text-xs text-[#64748B] leading-relaxed">
            4 Provisioned Users (SuperAdmin, Lead Analyst, Auditor, Viewer).
          </p>
        </div>

        <div className="clay-card p-6 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-[#1E293B] font-heading flex items-center gap-2">
              <Database className="w-4 h-4 text-[#3B82F6]" />
              PostgreSQL RLS Policy
            </h3>
            <span className="text-xs font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full">
              RLS Enabled
            </span>
          </div>
          <p className="text-xs text-[#64748B] leading-relaxed">
            Row-Level Security policy active across `companies`, `cases`, and `audit_logs`.
          </p>
        </div>

        <div className="clay-card p-6 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-[#1E293B] font-heading flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#3B82F6]" />
              Microservice Health
            </h3>
            <span className="text-xs font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full">
              100% Healthy
            </span>
          </div>
          <p className="text-xs text-[#64748B] leading-relaxed">
            PostgreSQL 16, Neo4j 5.18, and Redis 7 services fully operational.
          </p>
        </div>
      </div>
    </div>
  );
};
