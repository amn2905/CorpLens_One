# 🎨 CorpLens One — Frontend Design System & Component Library

> **Document Version**: 1.0.0  
> **Subsystem**: Frontend  
> **Status**: Production UI Component Specification  

---

## 1. Design System Tokens

The user interface uses modern corporate design tokens built on Tailwind CSS v3 (`frontend/tailwind.config.js` and `frontend/src/index.css`).

### 1.1 Color Tokens
- **Background Slate**: `#F8FAFC` (Slate-50 light workspace background).
- **Primary Brand Blue**: `#2563EB` (Blue-600 active brand accent).
- **Dark Text Primary**: `#0F172A` (Slate-900 high contrast typography).
- **Secondary Muted Text**: `#475569` (Slate-600 subheaders & labels).
- **Border Lines**: `#E2E8F0` (Slate-200 component division lines).

---

## 2. Reusable UI Components

### 2.1 `<RiskBadge />` (`frontend/src/components/RiskBadge.tsx`)
Renders calibrated risk score badge with background color mapping:
- **Low Risk ($0.0 - 3.9$)**: Green Emerald badge (`bg-emerald-50 text-emerald-700`).
- **Medium Risk ($4.0 - 6.9$)**: Amber Warning badge (`bg-amber-50 text-amber-700`).
- **High Risk ($7.0 - 8.9$)**: Orange Alert badge (`bg-orange-50 text-orange-700`).
- **Critical Risk ($9.0 - 10.0$)**: Red Danger badge (`bg-rose-50 text-rose-700`).

### 2.2 `<GraphExplorer />` (`frontend/src/components/GraphExplorer.tsx`)
Wraps `Cytoscape.js` canvas with interactive controls:
- **Layouts**: `cose` (physics force-directed), `concentric`, `breadthfirst`.
- **Interactions**: Tap node to expand details drawer, drag to reposition nodes, zoom controls.

---

## 3. Version & License Information

- **Document Version**: 1.0.0
- **Author**: CorpLens One UI Engineering Group
- **License**: Enterprise Commercial License. See [LICENSE.md](../../LICENSE.md).
