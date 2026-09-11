---
name: Viridian ATS Enterprise
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#3e4946'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#6e7a76'
  outline-variant: '#bdc9c5'
  surface-tint: '#006b5c'
  primary: '#005e51'
  on-primary: '#ffffff'
  primary-container: '#0e7969'
  on-primary-container: '#a4feea'
  inverse-primary: '#7dd6c3'
  secondary: '#545f73'
  on-secondary: '#ffffff'
  secondary-container: '#d5e0f8'
  on-secondary-container: '#586377'
  tertiary: '#764900'
  on-tertiary: '#ffffff'
  tertiary-container: '#975f00'
  on-tertiary-container: '#ffead5'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#99f3df'
  primary-fixed-dim: '#7dd6c3'
  on-primary-fixed: '#00201b'
  on-primary-fixed-variant: '#005045'
  secondary-fixed: '#d8e3fb'
  secondary-fixed-dim: '#bcc7de'
  on-secondary-fixed: '#111c2d'
  on-secondary-fixed-variant: '#3c475a'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
  surface-alabaster: '#F8FAFC'
  surface-alabaster-card: '#FFFFFF'
  surface-alabaster-subtle: '#F1F5F9'
  border-alabaster: '#E2E8F0'
  border-alabaster-strong: '#CBD5E1'
  surface-obsidian: '#090D14'
  surface-obsidian-card: '#0F172A'
  surface-obsidian-subtle: '#1E293B'
  border-obsidian: '#1E293B'
  border-obsidian-strong: '#334155'
  teal-glow: rgba(14, 121, 105, 0.15)
  match-high: '#0E7969'
  match-medium: '#F59E0B'
  match-low: '#E11D48'
  verified-badge: '#0284C7'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 2.25rem
    fontWeight: '700'
    lineHeight: 2.75rem
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.75rem
    fontWeight: '700'
    lineHeight: 2.25rem
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.375rem
    fontWeight: '700'
    lineHeight: 1.75rem
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: 1.75rem
    letterSpacing: -0.015em
  title-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 1rem
    fontWeight: '600'
    lineHeight: 1.5rem
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.5rem
    letterSpacing: '0'
  body-md:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.375rem
    letterSpacing: '0'
  body-sm:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '400'
    lineHeight: 1.125rem
    letterSpacing: 0.01em
  data-mono:
    fontFamily: Inter
    fontSize: 0.8125rem
    fontWeight: '500'
    lineHeight: 1.25rem
    letterSpacing: -0.01em
  label-md:
    fontFamily: Inter
    fontSize: 0.8125rem
    fontWeight: '600'
    lineHeight: 1rem
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 0.6875rem
    fontWeight: '600'
    lineHeight: 0.875rem
    letterSpacing: 0.04em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  sidebar-width: 16rem
  sidebar-collapsed: 4.5rem
  drawer-width: 30rem
  drawer-width-lg: 40rem
  gutter-table: 0.75rem
  cell-pad-x: 1rem
  cell-pad-y: 0.625rem
  kanban-col-w: 18.5rem
  gap-dashboard: 1.25rem
  pad-card: 1.25rem
---

## Brand & Style

The design system powers an enterprise-grade recruiting and institutional engagement platform tailored for corporate recruiters, corporate venture partners, and academic placement leadership. The interface balances authoritative institutional prestige with the high-speed utility of a modern B2B SaaS workflow. 

### Visual Philosophy & Direction
The design language combines **Modern Corporate Precision** with **Architectural Minimalism**:
- **Utilitarian Rigor:** High data density takes priority over ornamental padding. Recruiter workflows—spanning applicant pipelines, academic credential verifications, and cross-cohort evaluations—require dense visual hierarchy, low-latency legibility, and minimal interaction friction.
- **Institutional Authority:** Anchored by Viridian Teal (`#0E7969`) and deep obsidian slates, the aesthetic moves away from generic neo-fintech blues in favor of an academic, verified, and executive tone.
- **Subtle Modernism:** Clean hairline borders (0.5px–1px), crisp tabular figures, tactile feedback on state transitions, and structured spatial grids keep dense analytical views orderly and fatigue-free.

## Colors

The palette is engineered to support seamless mode-switching between **Alabaster** (Light canvas) and **Obsidian** (Dark canvas), with **Viridian Teal (`#0E7969`)** serving as the persistent interactive anchor across both modes.

