# 🗄️ CorpLens One — Backend Services & Data Layer Guide

> **Document Version**: 1.0.0  
> **Subsystem**: Backend Data Layer  
> **Status**: Production Specification  

---

## 1. Domain Logic Services Overview

### 1.1 `risk_engine.py` (7-Pillar Risk Engine)
Calculates composite target risk score ($0.0 - 10.0$) using weighted inputs:
- **Infrastructure (15%)**: Open ports, SSL expiration, DNS configuration.
- **Tech Stack (15%)**: Outdated web servers, deprecated frameworks.
- **Reputation (10%)**: Public sentiment and regulatory news.
- **Business Stability (15%)**: Leadership turnover and filing history.
- **Operational Uptime (15%)**: Cloud SLA and service outage records.
- **Supply Chain (15%)**: 4th-party vendor concentration.
- **Compliance (15%)**: OFAC, EU, UN sanctions screening matches.

### 1.2 `ai_engine.py` (CorpLens AI Copilot Engine)
- Implements `RAGContextRetriever` for vector evidence retrieval from PostgreSQL and Neo4j.
- Implements `LLMProviderWrapper` for fallback execution across Gemini, OpenAI, and Ollama.

### 1.3 `report_generator.py` (ISO/IEC 27037 PDF Generator)
- Uses ReportLab 4.5 flowable elements.
- Calculates SHA-256 and SHA-512 cryptographic digests for raw evidence.

---

## 2. PostgreSQL Connection Pooling (`database.py`)

SQLAlchemy 2.0 connection engine configured with connection pooling:

```python
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    pool_size=10,
    max_overflow=20,
    pool_pre_ping=True
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
```

---

## 3. Version & License Information

- **Document Version**: 1.0.0
- **Author**: CorpLens One Backend Engineering Group
- **License**: Enterprise Commercial License. See [LICENSE.md](../../LICENSE.md).
