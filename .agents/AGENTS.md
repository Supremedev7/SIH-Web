# AGENTS.md — SCI (Student Council of India)

> **This file is the canonical reference for every AI agent, model, or session working on this codebase.**
> Read this FIRST before making any changes. When you make significant changes, update both this file AND `memory.md`.

---

## 1. Project Identity

| Field | Value |
|---|---|
| **Name** | SCI — Student Council of India |
| **Tagline** | Academia–Industry Collaboration Portal for Skill Mapping, Internships & Placement |
| **Repository** | `/home/supreme/Documents/Project/Web/SIH` |
| **Type** | Full-stack web application |
| **Status** | Planning Phase (Architecture Complete) |

---

## 2. Technology Stack (Locked)

| Layer | Technology | Version | Notes |
|---|---|---|---|
| Framework | Next.js (App Router) | 15.x | TypeScript, RSC, SSR |
| Language | TypeScript | 5.x | Strict mode enabled |
| Database | Supabase (PostgreSQL) | Latest | Auth + RLS + Storage + Realtime + Edge Functions |
| Auth | Supabase Auth | — | Email, Google OAuth, LinkedIn OAuth, Magic Link |
| Backend | @supabase/server | — | Backend API client & Edge Functions |
| CSS | Tailwind CSS | v4 | Utility-first, dark mode via `class` strategy |
| Components | shadcn/ui + Radix UI | Latest | Accessible, customizable primitives |
| Forms | React Hook Form + Zod | — | Type-safe validation |
| State (Client) | Zustand | — | Minimal client state |
| State (Server) | TanStack React Query | v5 | Server state caching, mutations |
| Charts | Recharts | — | Dashboard analytics |
| AI/ML | Gemini API (`@google/genai`) | — | Skill analysis, recommendations, career guidance |
| File Storage | Supabase Storage | — | Resumes, certificates, reports, avatars |
| Email | Resend | — | Transactional emails |
| Deployment | Vercel | — | Edge network, preview deploys |
| Icons | Lucide React | — | Consistent iconography |
| Date | date-fns | — | Lightweight date formatting |

> [!CAUTION]
> **Do NOT add new dependencies without documenting them here and in `memory.md`.**

---

## 3. Architecture Overview

### 3.1 Four-Role RBAC System

```
┌─────────────────────────────────────────────────────────────┐
│                    SCI Platform Roles                       │
├──────────────┬──────────────┬────────────┬──────────────────┤
│   Student    │  Academician │  Industry  │   Institution    │
├──────────────┼──────────────┼────────────┼──────────────────┤
│ Assessment   │ Faculty      │ Post Jobs  │ Student Tracking │
│ Skill Profile│ Internships  │ Post       │ Placement Stats  │
│ Apply Jobs   │ FDPs         │ Internships│ Dept Analytics   │
│ Apply Intern │ Consultancy  │ Programs   │ Report Export    │
│ Portfolio    │ Research     │ Shortlist  │ Skill Heatmaps   │
│ Courses      │ Workshops    │ Collaborate│ Settings         │
│ Recommend.   │ Profile      │ Analytics  │                  │
│ Track Apps   │              │ Mentorship │                  │
└──────────────┴──────────────┴────────────┴──────────────────┘
```

### 3.2 Route Structure Convention

- **Auth pages**: `src/app/(auth)/login`, `(auth)/register`, etc.
- **Dashboard pages**: `src/app/(dashboard)/[role]/[feature]/page.tsx`
- **API routes**: `src/app/api/[resource]/route.ts`
- **Public pages**: `src/app/(public)/about`, `(public)/contact`, etc.

### 3.3 Security Model

1. **Supabase RLS** — Database-level row security for all tables
2. **Next.js Middleware** — Route-level role guards at `/src/middleware.ts`
3. **API Route Guards** — Server-side role checks in every API handler
4. **CORS** — Configured via `next.config.ts`

### 3.4 Data Flow Pattern

```
User → Next.js Page (RSC) → Supabase Direct (read)
User → Client Action → API Route → Supabase (write) → Revalidate
User → Client Action → API Route → Gemini API → Supabase (AI features)
```

---

## 4. Coding Conventions

### 4.1 File Naming
- Components: `PascalCase.tsx` (e.g., `SkillRadarChart.tsx`) — but kebab-case filenames if using shadcn/ui convention (e.g., `skill-radar-chart.tsx`)
- Hooks: `use-[name].ts` (e.g., `use-auth.ts`)
- Utils/Libs: `kebab-case.ts` (e.g., `skill-analyzer.ts`)
- Types: `kebab-case.ts` in `src/types/`
- Validators: `kebab-case.ts` in `src/lib/validators/`

