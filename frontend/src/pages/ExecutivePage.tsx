import React, { useState } from 'react';
import { Users, Briefcase, GlobeIcon, Award, BookOpen, Calendar, AlertTriangle, ExternalLink } from 'lucide-react';

interface Executive {
  id: string;
  name: string;
  title: string;
  company: string;
  company_id: string;
  tenure_start: string;
  linkedin?: string;
  board_memberships: string[];
  prior_companies: { company: string; title: string; period: string }[];
  publications: string[];
  risk_flags: string[];
  bio: string;
}

const EXECUTIVES: Executive[] = [
  {
    id: 'exec-001',
    name: 'Sarah Jenkins',
    title: 'Chief Executive Officer',
    company: 'Acme Global Financial Group',
    company_id: 'cmp-001',
    tenure_start: '2019',
    board_memberships: ['Acme Capital LLC (Board Director)', 'FinServ Innovation Council', 'Federal Reserve Advisory Board (Observer)'],
    prior_companies: [
      { company: 'Goldman Sachs', title: 'Managing Director, Risk Analytics', period: '2014–2019' },
      { company: 'Deloitte Financial Advisory', title: 'Senior Partner', period: '2009–2014' },
      { company: 'Morgan Stanley', title: 'VP Risk Quantitative Analysis', period: '2003–2009' }
    ],
    publications: [
      '"AI-Native Risk Management in Modern Banking" — Harvard Business Review (2024)',
      '"Third-Party Vendor Intelligence: A Practitioner\'s Guide" — CFO Magazine (2023)'
    ],
    risk_flags: [],
    bio: 'Sarah Jenkins is the Chief Executive Officer of Acme Global Financial Group. She has over 20 years of experience in financial risk management, regulatory compliance, and enterprise technology leadership.'
  },
  {
    id: 'exec-002',
    name: 'Michael Chen',
    title: 'Chief Information Security Officer',
    company: 'Acme Global Financial Group',
    company_id: 'cmp-001',
    tenure_start: '2021',
    board_memberships: ['ISACA Advisory Board', 'Cloud Security Alliance (CSA)'],
    prior_companies: [
      { company: 'CrowdStrike', title: 'Senior Threat Intelligence Analyst', period: '2018–2021' },
      { company: 'Palo Alto Networks', title: 'Principal Security Architect', period: '2015–2018' }
    ],
    publications: [
      '"Zero Trust Architecture in Financial Services" — IEEE Security (2023)',
      '"CVE Correlation at Enterprise Scale" — RSA Conference Proceedings (2022)'
    ],
    risk_flags: [],
    bio: 'Michael Chen leads the information security and cybersecurity posture management function at Acme Global. Former threat intelligence analyst with CrowdStrike and Palo Alto Networks.'
  },
  {
    id: 'exec-003',
    name: 'David Vance',
    title: 'Chief Technology Officer',
    company: 'Nexus Dynamics Defense Solutions',
    company_id: 'cmp-002',
    tenure_start: '2021',
    board_memberships: ['Defense Tech Innovation Council'],
    prior_companies: [
      { company: 'Palantir Technologies', title: 'Principal Engineer, Intelligence Systems', period: '2016–2021' },
      { company: 'US Department of Defense (Contractor)', title: 'Systems Architect', period: '2012–2016' }
    ],
    publications: [
      '"Container Security in Hostile Environments" — BlackHat USA (2023)'
    ],
    risk_flags: ['Entity under OFAC sanctions review — Company requires compliance adjudication (84% fuzzy match)'],
    bio: 'David Vance serves as CTO of Nexus Dynamics Defense Solutions. Former Palantir engineer with background in US defense intelligence systems. Associated entity currently under OFAC compliance review.'
  }
];

