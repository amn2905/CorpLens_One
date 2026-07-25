# CorpLens AI v3.0 — Deployment & Administrator Guide

## Quick Start (Docker Compose)

### Prerequisites
- Docker Engine 24.0+
- Docker Compose v2.20+

### Steps
1. Navigate to the project root:
   ```bash
   cd "x:\CorpLens AI"
   ```
2. Launch the full enterprise stack:
   ```bash
   docker compose up -d
   ```
3. Access Platform Services:
   - **Frontend UI**: `http://localhost:5173`
   - **Backend API Docs**: `http://localhost:8000/docs`
   - **Neo4j Browser**: `http://localhost:7474` (Credentials: `neo4j` / `corplenspass`)
   - **PostgreSQL**: `localhost:5432` (Credentials: `postgres` / `postgrespassword`)

## Kubernetes Deployment
Manifests are available in `k8s/deployment.yaml`:
```bash
kubectl apply -f k8s/deployment.yaml
```
