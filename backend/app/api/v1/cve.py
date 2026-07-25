from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter(prefix="/cve", tags=["CVE & Vulnerability Intelligence"])

class CVEItem(BaseModel):
    id: str
    cve_id: str
    technology: str
    severity: str
    cvss_score: float
    summary: str
    published_date: str
    mitigation: Optional[str] = None
    references: Optional[List[str]] = None

CVE_DATABASE: List[CVEItem] = [
    CVEItem(
        id="cve-1",
        cve_id="CVE-2023-38606",
        technology="Nginx 1.24.0",
        severity="MEDIUM",
        cvss_score=5.3,
        summary="Nginx HTTP/2 Rapid Reset potential Denial of Service condition via stream cancellation flooding.",
        published_date="2023-10-10",
        mitigation="Upgrade to Nginx 1.25.3+ or disable keepalive_requests limits.",
        references=["https://nvd.nist.gov/vuln/detail/CVE-2023-38606"]
    ),
    CVEItem(
        id="cve-2",
        cve_id="CVE-2024-21626",
        technology="Containerd / Docker",
        severity="CRITICAL",
        cvss_score=9.8,
        summary="runc process.cwd file descriptor leak leading to container breakout and host system execution.",
        published_date="2024-01-31",
        mitigation="Upgrade runc to v1.1.12 or docker-ce 25.0.2.",
        references=["https://nvd.nist.gov/vuln/detail/CVE-2024-21626"]
    ),
    CVEItem(
        id="cve-3",
        cve_id="CVE-2023-5567",
        technology="WordPress 6.1.1",
        severity="HIGH",
        cvss_score=8.1,
        summary="Authenticated Stored Cross-Site Scripting via Gutenberg editor blocks in WordPress Core.",
        published_date="2023-11-14",
        mitigation="Update WordPress Core to 6.4.1 or higher.",
        references=["https://wordpress.org/news/2023/11/wordpress-6-4-1/"]
    ),
    CVEItem(
        id="cve-4",
        cve_id="CVE-2024-3094",
        technology="XZ Utils / OpenSSL",
        severity="CRITICAL",
        cvss_score=10.0,
        summary="Malicious code injection in XZ Utils versions 5.6.0 and 5.6.1 leading to SSH authentication bypass.",
        published_date="2024-03-29",
        mitigation="Downgrade XZ Utils to 5.4.x immediately.",
        references=["https://nvd.nist.gov/vuln/detail/CVE-2024-3094"]
    ),
    CVEItem(
        id="cve-5",
        cve_id="CVE-2023-44487",
        technology="Apache HTTP Server",
        severity="HIGH",
        cvss_score=7.5,
        summary="HTTP/2 Protocol Rapid Reset Request Cancellation DoS attack.",
        published_date="2023-10-10",
        mitigation="Set Protocols honor order or upgrade Apache to 2.4.58.",
        references=["https://httpd.apache.org/security/vulnerabilities_24.html"]
    )
]

@router.get("/search", response_model=List[CVEItem])
async def search_cve(
    query: Optional[str] = Query(None, description="Search by CVE ID, technology name, or keyword"),
    severity: Optional[str] = Query(None, description="Filter by severity: CRITICAL, HIGH, MEDIUM, LOW")
):
    results = CVE_DATABASE
    if query:
        q = query.lower()
        results = [
            item for item in results 
            if q in item.cve_id.lower() or q in item.technology.lower() or q in item.summary.lower()
        ]
    if severity:
        sev = severity.upper()
        results = [item for item in results if item.severity == sev]
    return results

@router.get("/lookup/{cve_id}", response_model=CVEItem)
async def lookup_cve(cve_id: str):
    cve_clean = cve_id.upper().strip()
    for item in CVE_DATABASE:
        if item.cve_id.upper() == cve_clean:
            return item
    raise HTTPException(status_code=404, detail=f"CVE record {cve_id} not found in NVD database index.")
