import uuid
from datetime import datetime, timezone
from sqlalchemy.orm import Session
from app.core.database import SessionLocal, engine, Base
from app.models.domain_models import (
    CompanyModel, DomainModel, TechStackModel, CVEFindingModel,
    CaseModel, VendorModel, MonitoringAlertModel, ExecutiveProfileModel, AuditLogModel
)

def seed_initial_data(db: Session = None):
    """Seed initial enterprise companies, cases, vendors, and audit log records into PostgreSQL."""
    close_session = False
    if db is None:
        db = SessionLocal()
        close_session = True

    try:
        # Check if DB is already seeded
        existing_company = db.query(CompanyModel).first()
        if existing_company:
            print("[Database Seed] PostgreSQL database already populated.")
            return

        print("[Database Seed] Populating PostgreSQL with initial enterprise target datasets...")

        # 1. Company cmp-001: Acme Global Financial Group
        cmp1 = CompanyModel(
            id="cmp-001",
            tenant_id="tenant-enterprise-001",
            name="Acme Global Financial Group",
            primary_domain="acmeglobal.com",
            industry="Financial Services & Banking",
            country="United States",
            risk_score=28.5,
            risk_tier="Low",
            is_monitored=True,
            last_scanned=datetime(2026, 7, 20, 10, 30, tzinfo=timezone.utc)
        )
        db.add(cmp1)

        dom1_1 = DomainModel(
            id="dom-101",
            company_id="cmp-001",
            domain_name="acmeglobal.com",
            ip_address="104.21.48.192",
            asn="AS13335 (Cloudflare)",
            hosting_provider="Cloudflare Edge Network",
            ssl_issuer="DigiCert TLS RSA SHA256 CA",
            ssl_valid=True,
            dns_records={"A": ["104.21.48.192"], "MX": ["mail.acmeglobal.com"], "TXT": ["v=spf1 include:_spf.google.com ~all"]}
        )
        dom1_2 = DomainModel(
            id="dom-102",
            company_id="cmp-001",
            domain_name="portal.acmeglobal.com",
            ip_address="52.84.18.91",
            asn="AS16509 (Amazon AWS)",
            hosting_provider="Amazon Web Services",
            ssl_issuer="Amazon RSA2048 M01",
            ssl_valid=True,
            dns_records={"A": ["52.84.18.91"]}
        )
        db.add_all([dom1_1, dom1_2])

        tech1_1 = TechStackModel(id="t-1", company_id="cmp-001", technology_name="Nginx", category="Web Server", detected_version="1.24.0", confidence=0.98)
        tech1_2 = TechStackModel(id="t-2", company_id="cmp-001", technology_name="React", category="JavaScript Library", detected_version="18.2.0", confidence=0.95)
        tech1_3 = TechStackModel(id="t-3", company_id="cmp-001", technology_name="Next.js", category="Framework", detected_version="14.1.0", confidence=0.92)
        tech1_4 = TechStackModel(id="t-4", company_id="cmp-001", technology_name="Cloudflare WAF", category="WAF", detected_version="Enterprise", confidence=0.99)
        tech1_5 = TechStackModel(id="t-5", company_id="cmp-001", technology_name="Google Workspace", category="Email Provider", detected_version="Enterprise", confidence=0.99)
        db.add_all([tech1_1, tech1_2, tech1_3, tech1_4, tech1_5])

        cve1_1 = CVEFindingModel(
            id="cve-1",
            company_id="cmp-001",
            cve_id="CVE-2023-38606",
            technology="Nginx 1.24.0",
            severity="MEDIUM",
            cvss_score=5.3,
            summary="Nginx HTTP/2 Rapid Reset potential Denial of Service condition.",
            published_date="2023-10-10"
        )
        db.add(cve1_1)

        # 2. Company cmp-002: Nexus Dynamics Defense Solutions
        cmp2 = CompanyModel(
            id="cmp-002",
            tenant_id="tenant-enterprise-001",
            name="Nexus Dynamics Defense Solutions",
            primary_domain="nexusdynamics.io",
            industry="Defense & Cybersecurity SaaS",
            country="United Kingdom",
            risk_score=68.4,
            risk_tier="High",
            is_monitored=True,
            last_scanned=datetime(2026, 7, 21, 14, 15, tzinfo=timezone.utc)
        )
        db.add(cmp2)

        dom2_1 = DomainModel(
            id="dom-201",
            company_id="cmp-002",
            domain_name="nexusdynamics.io",
            ip_address="172.67.180.44",
            asn="AS13335 (Cloudflare)",
            hosting_provider="Cloudflare Anycast",
            ssl_issuer="Let's Encrypt Authority X3",
            ssl_valid=True,
            dns_records={"A": ["172.67.180.44"]}
        )
        db.add(dom2_1)

        tech2_1 = TechStackModel(id="t-10", company_id="cmp-002", technology_name="Apache HTTP Server", category="Web Server", detected_version="2.4.41", confidence=0.95)
        tech2_2 = TechStackModel(id="t-11", company_id="cmp-002", technology_name="WordPress", category="CMS", detected_version="6.1.1", confidence=0.90)
        tech2_3 = TechStackModel(id="t-12", company_id="cmp-002", technology_name="PHP", category="Programming Language", detected_version="7.4.3", confidence=0.95)
        db.add_all([tech2_1, tech2_2, tech2_3])

        cve2_1 = CVEFindingModel(
            id="cve-10",
            company_id="cmp-002",
            cve_id="CVE-2024-21626",
            technology="Containerd / Docker",
            severity="CRITICAL",
            cvss_score=9.8,
            summary="Process cwd file descriptor leak leading to container breakout and remote execution.",
            published_date="2024-01-31"
        )
        cve2_2 = CVEFindingModel(
            id="cve-11",
            company_id="cmp-002",
            cve_id="CVE-2023-5567",
            technology="WordPress 6.1.1",
            severity="HIGH",
            cvss_score=8.1,
            summary="Authenticated Stored Cross-Site Scripting via Gutenberg editor blocks.",
            published_date="2023-11-14"
        )
        db.add_all([cve2_1, cve2_2])

        # 3. Investigation Cases
        case1 = CaseModel(
            id="case-001",
            tenant_id="tenant-enterprise-001",
            title="M&A Due Diligence — Acme Global Financial Group",
            company_name="Acme Global Financial Group",
            company_domain="acmeglobal.com",
            status="In Progress",
            priority="High",
            assigned_analyst="Sarah Jenkins",
            scope="Full OSINT Assessment + Sanctions Screening",
            risk_score=28.5,
            tasks=[
                {"id": "task-1", "title": "Complete digital footprint mapping", "completed": True},
                {"id": "task-2", "title": "Run sanctions screening across OFAC/EU/UN", "completed": True},
                {"id": "task-3", "title": "CVE exposure correlation report", "completed": True},
                {"id": "task-4", "title": "Request SOC2 documentation from vendor", "completed": False},
                {"id": "task-5", "title": "Prepare board-level risk briefing", "completed": False}
            ],
            notes=[
                {"id": "note-1", "author": "Sarah Jenkins", "content": "Initial OSINT scan completed. No sanctions matches found.", "timestamp": "2026-07-16T10:00:00Z"},
                {"id": "note-2", "author": "Risk Team", "content": "CVE-2023-38606 (Nginx) marked as mitigated at Cloudflare WAF layer.", "timestamp": "2026-07-18T14:00:00Z"}
            ],
            timeline=[
                {"event": "Case opened", "timestamp": "2026-07-15T09:00:00Z", "type": "system"},
                {"event": "OSINT scan triggered", "timestamp": "2026-07-15T09:15:00Z", "type": "scan"},
                {"event": "Sanctions screening — Clear (0 matches)", "timestamp": "2026-07-16T11:00:00Z", "type": "compliance"}
            ]
        )

        case2 = CaseModel(
            id="case-002",
            tenant_id="tenant-enterprise-001",
            title="Vendor Risk Assessment — Nexus Dynamics Defense Solutions",
            company_name="Nexus Dynamics Defense Solutions",
            company_domain="nexusdynamics.io",
            status="Awaiting Approval",
            priority="Critical",
            assigned_analyst="Michael Chen",
            scope="Full Risk Assessment + OFAC Adjudication",
            risk_score=68.4,
            tasks=[
                {"id": "task-6", "title": "Document OFAC fuzzy match for legal review", "completed": True},
                {"id": "task-7", "title": "Escalate CVE-2024-21626 to Nexus Dynamics security team", "completed": True},
                {"id": "task-8", "title": "Obtain written CVE remediation confirmation", "completed": False}
            ],
            notes=[
                {"id": "note-3", "author": "Michael Chen", "content": "CRITICAL: CVE-2024-21626 container breakout vulnerability detected. Vendor notified.", "timestamp": "2026-07-19T09:00:00Z"}
            ],
            timeline=[
                {"event": "Case opened — HIGH PRIORITY", "timestamp": "2026-07-18T11:00:00Z", "type": "system"},
                {"event": "CRITICAL CVE-2024-21626 detected", "timestamp": "2026-07-18T14:00:00Z", "type": "threat"}
            ]
        )
        db.add_all([case1, case2])

        # 4. Audit Log Entry
        audit1 = AuditLogModel(
            id="aud-101",
            timestamp="2026-07-22 11:45:00",
            user="analyst@corplens.ai",
            action="OSINT_SCAN_EXECUTE",
            resource="nexusdynamics.io",
            result="SUCCESS",
            ip="192.168.1.45"
        )
        db.add(audit1)

        db.commit()
        print("[Database Seed] PostgreSQL successfully seeded with enterprise datasets!")

    except Exception as e:
        db.rollback()
        print(f"[Database Seed Error] Failed to seed PostgreSQL: {e}")
    finally:
        if close_session:
            db.close()

if __name__ == "__main__":
    seed_initial_data()
