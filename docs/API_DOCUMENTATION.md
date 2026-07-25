# 🔌 CorpLens AI — REST API Documentation

> **Version**: 3.1 Enterprise Edition  
> **Base URL**: `http://localhost:8000/api/v1`  
> **Interactive OpenAPI UI**: `http://localhost:8000/docs`  

---

## 1. Overview & Authentication

All API endpoints accept and return `application/json` payloads (except binary report download endpoints which return `%PDF-1.4` binary or raw file streams).

### Authentication Headers
For protected endpoints, include the JWT bearer token in the HTTP Authorization header:

```http
Authorization: Bearer <your_jwt_access_token>
```

---

## 2. API Endpoints Reference

### 🏢 Companies Endpoint Router (`/api/v1/companies`)

#### `GET /api/v1/companies/`
Retrieves a paginated list of all monitored companies in the platform database.

**Query Parameters:**
- `skip` *(int, default: 0)*: Number of records to skip for pagination.
- `limit` *(int, default: 50)*: Maximum records to return.
- `sector` *(string, optional)*: Filter by business sector (e.g. `Finance`, `Cybersecurity`, `Healthcare`).

**Response `200 OK`:**
```json
[
  {
    "id": "comp_01h8x",
    "name": "Acme Cybersecurity Corp",
    "domain": "acmesecurity.com",
    "sector": "Cybersecurity",
    "country": "United States",
    "overall_risk_score": 3.4,
    "confidence_score": 0.98,
    "risk_level": "LOW",
    "last_scanned_at": "2026-07-22T14:30:00Z"
  }
]
```

---

#### `GET /api/v1/companies/{company_id}`
Retrieves a full 7-axis intelligence profile for a specific company.

**Response `200 OK`:**
```json
{
  "id": "comp_01h8x",
  "name": "Acme Cybersecurity Corp",
  "domain": "acmesecurity.com",
  "digital_footprint": {
    "ip_address": "192.0.2.1",
    "asn": "AS13335 CLOUDFLARENET",
    "hosting_provider": "Cloudflare, Inc.",
    "dns_records": {
      "A": ["192.0.2.1"],
      "MX": ["mail.acmesecurity.com"],
      "TXT": ["v=spf1 include:_spf.google.com ~all"]
    }
  },
  "risk_pillars": {
    "infrastructure": 2.1,
    "technology": 4.0,
    "reputation": 1.5,
    "business": 3.0,
    "operational": 2.5,
    "supply_chain": 4.2,
    "compliance": 1.0
  }
}
```

---

#### `POST /api/v1/companies/scan`
Triggers a live, passive OSINT scan for a target corporate domain.

**Request Body:**
```json
{
  "domain": "targetcompany.com",
  "deep_scan": true
}
```

**Response `202 Accepted`:**
```json
{
  "scan_id": "scan_9912a",
  "status": "IN_PROGRESS",
  "target_domain": "targetcompany.com",
  "estimated_completion_seconds": 15
}
```

---

### 🤖 AI Copilot Endpoint Router (`/api/v1/ai`)

#### `POST /api/v1/ai/chat`
Submits a query to the RAG-enabled AI Intelligence Copilot.

**Request Body:**
```json
{
  "prompt": "Compare the cyber security risk profile between Acme Cybersecurity and CyberShield Systems.",
  "conversation_id": "conv_8831b",
  "include_citations": true
}
```

**Response `200 OK`:**
```json
{
  "answer": "Acme Cybersecurity exhibits a lower overall risk score (3.4) compared to CyberShield Systems (7.1)...",
  "intent_category": "COMPARE",
  "confidence_score": 0.97,
  "sources": [
    "NIST NVD Advisory CVE-2024-1182",
    "PostgreSQL Corporate Repository",
    "OFAC Sanctions Database"
  ],
  "reasoning_steps": [
    "Retrieved 2 company records from PostgreSQL database",
    "Correlated active CVE vulnerability count",
    "Evaluated composite 7-pillar risk weights"
  ],
  "suggested_followups": [
    "Would you like to export a comparative PDF report?",
    "Show me the supply chain dependencies for CyberShield Systems."
  ]
}
```

---

### 📋 Cases & Investigation Router (`/api/v1/cases`)

#### `GET /api/v1/cases/`
List investigation cases. Supports status filtering (`OPEN`, `IN_PROGRESS`, `AWAITING_APPROVAL`, `CLOSED`).

#### `POST /api/v1/cases/`
Creates a new investigation case.

**Request Body:**
```json
{
  "title": "Vendor Risk Assessment: CyberShield Systems",
  "target_company_id": "comp_02k9y",
  "priority": "HIGH",
  "assigned_analyst": "analyst@corplens.ai"
}
```

---

### 🕸️ Graph Topology Router (`/api/v1/graph`)

#### `GET /api/v1/graph/topology`
Returns Cytoscape.js format node and edge data for visual entity relationship rendering.

**Response `200 OK`:**
```json
{
  "nodes": [
    { "data": { "id": "comp_01", "label": "Acme Security", "type": "COMPANY" } },
    { "data": { "id": "exec_01", "label": "John Doe (CEO)", "type": "EXECUTIVE" } }
  ],
  "edges": [
    { "data": { "id": "edge_01", "source": "comp_01", "target": "exec_01", "label": "EXECUTIVE_OF" } }
  ]
}
```

---

### 📄 Reports Endpoint Router (`/api/v1/reports`)

#### `GET /api/v1/reports/download/{company_id}`
Generates and downloads a compliance report in the specified format (`pdf`, `docx`, `csv`, `html`, `json`).

---

### 🛡️ System & Health Endpoints

#### `GET /api/v1/admin/health/readiness`
Health check probe verifying database connection state.

#### `GET /metrics`
Prometheus metric endpoint returning system performance metrics.
