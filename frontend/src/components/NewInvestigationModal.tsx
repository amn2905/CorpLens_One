import React, { useState } from 'react';
import { 
  Sparkles, 
  X, 
  Globe, 
  ShieldCheck, 
  Cpu, 
  ShieldAlert, 
  CheckCircle2, 
  Building, 
  Layers, 
  Sliders,
  ArrowRight,
  Loader2
} from 'lucide-react';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';

interface NewInvestigationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitScan: (data: {
    domain: string;
    name: string;
    industry: string;
    options: {
      dnsMap: boolean;
      sslCert: boolean;
      cveMatch: boolean;
      sanctionsCheck: boolean;
    };
    depth: string;
  }) => void;
}

export const NewInvestigationModal: React.FC<NewInvestigationModalProps> = ({
  isOpen,
  onClose,
  onSubmitScan
}) => {
  const [domain, setDomain] = useState('');
  const [name, setName] = useState('');
  const [industry, setIndustry] = useState('Technology & Cloud Services');
  const [depth, setDepth] = useState('comprehensive');

  // OSINT Telemetry Toggle States
  const [dnsMap, setDnsMap] = useState(true);
  const [sslCert, setSslCert] = useState(true);
  const [cveMatch, setCveMatch] = useState(true);
  const [sanctionsCheck, setSanctionsCheck] = useState(true);

  // Scanning State Progress
  const [isScanning, setIsScanning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const scanSteps = [
    'Resolving DNS Records (A, MX, TXT, SPF/DMARC)...',
    'Querying SSL Certificate Transparency Logs...',
    'Correlating Web Stack against NIST NVD CVE Database...',
    'Fuzzy String Matching against OFAC SDN & EU Sanction Lists...',
    'Compiling ISO/IEC 27037 Evidentiary Attestation PDF Brief...'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain.trim()) return;

    setIsScanning(true);
    setCurrentStep(0);

    // Simulate multi-phase scan pipeline steps
    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      if (step < scanSteps.length) {
        setCurrentStep(step);
      } else {
        clearInterval(interval);
        setIsScanning(false);
        onSubmitScan({
          domain,
          name: name || domain.split('.')[0].toUpperCase() + ' Corp',
          industry,
          options: { dnsMap, sslCert, cveMatch, sanctionsCheck },
          depth
        });
      }
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-6 border border-slate-200 shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center font-black">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 tracking-tight font-heading">
                Launch OSINT Investigation Scan
              </h3>
              <span className="text-xs text-slate-500 font-mono">
                100% Lawful Passive Telemetry Ingestion • ISO/IEC 27037 Compliant
              </span>
            </div>
          </div>
          <button 
            onClick={onClose}
            disabled={isScanning}
            className="text-slate-400 hover:text-slate-900 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Live Ingestion Progress Overlay */}
        {isScanning ? (
          <div className="py-8 space-y-6 text-center">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
              <div className="space-y-1">
                <h4 className="font-extrabold text-base text-slate-900 font-heading">
                  Executing Automated OSINT Ingestion Pipeline
                </h4>
                <p className="text-xs text-blue-600 font-mono font-bold">
                  {scanSteps[currentStep]}
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2 max-w-md mx-auto">
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${((currentStep + 1) / scanSteps.length) * 100}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>Phase {currentStep + 1} of {scanSteps.length}</span>
                <span>{Math.round(((currentStep + 1) / scanSteps.length) * 100)}% Complete</span>
              </div>
            </div>

            {/* Step Checkmarks */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left space-y-2 max-w-md mx-auto text-xs font-mono">
              {scanSteps.map((s, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  {idx < currentStep ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : idx === currentStep ? (
                    <Loader2 className="w-4 h-4 text-blue-600 animate-spin shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0" />
                  )}
                  <span className={idx <= currentStep ? 'text-slate-900 font-bold' : 'text-slate-400'}>
                    {s}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Form Configuration Body */
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Target Inputs */}
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-extrabold text-slate-700 uppercase tracking-wider font-mono mb-1">
                  Target Domain Name (Required)
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. microsoft.com, github.com, or acmeglobal.com"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className="w-full bg-slate-100 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs font-mono text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-blue-600 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-extrabold text-slate-700 uppercase tracking-wider font-mono mb-1">
                    Company Legal Name (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Microsoft Corp"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-blue-600 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold text-slate-700 uppercase tracking-wider font-mono mb-1">
                    Industry Sector
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Technology / Defense"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-blue-600 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Ingestion Modules Toggle Grid */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="block text-[11px] font-extrabold text-slate-700 uppercase tracking-wider font-mono">
                Active Telemetry Ingestion Modules:
              </label>

              <div className="grid grid-cols-2 gap-2.5 text-xs font-mono">
                <label className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  dnsMap ? 'bg-blue-50 border-blue-200 text-blue-900 font-bold' : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}>
                  <span className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-blue-600" /> DNS A/MX/TXT Record Map
                  </span>
                  <input type="checkbox" checked={dnsMap} onChange={(e) => setDnsMap(e.target.checked)} className="rounded text-blue-600" />
                </label>

                <label className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  sslCert ? 'bg-blue-50 border-blue-200 text-blue-900 font-bold' : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}>
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" /> SSL CT Log Parser
                  </span>
                  <input type="checkbox" checked={sslCert} onChange={(e) => setSslCert(e.target.checked)} className="rounded text-blue-600" />
                </label>

                <label className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  cveMatch ? 'bg-blue-50 border-blue-200 text-blue-900 font-bold' : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}>
                  <span className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-amber-600" /> NIST NVD CVE Correlation
                  </span>
                  <input type="checkbox" checked={cveMatch} onChange={(e) => setCveMatch(e.target.checked)} className="rounded text-blue-600" />
                </label>

                <label className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  sanctionsCheck ? 'bg-blue-50 border-blue-200 text-blue-900 font-bold' : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}>
                  <span className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-rose-600" /> OFAC SDN Sanction Check
                  </span>
                  <input type="checkbox" checked={sanctionsCheck} onChange={(e) => setSanctionsCheck(e.target.checked)} className="rounded text-blue-600" />
                </label>
              </div>
            </div>

            {/* Depth Selector */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-extrabold text-slate-700 uppercase tracking-wider font-mono">
                Audit Depth Level:
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                {[
                  { id: 'standard', label: 'Standard Baseline' },
                  { id: 'comprehensive', label: 'Deep Comprehensive' },
                  { id: 'monitoring', label: '24/7 Continuous' }
                ].map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setDepth(d.id)}
                    className={`py-2 px-3 rounded-xl border font-bold transition-all text-center ${
                      depth === d.id
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-400">
                Data Digest: SHA-256 Verified
              </span>
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  leftIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Launch OSINT Scan
                </Button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
