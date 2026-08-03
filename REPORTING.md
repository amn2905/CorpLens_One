# 📄 Reporting Engine — Architecture & Export Specification

> **Document Version**: 1.0.0  
> **Parent System**: CorpLens One  
> **Module Purpose**: ISO/IEC 27037 Evidentiary PDF & Multi-Format Report Compilation  
> **Status**: Production Module Specification  

---

## 1. Document Overview

### 1.1 Purpose
This document details the multi-format report generation engine (`report_generator.py`) in **CorpLens One**, specifying ISO/IEC 27037 digital evidence compliance, cryptographic hashing, PDF document layout, and export APIs.

---

## 2. Supported Export Formats

| Format | Content Type | File Extension | Engine |
| :--- | :--- | :---: | :--- |
| **PDF** | `application/pdf` | `.pdf` | ReportLab 4.5.0 Flowable Document Engine |
| **HTML** | `text/html` | `.html` | Jinja2 HTML5 Template Engine |
| **CSV** | `text/csv` | `.csv` | Python `csv.writer` Stream |
| **JSON** | `application/json` | `.json` | ISO 8601 JSON Serializer |

---

## 3. ISO/IEC 27037 Digital Evidence Attestation

Every PDF brief generated includes a mandatory Chain of Custody (CoC) table:
1. **Acquisition Timestamp**: Generated in ISO 8601 UTC format (`datetime.now(timezone.utc)`).
2. **Payload SHA-256 Digest**: 64-character hexadecimal digest of ingested telemetry JSON.
3. **Payload SHA-512 Digest**: High-entropy 128-character verification hash snippet.
4. **Sign-off Signature Block**: Lead Risk Auditor and CISO digital approval placeholders.

---

## 4. PDF Generation Code Flow (`generate_pdf_document`)

```python
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle

def generate_pdf_document(self, title: str, company_data: Dict[str, Any]) -> bytes:
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=letter, rightMargin=36, leftMargin=36, topMargin=36, bottomMargin=36)
    story = []
    # Build Document Story Flowables...
    doc.build(story)
    return buffer.getvalue()
```

---

## 5. Version & License Information

- **Document Version**: 1.0.0
- **Author**: CorpLens One Report Engine Group
- **License**: Enterprise Commercial License. See [LICENSE.md](LICENSE.md).
