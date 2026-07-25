# 🗄️ CorpLens AI — Database Design & Schema Specification

> **Version**: 3.1 Enterprise Edition  
> **Database Engine**: PostgreSQL 16 (Relational) & Neo4j 5.18 (Graph)  

---

## 1. Relational Database ER Architecture (PostgreSQL 16)

The relational storage tier is built using PostgreSQL 16 with SQLAlchemy 2.0 ORM bindings. It stores structured company metadata, risk pillar scores, investigation cases, tasks, analyst notes, and multi-tenant security credentials.

```
┌─────────────────┐       1:N       ┌────────────────────────┐
│   companies     │─────────────────│  digital_footprints    │
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

## 2. Table Schemas & Definitions

### 2.1 Table: `companies`
Stores primary company demographic and risk summary data.

| Column | Type | Constraints | Description |
|:---|:---|:---|:---|
| `id` | `VARCHAR(64)` | `PRIMARY KEY` | Unique company identifier |
| `name` | `VARCHAR(255)` | `NOT NULL` | Registered corporate name |
| `domain` | `VARCHAR(255)` | `UNIQUE, NOT NULL` | Primary web domain |
| `sector` | `VARCHAR(100)` | `INDEXED` | Industry classification sector |
| `country` | `VARCHAR(100)` | `DEFAULT 'USA'` | Country of registration |
| `overall_risk_score` | `FLOAT` | `CHECK (0.0 - 10.0)` | Composite 7-pillar risk score |
| `confidence_score` | `FLOAT` | `CHECK (0.0 - 1.0)` | Data confidence interval |
| `risk_level` | `VARCHAR(20)` | `NOT NULL` | Enum: `LOW`, `MEDIUM`, `HIGH`, `CRITICAL` |
| `tenant_id` | `VARCHAR(64)` | `INDEXED, NOT NULL` | Multi-tenant owner identifier |
| `created_at` | `TIMESTAMP` | `DEFAULT NOW()` | Registration timestamp |

---

### 2.2 Table: `cases`
Stores analyst investigation cases.

| Column | Type | Constraints | Description |
|:---|:---|:---|:---|
| `id` | `VARCHAR(64)` | `PRIMARY KEY` | Unique case ID |
| `title` | `VARCHAR(255)` | `NOT NULL` | Case title |
| `company_id` | `VARCHAR(64)` | `FOREIGN KEY (companies.id)` | Linked target company |
| `status` | `VARCHAR(32)` | `DEFAULT 'OPEN'` | Enum: `OPEN`, `IN_PROGRESS`, `AWAITING_APPROVAL`, `CLOSED` |
| `priority` | `VARCHAR(20)` | `DEFAULT 'MEDIUM'` | Enum: `LOW`, `MEDIUM`, `HIGH`, `CRITICAL` |
| `assigned_analyst`| `VARCHAR(255)`| `NULLABLE` | Assigned analyst email |

---

## 3. PostgreSQL Row-Level Security (RLS) Policies

To ensure complete multi-tenant isolation, Row-Level Security is enabled across all production tables (`backend/app/db/rls_policies.sql`).

```sql
-- 1. Enable RLS on companies table
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

-- 2. Tenant isolation policy
CREATE POLICY company_tenant_isolation_policy ON companies
    FOR ALL
    USING (tenant_id = current_setting('app.current_tenant_id', true));

-- 3. Enable RLS on investigation cases table
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;

CREATE POLICY case_tenant_isolation_policy ON cases
    FOR ALL
    USING (tenant_id = current_setting('app.current_tenant_id', true));
```

---

## 4. Neo4j Graph Topology Schema

The graph database represents relationship networks between corporate entities:

### Graph Node Labels
- `:Company` (Properties: `id`, `name`, `domain`, `risk_score`)
- `:Executive` (Properties: `id`, `name`, `title`)
- `:Technology` (Properties: `name`, `version`, `category`)
- `:CVE` (Properties: `cve_id`, `cvss_score`, `severity`)
- `:Supplier` (Properties: `id`, `name`, `tier`)

### Graph Relationship Types
- `(:Company)-[:HAS_SUBSIDIARY]->(:Company)`
- `(:Executive)-[:EXECUTIVE_OF]->(:Company)`
- `(:Company)-[:USES_TECH]->(:Technology)`
- `(:Technology)-[:HAS_VULNERABILITY]->(:CVE)`
- `(:Company)-[:DEPENDS_ON {tier: 1}]->(:Supplier)`
