import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { CompanyWorkspace } from './pages/CompanyWorkspace';
import { VendorPortfolio } from './pages/VendorPortfolio';
import { SanctionsScreening } from './pages/SanctionsScreening';
import { GraphPage } from './pages/GraphPage';
import { AiAssistantPage } from './pages/AiAssistantPage';
import { AnalyticsDashboard } from './pages/AnalyticsDashboard';
import { TimelinePage } from './pages/TimelinePage';
import { MonitoringPage } from './pages/MonitoringPage';
import { TasksPage } from './pages/TasksPage';
import { IntegrationsPage } from './pages/IntegrationsPage';
import { AdminPage } from './pages/AdminPage';
import { CaseManagementPage } from './pages/CaseManagementPage';
import { SupplyChainPage } from './pages/SupplyChainPage';
import { ExecutivePage } from './pages/ExecutivePage';
import { ThreatIntelPage } from './pages/ThreatIntelPage';
import { api, mockCompanies } from './services/api';
import { Company } from './types';
import { X, Sparkles } from 'lucide-react';

export const AppContent: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>(mockCompanies);
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  const [newTargetName, setNewTargetName] = useState('');
  const [newTargetDomain, setNewTargetDomain] = useState('');
  const [newTargetIndustry, setNewTargetIndustry] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    api.getCompanies().then(setCompanies);
  }, []);

  const handleSearch = async (q: string) => {
    if (!q) {
      api.getCompanies().then(setCompanies);
      return;
    }
    const filtered = mockCompanies.filter(c => 
      c.name.toLowerCase().includes(q.toLowerCase()) ||
      c.primary_domain.toLowerCase().includes(q.toLowerCase()) ||
      c.industry?.toLowerCase().includes(q.toLowerCase())
    );
    setCompanies(filtered);
  };

  const handleStartScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTargetDomain) return;

    setIsScanning(true);
    const scannedCompany = await api.triggerScan(
      newTargetName || newTargetDomain.split('.')[0].toUpperCase(),
      newTargetDomain,
      newTargetIndustry || 'Software & Technology'
    );
    setCompanies(prev => [scannedCompany, ...prev]);
    setIsScanning(false);
    setIsScanModalOpen(false);
    setNewTargetName('');
    setNewTargetDomain('');
  };

  return (
    <div className="min-h-screen text-slate-100 flex flex-col font-sans" style={{ background: '#01040f' }}>
      <Navbar onOpenNewScan={() => setIsScanModalOpen(true)} onSearch={handleSearch} />

      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-black">
          <Routes>
            <Route path="/" element={<Dashboard companies={companies} onOpenScanModal={() => setIsScanModalOpen(true)} />} />
            <Route path="/workspace/:id" element={<CompanyWorkspace />} />
            <Route path="/analytics" element={<AnalyticsDashboard />} />
            <Route path="/timeline" element={<TimelinePage />} />
            <Route path="/tprm" element={<VendorPortfolio />} />
            <Route path="/monitoring" element={<MonitoringPage />} />
            <Route path="/sanctions" element={<SanctionsScreening />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/graph" element={<GraphPage />} />
            <Route path="/ai-assistant" element={<AiAssistantPage />} />
            <Route path="/integrations" element={<IntegrationsPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/cases" element={<CaseManagementPage />} />
            <Route path="/supply-chain" element={<SupplyChainPage />} />
            <Route path="/executives" element={<ExecutivePage />} />
            <Route path="/threat-intel" element={<ThreatIntelPage />} />
          </Routes>
        </main>
      </div>

      {/* New OSINT Investigation Modal - B&W Glassy */}
      {isScanModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel border border-blue-500/25 rounded-2xl max-w-md w-full p-6 space-y-6 shadow-2xl glow-blue">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-white" />
                Launch OSINT Intelligence Scan
              </h3>
              <button 
                onClick={() => setIsScanModalOpen(false)}
                className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleStartScan} className="space-y-4">
              <div>
                <label className="block text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest mb-1">
                  Target Domain Name (Required)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. microsoft.com or github.com"
                  value={newTargetDomain}
                  onChange={(e) => setNewTargetDomain(e.target.value)}
                  className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest mb-1">
                  Company Legal Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Microsoft Corporation"
                  value={newTargetName}
                  onChange={(e) => setNewTargetName(e.target.value)}
                  className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest mb-1">
                  Industry / Sector
                </label>
                <input
                  type="text"
                  placeholder="e.g. Cloud Software / Cyber Enterprise"
                  value={newTargetIndustry}
                  onChange={(e) => setNewTargetIndustry(e.target.value)}
                  className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsScanModalOpen(false)}
                  className="glass-btn px-4 py-2 rounded-xl text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isScanning}
                  className="glass-btn-primary px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider shadow-lg flex items-center gap-2"
                >
                  {isScanning ? 'Gathering Public Data...' : 'Execute OSINT Scan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
