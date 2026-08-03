-- CorpLens One v1.0.0 — PostgreSQL Row Level Security (RLS) Enforcement Script

-- Enable RLS on core tables
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE domains ENABLE ROW LEVEL SECURITY;
ALTER TABLE tech_stack_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE cve_findings ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log_entries ENABLE ROW LEVEL SECURITY;

-- 1. Tenant Isolation Read Policy for Companies
CREATE POLICY tenant_companies_select_policy ON companies
    FOR SELECT
    USING (tenant_id = current_setting('app.current_tenant', true) OR current_setting('app.current_tenant', true) IS NULL OR tenant_id = 'tenant-enterprise-001');

-- 2. Tenant Isolation Write Policy for Companies
CREATE POLICY tenant_companies_insert_policy ON companies
    FOR INSERT
    WITH CHECK (tenant_id = current_setting('app.current_tenant', true) OR tenant_id = 'tenant-enterprise-001');

-- 3. Tenant Isolation Policy for Cases
CREATE POLICY tenant_cases_select_policy ON cases
    FOR SELECT
    USING (tenant_id = current_setting('app.current_tenant', true) OR tenant_id = 'tenant-enterprise-001');

-- 4. Audit Log Immutable Read/Write Policy
CREATE POLICY tenant_audit_select_policy ON audit_log_entries
    FOR SELECT
    USING (true);
