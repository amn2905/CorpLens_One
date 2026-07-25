from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime, timezone
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.domain_models import CaseModel

router = APIRouter(prefix="/cases", tags=["Investigation Case Management"])

class CaseNote(BaseModel):
    author: str
    content: str

class CaseTask(BaseModel):
    title: str
    completed: bool = False

class CaseCreateRequest(BaseModel):
    title: str
    company_id: str
    company_name: str
    priority: str = "Medium"
    assigned_analyst: str = "Sarah Jenkins"
    scope: str = "Full OSINT Assessment"

MOCK_CASES = [
    {
        "id": "case-001",
        "title": "M&A Due Diligence — Acme Global Financial Group",
        "company_id": "cmp-001",
        "company_name": "Acme Global Financial Group",
        "status": "In Progress",
        "priority": "High",
        "assigned_analyst": "Sarah Jenkins",
        "scope": "Full OSINT Assessment + Sanctions Screening",
        "created_at": "2026-07-15T09:00:00Z",
        "updated_at": "2026-07-22T10:00:00Z",
        "risk_score": 28.5,
        "risk_tier": "Low",
        "evidence_count": 5,
        "notes": [
            {"id": "note-1", "author": "Sarah Jenkins", "content": "Initial OSINT scan completed. No sanctions matches found.", "timestamp": "2026-07-16T10:00:00Z"}
        ],
        "tasks": [
            {"id": "task-1", "title": "Complete digital footprint mapping", "completed": True}
        ],
        "timeline": [
            {"event": "Case opened", "timestamp": "2026-07-15T09:00:00Z", "type": "system"}
        ],
        "ai_summary": "Acme Global Financial Group presents a Low Risk posture (28.5/100)."
    },
    {
        "id": "case-002",
        "title": "Vendor Risk Assessment — Nexus Dynamics Defense Solutions",
        "company_id": "cmp-002",
        "company_name": "Nexus Dynamics Defense Solutions",
        "status": "Awaiting Approval",
        "priority": "Critical",
        "assigned_analyst": "Michael Chen",
        "scope": "Full Risk Assessment + OFAC Adjudication",
        "created_at": "2026-07-18T11:00:00Z",
        "updated_at": "2026-07-22T09:30:00Z",
        "risk_score": 68.4,
        "risk_tier": "High",
        "evidence_count": 8,
        "notes": [],
        "tasks": [],
        "timeline": [],
        "ai_summary": "Nexus Dynamics presents a HIGH Risk posture (68.4/100)."
    }
]

def format_case_response(case: CaseModel) -> dict:
    return {
        "id": case.id,
        "title": case.title,
        "company_id": case.id.replace("case-", "cmp-"),
        "company_name": case.company_name,
        "status": case.status,
        "priority": case.priority,
        "assigned_analyst": case.assigned_analyst,
        "scope": case.scope,
        "created_at": case.created_at.isoformat() if case.created_at else datetime.now(timezone.utc).isoformat(),
        "updated_at": datetime.now(timezone.utc).isoformat(),
        "risk_score": case.risk_score,
        "risk_tier": "Low" if case.risk_score < 40 else "High",
        "evidence_count": len(case.notes or []) + len(case.tasks or []),
        "notes": case.notes or [],
        "tasks": case.tasks or [],
        "timeline": case.timeline or [],
        "ai_summary": f"Investigation case for {case.company_name} managed under PostgreSQL persistence layer. Status: {case.status}."
    }

@router.get("/")
async def list_cases(db: Session = Depends(get_db)):
    if db:
        try:
            cases = db.query(CaseModel).all()
            if cases:
                return [format_case_response(c) for c in cases]
        except Exception:
            pass
    return MOCK_CASES

@router.get("/{case_id}")
async def get_case(case_id: str, db: Session = Depends(get_db)):
    if db:
        try:
            case = db.query(CaseModel).filter(CaseModel.id == case_id).first()
            if case:
                return format_case_response(case)
        except Exception:
            pass
    for c in MOCK_CASES:
        if c["id"] == case_id:
            return c
    raise HTTPException(status_code=404, detail="Case not found")

@router.post("/")
async def create_case(req: CaseCreateRequest, db: Session = Depends(get_db)):
    new_id = f"case-{len(MOCK_CASES) + 1:03d}"
    if db:
        try:
            count = db.query(CaseModel).count()
            new_id = f"case-{count + 1:03d}"
            new_case = CaseModel(
                id=new_id,
                tenant_id="tenant-enterprise-001",
                title=req.title,
                company_name=req.company_name,
                company_domain="acmeglobal.com",
                status="Open",
                priority=req.priority,
                assigned_analyst=req.assigned_analyst,
                scope=req.scope,
                risk_score=0.0,
                tasks=[{"id": "task-auto-1", "title": "Complete initial OSINT scan", "completed": False}],
                notes=[],
                timeline=[{"event": f"Case opened by {req.assigned_analyst}", "timestamp": datetime.now(timezone.utc).isoformat(), "type": "system"}]
            )
            db.add(new_case)
            db.commit()
            db.refresh(new_case)
            return format_case_response(new_case)
        except Exception:
            pass

    new_c = {
        "id": new_id,
        "title": req.title,
        "company_id": req.company_id,
        "company_name": req.company_name,
        "status": "Open",
        "priority": req.priority,
        "assigned_analyst": req.assigned_analyst,
        "scope": req.scope,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "updated_at": datetime.now(timezone.utc).isoformat(),
        "risk_score": 0.0,
        "risk_tier": "Pending",
        "evidence_count": 0,
        "notes": [],
        "tasks": [],
        "timeline": [],
        "ai_summary": "Case created."
    }
    MOCK_CASES.append(new_c)
    return new_c

@router.patch("/{case_id}/status")
async def update_case_status(case_id: str, status: str, db: Session = Depends(get_db)):
    if db:
        try:
            case = db.query(CaseModel).filter(CaseModel.id == case_id).first()
            if case:
                case.status = status
                db.commit()
                return {"status": "updated", "new_status": status}
        except Exception:
            pass
    for c in MOCK_CASES:
        if c["id"] == case_id:
            c["status"] = status
            return {"status": "updated", "new_status": status}
    raise HTTPException(status_code=404, detail="Case not found")

@router.post("/{case_id}/notes")
async def add_note(case_id: str, note: CaseNote, db: Session = Depends(get_db)):
    if db:
        try:
            case = db.query(CaseModel).filter(CaseModel.id == case_id).first()
            if case:
                existing_notes = list(case.notes or [])
                new_note = {"id": f"note-{len(existing_notes) + 1}", "author": note.author, "content": note.content, "timestamp": datetime.now(timezone.utc).isoformat()}
                existing_notes.append(new_note)
                case.notes = existing_notes
                db.commit()
                return new_note
        except Exception:
            pass
    for c in MOCK_CASES:
        if c["id"] == case_id:
            new_n = {"id": f"note-{len(c['notes']) + 1}", "author": note.author, "content": note.content, "timestamp": datetime.now(timezone.utc).isoformat()}
            c["notes"].append(new_n)
            return new_n
    raise HTTPException(status_code=404, detail="Case not found")
