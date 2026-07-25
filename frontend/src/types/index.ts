export interface DomainRecord {
  id: string;
  domain_name: string;
  ip_address?: string;
  asn?: string;
  hosting_provider?: string;
  ssl_issuer?: string;
  ssl_valid: boolean;
  dns_records: Record<string, any>;
}

export interface TechStackRecord {
  id: string;
  technology_name: string;
  category: string;
  detected_version?: string;
  confidence: number;
}

export interface CVEFinding {
  id: string;
  cve_id: string;
  technology: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  cvss_score: number;
  summary: string;
  published_date?: string;
}

export interface SanctionsMatch {
  id: string;
  matched_entity_name: string;
  list_source: string;
  match_score: number;
  status: string;
  notes?: string;
}

export interface RiskBreakdown {
  overall_score: number;
  risk_tier: 'Low' | 'Medium' | 'High' | 'Critical';
  infrastructure_score: number;
  technology_score: number;
  reputation_score: number;
  compliance_score: number;
  ai_summary?: string;
}

export interface Company {
  id: string;
  name: string;
  primary_domain: string;
  industry?: string;
  country?: string;
  risk_score: number;
  risk_tier: 'Low' | 'Medium' | 'High' | 'Critical';
  is_monitored: boolean;
  last_scanned?: string;
  domains: DomainRecord[];
  tech_stack: TechStackRecord[];
  cve_findings: CVEFinding[];
  sanctions_matches: SanctionsMatch[];
  risk_breakdown?: RiskBreakdown;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: string;
  tenant_id: string;
  organization_name?: string;
}
