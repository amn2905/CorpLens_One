# 🤝 Contributing to CorpLens One

Thank you for your interest in contributing to **CorpLens One** (The Operating System for Enterprise Intelligence)!

---

## 1. Development Environment Setup

### Prerequisites
- Python 3.11+
- Node.js 18+ & npm 9+
- Docker & Docker Compose v2.20+

### Local Setup Steps
```bash
# 1. Clone repository
git clone https://github.com/Yamn2905/CorpLens-AI.git
cd CorpLens-AI

# 2. Setup Backend Virtual Environment
cd backend
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt

# 3. Setup Frontend Dependencies
cd ../frontend
npm install
```

---

## 2. Coding Standards & Conventions

### Python (Backend)
- Adhere to **PEP 8** style guidelines.
- Ensure strict type annotations on all FastAPI route parameters and service functions.
- Run `pytest` inside the `backend/` directory before committing code:
  ```bash
  pytest -v
  ```

### TypeScript / React (Frontend)
- Use functional components with React hooks.
- Maintain type safety without using `any`.
- Check TypeScript types prior to committing:
  ```bash
  npx tsc --noEmit
  ```

---

## 3. Pull Request Guidelines

1. Create a feature branch off `main`: `git checkout -b feature/my-new-feature`.
2. Commit your changes with conventional commit messages (e.g., `feat: add sanction fuzzy matching engine`, `fix: resolve graph canvas rendering bug`).
3. Ensure all 22 backend Pytest tests pass and TypeScript check is clean.
4. Submit a Pull Request targeting the `main` branch with a clear summary of changes.
