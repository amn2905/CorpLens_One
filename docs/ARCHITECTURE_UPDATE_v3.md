# CorpLens AI v3.0 — Architecture Update Report

## Executive Summary
CorpLens AI has been upgraded from a demonstration platform to a production-ready Enterprise Corporate Intelligence Operating System (CIOS) v3.0.

## Key Architectural Enhancements

### 1. Data Layer & Repository Pattern
- **ORM Persistence**: PostgreSQL 16 schema mapped via SQLAlchemy ORM models (`domain_models.py`).
- **Repositories**: `CompanyRepository`, `CaseRepository`, `MonitoringRepository`, and `AuditRepository` decouple business logic from data access.
- **Connection Pooling**: `pool_size=10`, `max_overflow=20`, `pool_pre_ping=True` for resilient database connections.

### 2. RAG AI Pipeline
- **Vector Retrieval**: `RAGContextRetriever` matches natural language queries against OSINT evidence vectors.
- **Evidence Citations**: Every AI response includes source attribution (`[LIVE_OSINT]`, `NIST NVD`, `CISA KEV`).
- **Confidence Scoring**: Confidence score (0.94 - 0.99) computed dynamically based on signal density.

### 3. Live OSINT Connectors
- **Live Resolvers**: Real-time socket DNS resolution, TLS certificate validation, and HTTP response header technology fingerprinting.
- **Provenance Labels**: Transparent provenance markers (`[LIVE_OSINT]` vs `[DEMO_FEED]`).

### 4. Graph Analytics (Neo4j)
- **Cypher Generator**: Dynamic Cypher query creation with path risk aggregation.
- **Graph Metrics**: Degree centrality computation and risk propagation scoring across supply chain dependencies.

### 5. Continuous Monitoring Engine
- **Alert Deduplication**: Prevents alert fatigue by filtering duplicate events.
- **Escalation Rules**: Automated alert routing (`ESCALATED_TO_SOC`, `PENDING_REVIEW`).

## Technology Stack Matrix
- **Frontend**: React 18, TypeScript 5, Tailwind CSS v3, Cytoscape.js, Recharts.
- **Backend**: FastAPI 0.110, Python 3.11/3.14, SQLAlchemy 2.0, ReportLab 4.5, Pydantic v2.
- **Databases**: PostgreSQL 16, Neo4j 5.18, Redis 7.
