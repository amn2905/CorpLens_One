# 🚀 CorpLens One — Deployment & Infrastructure Operations Guide

> **Document Version**: 1.0.0  
> **Target Audience**: DevOps Engineers, Infrastructure Architects, System Administrators  
> **Status**: Production Deployment Specification  

---

## 1. Document Overview

This document specifies deployment workflows, environmental prerequisites, multi-container orchestration, and Kubernetes production procedures for **CorpLens One**.

For complete step-by-step instructions, Nginx SSL templates, and deployment scripts, refer to the primary root [DEPLOYMENT_GUIDE.md](../DEPLOYMENT_GUIDE.md).

---

## 2. Environment Variables Summary

```env
PROJECT_NAME=CorpLens One
VERSION=1.0.0
POSTGRES_SERVER=postgres
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgrespassword
POSTGRES_DB=corplens_db
POSTGRES_PORT=5432
NEO4J_URI=bolt://neo4j:7687
REDIS_HOST=redis
```

---

## 3. Quick Deployment Commands

```bash
# Docker Compose Deployment
docker compose up --build -d

# Kubernetes Manifest Application
kubectl apply -f k8s/deployment.yaml
```
