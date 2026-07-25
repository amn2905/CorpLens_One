import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.services.risk_engine import risk_engine_7pillar
from app.services.graph_service import graph_service
from app.services.timeline_service import timeline_service
from app.services.report_generator import report_generator

client = TestClient(app)

def test_7pillar_risk_engine():
    domain_data = {"ssl_valid": True, "hosting_provider": "Cloudflare Edge Network"}
    cves = [{"severity": "CRITICAL", "cvss_score": 9.8}]
    sanctions = []

    res = risk_engine_7pillar.calculate_7pillar_risk(domain_data, cves, sanctions)
    assert "pillars" in res
    assert len(res["pillars"]) == 7
    assert "infrastructure_score" in res["pillars"]
    assert "technology_score" in res["pillars"]
    assert "third_party_score" in res["pillars"]
    assert res["confidence_score"] > 0.8
    assert len(res["recommendations"]) >= 1

def test_graph_service_topology():
    graph = graph_service.get_relationship_graph()
    assert "nodes" in graph
    assert "edges" in graph
    assert len(graph["nodes"]) >= 5
    assert len(graph["edges"]) >= 5

def test_timeline_service():
    timeline = timeline_service.get_company_timeline("cmp-001")
    assert isinstance(timeline, list)
    assert len(timeline) >= 2
    assert "event_type" in timeline[0]

def test_analytics_api_endpoint():
    res = client.get("/api/v1/analytics/summary")
    assert res.status_code == 200
    data = res.json()
    assert "risk_trends" in data
    assert "industry_benchmarks" in data
    assert "tech_distribution" in data

def test_html_report_generation():
    mock_company = {
        "name": "Acme Global",
        "primary_domain": "acmeglobal.com",
        "risk_score": 28.5,
        "risk_tier": "Low",
        "tech_stack": [{"technology_name": "Nginx", "category": "Web Server", "detected_version": "1.24.0"}]
    }
    html = report_generator.generate_html_report(mock_company, "due_diligence")
    assert "CORPLENS AI" in html
    assert "Acme Global" in html
