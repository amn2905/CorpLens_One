# 🔌 CorpLens One — REST API Reference

> **Document Version**: 1.0.0  
> **Base URL**: `http://localhost:8000/api/v1`  
> **Interactive OpenAPI Schema**: `http://localhost:8000/docs`  
> **Protocol**: HTTP/1.1 & HTTP/2 over TLS 1.3  

---

## 1. Overview & Authentication

All API endpoints return JSON responses formatted according to standard HTTP status codes unless binary file streams (e.g. PDF generation) are requested.

### Authentication Header
Requests to protected endpoints must supply a valid JSON Web Token (JWT) in the `Authorization` header:

```http
Authorization: Bearer <your_jwt_access_token>
```

---

## 2. API Endpoint Specification Summary

| Category | Endpoint | Method | Purpose |
| :--- | :--- | :---: | :--- |
| **Authentication** | `/api/v1/auth/login` | `POST` | Authenticate credentials and issue JWT bearer token |
| **Companies** | `/api/v1/companies/` | `GET` | List monitored target corporate entities |
| **Companies** | `/api/v1/companies/{id}` | `GET` | Retrieve 360-degree target profile & 7-pillar breakdown |
| **CorpLens AI** | `/api/v1/ai/chat` | `POST` | RAG AI copilot query endpoint with evidence citations |
| **Investigations**| `/api/v1/cases/` | `GET / POST` | Analyst case board management and task tracking |
| **Graph Topology**| `/api/v1/graph/topology` | `GET` | Fetch Cytoscape node-edge entity topology |
| **Sanctions** | `/api/v1/sanctions/screen` | `POST` | OFAC/UN/EU sanctions fuzzy name screening |
| **Threat Intel** | `/api/v1/cve/search` | `GET` | Search NIST NVD vulnerability advisory database |
| **Reports** | `/api/v1/reports/download/{id}` | `GET` | Download ISO/IEC 27037 compliant PDF/HTML reports |
| **Admin System** | `/api/v1/admin/health/readiness` | `GET` | Database and system health readiness probe |

For full endpoint specifications, payload schemas, and response examples, refer to the root [API_REFERENCE.md](../API_REFERENCE.md).
