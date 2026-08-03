import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_root_endpoint():
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "OPERATIONAL"
    assert "CorpLens One" in data["platform"]

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

def test_list_companies():
    response = client.get("/api/v1/companies")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 1

def test_get_company_detail():
    response = client.get("/api/v1/companies/cmp-001")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == "cmp-001"
    assert "Acme Global" in data["name"]

def test_ai_copilot_chat():
    payload = {"query": "Compare Acme Global and Nexus Dynamics in a matrix", "session_id": "test-session-1"}
    response = client.post("/api/v1/ai/chat", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "intent" in data
    assert data["confidence_score"] > 0.5
    assert len(data["citations"]) >= 1

def test_cve_threat_intelligence():
    response = client.get("/api/v1/cve/search")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)

def test_cases_list():
    response = client.get("/api/v1/cases")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)

def test_admin_system_health():
    response = client.get("/api/v1/admin/health/readiness")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "READY"
