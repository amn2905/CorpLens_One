import React from 'react';
import { CheckSquare, User, Clock } from 'lucide-react';

export const TasksPage: React.FC = () => {
  const tasks = [
    { id: '1', title: 'Verify OFAC Sanction Match for Nexus Commercial', assignee: 'Alex Sterling', status: 'In Progress', due: 'Today' },
    { id: '2', title: 'Compile Executive Brief for Acme Global Financial', assignee: 'Sarah Chen', status: 'Pending Approval', due: 'Tomorrow' },
    { id: '3', title: 'Audit CVE-2024-21626 Patch SLA on Docker Hosts', assignee: 'Marcus Vance', status: 'Open', due: 'Jul 29' },
  ];

  return (
    <div className="space-y-6 font-sans">
      {/* Header Banner */}
      <div className="clay-panel p-6 bg-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold text-[#1E293B] font-heading tracking-tight flex items-center gap-3">
              <CheckSquare className="h-6 w-6 text-[#3B82F6]" />
              Analyst Sub-Tasks & Compliance Approvals
            </h1>
            <span className="text-xs font-mono font-bold bg-[#EEF6FF] text-[#3B82F6] border border-[#DCE7F5] px-3 py-1 rounded-full">
              Analyst Workflow Queue
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
            Task checklist, peer review workflow, and analyst assignment queue.
          </p>
        </div>
      </div>

      <div className="clay-card p-6 space-y-3">
        <div className="space-y-3">
          {tasks.map(t => (
            <div key={t.id} className="p-4 rounded-[16px] bg-[#F4F9FF] border border-[#DCE7F5] flex items-center justify-between">
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-[#1E293B] font-heading">{t.title}</h4>
                <div className="flex items-center gap-3 text-xs font-mono text-[#64748B]">
                  <span className="flex items-center gap-1.5 text-[#1E293B] font-bold">
                    <User className="w-3.5 h-3.5 text-[#3B82F6]" /> {t.assignee}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#94A3B8]" /> Due: {t.due}
                  </span>
                </div>
              </div>
              <span className="text-xs font-mono font-bold bg-[#EEF6FF] text-[#3B82F6] border border-[#DCE7F5] px-3 py-1 rounded-full">
                {t.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
