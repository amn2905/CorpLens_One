import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { CompanyWorkspace } from './pages/CompanyWorkspace';
import { AnalyticsDashboard } from './pages/AnalyticsDashboard';
import { TimelinePage } from './pages/TimelinePage';
import { VendorPortfolio } from './pages/VendorPortfolio';
import { MonitoringPage } from './pages/MonitoringPage';
import { SanctionsScreening } from './pages/SanctionsScreening';
import { TasksPage } from './pages/TasksPage';
import { GraphPage } from './pages/GraphPage';
import { AiAssistantPage } from './pages/AiAssistantPage';
import { IntegrationsPage } from './pages/IntegrationsPage';
import { AdminPage } from './pages/AdminPage';
import { CaseManagementPage } from './pages/CaseManagementPage';
import { SupplyChainPage } from './pages/SupplyChainPage';
import { ExecutivePage } from './pages/ExecutivePage';
import { ThreatIntelPage } from './pages/ThreatIntelPage';
import { NewInvestigationModal } from './components/NewInvestigationModal';
import { AuthProvider } from './context/AuthContext';
import { mockCompanies, api } from './services/api';
import { Company } from './types';

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState<Company[]>(mockCompanies);
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);

  const handleSearch = async (q: string) => {
    const trimmed = q.trim();
    if (!trimmed) return;

    // Search existing companies by name or primary domain
    const match = companies.find(c => 
      c.name.toLowerCase().includes(trimmed.toLowerCase()) || 
      c.primary_domain.toLowerCase().includes(trimmed.toLowerCase())
    );

    if (match) {
      navigate(`/workspace/${match.id}`);
    } else if (trimmed.includes('.') || trimmed.length >= 3) {
      // Dynamically trigger OSINT scan for new query entity!
      const scanned = await api.triggerScan(trimmed.split('.')[0].toUpperCase() + ' Corp', trimmed, 'Technology & Cloud Services');
      setCompanies(prev => {
        if (prev.some(c => c.id === scanned.id)) return prev;
        return [scanned, ...prev];
      });
      navigate(`/workspace/${scanned.id}`);
    }
  };

  const handleScanSubmit = async (data: {
    domain: string;
    name: string;
    industry: string;
    options: any;
    depth: string;
  }) => {
    // Execute real-time scan registration
    const scanned = await api.triggerScan(data.name, data.domain, data.industry);
    setCompanies(prev => {
      if (prev.some(c => c.id === scanned.id)) return prev;
      return [scanned, ...prev];
    });
    setIsScanModalOpen(false);
    navigate(`/workspace/${scanned.id}`);
  };

  return (
    <div className="min-h-screen text-[#1E293B] flex flex-col font-sans bg-[#F7FAFC] p-3 gap-3 max-w-[1800px] mx-auto">
      <Navbar onOpenNewScan={() => setIsScanModalOpen(true)} onSearch={handleSearch} />

      <div className="flex-1 flex gap-4 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto pr-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
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

      <NewInvestigationModal
        isOpen={isScanModalOpen}
        onClose={() => setIsScanModalOpen(false)}
        onSubmitScan={handleScanSubmit}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <MainLayout />
      </Router>
    </AuthProvider>
  );
};

export default App;
