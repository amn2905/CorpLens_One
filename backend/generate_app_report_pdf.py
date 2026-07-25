import os
import sys
import io

def build_pdf_report(output_filename: str):
    from reportlab.lib.pagesizes import letter
    from reportlab.platypus import (
        SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, PageBreak, KeepTogether
    )
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
    from reportlab.lib import colors

    doc = SimpleDocTemplate(
        output_filename,
        pagesize=letter,
        rightMargin=36,
        leftMargin=36,
        topMargin=36,
        bottomMargin=36
    )
    story = []
    styles = getSampleStyleSheet()

    # Custom Black & White Luxury Tech Styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=colors.HexColor('#000000'),
        spaceAfter=6
    )
    subtitle_style = ParagraphStyle(
        'DocSub',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=14,
        textColor=colors.HexColor('#555555')
    )
    section_heading = ParagraphStyle(
        'SecHead',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=colors.HexColor('#000000'),
        spaceBefore=12,
        spaceAfter=6
    )
    body_style = ParagraphStyle(
        'DocBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13.5,
        textColor=colors.HexColor('#222222'),
        spaceAfter=6
    )
    code_style = ParagraphStyle(
        'CodeStyle',
        parent=styles['Normal'],
        fontName='Courier',
        fontSize=8,
        leading=11,
        textColor=colors.HexColor('#111111'),
        backColor=colors.HexColor('#f4f4f5'),
        borderPadding=6,
        spaceAfter=6
    )

    # PAGE 1: TITLE & EXECUTIVE SUMMARY
    story.append(Paragraph("<b>CORPLENS AI — ENTERPRISE PLATFORM ARCHITECTURE REPORT</b>", title_style))
    story.append(Paragraph("Comprehensive Technical & Functional Blueprint | Lawful OSINT & Third-Party Risk Platform", subtitle_style))
    story.append(Paragraph("Date: July 2026 &nbsp;|&nbsp; Version: 2.4.0-Enterprise &nbsp;|&nbsp; Classification: PUBLIC TECHNICAL BRIEFING", subtitle_style))
    story.append(Spacer(1, 8))
    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#000000'), spaceAfter=12))

    story.append(Paragraph("<b>1. EXECUTIVE SUMMARY & PLATFORM MISSION</b>", section_heading))
    story.append(Paragraph(
        "<b>CorpLens AI</b> is an enterprise-grade Corporate Open-Source Intelligence (OSINT) and Third-Party Vendor Risk Management (TPRM) platform. "
        "It provides real-time, lawful visibility into corporate digital footprints, vulnerability exposure (CVE correlation), global sanctions compliance (OFAC/EU/UN/UK watchlists), "
        "and multi-entity relationship mapping using graph topology database engines.",
        body_style
    ))
    story.append(Paragraph(
        "Built on a modern <b>Black & White Glassmorphism design system</b>, CorpLens AI empowers cybersecurity analysts, compliance officers, and M&A due diligence teams "
        "to continuously monitor target organizations without invasive penetration testing.",
        body_style
    ))

    # Core Capabilities Table
    caps_data = [
        ["Core Feature Module", "Description & OSINT Methodology", "Business Impact"],
        ["Digital Footprint Resolution", "DNS telemetry, SSL Certificate Transparency logs, IP/ASN mapping", "Complete external attack surface visibility"],
        ["Tech Stack Fingerprinting", "HTTP Header inspection, Wappalyzer signatures, framework versioning", "Detects shadow IT & outdated web stacks"],
        ["CVE Correlation Engine", "Automated version lookup against NIST NVD & MITRE CVE feeds", "Identifies actionable critical zero-day risks"],
        ["Sanctions Screening Engine", "Fuzzy token string matching (SequenceMatcher) against OFAC SDN, EU, UN", "Prevents legal compliance & trade violations"],
        ["Neo4j Graph Explorer", "Multi-entity relationship topology mapping (Companies, CVEs, Cloud)", "Visualizes hidden 4th-party supply chain links"],
        ["Report Generation & Attestations", "ReportLab PDF engine, CSV/JSON export, SOC2/Whitepaper preview modal", "Instant executive & board-level reporting"]
    ]
    t_caps = Table(caps_data, colWidths=[130, 240, 150])
    t_caps.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#000000')),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTSIZE', (0,0), (-1,0), 8.5),
        ('BOTTOMPADDING', (0,0), (-1,0), 5),
        ('BACKGROUND', (0,1), (-1,-1), colors.HexColor('#f8f9fa')),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#cccccc')),
        ('FONTNAME', (0,1), (-1,-1), 'Helvetica'),
        ('FONTSIZE', (0,1), (-1,-1), 8),
    ]))
    story.append(t_caps)
    story.append(Spacer(1, 14))

    # PAGE 2: FULL SYSTEM ARCHITECTURE & COMPONENTS
    story.append(Paragraph("<b>2. TECHNICAL SYSTEM ARCHITECTURE & COMPONENT STACK</b>", section_heading))
    story.append(Paragraph(
        "The application is structured into decoupled Frontend, Backend API, Database Storage, and Container Orchestration layers:",
        body_style
    ))

    stack_data = [
        ["Layer", "Technology Used", "Role & Responsibilities"],
        ["Frontend UI", "React 18 + TypeScript + Vite + Tailwind CSS", "Renders Black & White Glassy UI, dynamic charts, graph canvas, modals"],
        ["Graph Canvas", "Cytoscape.js", "Interactive topology rendering with layout algorithms (Breadthfirst, Cose, Circle)"],
        ["Backend API", "FastAPI (Python 3.12/3.14)", "REST API endpoints, fuzzy string matching, CVE lookup, PDF generator"],
        ["PDF Engine", "ReportLab 4.x", "Generates genuine binary PDF documents (%PDF-1.4) with tables & formatting"],
        ["Database Store", "PostgreSQL 15 + Neo4j 5 + Redis 7", "Relational entities, graph relationship topology, and rate-limiting cache"],
        ["Orchestration", "Docker Compose", "Multi-container orchestration with live host volume mounts for instant sync"]
    ]
    t_stack = Table(stack_data, colWidths=[90, 180, 250])
    t_stack.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#111111')),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTSIZE', (0,0), (-1,0), 8.5),
        ('BOTTOMPADDING', (0,0), (-1,0), 5),
        ('BACKGROUND', (0,1), (-1,-1), colors.HexColor('#f8f9fa')),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#cccccc')),
        ('FONTNAME', (0,1), (-1,-1), 'Helvetica'),
        ('FONTSIZE', (0,1), (-1,-1), 8),
    ]))
    story.append(t_stack)
    story.append(Spacer(1, 14))

    # PAGE 3: DETAILED PAGE BY PAGE COMPONENT BREAKDOWN
    story.append(Paragraph("<b>3. FRONTEND UI PAGES & COMPONENT BREAKDOWN</b>", section_heading))
    
    pages_detail = [
        ("Dashboard (Dashboard.tsx)", "Central executive hub featuring portfolio risk averages, high/critical flags filter, quick report download buttons, and OSINT target list with inline risk pills."),
        ("Company Workspace (CompanyWorkspace.tsx)", "Deep-dive investigation workspace with 6 tabs: Digital Footprint & DNS, Tech Stack, CVE Vulnerabilities (with severity pills & NIST links), Public Documents (with PDF reader modal), News & Threat Timeline, and Reputation & ESG."),
        ("Sanctions Screening (SanctionsScreening.tsx)", "Compliance watchlist engine running fuzzy string token matching against OFAC SDN, EU, and UN databases. Includes analyst adjudication workflow buttons (Confirm Match, Mark False Positive)."),
        ("Graph Explorer (GraphPage.tsx & GraphExplorer.tsx)", "Interactive Neo4j graph topology explorer. Features Target Case selector dropdown, layout switcher (Breadthfirst, Physics Force Cose, Concentric, Circle), and node relationship visualizer."),
        ("Analytics Dashboard (AnalyticsDashboard.tsx)", "High-level risk analytics with monochrome risk score distribution charts, top technology vulnerability breakdown, and compliance posture indicators."),
        ("Global Navbar & Sidebar (Navbar.tsx & Sidebar.tsx)", "Features custom CorpLens SVG logo, command palette quick-search (Ctrl+K), real-time notification drawer popover, and responsive navigation links.")
    ]

    for p_title, p_desc in pages_detail:
        story.append(Paragraph(f"<b>• {p_title}</b>", ParagraphStyle('BulletHead', parent=body_style, fontName='Helvetica-Bold')))
        story.append(Paragraph(p_desc, ParagraphStyle('BulletBody', parent=body_style, leftIndent=12)))
        story.append(Spacer(1, 4))

    story.append(Spacer(1, 10))

    # PAGE 4: BACKEND API ROUTE DIRECTORY
    story.append(Paragraph("<b>4. BACKEND API ROUTE REGISTRY</b>", section_heading))
    
    routes_data = [
        ["Method", "Endpoint Route", "Functionality"],
        ["GET", "/api/v1/companies", "Returns list of tracked target corporate entities"],
        ["POST", "/api/v1/companies/scan", "Triggers new automated OSINT scan for domain & company"],
        ["GET", "/api/v1/cve/search", "Searches NIST NVD CVE database by query & severity pill"],
        ["POST", "/api/v1/sanctions/screen", "Executes fuzzy string matching against OFAC/EU watchlists"],
        ["POST", "/api/v1/sanctions/adjudicate", "Adjudicates sanction match (Under Review -> Confirmed/False Positive)"],
        ["GET", "/api/v1/graph/topology", "Returns Neo4j node/edge topology filtered by target case ID"],
        ["GET", "/api/v1/reports/document/{id}/{doc}", "Generates ReportLab binary PDF for SOC2, Whitepaper, or Privacy Policy"],
        ["GET", "/api/v1/reports/download/{company_id}", "Downloads full corporate brief in PDF, CSV, or JSON format"]
    ]
    t_routes = Table(routes_data, colWidths=[55, 205, 260])
    t_routes.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#000000')),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTSIZE', (0,0), (-1,0), 8),
        ('BOTTOMPADDING', (0,0), (-1,0), 5),
        ('BACKGROUND', (0,1), (-1,-1), colors.HexColor('#f8f9fa')),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#cccccc')),
        ('FONTNAME', (0,1), (-1,-1), 'Helvetica'),
        ('FONTSIZE', (0,1), (-1,-1), 7.5),
    ]))
    story.append(t_routes)

    story.append(Spacer(1, 18))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#888888'), spaceAfter=8))
    story.append(Paragraph("<b>Report Authorization:</b> Generated automatically by CorpLens AI Platform Architecture Engine.", subtitle_style))

    doc.build(story)
    print(f"Successfully generated PDF report at: {output_filename}")

if __name__ == "__main__":
    out = "CorpLens_AI_Full_Platform_Architecture_Report.pdf"
    if len(sys.argv) > 1:
        out = sys.argv[1]
    build_pdf_report(out)
