# 💻 CorpLens One — Developer Setup & Engineering Guide

> **Document Version**: 1.0.0  
> **Target Audience**: Software Engineers, Frontend Developers, Backend Engineers, QA Engineers  
> **Status**: Production Engineering Guide  

---

## 1. Document Overview

### 1.1 Purpose
This guide defines local development setup, code repository structure, coding standards, pull request workflows, commit style, and module extension procedures for **CorpLens One**.

---

## 2. Local Environment Setup

### Prerequisites
- **Python**: `3.11` or `3.12`
- **Node.js**: `v18.0+` & `npm v9.0+`
- **Docker**: `v24.0+` & `Docker Compose v2.20+`

### Step-by-Step Setup
```bash
# 1. Clone repository
git clone https://github.com/amn2905/CorpLens-AI.git
cd CorpLens-AI

# 2. Setup Python Virtual Environment (Backend)
cd backend
python -m venv venv
venv\Scripts\activate        # On Windows
# source venv/bin/activate   # On Linux/macOS

pip install -r requirements.txt
pytest                       # Verify backend unit tests

# 3. Setup Node Dependencies (Frontend)
cd ../frontend
npm install
npm run build                # Verify TypeScript compilation
npm run dev                  # Launch local Vite dev server
```

---

## 3. Repository Structure & Naming Conventions

```
CorpLens One (x:\CorpLens One)
├── backend/app/
│   ├── api/v1/              # Endpoint route definitions (e.g. companies.py, ai.py)
│   ├── core/                # Configuration & DB connection setup
│   ├── models/              # SQLAlchemy ORM model definitions
│   ├── repositories/        # Data access repositories
│   ├── schemas/             # Pydantic schema validation DTOs
│   └── services/            # Domain logic (risk_engine.py, ai_engine.py, etc.)
├── frontend/src/
│   ├── components/          # Reusable UI components (Navbar, Sidebar, Logo, Badges)
│   ├── context/             # Global Auth state context
│   ├── pages/               # Page routes (Dashboard, CompanyWorkspace, AiAssistantPage)
│   ├── services/            # API client service calls (api.ts)
│   └── types/               # TypeScript interface definitions (index.ts)
```

### Naming Conventions
- **Python**: `snake_case` for variables, functions, and file names (e.g. `risk_engine.py`). `PascalCase` for classes (e.g. `EnterpriseAIEngine`).
- **TypeScript**: `PascalCase` for React component files (e.g. `Sidebar.tsx`) and interfaces (e.g. `Company`). `camelCase` for variables and helper functions.

---

## 4. Engineering Standards & Quality Checklist

### Backend Rules (Python / FastAPI)
- Adhere strictly to **PEP 8** style guidelines.
- Mandatory type hints on all function arguments and return types.
- Zero raw SQL string concats (use SQLAlchemy ORM or parameter binding).
- Always verify test suite before submitting code: `pytest`.

### Frontend Rules (TypeScript / React)
- Functional React components with strict TypeScript type declarations (no `any`).
- Always run `npx tsc --noEmit` before opening pull requests.

---

## 5. Guide for Adding New Platform Modules

1. **Add Backend Router**: Create new file in `backend/app/api/v1/new_module.py` and register route in `backend/app/main.py`.
2. **Add Backend Service**: Implement domain logic in `backend/app/services/new_module_service.py`.
3. **Add Frontend Page**: Create `frontend/src/pages/NewModulePage.tsx` and register route in `frontend/src/App.tsx`.
4. **Update Navigation**: Add nav item to `NAV_SECTIONS` in `frontend/src/components/Sidebar.tsx`.

---

## 6. Version & License Information

- **Document Version**: 1.0.0
- **Author**: CorpLens One Lead Software Engineers
- **License**: Enterprise Commercial License. See [LICENSE.md](LICENSE.md).
