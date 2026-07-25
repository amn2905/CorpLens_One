import React, { useState, useEffect } from 'react';
import { 
  FolderOpen, Plus, Clock, AlertTriangle, CheckCircle2, 
  ChevronRight, Bot, FileText, MessageSquare, CheckSquare, 
  X, User, Calendar, Target, Zap, Shield, Filter
} from 'lucide-react';

interface CaseTask { id: string; title: string; completed: boolean; }
interface CaseNote { id: string; author: string; content: string; timestamp: string; }
interface CaseTimeline { event: string; timestamp: string; type: string; }

interface InvestigationCase {
  id: string;
  title: string;
  company_name: string;
  company_id: string;
  status: 'Open' | 'In Progress' | 'Awaiting Approval' | 'Closed';
  priority: string;
  assigned_analyst: string;
  scope: string;
  created_at: string;
  updated_at: string;
  risk_score: number;
  risk_tier: string;
  evidence_count: number;
  notes: CaseNote[];
  tasks: CaseTask[];
  timeline: CaseTimeline[];
  ai_summary: string;
}

const MOCK_CASES: InvestigationCase[] = [
  {
    id: "case-001",
    title: "M&A Due Diligence — Acme Global Financial Group",
    company_id: "cmp-001", company_name: "Acme Global Financial Group",
    status: "In Progress", priority: "High", assigned_analyst: "Sarah Jenkins",
    scope: "Full OSINT Assessment + Sanctions Screening",
    created_at: "2026-07-15T09:00:00Z", updated_at: "2026-07-22T10:00:00Z",
    risk_score: 28.5, risk_tier: "Low", evidence_count: 5,
    notes: [
      { id: "n1", author: "Sarah Jenkins", content: "Initial OSINT scan completed. No sanctions matches found.", timestamp: "2026-07-16T10:00:00Z" },
      { id: "n2", author: "Risk Team", content: "CVE-2023-38606 (Nginx) marked as mitigated at Cloudflare WAF layer.", timestamp: "2026-07-18T14:00:00Z" }
    ],
    tasks: [
      { id: "t1", title: "Complete digital footprint mapping", completed: true },
      { id: "t2", title: "Run sanctions screening across OFAC/EU/UN", completed: true },
      { id: "t3", title: "CVE exposure correlation report", completed: true },
      { id: "t4", title: "Request SOC2 documentation from vendor", completed: false },
      { id: "t5", title: "Prepare board-level risk briefing", completed: false }
    ],
    timeline: [
      { event: "Case opened", timestamp: "2026-07-15T09:00:00Z", type: "system" },
      { event: "OSINT scan triggered", timestamp: "2026-07-15T09:15:00Z", type: "scan" },
      { event: "Sanctions screening — Clear (0 matches)", timestamp: "2026-07-16T11:00:00Z", type: "compliance" },
      { event: "CVE correlation — 1 Medium finding", timestamp: "2026-07-17T14:30:00Z", type: "threat" }
    ],
    ai_summary: "Acme Global Financial Group presents a Low Risk posture (28.5/100). Digital footprint is secured behind Cloudflare WAF. Sanctions registries fully clear. Recommended: Cleared for M&A procurement with quarterly monitoring."
  },
  {
    id: "case-002",
    title: "Vendor Risk Assessment — Nexus Dynamics Defense Solutions",
    company_id: "cmp-002", company_name: "Nexus Dynamics Defense Solutions",
    status: "Awaiting Approval", priority: "Critical", assigned_analyst: "Michael Chen",
    scope: "Full Risk Assessment + OFAC Adjudication",
    created_at: "2026-07-18T11:00:00Z", updated_at: "2026-07-22T09:30:00Z",
    risk_score: 68.4, risk_tier: "High", evidence_count: 8,
    notes: [
      { id: "n3", author: "Michael Chen", content: "CRITICAL: CVE-2024-21626 container breakout vulnerability detected. Vendor notified.", timestamp: "2026-07-19T09:00:00Z" },
      { id: "n4", author: "Compliance Team", content: "OFAC fuzzy match 84% requires legal review before adjudication.", timestamp: "2026-07-20T15:00:00Z" }
    ],
    tasks: [
      { id: "t6", title: "Document OFAC fuzzy match for legal review", completed: true },
      { id: "t7", title: "Escalate CVE-2024-21626 to Nexus Dynamics", completed: true },
      { id: "t8", title: "Obtain written CVE remediation confirmation", completed: false },
      { id: "t9", title: "Complete OFAC adjudication workflow", completed: false },
      { id: "t10", title: "Senior analyst approval sign-off", completed: false }
    ],
    timeline: [
      { event: "Case opened — CRITICAL PRIORITY", timestamp: "2026-07-18T11:00:00Z", type: "system" },
      { event: "CRITICAL CVE-2024-21626 detected", timestamp: "2026-07-18T14:00:00Z", type: "threat" },
      { event: "OFAC sanctions fuzzy match 84% flagged", timestamp: "2026-07-19T09:00:00Z", type: "compliance" },
      { event: "Escalated to compliance team", timestamp: "2026-07-20T10:00:00Z", type: "escalation" },
      { event: "Awaiting senior analyst approval", timestamp: "2026-07-21T16:00:00Z", type: "system" }
    ],
    ai_summary: "Nexus Dynamics presents a HIGH Risk posture (68.4/100). 1 CRITICAL CVE (container breakout, CVSS 9.8) and 1 OFAC sanctions fuzzy match (84%) detected. DO NOT proceed with vendor onboarding until both issues are fully remediated."
  }
];

