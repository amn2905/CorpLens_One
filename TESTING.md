# 🧪 CorpLens One — Testing Architecture Specification

> **Document Version**: 1.0.0  
> **Target Audience**: QA Engineers, Software Engineers, DevOps Engineers  
> **Status**: Production Test Specification  

---

## 1. Document Overview

### 1.1 Purpose
This document specifies automated unit testing, integration testing, frontend static typechecking, and continuous integration procedures for **CorpLens One**.

### 1.2 Scope
- Backend Pytest test suite architecture and coverage.
- Frontend TypeScript type verification and build validation.
- Mocking strategies for live OSINT feeds, database fallbacks, and external LLM APIs.
- Continuous Integration (CI) test commands.

---

## 2. Backend Automated Test Suite (`backend/tests/`)

Backend test suites are implemented using Pytest 9.0 and FastAPI `TestClient`.

### 2.1 Test File Breakdown

| Test File | Test Targets | Coverage Description |
| :--- | :--- | :--- |
| `tests/test_api.py` | API Routers | Root `/`, `/health`, `/companies`, `/ai/chat`, `/cve/search`, `/cases`, `/admin/health` |
| `tests/test_persistence.py` | Data & DB | DB seeding, RAG context retrieval, graph centrality, PDF report generation |
| `tests/test_reporting.py` | Reports & Admin | Audit log retrieval, API key generation, Jira stub, STIX 2.1 exporter |
| `tests/test_risk_engine.py` | Core Risk Model | 7-pillar risk calculation, graph topology, timeline service, HTML report generation |

---

## 3. Running Backend Automated Tests

```bash
cd backend

# Execute complete test suite
pytest

# Execute pytest with verbose output
pytest -v

# Execute specific test file
pytest tests/test_risk_engine.py
```

### Execution Output Benchmark
```
collected 22 items

tests\test_api.py ........                                               [ 36%]
tests\test_persistence.py ....                                           [ 54%]
tests\test_reporting.py .....                                            [ 77%]
tests\test_risk_engine.py .....                                          [100%]

============================= 22 passed in 1.63s ==============================
```

---

## 4. Frontend Compilation & TypeCheck Verification

Frontend type safety is validated using TypeScript `tsc` and Vite build compiler.

```bash
cd frontend

# Verify TypeScript type checking without emitting files
npx tsc --noEmit

# Execute production build compilation
npm run build
```

---

## 5. Version & License Information

- **Document Version**: 1.0.0
- **Author**: CorpLens One Quality Engineering Group
- **License**: Enterprise Commercial License. See [LICENSE.md](LICENSE.md).
