import React, { useState } from 'react';
import { CheckSquare, Plus, CheckCircle, Clock } from 'lucide-react';

export const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState([
    { id: 'tsk-101', company: 'Nexus Dynamics', title: 'Adjudicate OFAC fuzzy match', assignee: 'Sarah Jenkins', priority: 'High', status: 'In Progress' },
    { id: 'tsk-102', company: 'Acme Global', title: 'Verify Nginx HTTP/2 Rapid Reset patch', assignee: 'David Vance', priority: 'Medium', status: 'Review' },
    { id: 'tsk-103', company: 'Stripe Gateway', title: 'Review annual SIG Lite questionnaire response', assignee: 'Sarah Jenkins', priority: 'Low', status: 'Completed' }
  ]);

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="pb-4 border-b border-slate-800 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            <CheckSquare className="h-6 w-6 text-blue-400" />
            Collaboration Tasks & Approval Sign-offs
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Task assignment, investigation notes, and maker-checker report approval workflows.
          </p>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shadow-lg shadow-blue-600/20 flex items-center gap-1.5">
          <Plus className="h-4 w-4" /> Create Investigation Task
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* In Progress Column */}
        <div className="glass-panel p-5 rounded-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-2">
              <Clock className="h-4 w-4 text-amber-400" /> In Progress (1)
            </span>
          </div>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="text-xs font-bold text-white">Adjudicate OFAC fuzzy match</div>
            <div className="text-[11px] text-slate-400">Target: Nexus Dynamics</div>
            <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-800/80">
              <span className="text-slate-500">Assignee: Sarah</span>
              <span className="bg-rose-500/10 text-rose-400 border border-rose-500/30 px-2 py-0.5 rounded font-bold">High</span>
            </div>
          </div>
        </div>

        {/* Review Column */}
        <div className="glass-panel p-5 rounded-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-2">
              <CheckSquare className="h-4 w-4 text-blue-400" /> Pending Approval (1)
            </span>
          </div>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="text-xs font-bold text-white">Verify Nginx HTTP/2 patch</div>
            <div className="text-[11px] text-slate-400">Target: Acme Global</div>
            <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-800/80">
              <span className="text-slate-500">Assignee: David</span>
              <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded font-bold">Medium</span>
            </div>
          </div>
        </div>

        {/* Completed Column */}
        <div className="glass-panel p-5 rounded-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-400" /> Completed (1)
            </span>
          </div>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="text-xs font-bold text-white">Review SIG Lite questionnaire</div>
            <div className="text-[11px] text-slate-400">Target: Stripe Gateway</div>
            <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-800/80">
              <span className="text-slate-500">Assignee: Sarah</span>
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-bold">Approved</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
