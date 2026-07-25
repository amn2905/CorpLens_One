from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import Response
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.repositories.company_repository import CompanyRepository
from app.api.v1.companies import format_company_response
from app.services.report_generator import report_generator

router = APIRouter(prefix="/reports", tags=["Report Generation & Export"])

@router.get("/download/{company_id}")
async def download_report(company_id: str, format: str = "pdf", db: Session = Depends(get_db)):
    repo = CompanyRepository(db)
    comp_obj = repo.get_by_id(company_id)
    
    if comp_obj:
        company = format_company_response(comp_obj)
    else:
        company = {
            "id": company_id,
            "name": "Target Entity",
            "primary_domain": "targetdomain.com",
            "risk_score": 35.0,
            "risk_tier": "Medium",
            "tech_stack": [],
            "cve_findings": [],
            "sanctions_matches": []
        }

    fmt = format.lower()
    if fmt == "csv":
        csv_content = report_generator.generate_csv_report(company)
        return Response(
            content=csv_content.encode("utf-8"),
            media_type="text/csv",
            headers={"Content-Disposition": f"attachment; filename=CorpLens_Report_{company['primary_domain']}.csv"}
        )
    elif fmt == "pdf":
        pdf_bytes = report_generator.generate_pdf_document(
            title=f"Corporate Intelligence & Due Diligence Executive Brief",
            company_data=company,
            doc_type="soc2"
        )
        return Response(
            content=pdf_bytes,
            media_type="application/pdf",
            headers={"Content-Disposition": f"attachment; filename=CorpLens_Executive_Brief_{company['primary_domain']}.pdf"}
        )
    elif fmt == "txt":
        txt_content = report_generator.generate_text_summary_report(company)
        return Response(
            content=txt_content.encode("utf-8"),
            media_type="text/plain; charset=utf-8",
            headers={"Content-Disposition": f"attachment; filename=CorpLens_Executive_Brief_{company['primary_domain']}.txt"}
        )
    else:  # default json
        json_content = report_generator.generate_json_report(company)
        return Response(
            content=json_content.encode("utf-8"),
            media_type="application/json",
            headers={"Content-Disposition": f"attachment; filename=CorpLens_Intelligence_{company['primary_domain']}.json"}
        )

@router.get("/document/{company_id}/{doc_id}")
async def download_public_document(company_id: str, doc_id: str, db: Session = Depends(get_db)):
    repo = CompanyRepository(db)
    comp_obj = repo.get_by_id(company_id)
    
    if comp_obj:
        company = format_company_response(comp_obj)
    else:
        company = {
            "name": "Acme Global Group",
            "primary_domain": "acmeglobal.com",
            "risk_score": 28.5,
            "risk_tier": "Low"
        }

    domain = company.get("primary_domain", "target.com")

    doc_id_clean = doc_id.lower()
    if "soc2" in doc_id_clean or "soc" in doc_id_clean:
        filename = f"{domain}_SOC2_TypeII_Executive_Summary.pdf"
        pdf_bytes = report_generator.generate_pdf_document(
            title=f"SOC 2 Type II Compliance Audit Executive Report",
            company_data=company,
            doc_type="soc2"
        )
        return Response(
            content=pdf_bytes,
            media_type="application/pdf",
            headers={"Content-Disposition": f'attachment; filename="{filename}"'}
        )
    elif "whitepaper" in doc_id_clean or "security" in doc_id_clean:
        filename = f"{domain}_Security_Architecture_Whitepaper.pdf"
        pdf_bytes = report_generator.generate_pdf_document(
            title=f"Cybersecurity & Cloud Infrastructure Whitepaper 2025/2026",
            company_data=company,
            doc_type="whitepaper"
        )
        return Response(
            content=pdf_bytes,
            media_type="application/pdf",
            headers={"Content-Disposition": f'attachment; filename="{filename}"'}
        )
    else:
        filename = f"{domain}_Privacy_Policy_GDPR_CCPA.pdf"
        pdf_bytes = report_generator.generate_pdf_document(
            title=f"Global Privacy Policy & GDPR/CCPA Compliance Statement",
            company_data=company,
            doc_type="privacy"
        )
        return Response(
            content=pdf_bytes,
            media_type="application/pdf",
            headers={"Content-Disposition": f'attachment; filename="{filename}"'}
        )
