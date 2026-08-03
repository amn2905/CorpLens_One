# 🖥️ CorpLens One — Frontend Subsystem Architecture Guide

> **Document Version**: 1.0.0  
> **Target Audience**: Frontend Engineers, UI Architects  
> **Status**: Production Specification  

---

## 1. Subsystem Overview

The **CorpLens One** frontend subsystem is a React 18 single-page application (SPA) written in strict TypeScript 5 and built using Vite 5. It presents a desktop-class enterprise interface featuring custom CSS design tokens, Cytoscape.js network visualizers, Recharts analytics, and responsive route guards.

---

## 2. Directory & Module Structure

```
frontend/src/
├── components/          # Reusable UI components
│   ├── ui/              # Atom UI controls (Badge, Button, Modal, Card)
│   ├── GraphExplorer.tsx# Cytoscape.js network visualizer component
│   ├── Logo.tsx         # SVG shield logo & CL1 monogram mark
│   ├── Navbar.tsx       # Header bar with global search & alerts
│   ├── NewInvestigationModal.tsx # Scan & case creation modal
│   ├── RiskBadge.tsx    # Dynamic risk tier indicator
│   └── Sidebar.tsx      # Persistent 13-item navigation bar
├── context/
│   └── AuthContext.tsx  # JWT Auth & active user session state
├── hooks/
│   └── useDebounce.ts   # Custom React utility hooks
├── pages/               # 13 Platform Views
│   ├── AdminPage.tsx
│   ├── AiAssistantPage.tsx
│   ├── AnalyticsDashboard.tsx
│   ├── CaseManagementPage.tsx
│   ├── CompanyWorkspace.tsx
│   ├── Dashboard.tsx
│   ├── ExecutivePage.tsx
│   ├── GraphPage.tsx
│   ├── IntegrationsPage.tsx
│   ├── MonitoringPage.tsx
│   ├── SanctionsScreening.tsx
│   ├── SupplyChainPage.tsx
│   ├── TasksPage.tsx
│   ├── ThreatIntelPage.tsx
│   ├── TimelinePage.tsx
│   └── VendorPortfolio.tsx
├── services/
│   └── api.ts           # Asynchronous REST API service layer
├── types/
│   └── index.ts         # TypeScript interface & type definitions
├── App.tsx              # Main layout & router entry point
├── index.css            # Tailwind CSS directives & custom design tokens
└── main.tsx             # React DOM root render script
```

---

## 3. Routing Architecture

Routing is managed via React Router DOM v6 (`frontend/src/App.tsx`).

```tsx
<Routes>
  <Route path="/" element={<Dashboard />} />
  <Route path="/workspace/:id" element={<CompanyWorkspace />} />
  <Route path="/analytics" element={<AnalyticsDashboard />} />
  <Route path="/cases" element={<CaseManagementPage />} />
  <Route path="/graph" element={<GraphPage />} />
  <Route path="/ai-assistant" element={<AiAssistantPage />} />
  <Route path="/sanctions" element={<SanctionsScreening />} />
  <Route path="/threat-intel" element={<ThreatIntelPage />} />
  <Route path="/tprm" element={<VendorPortfolio />} />
  <Route path="/monitoring" element={<MonitoringPage />} />
  <Route path="/supply-chain" element={<SupplyChainPage />} />
  <Route path="/integrations" element={<IntegrationsPage />} />
  <Route path="/admin" element={<AdminPage />} />
</Routes>
```

---

## 4. Build & TypeCheck Commands

```bash
cd frontend

# Verify TypeScript compilation (0 errors)
npx tsc --noEmit

# Compile production bundle with Vite
npm run build
```

---

## 5. Version & License Information

- **Document Version**: 1.0.0
- **Author**: CorpLens One Frontend Group
- **License**: Enterprise Commercial License. See [LICENSE.md](../../LICENSE.md).
