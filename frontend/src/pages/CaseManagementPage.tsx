import React, { useState, useEffect } from 'react';
import { 
  FolderOpen, 
  Plus, 
  User, 
  FileText, 
  ChevronRight,
  Filter,
  Search,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { api, CaseItem } from '../services/api';

export const CaseManagementPage: React.FC = () => {
  const [cases, setCases] = useState<CaseItem[]>([]);

  useEffect(() => {
    setCases(api.getCases());
  }, []);

  const columns: { key: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED'; label: string; dotColor: string }[] = [
    { key: 'OPEN', label: 'Open Investigations', dotColor: 'bg-rose-500' },
    { key: 'IN_PROGRESS', label: 'In Progress / Peer Review', dotColor: 'bg-amber-500' },
    { key: 'RESOLVED', label: 'Resolved & Attested', dotColor: 'bg-emerald-500' }
  ];

  return (
    <div className="space-y-6 font-sans">
      {/* Header Banner */}
      <div className="clay-panel p-6 bg-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold text-[#1E293B] tracking-tight font-heading flex items-center gap-3">
              <FolderOpen className="h-6 w-6 text-[#3B82F6]" />
              Investigation & Case Management Board
            </h1>
            <span className="text-xs font-mono font-bold bg-[#EEF6FF] text-[#3B82F6] border border-[#DCE7F5] px-3 py-1 rounded-full">
              ISO/IEC 27037 Audited
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
            Kanban workflow for compliance adjudication, peer review approvals, and evidentiary sign-offs.
          </p>
        </div>

        <button 
          onClick={() => {
            const newCase: CaseItem = {
              id: `CASE-${Math.floor(100 + Math.random() * 900)}`,
              title: 'Manual Analyst Forensic Investigation Case',
              target_company: 'Acme Global Financial Group',
              assignee: 'Alex Sterling',
              priority: 'HIGH',
              status: 'OPEN',
              created_at: new Date().toISOString().split('T')[0],
              evidence_count: 3
            };
            const updated = api.addCase(newCase);
            setCases([...updated]);
          }}
          className="clay-button-primary px-5 py-2.5 text-xs flex items-center gap-2 font-bold shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          + Initiate Investigation Case
        </button>
      </div>

      {/* Kanban Board Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((col) => {
          const colCases = cases.filter((c) => c.status === col.key);
          return (
            <div key={col.key} className="bg-[#F4F9FF] p-4 rounded-[24px] border border-[#DCE7F5] space-y-4 min-h-[600px] flex flex-col shadow-inner">
              {/* Column Header */}
              <div className="flex items-center justify-between p-3.5 bg-white rounded-[16px] border border-[#DCE7F5] shadow-sm">
                <span className="font-extrabold text-xs text-[#1E293B] uppercase tracking-wide font-heading flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${col.dotColor}`} />
                  {col.label}
                </span>
                <span className="text-xs font-mono font-bold bg-[#EEF6FF] text-[#3B82F6] px-2.5 py-0.5 rounded-full border border-[#DCE7F5]">
                  {colCases.length}
                </span>
              </div>

              {/* Column Case Cards */}
              <div className="space-y-3 flex-1">
                {colCases.map((c) => (
                  <div
                    key={c.id}
                    className="clay-card p-5 space-y-3 hover:translate-y-[-2px] transition-transform cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-extrabold text-[#3B82F6]">{c.id}</span>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        c.priority === 'CRITICAL' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                        c.priority === 'HIGH' ? 'bg-orange-50 text-orange-700 border border-orange-200' :
                        'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {c.priority}
                      </span>
                    </div>

                    <h4 className="font-extrabold text-sm text-[#1E293B] font-heading leading-snug">
                      {c.title}
                    </h4>

                    <div className="text-xs text-[#64748B] font-sans">
                      Target Entity: <strong className="text-[#1E293B]">{c.target_company}</strong>
                    </div>

                    <div className="pt-3 border-t border-[#EEF6FF] flex items-center justify-between text-xs font-mono text-[#64748B]">
                      <span className="flex items-center gap-1.5 text-[#1E293B] font-bold">
                        <User className="w-3.5 h-3.5 text-[#3B82F6]" />
                        {c.assignee}
                      </span>
                      <span className="flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5 text-[#94A3B8]" />
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
