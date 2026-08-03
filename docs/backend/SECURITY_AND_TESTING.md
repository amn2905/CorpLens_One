# 🛡️ CorpLens One — Backend Security & Testing Guide

> **Document Version**: 1.0.0  
> **Subsystem**: Backend Security & Testing  
> **Status**: Production Specification  

---

## 1. Security Middleware Enforcement

Security middleware (`backend/app/main.py`) attaches mandatory headers and logs processing latency:

```python
@app.middleware("http")
async def add_security_headers_and_timing(request: Request, call_next):
    start_time = time.time()
    response: Response = await call_next(request)
    process_time = time.time() - start_time
    
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    response.headers["X-Process-Time"] = f"{process_time * 1000:.2f}ms"
    return response
```

---

## 2. Automated Testing Suite Execution

Backend unit and integration tests are executed using Pytest:

```bash
cd backend
pytest -v
```

### Execution Results Benchmark
```
collected 22 items

tests\test_api.py ........                                               [ 36%]
tests\test_persistence.py ....                                           [ 54%]
tests\test_reporting.py .....                                            [ 77%]
tests\test_risk_engine.py .....                                          [100%]

============================= 22 passed in 1.63s ==============================
```

---

## 3. Version & License Information

- **Document Version**: 1.0.0
- **Author**: CorpLens One Backend Engineering Group
- **License**: Enterprise Commercial License. See [LICENSE.md](../../LICENSE.md).
