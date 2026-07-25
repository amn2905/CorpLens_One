# 📖 CorpLens AI — User & Analyst Operational Guide

> **Version**: 3.1 Enterprise Edition  
> **Target Audience**: Risk Analysts, CISOs, Compliance Officers, Due Diligence Teams  

---

## 1. Overview of Platform Workspaces

CorpLens AI provides an intuitive, dark-themed web portal with 18 specialized intelligence routes.

```
┌─────────────────────────────────────────────────────────────────┐
│                      CorpLens AI Portal                         │
├─────────────────┬───────────────────────────────┬───────────────┤
│ Sidebar Nav     │ Main Workspace Canvas         │ Detail Drawer │
│                 │                               │               │
│ 📊 Dashboard    │ 🏢 Company Profile Workspace  │ 📌 Case Details│
│ 🏢 Companies    │ 7 Tabs: Footprint, Tech Stack,│ Task Lists    │
│ 🤖 AI Copilot   │ CVEs, Documents, News,        │ Notes         │
│ 🕸️ Graph        │ Reputation, Sanctions          │ Timeline      │
│ 📋 Cases        │                               │               │
│ 🛡️ Threat Intel │ 💬 RAG Copilot Chat Window    │               │
│ 📈 Analytics    │ Interactive Cytoscape Graph   │               │
└─────────────────┴───────────────────────────────┴───────────────┘
```

---

## 2. Key Analyst Workflows

### Workflow 1: Performing a Company Due Diligence Investigation
1. Navigate to the **Companies** workspace from the sidebar.
2. Select a target company (or click **Scan New Domain** to trigger a real-time passive OSINT lookup).
3. Review the **7-Pillar Composite Risk Score** breakdown to immediately spot high-risk dimensions (e.g. Technology Risk or Sanctions Risk).
4. Explore individual tabs:
   - **Digital Footprint**: Verify hosting providers, ASNs, and DNS MX/SPF/TXT configurations.
   - **Technology Stack**: Identify legacy, unpatched web servers or frameworks.
   - **CVE Findings**: Review active vulnerabilities ranked by CVSS severity.
   - **Sanctions & Compliance**: Inspect fuzzy matched records across OFAC, EU, UN, and UK HMT registries.

---

### Workflow 2: Interacting with the RAG AI Intelligence Copilot
1. Click **AI Copilot** in the sidebar.
2. Ask natural language risk questions, such as:
   - *"Compare the supply chain risk of Acme Security vs. CyberShield."*
   - *"List critical CVEs affecting target company x."*
3. The Copilot will generate a synthesized answer backed by **grounded evidence citations**, confidence scores ($0.94 - 0.99$), and suggested follow-up prompts.

---

### Workflow 3: Creating and Managing Investigation Cases
1. Go to **Case Management**.
2. Click **+ New Case** and assign the target company, priority (`LOW`, `MEDIUM`, `HIGH`, `CRITICAL`), and assigned analyst.
3. Move cases across the Kanban board: `Open` $\rightarrow$ `In Progress` $\rightarrow$ `Awaiting Approval` $\rightarrow$ `Closed`.
4. Click on a case card to open the slide-in drawer to add task items, analyst notes, and event timelines.

---

### Workflow 4: Exporting Executive Compliance Reports
1. Navigate to any target company profile or case page.
2. Click the **Export Executive Brief** button in the header bar.
3. Select your desired format: **PDF** (Compliance `%PDF-1.4`), **DOCX**, **HTML**, **CSV**, or **JSON**.
4. Download the generated document for executive presentations or regulatory audit archives.
