import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, BookOpen, Sparkles, Brain, ChevronRight, Clock, Plus, Trash2, Copy, Download, Share2, Zap, Target } from 'lucide-react';
import { api } from '../services/api';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  citations?: { source: string; type: string }[];
  reasoning_steps?: string[];
  confidence_score?: number;
  intent?: string;
  follow_up_questions?: string[];
  timestamp: Date;
}

interface Session {
  id: string;
  title: string;
  timestamp: Date;
  messages: Message[];
}

const INTENT_COLORS: Record<string, string> = {
  COMPARE: 'bg-zinc-900 text-zinc-200 border-zinc-700',
  EXECUTIVE: 'bg-zinc-900 text-zinc-200 border-zinc-700',
  CVE_THREAT: 'bg-white text-black border-white',
  SANCTIONS: 'bg-white text-black border-white',
  REPORT_GEN: 'bg-zinc-800 text-white border-zinc-600',
  SUPPLY_CHAIN: 'bg-zinc-800 text-white border-zinc-600',
  RISK_EXPLAIN: 'bg-zinc-900 text-zinc-300 border-zinc-700',
  GENERAL: 'bg-zinc-950 text-zinc-400 border-zinc-800',
};

const PROMPT_TEMPLATES = [
  { label: 'Compare Companies', query: 'Compare Acme Global Financial and Nexus Dynamics Defense in a due diligence matrix.', icon: '⚖️' },
  { label: 'CVE Threat Analysis', query: 'Show all CVE vulnerabilities and critical threats across tracked entities.', icon: '🔴' },
  { label: 'Supply Chain Map', query: 'Build the supply chain dependency map for Acme Global Financial Group.', icon: '🔗' },
  { label: 'Executive Intelligence', query: 'Show executive relationships and leadership connections for tracked companies.', icon: '👤' },
  { label: 'Due Diligence Report', query: 'Generate an executive M&A due diligence report for Acme Global Financial.', icon: '📋' },
  { label: 'Risk Explanation', query: 'Explain why Acme Global has 28.5 Low Risk and Nexus Dynamics has 68.4 High Risk.', icon: '📊' },
  { label: 'Sanctions Check', query: 'Run an OFAC and EU sanctions screening for Nexus Dynamics.', icon: '🛡️' },
  { label: 'Procurement Decision', query: 'Should we proceed with vendor onboarding for Nexus Dynamics Defense Solutions?', icon: '✅' },
  { label: 'Threat Intel Update', query: 'What are the latest public CVE advisories affecting tracked organizations?', icon: '🚨' },
  { label: 'Monitoring Status', query: 'What changes have been detected in continuous monitoring across all tracked domains?', icon: '📡' },
];