const STATUS_COLORS: Record<string, string> = {
  'Open': 'bg-zinc-800 text-zinc-200 border-zinc-600',
  'In Progress': 'bg-zinc-900 text-white border-white/30',
  'Awaiting Approval': 'bg-white text-black border-white',
  'Closed': 'bg-zinc-950 text-zinc-500 border-zinc-800'
};

const PRIORITY_COLORS: Record<string, string> = {
  'Critical': 'bg-white text-black border-white',
  'High': 'bg-zinc-800 text-white border-zinc-600',
  'Medium': 'bg-zinc-900 text-zinc-300 border-zinc-700',
  'Low': 'bg-zinc-950 text-zinc-500 border-zinc-800'
};

const TIMELINE_ICONS: Record<string, string> = {
  system: '🔷', scan: '🔍', compliance: '🛡️', threat: '⚠️', escalation: '🔺'
};

export const CaseManagementPage: React.FC = () => {
  const [cases, setCases] = useState<InvestigationCase[]>(MOCK_CASES);
  const [selectedCase, setSelectedCase] = useState<InvestigationCase | null>(null);
  const [activeDetailTab, setActiveDetailTab] = useState<'overview' | 'tasks' | 'notes' | 'timeline'>('overview');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const kanbanCols = ['Open', 'In Progress', 'Awaiting Approval', 'Closed'];
  const filteredCases = filterStatus === 'All' ? cases : cases.filter(c => c.status === filterStatus);

  const addNote = () => {
    if (!selectedCase || !newNote.trim()) return;
    const note: CaseNote = {
      id: `n-${Date.now()}`,
      author: 'Sarah Jenkins',
      content: newNote,
      timestamp: new Date().toISOString()
    };
    const updated = { ...selectedCase, notes: [...selectedCase.notes, note] };
    setCases(prev => prev.map(c => c.id === updated.id ? updated : c));
    setSelectedCase(updated);
    setNewNote('');
  };

  const toggleTask = (caseId: string, taskId: string) => {
    setCases(prev => prev.map(c => {
      if (c.id !== caseId) return c;
      const updated = { ...c, tasks: c.tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t) };
      if (selectedCase?.id === caseId) setSelectedCase(updated);
      return updated;
    }));
  };

  const updateStatus = (caseId: string, status: InvestigationCase['status']) => {
    setCases(prev => prev.map(c => {
      if (c.id !== caseId) return c;
      const updated = { ...c, status };
      if (selectedCase?.id === caseId) setSelectedCase(updated);
      return updated;
    }));
  };

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-wider flex items-center gap-3">
            <FolderOpen className="h-6 w-6 text-white" />
            Investigation Case Management
          </h1>
          <p className="text-xs text-zinc-400 mt-1">Full investigation lifecycle — from OSINT scan to analyst approval workflow</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="glass-input px-3 py-2 rounded-lg text-xs font-bold"
          >
            <option value="All" className="bg-black">All Statuses</option>
            {kanbanCols.map(s => <option key={s} value={s} className="bg-black">{s}</option>)}
          </select>
          <button
            onClick={() => setShowCreateModal(true)}
            className="glass-btn-primary px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2"
          >
            <Plus className="h-4 w-4 stroke-[3]" /> New Case
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Cases', value: cases.length, sub: 'Active investigations' },
          { label: 'In Progress', value: cases.filter(c => c.status === 'In Progress').length, sub: 'Currently active' },
          { label: 'Awaiting Approval', value: cases.filter(c => c.status === 'Awaiting Approval').length, sub: 'Pending sign-off' },
          { label: 'Closed', value: cases.filter(c => c.status === 'Closed').length, sub: 'Completed cases' },
        ].map(stat => (
          <div key={stat.label} className="glass-panel p-4 rounded-xl border border-white/10">
            <div className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest">{stat.label}</div>
            <div className="text-3xl font-extrabold text-white mt-1 font-mono">{stat.value}</div>
            <div className="text-[10px] text-zinc-600 mt-0.5">{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Cases List */}
      <div className="space-y-3">
        {filteredCases.map(c => {
          const completedTasks = c.tasks.filter(t => t.completed).length;
          return (
            <div
              key={c.id}
              onClick={() => { setSelectedCase(c); setActiveDetailTab('overview'); }}
              className="glass-card p-5 rounded-2xl border border-white/10 cursor-pointer hover:border-white/30 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-zinc-900 border border-white/20 flex items-center justify-center font-black text-white text-lg shrink-0">
                    {c.company_name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-extrabold text-white text-sm">{c.title}</div>
                    <div className="text-xs text-zinc-400 font-mono mt-0.5">{c.company_name} • {c.scope}</div>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <span className={`text-[9px] px-2 py-0.5 rounded font-black uppercase tracking-widest border ${STATUS_COLORS[c.status]}`}>{c.status}</span>
                      <span className={`text-[9px] px-2 py-0.5 rounded font-black uppercase tracking-widest border ${PRIORITY_COLORS[c.priority]}`}>{c.priority}</span>
                      <span className="text-[9px] text-zinc-500 font-mono flex items-center gap-1"><User className="h-2.5 w-2.5" />{c.assigned_analyst}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs shrink-0">
                  <div className="text-right">
                    <div className="font-extrabold text-white font-mono">{c.risk_score} / 100</div>
                    <div className="text-[10px] text-zinc-500">{c.risk_tier} Risk</div>
                  </div>
                  <div className="text-right">
                    <div className="font-extrabold text-white font-mono">{completedTasks}/{c.tasks.length}</div>
                    <div className="text-[10px] text-zinc-500">Tasks Done</div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-zinc-600" />
                </div>
              </div>
              {/* Task Progress Bar */}
              <div className="mt-3 h-1 bg-zinc-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all"
                  style={{ width: `${c.tasks.length > 0 ? (completedTasks / c.tasks.length) * 100 : 0}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Case Detail Panel */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-end p-0">
          <div className="w-full max-w-2xl h-full glass-panel border-l border-white/20 flex flex-col shadow-2xl overflow-hidden">
            {/* Detail Header */}
            <div className="p-6 border-b border-white/10 flex items-start justify-between gap-4">
              <div>
                <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">{selectedCase.id}</div>
                <h2 className="font-extrabold text-white text-sm mt-0.5 leading-tight">{selectedCase.title}</h2>
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <span className={`text-[9px] px-2 py-0.5 rounded font-black uppercase border ${STATUS_COLORS[selectedCase.status]}`}>{selectedCase.status}</span>
                  <span className={`text-[9px] px-2 py-0.5 rounded font-black uppercase border ${PRIORITY_COLORS[selectedCase.priority]}`}>{selectedCase.priority}</span>
                </div>
              </div>
              <button onClick={() => setSelectedCase(null)} className="text-zinc-500 hover:text-white p-1"><X className="h-5 w-5" /></button>
            </div>

            {/* Status Change */}
            <div className="px-6 py-3 border-b border-white/10 flex items-center gap-2">
              <span className="text-[10px] text-zinc-500 font-bold uppercase">Move to:</span>
              {(['Open', 'In Progress', 'Awaiting Approval', 'Closed'] as const).map(s => (
                <button
                  key={s}
                  onClick={() => updateStatus(selectedCase.id, s)}
                  className={`text-[9px] px-2.5 py-1 rounded font-black uppercase tracking-wider border transition-all ${
                    selectedCase.status === s ? STATUS_COLORS[s] : 'bg-transparent text-zinc-600 border-zinc-800 hover:text-zinc-300'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Detail Tabs */}
            <div className="flex border-b border-white/10">
              {(['overview', 'tasks', 'notes', 'timeline'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveDetailTab(tab)}
                  className={`flex-1 py-2.5 text-[10px] font-extrabold uppercase tracking-wider transition-all ${
                    activeDetailTab === tab ? 'bg-zinc-900 text-white border-b-2 border-white' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {tab === 'overview' ? '📋 Overview' : tab === 'tasks' ? '✅ Tasks' : tab === 'notes' ? '💬 Notes' : '🕒 Timeline'}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {activeDetailTab === 'overview' && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-zinc-950 p-3.5 rounded-xl border border-white/10">
                      <div className="text-[9px] text-zinc-500 uppercase font-bold">Risk Score</div>
                      <div className="text-xl font-extrabold text-white font-mono">{selectedCase.risk_score} / 100</div>
                    </div>
                    <div className="bg-zinc-950 p-3.5 rounded-xl border border-white/10">
                      <div className="text-[9px] text-zinc-500 uppercase font-bold">Evidence Items</div>
                      <div className="text-xl font-extrabold text-white font-mono">{selectedCase.evidence_count}</div>
                    </div>
                  </div>
                  <div className="bg-zinc-950 p-4 rounded-xl border border-white/10 space-y-2">
                    <div className="text-[10px] font-extrabold text-white uppercase tracking-wider flex items-center gap-2"><Bot className="h-3.5 w-3.5" /> AI Case Summary</div>
                    <p className="text-xs text-zinc-300 leading-relaxed">{selectedCase.ai_summary}</p>
                  </div>
                  <div className="text-xs text-zinc-500 font-mono space-y-1">
                    <div className="flex items-center gap-2"><User className="h-3 w-3" /> Analyst: <span className="text-white font-bold">{selectedCase.assigned_analyst}</span></div>
                    <div className="flex items-center gap-2"><Calendar className="h-3 w-3" /> Created: <span className="text-zinc-300">{new Date(selectedCase.created_at).toLocaleDateString()}</span></div>
                    <div className="flex items-center gap-2"><Target className="h-3 w-3" /> Scope: <span className="text-zinc-300">{selectedCase.scope}</span></div>
                  </div>
                </>
              )}

              {activeDetailTab === 'tasks' && (
                <div className="space-y-2">
                  {selectedCase.tasks.map(task => (
                    <div key={task.id} className="flex items-center gap-3 bg-zinc-950 p-3 rounded-xl border border-white/10">
                      <button
                        onClick={() => toggleTask(selectedCase.id, task.id)}
                        className={`h-5 w-5 rounded border-2 flex items-center justify-center transition-all shrink-0 ${task.completed ? 'bg-white border-white' : 'bg-transparent border-zinc-600 hover:border-white'}`}
                      >
                        {task.completed && <CheckCircle2 className="h-3.5 w-3.5 text-black" />}
                      </button>
                      <span className={`text-xs ${task.completed ? 'line-through text-zinc-600' : 'text-zinc-200 font-bold'}`}>{task.title}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeDetailTab === 'notes' && (
                <div className="space-y-3">
                  {selectedCase.notes.map(note => (
                    <div key={note.id} className="bg-zinc-950 p-4 rounded-xl border border-white/10">
                      <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 mb-2">
                        <User className="h-3 w-3" /> <span className="text-white font-bold">{note.author}</span>
                        <span className="ml-auto">{new Date(note.timestamp).toLocaleDateString()}</span>
                      </div>
                      <p className="text-xs text-zinc-200 leading-relaxed">{note.content}</p>
                    </div>
                  ))}
                  <div className="flex gap-2 pt-2">
                    <input
                      value={newNote}
                      onChange={e => setNewNote(e.target.value)}
                      placeholder="Add analyst note..."
                      className="glass-input flex-1 px-3 py-2 rounded-lg text-xs"
                    />
                    <button onClick={addNote} className="glass-btn-primary px-4 py-2 rounded-lg text-xs font-black">Add</button>
                  </div>
                </div>
              )}

              {activeDetailTab === 'timeline' && (
                <div className="space-y-3">
                  {selectedCase.timeline.map((event, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs">
                      <span className="text-lg">{TIMELINE_ICONS[event.type] || '📌'}</span>
                      <div className="flex-1 bg-zinc-950 p-3 rounded-xl border border-white/10">
                        <div className="font-bold text-white">{event.event}</div>
                        <div className="text-[10px] text-zinc-500 font-mono mt-0.5">{new Date(event.timestamp).toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
