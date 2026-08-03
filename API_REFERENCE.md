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

### HTTP Response Status Codes

| Code | Status | Description |
| :---: | :--- | :--- |
| `200` | **OK** | Request completed successfully. |
| `201` | **Created** | Resource created successfully. |
| `202` | **Accepted** | Async task or scan accepted for background processing. |
| `400` | **Bad Request** | Invalid payload or missing parameters. |
| `401` | **Unauthorized** | Missing or expired JWT bearer token. |
| `403` | **Forbidden** | Insufficient role permissions under RBAC policies. |
| `404` | **Not Found** | Target company, case, or resource ID does not exist. |
| `429` | **Too Many Requests** | Exceeded rate-limiting quota. |
| `500` | **Internal Server Error** | Application error encountered during processing. |

---

## 2. API Endpoint Specification

### 🔑 Authentication (`/api/v1/auth`)

#### `POST /api/v1/auth/login`
Authenticates user credentials and issues a JWT bearer token.

**Request Body (`application/json`):**
```json
{
  "username": "analyst@corplens.one",
  "password": "SecurePassword123!"
}
```

**Response (`200 OK`):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": "usr_8819a",
    "email": "analyst@corplens.one",
    "role": "analyst"
  }
}
```

---

### 🏢 Companies (`/api/v1/companies`)

#### `GET /api/v1/companies/`
Retrieves a paginated list of monitored corporate entities.

**Query Parameters:**
- `skip` *(integer, default: 0)*: Number of items to skip.
- `limit` *(integer, default: 50)*: Maximum items to return.
- `sector` *(string, optional)*: Filter by sector (e.g. `Finance`, `Technology`).

**Response (`200 OK`):**
```json
[
  {
    "id": "cmp-001",
    "name": "Acme Global Financial Group",
    "primary_domain": "acmeglobal.com",
    "risk_score": 2.8,
    "risk_tier": "Low",
    "is_monitored": true,
    "country": "United States",
    "industry": "Financial Services",
    "last_scanned": "2026-08-01T10:00:00Z",
    "confidence_score": 0.98
  }
]
```

#### `GET /api/v1/companies/{id}`
Retrieves target profile data including digital footprints and 7-pillar risk breakdown.

**Response (`200 OK`):**
```json
{
  "id": "cmp-001",
  "name": "Acme Global Financial Group",
  "primary_domain": "acmeglobal.com",
  "risk_score": 2.8,
  "risk_tier": "Low",
  "risk_breakdown": {
    "overall_score": 2.8,
    "risk_tier": "Low",
    "infrastructure_score": 12.0,
    "technology_score": 20.0,
    "reputation_score": 10.0,
    "compliance_score": 4.0,
    "ai_summary": "Automated baseline scan complete. Zero sanctions matches found."
  }
}
```

---

### 🤖 CorpLens AI (`/api/v1/ai`)

#### `POST /api/v1/ai/chat`
Executes RAG AI query against target corporate context and vulnerability databases.

**Request Body (`application/json`):**
```json
{
  "query": "Compare Acme Global and Nexus Dynamics risk profiles.",
  "company_id": "cmp-001",
  "session_id": "session-123"
}
```

**Response (`200 OK`):**
```json
{
  "answer": "Acme Global Financial Group maintains a Low Risk posture (28.5/100). Nexus Dynamics presents a High Risk profile (68.4/100) due to unpatched CVEs.",
  "reasoning_steps": [
    "Matched comparison intent across 2 target entities",
    "Calculated differential in CVSS vulnerabilities"
  ],
  "citations": [
    { "source": "NIST NVD Advisory", "type": "Vulnerability Feed" },
    { "source": "PostgreSQL Corporate Repository", "type": "Primary Database" }
  ],
  "confidence_score": 0.98,
  "intent": "COMPARE"
}
```

---

### 📋 Investigations & Cases (`/api/v1/cases`)

#### `GET /api/v1/cases/`
List investigation cases.

**Response (`200 OK`):**
```json
[
  {
    "id": "case-101",
    "title": "Nexus Dynamics Supply Chain Review",
    "target_company": "Nexus Dynamics",
    "status": "In Progress",
    "priority": "High",
    "assigned_analyst": "Alex Sterling"
  }
]
```

---

### 📄 Reports (`/api/v1/reports`)

#### `GET /api/v1/reports/download/{id}?format=pdf`
Generates and downloads an ISO/IEC 27037 compliance report.

**Response (`200 OK`):**
- `Content-Type`: `application/pdf`
- Body: Binary `%PDF-1.4` stream with SHA-256 evidence digests.

---

## 3. Version & License Information

- **Document Version**: 1.0.0
- **Author**: CorpLens One API Engineering Group
- **License**: Enterprise Commercial License. See [LICENSE.md](LICENSE.md).
