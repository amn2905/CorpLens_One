# 📖 CorpLens One — User & Analyst Operational Guide

> **Version**: 1.0.0  
> **Target Audience**: Risk Analysts, CISOs, Compliance Officers, Due Diligence Teams  

---

## 1. Overview of Platform Workspaces

CorpLens One provides an intuitive, enterprise-grade web portal with specialized intelligence modules.

```
┌─────────────────────────────────────────────────────────────────┐
│                     CorpLens One Portal                         │
├─────────────────┬───────────────────────────────┬───────────────┤
│ Navigation      │ Main Workspace Canvas         │ Detail Drawer │
│                 │                               │               │
│ 📊 Dashboard    │ 🏢 Company Profile Workspace  │ 📌 Case Details│
│ 🏢 Companies    │ 7 Tabs: Footprint, Tech Stack,│ Task Lists    │
│ 🤖 CorpLens AI  │ CVEs, Documents, News,        │ Notes         │
│ 🕸️ Graph        │ Reputation, Sanctions          │ Timeline      │
│ 📋 Investigations│                              │               │
│ 🛡️ Threat Intel │ 💬 CorpLens AI Chat Window    │               │
│ 📈 Reports      │ Interactive Cytoscape Graph   │               │
└─────────────────┴───────────────────────────────┴───────────────┘
```

---

## 2. Key Analyst Workflows

### Workflow 1: Performing a Company Due Diligence Investigation
1. Navigate to **Companies** from the navigation sidebar.
2. Select a target company (or click **+ New Investigation** to trigger a real-time passive OSINT scan).
3. Review the **7-Pillar Composite Risk Score** breakdown to immediately spot high-risk dimensions.
4. Explore individual tabs:
   - **Digital Footprint**: Verify hosting providers, ASNs, and DNS MX/SPF/TXT configurations.
   - **Technology Stack**: Identify legacy, unpatched web servers or frameworks.
   - **CVE Findings**: Review active vulnerabilities ranked by CVSS severity.
   - **Sanctions & Compliance**: Inspect fuzzy matched records across OFAC, EU, UN, and UK HMT registries.

---

### Workflow 2: Interacting with CorpLens AI (AI Copilot Module)
1. Click **CorpLens AI** in the navigation sidebar.
2. Ask natural language risk questions, such as:
   - *"Compare the supply chain risk of Acme Security vs. CyberShield."*
   - *"List critical CVEs affecting target company x."*
3. CorpLens AI generates a synthesized answer backed by **grounded evidence citations**, confidence scores ($0.94 - 0.99$), and suggested follow-up prompts.

---

### Workflow 3: Creating and Managing Investigations
1. Go to **Investigations**.
2. Click **+ New Case** and assign the target company, priority (`LOW`, `MEDIUM`, `HIGH`, `CRITICAL`), and assigned analyst.
3. Move cases across the Kanban board: `Open` $\rightarrow$ `In Progress` $\rightarrow$ `Awaiting Approval` $\rightarrow$ `Closed`.
4. Click on a case card to open the slide-in drawer to add task items, analyst notes, and event timelines.

---

### Workflow 4: Exporting Executive Compliance Reports
1. Navigate to any target company profile or case page.
2. Click the **Export Executive Brief** button in the header bar.
3. Select your desired format: **PDF** (Compliance `%PDF-1.4`), **HTML**, **CSV**, or **JSON**.
4. Download the generated document for executive presentations or regulatory audit archives.
