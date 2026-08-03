# ⚖️ Compliance & Sanctions Module — Specification

> **Document Version**: 1.0.0  
> **Parent System**: CorpLens One  
> **Module Purpose**: Sanctions Screening & Regulatory Compliance  
> **Status**: Production Module Specification  

---

## 1. Document Overview

### 1.1 Purpose
This document specifies the sanctions screening algorithms, supported regulatory registries, risk scoring models, and reporting standards implemented in the **Compliance** module of **CorpLens One**.

---

## 2. Supported Regulatory Registries

The sanctions screening engine (`backend/app/api/v1/sanctions.py`) screens entities against international watchlists:
1. **US OFAC SDN**: Specially Designated Nationals and Blocked Persons list.
2. **UN Security Council**: Consolidated United Nations Sanctions List.
3. **EU Financial Sanctions**: European Union Consolidated Financial Sanctions List.
4. **UK HMT**: UK HM Treasury Consolidated List of Financial Sanctions Targets.

---

## 3. Fuzzy Name Screening Algorithm

Sanctions screening utilizes Jaro-Winkler string similarity combined with Levenshtein distance:

```python
def calculate_sanctions_match(query_name: str, watchlist_name: str) -> float:
    # Computes normalized match ratio (0.0 to 1.0)
    ratio = fuzzy_ratio(query_name.lower(), watchlist_name.lower())
    return round(ratio, 4)
```

- **Match Score $\ge 0.85$**: Flagged as High Confidence Match (Immediate Analyst Review Required).
- **Match Score $0.70 - 0.84$**: Flagged as Medium Confidence Match (Secondary Verification Required).
- **Match Score $< 0.70$**: Cleared.

---

## 4. Compliance Dashboard Capabilities

- Real-time screening counter and alert cards.
- Entity PEP (Politically Exposed Persons) checks.
- Audit sign-off workflows for compliance officers.

---

## 5. Version & License Information

- **Document Version**: 1.0.0
- **Author**: CorpLens One Compliance Engineering
- **License**: Enterprise Commercial License. See [LICENSE.md](LICENSE.md).
