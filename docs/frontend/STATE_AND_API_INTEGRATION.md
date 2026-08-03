# ⚡ CorpLens One — Frontend State & API Integration Guide

> **Document Version**: 1.0.0  
> **Subsystem**: Frontend  
> **Status**: Production State Specification  

---

## 1. Authentication State (`AuthContext.tsx`)

Authentication context maintains current JWT bearer token, user metadata, and login/logout methods:

```tsx
interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}
```

---

## 2. API Service Layer (`frontend/src/services/api.ts`)

The API service module provides methods for interacting with backend REST endpoints:

```typescript
export const api = {
  fetchCompanies: async (): Promise<Company[]> => { ... },
  fetchCompanyById: async (id: string): Promise<Company> => { ... },
  askAI: async (query: string, companyId?: string): Promise<AIResponse> => { ... },
  fetchCases: async (): Promise<Case[]> => { ... },
  fetchGraphTopology: async (): Promise<GraphData> => { ... },
  downloadReportPDF: async (companyId: string): Promise<void> => { ... }
};
```

---

## 3. Error Handling & Fallbacks

API errors trigger fallback data handlers and toast notifications, preventing blank UI crashes.

---

## 4. Version & License Information

- **Document Version**: 1.0.0
- **Author**: CorpLens One Frontend Group
- **License**: Enterprise Commercial License. See [LICENSE.md](../../LICENSE.md).
