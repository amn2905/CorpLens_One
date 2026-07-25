import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship
from app.core.database import Base

def generate_uuid():
    return str(uuid.uuid4())

class CompanyModel(Base):
    __tablename__ = "companies"

    id = Column(String(100), primary_key=True, default=generate_uuid)
    tenant_id = Column(String(100), default="tenant-enterprise-001", index=True)
    name = Column(String(255), nullable=False, index=True)
    primary_domain = Column(String(255), nullable=False, index=True)
    industry = Column(String(100), default="Technology & Software")
    country = Column(String(100), default="United States")
    risk_score = Column(Float, default=0.0)
    risk_tier = Column(String(50), default="Low")
    is_monitored = Column(Boolean, default=True)
    last_scanned = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    domains = relationship("DomainModel", back_populates="company", cascade="all, delete-orphan")
    tech_stack = relationship("TechStackModel", back_populates="company", cascade="all, delete-orphan")
    cve_findings = relationship("CVEFindingModel", back_populates="company", cascade="all, delete-orphan")

class DomainModel(Base):
    __tablename__ = "domains"

    id = Column(String(100), primary_key=True, default=generate_uuid)
    company_id = Column(String(100), ForeignKey("companies.id"), nullable=False)
    domain_name = Column(String(255), nullable=False, index=True)
    ip_address = Column(String(100), nullable=True)
    asn = Column(String(255), nullable=True)
    hosting_provider = Column(String(255), nullable=True)
    ssl_issuer = Column(String(255), nullable=True)
    ssl_valid = Column(Boolean, default=True)
    dns_records = Column(JSON, default=dict)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    company = relationship("CompanyModel", back_populates="domains")

class TechStackModel(Base):
    __tablename__ = "tech_stack_items"

    id = Column(String(100), primary_key=True, default=generate_uuid)
    company_id = Column(String(100), ForeignKey("companies.id"), nullable=False)
    technology_name = Column(String(255), nullable=False)
    category = Column(String(100), default="General")
    detected_version = Column(String(100), default="1.0")
    confidence = Column(Float, default=0.95)

    company = relationship("CompanyModel", back_populates="tech_stack")

class CVEFindingModel(Base):
    __tablename__ = "cve_findings"

    id = Column(String(100), primary_key=True, default=generate_uuid)
    company_id = Column(String(100), ForeignKey("companies.id"), nullable=False)
    cve_id = Column(String(100), nullable=False, index=True)
    technology = Column(String(255), nullable=False)
    severity = Column(String(50), default="MEDIUM")  # CRITICAL, HIGH, MEDIUM, LOW
    cvss_score = Column(Float, default=5.0)
    summary = Column(Text, nullable=True)
    published_date = Column(String(50), nullable=True)

    company = relationship("CompanyModel", back_populates="cve_findings")

class CaseModel(Base):
    __tablename__ = "cases"

    id = Column(String(100), primary_key=True, default=generate_uuid)
    tenant_id = Column(String(100), default="tenant-enterprise-001", index=True)
    title = Column(String(255), nullable=False)
    company_name = Column(String(255), nullable=False)
    company_domain = Column(String(255), nullable=False)
    status = Column(String(50), default="In Progress")  # Open, In Progress, Awaiting Approval, Closed
    priority = Column(String(50), default="High")  # Critical, High, Medium, Low
    assigned_analyst = Column(String(255), default="Sarah Jenkins")
    scope = Column(Text, nullable=True)
    risk_score = Column(Float, default=50.0)
    tasks = Column(JSON, default=list)
    notes = Column(JSON, default=list)
    timeline = Column(JSON, default=list)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

class VendorModel(Base):
    __tablename__ = "vendors"

    id = Column(String(100), primary_key=True, default=generate_uuid)
    tenant_id = Column(String(100), default="tenant-enterprise-001")
    name = Column(String(255), nullable=False)
    domain = Column(String(255), nullable=False)
    tier = Column(String(100), default="Tier 1 — Critical")
    service = Column(Text, nullable=True)
    risk_score = Column(Float, default=20.0)
    sig_score = Column(String(50), default="95.0 / 100")
    status = Column(String(50), default="Compliant")
    country = Column(String(100), default="United States")
    last_assessment = Column(String(50), default="2026-07-01")
    tech_stack = Column(JSON, default=list)
    compliance_flags = Column(JSON, default=list)

class MonitoringAlertModel(Base):
    __tablename__ = "monitoring_alerts"

    id = Column(String(100), primary_key=True, default=generate_uuid)
    tenant_id = Column(String(100), default="tenant-enterprise-001")
    domain = Column(String(255), nullable=False)
    company = Column(String(255), nullable=False)
    alert_type = Column(String(100), nullable=False)
    severity = Column(String(50), default="HIGH")
    description = Column(Text, nullable=False)
    track = Column(String(50), default="CVE")
    dismissed = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

class ExecutiveProfileModel(Base):
    __tablename__ = "executive_profiles"

    id = Column(String(100), primary_key=True, default=generate_uuid)
    name = Column(String(255), nullable=False)
    title = Column(String(255), nullable=False)
    company = Column(String(255), nullable=False)
    domain = Column(String(255), nullable=False)
    risk_score = Column(Float, default=15.0)
    career_history = Column(JSON, default=list)
    board_memberships = Column(JSON, default=list)
    risk_flags = Column(JSON, default=list)

class AuditLogModel(Base):
    __tablename__ = "audit_log_entries"

    id = Column(String(100), primary_key=True, default=generate_uuid)
    timestamp = Column(String(100), default=lambda: datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S"))
    user = Column(String(255), nullable=False)
    action = Column(String(100), nullable=False)
    resource = Column(String(255), nullable=False)
    result = Column(String(50), default="SUCCESS")
    ip = Column(String(100), default="127.0.0.1")
