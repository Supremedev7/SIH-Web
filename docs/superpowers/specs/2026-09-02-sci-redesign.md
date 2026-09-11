# SCI Portal Redesign Specification: Apex National Collaboration Platform

**Date:** 2026-09-02  
**Status:** Approved  
**Author:** Pair Programming Session  

---

## 1. Objective & Design Philosophy

Redesign the public presence of the **Student Council of India (SCI)** into a state-of-the-art, premier national portal connecting students, educational institutions, industry recruiters, and academic faculty.

### Design Principles (Anti-"AI Slop")
1. **Curated & Authoritative Aesthetics**:
   - Deep navy / slate surface base (`#070B14` in dark mode, `#F8FAFC` in light mode) reflecting an apex national initiative with subtle tricolor micro-accents.
   - Purposeful role color accents:
     - **Students**: Sapphire / Electric Indigo (`#3B82F6` / `#6366F1`)
     - **Institutes**: Warm Ochre / Amber (`#F59E0B` / `#D97706`)
     - **Industry**: Modern Mint / Emerald (`#10B981` / `#059669`)
     - **Faculty**: Royal Violet / Iris (`#8B5CF6` / `#7C3AED`)
2. **Dynamic Micro-Interactions & 60fps Motion**:
   - Marquee tickers for national partner institutions & Fortune 500 enterprises.
   - Floating live badge indicators with soft pulse glows.
   - Real-time interactive simulators (stream search, placement analytics bars, sourcing console simulation).
3. **Mega Menu Navigation**:
   - Unified glassmorphic header across all public routes.
   - 4-column mega menus per role providing deep navigation to every workflow, opportunity catalog, tool, and featured spotlight.

---

## 2. Navigation Architecture (`MegaNavbar`)

### 2.1 Desktop Mega Menu
- **Brand Identity**: SCI Emblem + National Initiative tag + "Student Council of India"
- **Pills**:
  - **Overview**: Direct route to `/`
  - **For Students**: Opens 4-column mega menu:
    - *Col 1 (Skill Development)*: Skill Assessments, AI Skill Profile, Career Guidance, Mock Interview Prep
    - *Col 2 (Opportunities)*: Internship Marketplace, Job Openings, Learning Programs, Applications Tracker
    - *Col 3 (Tools & Portfolio)*: ATS Resume Builder, Digital Portfolio, Skill Radar, AI Recommendations
    - *Col 4 (Featured Spotlight)*: "Live Hackathons — Register by March 15", "24,500+ Active Jobs", and link to `/student`
  - **For Institutes**: Opens 4-column mega menu:
    - *Col 1 (Placement Cell)*: Digital Placement Cell, Campus Drive Scheduling, Automated Offer Management
    - *Col 2 (Analytics & Compliance)*: Placement Analytics, Skill Heatmaps, NAAC/NIRF Accreditation Exporter
    - *Col 3 (Industry Connect)*: Recruiter Outreach, Enterprise Tie-ups, Vetted Audit Reports
    - *Col 4 (Featured Spotlight)*: "Growth Plan ₹49,000/yr", and link to `/institution`
  - **Industry Hub**: Opens 4-column mega menu:
    - *Col 1 (Sourcing & Talent)*: Screened Candidates, Skill-Based Filtering, Campus Drive Management
    - *Col 2 (Recruiting Suite)*: Virtual Interview Platform, Coding Assessment Engine, Bulk Offer Management
    - *Col 3 (Programs & CSR)*: Industry Collaboration, Research & Mentorship, Hackathon Sponsorship
    - *Col 4 (Featured Spotlight)*: "96.8% Average Match Rate", and link to `/industry`
  - **Faculty Cell**: Opens 4-column mega menu:
    - *Col 1 (Synergy & R&D)*: Academia-Industry Research, Patent Filing, Consulting Marketplace
    - *Col 2 (Mentorship & Teaching)*: Student Mentorship Portal, Sabbatical Internships, FDP Workshops
    - *Col 3 (Publications & Reviews)*: Peer Review Network, Publication Hub, Verified Academic Portfolio
    - *Col 4 (Featured Spotlight)*: "50,000+ Active Mentors", and link to `/academician`
- **Actions**:
  - Live metric indicator (`24.5k+ Live Opportunities`)
  - "Log In" secondary button
  - "Register" primary CTA with glowing ambient border
  - Theme Toggle (dark/light)

### 2.2 Mobile Responsive Navigation
- Full-height slide-over drawer with backdrop blur.
- Collapsible role accordions with categorized deep links.
- Quick direct login & registration buttons.

---

## 3. Flagship Pages Specification

### 3.1 Apex Overview Portal (`/` — `src/app/page.tsx`)
- **Government Partnered Banner**: Tricolor badge with pulsing indicator.
- **Hero**: "Empowering India's Future — One Connection at a Time".
- **Interactive 4-Role Switcher**: Live switcher between Student, Institute, Industry, and Faculty paths with dynamic preview card.
- **National Metric Strip**: 5,000+ Institutes, 2M+ Students, 10,000+ Enterprises, 50,000+ Mentors.
- **Partner Marquee**: Infinite smooth scrolling ticker of top institutes & corporates.
- **Path to Unified Growth**: 4-step connected timeline (01 Register, 02 Complete Credentials, 03 Get Best Match, 04 Grow Together).
- **Ecosystem Roles Tabs**: Deep-dive modules for each stakeholder.
- **Verified Testimonials**: NIT Trichy, Tata Group, and BITS Pilani quotes.
- **National Movement CTA & Apex Mega Footer**.

