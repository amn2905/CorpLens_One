# ⚡ CorpLens One — Backend FastAPI Subsystem Architecture

> **Document Version**: 1.0.0  
> **Subsystem**: Backend Microservices  
> **Status**: Production Backend Specification  

---

## 1. Subsystem Overview

The **CorpLens One** backend is written in Python 3.12/3.14 using FastAPI 0.110.0 on ASGI `Uvicorn` servers. It provides asynchronous REST endpoints, 7-pillar risk calculation services, RAG AI copilot execution, and ISO/IEC 27037 PDF evidence generation.

---

## 2. Directory & Module Structure

```
backend/app/
├── api/v1/                  # Router endpoints
│   ├── admin.py             # System health & audit logs
│   ├── ai.py                # CorpLens AI chat endpoint
│   ├── analytics.py         # Risk trends & industry benchmarks
│   ├── auth.py              # Login & JWT token issuance
│   ├── cases.py             # Investigation case management
│   ├── companies.py         # Target company CRUD & live scan
│   ├── cve.py               # NIST NVD vulnerability search
│   ├── graph.py             # Neo4j Cytoscape topology graph
│   ├── integrations.py      # Webhooks & Jira ticket integration
│   ├── reports.py           # Multi-format report downloads
│   ├── sanctions.py         # OFAC/UN/EU sanctions screening
│   └── search.py            # Global search router
├── connectors/              # OSINT Telemetry Connectors
├── core/                    # System Settings & Database Session Handler
│   ├── config.py            # Pydantic SettingsConfigDict configuration
│   └── database.py          # SQLAlchemy SessionLocal & init_db
├── db/                      # RLS Policies SQL Script & Alembic Migrations
├── models/                  # SQLAlchemy ORM Data Models
├── repositories/            # Data Access Repositories
├── schemas/                 # Pydantic Request/Response Validation Schemas
├── services/                # Domain Core Logic Services
│   ├── ai_engine.py         # CorpLens AI RAG Engine & LLM Wrapper
│   ├── graph_service.py     # Neo4j Cypher Traversal Engine
│   ├── monitoring_engine.py # Continuous Telemetry & Alerting Engine
│   ├── report_generator.py  # ReportLab ISO 27037 PDF Generator
│   ├── risk_engine.py       # 7-Pillar Composite Risk Calculator
│   └── stix_exporter.py     # OASIS STIX 2.1 JSON Threat Exporter
└── main.py                  # Application Gateway & Lifespan Event Handler
```

---

## 3. Application Lifespan & FastAPI Initialization (`main.py`)

```python
from contextlib import asynccontextmanager
from fastapi import FastAPI

@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Enterprise Corporate OSINT Platform REST API v1.0.0",
    lifespan=lifespan
)
```

---

## 4. Version & License Information

- **Document Version**: 1.0.0
- **Author**: CorpLens One Backend Engineering Group
- **License**: Enterprise Commercial License. See [LICENSE.md](../../LICENSE.md).
