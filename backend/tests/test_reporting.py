import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.services.stix_exporter import stix_exporter
from app.services.monitoring_engine import monitoring_engine

client = TestClient(app)

def test_admin_audit_trail():
    res = client.get("/api/v1/admin/audit-logs")
    assert res.status_code == 200
    logs = res.json()
    assert isinstance(logs, list)
    assert len(logs) >= 1
    assert "action" in logs[0]

def test_api_key_generation():
    res = client.post("/api/v1/admin/api-keys/generate", json={"key_name": "Production Key", "rate_limit": 5000})
    assert res.status_code == 200
    data = res.json()
    assert "api_key" in data
    assert data["api_key"].startswith("cl_live_pk_")

def test_health_probes():
    live_res = client.get("/api/v1/admin/health/liveness")
    ready_res = client.get("/api/v1/admin/health/readiness")
    assert live_res.status_code == 200
    assert ready_res.status_code == 200
    assert ready_res.json()["status"] == "READY"

def test_jira_integration_stub():
    res = client.post("/api/v1/integrations/jira/create-ticket", json={"company_id": "cmp-001", "summary": "OSINT Warning"})
    assert res.status_code == 200
    assert res.json()["status"] == "SUCCESS"
    assert "RISK-" in res.json()["jira_issue_key"]

def test_stix2_exporter():
    mock_comp = {"name": "Acme Corp", "primary_domain": "acme.com", "risk_score": 25.0}
    stix_json = stix_exporter.generate_stix_bundle(mock_comp)
    assert "bundle" in stix_json
    assert "identity" in stix_json
    assert "indicator" in stix_json