### 4.2 Component Pattern
```tsx
// Always export named, never default (except page.tsx and layout.tsx)
"use client" // Only when needed (event handlers, hooks, browser APIs)

import { type ComponentProps } from "react"

interface SkillCardProps {
  skill: Skill
  onSelect?: (skill: Skill) => void
}

export function SkillCard({ skill, onSelect }: SkillCardProps) {
  return (/* ... */)
}
```

### 4.3 API Route Pattern
```ts
// src/app/api/[resource]/route.ts
import { createServerClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import { resourceSchema } from "@/lib/validators/resource"

export async function GET(request: Request) {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  // ... business logic
}
```

### 4.4 Database Conventions
- Table names: `snake_case`, plural (e.g., `skill_profiles`)
- Column names: `snake_case` (e.g., `created_at`)
- Primary keys: `uuid id` (auto-generated)
- Foreign keys: `[table_singular]_id` (e.g., `user_id`, `industry_id`)
- Timestamps: `created_at`, `updated_at` on every table
- Soft deletes: `deleted_at` where needed
- JSONB columns for flexible/nested data (e.g., `metadata`, `required_skills`)

### 4.5 Environment Variables
```
# .env.local
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
GEMINI_API_KEY=
RESEND_API_KEY=
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 5. Implementation Phases (Summary)

| Phase | Name | Status | Key Deliverables |
|---|---|---|---|
| 1 | Foundation & Auth | ⬜ Not Started | Project init, Supabase, Auth, Landing page |
| 2 | Skill Assessment & Profiling | ⬜ Not Started | Questionnaires, aptitude tests, skill profiles, AI gap analysis |
| 3 | Internship & Job Portal | ⬜ Not Started | Listings, applications, tracking, matching |
| 4 | Learning & Collaboration | ⬜ Not Started | Programs, certifications, mentorship, workshops |
| 5 | Academician Portal | ⬜ Not Started | Faculty internships, FDPs, consultancy, research |
| 6 | Portfolio & Recommendations | ⬜ Not Started | Digital portfolio, AI recommendations, career guidance |
| 7 | Institution Dashboard | ⬜ Not Started | Analytics, reports, student tracking, heatmaps |
| 8 | Notifications, Polish & Deploy | ⬜ Not Started | Realtime notifications, email, dark mode, SEO |

> See `implementation_plan.md` for full details of each phase.

---

## 6. Critical Rules

1. **Always update `memory.md`** when completing a phase, adding a feature, or making an architecture decision.
2. **Always update this `AGENTS.md`** when changing tech stack, conventions, or architecture.
3. **Never bypass RLS** — all data access must go through Supabase client with user context.
4. **AI features must have fallbacks** — the platform must work without Gemini API.
5. **Mobile-first responsive design** — every page must work on 375px+ viewports.
6. **Dark mode support** — all components must support both light and dark themes.
7. **Accessibility** — all interactive elements must be keyboard-navigable with proper ARIA.
8. **TypeScript strict mode** — no `any` types, no `@ts-ignore` without justification.
9. **Supabase migrations are immutable** — never edit a committed migration, create a new one.
10. **Components go in `src/components/`** — colocated components only for truly page-specific widgets.

---

## 7. Useful Commands

```bash
# Development
npm run dev                    # Start dev server (port 3000)
npx supabase start             # Start local Supabase
npx supabase db reset          # Reset DB and re-run migrations

# Code Quality
npx tsc --noEmit               # Type check
npm run lint                   # ESLint
npm run build                  # Production build

# Supabase
npx supabase migration new <name>      # Create migration
npx supabase gen types typescript      # Generate DB types
npx supabase db push                   # Push migrations to remote

# shadcn/ui
npx shadcn@latest add <component>      # Add a component
```

---

## 8. Key File Locations

| Purpose | Path |
|---|---|
| Root layout | `src/app/layout.tsx` |
| Landing page | `src/app/page.tsx` |
| Middleware (auth/role) | `src/middleware.ts` |
| Supabase clients | `src/lib/supabase/` |
| AI engine | `src/lib/ai/` |
| Zod validators | `src/lib/validators/` |
| Role/nav constants | `src/lib/constants/` |
| Shared components | `src/components/shared/` |
| UI primitives | `src/components/ui/` |
| Custom hooks | `src/hooks/` |
| Zustand stores | `src/stores/` |
| TypeScript types | `src/types/` |
| DB migrations | `supabase/migrations/` |
| Seed data | `supabase/seed.sql` |
| This file | `.agents/AGENTS.md` |
| Memory log | `.agents/memory.md` |
