from fastapi import APIRouter, Query, Depends
from typing import List, Optional
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.schemas import CompanyDetailSchema
from app.repositories.company_repository import CompanyRepository
from app.api.v1.companies import format_company_response

router = APIRouter(prefix="/search", tags=["Global Intelligence Search"])

@router.get("", response_model=List[CompanyDetailSchema])
async def global_search(
    q: Optional[str] = Query(None, description="Search by Company, Domain, Tech, Country, Industry"),
    db: Session = Depends(get_db)
):
    repo = CompanyRepository(db)
    all_companies = repo.list_all()

    if not q:
        return [format_company_response(c) for c in all_companies]

    query_lower = q.lower()
    matched = []

    for comp in all_companies:
        name_match = query_lower in comp.name.lower()
        domain_match = query_lower in comp.primary_domain.lower()
        industry_match = query_lower in (comp.industry or "").lower()
        country_match = query_lower in (comp.country or "").lower()

        if name_match or domain_match or industry_match or country_match:
            matched.append(format_company_response(comp))

    return matched
