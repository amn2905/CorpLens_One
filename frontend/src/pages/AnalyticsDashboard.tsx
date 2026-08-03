import React, { useState } from 'react';
import { BarChart3, Download, FileText, Printer, CheckCircle2, Clock, FileCheck } from 'lucide-react';
import { TrendChart } from '../components/ui/TrendChart';
import { api } from '../services/api';

export const AnalyticsDashboard: React.FC = () => {
  const reportTemplates = [
    { title: 'Executive OSINT Risk Brief', desc: 'ISO/IEC 27037 compliant PDF for board members & CISO review.', type: 'Executive Brief', size: '1.4 MB' },
    { title: 'Technical Vulnerability Advisory Report', desc: 'Detailed CVSS breakdown, open ports, and patch remediation SLAs.', type: 'SOC / Engineering', size: '2.8 MB' },
    { title: 'Sanctions & PEP Adjudication Audit Report', desc: 'Fuzzy string matching logs against OFAC SDN, UN, and EU watchlists.', type: 'Compliance', size: '980 KB' },
    { title: 'Third-Party Vendor Risk Assessment', desc: 'SLA uptime metrics, DNS stability, and 4th-party dependency trees.', type: 'TPRM Team', size: '3.1 MB' }
  ];

  return (
    <div className="space-y-6 font-sans">
      {/* Header Banner */}
      <div className="clay-panel p-6 bg-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold text-[#1E293B] font-heading tracking-tight flex items-center gap-3">
              <BarChart3 className="h-6 w-6 text-[#3B82F6]" />
              Executive Reports & Analytics Hub
            </h1>
            <span className="text-xs font-mono font-bold bg-[#EEF6FF] text-[#3B82F6] border border-[#DCE7F5] px-3 py-1 rounded-full">
              ISO/IEC 27037 Attested
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
            Generate and export multi-format corporate risk assessments, executive PDF briefs, and compliance audit certificates.
          </p>
        </div>

        <button
          onClick={() => {
            const url = api.getReportDownloadUrl('cmp-001', 'pdf');
            api.downloadFile(url, 'CorpLens_One_Portfolio_Executive_Brief.pdf');
          }}
          className="clay-button-primary px-5 py-2.5 text-xs flex items-center gap-2 font-bold shrink-0"
        >
          <Download className="w-4 h-4" />
          Export Master Portfolio Brief (PDF)
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="clay-card p-5 space-y-2">
          <div className="text-xs font-bold text-[#64748B] uppercase tracking-wider font-heading">Portfolio Risk Score</div>
          <div className="text-2xl font-black text-[#1E293B] font-mono">2.8 / 10.0</div>
          <div className="text-xs text-emerald-600 font-bold font-mono">Low Risk Baseline</div>
        </div>

        <div className="clay-card p-5 space-y-2">
          <div className="text-xs font-bold text-[#64748B] uppercase tracking-wider font-heading">Vulnerability Advisories</div>
          <div className="text-2xl font-black text-[#1E293B] font-mono">14 CVEs</div>
          <div className="text-xs text-rose-600 font-bold font-mono">3 Critical SLA</div>
        </div>

        <div className="clay-card p-5 space-y-2">
          <div className="text-xs font-bold text-[#64748B] uppercase tracking-wider font-heading">Sanctions Screening Score</div>
          <div className="text-2xl font-black text-[#1E293B] font-mono">99.4% Clean</div>
          <div className="text-xs text-emerald-600 font-bold font-mono">100% Attested</div>
        </div>
      </div>

      {/* Trend Area Chart */}
      <div className="clay-card p-6 space-y-4">
        <h3 className="text-sm font-extrabold text-[#1E293B] uppercase tracking-wide font-heading">
          30-Day Cross-Portfolio Risk Evolution Trend
        </h3>
        <TrendChart title="" height={280} />
      </div>

      {/* Report Templates Grid */}
      <div className="clay-card p-6 space-y-4">
        <h3 className="text-sm font-extrabold text-[#1E293B] uppercase tracking-wide font-heading flex items-center gap-2">
          <FileCheck className="w-4 h-4 text-[#3B82F6]" />
          Standard Enterprise Report Templates
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reportTemplates.map((tmpl, idx) => (
            <div key={idx} className="p-5 rounded-[16px] bg-[#F4F9FF] border border-[#DCE7F5] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono bg-white text-[#3B82F6] border border-[#DCE7F5] px-2.5 py-0.5 rounded-full">
                  {tmpl.type}
                </span>
                <span className="text-[10px] font-mono text-[#94A3B8]">{tmpl.size}</span>
              </div>
              <h4 className="font-extrabold text-sm text-[#1E293B] font-heading">{tmpl.title}</h4>
              <p className="text-xs text-[#64748B] leading-relaxed">{tmpl.desc}</p>
              <button
                onClick={() => {
                  const url = api.getReportDownloadUrl('cmp-001', 'pdf');
                  api.downloadFile(url, `${tmpl.title.replace(/\s+/g, '_')}.pdf`);
                }}
                className="clay-button-secondary px-4 py-2 text-xs w-full flex items-center justify-center gap-2 font-bold"
              >
                <Download className="w-3.5 h-3.5" />
                Generate & Export PDF Report
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
