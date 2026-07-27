import React from 'react';
import { CheckSquare, User, Clock } from 'lucide-react';
import { Badge } from '../components/ui/Badge';

export const TasksPage: React.FC = () => {
  const tasks = [
    { id: '1', title: 'Verify OFAC Sanction Match for Nexus Commercial', assignee: 'Alex Mercer', status: 'In Progress', due: 'Today' },
    { id: '2', title: 'Compile Executive Brief for Acme Global Financial', assignee: 'Sarah Chen', status: 'Pending Approval', due: 'Tomorrow' },
    { id: '3', title: 'Audit CVE-2024-21626 Patch SLA on Docker Hosts', assignee: 'Marcus Vance', status: 'Open', due: 'Jul 29' },
  ];

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto bg-slate-50 text-slate-900 font-sans min-h-screen">
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-2xl font-extrabold text-slate-900 font-heading tracking-tight flex items-center gap-3">
          <CheckSquare className="h-6 w-6 text-blue-600" />
          Analyst Tasks & Compliance Approvals
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Task checklist, peer review workflow, and analyst assignment queue.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
        {tasks.map(t => (
          <div key={t.id} className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
            <div className="space-y-1">
              <h4 className="font-bold text-sm text-slate-900 font-heading">{t.title}</h4>
              <div className="flex items-center gap-3 text-xs font-mono text-slate-500">
                <span className="flex items-center gap-1"><User className="w-3 h-3 text-blue-600" /> {t.assignee}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-slate-400" /> Due: {t.due}</span>
              </div>
            </div>
            <Badge variant="cyan">{t.status}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
};