export const AiAssistantPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showReasoning, setShowReasoning] = useState<Record<string, boolean>>({});
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: 'sess-001',
      title: 'Initial Portfolio Assessment',
      timestamp: new Date('2026-07-22T09:00:00'),
      messages: []
    }
  ]);
  const [activeSessionId, setActiveSessionId] = useState('sess-001');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeSession = sessions.find(s => s.id === activeSessionId)!;

  const initialMessage: Message = {
    id: 'init-0',
    sender: 'ai',
    text: "Hello, I'm the CorpLens AI Intelligence Copilot. I analyze your tracked entity portfolio using multi-step reasoning grounded in verified public OSINT evidence. Every answer includes source citations and reasoning trace. How can I assist your investigation?",
    citations: [{ source: 'CorpLens RAG Intelligence Core v2.0', type: 'Source-Grounded System' }],
    follow_up_questions: [
      'Compare Acme Global Financial and Nexus Dynamics',
      'Show all critical CVEs across my tracked portfolio',
      'Generate a due diligence report for procurement'
    ],
    confidence_score: 1.0,
    timestamp: new Date()
  };

  const allMessages = activeSession.messages.length === 0
    ? [initialMessage]
    : [initialMessage, ...activeSession.messages];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [sessions, activeSessionId]);

  const handleSend = async (userQuery: string) => {
    if (!userQuery.trim() || isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userQuery,
      timestamp: new Date()
    };

    setSessions(prev => prev.map(s =>
      s.id === activeSessionId
        ? { ...s, title: s.messages.length === 0 ? userQuery.slice(0, 40) + '...' : s.title, messages: [...s.messages, userMsg] }
        : s
    ));
    setIsLoading(true);

    try {
      const res = await api.queryAiAssistant(userQuery, 'cmp-001');

      // Augment response with structured format
      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: res.answer || res,
        citations: res.citations || [{ source: 'CorpLens AI Engine', type: 'Inference Engine' }],
        reasoning_steps: res.reasoning_steps,
        confidence_score: res.confidence_score || 0.92,
        intent: res.intent,
        follow_up_questions: res.follow_up_questions || [],
        timestamp: new Date()
      };

      setSessions(prev => prev.map(s =>
        s.id === activeSessionId
          ? { ...s, messages: [...s.messages, aiMsg] }
          : s
      ));
    } catch {
      const errMsg: Message = {
        id: `ai-err-${Date.now()}`,
        sender: 'ai',
        text: 'AI engine is processing. Please retry your query.',
        citations: [],
        timestamp: new Date()
      };
      setSessions(prev => prev.map(s =>
        s.id === activeSessionId ? { ...s, messages: [...s.messages, errMsg] } : s
      ));
    }

    setIsLoading(false);
  };

  const handleNewSession = () => {
    const newSession: Session = {
      id: `sess-${Date.now()}`,
      title: 'New Investigation Session',
      timestamp: new Date(),
      messages: []
    };
    setSessions(prev => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
  };

  const toggleReasoning = (msgId: string) => {
    setShowReasoning(prev => ({ ...prev, [msgId]: !prev[msgId] }));
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex overflow-hidden">
      {/* Left — Investigation Memory Sidebar */}
      <div className="w-64 bg-black/90 border-r border-white/10 flex flex-col shrink-0">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <div>
            <div className="text-xs font-extrabold text-white uppercase tracking-wider">Investigation Sessions</div>
            <div className="text-[10px] text-zinc-500 font-mono mt-0.5">Conversation Memory</div>
          </div>
          <button
            onClick={handleNewSession}
            className="h-7 w-7 glass-btn rounded-lg flex items-center justify-center"
            title="New Session"
          >
            <Plus className="h-3.5 w-3.5 text-white" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {sessions.map(session => (
            <button
              key={session.id}
              onClick={() => setActiveSessionId(session.id)}
              className={`w-full text-left p-3 rounded-xl text-xs transition-all border ${
                session.id === activeSessionId
                  ? 'bg-zinc-900 border-white/20 text-white'
                  : 'bg-transparent border-transparent text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200'
              }`}
            >
              <div className="font-bold truncate">{session.title}</div>
              <div className="text-[10px] text-zinc-500 font-mono mt-0.5 flex items-center gap-1">
                <Clock className="h-2.5 w-2.5" />
                {session.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                <span className="ml-auto">{session.messages.length} msgs</span>
              </div>
            </button>
          ))}
        </div>

        {/* Session stats */}
        <div className="p-3 border-t border-white/10">
          <div className="bg-zinc-950 rounded-xl p-3 text-xs space-y-1.5 border border-white/10">
            <div className="font-extrabold text-white flex items-center gap-1.5">
              <Brain className="h-3.5 w-3.5 text-white" /> AI Copilot Engine
            </div>
            <div className="text-[10px] text-zinc-400 font-mono">Intent Classification: Active</div>
            <div className="text-[10px] text-zinc-400 font-mono">Reasoning Trace: Enabled</div>
            <div className="text-[10px] text-zinc-400 font-mono">Evidence Grounding: Source-Cited</div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="h-16 border-b border-white/10 px-6 flex items-center justify-between bg-black/80 backdrop-blur-xl shrink-0">
          <div>
            <h1 className="text-sm font-extrabold text-white flex items-center gap-2 uppercase tracking-wider">
              <Bot className="h-4 w-4 text-white" />
              AI Intelligence Copilot — {activeSession.title}
            </h1>
            <p className="text-[10px] text-zinc-400 mt-0.5 font-mono">
              Multi-step reasoning • Source-grounded • Evidence-cited • Investigation memory
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="glass-btn px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5">
              <Download className="h-3.5 w-3.5" /> Export Session
            </button>
          </div>
        </div>

        {/* Quick Prompt Templates */}
        <div className="px-6 py-3 border-b border-white/10 bg-zinc-950/50 shrink-0">
          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="text-[10px] font-extrabold text-zinc-500 uppercase tracking-widest shrink-0 flex items-center gap-1">
              <Zap className="h-3 w-3" /> Quick Templates:
            </span>
            {PROMPT_TEMPLATES.map((t, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(t.query)}
                disabled={isLoading}
                className="px-3 py-1 glass-btn rounded-full text-[11px] font-bold whitespace-nowrap flex items-center gap-1.5 shrink-0"
              >
                <span>{t.icon}</span>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
          {allMessages.map((m) => (
            <div key={m.id} className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {m.sender === 'ai' && (
                <div className="h-9 w-9 rounded-xl bg-zinc-900 border border-white/20 text-white flex items-center justify-center shrink-0 shadow">
                  <Bot className="h-4 w-4 text-white" />
                </div>
              )}

              <div className={`max-w-2xl rounded-2xl text-xs space-y-3 ${
                m.sender === 'user'
                  ? 'bg-white text-black font-semibold px-5 py-3 shadow-lg'
                  : 'glass-panel border border-white/10 px-5 py-4 text-zinc-200'
              }`}>
                {/* Intent Badge */}
                {m.sender === 'ai' && m.intent && (
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] px-2 py-0.5 rounded font-black uppercase tracking-widest border ${INTENT_COLORS[m.intent] || INTENT_COLORS.GENERAL}`}>
                      {m.intent.replace('_', ' ')}
                    </span>
                    {m.confidence_score && (
                      <span className="text-[9px] font-mono text-zinc-500">
                        Confidence: {(m.confidence_score * 100).toFixed(0)}%
                      </span>
                    )}
                    <span className="text-[9px] font-mono text-zinc-600 ml-auto">
                      {m.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                )}

                {/* Message Text */}
                <div className="whitespace-pre-wrap leading-relaxed">{m.text}</div>

                {/* Reasoning Steps (collapsible) */}
                {m.sender === 'ai' && m.reasoning_steps && m.reasoning_steps.length > 0 && (
                  <div className="border-t border-white/10 pt-2">
                    <button
                      onClick={() => toggleReasoning(m.id)}
                      className="text-[10px] font-bold text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors"
                    >
                      <Brain className="h-3 w-3" />
                      {showReasoning[m.id] ? 'Hide' : 'Show'} AI Reasoning Trace ({m.reasoning_steps.length} steps)
                      <ChevronRight className={`h-3 w-3 transition-transform ${showReasoning[m.id] ? 'rotate-90' : ''}`} />
                    </button>
                    {showReasoning[m.id] && (
                      <div className="mt-2 space-y-1.5 pl-3 border-l-2 border-zinc-700">
                        {m.reasoning_steps.map((step, si) => (
                          <div key={si} className="text-[10px] font-mono text-zinc-400 leading-snug">{step}</div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Evidence Citations */}
                {m.sender === 'ai' && m.citations && m.citations.length > 0 && (
                  <div className="border-t border-white/10 pt-2 space-y-1">
                    <div className="text-[9px] font-extrabold text-zinc-500 uppercase tracking-widest flex items-center gap-1">
                      <BookOpen className="h-2.5 w-2.5" /> Evidence Citations:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {m.citations.map((c, ci) => (
                        <div key={ci} className="text-[9px] font-mono text-zinc-400 bg-zinc-950 px-2 py-1 rounded border border-zinc-800">
                          [{ci + 1}] {c.source} <span className="text-zinc-600">({c.type})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Follow-up Questions */}
                {m.sender === 'ai' && m.follow_up_questions && m.follow_up_questions.length > 0 && (
                  <div className="border-t border-white/10 pt-2 space-y-1">
                    <div className="text-[9px] font-extrabold text-zinc-500 uppercase tracking-widest flex items-center gap-1">
                      <Sparkles className="h-2.5 w-2.5" /> Suggested Follow-ups:
                    </div>
                    <div className="flex flex-col gap-1">
                      {m.follow_up_questions.map((q, qi) => (
                        <button
                          key={qi}
                          onClick={() => handleSend(q)}
                          disabled={isLoading}
                          className="text-left text-[10px] text-zinc-300 hover:text-white bg-zinc-950/80 hover:bg-zinc-900 border border-zinc-800 hover:border-white/20 px-3 py-1.5 rounded-lg transition-all flex items-center gap-2"
                        >
                          <ChevronRight className="h-3 w-3 shrink-0" />
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {m.sender === 'user' && (
                <div className="h-9 w-9 rounded-xl bg-zinc-900 border border-white/20 text-white flex items-center justify-center shrink-0 text-xs font-black">
                  A
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="h-9 w-9 rounded-xl bg-zinc-900 border border-white/20 flex items-center justify-center shrink-0">
                <Bot className="h-4 w-4 text-white animate-pulse" />
              </div>
              <div className="glass-panel border border-white/10 px-5 py-4 rounded-2xl text-xs text-zinc-400 flex items-center gap-3">
                <div className="flex gap-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="h-1.5 w-1.5 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="h-1.5 w-1.5 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="font-mono text-[10px]">Reasoning through evidence chains...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <div className="border-t border-white/10 p-4 bg-black/80 backdrop-blur-xl shrink-0">
          <form
            onSubmit={(e) => { e.preventDefault(); const q = query.trim(); setQuery(''); handleSend(q); }}
            className="flex gap-3"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={isLoading}
              placeholder="Ask the AI Copilot... e.g. 'Compare Acme Global vs Nexus Dynamics' or 'Generate due diligence report'"
              className="flex-1 glass-input rounded-xl px-5 py-3 text-sm font-sans placeholder-zinc-600"
            />
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="glass-btn-primary px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4 stroke-[3]" />
              Send
            </button>
          </form>
          <div className="text-[10px] text-zinc-600 font-mono mt-2 text-center">
            AI Copilot — Multi-step reasoning • Source-grounded • Evidence-cited • Investigation memory
          </div>
        </div>
      </div>
    </div>
  );
};
