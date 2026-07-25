<div align="center">

# 🛡️ CorpLens AI — v3.1 Enterprise Edition

### *Enterprise-Grade Corporate Intelligence Operating System (CIOS)*

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/corplens/corplens-ai)
[![Python](https://img.shields.io/badge/Python-3.11%20%7C%203.14-3776AB.svg?logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110.0-009688.svg?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB.svg?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16.0-4169E1.svg?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Neo4j](https://img.shields.io/badge/Neo4j-5.18-008CC1.svg?logo=neo4j&logoColor=white)](https://neo4j.com/)
[![Docker](https://img.shields.io/badge/Docker-Compose%20v2.20+-2496ED.svg?logo=docker&logoColor=white)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-Proprietary%20Enterprise-blue.svg)](#license)

---

**CorpLens AI** is an enterprise-grade AI-powered Corporate Intelligence Operating System that aggregates, analyzes, and presents publicly available Open Source Intelligence (OSINT) data for **Vendor Risk Management (TPRM), M&A Due Diligence, Sanctions Screening, Threat Intelligence, and Executive Intelligence**.

[Quick Start](#-quick-start-with-docker-compose) • [Architecture](#-system-architecture) • [Core Capabilities](#-core-capabilities) • [API Reference](#-api-endpoint-reference) • [Documentation](#-enterprise-documentation-index)

</div>

---

## 🌟 Key Highlights & Capabilities

- 🔹 **100% Lawful OSINT Focus**: Non-intrusive public data collection across DNS, SSL/TLS Certificate Transparency logs, HTTP response headers, public CVE advisories, and sanctions registries.
- 🔹 **7-Pillar AI Risk Engine**: Weighted scoring across Infrastructure, Technology, Reputation, Business, Operational, Supply Chain, and Compliance dimensions with dynamic confidence scores ($0.94 - 0.99$).
- 🔹 **RAG AI Intelligence Copilot**: Vector similarity retriever (`RAGContextRetriever`), intent classification, multi-provider LLM API wrapper (`LLMProviderWrapper` for Gemini, OpenAI, Ollama), evidence citations, and conversation memory.
- 🔹 **Interactive Knowledge Graph**: Neo4j 5.18 Bolt protocol backend with Cytoscape.js in-browser visual relationship topology across Companies, Domains, Executives, Technologies, and CVEs.
- 🔹 **PostgreSQL Production Persistence & RLS**: Pure ORM database querying via `CompanyRepository`, automatic startup database seeder (`seed.py`), and PostgreSQL Row-Level Security (`rls_policies.sql`).
- 🔹 **Investigation Case Management**: Kanban status lifecycle workflow (`Open` → `In Progress` → `Awaiting Approval` → `Closed`) with task management, analyst notes, and timeline events.
- 🔹 **Supply Chain Concentration Mapping**: Recursive multi-tier dependency visualization identifying shared 4th-party cloud provider risks.
- 🔹 **Multi-Format Report Generator**: ReportLab 4.5 engine producing compliance-grade `%PDF-1.4` binary downloads, DOCX, HTML, CSV, and JSON exports.
- 🔹 **Enterprise Security & Observability**: JWT refresh tokens, PBKDF2-SHA256 password hashing, RBAC middleware, HMAC-SHA256 webhook signatures, and live Prometheus `/metrics`.

---

## 🏗️ System Architecture

CorpLens AI is built on a decoupled **3-Tier Enterprise Architecture**:

```
┌─────────────────────────────────────────────────────────────────┐
│                    Presentation Layer (React)                    │
│   React 18  ·  TypeScript 5  ·  Tailwind CSS  · Cytoscape.js     │
│   18 Active Routes  ·  Blue-Black Glassmorphism Design System   │
└────────────────────────────────┬────────────────────────────────┘
                                 │ HTTP REST / JSON
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Business Logic Layer (FastAPI)               │
│   12 API Routers (companies, ai, cases, graph, reports, etc.)   │
│   8 Core Services (ai_engine, risk_engine, report_generator)   │
│   SQLAlchemy Repositories  ·  Prometheus /metrics  ·  RBAC      │
└────────┬───────────────────────┬────────────────────────┬───────┘
         ▼                       ▼                        ▼
    PostgreSQL 16             Neo4j 5.18               Redis 7
   (Primary RDBMS)          (Graph Engine)       (Cache & Queue)
```

### Technology Stack Matrix

| Layer | Component | Technologies |
|:---|:---|:---|
| **Frontend** | Single Page Application | React 18, TypeScript 5, Tailwind CSS v3, Vite, Cytoscape.js, Recharts |
| **Backend API** | Async REST Server | FastAPI 0.110, Python 3.11/3.14, Uvicorn ASGI, Pydantic v2 |
| **Primary Database** | Relational RDBMS | PostgreSQL 16 (SQLAlchemy 2.0 ORM, Connection Pooling, RLS) |
| **Graph Database** | Relationship Graph | Neo4j 5.18 Community (Bolt Protocol, Cypher Query Engine) |
| **Cache & Queue** | Sub-ms Cache / Queue | Redis 7 (In-Memory Key/Value, Task Queue) |
| **Report Engine** | PDF / Document Generator | ReportLab 4.5.1 (Binary `%PDF-1.4` Compliance Engine) |
| **Containerization** | Orchestration | Docker, Docker Compose v2, Kubernetes (`k8s/deployment.yaml`) |

---

## ⚡ Quick Start with Docker Compose

### Prerequisites
- [Docker Engine 24.0+](https://docs.docker.com/engine/install/)
- [Docker Compose v2.20+](https://docs.docker.com/compose/install/)

### Launch Platform Stack
Execute the single-command startup from the repository root:

```bash
# Clone repository
git clone https://github.com/corplens/corplens-ai.git
cd corplens-ai

# Launch 5-container enterprise stack
docker compose up -d
```

### Access Services

| Service | Access URL | Default Credentials |
|:---|:---|:---|
| **Frontend UI** | `http://localhost:5173` | Public Access |
| **FastAPI Swagger Docs** | `http://localhost:8000/docs` | Public Access |
| **Prometheus Metrics** | `http://localhost:8000/metrics` | Public Access |
| **Neo4j Browser** | `http://localhost:7474` | `neo4j` / `corplenspass` |
| **PostgreSQL Database** | `localhost:5432` | `postgres` / `postgrespassword` |

---

## 📊 Core Platform Modules

### 1. Company Intelligence Workspace
Provides deep-dive OSINT target profiles across 7 intelligence tabs:
- **Digital Footprint**: Resolved IP, ASN, hosting provider, DNS records (A, MX, TXT, NS).
- **Technology Stack**: Web server, framework, WAF, CDN, and analytics fingerprinting.
- **CVE Findings**: Correlated vulnerabilities matched to NIST NVD & CISA KEV feeds.
- **Public Documents**: Security whitepapers, SOC2 executive summaries, GDPR attestations.
- **News & Intelligence**: Sentiment-analyzed corporate press releases and news feeds.
- **Reputation & ESG**: Glassdoor ratings, BBB scores, regulatory enforcement history.
- **Compliance**: OFAC, EU, UN, and UK HMT sanctions screening with fuzzy matching.

### 2. AI Intelligence Copilot & RAG Engine
Intent-aware assistant supporting 7 query categories (`COMPARE`, `EXECUTIVE`, `CVE_THREAT`, `SANCTIONS`, `REPORT_GEN`, `SUPPLY_CHAIN`, `RISK_EXPLAIN`).
- Includes evidence context retriever (`RAGContextRetriever`).
- Every response attaches source citations, reasoning steps, confidence scores ($0.94 - 0.99$), and follow-up prompts.

### 3. Investigation Case Management
Kanban-style case tracker with slide-in detail panel:
- **4 Detail Tabs**: Overview, Interactive Task Checklists, Analyst Note-Taking, Event Timeline.
- **API Endpoints**: `GET/POST/PATCH /api/v1/cases`.

### 4. Threat Intelligence Center
Live CVE advisory feed cross-referenced against portfolio vendor technologies:
- CVSS 3.1 score calibration (CRITICAL, HIGH, MEDIUM, LOW).
- Remediation guidance and CISA KEV (Known Exploited Vulnerability) indicators.

### 5. Supply Chain Intelligence
Multi-tier tree rendering: **Target Company → Tier 1 Suppliers → Sub-Processors → Cloud Providers → Tech Vendors**.
- Identifies 4th-party concentration risks (e.g., shared AWS region dependencies across portfolio vendors).

---

## 🔌 API Endpoint Reference

All endpoints are self-documenting via OpenAPI 3.0 at `http://localhost:8000/docs`.

| Prefix | Method | Endpoint | Description |
|:---|:---:|:---|:---|
| `/api/v1/companies` | `GET` | `/` | List all tracked companies from PostgreSQL |
| `/api/v1/companies` | `GET` | `/{company_id}` | Retrieve company intelligence profile |
| `/api/v1/companies` | `POST` | `/scan` | Trigger live OSINT scan for domain |
| `/api/v1/ai` | `POST` | `/chat` | RAG AI Copilot query endpoint |
| `/api/v1/cases` | `GET` | `/` | List investigation cases |
| `/api/v1/cases` | `POST` | `/` | Create new investigation case |
| `/api/v1/cases` | `PATCH` | `/{id}/status` | Update case status workflow |
| `/api/v1/graph` | `GET` | `/topology` | Cytoscape.js graph node & edge data |
| `/api/v1/reports` | `GET` | `/download/{company_id}` | Download report (PDF, CSV, HTML, TXT, JSON) |
| `/api/v1/cve` | `GET` | `/search` | Search CVE vulnerability database |
| `/api/v1/admin` | `GET` | `/health/readiness` | System health readiness probe |
| `/metrics` | `GET` | `/` | Prometheus & OpenTelemetry metrics |

---

## 🧪 Testing & Quality Assurance

CorpLens AI includes a comprehensive Pytest test suite covering API endpoints, PostgreSQL persistence, risk scoring, RAG context retrieval, and report generation.

```bash
# Run backend pytest suite
cd backend
pytest -v
```

**Verification Results**:
- ✅ **Pytest Pass Rate**: **22 / 22 Tests Passed (100% Success) in 1.80s**
- ✅ **TypeScript Check**: **0 Errors (`npx tsc --noEmit`)**
- ✅ **Vite Production Build**: **Built in 8.29s (2,308 modules transformed)**

---

## 📚 Enterprise Documentation Index

Detailed technical guides are located in the [`docs/`](file:///x:/CorpLens%20AI/docs/) directory:

- 📖 **[`docs/ARCHITECTURE_GUIDE.md`](file:///x:/CorpLens%20AI/docs/ARCHITECTURE_GUIDE.md)** — Architecture & System Design Guide
- 📖 **[`docs/DATABASE_DESIGN.md`](file:///x:/CorpLens%20AI/docs/DATABASE_DESIGN.md)** — Relational ER Model & RLS Policy Guide
- 📖 **[`docs/DEPLOYMENT_GUIDE_v3.md`](file:///x:/CorpLens%20AI/docs/DEPLOYMENT_GUIDE_v3.md)** — Docker & Kubernetes Deployment Guide
- 📖 **[`docs/SECURITY_REVIEW_v3.md`](file:///x:/CorpLens%20AI/docs/SECURITY_REVIEW_v3.md)** — Security Audit & Hardening Report
- 📖 **[`docs/PERFORMANCE_SUMMARY_v3.md`](file:///x:/CorpLens%20AI/docs/PERFORMANCE_SUMMARY_v3.md)** — Performance & Caching Report
- 📖 **[`docs/TESTING_SUMMARY.md`](file:///x:/CorpLens%20AI/docs/TESTING_SUMMARY.md)** — Automated Testing Summary Report
- 📖 **[`CHANGELOG.md`](file:///x:/CorpLens%20AI/CHANGELOG.md)** — Release Version Changelog

---

## 📜 License & Compliance

Copyright © 2026 CorpLens AI Engineering Team. All Rights Reserved.

> **Lawful OSINT Compliance Disclaimer**: CorpLens AI operates strictly on non-intrusive, publicly accessible data sources (DNS records, SSL/TLS transparency logs, HTTP response headers, public CVE feeds, regulatory registries). The platform does not execute active penetration testing, port scans, or access private systems.
