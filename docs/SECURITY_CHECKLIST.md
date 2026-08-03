# Enterprise Security & Compliance Hardening Checklist

This document details the security posture and compliance enforcement controls implemented in **CorpLens One**.

---

## 1. Multi-Tenant Data Isolation & Access Controls

- [x] **Database Row-Level Security (RLS)**: Enforced via PostgreSQL `tenant_id` session variables to prevent cross-tenant data leaks.
- [x] **Role-Based Access Control (RBAC)**: Strict permission boundaries for `SuperAdmin`, `TenantAdmin`, `Analyst`, and `Viewer` roles.
- [x] **Enterprise SSO (SAML 2.0 & OIDC)**: Support for Okta, Entra ID (Azure AD), and Google Workspace with mandatory MFA policies.
- [x] **SCIM 2.0 User Lifecycle Provisioning**: Automated user onboarding and immediate offboarding de-provisioning hooks.

---

## 2. Data Protection & Evidence Confidentiality

- [x] **Field-Level Encryption**: Sensitive evidence attachments and API keys encrypted at rest using AES-256-GCM.
- [x] **TLS 1.3 Transport Security**: All backend REST and WebSocket communication strictly enforced over HTTPS with TLS 1.3.
- [x] **API Key Rate Limiting**: Per-tenant rate limits enforced to prevent denial-of-service or quota abuse.

---

## 3. Auditability & Compliance Logging

- [x] **Immutable Audit Trail**: Logged actions for every investigation view, scan execution, report export, and user role change.
- [x] **SIEM / SOAR Compatibility**: Export intelligence in OASIS STIX v2.1 JSON format for Splunk and Microsoft Sentinel.
- [x] **Right-to-Erasure Workflow**: Tenant-configurable data retention policies supporting GDPR/CCPA privacy compliance.

---

## 4. Operational & Network Defense

- [x] **Strict Non-Intrusive OSINT Policy**: Zero vulnerability exploits, paywall bypasses, or unauthorized port scanning.
- [x] **Docker & Kubernetes Hardening**: Non-root container execution with read-only root filesystem flags where applicable.
- [x] **Health Check Monitoring**: `/admin/health/liveness` and `/admin/health/readiness` probes configured.
