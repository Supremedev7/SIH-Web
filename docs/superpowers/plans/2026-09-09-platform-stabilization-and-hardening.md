# Platform Stabilization, Type-Safety & Architectural Hardening Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Resolve all 24 TypeScript compilation errors, fix the login redirect loop, correct the real-time messaging UUID lookup bug, standardize the `technical_skills` data contract, safeguard user metadata from destructive overwrites, and wire the `applyForJob` action into the opportunities UI.

**Architecture:** A 3-phase stabilization approach: First, fix compiler type definitions, queries, and breaking API changes to get the build 100% green. Second, harden auth session synchronization and real-time event listeners. Third, standardize database JSONB contracts and wire interactive UI mutations to Server Actions.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript 5, Tailwind CSS v4, Supabase (PostgreSQL, Auth, Realtime, Storage), Zod v4, Recharts, Sonner.

---

## Tasks

### Task 1: Type Definitions & Core Imports (3 Errors)

**Files:**
- Modify: `src/types/student-portal.ts`
- Modify: `src/app/api/student/profile/route.ts:1`
- Modify: `src/app/dashboard/industry/messaging/messaging-client.tsx:289`

- [ ] **Step 1: Export SettingsPageProps in `src/types/student-portal.ts`**
  Add export:
  ```ts
  export interface SettingsPageProps {
    email: string | null;
    fullName?: string | null;
  }
  ```

- [ ] **Step 2: Fix import in `src/app/api/student/profile/route.ts`**
  Change line 1 from `import { createServerClient } from "@/lib/supabase/server";` to:
  ```ts
  import { createClient } from "@/lib/supabase/server";
  ```
  And update line 6 from `await createServerClient()` to `await createClient()`.

- [ ] **Step 3: Import MessageSquare in `src/app/dashboard/industry/messaging/messaging-client.tsx`**
  Add `MessageSquare` to the `lucide-react` import statement.

---

### Task 2: Strict Type Annotations & Null Safety (7 Errors)

**Files:**
- Modify: `src/app/dashboard/faculty/consultancy/page.tsx:26`
- Modify: `src/app/dashboard/institute/placements/page.tsx:43`
- Modify: `src/app/dashboard/student/messaging/page.tsx:38`
- Modify: `src/app/dashboard/student/profile/page.tsx:28`
- Modify: `src/app/dashboard/student/resume/page.tsx:24-25`

- [ ] **Step 1: Annotate `rfps` in `src/app/dashboard/faculty/consultancy/page.tsx`**
  Change `let rfps = [];` to:
  ```ts
  let rfps: any[] = [];
  ```

- [ ] **Step 2: Annotate `formattedDrives` in `src/app/dashboard/institute/placements/page.tsx`**
  Change `let formattedDrives = [];` to:
  ```ts
  let formattedDrives: any[] = [];
  ```

- [ ] **Step 3: Annotate `profiles` in `src/app/dashboard/student/messaging/page.tsx`**
  Change `let profiles = [];` to:
  ```ts
  let profiles: Array<{ auth_id: string; full_name: string; role: string }> = [];
  ```

- [ ] **Step 4: Fix `email` type in `src/app/dashboard/student/profile/page.tsx`**
  Change `email={user.email}` to:
  ```tsx
  email={user.email ?? null}
  ```

- [ ] **Step 5: Safe metadata navigation in `src/app/dashboard/student/resume/page.tsx`**
  Update lines 24–25:
  ```ts
  size: f.metadata?.size ? (f.metadata.size / 1024 / 1024).toFixed(2) + " MB" : "0 MB",
  date: f.created_at ? new Date(f.created_at).toLocaleDateString() : "Recently",
  ```

---

### Task 3: Query Alignment & Interface Contracts (9 Errors)

**Files:**
- Modify: `src/app/dashboard/student/credentials/page.tsx:17-35`
- Modify: `src/app/dashboard/student/credentials/credentials-client.tsx:31-34,88`
- Modify: `src/app/dashboard/student/page.tsx:36`
- Modify: `src/app/dashboard/industry/page.tsx:30-42`

- [ ] **Step 1: Include `id` in `src/app/dashboard/student/page.tsx`**
  Change line 36:
  ```ts
  .select('id, employability_score')
  ```

- [ ] **Step 2: Align `credentials/page.tsx` query and props**
  Select `full_name, department, designation, bio, phone, avatar_url, metadata, institutions(name)` and pass `email={user.email ?? null}`.

