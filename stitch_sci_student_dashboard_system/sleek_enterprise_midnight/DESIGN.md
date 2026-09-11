---
name: Sleek Enterprise Midnight
colors:
  surface: '#0f131c'
  surface-dim: '#0f131c'
  surface-bright: '#353943'
  surface-container-lowest: '#0a0e17'
  surface-container-low: '#181b25'
  surface-container: '#1c1f29'
  surface-container-high: '#262a34'
  surface-container-highest: '#31353f'
  on-surface: '#dfe2ef'
  on-surface-variant: '#c7c4d7'
  inverse-surface: '#dfe2ef'
  inverse-on-surface: '#2c303a'
  outline: '#908fa0'
  outline-variant: '#464554'
  surface-tint: '#c0c1ff'
  primary: '#c0c1ff'
  on-primary: '#1000a9'
  primary-container: '#8083ff'
  on-primary-container: '#0d0096'
  inverse-primary: '#494bd6'
  secondary: '#4edea3'
  on-secondary: '#003824'
  secondary-container: '#00a572'
  on-secondary-container: '#00311f'
  tertiary: '#ffb783'
  on-tertiary: '#4f2500'
  tertiary-container: '#d97721'
  on-tertiary-container: '#452000'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffdcc5'
  tertiary-fixed-dim: '#ffb783'
  on-tertiary-fixed: '#301400'
  on-tertiary-fixed-variant: '#703700'
  background: '#0f131c'
  on-background: '#dfe2ef'
  surface-variant: '#31353f'
  surface-canvas: '#090D16'
  surface-low: '#0F172A'
  surface-card: '#131C31'
  surface-high: '#1E293B'
  text-primary: '#F8FAFC'
  text-secondary: '#94A3B8'
  text-muted: '#64748B'
  border-subtle: '#1E293B'
  border-glow: rgba(255, 255, 255, 0.08)
  indigo-light: '#818CF8'
  emerald-light: '#34D399'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
    letterSpacing: -0.025em
  display-lg-mobile:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Geist
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Geist
    fontSize: 26px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Geist
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Geist
    fontSize: 22px
    fontWeight: '500'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 24px
  body-lg:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.06em
  code-snippet:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  space-2xs: 0.25rem
  space-xs: 0.5rem
  space-sm: 0.75rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
  space-3xl: 4rem
  container-max: 1280px
  gutter-desktop: 1.5rem
  gutter-mobile: 1rem
---

# SCI Platform - Master Design & Architecture (Dark Mode)
## 1. Brand & Global Constraints
- **Brand Name:** SCI (Strictly "SCI").
- **Vibe:** Government-partnered, enterprise-grade, clean, authoritative, Silicon Valley / Vercel-tier sleekness.
- **Theme:** Dark Mode (Deep slate/zinc charcoal neutral base with high contrast, ultra-clean borders, subtle surface elevation).
## 2. Design Tokens (Colors)
**Dark Neutrals:**
- Background / Canvas: `#090D16` (Deep Midnight Obsidian)
- Surface Container Low: `#0F172A` (Slate 900)
- Surface / Cards: `#131C31` or `#0F172A` with subtle top highlight and border (`border: 1px solid rgba(255,255,255,0.08); box-shadow: 0 4px 20px rgba(0,0,0,0.4);`)
- Surface Container High / Hover: `#1E293B` (Slate 800)
- Primary Text (Headings/H1/H2): `#F8FAFC` (Slate 50)
- Secondary Text (Body): `#94A3B8` (Slate 400)
- Muted / Caption Text: `#64748B` (Slate 500)
- Borders / Dividers: `#1E293B` or `rgba(255,255,255,0.1)`
**Role Accents:**
- **Student Path:** Electric Royal Indigo (`#6366F1` to `#818CF8`)
- **Success / Verified:** Emerald Green (`#10B981` / `#34D399`) with subtle glow or `rgba(16,185,129,0.15)` chip backgrounds
**Buttons:**
- Primary: Solid Electric Indigo (`#6366F1`), text `#FFFFFF`, rounded-lg / rounded-xl, subtle hover brightness.
- Secondary: Dark transparent with border `rgba(255,255,255,0.12)`, text `#F8FAFC`, hover `bg-slate-800`.
