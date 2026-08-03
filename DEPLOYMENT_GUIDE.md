# 🚀 CorpLens One — Deployment & Infrastructure Operations Guide

> **Document Version**: 1.0.0  
> **Target Audience**: DevOps Engineers, Infrastructure Architects, System Administrators  
> **Status**: Production Deployment Specification  

---

## 1. Document Overview

### 1.1 Purpose
This document specifies deployment workflows, environmental prerequisites, multi-container orchestration, and Kubernetes production procedures for **CorpLens One**.

### 1.2 Scope
- Hardware, OS, and runtime container requirements.
- Docker Compose multi-container setup.
- Kubernetes deployment and service manifests (`k8s/deployment.yaml`).
- Reverse proxy TLS termination, ingress routing, and health checks.

---

## 2. Hardware & Environment Prerequisites

| Resource | Minimum Requirement | Recommended Production |
| :--- | :--- | :--- |
| **CPU** | 4 Physical Cores | 8+ vCPUs |
| **Memory (RAM)** | 8 GB | 16 GB - 32 GB |
| **Disk Storage** | 50 GB SSD | 100+ GB NVMe SSD |
| **Operating System** | Ubuntu 22.04 LTS / RHEL 9 | Ubuntu 22.04 LTS / RHEL 9 |
| **Container Engine** | Docker Engine 24.0+ | Docker Engine 24.0+ |
| **Orchestration** | Docker Compose 2.20+ / K8s 1.28+ | Kubernetes 1.28+ |

---

## 3. Environment Variables Configuration

Create a production `.env` file in the root workspace directory:

```env
# Application Settings
PROJECT_NAME=CorpLens One
VERSION=1.0.0
API_V1_STR=/api/v1
SECRET_KEY=generate_high_entropy_jwt_secret_key_here

# PostgreSQL Database Configuration
POSTGRES_SERVER=postgres
POSTGRES_USER=postgres
POSTGRES_PASSWORD=secure_production_password
POSTGRES_DB=corplens_db
POSTGRES_PORT=5432

# Graph & Cache Database Configuration
NEO4J_URI=bolt://neo4j:7687
NEO4J_AUTH=neo4j/corplenspass
REDIS_HOST=redis
REDIS_PORT=6379

# LLM Integration Keys (Optional)
GEMINI_API_KEY=your_gemini_api_key
OPENAI_API_KEY=your_openai_api_key
```

---

## 4. Docker Compose Orchestration

The root `docker-compose.yml` configures five production services: `postgres`, `neo4j`, `redis`, `backend`, and `frontend`.

```bash
# 1. Validate docker-compose configuration
docker compose config

# 2. Build and start containers in detached mode
docker compose up --build -d

# 3. Monitor container health status
docker compose ps

# 4. View container logs
docker compose logs -f backend
```

---

## 5. Kubernetes Deployment

Production Kubernetes manifests are maintained in `k8s/deployment.yaml`.

```bash
# 1. Apply namespace and secrets
kubectl create namespace corplens
kubectl create secret generic corplens-secrets \
  --from-literal=postgres-password=secure_production_password \
  -n corplens

# 2. Apply deployment manifests
kubectl apply -f k8s/deployment.yaml -n corplens

# 3. Verify pod readiness probes
kubectl get pods -n corplens
kubectl get svc -n corplens
```

---

## 6. Reverse Proxy & Security Hardening

### Nginx Configuration Template (`nginx.conf`)
```nginx
server {
    listen 443 ssl http2;
    server_name corplens.company.internal;

    ssl_certificate /etc/ssl/certs/corplens.crt;
    ssl_certificate_key /etc/ssl/private/corplens.key;
    ssl_protocols TLSv1.3;

    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "DENY" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    location / {
        proxy_pass http://127.0.0.1:5173;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

## 7. Version & License Information

- **Document Version**: 1.0.0
- **Author**: CorpLens One DevOps Operations Group
- **License**: Enterprise Commercial License. See [LICENSE.md](LICENSE.md).
