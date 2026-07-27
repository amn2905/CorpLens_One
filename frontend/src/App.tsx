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
import { mockCompanies } from './services/api';
import { Company } from './types';

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState<Company[]>(mockCompanies);
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);

  const handleSearch = (q: string) => {
    if (q.trim()) {
      const match = companies.find(c => 
        c.name.toLowerCase().includes(q.toLowerCase()) || 
        c.primary_domain.toLowerCase().includes(q.toLowerCase())
      );
      if (match) {
        navigate(`/workspace/${match.id}`);
      }
    }
  };

  const handleScanSubmit = (data: {
    domain: string;
    name: string;
    industry: string;
    options: any;
    depth: string;
  }) => {
    const newId = `cmp-${Date.now()}`;
    const scannedCompany: Company = {
      id: newId,
      name: data.name,
      primary_domain: data.domain,
      risk_score: 2.8,
      risk_tier: 'Low',
      is_monitored: true,
      country: 'United States',
      industry: data.industry,
      last_scanned: new Date().toISOString(),
      confidence_score: 0.98,
      domains: [
        {
          id: `dom-${newId}-1`,
          domain_name: data.domain,
          ip_address: '104.21.88.14',
          hosting_provider: 'Cloudflare Anycast CDN',
          asn: 'AS13335',
          ssl_issuer: 'DigiCert TLS RSA CA G2',
          ssl_valid: true,
          dns_records: {
            A: ['104.21.88.14', '172.67.182.21'],
            MX: [`mail.${data.domain}`],
            TXT: ['v=spf1 include:_spf.google.com ~all']
          }
        }
      ],
      tech_stack: [
        { id: `t-1`, category: 'Web Server', technology_name: 'Nginx', detected_version: '1.24.0', confidence: 0.96 },
        { id: `t-2`, category: 'JS Framework', technology_name: 'React', detected_version: '18.2.0', confidence: 0.98 }
      ],
      cve_findings: [],
      sanctions_matches: [],
      risk_breakdown: {
        overall_score: 2.8,
        risk_tier: 'Low',
        infrastructure_score: 12.0,
        technology_score: 20.0,
        reputation_score: 10.0,
        compliance_score: 4.0,
        ai_summary: `Automated baseline scan complete for ${data.domain}. Zero sanctions matches found.`
      }
    };

    setCompanies(prev => [scannedCompany, ...prev]);
    setIsScanModalOpen(false);
    navigate(`/workspace/${newId}`);
  };

  return (
    <div className="min-h-screen text-slate-900 flex flex-col font-sans bg-slate-50">
      <Navbar onOpenNewScan={() => setIsScanModalOpen(true)} onSearch={handleSearch} />

      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-slate-50">
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
