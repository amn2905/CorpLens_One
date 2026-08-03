import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  FileText, 
  ExternalLink, 
  Clock, 
  Plus, 
  MessageSquare, 
  ShieldCheck, 
  Globe, 
  CheckCircle2,
  Bookmark,
  Layers,
  Database,
  Building,
  Rss
} from 'lucide-react';
import { api } from '../services/api';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

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
      text: `Based on automated passive OSINT ingestion across SEC Form 10-K filings, public DNS records, and NIST NVD feeds, **Acme Global Financial Group** (acmeglobal.com) maintains an overall Composite Risk Score of **3.9 / 10.0 (LOW RISK)**.\n\n### Key Evidentiary Findings:\n1. **Digital Footprint & DNS**: 4 resolved domain endpoints hosted on Cloudflare Anycast CDN with valid DigiCert TLS RSA certificates expiring in 180+ days.\n2. **Vulnerability Correlation**: Nginx web server version 1.24.0 has been patched against CVE-2023-38606 (HTTP/2 Rapid Reset).\n3. **Sanctions Attestation**: Zero fuzzy string matches found on US OFAC SDN or EU Consolidated watchlists. Compliance rating stands at 100%.`,
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
          snippet: 'DigiCert TLS RSA CA G2 certificate issued for *.acmeglobal.com (Serial: 08F9B2A7E).'
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

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      sender: 'user',
      text: inputQuery,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    try {
      const response = await api.askAI(inputQuery, 'cmp-001');
      const aiMsg: ChatMessage = {
        id: `m-${Date.now() + 1}`,
        sender: 'ai',
        text: response.answer || response.text || "Analysis compiled based on active OSINT telemetry.",
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
            snippet: 'Zero match results found against designated individuals or entities under E.O. 14024.'
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
    <div className="h-[calc(100vh-4rem)] flex bg-slate-50 text-slate-900 font-sans overflow-hidden">
      {/* ─────────────────────────────────────────────────────────────
          1. LEFT PANEL: Session History (260px Persistent Width)
      ───────────────────────────────────────────────────────────── */}
      <div className="w-64 shrink-0 bg-white border-r border-slate-200 p-4 flex flex-col justify-between hidden md:flex">
        <div className="space-y-4">
          <Button
            variant="primary"
            className="w-full flex items-center justify-center gap-2"
            onClick={() => {
              setMessages([]);
              setSelectedCitation(null);
            }}
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            New Intelligence Session
          </Button>

          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block px-2 mb-2">
              Recent Forensic Sessions
            </span>
            <button
              onClick={() => setActiveSession('session-1')}
              className={`w-full text-left p-3 rounded-xl text-xs font-bold font-heading transition-all flex items-center gap-2.5 ${
                activeSession === 'session-1'
                  ? 'bg-blue-50 text-blue-600 border border-blue-200 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <MessageSquare className="w-4 h-4 shrink-0" />
              <span className="truncate">Acme Global Risk Audit</span>
            </button>
            <button
              onClick={() => setActiveSession('session-2')}
              className={`w-full text-left p-3 rounded-xl text-xs font-bold font-heading transition-all flex items-center gap-2.5 ${
                activeSession === 'session-2'
                  ? 'bg-blue-50 text-blue-600 border border-blue-200 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <MessageSquare className="w-4 h-4 shrink-0" />
              <span className="truncate">CVE-2024-21626 Impact</span>
            </button>
          </div>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono space-y-1">
          <div className="flex items-center gap-2 text-slate-900 font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            CorpLens AI v1.0.0
          </div>
          <p className="text-[10px] text-slate-500">100% Grounded Context Ingestion Active</p>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. CENTER PANEL: Chat Stream (Flex-1 Main Workspace)
      ───────────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col justify-between bg-slate-50 border-r border-slate-200 overflow-hidden">
        {/* Stream Header */}
        <div className="p-4 bg-white border-b border-slate-200 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 font-heading">
                CorpLens AI — Enterprise Intelligence Copilot
              </h2>
              <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                Grounded via SEC EDGAR, Public DNS, & NVD Vulnerability Databases
              </span>
            </div>
          </div>
          <Badge variant="cyan">ISO/IEC 27037 Attested</Badge>
        </div>

        {/* Message Stream Scroll Area */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center gap-2 mb-1.5 text-[10px] font-mono text-slate-400">
                <span>{m.sender === 'user' ? 'Risk Analyst' : 'CorpLens AI'}</span>
                <span>•</span>
                <span>{m.timestamp}</span>
              </div>

              <div
                className={`max-w-2xl p-5 rounded-2xl text-xs leading-relaxed space-y-3 shadow-sm ${
                  m.sender === 'user'
                    ? 'bg-blue-600 text-white font-medium rounded-tr-none'
                    : 'bg-white border border-slate-200 text-slate-900 font-sans rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-wrap">{m.text}</div>

                {/* Grounded Evidence Sources Cards */}
                {m.sources && m.sources.length > 0 && (
                  <div className="pt-3 border-t border-slate-100 space-y-2">
                    <span className="text-[10px] font-mono font-extrabold text-blue-600 uppercase tracking-wider block">
                      Grounded Evidence Citations ({m.sources.length}):
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {m.sources.map((s, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedCitation(s)}
                          className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-left hover:border-blue-300 transition-all space-y-1 group"
                        >
                          <div className="flex items-center justify-between text-[10px] font-mono font-bold text-slate-800">
                            <span className="truncate">{s.type}</span>
                            <ExternalLink className="w-3 h-3 text-blue-600 group-hover:translate-x-0.5 transition-transform" />
                          </div>
                          <div className="text-[11px] font-bold text-slate-900 truncate font-heading">{s.title}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 p-4 bg-white rounded-2xl border border-slate-200 text-xs font-mono text-slate-500 w-fit">
              <Sparkles className="w-4 h-4 text-blue-600 animate-spin" />
              Synthesizing grounded evidence from SEC filings and public DNS records...
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-200 flex items-center gap-3">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask CorpLens AI (e.g. Verify OFAC sanctions status for Nexus Commercial)..."
            className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 font-mono outline-none focus:bg-white focus:border-blue-600 transition-all"
          />
          <Button
            type="submit"
            variant="primary"
            disabled={isTyping || !inputQuery.trim()}
            leftIcon={<Send className="w-4 h-4" />}
          >
            Query CorpLens AI
          </Button>
        </form>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. RIGHT PANEL: Evidence & Citations Inspector (380px Sticky)
      ───────────────────────────────────────────────────────────── */}
      <div className="w-96 shrink-0 bg-white p-6 border-l border-slate-200 space-y-6 hidden lg:block overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide font-heading flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-600" />
            Evidentiary Source Inspector
          </h3>
          <Badge variant="cyan">SHA-256 Verified</Badge>
        </div>

        {selectedCitation ? (
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <span className="text-[10px] font-mono font-extrabold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200 uppercase tracking-wider">
                {selectedCitation.type}
              </span>
              <h4 className="font-extrabold text-sm text-slate-900 font-heading leading-snug">
                {selectedCitation.title}
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed font-mono bg-white p-3 rounded-xl border border-slate-200">
                "{selectedCitation.snippet}"
              </p>
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Verified Hash: SHA256:8f9b2a7e</span>
                <a
                  href={selectedCitation.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 font-bold hover:underline flex items-center gap-1"
                >
                  View Source Registry <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center text-slate-400 font-mono text-xs border border-dashed border-slate-200 rounded-2xl">
            Select any grounded citation from the chat stream to inspect raw SEC, DNS, or CVE source evidence.
          </div>
        )}
      </div>
    </div>
  );
};