### Palette Architecture
- **Primary Accent (`#0E7969`):** Represents institutional authority, interactive actions, focus rings, active pipeline cards, and high-match AI calculations.
- **Secondary Slate (`#1E293B`):** Establishes structural balance for top navbars, sidebar rails, and secondary navigational framing.
- **Tertiary Amber (`#F59E0B`):** Reserved strictly for conditional states, pending verification, medium match scores, and interview reminders.
- **Neutral Core (`#0F172A`):** Powers typography contrasts, table cell strokes, and dark surfaces.

### Semantic Status & Indicators
- **AI Match Score Scaling:**
  - High match (85–100%): Viridian Teal (`#0E7969`).
  - Medium match (65–84%): Amber (`#F59E0B`).
  - Low match (<65%): Crimson (`#E11D48`).
- **Verified Identity:** Cobalt Blue (`#0284C7`) indicator badge to represent verified collegiate transcripts and accredited student records.

## Typography

Typography establishes an uncompromising hierarchy engineered for dense analytical scanning. The combination pairs **Plus Jakarta Sans** for structural headers and brand architecture with **Inter** for dense transactional UI, numeric data tables, and candidate dossiers.

### Typographic Implementation Rules
- **Tabular Numerics:** All numeric metrics, percentages (AI Match meters), timestamps, and candidate counters must render with `font-feature-settings: "tnum" 1, "cv05" 1` to prevent baseline shifting during live sorting or updates.
- **Uppercase Labels:** `label-sm` and `label-md` levels are reserved for table column headers, pipeline column caps, status tags, and score chips; apply uppercase styling with `letterSpacing: 0.04em`.
- **Display Weights:** Use 700 weight sparingly, confined to primary dashboard analytics headers and company profile badges. Keep data table headers at 600 weight and cell body text at 400 or 500 weight.

## Layout & Spacing

The layout is built around an enterprise-grade multi-pane operational grid designed to display large amounts of candidate and institutional data with zero wasted canvas.

### Layout Model
- **Left Navigation Rail:** Persistent left-hand navigation rail with a fixed width of `16rem` (collapsible to `4.5rem` icon-only view for data-heavy views like Kanban boards and candidate tables).
- **Global Header / Context Strip:** Fixed 3.5rem height containing global candidate quick-search, academic year filter, and active role switcher.
- **Main Canvas:** Dynamic flex-grow container with fluid horizontal expansion and internal scroll management per panel.

### Specialized Archetypes
- **Dense Data Tables:** Fixed 40px cell height standard (compact mode: 34px, comfortable mode: 48px), horizontal scrolling enabled on inner table frame with sticky candidate name column.
- **Kanban Board Pipeline:** Horizontal flex track with sticky column headers. Pipeline columns span a fixed `18.5rem` width with a `1rem` gap between stages.
- **Slide-out Candidate Drawer:** Anchored to the right viewport boundary with a standard width of `30rem` (expandable to `40rem` for multi-tab dossier views containing full academic transcripts and code portfolios).
- **Split Messaging / Negotiation Layout:** Two-pane 35/65 split view with a fixed contact list pane and an auto-scrolling thread canvas.

## Elevation & Depth

Visual depth is achieved through **Tonal Layering** and **Subtle Structural Borders**, eschewing high-blur drop shadows in favor of a crisp architectural hierarchy.

### Depth Hierarchy
1. **Level 0 (Canvas Base):** 
   - Light: Alabaster (`#F8FAFC`).
   - Dark: Obsidian (`#090D14`).
2. **Level 1 (Card & Module Layer):** 
   - Metric summaries, table cards, and Kanban columns sit flush against the canvas, delineated by a 1px border (`#E2E8F0` in light, `#1E293B` in dark).
3. **Level 2 (Interactive Floating & Draggable States):**
   - Active Kanban cards during drag operations lift with an ambient shadow: `0 8px 20px -4px rgba(15, 23, 42, 0.08), 0 2px 6px -1px rgba(15, 23, 42, 0.04)`.
   - In Dark mode, drag elevation applies a subtle Viridian outline glow: `0 0 0 1px rgba(14, 121, 105, 0.4), 0 12px 24px -4px rgba(0, 0, 0, 0.5)`.
4. **Level 3 (Slide-Out Contextual Drawers & Popovers):**
   - Candidate slide-out drawers use a hard boundary border: `border-left: 1px solid var(--border-color)` paired with an ambient backdrop scrim (`rgba(15, 23, 42, 0.35)` with `backdrop-filter: blur(4px)`).

