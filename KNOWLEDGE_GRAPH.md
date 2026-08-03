# 🕸️ Knowledge Graph Module — Architecture & Query Specification

> **Document Version**: 1.0.0  
> **Parent System**: CorpLens One  
> **Module Purpose**: Neo4j Graph Topology & Entity Disambiguation  
> **Status**: Production Module Specification  

---

## 1. Document Overview

### 1.1 Purpose
This document details the Neo4j graph database integration, node-edge data modeling, Cypher query algorithms, and Cytoscape.js rendering interface of the **Knowledge Graph** module in **CorpLens One**.

---

## 2. Neo4j Graph Model Definition

```
(Executive)-[:EXECUTIVE_OF]->(Company)-[:HAS_SUBSIDIARY]->(Company)
                               │
                          [:USES_TECH]
                               │
                               ▼
                          (Technology)-[:EXPOSES_VULNERABILITY]->(CVE)
```

### 2.1 Node Labels & Schema Attributes

| Label | Primary Properties | Description |
| :--- | :--- | :--- |
| `:Company` | `id`, `name`, `primary_domain`, `risk_score` | Corporate entities and subsidiaries. |
| `:Executive` | `id`, `name`, `title` | Board members, C-level executives, and directors. |
| `:Technology` | `name`, `version`, `category` | Web servers, JS frameworks, cloud hosting. |
| `:CVE` | `cve_id`, `cvss_score`, `severity` | NIST NVD public vulnerability advisories. |
| `:Supplier` | `id`, `name`, `tier` | Multi-tier third-party vendors. |

---

## 3. Cypher Traversal Queries (`graph_service.py`)

### 3.1 Fetch Relationship Topology Query
```cypher
MATCH (c:Company {id: $company_id})-[r:HAS_SUBSIDIARY|USES_TECH|EXECUTIVE_OF]-(n)
RETURN c, r, n
LIMIT 100
```

### 3.2 Supply Chain Exposure Traversal Query
```cypher
MATCH path = (c:Company {id: $company_id})-[:DEPENDS_ON*1..3]->(s:Supplier)-[:USES_TECH]->(t:Technology)-[:EXPOSES_VULNERABILITY]->(v:CVE)
WHERE v.severity = 'CRITICAL'
RETURN path
```

---

## 4. Frontend Cytoscape.js Rendering (`GraphExplorer.tsx`)

The React UI renders interactive network topology using `Cytoscape.js` with dynamic layout physics (`cose` layout engine), node coloring by risk tier, and click-to-inspect drawers.

---

## 5. Version & License Information

- **Document Version**: 1.0.0
- **Author**: CorpLens One Graph Analytics Group
- **License**: Enterprise Commercial License. See [LICENSE.md](LICENSE.md).
