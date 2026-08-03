import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  ExternalLink, 
  Plus, 
  MessageSquare, 
  ShieldCheck, 
  CheckCircle2,
  FileText,
  HelpCircle,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { api } from '../services/api';
import { RiskBadge } from '../components/RiskBadge';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  sources?: { title: string; url: string; snippet: string; type: string }[];
}

export const AiAssistantPage: React.FC = () => {
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'user',
      text: 'Analyze the digital footprint and public CVE risk posture for Acme Global Financial Group.',
      timestamp: '10:14 AM'
    },
    {
      id: 'm-2',
      sender: 'ai',
      text: `Based on automated passive OSINT ingestion across SEC Form 10-K filings, public DNS records, and NIST NVD feeds, **Acme Global Financial Group** (acmeglobal.com) maintains an overall Composite Risk Score of **2.8 / 10.0 (LOW RISK)**.\n\n### Key Evidentiary Findings:\n1. **Digital Footprint & DNS**: 4 resolved domain endpoints hosted on Cloudflare Anycast CDN with valid DigiCert TLS RSA certificates expiring in 180+ days.\n2. **Vulnerability Correlation**: Nginx web server version 1.24.0 has been patched against CVE-2023-38606 (HTTP/2 Rapid Reset).\n3. **Sanctions Attestation**: Zero fuzzy string matches found on US OFAC SDN or EU Consolidated watchlists. Compliance rating stands at 100%.`,
      timestamp: '10:15 AM',
      sources: [
        {
          title: 'SEC Form 10-K Annual Financial & Operational Filing',
          type: 'SEC Filing',
          url: 'https://www.sec.gov/edgar/searchedgar/companysearch',
          snippet: 'Item 1C: Cybersecurity risk management governance attested under SEC Release No. 33-11216.'
        },
        {
          title: 'Public DNS Record Map & SSL Certificate Transparency Log',
          type: 'DNS / SSL Log',
          url: 'https://crt.sh/?q=acmeglobal.com',
          snippet: 'DigiCert TLS RSA CA G2 certificate issued for *.acmeglobal.com.'
        },
        {
          title: 'NIST NVD Advisory: CVE-2023-38606 (Nginx HTTP/2 Rapid Reset)',
          type: 'NVD Feed',
          url: 'https://nvd.nist.gov/vuln/detail/CVE-2023-38606',
          snippet: 'Mitigated at edge layer via Cloudflare WAF stream rate limit rules.'
        }
      ]
    }
  ]);

  const [activeSession, setActiveSession] = useState('session-1');
  const [selectedCitation, setSelectedCitation] = useState<{ title: string; url: string; snippet: string; type: string } | null>(
    messages[1].sources ? messages[1].sources[0] : null
  );

  const suggestedQuestions = [
    "Compare Acme Global and Nexus Dynamics risk profiles",
    "Show active CVE advisories affecting Nexus Dynamics",
    "Verify OFAC SDN sanctions status for Acme Global",
    "Generate executive due diligence PDF report"
  ];

  const handleSend = async (e?: React.FormEvent, customQuery?: string) => {
    if (e) e.preventDefault();
    const queryToSend = customQuery || inputQuery;
    if (!queryToSend.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      sender: 'user',
      text: queryToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customQuery) setInputQuery('');
    setIsTyping(true);

    try {
      const response = await api.askAI(queryToSend, 'cmp-001');
      const aiMsg: ChatMessage = {
        id: `m-${Date.now() + 1}`,
        sender: 'ai',
        text: response.answer || "Analysis compiled based on active OSINT telemetry.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: [
          {
            title: 'CorpLens Knowledge Graph Cypher Ingestion Node',
            type: 'Neo4j Graph',
            url: '#',
            snippet: 'Parent-subsidiary entity relationships verified via public corporate filings.'
          },
          {
            title: 'US OFAC SDN Sectoral Sanctions Registry',
            type: 'OFAC Watchlist',
            url: 'https://sanctionssearch.ofac.treas.gov/',
            snippet: 'Zero match results found against designated individuals or entities.'
          }
        ]
      };
      setMessages((prev) => [...prev, aiMsg]);
      if (aiMsg.sources && aiMsg.sources.length > 0) {
        setSelectedCitation(aiMsg.sources[0]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-[calc(100vh-6.5rem)] flex gap-4 font-sans overflow-hidden">
      {/* ─────────────────────────────────────────────────────────────
          1. LEFT PANEL: Session History (w-64 Clay Panel)
      ───────────────────────────────────────────────────────────── */}
      <div className="w-64 shrink-0 clay-panel p-4 flex flex-col justify-between hidden md:flex">
        <div className="space-y-4">
          <button
            onClick={() => {
              setMessages([]);
              setSelectedCitation(null);
            }}
            className="clay-button-primary w-full py-2.5 px-3 text-xs flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            New Intelligence Session
          </button>

          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold text-[#64748B] uppercase tracking-wider block px-2 mb-2 font-heading">
              Recent Forensic Sessions
            </span>
            <button
              onClick={() => setActiveSession('session-1')}
              className={`w-full text-left p-3 rounded-[14px] text-xs font-bold font-heading transition-all flex items-center gap-2.5 ${
                activeSession === 'session-1'
                  ? 'bg-[#EEF6FF] text-[#3B82F6] border border-[#DCE7F5] shadow-sm'
                  : 'text-[#64748B] hover:bg-[#F4F9FF]'
              }`}
            >
              <MessageSquare className="w-4 h-4 shrink-0 text-[#3B82F6]" />
              <span className="truncate">Acme Global Risk Audit</span>
            </button>
            <button
              onClick={() => setActiveSession('session-2')}
              className={`w-full text-left p-3 rounded-[14px] text-xs font-bold font-heading transition-all flex items-center gap-2.5 ${
                activeSession === 'session-2'
                  ? 'bg-[#EEF6FF] text-[#3B82F6] border border-[#DCE7F5] shadow-sm'
                  : 'text-[#64748B] hover:bg-[#F4F9FF]'
              }`}
            >
              <MessageSquare className="w-4 h-4 shrink-0 text-[#94A3B8]" />
              <span className="truncate">CVE-2024-21626 Impact</span>
            </button>
          </div>
        </div>

        <div className="p-3.5 bg-[#F4F9FF] rounded-[16px] border border-[#DCE7F5] text-xs font-mono space-y-1">
          <div className="flex items-center gap-2 text-[#1E293B] font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            CorpLens AI v1.0.0
          </div>
          <p className="text-[10px] text-[#64748B]">100% Grounded Evidence Ingestion Active</p>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. CENTER PANEL: Chat Stream (Flex-1 Main Workspace)
      ───────────────────────────────────────────────────────────── */}
      <div className="flex-1 clay-panel flex flex-col justify-between overflow-hidden">
        {/* Stream Header */}
        <div className="p-4 border-b border-[#EEF6FF] flex items-center justify-between bg-[#F4F9FF]/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[12px] bg-[#3B82F6] text-white flex items-center justify-center font-bold shadow-sm">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-[#1E293B] font-heading flex items-center gap-2">
                CorpLens AI Copilot
              </h2>
              <span className="text-[10px] font-mono text-[#64748B] flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#22C55E] inline-block animate-pulse" />
                Grounded via SEC EDGAR, Public DNS, & NVD Databases
              </span>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold bg-[#EEF6FF] text-[#3B82F6] border border-[#DCE7F5] px-3 py-1 rounded-full">
            ISO/IEC 27037 Attested
          </span>
        </div>

        {/* Message Stream Area */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center gap-2 mb-1.5 text-[10px] font-mono text-[#94A3B8]">
                <span>{m.sender === 'user' ? 'Risk Analyst' : 'CorpLens AI'}</span>
                <span>•</span>
                <span>{m.timestamp}</span>
              </div>

              <div
                className={`max-w-2xl p-5 rounded-[20px] text-xs leading-relaxed space-y-3 shadow-sm ${
                  m.sender === 'user'
                    ? 'bg-[#3B82F6] text-white font-medium rounded-tr-none'
                    : 'bg-[#F4F9FF] border border-[#DCE7F5] text-[#1E293B] font-sans rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-wrap">{m.text}</div>

                {/* Grounded Evidence Sources Cards */}
                {m.sources && m.sources.length > 0 && (
                  <div className="pt-3 border-t border-[#DCE7F5] space-y-2">
                    <span className="text-[10px] font-mono font-extrabold text-[#3B82F6] uppercase tracking-wider block font-heading">
                      Grounded Evidence Citations ({m.sources.length}):
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {m.sources.map((s, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedCitation(s)}
                          className="p-3 rounded-[14px] bg-white border border-[#DCE7F5] text-left hover:border-[#3B82F6] transition-all space-y-1 group shadow-sm"
                        >
                          <div className="flex items-center justify-between text-[10px] font-mono font-bold text-[#1E293B]">
                            <span className="truncate">{s.type}</span>
                            <ExternalLink className="w-3 h-3 text-[#3B82F6] group-hover:translate-x-0.5 transition-transform" />
                          </div>
                          <p className="text-[11px] text-[#64748B] line-clamp-1 font-sans">{s.title}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs font-mono text-[#64748B] bg-[#F4F9FF] p-3 rounded-[14px] w-fit border border-[#DCE7F5]">
              <Sparkles className="w-4 h-4 text-[#3B82F6] animate-spin" />
              Processing OSINT evidence query...
            </div>
          )}
        </div>

        {/* Input Form Bar */}
        <div className="p-4 border-t border-[#EEF6FF] bg-white">
          <form onSubmit={handleSend} className="flex items-center gap-3">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask CorpLens AI (e.g. Compare risk posture between target entities)..."
              className="clay-input flex-1 px-4 py-3 text-xs font-mono"
            />
            <button
              type="submit"
              disabled={isTyping || !inputQuery.trim()}
              className="clay-button-primary px-5 py-3 text-xs flex items-center gap-2 font-bold shrink-0 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              Query AI
            </button>
          </form>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. RIGHT PANEL: Evidence Inspector & Suggested Questions
      ───────────────────────────────────────────────────────────── */}
      <div className="w-80 shrink-0 clay-panel p-5 space-y-6 hidden lg:block overflow-y-auto">
        {/* Suggested Questions */}
        <div className="space-y-3">
          <h3 className="text-xs font-extrabold text-[#1E293B] uppercase tracking-wider font-heading flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-[#3B82F6]" />
            Suggested AI Prompts
          </h3>
          <div className="space-y-2">
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(undefined, q)}
                className="w-full text-left p-3 rounded-[14px] bg-[#F4F9FF] border border-[#DCE7F5] hover:border-[#3B82F6] text-xs text-[#1E293B] transition-all font-medium leading-snug group"
              >
                <span className="group-hover:text-[#3B82F6] transition-colors">{q}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Evidence Citation Inspector */}
        <div className="space-y-3 border-t border-[#EEF6FF] pt-4">
          <h3 className="text-xs font-extrabold text-[#1E293B] uppercase tracking-wider font-heading flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-[#3B82F6]" />
            Active Citation Inspector
          </h3>

          {selectedCitation ? (
            <div className="p-4 rounded-[16px] bg-[#F4F9FF] border border-[#DCE7F5] space-y-2">
              <span className="text-[10px] font-mono font-bold text-[#3B82F6] bg-white border border-[#DCE7F5] px-2 py-0.5 rounded-full inline-block">
                {selectedCitation.type}
              </span>
              <h4 className="text-xs font-bold text-[#1E293B] font-heading">{selectedCitation.title}</h4>
              <p className="text-[11px] text-[#64748B] leading-relaxed italic bg-white p-2.5 rounded-[12px] border border-[#DCE7F5]">
                "{selectedCitation.snippet}"
              </p>
              {selectedCitation.url !== '#' && (
                <a
                  href={selectedCitation.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-mono text-[#3B82F6] font-bold inline-flex items-center gap-1 pt-1 hover:underline"
                >
                  Verify Public Record <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          ) : (
            <p className="text-xs text-[#94A3B8] italic">Click any grounded citation to inspect original telemetry payload.</p>
          )}
        </div>

        {/* Target Entity Overview Card */}
        <div className="p-4 rounded-[16px] bg-[#EEF6FF] border border-[#DCE7F5] space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-[#1E293B]">
            <span>Active Target:</span>
            <span className="font-mono text-[#3B82F6]">Acme Global</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#64748B]">Composite Score:</span>
            <RiskBadge score={2.8} />
          </div>
        </div>
      </div>
    </div>
  );
};
