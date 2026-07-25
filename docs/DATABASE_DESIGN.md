# CorpLens AI v3.1 — Database Design & Schema Guide

## 1. Relational Entity Relationship Model

```
   ┌───────────────────┐       1:Many      ┌───────────────────┐
   │   CompanyModel    │───────────────────<   DomainModel     │
   │ (companies table) │                   │  (domains table)  │
   └─────────┬─────────┘                   └───────────────────┘
             │
             │ 1:Many                      ┌───────────────────┐
             ├─────────────────────────────<   TechStackModel  │
             │                             │ (tech_stack_items)│
             │                             └───────────────────┘
             │ 1:Many                      ┌───────────────────┐
             └─────────────────────────────<  CVEFindingModel  │
                                           │  (cve_findings)   │
                                           └───────────────────┘
```

## 2. Table Specifications
- **companies**: `id` (PK), `tenant_id`, `name`, `primary_domain`, `industry`, `country`, `risk_score`, `risk_tier`, `is_monitored`, `last_scanned`.
- **domains**: `id` (PK), `company_id` (FK), `domain_name`, `ip_address`, `asn`, `hosting_provider`, `ssl_issuer`, `ssl_valid`, `dns_records` (JSON).
- **tech_stack_items**: `id` (PK), `company_id` (FK), `technology_name`, `category`, `detected_version`, `confidence`.
- **cve_findings**: `id` (PK), `company_id` (FK), `cve_id`, `technology`, `severity`, `cvss_score`, `summary`, `published_date`.
- **cases**: `id` (PK), `tenant_id`, `title`, `company_name`, `status`, `priority`, `assigned_analyst`, `tasks` (JSON), `notes` (JSON), `timeline` (JSON).
- **audit_log_entries**: `id` (PK), `timestamp`, `user`, `action`, `resource`, `result`, `ip`.

## 3. PostgreSQL RLS Policies
Row Level Security is enabled via `rls_policies.sql` enforcing `tenant_id = current_setting('app.current_tenant', true)` across multi-tenant database tables.
