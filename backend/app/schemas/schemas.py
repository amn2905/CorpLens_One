from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime

# Auth Schemas
class UserRegister(BaseModel):
    email: str
    password: str = Field(..., min_length=6)
    full_name: str
    organization_name: str

class UserLogin(BaseModel):
    email: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user_id: str
    tenant_id: str
    role: str
    full_name: str

class UserProfile(BaseModel):
    id: str
    email: str
    full_name: str
    role: str
    tenant_id: str
    organization_name: Optional[str] = None

# Company Schemas
class CompanyCreate(BaseModel):
    name: str
    primary_domain: str
    industry: Optional[str] = "Technology"
    country: Optional[str] = "United States"

class DomainRecordSchema(BaseModel):
    id: str
    domain_name: str
    ip_address: Optional[str] = None
    asn: Optional[str] = None
    hosting_provider: Optional[str] = None
    ssl_issuer: Optional[str] = None
    ssl_valid: bool = True
    ssl_expires_at: Optional[datetime] = None
    dns_records: Dict[str, Any] = {}

class TechStackRecordSchema(BaseModel):
    id: str
    technology_name: str
    category: str
    detected_version: Optional[str] = None
    confidence: float = 0.95

class CVEFindingSchema(BaseModel):
    id: str
    cve_id: str
    technology: str
    severity: str
    cvss_score: float
    summary: str
    published_date: Optional[str] = None

class SanctionsMatchSchema(BaseModel):
    id: str
    matched_entity_name: str
    list_source: str
    match_score: float
    status: str
    notes: Optional[str] = None

class RiskScoreSchema(BaseModel):
    overall_score: float
    risk_tier: str
    infrastructure_score: float
    technology_score: float
    reputation_score: float
    compliance_score: float
    ai_summary: Optional[str] = None

class CompanyDetailSchema(BaseModel):
    id: str
    name: str
    primary_domain: str
    industry: Optional[str]
    country: Optional[str]
    risk_score: float
    risk_tier: str
    is_monitored: bool
    last_scanned: Optional[datetime]
    domains: List[DomainRecordSchema] = []
    tech_stack: List[TechStackRecordSchema] = []
    cve_findings: List[CVEFindingSchema] = []
    sanctions_matches: List[SanctionsMatchSchema] = []
    risk_breakdown: Optional[RiskScoreSchema] = None

class SearchResponse(BaseModel):
    companies: List[CompanyDetailSchema]
    total: int
