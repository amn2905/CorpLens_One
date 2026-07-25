from fastapi import APIRouter, HTTPException, Depends
from typing import List
from datetime import datetime, timezone
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.schemas import CompanyCreate, CompanyDetailSchema
from app.connectors.osint_engine import osint_engine
from app.services.risk_engine import risk_engine
from app.repositories.company_repository import CompanyRepository
from app.models.domain_models import CompanyModel, DomainModel, TechStackModel, CVEFindingModel

router = APIRouter(prefix="/companies", tags=["Company Intelligence Workspace"])

def format_company_response(company: CompanyModel) -> dict:
    """Format SQLAlchemy CompanyModel ORM instance to CompanyDetailSchema payload dict."""
    return {
        "id": company.id,
        "name": company.name,
        "primary_domain": company.primary_domain,
        "industry": company.industry,
        "country": company.country,
        "risk_score": company.risk_score,
        "risk_tier": company.risk_tier,
        "is_monitored": company.is_monitored,
        "last_scanned": company.last_scanned.isoformat() if company.last_scanned else datetime.now(timezone.utc).isoformat(),
        "domains": [
            {
                "id": d.id,
                "domain_name": d.domain_name,
                "ip_address": d.ip_address,
                "asn": d.asn,
                "hosting_provider": d.hosting_provider,
                "ssl_issuer": d.ssl_issuer,
                "ssl_valid": d.ssl_valid,
                "dns_records": d.dns_records or {}
            } for d in (company.domains or [])
        ],
        "tech_stack": [
            {
                "id": t.id,
                "technology_name": t.technology_name,
                "category": t.category,
                "detected_version": t.detected_version,
                "confidence": t.confidence
            } for t in (company.tech_stack or [])
        ],
        "cve_findings": [
            {
                "id": c.id,
                "cve_id": c.cve_id,
                "technology": c.technology,
                "severity": c.severity,
                "cvss_score": c.cvss_score,
                "summary": c.summary,
                "published_date": c.published_date
            } for c in (company.cve_findings or [])
        ],
        "sanctions_matches": [],
        "risk_breakdown": {
            "overall_score": company.risk_score,
            "risk_tier": company.risk_tier,
            "infrastructure_score": 15.0 if company.risk_score < 40 else 45.0,
            "technology_score": 20.0 if company.risk_score < 40 else 85.0,
            "reputation_score": 12.0,
            "compliance_score": 5.0,
            "ai_summary": f"{company.name} risk posture is classified as {company.risk_tier.upper()} ({company.risk_score}/100). Evaluated via PostgreSQL database engine."
        }
    }

@router.get("", response_model=List[CompanyDetailSchema])
async def list_companies(db: Session = Depends(get_db)):
    repo = CompanyRepository(db)
    companies = repo.list_all()
    return [format_company_response(c) for c in companies]

@router.get("/{company_id}", response_model=CompanyDetailSchema)
async def get_company_detail(company_id: str, db: Session = Depends(get_db)):
    repo = CompanyRepository(db)
    company = repo.get_by_id(company_id)
    if not company:
        raise HTTPException(status_code=404, detail="Company investigation profile not found in PostgreSQL")
    return format_company_response(company)

@router.post("/scan", response_model=CompanyDetailSchema)
async def create_and_scan_company(payload: CompanyCreate, db: Session = Depends(get_db)):
    osint_results = await osint_engine.scan_domain(payload.primary_domain)
    
    risk_assessment = risk_engine.calculate_risk(
        domain_data=osint_results,
        cve_findings=osint_results["cve_findings"],
        sanctions_matches=[]
    )

    company_id = f"cmp-{int(datetime.now(timezone.utc).timestamp()):03d}"
    
    # Save Company to PostgreSQL via ORM
    new_company = CompanyModel(
        id=company_id,
        tenant_id="tenant-enterprise-001",
        name=payload.name,
        primary_domain=payload.primary_domain,
        industry=payload.industry or "Technology & Software",
        country=payload.country or "United States",
        risk_score=risk_assessment["overall_score"],
        risk_tier=risk_assessment["risk_tier"],
        is_monitored=True
    )
    db.add(new_company)
    db.commit()
    db.refresh(new_company)

    # Save Domain record
    domain_rec = DomainModel(
        id=f"dom-{company_id}-1",
        company_id=company_id,
        domain_name=payload.primary_domain,
        ip_address=osint_results["ip_address"],
        asn=osint_results["asn"],
        hosting_provider=osint_results["hosting_provider"],
        ssl_issuer=osint_results["ssl_issuer"],
        ssl_valid=osint_results["ssl_valid"],
        dns_records=osint_results["dns_records"]
    )
    db.add(domain_rec)

    # Save Tech Stack records
    for idx, item in enumerate(osint_results["tech_stack"]):
        t_rec = TechStackModel(
            id=f"t-{company_id}-{idx}",
            company_id=company_id,
            technology_name=item["name"],
            category=item["category"],
            detected_version=item.get("version", "1.0"),
            confidence=0.95
        )
        db.add(t_rec)

    # Save CVE Findings
    for idx, cve in enumerate(osint_results["cve_findings"]):
        c_rec = CVEFindingModel(
            id=f"cve-{company_id}-{idx}",
            company_id=company_id,
            cve_id=cve["cve_id"],
            technology=cve["technology"],
            severity=cve["severity"],
            cvss_score=cve["cvss_score"],
            summary=cve["summary"],
            published_date=cve["published_date"]
        )
        db.add(c_rec)

    db.commit()
    db.refresh(new_company)
    return format_company_response(new_company)
