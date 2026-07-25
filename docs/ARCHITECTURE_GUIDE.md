# CorpLens AI v3.1 — Architecture & System Design Guide

## 1. System Overview
CorpLens AI is an enterprise-grade Corporate Intelligence Operating System (CIOS) designed for lawful OSINT aggregation, threat intelligence correlation, third-party risk management (TPRM), and compliance due diligence.

## 2. 3-Tier Layered Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Presentation Layer (React)                    │
│   React 18  ·  TypeScript 5  ·  Tailwind CSS  · Cytoscape.js     │
│   18 Active Routes  ·  Blue-Black Glassmorphism Design Token   │
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
   (Primary RDBMS)          (Graph Database)        (Cache & Queue)
```

## 3. Data Persistence & Seeding
- **Database Engine**: PostgreSQL 16 with connection pooling (`pool_size=10`, `max_overflow=20`).
- **Seeding Automation**: `seed.py` automatically initializes and seeds enterprise target companies, domains, tech stack, CVE findings, cases, and audit logs on container startup.
- **Row-Level Security**: Implemented via `rls_policies.sql` enforcing `tenant_id` policies per database query.

## 4. AI & RAG Engine
- **Retriever**: `RAGContextRetriever` in `ai_engine.py` executes vector similarity context retrieval.
- **Evidence Grounding**: Response payload includes source citations, grounding confidence score (0.94-0.99), and reasoning steps.
- **LLM Integration**: `LLMProviderWrapper` handles live Gemini, OpenAI, and Ollama endpoint integration.
