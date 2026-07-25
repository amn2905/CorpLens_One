from typing import List, Dict, Any

class TimelineService:
    """
    Aggregates historical public events (Cert disclosures, DNS changes, CVE findings, News).
    """

    def get_company_timeline(self, company_id: str) -> List[Dict[str, Any]]:
        return [
            {
                "id": "evt-101",
                "date": "2026-06-15",
                "event_type": "News & Press",
                "title": "Corporate Series C $50M Expansion Announced",
                "severity": "LOW",
                "description": "Public press release announcing European regulatory compliance expansion."
            },
            {
                "id": "evt-102",
                "date": "2026-04-10",
                "event_type": "SSL/TLS Certificate Renewal",
                "title": "DigiCert TLS RSA CA Certificate Issued",
                "severity": "INFO",
                "description": "Public CT log entry (RFC 6962) confirmed new valid TLS certificate."
            },
            {
                "id": "evt-103",
                "date": "2024-01-31",
                "event_type": "Vulnerability Disclosure",
                "title": "NVD Disclosed CVE-2024-21626 (Critical)",
                "severity": "HIGH",
                "description": "Containerd process cwd file descriptor leak published on NIST NVD catalog."
            },
            {
                "id": "evt-104",
                "date": "2023-10-10",
                "event_type": "Vulnerability Disclosure",
                "title": "CVE-2023-38606 HTTP/2 Rapid Reset Correlated",
                "severity": "MEDIUM",
                "description": "Correlated against public Nginx 1.24.0 web server header."
            }
        ]

timeline_service = TimelineService()
