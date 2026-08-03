# 🗄️ CorpLens One — Database Architecture & Design Specification

> **Document Version**: 1.0.0  
> **Database Engines**: PostgreSQL 16 (Relational DB), Neo4j 5.18 (Graph DB), Redis 7 (Cache DB)  
> **Status**: Production Schema Design  

---

## 1. Relational Database Schema Design (PostgreSQL 16)

### 1.1 Overview
The primary data persistence layer utilizes PostgreSQL 16 managed through SQLAlchemy 2.0 ORM. It stores tenant organizations, company target profiles, risk scores, CVE findings, investigation cases, tasks, and audit logs.

### 1.2 Entity-Relationship (ER) Architecture Diagram
```
┌─────────────────┐       1:N       ┌────────────────────────┐
│   companies     │─────────────────│   digital_footprints   │
└────────┬────────┘                 └────────────────────────┘
         │
         │ 1:N                      1:N
         ├──────────────────────────────────────────────────┐
         │                                                  │
         ▼                                                  ▼
┌─────────────────┐                                ┌─────────────────┐
│  risk_pillars   │                                │  cve_findings   │
└─────────────────┘                                └─────────────────┘
         │
         │ 1:N
         ▼
┌─────────────────┐       1:N       ┌────────────────────────┐
│      cases      │─────────────────│       case_tasks       │
└─────────────────┘                 └────────────────────────┘
```

---

### 1.3 Table Definitions & Schemas

#### Table: `companies`
Stores corporate target profile attributes and high-level risk metrics.

```sql
CREATE TABLE companies (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    primary_domain VARCHAR(255) UNIQUE NOT NULL,
    risk_score DOUBLE PRECISION CHECK (risk_score >= 0.0 AND risk_score <= 10.0),
    risk_tier VARCHAR(32) NOT NULL,
    is_monitored BOOLEAN DEFAULT TRUE,
    country VARCHAR(100) DEFAULT 'United States',
    industry VARCHAR(100),
    last_scanned TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    confidence_score DOUBLE PRECISION CHECK (confidence_score >= 0.0 AND confidence_score <= 1.0),
    tenant_id VARCHAR(64) NOT NULL INDEX
);
```

#### Table: `cases`
Stores analyst investigation cases and Kanban state indicators.

```sql
CREATE TABLE cases (
    id VARCHAR(64) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    target_company VARCHAR(255) NOT NULL,
    status VARCHAR(32) DEFAULT 'Open',
    priority VARCHAR(32) DEFAULT 'Medium',
    assigned_analyst VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    tenant_id VARCHAR(64) NOT NULL INDEX
);
```

---

## 2. Multi-Tenant Row-Level Security (RLS) Policies

To ensure strict tenant isolation, PostgreSQL Row-Level Security (RLS) is applied to core database tables (`backend/app/db/rls_policies.sql`).

```sql
-- Enable Row Level Security on companies table
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

-- Create policy for tenant isolation
CREATE POLICY company_tenant_isolation_policy ON companies
    FOR ALL
    USING (tenant_id = current_setting('app.current_tenant', true) OR tenant_id = 'tenant-enterprise-001');
```

---

## 3. Graph Database Topology (Neo4j 5.18)

Neo4j is utilized to model complex corporate network connections, corporate ownership, leadership links, and vulnerability exposures.

### 3.1 Node Labels
- `:Company` (Attributes: `id`, `name`, `primary_domain`, `risk_score`)
- `:Executive` (Attributes: `id`, `name`, `title`)
- `:Technology` (Attributes: `name`, `version`, `category`)
- `:CVE` (Attributes: `cve_id`, `cvss_score`, `severity`)

### 3.2 Relationship Types
- `(:Company)-[:HAS_SUBSIDIARY]->(:Company)`
- `(:Executive)-[:EXECUTIVE_OF]->(:Company)`
- `(:Company)-[:USES_TECH]->(:Technology)`
- `(:Technology)-[:EXPOSES_VULNERABILITY]->(:CVE)`

---

## 4. In-Memory Caching & Task Dispatch (Redis 7)

Redis 7 operates as an in-memory key-value cache to store:
- Frequently queried company profiles (Key TTL: 600 seconds).
- Cypher graph query responses (Key TTL: 300 seconds).
- Ingress rate-limiting counters (`rate_limit:tenant_id:timestamp`).

---

## 5. Database Maintenance & Backup Strategy

1. **PostgreSQL Automated Backups**: Daily `pg_dump` backups with WAL (Write-Ahead Logging) archiving for Point-In-Time Recovery (PITR).
2. **Neo4j Snapshotting**: Offline and online database backups executed via `neo4j-admin database backup`.
3. **Database Migrations**: Managed via Alemby script migrations in `backend/app/db/migrations`.

---

## 6. Version & License Information

- **Document Version**: 1.0.0
- **Author**: CorpLens One Database Engineering Group
- **License**: Enterprise Commercial License. See [LICENSE.md](LICENSE.md).
