# SCI Portal Redesign: Apex National Collaboration Platform

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the Student Council of India (SCI) platform from placeholder pages into an advanced, sleek, high-fidelity national portal featuring a unified multi-column Mega Menu navbar across all roles, 60fps CSS animations, and 5 dedicated pages (`/`, `/student`, `/institution`, `/industry`, `/academician`) adhering directly to the provided reference designs without generic AI clichés.

**Architecture:** A centralized public layout with a persistent, responsive, glassmorphic `MegaNavbar` and `PublicFooter`. Each role route (`/student`, `/institution`, `/industry`, `/academician`) and the main portal (`/`) gets a bespoke, responsive page loaded with interactive simulators (stream filter, placement analytics bar chart, candidate sourcing filter, pricing tiers, comparison matrix). Styling leverages Tailwind CSS v4 with custom keyframe animations and accessible Radix primitives.

**Tech Stack:** Next.js 15+ (App Router), TypeScript (strict mode), Tailwind CSS v4, `@plugin "tailwindcss-animate"`, Lucide React icons, shadcn/ui primitives.

**Spec:** [docs/superpowers/specs/2026-09-02-sci-redesign.md](file:///home/supreme/Documents/Project/Web/SIH/docs/superpowers/specs/2026-09-02-sci-redesign.md)

## Global Constraints
- Strictly avoid generic AI visual tropes (no random purple blobs, no cookie-cutter unstyled cards, no placeholder text).
- Locked color identities: Base (Navy/Slate #070B14 / #F8FAFC), Student (Sapphire Blue #3B82F6), Institute (Warm Amber #F59E0B), Industry (Modern Mint #10B981), Faculty (Royal Violet #8B5CF6).
- 100% mobile-first responsive design (tested down to 375px) with accessible keyboard navigation and ARIA attributes.
- Pure CSS / Tailwind 60fps hardware-accelerated animations (no heavy unnecessary animation runtimes).
- Adhere to Next.js App Router conventions and file structure defined in `AGENTS.md`.

---

### Task 1: Design Tokens, Keyframe Animations & Global CSS Enhancements
**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Update `src/app/globals.css` with animation keyframes and modern glassmorphism utilities**
- [ ] **Step 2: Verify CSS builds cleanly**

---

### Task 2: Navigation Data Model & Mega Menu Dictionary
**Files:**
- Create: `src/lib/constants/public-navigation.ts`

- [ ] **Step 1: Create `src/lib/constants/public-navigation.ts` with complete mega-menu trees and partner data**
- [ ] **Step 2: Verify TypeScript types**

---

### Task 3: Shared UI Components (Mega Navbar, Apex Footer & Partner Marquee)
**Files:**
- Create: `src/components/layout/mega-navbar.tsx`
- Create: `src/components/layout/public-footer.tsx`
- Create: `src/components/shared/partner-marquee.tsx`
- Create: `src/app/(public)/layout.tsx`

- [ ] **Step 1: Build `PartnerMarquee` infinite ticker component**
- [ ] **Step 2: Build `MegaNavbar` client component with 4-column mega menus & mobile drawer**
- [ ] **Step 3: Build `PublicFooter` component with comprehensive role links and national notice**
- [ ] **Step 4: Create `src/app/(public)/layout.tsx` to wrap public pages**

---

### Task 4: Apex Overview Portal (`/` — `src/app/page.tsx`)
**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Implement Apex Hero with 4-Role Interactive Switcher**
- [ ] **Step 2: Implement "The Path to Unified Growth" 4-Step Interactive Timeline**
- [ ] **Step 3: Implement "Ecosystem Roles: Engineered Specifically for You" tabbed deep dive**
- [ ] **Step 4: Implement Partner Marquee, Testimonials & National CTA Banner**

---

### Task 5: Redesigned Student Portal (`/student` — `src/app/(public)/student/page.tsx`)
**Files:**
- Modify: `src/app/(public)/student/page.tsx`

- [ ] **Step 1: Implement Student Hero & Live Opportunity Search Console**
- [ ] **Step 2: Implement "Engineered to Give You the Edge" 6-Feature Suite**
- [ ] **Step 3: Implement "Browse Curated Streams" 8-Category Interactive Catalog**
- [ ] **Step 4: Implement "The SCI Difference" Comparison Matrix**
- [ ] **Step 5: Implement Student Placement Stories & National Hackathons**

---

### Task 6: Redesigned Institution Portal (`/institution` — `src/app/(public)/institution/page.tsx`)
**Files:**
- Modify: `src/app/(public)/institution/page.tsx`

- [ ] **Step 1: Implement Hero & Interactive Placement Analytics Widget**
- [ ] **Step 2: Implement "Common Challenges Placement Cells Face" & "The SCI Apex Solution Suite"**
- [ ] **Step 3: Implement "Transparent National Pricing Plans"**
- [ ] **Step 4: Implement "Institutes Network Coverage" & Partnership CTA**

---

### Task 7: Redesigned Industry Hub (`/industry` — `src/app/(public)/industry/page.tsx`)
**Files:**
- Modify: `src/app/(public)/industry/page.tsx`

- [ ] **Step 1: Implement Hero & Interactive Candidate Sourcing Console**
- [ ] **Step 2: Implement "Why Top Recruiter Teams Trust SCI" & Recruitment Partners**
- [ ] **Step 3: Implement "Engineered for Scalable Sourcing" 6-Feature Suite**
- [ ] **Step 4: Implement 4-Step Recruiting Workflow & ROI Metrics Banner**
- [ ] **Step 5: Implement TechCorp Case Study, Sourcing Plans & Enterprise CTA**

---

### Task 8: Redesigned Faculty Cell (`/academician` — `src/app/(public)/academician/page.tsx`)
**Files:**
- Modify: `src/app/(public)/academician/page.tsx`

- [ ] **Step 1: Implement Hero & Expertise Search Bar**
- [ ] **Step 2: Implement "Primary Pillars of Academic Synergy" & Innovation Features**
- [ ] **Step 3: Implement "Unified Academic Research & Corporate Collaboration"**
- [ ] **Step 4: Implement Prominent Faculty Mentors Spotlight & FDP Training**

---

### Task 9: Verification, Polish & Cross-Browser Responsive Testing
- [ ] **Step 1: Build & Type Verification**
- [ ] **Step 2: Interactive Verification in Browser**
- [ ] **Step 3: Create Walkthrough Summary**