- [ ] **Step 3: Sanitize strings in `credentials-client.tsx`**
  Safely cast:
  ```ts
  const github = typeof profile?.metadata?.github === 'string' ? profile.metadata.github : "#";
  const linkedin = typeof profile?.metadata?.linkedin === 'string' ? profile.metadata.linkedin : "#";
  ```
  And cast `Boolean(profile?.metadata?.onboarding_completed)` on line 88.

- [ ] **Step 4: Fix table query and IndustrySettings in `src/app/dashboard/industry/page.tsx`**
  Change query from `industry_profiles` to `industries`, select complete company fields, and ensure `industryProfile` is typed or given complete fallback defaults.

---

### Task 4: Third-Party Breaking Changes (Zod v4 & Recharts) (5 Errors)

**Files:**
- Modify: `src/app/dashboard/student/profile/profile-client.tsx:61`
- Modify: `src/app/dashboard/student/skills/skills-client.tsx:164`

- [ ] **Step 1: Replace `.errors` with `.issues` in `profile-client.tsx`**
  Change `for (const err of result.error.errors)` to:
  ```ts
  for (const err of result.error.issues)
  ```

- [ ] **Step 2: Fix Recharts Tooltip formatter in `skills-client.tsx`**
  Change line 164:
  ```tsx
  formatter={(value: any, name: any) => [`${value}%`, name]}
  ```

- [ ] **Step 3: Run TypeScript verification**
  Run: `npx tsc --noEmit`
  Expected: 0 errors.

---

### Task 5: Security, Session Synchronization & Route Guards

**Files:**
- Modify: `src/components/auth/login-form.tsx:114-125`
- Modify: `src/app/auth/callback/route.ts:8,38`
- Modify: `src/app/dashboard/student/messaging/messaging-client.tsx:36`

- [ ] **Step 1: Fix infinite redirect loop in `login-form.tsx`**
  Before redirecting in `useEffect`, check `const { data: { session } } = await supabase.auth.getSession();`. If `!session`, call `clearSession()` to wipe invalid `localStorage` state and stay on the login form.

- [ ] **Step 2: Dynamic role routing in `auth/callback/route.ts`**
  Query `user_profiles.role` or `user.user_metadata.role` after code exchange, and redirect to `ROLE_DASHBOARD_PREFIX[role]`.

- [ ] **Step 3: Fix realtime messaging sender lookup in `messaging-client.tsx`**
  Change line 36 from `.eq('id', payload.new.sender_id)` to:
  ```ts
  .eq('auth_id', payload.new.sender_id)
  ```

---

### Task 6: Domain Business Logic & Action Wiring

**Files:**
- Modify: `src/app/api/student/onboarding/route.ts:58-75`
- Modify: `src/lib/actions/profileActions.ts:41-45`
- Modify: `src/app/dashboard/student/opportunities/opportunities-client.tsx`

- [ ] **Step 1: Standardize `technical_skills` dictionary in `onboarding/route.ts`**
  Convert skills to dictionary format:
  ```ts
  const technicalSkillsMap: Record<string, number> = {};
  baseTechnicalSkills.forEach(s => {
    technicalSkillsMap[s.name] = Math.round((s.level * score) / 100);
  });
  ```
  Pass `technical_skills: technicalSkillsMap` into `.upsert(...)`.

- [ ] **Step 2: Safe metadata merge in `profileActions.ts`**
  In `updateUserSettings`, fetch existing metadata first and merge:
  ```ts
  const { data: profile } = await supabase
    .from("user_profiles")
    .select("metadata")
    .eq("auth_id", user.id)
    .single();
  const currentMetadata = (profile?.metadata as Record<string, unknown>) || {};
  await supabase.from("user_profiles").update({ metadata: { ...currentMetadata, ...settings } }).eq("auth_id", user.id);
  ```

- [ ] **Step 3: Wire Apply action in `opportunities-client.tsx`**
  Connect the Apply button to `applyForJob(jobId)` from `@/lib/actions/jobActions` with loading spinner and Sonner toast.

---

### Task 7: Final Verification

- [ ] **Step 1: Verify TypeScript**
  Run `npx tsc --noEmit`. Expected: 0 errors.

- [ ] **Step 2: Verify Build**
  Run `npm run build`. Expected: Successful production build.