## Shapes

The design system adopts a **Soft / Precision Engineering (`roundedness: 1`)** shape language. Tight, disciplined radii reinforce technical authority and support dense tabular displays where large corner radii create dead space.

### Radius Assignments
- **Micro Radii (2px - 4px):** Checkboxes, radio toggles, table selection indicators, inline status chips, AI percentage meter track bars.
- **Standard Radii (6px):** Form input fields, buttons, dropdown menus, Kanban candidate cards, and metric summary tiles.
- **Card & Container Radii (8px):** Primary analytical modules, heatmap wraps, and multi-column pipeline buckets.
- **Slide-out Drawer:** `0px` radius on edge-anchored borders; inner drawer tabs and sub-panels inherit the standard 6px radius.

## Components

### 1. Buttons & Action Triggers
- **Primary CTA:** Solid Viridian Teal (`#0E7969`), white text, 6px border radius, 36px standard height (`px-4 py-2`). Hover state: `#0A5D51`. Active/Pressed: `#08493F`. Focus: 2px offset ring with `rgba(14, 121, 105, 0.4)`.
- **Secondary / Neutral Action:** Border 1px (`#E2E8F0` in light / `#1E293B` in dark), transparent background, text in slate. Hover brings a subtle background tint (`#F1F5F9` in light / `#1E293B` in dark).
- **Ghost / Table Action:** Compact 28px height, 0px border, text muted slate, hover reveals active teal or slate highlight.

### 2. Dense Data Tables
- **Header:** Background `#F1F5F9` (Obsidian: `#0F172A`), uppercase 11px semi-bold text, 1px bottom border, sort indicators aligned to the right edge of column headers.
- **Rows:** Alternating background optional via user toggle; default clean white/obsidian with a 1px border separator (`#E2E8F0` / `#1E293B`). Row hover transitions to `#F8FAFC` (Obsidian: `#141E33`).
- **Cells:** Vertical alignment centered, `px-4 py-2.5`, numeric values right-aligned with monospace font features (`font-mono` / tabular numbers).

### 3. Applicant Tracking Kanban Pipeline
- **Column Header:** 32px height, stage name with candidate count pill (e.g., `Applied [42]`, `Screening [12]`, `Interview [6]`), colored top accent rule (2px) matching pipeline progression.
- **Kanban Card:** White/Obsidian surface, 1px border, 12px internal padding. Shows candidate name, tier-1 institute badge, primary skill tags, days in stage, and the AI Match Meter indicator.

### 4. AI Match Score Meter (0–100%)
- **Micro Meter (Table/Kanban):** Dual-tone inline pill badge. Left icon: Sparkle/Neural icon; Right text: Bold percentage. Accent color coded:
  - `85-100%`: Background `rgba(14, 121, 105, 0.1)`, text `#0E7969`.
  - `65-84%`: Background `rgba(245, 158, 11, 0.1)`, text `#D97706`.
  - `<65%`: Background `rgba(225, 29, 72, 0.1)`, text `#E11D48`.
- **Detail Meter (Candidate Drawer):** Circular progress ring (64px) with centered bold percentage, paired with skill breakdown progress bars (Viridian Teal fill against a `#E2E8F0` / `#1E293B` track).

### 5. Metric Summary Cards
- Compact 16px padding layout. Top: Metric label (12px uppercase) and contextual time filter badge. Middle: 28px bold tabular metric number. Bottom: Trend pill (+14.2% vs last cohort in Viridian Teal, -3.1% in Rose) accompanied by a 40px sparkline.

### 6. Talent Heatmaps & Cohort Skill Matrix
- Square matrix grid cells (32px x 32px) mapping university departments against core competencies.
- Intensity scale using 5 tiers of Viridian Teal: Tier 1 (`#E6F4F1`) to Tier 5 (`#0E7969`). Obsidian dark mode utilizes equivalent opacity steps (`15%` to `100%` teal fill over slate).

### 7. Slide-Out Candidate Detail Drawer
- **Header:** Sticky top, candidate avatar (48px), full name, verified graduation badge, current university, export/action buttons, and stage quick-advancement dropdown.
- **Tab Navigation:** Underlined 32px tab strip (Profile, Academic Transcript, Code / Project Repositories, AI Match Insights, Interview Notes).
- **Footer:** Sticky bottom panel containing one-click outreach, schedule interview, and stage advancement buttons.