from fastapi import APIRouter, Query, Depends
from typing import Dict, Any, List, Optional
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.repositories.company_repository import CompanyRepository

router = APIRouter(prefix="/graph", tags=["Graph Intelligence Engine"])

@router.get("/topology", response_model=Dict[str, Any])
async def get_graph_topology(company_id: Optional[str] = Query(None, description="Filter topology by target case company ID"), db: Session = Depends(get_db)):
    """
    Returns dynamic graph node and edge dataset for Cytoscape.js interactive visualization.
    Nodes: Target Companies, Domains, Technologies, CVE Vulnerabilities, Cloud Suppliers, Sanctions.
    """
    repo = CompanyRepository(db)
    companies = repo.list_all()

    all_nodes = [
        {"data": {"id": "cmp-001", "label": "Acme Global Financial Group", "type": "Company", "risk": "Low"}},
        {"data": {"id": "dom-101", "label": "acmeglobal.com", "type": "Domain"}},
        {"data": {"id": "tech-nginx", "label": "Nginx 1.24.0", "type": "Technology"}},
        {"data": {"id": "tech-react", "label": "React 18.2.0", "type": "Technology"}},
        {"data": {"id": "cve-38606", "label": "CVE-2023-38606 (Medium)", "type": "CVE"}},
        {"data": {"id": "cloud-cf", "label": "Cloudflare Global Edge", "type": "CloudProvider"}},

        {"data": {"id": "cmp-002", "label": "Nexus Dynamics Defense", "type": "Company", "risk": "High"}},
        {"data": {"id": "dom-201", "label": "nexusdynamics.io", "type": "Domain"}},
        {"data": {"id": "tech-apache", "label": "Apache HTTP 2.4.41", "type": "Technology"}},
        {"data": {"id": "tech-wp", "label": "WordPress 6.1.1", "type": "Technology"}},
        {"data": {"id": "cve-21626", "label": "CVE-2024-21626 (Critical)", "type": "CVE"}},
        {"data": {"id": "cve-5567", "label": "CVE-2023-5567 (High)", "type": "CVE"}},
        {"data": {"id": "snc-1", "label": "OFAC SDN Match (84%)", "type": "Sanctions"}},
        {"data": {"id": "cloud-aws", "label": "Amazon Web Services (AWS)", "type": "CloudProvider"}}
    ]

    all_edges = [
        {"data": {"source": "cmp-001", "target": "dom-101", "label": "OWNS_DOMAIN"}},
        {"data": {"source": "dom-101", "target": "tech-nginx", "label": "RUNS_SOFTWARE"}},
        {"data": {"source": "dom-101", "target": "tech-react", "label": "USES_LIBRARY"}},
        {"data": {"source": "tech-nginx", "target": "cve-38606", "label": "EXPOSED_TO"}},
        {"data": {"source": "dom-101", "target": "cloud-cf", "label": "HOSTED_ON"}},

        {"data": {"source": "cmp-002", "target": "dom-201", "label": "OWNS_DOMAIN"}},
        {"data": {"source": "dom-201", "target": "tech-apache", "label": "RUNS_SOFTWARE"}},
        {"data": {"source": "dom-201", "target": "tech-wp", "label": "USES_CMS"}},
        {"data": {"source": "tech-wp", "target": "cve-21626", "label": "EXPOSED_TO"}},
        {"data": {"source": "tech-wp", "target": "cve-5567", "label": "EXPOSED_TO"}},
        {"data": {"source": "cmp-002", "target": "snc-1", "label": "SANCTION_MATCH"}},
        {"data": {"source": "dom-201", "target": "cloud-aws", "label": "HOSTED_ON"}},

        # Fourth-party shared dependency link
        {"data": {"source": "cmp-001", "target": "cloud-aws", "label": "DEPENDS_ON_SUPPLIER"}}
    ]

    for comp in companies:
        if comp.id not in ["cmp-001", "cmp-002"]:
            all_nodes.append({"data": {"id": comp.id, "label": comp.name, "type": "Company", "risk": comp.risk_tier}})
            for dom in comp.domains:
                all_nodes.append({"data": {"id": dom.id, "label": dom.domain_name, "type": "Domain"}})
                all_edges.append({"data": {"source": comp.id, "target": dom.id, "label": "OWNS_DOMAIN"}})

    if company_id:
        target_nodes = set([company_id])
        for edge in all_edges:
            if edge["data"]["source"] == company_id:
                target_nodes.add(edge["data"]["target"])
            elif edge["data"]["target"] == company_id:
                target_nodes.add(edge["data"]["source"])
        
        filtered_nodes = [n for n in all_nodes if n["data"]["id"] in target_nodes]
        filtered_edges = [e for e in all_edges if e["data"]["source"] in target_nodes and e["data"]["target"] in target_nodes]
        return {"nodes": filtered_nodes, "edges": filtered_edges}

    return {"nodes": all_nodes, "edges": all_edges}