export const ExecutivePage: React.FC = () => {
  const [selectedExec, setSelectedExec] = useState<Executive | null>(EXECUTIVES[0]);
  const [filterCompany, setFilterCompany] = useState('all');

  const filtered = filterCompany === 'all' ? EXECUTIVES : EXECUTIVES.filter(e => e.company_id === filterCompany);

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-wider flex items-center gap-3">
            <Users className="h-6 w-6 text-white" />
            Executive Intelligence
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Leadership profiles, career timelines, board memberships, and risk flags
          </p>
        </div>
        <select
          value={filterCompany}
          onChange={e => setFilterCompany(e.target.value)}
          className="glass-input px-3 py-2 rounded-lg text-xs font-bold"
        >
          <option value="all" className="bg-black">All Companies</option>
          <option value="cmp-001" className="bg-black">Acme Global Financial Group</option>
          <option value="cmp-002" className="bg-black">Nexus Dynamics Defense</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Executive List */}
        <div className="space-y-3">
          {filtered.map(exec => (
            <div
              key={exec.id}
              onClick={() => setSelectedExec(exec)}
              className={`glass-card p-4 rounded-2xl border cursor-pointer transition-all ${
                selectedExec?.id === exec.id ? 'border-white/40 bg-zinc-900/80' : 'border-white/10 hover:border-white/25'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-zinc-900 border border-white/20 flex items-center justify-center font-black text-white text-xl">
                  {exec.name.charAt(0)}
                </div>
                <div>
                  <div className="font-extrabold text-white text-sm">{exec.name}</div>
                  <div className="text-[10px] text-zinc-400 font-mono mt-0.5">{exec.title}</div>
                  <div className="text-[9px] text-zinc-600 mt-0.5">{exec.company}</div>
                </div>
              </div>
              {exec.risk_flags.length > 0 && (
                <div className="mt-2.5 flex items-center gap-1.5 text-[9px] font-bold text-black bg-white px-2 py-1 rounded uppercase tracking-widest">
                  <AlertTriangle className="h-2.5 w-2.5" /> Risk Flag Detected
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Executive Detail */}
        {selectedExec && (
          <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-white/10 space-y-6">
            <div className="flex items-start gap-4 border-b border-white/10 pb-4">
              <div className="h-16 w-16 rounded-2xl bg-zinc-900 border border-white/20 flex items-center justify-center font-black text-white text-3xl">
                {selectedExec.name.charAt(0)}
              </div>
              <div>
                <h2 className="font-extrabold text-white text-lg">{selectedExec.name}</h2>
                <div className="text-xs text-zinc-400 font-mono">{selectedExec.title} • {selectedExec.company}</div>
                <div className="text-[10px] text-zinc-500 mt-0.5">Active since {selectedExec.tenure_start}</div>
              </div>
            </div>

            {selectedExec.risk_flags.length > 0 && (
              <div className="bg-white text-black p-4 rounded-xl space-y-1">
                <div className="text-xs font-extrabold uppercase tracking-widest flex items-center gap-2"><AlertTriangle className="h-4 w-4" /> Risk Flag</div>
                {selectedExec.risk_flags.map((f, i) => <p key={i} className="text-xs">{f}</p>)}
              </div>
            )}

            <div>
              <div className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest mb-2">Executive Biography</div>
              <p className="text-xs text-zinc-200 leading-relaxed">{selectedExec.bio}</p>
            </div>

            <div>
              <div className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest mb-2 flex items-center gap-1.5"><Briefcase className="h-3.5 w-3.5" /> Career Timeline</div>
              <div className="space-y-2">
                {selectedExec.prior_companies.map((pc, i) => (
                  <div key={i} className="flex items-center gap-3 bg-zinc-950 p-3 rounded-xl border border-white/10">
                    <div className="h-2 w-2 rounded-full bg-white shrink-0" />
                    <div>
                      <div className="font-bold text-xs text-white">{pc.company}</div>
                      <div className="text-[10px] text-zinc-400 font-mono">{pc.title} • {pc.period}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest mb-2 flex items-center gap-1.5"><Award className="h-3.5 w-3.5" /> Board Memberships</div>
                <div className="space-y-1.5">
                  {selectedExec.board_memberships.map((b, i) => (
                    <div key={i} className="text-[10px] font-mono text-zinc-300 bg-zinc-950 px-3 py-1.5 rounded-lg border border-white/10">{b}</div>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest mb-2 flex items-center gap-1.5"><BookOpen className="h-3.5 w-3.5" /> Publications</div>
                <div className="space-y-1.5">
                  {selectedExec.publications.map((p, i) => (
                    <div key={i} className="text-[10px] font-sans text-zinc-300 bg-zinc-950 px-3 py-1.5 rounded-lg border border-white/10 leading-snug">{p}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
