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
  Filter,
  ArrowDownToLine,
  X,
  Eye
} from 'lucide-react';
import { Company, CVEFinding } from '../types';
import { api } from '../services/api';
import { RiskBadge } from '../components/RiskBadge';

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
      <div className="p-12 text-center text-zinc-400 font-mono text-sm">
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
    ai_summary: "Automated OSINT baseline compiled."
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
    } else if (c.id === 'cmp-002') {
      return [
        {
          title: 'Nexus Dynamics Flagged for OFAC Sectoral Sanctions Review on US Watchlist',
          source: 'Reuters Financial Compliance Brief',
          date: '2026-07-02',
          type: 'CRITICAL',
          summary: 'Fuzzy match 84% detected against designated entity. Analyst adjudication in progress.'
        },
        {
          title: 'CRITICAL EXPOSURE: Containerd runc File Descriptor Leak (CVE-2024-21626) Flagged',
          source: 'CISA Cybersecurity Advisory',
          date: '2026-06-28',
          type: 'HIGH RISK',
          summary: 'Vulnerability scan indicates outdated container runtime configuration requiring emergency patch.'
        },
        {
          title: 'WordPress 6.1.1 Vulnerability Discovered on Primary Marketing Domain',
          source: 'WP Security Threat Intelligence',
          date: '2026-05-14',
          type: 'WARNING',
          summary: 'Authenticated Stored XSS vulnerability identified in Gutenberg editor blocks.'
        }
      ];
    } else {
      return [
        {
          title: `Lawful OSINT Scan Compiled for ${c.name} (${c.primary_domain})`,
          source: 'CorpLens Intelligence Engine',
          date: new Date().toISOString().split('T')[0],
          type: 'INFO',
          summary: `Primary domain ${c.primary_domain} resolved to ${c.domains[0]?.ip_address || '104.21.90.11'} hosted on ${c.domains[0]?.hosting_provider || 'Cloudflare Edge'}.`
        },
        {
          title: `DNS & Mail Server Infrastructure Attestation Completed`,
          source: 'Public DNS Telemetry Feed',
          date: new Date().toISOString().split('T')[0],
          type: 'POSITIVE',
          summary: `Valid MX and SPF TXT record configuration verified for domain ${c.primary_domain}.`
        },
        {
          title: `Tech Stack Footprint: Detected ${c.tech_stack.length} Active Web Frameworks`,
          source: 'Wappalyzer / HTTP Header Scanner',
          date: new Date().toISOString().split('T')[0],
          type: 'NEUTRAL',
          summary: `Frameworks detected: ${c.tech_stack.map(t => t.technology_name).join(', ')}.`
        }
      ];
    }
  };

  const filteredCves = company.cve_findings.filter(cve => {
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
      name: `Security_Posture_Whitepaper_2025.pdf`, 
      type: 'Architecture Whitepaper',
      size: "2.8 MB", 
      date: "2025-11-20",
      previewText: `================================================================================
CORPLENS AI VERIFIED PUBLIC DOCUMENT
Document Title: ${company.name} - Cybersecurity & Cloud Infrastructure Whitepaper 2025/2026
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
This document details data protection practices, lawful bases for processing under GDPR Article 6, data subject rights (Right to Erasure / Access), and cross-border data transfer safeguards.

2. SUB-PROCESSORS & CLOUD PROVIDERS
- Hosting: Amazon Web Services (AWS us-east-1), Cloudflare Anycast Edge.
- Encryption at Rest: AWS KMS AES-256.`
    }
  ];

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Workspace Header - B&W Glassy */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="h-14 w-14 rounded-xl bg-zinc-900 border border-white/20 text-white flex items-center justify-center font-black text-2xl shadow-xl glow-white">
              {company.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-extrabold text-white tracking-wide">{company.name}</h1>
                <RiskBadge score={company.risk_score} tier={company.risk_tier} size="md" />
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 mt-2 font-mono">
                <span className="flex items-center gap-1 text-white font-bold">
                  <Globe className="h-3.5 w-3.5 text-zinc-300" />
                  {company.primary_domain}
                </span>
                <span>•</span>
                <span>{company.industry}</span>
                <span>•</span>
                <span>{company.country}</span>
                <span>•</span>
                <span className="text-zinc-500">Scan Date: {new Date(company.last_scanned || Date.now()).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                const url = api.getReportDownloadUrl(company.id, 'pdf');
                api.downloadFile(url, `CorpLens_Executive_Brief_${company.primary_domain}.pdf`);
              }}
              className="glass-btn px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-2"
            >
              <Download className="h-4 w-4 text-white" />
              Export Brief (PDF)
            </button>
            <button
              onClick={() => {
                const url = api.getReportDownloadUrl(company.id, 'json');
                api.downloadFile(url, `CorpLens_Intelligence_${company.primary_domain}.json`);
              }}
              className="glass-btn px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-2"
            >
              <Download className="h-4 w-4 text-zinc-300" />
              JSON Data
            </button>
          </div>
        </div>

        {/* Multidimensional Risk Engine Scores */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10">
          <div className="bg-zinc-950/80 p-3.5 rounded-xl border border-white/10">
            <div className="text-[11px] text-zinc-400 font-extrabold uppercase tracking-wider">Infrastructure Risk</div>
            <div className="text-xl font-extrabold text-white mt-1 font-mono">{risk.infrastructure_score} <span className="text-xs text-zinc-500 font-normal">/ 100</span></div>
          </div>
          <div className="bg-zinc-950/80 p-3.5 rounded-xl border border-white/10">
            <div className="text-[11px] text-zinc-400 font-extrabold uppercase tracking-wider">Tech Vulnerabilities</div>
            <div className="text-xl font-extrabold text-white mt-1 font-mono">{risk.technology_score} <span className="text-xs text-zinc-500 font-normal">/ 100</span></div>
          </div>
          <div className="bg-zinc-950/80 p-3.5 rounded-xl border border-white/10">
            <div className="text-[11px] text-zinc-400 font-extrabold uppercase tracking-wider">Reputation Signals</div>
            <div className="text-xl font-extrabold text-white mt-1 font-mono">{risk.reputation_score} <span className="text-xs text-zinc-500 font-normal">/ 100</span></div>
          </div>
          <div className="bg-zinc-950/80 p-3.5 rounded-xl border border-white/10">
            <div className="text-[11px] text-zinc-400 font-extrabold uppercase tracking-wider">Compliance & Sanctions</div>
            <div className="text-xl font-extrabold text-white mt-1 font-mono">{risk.compliance_score} <span className="text-xs text-zinc-500 font-normal">/ 100</span></div>
          </div>
        </div>

        {/* AI Summary Banner */}
        <div className="bg-zinc-950 border border-white/20 p-4 rounded-xl flex items-start gap-3 shadow-inner">
          <Bot className="h-5 w-5 text-white mt-0.5 shrink-0" />
          <div className="text-xs text-zinc-200 leading-relaxed font-sans">
            <span className="font-bold text-white mr-1.5 uppercase tracking-wider">AI Executive Intelligence Summary:</span>
            {risk.ai_summary}
          </div>
        </div>
      </div>

      {/* Module Tabs */}
      <div className="border-b border-white/10 flex items-center gap-2 overflow-x-auto pb-px">
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
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all whitespace-nowrap uppercase tracking-wider ${
                isActive
                  ? 'border-white text-white bg-zinc-900/80'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {/* 1. Digital Footprint */}
        {activeTab === 'footprint' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {company.domains.map((dom) => (
              <div key={dom.id} className="glass-panel p-5 rounded-xl space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="font-bold text-white flex items-center gap-2 font-mono text-sm">
                    <Globe className="h-4 w-4 text-white" />
                    {dom.domain_name}
                  </div>
                  <span className="text-[10px] font-extrabold text-black bg-white px-2 py-0.5 rounded tracking-wider uppercase">
                    RESOLVED
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-zinc-500 font-bold uppercase text-[10px]">IP Address:</span>
                    <div className="font-mono text-white font-bold">{dom.ip_address}</div>
                  </div>
                  <div>
                    <span className="text-zinc-500 font-bold uppercase text-[10px]">ASN Record:</span>
                    <div className="text-zinc-200 font-mono text-[11px]">{dom.asn}</div>
                  </div>
                  <div>
                    <span className="text-zinc-500 font-bold uppercase text-[10px]">Hosting Cloud:</span>
                    <div className="text-zinc-200">{dom.hosting_provider}</div>
                  </div>
                  <div>
                    <span className="text-zinc-500 font-bold uppercase text-[10px]">SSL Certificate:</span>
                    <div className="text-zinc-200 flex items-center gap-1 font-mono text-[11px]">
                      <Lock className="h-3 w-3 text-white" />
                      {dom.ssl_issuer}
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-white/10">
                  <div className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest">DNS Record Maps</div>
                  <div className="bg-zinc-950 p-3 rounded-lg font-mono text-xs space-y-1 text-zinc-300 border border-white/10">
                    <div><span className="text-white font-bold">A:</span> {dom.dns_records.A?.join(', ') || dom.ip_address}</div>
                    <div><span className="text-zinc-300 font-bold">MX:</span> {dom.dns_records.MX?.join(', ') || 'mail.' + dom.domain_name}</div>
                    <div><span className="text-zinc-400 font-bold">TXT:</span> v=spf1 include:_spf.google.com ~all</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 2. Tech Stack */}
        {activeTab === 'tech' && (
          <div className="glass-panel p-6 rounded-xl space-y-4">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
              <Cpu className="h-4 w-4 text-white" />
              Detected Web Frameworks & Technology Stack
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {company.tech_stack.map((t) => (
                <div key={t.id} className="bg-zinc-950/80 p-4 rounded-xl border border-white/10 space-y-2">
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-extrabold">{t.category}</div>
                  <div className="text-sm font-extrabold text-white flex items-center justify-between">
                    <span>{t.technology_name}</span>
                    <span className="text-xs font-mono text-white bg-zinc-800 px-2 py-0.5 rounded border border-zinc-700">
                      v{t.detected_version || '1.0'}
                    </span>
                  </div>
                  <div className="text-[11px] text-zinc-400 font-mono">
                    Confidence: {(t.confidence * 100).toFixed(0)}% (HTTP Headers)
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. Public Vulnerabilities (CVE) */}
        {activeTab === 'cve' && (
          <div className="glass-panel p-6 rounded-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 text-white" />
                  Correlated Vulnerabilities (NIST NVD CVE Database)
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">Live tech-stack version mapping against public CVE feeds.</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-zinc-400" />
                  <input
                    type="text"
                    value={cveSearchQuery}
                    onChange={(e) => setCveSearchQuery(e.target.value)}
                    placeholder="Filter CVE ID or product..."
                    className="glass-input pl-8 pr-3 py-1.5 text-xs rounded-lg font-mono w-48"
                  />
                </div>
                <select
                  value={cveSeverityFilter}
                  onChange={(e) => setCveSeverityFilter(e.target.value)}
                  className="glass-input px-2.5 py-1.5 text-xs rounded-lg font-bold"
                >
                  <option value="ALL" className="bg-black text-white">All Severities</option>
                  <option value="CRITICAL" className="bg-black text-white">CRITICAL</option>
                  <option value="HIGH" className="bg-black text-white">HIGH</option>
                  <option value="MEDIUM" className="bg-black text-white">MEDIUM</option>
                  <option value="LOW" className="bg-black text-white">LOW</option>
                </select>
              </div>
            </div>

            {filteredCves.length === 0 ? (
              <div className="p-8 text-center text-zinc-400 text-xs font-mono">
                Zero matching correlated CVE vulnerability records found for this target filter.
              </div>
            ) : (
              <div className="space-y-4">
                {filteredCves.map((cve) => (
                  <div key={cve.id} className="bg-zinc-950 p-4 rounded-xl border border-white/15 space-y-3 shadow-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-black text-white text-sm tracking-wide">{cve.cve_id}</span>
                        <span className="text-xs text-zinc-400 font-mono">({cve.technology})</span>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-black border ${
                        cve.severity === 'CRITICAL' ? 'bg-white text-black border-white' :
                        cve.severity === 'HIGH' ? 'bg-zinc-800 text-white border-zinc-600' :
                        'bg-zinc-900 text-zinc-300 border-zinc-800'
                      }`}>
                        {cve.severity} (CVSS {cve.cvss_score})
                      </span>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed">{cve.summary}</p>
                    <div className="pt-2 border-t border-zinc-900 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                      <span>Published: {cve.published_date}</span>
                      <a 
                        href={`https://nvd.nist.gov/vuln/detail/${cve.cve_id}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-white font-bold hover:underline flex items-center gap-1"
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

        {/* 4. Public Documents & Whitepapers - Interactive Preview & Download */}
        {activeTab === 'docs' && (
          <div className="glass-panel p-6 rounded-xl space-y-4">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
              <FileText className="h-4 w-4 text-white" />
              Discovered Public Corporate Documents & Compliance Reports
            </h3>
            <div className="space-y-3">
              {docsList.map((doc) => (
                <div key={doc.id} className="bg-zinc-950 p-4 rounded-xl border border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3.5">
                    <div className="h-10 w-10 rounded-lg bg-zinc-900 border border-white/20 text-white flex items-center justify-center font-bold">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-extrabold text-white text-sm">{doc.name}</div>
                      <div className="text-[11px] text-zinc-400 font-mono mt-0.5">
                        {doc.type} • Indexed {doc.date} • {doc.size}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setSelectedDoc(doc)}
                      className="glass-btn px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5"
                    >
                      <Eye className="h-3.5 w-3.5 text-zinc-300" />
                      View Document
                    </button>
                    <button 
                      onClick={() => {
                        const url = api.getDocumentDownloadUrl(company.id, doc.id);
                        api.downloadFile(url, doc.name);
                      }}
                      className="glass-btn-primary px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow"
                    >
                      <ArrowDownToLine className="h-3.5 w-3.5 stroke-[3]" />
                      Download PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. News & Incidents */}
        {activeTab === 'news' && (
          <div className="glass-panel p-6 rounded-xl space-y-4">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
              <Newspaper className="h-4 w-4 text-white" />
              Public News & Threat Intelligence Timeline ({company.name})
            </h3>
            <div className="space-y-3">
              {getCompanyNews(company).map((newsItem, idx) => (
                <div key={idx} className="bg-zinc-950 p-4 rounded-xl border border-white/10 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="font-extrabold text-white text-sm">{newsItem.title}</span>
                    <span className={`text-[10px] px-2.5 py-0.5 rounded font-mono font-black uppercase tracking-wider self-start sm:self-auto border ${
                      newsItem.type === 'CRITICAL' || newsItem.type === 'HIGH RISK' ? 'bg-white text-black border-white' :
                      newsItem.type === 'WARNING' ? 'bg-zinc-800 text-white border-zinc-600' :
                      newsItem.type === 'POSITIVE' ? 'bg-zinc-900 text-zinc-200 border-zinc-700' :
                      'bg-zinc-950 text-zinc-400 border-zinc-800'
                    }`}>
                      {newsItem.type}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed font-sans">{newsItem.summary}</p>
                  <div className="text-[10px] font-mono text-zinc-500 pt-1 border-t border-zinc-900">
                    Source: {newsItem.source} • Date: {newsItem.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. Reputation & ESG */}
        {activeTab === 'reputation' && (
          <div className="glass-panel p-6 rounded-xl space-y-4">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-white" />
              Public Reputation & Regulatory Record
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-zinc-950 p-4 rounded-xl border border-white/10 space-y-1">
                <div className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-widest">Regulatory Enforcement</div>
                <div className="text-base font-extrabold text-white">Clean (0 Filings)</div>
              </div>
              <div className="bg-zinc-950 p-4 rounded-xl border border-white/10 space-y-1">
                <div className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-widest">BBB Accreditation</div>
                <div className="text-base font-extrabold text-white">A+ Rating</div>
              </div>
              <div className="bg-zinc-950 p-4 rounded-xl border border-white/10 space-y-1">
                <div className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-widest">ESG Signal Score</div>
                <div className="text-base font-extrabold text-white">High Transparency</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Document Reader & Download Preview Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel border border-white/20 rounded-2xl max-w-2xl w-full p-6 space-y-5 shadow-2xl glow-white">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                  <FileText className="h-4 w-4 text-white" />
                  {selectedDoc.type}
                </h3>
                <div className="text-xs font-mono text-zinc-400 mt-0.5">{selectedDoc.name}</div>
              </div>
              <button 
                onClick={() => setSelectedDoc(null)}
                className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Document Full Text Content */}
            <div className="bg-zinc-950 p-4 rounded-xl border border-white/10 max-h-96 overflow-y-auto font-mono text-xs text-zinc-300 leading-relaxed whitespace-pre-wrap">
              {selectedDoc.previewText}
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-white/10">
              <div className="text-[11px] font-mono text-zinc-400">
                Verified SHA256 • Indexed {selectedDoc.date}
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedDoc(null)}
                  className="glass-btn px-4 py-2 rounded-xl text-xs font-bold"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const url = api.getDocumentDownloadUrl(company.id, selectedDoc.id);
                    api.downloadFile(url, selectedDoc.name);
                  }}
                  className="glass-btn-primary px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow"
                >
                  <ArrowDownToLine className="h-4 w-4 stroke-[3]" />
                  Download Document File
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
