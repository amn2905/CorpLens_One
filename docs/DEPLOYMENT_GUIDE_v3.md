# 🚀 CorpLens AI — Enterprise Deployment & Operations Guide

> **Version**: 3.1 Enterprise Edition  
> **Target Environments**: Docker Compose (Local/Staging) & Kubernetes 1.28+ (Production)  

---

## 1. System Requirements

### Hardware Requirements
- **CPU**: Minimum 4 vCPUs (8 vCPUs recommended for production)
- **RAM**: Minimum 8 GB RAM (16 GB recommended for Neo4j + PostgreSQL)
- **Disk Storage**: 50 GB SSD storage minimum

### Software Prerequisites
- **Docker Engine**: `v24.0.0` or higher
- **Docker Compose**: `v2.20.0` or higher
- **Kubernetes / kubectl**: `v1.28+` (for K8s cluster deployment)

---

## 2. Docker Compose Deployment (Staging / On-Premise)

The primary orchestration configuration is defined in `docker-compose.yml` at the repository root.

### 2.1 Launching the Stack
Run the following command in the repository root:

```bash
docker compose up -d
```

### 2.2 Container Topology Matrix

| Container Name | Internal Port | Mapped Host Port | Service Description |
|:---|:---|:---|:---|
| `corplens-frontend` | `5173` | `5173` | React 18 / Vite single page application |
| `corplens-backend` | `8000` | `8000` | FastAPI Python API server & background tasks |
| `corplens-postgres` | `5432` | `5432` | PostgreSQL 16 primary RDBMS |
| `corplens-neo4j` | `7474`, `7687` | `7474`, `7687` | Neo4j 5.18 graph database server |
| `corplens-redis` | `6379` | `6379` | Redis 7 caching and event queue |

### 2.3 Environment Configuration (`.env`)
Create a `.env` file in the root directory prior to production deployment:

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_secure_postgres_password_here
POSTGRES_DB=corplens_db
POSTGRES_HOST=postgres
POSTGRES_PORT=5432

NEO4J_AUTH=neo4j/your_secure_neo4j_password_here

REDIS_HOST=redis
REDIS_PORT=6379

JWT_SECRET=your_super_secret_jwt_key_32_bytes_min
GEMINI_API_KEY=your_google_gemini_api_key
OPENAI_API_KEY=your_openai_api_key
```

---

## 3. Kubernetes Production Deployment (`k8s/`)

Production deployments utilize Kubernetes manifests located in the [`k8s/deployment.yaml`](file:///x:/CorpLens%20AI/k8s/deployment.yaml) file.

### 3.1 Deploying Manifests
```bash
# 1. Create dedicated namespace
kubectl create namespace corplens-enterprise

# 2. Apply secret credentials
kubectl apply -f k8s/secrets.yaml -n corplens-enterprise

# 3. Apply full microservices deployment
kubectl apply -f k8s/deployment.yaml -n corplens-enterprise
```

### 3.2 Verification & Pod Health Check
```bash
kubectl get pods -n corplens-enterprise -o wide
```

Expected output:
```
NAME                                 READY   STATUS    RESTARTS   AGE
corplens-backend-59f7d8c6b7-a1b2c   1/1     Running   0          2m
corplens-frontend-7c8d9e0f1-x3y4z   1/1     Running   0          2m
corplens-postgres-0                 1/1     Running   0          2m
corplens-neo4j-0                    1/1     Running   0          2m
corplens-redis-0                    1/1     Running   0          2m
```

---

## 4. Monitoring & Health Probes

- **Liveness Probe**: `GET /api/v1/admin/health/readiness` (returns HTTP 200 when database connectivity is healthy).
- **Prometheus Metrics**: `GET /metrics` exports standard OpenTelemetry and Uvicorn runtime metrics.
