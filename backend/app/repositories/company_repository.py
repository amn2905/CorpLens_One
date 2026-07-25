from typing import List, Optional, Dict, Any
from sqlalchemy.orm import Session
from app.models.domain_models import CompanyModel, DomainModel, TechStackModel, CVEFindingModel

# Fallback company instances if DB is unseeded or offline
MOCK_CMP_1 = CompanyModel(
    id="cmp-001",
    tenant_id="tenant-enterprise-001",
    name="Acme Global Financial Group",
    primary_domain="acmeglobal.com",
    industry="Financial Services & Banking",
    country="United States",
    risk_score=28.5,
    risk_tier="Low",
    is_monitored=True
)

MOCK_CMP_2 = CompanyModel(
    id="cmp-002",
    tenant_id="tenant-enterprise-001",
    name="Nexus Dynamics Defense Solutions",
    primary_domain="nexusdynamics.io",
    industry="Defense & Cybersecurity SaaS",
    country="United Kingdom",
    risk_score=68.4,
    risk_tier="High",
    is_monitored=True
)

class CompanyRepository:
    """Repository handling Company persistence and queries."""

    def __init__(self, db: Optional[Session] = None):
        self.db = db

    def get_by_id(self, company_id: str) -> Optional[CompanyModel]:
        if self.db:
            try:
                comp = self.db.query(CompanyModel).filter(CompanyModel.id == company_id).first()
                if comp:
                    return comp
            except Exception:
                pass
        
        # Fallback to initial enterprise target instances
        if company_id == "cmp-001":
            return MOCK_CMP_1
        elif company_id == "cmp-002":
            return MOCK_CMP_2
        return None

    def list_all(self, tenant_id: str = "tenant-enterprise-001") -> List[CompanyModel]:
        if self.db:
            try:
                comps = self.db.query(CompanyModel).filter(CompanyModel.tenant_id == tenant_id).all()
                if comps:
                    return comps
            except Exception:
                pass
        return [MOCK_CMP_1, MOCK_CMP_2]

    def create(self, company_data: Dict[str, Any]) -> Optional[CompanyModel]:
        if not self.db:
            return None
        try:
            company = CompanyModel(
                id=company_data.get("id"),
                name=company_data["name"],
                primary_domain=company_data["primary_domain"],
                industry=company_data.get("industry", "Technology & Software"),
                country=company_data.get("country", "United States"),
                risk_score=company_data.get("risk_score", 0.0),
                risk_tier=company_data.get("risk_tier", "Low"),
                is_monitored=company_data.get("is_monitored", True)
            )
            self.db.add(company)
            self.db.commit()
            self.db.refresh(company)
            return company
        except Exception as e:
            self.db.rollback()
            print(f"[CompanyRepository Error] Save failed: {e}")
            return None