### 3.2 For Students (`/student` — `src/app/(public)/student/page.tsx`)
- **Hero**: "National Placements Directory / Your Career Starts Here".
- **Live Search Filter Console**: Role/Skills search + City selector + "Find Opportunities" CTA.
- **AI Matching Active Live Card**: Floating badge showing 24,500 active jobs.
- **6 Key Features**: AI-Powered Job Matching, Internship Marketplace, Skill Certification, Resume Builder, Mock Interview Prep, Mentor Network.
- **Curated Streams Catalog**: Interactive 8-stream grid with job counts and filter tags.
- **SCI Difference Comparison Table**: Traditional Portals vs. SCI Apex Platform.
- **Placement Offer Stories**: Verified CTC cards (₹32 LPA Google, ₹24 LPA McKinsey, ₹18 LPA Reliance).
- **National Hackathons & Live Job Fairs**: Smart India Hackathon, Apex Tech Placement Fair, AI-Native Products webinar.
- **Student Registration Banner**.

### 3.3 For Institutes (`/institution` — `src/app/(public)/institution/page.tsx`)
- **Hero**: "Transform Campus Placements".
- **Interactive Placement Analytics Widget**: 94.2% placement rate, 148 recruiters, interactive weekly success bar chart.
- **Common Placement Cell Challenges**: Manual processes, limited connections, lack of readiness data.
- **The SCI Apex Solution Suite**: Digital Placement Cell, Industry Pipeline, Readiness Scores, Automated Scheduling, Vetted Reports, Accreditation Support (NAAC & NIRF).
- **Transparent National Pricing Plans**: Starter Free, Growth Plan ₹49,000/yr (Popular), Enterprise Custom.
- **Nationwide Institutes Network**: Coverage across 28 states and top universities (IIT Bombay, NIT Calicut, VIT, DU, DTU, etc.).
- **Institutional Partner CTA**.

### 3.4 Industry Hub (`/industry` — `src/app/(public)/industry/page.tsx`)
- **Hero**: "Corporate Recruiting & Sourcing Hub / Hire India's Best Campus Talent".
- **Candidate Sourcing Console Simulation**: 96.8% match rate, 24,850 vetted candidates, search filter, and candidate preview card.
- **Recruitment Partners Marquee**: TCS, Infosys, Wipro, Deloitte, Amazon India, Flipkart, Zomato, Mahindra.
- **Why Recruiter Teams Trust SCI**: 5k+ Institutes, 94% AI Match, 100% End-to-End Suite.
- **Scalable Sourcing Features**: Campus Drive Management, Virtual Interview Platform, Skill-Based Filtering, Bulk Offer Management, Employer Branding, Diversity Sourcing.
- **4-Step Recruiting Loop & ROI**: 60% Cost Saved, 45% Time Reduced, 3x More Vetted, 500+ Drives.
- **TechCorp Case Study**: 200 engineers hired from 50 campuses in 2 weeks.
- **Sourcing Plans**: Pay-Per-Drive (₹15,000), Annual Partnership (₹1,80,000), Enterprise Custom.
- **Enterprise Partner CTA**.

### 3.5 Faculty Cell (`/academician` — `src/app/(public)/academician/page.tsx`)
- **Hero**: "National Academic-Industry Synergy Cell / Shape Careers. Drive Research. Lead Innovation."
- **Expertise Search Bar**: Keyword input + "Join as Faculty" action.
- **Live Active Counter**: 50,000+ Active Mentors.
- **3 Primary Pillars of Academic Synergy**: Academic Mentor, Industry Researcher, Expert Consultant.
- **Innovation Features**: Student Mentorship Portal, Academia-Industry R&D, Consulting Marketplace, Peer Review Network, Profile & Portfolio Hub, Publication Hub.
- **Unified R&D Corporate Collaboration**: Research focus streams (AI/ML, Biotech, Sustainability) + National stats (10k+ mentored, 2,000+ papers, 500+ projects, 50+ patents).
- **Prominent Faculty Mentors**: Testimonials from IIT Delhi, BITS Pilani, and NIT Trichy faculty.
- **Faculty Development & Training (FDP)**: Specialized Workshops, Sabbatical Internships, National Conferences.
- **Faculty Join CTA**.

---

## 4. Shared Components & CSS Utilities

- `src/components/layout/mega-navbar.tsx`: Unified header with mega menu & mobile drawer.
- `src/components/layout/public-footer.tsx`: Apex multi-column footer with government disclaimer and deep links.
- `src/components/shared/partner-marquee.tsx`: Infinite 60fps CSS ticker.
- `src/components/shared/stats-counter.tsx`: Counter display with live status badges.
- `src/lib/constants/public-navigation.ts`: Structured data for all role links, descriptions, badges, and spotlight banners.
- `src/app/globals.css`: Enhanced animations (`@keyframes marquee`, `@keyframes float`, `@keyframes pulse-glow`, `@keyframes shimmer`).
