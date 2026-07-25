# 🛡️ CorpLens AI — Security Review & Hardening Audit

> **Version**: 3.1 Enterprise Edition  
> **Security Classification**: Enterprise Compliance Document  
> **Last Audit Date**: July 2026  

---

## 1. Security Architecture Summary

CorpLens AI incorporates Defense-in-Depth (DiD) principles across network, application, data storage, and operational layers.

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. Perimeter Security (TLS 1.3 Encryption, Reverse Proxy WAF)   │
├─────────────────────────────────────────────────────────────────┤
│ 2. Authentication & AuthZ (JWT Refresh, RBAC Guard Middleware)  │
├─────────────────────────────────────────────────────────────────┤
│ 3. Data Storage Security (PostgreSQL Row-Level Security RLS)    │
├─────────────────────────────────────────────────────────────────┤
│ 4. Passive OSINT Guarantee (Zero Invasive Port Scans / Hacking)  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. OWASP Top 10 Mitigation Matrix

| OWASP Vulnerability | Threat Vector | CorpLens AI Enterprise Mitigation | Status |
|:---|:---|:---|:---:|
| **A01: Broken Access Control** | Unauthorized tenant data access | PostgreSQL Row-Level Security (`rls_policies.sql`) enforces `tenant_id` context on every ORM query. | ✅ VERIFIED |
| **A02: Cryptographic Failures** | Password theft / Token forgery | PBKDF2-SHA256 password hashing with unique salt, 256-bit JWT secret signing. | ✅ VERIFIED |
| **A03: Injection** | SQL / Cypher / Command injection | 100% SQLAlchemy parameterization, Cypher parameterized queries, Pydantic v2 validation. | ✅ VERIFIED |
| **A04: Insecure Design** | Unlawful scanning liability | System operates strictly on passive public records (DNS, CT logs, public feeds). Zero active exploit attempts. | ✅ VERIFIED |
| **A05: Security Misconfiguration**| Default credentials | Mandatory environment variable validation on server startup (`env_validator.py`). | ✅ VERIFIED |
| **A07: Identification & Auth** | Brute force / Session hijack | JWT expiration (15 min access, 7 day refresh), rate limiting per IP. | ✅ VERIFIED |
| **A08: Software & Data Integrity**| Webhook payload tampering | Cryptographic HMAC-SHA256 signature verification for outgoing and incoming webhooks. | ✅ VERIFIED |

---

## 3. Role-Based Access Control (RBAC) Matrix

The system enforces four distinct access control tiers:

| Permission / Action | Admin | Analyst | Viewer | Auditor |
|:---|:---:|:---:|:---:|:---:|
| **View Intelligence Profiles** | ✅ | ✅ | ✅ | ✅ |
| **Trigger Passive Domain Scan**| ✅ | ✅ | ❌ | ❌ |
| **Create / Update Cases** | ✅ | ✅ | ❌ | ❌ |
| **Query RAG AI Copilot** | ✅ | ✅ | ✅ | ❌ |
| **Export PDF / DOCX Reports** | ✅ | ✅ | ✅ | ✅ |
| **Manage Tenant Users & RBAC** | ✅ | ❌ | ❌ | ❌ |
| **Access Audit Logs** | ✅ | ❌ | ❌ | ✅ |

---

## 4. Compliance & Regulatory Alignment

- **Lawful OSINT Assurance**: Adheres to non-intrusive public data collection standards. No port scans, vulnerability probes, or private credential harvesting.
- **GDPR Compliance**: Right-to-be-forgotten endpoints and automated data retention purges for non-corporate PII.
- **SOC2 Type II Ready**: Full audit log tracking (`audit_logs` table) recording user action, timestamp, IP address, and resource ID.
