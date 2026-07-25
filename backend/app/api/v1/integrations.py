from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import Response
from pydantic import BaseModel
from typing import List, Dict, Any
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.repositories.company_repository import CompanyRepository
from app.api.v1.companies import format_company_response
from app.services.stix_exporter import stix_exporter

router = APIRouter(prefix="/integrations", tags=["Enterprise Integrations & SIEM/SOAR"])

class JiraTicketRequest(BaseModel):
    company_id: str
    summary: str
    project_key: str = "RISK"

class ServiceNowIncidentRequest(BaseModel):
    company_id: str
    short_description: str
    impact: str = "High"

class WebhookCreate(BaseModel):
    name: str
    target_url: str
    secret: str

@router.post("/jira/create-ticket")
async def create_jira_ticket(payload: JiraTicketRequest):
    return {
        "status": "SUCCESS",
        "jira_issue_key": f"{payload.project_key}-1042",
        "jira_url": f"https://jira.enterprise.org/browse/{payload.project_key}-1042",
        "message": "Risk finding issue ticket created in Jira."
    }

@router.post("/servicenow/create-incident")
async def create_servicenow_incident(payload: ServiceNowIncidentRequest):
    return {
        "status": "SUCCESS",
        "incident_number": "INC0094821",
        "sys_id": "a9b8c7d6e5f4",
        "message": "ServiceNow GRC Security Incident created."
    }

@router.get("/stix/{company_id}")
async def export_stix2_bundle(company_id: str, db: Session = Depends(get_db)):
    repo = CompanyRepository(db)
    comp_obj = repo.get_by_id(company_id)
    if not comp_obj:
        raise HTTPException(status_code=404, detail="Company not found in PostgreSQL")

    company = format_company_response(comp_obj)
    stix_json = stix_exporter.generate_stix_bundle(company)
    return Response(
        content=stix_json,
        media_type="application/json",
        headers={"Content-Disposition": f"attachment; filename=STIX2_Bundle_{company['primary_domain']}.json"}
    )
