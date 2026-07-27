import React, { useState } from 'react';
import { 
  FolderOpen, 
  Plus, 
  Clock, 
  User, 
  ShieldAlert, 
  CheckCircle2, 
  FileText, 
  ExternalLink,
  ChevronRight,
  Filter,
  Search
} from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

interface CaseItem {
  id: string;
  title: string;
  target_company: string;
  assignee: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
  created_at: string;
  evidence_count: number;
}

export const CaseManagementPage: React.FC = () => {
  const [cases, setCases] = useState<CaseItem[]>([
    {
      id: 'CASE-101',
      title: 'OFAC Sanction Fuzzy Match Adjudication (84% Confidence)',
      target_company: 'Nexus Commercial Trading LLC',
      assignee: 'Alex Sterling',
      priority: 'CRITICAL',
      status: 'OPEN',
      created_at: '2026-07-27',
      evidence_count: 5
    },
    {
      id: 'CASE-102',
      title: 'CVE-2024-21626 Container Breakout Patch Verification',
      target_company: 'Nexus Dynamics Defense',
      assignee: 'Sarah Chen',
      priority: 'HIGH',
      status: 'IN_PROGRESS',
      created_at: '2026-07-26',
      evidence_count: 3
    },
    {
      id: 'CASE-103',
      title: 'TLS Certificate Expiry SLA Alert Audit',
      target_company: 'Acme Global Financial Group',
      assignee: 'Marcus Vance',
      priority: 'MEDIUM',
      status: 'RESOLVED',
      created_at: '2026-07-25',
      evidence_count: 4
    }
  ]);

  const columns: { key: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED'; label: string; color: string }[] = [
    { key: 'OPEN', label: 'Open Investigations', color: 'border-rose-500' },
    { key: 'IN_PROGRESS', label: 'In Progress / Peer Review', color: 'border-amber-500' },
    { key: 'RESOLVED', label: 'Resolved & Attested', color: 'border-emerald-500' }
  ];

  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto bg-slate-50 text-slate-900 font-sans min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-heading flex items-center gap-3">
              <FolderOpen className="h-6 w-6 text-blue-600" />
              Investigation & Case Management Board
            </h1>
            <Badge variant="cyan">ISO/IEC 27037 Audited</Badge>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Kanban workflow for compliance adjudication, peer review approvals, and evidentiary sign-offs.
          </p>
        </div>

        <Button
          variant="primary"
          leftIcon={<Plus className="w-4 h-4 stroke-[3]" />}
        >
          + Initiate Investigation Case
        </Button>
      </div>

      {/* Kanban Board Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((col) => {
          const colCases = cases.filter((c) => c.status === col.key);
          return (
            <div key={col.key} className="bg-slate-100 p-4 rounded-2xl border border-slate-200 space-y-4 min-h-[600px] flex flex-col">
              {/* Column Title Header */}
              <div className={`flex items-center justify-between p-3 bg-white rounded-xl border-l-4 ${col.color} border border-slate-200 shadow-sm`}>
                <span className="font-extrabold text-xs text-slate-900 uppercase tracking-wide font-heading">
                  {col.label}
                </span>
                <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                  {colCases.length}
                </span>
              </div>

              {/* Column Case Cards */}
              <div className="space-y-3 flex-1">
                {colCases.map((c) => (
                  <div
                    key={c.id}
                    className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3 hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-extrabold text-blue-600">{c.id}</span>
                      <Badge variant={c.priority === 'CRITICAL' ? 'critical' : c.priority === 'HIGH' ? 'medium' : 'low'}>
                        {c.priority}
                      </Badge>
                    </div>

                    <h4 className="font-extrabold text-sm text-slate-900 font-heading leading-snug">
                      {c.title}
                    </h4>

                    <div className="text-xs text-slate-600 font-sans">
                      Target Entity: <strong className="text-slate-900">{c.target_company}</strong>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
                      <span className="flex items-center gap-1.5 text-slate-700 font-bold">
                        <User className="w-3.5 h-3.5 text-blue-600" />
                        {c.assignee}
                      </span>
                      <span className="flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5 text-slate-400" />
                        {c.evidence_count} Artifacts
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
