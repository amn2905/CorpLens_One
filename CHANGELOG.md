# CorpLens One — Technical Changelog

All notable changes to the **CorpLens One** enterprise operating system are documented in this file.

---

## [1.0.0] - Commercial Production Release - 2026-08-03

### Changed
- **Enterprise Platform Rebranding**:
  - Global migration from CorpLens AI to **CorpLens One** ("The Operating System for Enterprise Intelligence").
  - Designated **CorpLens AI** as the dedicated AI Copilot module.
  - Standardized versioning repository-wide strictly to **Version 1.0.0** (`v1.0.0`).
- **UI & Navigation Realignment**:
  - Standardized primary navigation sidebar layout: Dashboard, Companies, CorpLens AI, Investigations, Compliance, Third Party Risk, Supply Chain, Threat Intelligence, Knowledge Graph, Monitoring, Reports, Settings, Administration.
  - Rebranded logo to `CorpLens One` with `CL1` small monogram badge mark.
- **Backend & Pytest Optimization**:
  - Refactored Pydantic settings config to `SettingsConfigDict` and FastAPI `lifespan` context manager.
  - Replaced deprecated `datetime.utcnow()` with `datetime.now(timezone.utc)`.
  - Renamed legacy test files (`test_phase2.py` $\rightarrow$ `test_risk_engine.py`, `test_phase3.py` $\rightarrow$ `test_reporting.py`).
  - Achieved 100% test pass rate with **0 warnings**.
- **Documentation & Repository Standardization**:
  - Consolidated and updated all system documentation (`README.md`, `docs/API_DOCUMENTATION.md`, `docs/ARCHITECTURE_GUIDE.md`, `docs/DATABASE_DESIGN.md`, `docs/DEPLOYMENT_GUIDE.md`, `docs/PERFORMANCE_SUMMARY.md`, `docs/SECURITY_CHECKLIST.md`, `docs/SECURITY_REVIEW.md`, `docs/TESTING_SUMMARY.md`, `docs/USER_GUIDE.md`).
  - Removed obsolete draft briefs, version-suffixed markdown files, and temporary test artifacts.

### Added
- **Core Platform Infrastructure**:
  - Complete PostgreSQL 16 schema with Row-Level Security (RLS) policies.
  - 7-Pillar composite risk calculation engine ($0.0 - 10.0$).
  - CorpLens AI RAG engine with multi-source evidence citations and confidence scoring ($0.94 - 0.99$).
  - ISO/IEC 27037 compliant PDF evidence report generator with SHA-256 cryptographic digests.
  - Interactive Cytoscape.js and Neo4j graph topology explorer.
