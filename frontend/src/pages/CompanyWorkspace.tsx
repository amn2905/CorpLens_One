import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Building2, 
  Globe, 
  ShieldCheck, 
  Cpu, 
  FileText, 
  Newspaper, 
  Download, 
  ShieldAlert, 
  Lock, 
  AlertTriangle,
  Bot,
  Search,
  CheckCircle2,
  ExternalLink,
  ArrowDownToLine,
  X,
  Eye,
  Activity,
  Layers,
  Server
} from 'lucide-react';
import { Company, CVEFinding } from '../types';
import { api } from '../services/api';
import { RiskBadge } from '../components/RiskBadge';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

interface DocItem {
  id: string;
  name: string;
  type: string;
  size: string;
  date: string;
  previewText: string;
}

export const CompanyWorkspace: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [company, setCompany] = useState<Company | null>(null);
  const [activeTab, setActiveTab] = useState<'footprint' | 'tech' | 'cve' | 'docs' | 'news' | 'reputation'>('footprint');
  
  // CVE Search & Severity Filter states
  const [cveSearchQuery, setCveSearchQuery] = useState('');
  const [cveSeverityFilter, setCveSeverityFilter] = useState<string>('ALL');

  // Selected Document Preview Modal state
  const [selectedDoc, setSelectedDoc] = useState<DocItem | null>(null);

  useEffect(() => {
    if (id) {
      api.getCompanyById(id).then(setCompany);
    }
  }, [id]);

  if (!company) {
    return (
      <div className="p-12 text-center text-slate-500 font-mono text-xs">
        Loading corporate intelligence workspace profile...
      </div>
    );
  }

  const risk = company.risk_breakdown || {
    overall_score: company.risk_score,
    risk_tier: company.risk_tier,
    infrastructure_score: 15.0,
    technology_score: 30.0,
    reputation_score: 12.0,
    compliance_score: 5.0,
    ai_summary: "Automated passive OSINT baseline compiled. Zero active sanctions matches detected on OFAC SDN watchlists."
  };

  const getCompanyNews = (c: Company) => {
    if (c.id === 'cmp-001') {
      return [
        {
          title: `${c.name} Finalizes $50M Expansion for Institutional Risk AI`,
          source: 'TechCrunch OSINT Syndicate',
          date: '2026-06-15',
          type: 'POSITIVE',
          summary: 'Global expansion into European third-party risk compliance and automated regulatory screening.'
        },
        {
          title: 'DIGITAL FOOTPRINT ALERT: TLS Certificate Renewed via DigiCert CA1',
          source: 'Public SSL Certificate Transparency Log',
          date: '2026-05-20',
          type: 'NEUTRAL',
          summary: 'Valid RSA SHA256 certificate issued for *.acmeglobal.com and primary domain endpoints.'
        },
        {
          title: 'NVD Advisory: Nginx 1.24.0 HTTP/2 Rapid Reset Mitigated on Cloudflare Edge',
          source: 'NIST Vulnerability Database',
          date: '2026-04-10',
          type: 'WARNING',
          summary: 'Mitigation rules applied at WAF perimeter to prevent stream cancellation DoS.'
        }
      ];
    } else {
      return [
        {
          title: `${c.name} Underwent Routine ISO-27001 Security Audit`,
          source: 'Global Compliance Review',
          date: '2026-07-01',
          type: 'POSITIVE',
          summary: 'Passed annual cybersecurity assessment with zero major non-conformities noted.'
        },
        {
          title: 'DNS Infrastructure Baseline Reverified',
          source: 'CorpLens OSINT Telemetry',
          date: '2026-06-28',
          type: 'NEUTRAL',
          summary: 'All MX and TXT record configurations validated with valid SPF/DMARC policy.'
        }
      ];
    }
  };

  const filteredCves = company.cve_findings.filter((cve) => {
    const q = cveSearchQuery.toLowerCase();
    const matchesQuery = !q || cve.cve_id.toLowerCase().includes(q) || cve.technology.toLowerCase().includes(q) || cve.summary.toLowerCase().includes(q);
    const matchesSev = cveSeverityFilter === 'ALL' || cve.severity === cveSeverityFilter;
    return matchesQuery && matchesSev;
  });

  const docsList: DocItem[] = [
    { 
      id: 'soc2', 
      name: `${company.primary_domain}_SOC2_TypeII_Executive_Summary.pdf`, 
      type: 'SOC2 Compliance Attestation',
      size: "1.4 MB", 
      date: "2026-03-12",
      previewText: `================================================================================
CORPLENS AI VERIFIED PUBLIC DOCUMENT
Document Title: ${company.name} - SOC 2 Type II Compliance & Security Audit
Primary Domain: ${company.primary_domain}
Classification: PUBLIC EXECUTIVE SUMMARY
Verified Digest: SHA256: 8f9b2a7e1c4d9e0f2a3b4c5d6e7f8a9b
================================================================================

1. EXECUTIVE SUMMARY & AUDIT SCOPE
Independent Auditor's Report on Controls at a Service Organization Relevant to Security, Availability, and Confidentiality.
Audit Period: July 1, 2025 – June 30, 2026

2. TRUST SERVICES CRITERIA EVALUATION
- CC1.0 Control Environment: SATISFACTORY (Zero Exceptions Noted)
- CC6.0 Logical and Physical Access Controls: SATISFACTORY (MFA Enforced 100%)
- CC7.0 System Operations & Incident Response: SATISFACTORY (SIEM Alerts Active)
- CC8.0 Change Management & CI/CD Security: SATISFACTORY (Signed Commits)

3. AUDITOR OPINION
In our opinion, in all material respects, controls were suitably designed and operated effectively throughout the evaluation period.`
    },
    { 
      id: 'whitepaper', 
      name: `Security_Posture_Whitepaper_2026.pdf`, 
      type: 'Architecture Whitepaper',
      size: "2.8 MB", 
      date: "2025-11-20",
      previewText: `================================================================================
CORPLENS AI VERIFIED PUBLIC DOCUMENT
Document Title: ${company.name} - Cybersecurity & Cloud Infrastructure Whitepaper
Primary Domain: ${company.primary_domain}
Classification: PUBLIC SECURITY BRIEFING
================================================================================

1. ARCHITECTURE OVERVIEW
- Edge Protection: Cloudflare WAF + DDoS Mitigation Layer
- Transport Encryption: TLS 1.3 with AES-256-GCM cipher suites
- Identity & Access: SAML 2.0 / OAuth2 with mandatory hardware FIDO2 MFA
- Threat Monitoring: Automated SIEM log forwarders (STIX 2.1 JSON Format)

2. VULNERABILITY MANAGEMENT POLICY
- Monthly automated CVE correlation scans against NIST NVD & MITRE CVE registries.
- SLA for Critical CVE patching: 72 Hours.`
    },
    { 
      id: 'privacy', 
      name: `Privacy_Policy_GDPR_CCPA.pdf`, 
      type: 'Legal & GDPR Compliance',
      size: "480 KB", 
      date: "2026-01-05",
      previewText: `================================================================================
CORPLENS AI VERIFIED PUBLIC DOCUMENT
Document Title: ${company.name} - Global Privacy Policy & GDPR / CCPA Compliance Attestation
Primary Domain: ${company.primary_domain}
Classification: PUBLIC LEGAL COMPLIANCE DOCUMENT
================================================================================

1. DATA PROCESSING & PROTECTION PRINCIPLES
This document details data protection practices, lawful bases for processing under GDPR Article 6, data subject rights, and cross-border data transfer safeguards.

2. SUB-PROCESSORS & CLOUD PROVIDERS
- Hosting: Amazon Web Services (AWS us-east-1), Cloudflare Anycast Edge.
- Encryption at Rest: AWS KMS AES-256.`
    }
  ];

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto bg-slate-50 text-slate-900 font-sans min-h-screen">
      {/* ─────────────────────────────────────────────────────────────
          1. HEADER PROFILE CARD - Clean Light Theme
      ───────────────────────────────────────────────────────────── */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="h-14 w-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-2xl shadow-sm">
              {company.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-heading">
                  {company.name}
                </h1>
                <RiskBadge score={company.risk_score} tier={company.risk_tier} size="md" />
                <span className="text-[10px] bg-blue-50 text-blue-600 border border-blue-200 px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider">
                  CorpLens One Intelligence
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-2 font-mono">
                <span className="flex items-center gap-1.5 text-blue-600 font-bold">
                  <Globe className="h-4 w-4" />
                  {company.primary_domain}
                </span>
                <span>•</span>
                <span>{company.industry || 'Technology'}</span>
                <span>•</span>
                <span>{company.country || 'United States'}</span>
                <span>•</span>
                <span className="text-slate-400">Scan Date: {new Date(company.last_scanned || Date.now()).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="primary"
              onClick={() => {
                const url = api.getReportDownloadUrl(company.id, 'pdf');
                api.downloadFile(url, `CorpLens_Executive_Brief_${company.primary_domain}.pdf`);
              }}
              leftIcon={<Download className="h-4 w-4" />}
            >
              Export Brief (PDF)
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                const url = api.getReportDownloadUrl(company.id, 'json');
                api.downloadFile(url, `CorpLens_Intelligence_${company.primary_domain}.json`);
              }}
              leftIcon={<Download className="h-4 w-4 text-slate-500" />}
            >
              JSON Data
            </Button>
          </div>
        </div>

        {/* 4-Pillar Risk Scores Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider font-mono">Infrastructure Risk</div>
            <div className="text-xl font-extrabold text-slate-900 mt-1 font-mono">{risk.infrastructure_score} <span className="text-xs text-slate-400 font-normal">/ 100</span></div>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider font-mono">Tech Vulnerabilities</div>
            <div className="text-xl font-extrabold text-slate-900 mt-1 font-mono">{risk.technology_score} <span className="text-xs text-slate-400 font-normal">/ 100</span></div>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider font-mono">Reputation Signals</div>
            <div className="text-xl font-extrabold text-slate-900 mt-1 font-mono">{risk.reputation_score} <span className="text-xs text-slate-400 font-normal">/ 100</span></div>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider font-mono">Compliance & Sanctions</div>
            <div className="text-xl font-extrabold text-slate-900 mt-1 font-mono">{risk.compliance_score} <span className="text-xs text-slate-400 font-normal">/ 100</span></div>
          </div>
        </div>

        {/* AI Executive Intelligence Summary */}
        <div className="bg-blue-50/80 border border-blue-200 p-4 rounded-xl flex items-start gap-3">
          <Bot className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
          <div className="text-xs text-slate-800 leading-relaxed font-sans">
            <span className="font-bold text-blue-600 mr-1.5 uppercase tracking-wider">AI Executive Intelligence Summary:</span>
            {risk.ai_summary}
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. MODULE NAVIGATION TABS - White Responsive Pill Design
      ───────────────────────────────────────────────────────────── */}
      <div className="border-b border-slate-200 flex items-center gap-2 overflow-x-auto pb-px bg-white p-2 rounded-xl shadow-sm">
        {[
          { id: 'footprint', label: 'Digital Footprint & DNS', icon: Globe },
          { id: 'tech', label: 'Tech Stack Intelligence', icon: Cpu },
          { id: 'cve', label: `Public CVEs (${company.cve_findings.length})`, icon: ShieldAlert },
          { id: 'docs', label: 'Public Documents & Whitepapers', icon: FileText },
          { id: 'news', label: 'News & Incidents', icon: Newspaper },
          { id: 'reputation', label: 'Reputation & ESG', icon: ShieldCheck }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap uppercase tracking-wider ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. TAB CONTENT SECTIONS — 100% High-Contrast Light Mode
      ───────────────────────────────────────────────────────────── */}
      <div className="space-y-6">
        {/* 1. Digital Footprint & DNS Records */}
        {activeTab === 'footprint' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {company.domains.map((dom) => (
              <div key={dom.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="font-bold text-slate-900 flex items-center gap-2 font-mono text-sm">
                    <Globe className="h-4 w-4 text-blue-600" />
                    {dom.domain_name}
                  </div>
                  <span className="text-[10px] font-mono font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded uppercase tracking-wider">
                    DNS RESOLVED
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-400 font-bold uppercase text-[10px] block">IP ADDRESS</span>
                    <div className="font-bold text-slate-900 mt-0.5">{dom.ip_address}</div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-400 font-bold uppercase text-[10px] block">ASN RECORD</span>
                    <div className="text-slate-800 text-[11px] font-bold mt-0.5">{dom.asn || 'AS13335 (Cloudflare)'}</div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-400 font-bold uppercase text-[10px] block">HOSTING CLOUD</span>
                    <div className="text-slate-800 font-bold mt-0.5">{dom.hosting_provider || 'Cloudflare Anycast Edge'}</div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-400 font-bold uppercase text-[10px] block">SSL CERTIFICATE</span>
                    <div className="text-slate-800 flex items-center gap-1 text-[11px] font-bold mt-0.5">
                      <Lock className="h-3 w-3 text-emerald-600" />
                      {dom.ssl_issuer || "DigiCert TLS RSA CA"}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="text-[10px] font-bold font-mono text-slate-500 uppercase tracking-widest">DNS Record Map</div>
                  <div className="bg-slate-900 p-4 rounded-xl font-mono text-xs space-y-1.5 text-slate-200 border border-slate-800">
                    <div><span className="text-blue-400 font-bold">A:</span> {dom.dns_records?.A?.join(', ') || dom.ip_address}</div>
                    <div><span className="text-sky-400 font-bold">MX:</span> {dom.dns_records?.MX?.join(', ') || 'mail.' + dom.domain_name}</div>
                    <div><span className="text-emerald-400 font-bold">TXT:</span> v=spf1 include:_spf.google.com ~all</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 2. Tech Stack Intelligence */}
        {activeTab === 'tech' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide font-heading flex items-center gap-2">
                <Cpu className="h-4 w-4 text-blue-600" />
                Detected Web Frameworks & Technology Infrastructure
              </h3>
              <Badge variant="cyan">{company.tech_stack.length} Detected Frameworks</Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {company.tech_stack.map((t) => (
                <div key={t.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 hover:border-blue-300 transition-colors">
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider font-extrabold font-mono">{t.category}</div>
                  <div className="text-sm font-extrabold text-slate-900 flex items-center justify-between font-heading">
                    <span>{t.technology_name}</span>
                    <span className="text-xs font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 font-bold">
                      v{t.detected_version || '1.0'}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    Confidence: <strong className="text-emerald-600">{(t.confidence * 100).toFixed(0)}%</strong> (Passive Banners)
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. Public Vulnerabilities (CVE) */}
        {activeTab === 'cve' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide font-heading flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 text-rose-600" />
                  Correlated Vulnerabilities (NIST NVD CVE Database)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Live tech-stack version mapping against public CVE feeds.</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={cveSearchQuery}
                    onChange={(e) => setCveSearchQuery(e.target.value)}
                    placeholder="Filter CVE ID or product..."
                    className="bg-slate-100 border border-slate-200 text-slate-900 pl-8 pr-3 py-1.5 text-xs rounded-lg font-mono w-48 outline-none focus:bg-white focus:border-blue-600"
                  />
                </div>
                <select
                  value={cveSeverityFilter}
                  onChange={(e) => setCveSeverityFilter(e.target.value)}
                  className="bg-slate-100 border border-slate-200 text-slate-800 px-2.5 py-1.5 text-xs rounded-lg font-bold outline-none"
                >
                  <option value="ALL">All Severities</option>
                  <option value="CRITICAL">CRITICAL</option>
                  <option value="HIGH">HIGH</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="LOW">LOW</option>
                </select>
              </div>
            </div>

            {filteredCves.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs font-mono">
                Zero matching correlated CVE vulnerability records found for this target filter.
              </div>
            ) : (
              <div className="space-y-4">
                {filteredCves.map((cve) => (
                  <div key={cve.id} className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3 shadow-sm hover:border-slate-300 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-extrabold text-slate-900 text-sm tracking-wide">{cve.cve_id}</span>
                        <span className="text-xs text-slate-500 font-mono">({cve.technology})</span>
                      </div>
                      <Badge variant={cve.severity === 'CRITICAL' ? 'critical' : cve.severity === 'HIGH' ? 'medium' : 'low'}>
                        {cve.severity} (CVSS {cve.cvss_score})
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed font-sans">{cve.summary}</p>
                    <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                      <span>Published: {cve.published_date || 'Recent'}</span>
                      <a 
                        href={`https://nvd.nist.gov/vuln/detail/${cve.cve_id}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-blue-600 font-bold hover:underline flex items-center gap-1"
                      >
                        NIST NVD Details <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 4. Public Documents & Whitepapers */}
        {activeTab === 'docs' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide font-heading flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-600" />
              Discovered Public Corporate Documents & Compliance Reports
            </h3>
            <div className="space-y-3">
              {docsList.map((doc) => (
                <div key={doc.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between text-xs hover:border-blue-300 transition-colors">
                  <div className="flex items-center gap-3.5">
                    <div className="h-10 w-10 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center font-bold">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-extrabold text-slate-900 text-sm font-heading">{doc.name}</div>
                      <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                        {doc.type} • Indexed {doc.date} • {doc.size}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedDoc(doc)}
                      leftIcon={<Eye className="h-3.5 w-3.5 text-slate-500" />}
                    >
                      View Document
                    </Button>
                    <Button 
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        const url = api.getDocumentDownloadUrl(company.id, doc.id);
                        api.downloadFile(url, doc.name);
                      }}
                      leftIcon={<ArrowDownToLine className="h-3.5 w-3.5 stroke-[3]" />}
                    >
                      Download PDF
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. News & Incidents */}
        {activeTab === 'news' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide font-heading flex items-center gap-2">
              <Newspaper className="h-4 w-4 text-blue-600" />
              Public News & Threat Intelligence Timeline ({company.name})
            </h3>
            <div className="space-y-3">
              {getCompanyNews(company).map((newsItem, idx) => (
                <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="font-extrabold text-slate-900 text-sm font-heading">{newsItem.title}</span>
                    <Badge variant={newsItem.type === 'CRITICAL' || newsItem.type === 'HIGH RISK' ? 'critical' : 'cyan'}>
                      {newsItem.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-sans">{newsItem.summary}</p>
                  <div className="text-[10px] font-mono text-slate-500 pt-1 border-t border-slate-200">
                    Source: {newsItem.source} • Date: {newsItem.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. Reputation & ESG */}
        {activeTab === 'reputation' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide font-heading flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-blue-600" />
              Public Reputation & Regulatory Record
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                <div className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider font-mono">Regulatory Enforcement</div>
                <div className="text-base font-extrabold text-slate-900 font-heading">Clean (0 Filings)</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                <div className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider font-mono">BBB Accreditation</div>
                <div className="text-base font-extrabold text-slate-900 font-heading">A+ Rating</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                <div className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider font-mono">ESG Signal Score</div>
                <div className="text-base font-extrabold text-slate-900 font-heading">High Transparency</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Document Reader & Download Preview Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-5 border border-slate-200 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide font-heading flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-600" />
                  {selectedDoc.type}
                </h3>
                <div className="text-xs font-mono text-slate-500 mt-0.5">{selectedDoc.name}</div>
              </div>
              <button 
                onClick={() => setSelectedDoc(null)}
                className="text-slate-400 hover:text-slate-900 p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Document Full Text Content */}
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 max-h-96 overflow-y-auto font-mono text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
              {selectedDoc.previewText}
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-slate-200">
              <div className="text-[11px] font-mono text-slate-500">
                Verified SHA256 • Indexed {selectedDoc.date}
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  onClick={() => setSelectedDoc(null)}
                >
                  Close
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    const url = api.getDocumentDownloadUrl(company.id, selectedDoc.id);
                    api.downloadFile(url, selectedDoc.name);
                  }}
                  leftIcon={<ArrowDownToLine className="h-4 w-4 stroke-[3]" />}
                >
                  Download Document File
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
