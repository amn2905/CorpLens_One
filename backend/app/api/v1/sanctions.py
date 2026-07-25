from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from difflib import SequenceMatcher

router = APIRouter(prefix="/sanctions", tags=["Watchlist & Sanctions Screening"])

class ScreeningRequest(BaseModel):
    entity_name: str
    country: Optional[str] = None

class ScreeningMatch(BaseModel):
    id: str
    entity_name: str
    list_source: str
    match_score: float
    matched_record_id: str
    status: str
    notes: str
    category: str

class AdjudicateRequest(BaseModel):
    match_id: str
    new_status: str  # "Confirmed True Positive", "False Positive", "Under Review", "Cleared"
    comments: Optional[str] = None

SANCTIONED_DATABASE = [
    {
        "id": "snc-101",
        "entity_name": "Nexus Commercial Trading LLC",
        "list_source": "US OFAC SDN List (Sectoral Sanctions)",
        "matched_record_id": "OFAC-SDN-94821",
        "category": "Corporate Entity",
        "base_notes": "Designated under E.O. 14024 for operating in the defense & technology sector."
    },
    {
        "id": "snc-102",
        "entity_name": "Acme Industrial Defense Exports",
        "list_source": "EU Consolidated Sanctions List",
        "matched_record_id": "EU-SANCT-77412",
        "category": "Dual-Use Technology Supplier",
        "base_notes": "Subject to restrictive measures on exports of dual-use goods and technology."
    },
    {
        "id": "snc-103",
        "entity_name": "Vostok Cyber Cybernetic Solutions",
        "list_source": "UK HMT Sanctions List & UN Security Council",
        "matched_record_id": "UNSC-2024-998",
        "category": "Malicious Cyber Entity",
        "base_notes": "Designated for ransomware and critical infrastructure targeting."
    },
    {
        "id": "snc-104",
        "entity_name": "Global Maritime Logistics SARL",
        "list_source": "US OFAC Non-SDN Menu-Based Sanctions (NS-MBS)",
        "matched_record_id": "OFAC-MBS-33109",
        "category": "Shipping & Logistics",
        "base_notes": "Associated with sanctioned petroleum transshipment operations."
    }
]

# In-memory store for adjudication state overrides
ADJUDICATION_STORE = {}

def fuzzy_ratio(a: str, b: str) -> float:
    return SequenceMatcher(None, a.lower(), b.lower()).ratio()

@router.post("/screen", response_model=List[ScreeningMatch])
async def screen_entity(payload: ScreeningRequest):
    query = payload.entity_name.strip()
    if not query:
        return []

    matches = []
    query_tokens = set(query.lower().split())

    for item in SANCTIONED_DATABASE:
        item_tokens = set(item["entity_name"].lower().split())
        token_overlap = len(query_tokens.intersection(item_tokens)) > 0
        ratio = fuzzy_ratio(query, item["entity_name"])
        
        # Boost ratio if exact substring or token match
        if query.lower() in item["entity_name"].lower() or item["entity_name"].lower() in query.lower():
            ratio = max(ratio, 0.78)
        if token_overlap and ratio < 0.6:
            ratio = 0.65

        if ratio >= 0.45:
            current_status = ADJUDICATION_STORE.get(item["id"], "Under Review")
            matches.append(ScreeningMatch(
                id=item["id"],
                entity_name=item["entity_name"],
                list_source=item["list_source"],
                match_score=round(ratio, 2),
                matched_record_id=item["matched_record_id"],
                status=current_status,
                notes=f"Fuzzy name match ({int(ratio * 100)}% confidence) against designated {item['category']}. {item['base_notes']}",
                category=item["category"]
            ))

    matches.sort(key=lambda x: x.match_score, reverse=True)
    return matches

@router.post("/adjudicate")
async def adjudicate_match(payload: AdjudicateRequest):
    ADJUDICATION_STORE[payload.match_id] = payload.new_status
    return {
        "status": "success",
        "match_id": payload.match_id,
        "updated_status": payload.new_status,
        "message": f"Sanctions screening match {payload.match_id} status updated to {payload.new_status}."
    }
