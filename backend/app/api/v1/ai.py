from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from app.services.ai_engine import ai_engine

router = APIRouter(prefix="/ai", tags=["AI Intelligence Copilot"])

class AiChatRequest(BaseModel):
    query: str
    company_id: Optional[str] = None
    session_id: Optional[str] = None

class AiChatResponse(BaseModel):
    answer: str
    reasoning_steps: List[str]
    citations: List[Dict[str, str]]
    confidence_score: float
    intent: str
    follow_up_questions: List[str]

@router.post("/chat", response_model=AiChatResponse)
async def ai_chat(request: AiChatRequest):
    session_id = request.session_id or "default"
    result = ai_engine.process_query(
        prompt=request.query,
        company_context=request.company_id,
        session_id=session_id
    )
    return AiChatResponse(
        answer=result["answer"],
        reasoning_steps=result["reasoning_steps"],
        citations=result["citations"],
        confidence_score=result["confidence_score"],
        intent=result["intent"],
        follow_up_questions=result["follow_up_questions"]
    )

@router.get("/templates")
async def get_prompt_templates():
    return [
        {"label": "Summarize risk profile", "query": "Summarize the risk profile for Acme Global Financial Group.", "intent": "RISK_EXPLAIN"},
        {"label": "Compare two companies", "query": "Compare Acme Global Financial and Nexus Dynamics Defense in a due diligence matrix.", "intent": "COMPARE"},
        {"label": "CVE threat analysis", "query": "Show all CVE vulnerabilities and critical threats across tracked entities.", "intent": "CVE_THREAT"},
        {"label": "Sanctions screening check", "query": "Run an OFAC and EU sanctions screening for Nexus Dynamics.", "intent": "SANCTIONS"},
        {"label": "Executive leadership map", "query": "Show executive relationships and leadership connections for tracked companies.", "intent": "EXECUTIVE"},
        {"label": "Supply chain intelligence", "query": "Build the supply chain dependency map for Acme Global Financial Group.", "intent": "SUPPLY_CHAIN"},
        {"label": "Generate due diligence report", "query": "Generate an executive M&A due diligence report for Acme Global Financial.", "intent": "REPORT_GEN"},
        {"label": "Procurement recommendation", "query": "Should we proceed with vendor onboarding for Nexus Dynamics Defense Solutions?", "intent": "RISK_EXPLAIN"},
        {"label": "Risk score explanation", "query": "Explain why Acme Global has 28.5 Low Risk and Nexus Dynamics has 68.4 High Risk.", "intent": "RISK_EXPLAIN"},
        {"label": "Threat intelligence update", "query": "What are the latest public CVE advisories affecting tracked organizations?", "intent": "CVE_THREAT"},
    ]
