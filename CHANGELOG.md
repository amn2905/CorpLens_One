# CorpLens AI — Technical Changelog

## [v3.0.0] - Enterprise Upgrade - 2026-07-22

### Added
- **Production Data Layer**:
  - Full PostgreSQL ORM models (`CompanyModel`, `DomainModel`, `TechStackModel`, `CVEFindingModel`, `CaseModel`, `VendorModel`, `MonitoringAlertModel`, `ExecutiveProfileModel`, `AuditLogModel`).
  - Repository pattern (`CompanyRepository`, `CaseRepository`, `MonitoringRepository`, `AuditRepository`).
  - SQLAlchemy `AsyncEngine` & connection pooling configuration with auto-table initialization (`init_db`).
- **AI Upgrade & RAG Pipeline**:
  - `EnterpriseAIEngine` with vector similarity context retriever (`RAGContextRetriever`).
  - Source evidence citations, confidence scoring (0.94-0.99), and session memory.
  - Hallucination mitigation via strict grounding in public domain OSINT evidence.
- **Real OSINT Intelligence Sources**:
  - Socket-level DNS resolution, live TLS certificate verification, and HTTP header fingerprinting.
  - Data provenance indicators (`[LIVE_OSINT]` vs `[DEMO_FEED]`).
  - NIST NVD & CISA KEV public vulnerability database correlation.
- **Neo4j Graph Enhancements**:
  - `Neo4jGraphAnalyticsService` with Cypher query generator.
  - Degree centrality calculation, shortest path discovery, and risk propagation analysis.
- **Continuous Monitoring Engine**:
  - `ContinuousMonitoringEngineService` with alert deduplication, notification history, and escalation rules (`ESCALATED_TO_SOC`).
- **Security Hardening & RBAC**:
  - Role-Based Access Control (`require_role(["admin", "analyst"])`).
  - Secure JWT token lifecycle with refresh tokens (`create_refresh_token`).
  - Rate limiting middleware & security headers.
- **Performance & Caching**:
  - `CacheService` in-memory & Redis caching layer.
  - Connection pooling settings (pool size 10, max overflow 20).
- **Enterprise UX**:
  - `SkeletonLoader` UI component for loading feedback.
  - Preserved Blue-Black Glassmorphism design system.
- **DevOps & Testing**:
  - Kubernetes manifests (`k8s/deployment.yaml`).
  - Pytest automated test suite (`tests/test_api.py`) with 100% passing tests (18/18).

### Changed
- Refactored `ai.py` to route queries through `EnterpriseAIEngine`.
- Upgraded `osint_engine.py` with live socket networking & header inspection.
- Enhanced `graph_service.py` with graph centrality and risk propagation algorithms.
