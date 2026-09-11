# Architecture Specification: Student-Role Internal Workflow (SCI Platform)

> **Document ID**: `SCI-SPEC-STU-001`  
> **Status**: APPROVED ARCHITECTURE  
> **Author**: Antigravity Engineering & Product Architecture  
> **Target Platform**: Next.js 15+ App Router, Supabase (PostgreSQL 16 + RLS), Gemini API (`@google/genai`), Tailwind CSS v4, Recharts, Zustand  

---

## 1. Executive Summary & Vision

The **Student Role Portal** within the Student Council of India (SCI) platform serves as the central engine for **competency discovery, algorithmic matching, and verified placement execution**. Unlike legacy job boards where students blindly blast unformatted PDFs to blackhole portals, SCI operates on a **verified-credential, skill-indexed model**.

Every student's profile is anchored by:
1. **Institutional Verification** (verified enrollment by College/University T&P Cell).
2. **Standardized Objective Assessments** (adaptive technical, aptitude, and domain tests).
3. **AI-Driven Competency Gap Diagnosis** (Gemini 2.5 real-time comparison against live industry hiring cutoffs).
4. **Verifiable Digital Portfolio & ATS Engine** (cryptographically verifiable public URL + Harvard-standard ATS PDF generator).
5. **1-Click Application State Machine** (strict multi-offer governance complying with national T&P regulations).

---

## 2. End-to-End Student Lifecycle Architecture

The following state diagram illustrates the student journey from onboarding to placement and alumni transition:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ STAGE 1: ONBOARDING & AFFILIATION                                                      │
│ - Supabase Auth registration with role = "student"                                     │
│ - AISHE-indexed College, Degree, Branch, CGPA & Batch selection                        │
│ - Student ID / Transcript upload -> Pending T&P verification                           │
└──────────────────────────────────────────┬─────────────────────────────────────────────┘
                                           │
                                           ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ STAGE 2: DIAGNOSTIC SKILL ASSESSMENT                                                   │
│ - Diagnostic Battery: Aptitude + Core CS/Domain + Applied Frameworks                   │
│ - Proctoring safeguards: Fullscreen lock, blur counter, anti-paste                      │
│ - Raw score ingestion into `skill_assessments` table                                   │
└──────────────────────────────────────────┬─────────────────────────────────────────────┘
                                           │
                                           ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ STAGE 3: AI SKILL GAP RADAR & PROFILE GENERATION                                       │
│ - Vectorization of scores into normalized categories (0–100 scale)                     │
│ - Gemini API analyzes scores against target industry role profiles                     │
│ - Dynamic Recharts Radar Chart + Strengths & Priority Gap action list                  │
└──────────────────────────────────────────┬─────────────────────────────────────────────┘
                                           │
                                           ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ STAGE 4: PERSONALIZED LEARNING & MENTORSHIP                                            │
│ - Curated pathways: NPTEL, SWAYAM, Coursera, freeCodeCamp modules                      │
│ - 1-on-1 Faculty & Corporate Mentor booking (`mentor_feedback` logging)                │
│ - Milestone completion boosts AI verification index                                    │
└──────────────────────────────────────────┬─────────────────────────────────────────────┘
                                           │
                                           ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ STAGE 5: VERIFIED DIGITAL PORTFOLIO & ATS RESUME BUILDER                               │
│ - Public verified showcase URL (`sci.gov.in/u/[username]`) with QR proof                │
│ - Automated Harvard/Wall-Street single-column ATS resume generator                     │
│ - Real-time keyword density score against target job description                       │
└──────────────────────────────────────────┬─────────────────────────────────────────────┘
                                           │
                                           ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ STAGE 6: OPPORTUNITY DISCOVERY & AI MATCHING                                           │
│ - Real-time cosine/weighted match algorithm (Student Skills vs Job Requirements)       │
│ - Badges: "98% Match - Top 5% Candidate", "Missing 1 Prerequisite"                     │
│ - Filter by On-Campus Exclusive Drives vs National Pool Drives                         │
└──────────────────────────────────────────┬─────────────────────────────────────────────┘
                                           │
                                           ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ STAGE 7: 1-CLICK APPLICATION & TELEMETRY TRACKER                                       │
│ - Instant submission (Attaches verified profile, selected ATS resume, cover brief)      │
│ - State tracking: APPLIED -> REVIEWED -> TEST_SHORTLIST -> INTERVIEW -> OFFER -> ACCEPT│
│ - Realtime Supabase change notifications to student UI                                 │
└──────────────────────────────────────────┬─────────────────────────────────────────────┘
                                           │
                                           ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ STAGE 8: VIRTUAL INTERVIEW ENGINE & HACKATHONS                                         │
│ - In-browser code editor for technical interviews with live test evaluation            │
│ - Gemini Behavioral Interview Simulator (STAR method prompt feedback)                  │
│ - National Smart India Hackathon team formation & project repository sync              │
└──────────────────────────────────────────┬─────────────────────────────────────────────┘
                                           │
                                           ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ STAGE 9: OFFER MANAGEMENT & MULTI-OFFER COMPLIANCE                                     │
│ - Verified Offer Letter receipt with transparent CTC breakdown (Base + RSUs + Bonus)   │
│ - T&P Cell Dream-Offer policy enforcement (preventing offer hoarding)                  │
│ - Digital Offer Acceptance with cryptographic Joining Pass issuance                    │
└──────────────────────────────────────────┬─────────────────────────────────────────────┘
                                           │
                                           ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ STAGE 10: ALUMNI TRANSITION & LIFETIME ACCREDITATION                                   │
│ - Transition to Alumni Mentor status post-graduation                                   │
│ - Permanent verifiable credential ledger (verifiable by foreign universities/WES)      │
│ - Referral sharing for junior cohorts                                                  │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Database Schema & State Machines

### 3.1 Core Database Tables

| Table Name | Primary Purpose | Key Fields |
|---|---|---|
| `user_profiles` | Root stakeholder identity | `id`, `auth_id`, `role`, `full_name`, `email`, `phone`, `avatar_url`, `created_at` |
| `student_profiles` | Academic & verified placement record | `id`, `user_id`, `institution_id`, `usn_roll_no`, `degree`, `branch`, `cgpa`, `graduation_year`, `is_institution_verified`, `resume_url`, `portfolio_slug` |
| `assessment_templates` | Standardized test definitions | `id`, `title`, `description`, `category`, `time_limit_minutes`, `total_questions`, `passing_score`, `questions_jsonb` |
| `skill_assessments` | Individual assessment attempt records | `id`, `student_id`, `template_id`, `score`, `max_score`, `percentage`, `answers_jsonb`, `proctoring_flags_jsonb`, `completed_at` |
| `skill_profiles` | Aggregated competency matrix | `id`, `student_id`, `category_scores_jsonb`, `overall_percentile`, `last_evaluated_at` |
| `skill_gaps` | AI-generated gap diagnosis | `id`, `student_id`, `target_role`, `strengths_jsonb`, `gaps_jsonb`, `recommended_resources_jsonb`, `gemini_raw_response` |
| `job_listings` | Active opportunities from Industry & T&P | `id`, `employer_id`, `title`, `company_name`, `job_type`, `location_type`, `ctc_range`, `required_skills_jsonb`, `eligibility_criteria_jsonb` |
| `job_applications` | Application state machine records | `id`, `job_id`, `student_id`, `status`, `match_score`, `resume_url`, `timeline_jsonb`, `created_at`, `updated_at` |
| `mentor_feedback` | Session notes from Faculty/Industry | `id`, `student_id`, `mentor_id`, `session_date`, `technical_score`, `soft_skill_score`, `recommendations` |
| `placement_offers` | Formal offer letters & compliance records | `id`, `application_id`, `student_id`, `company_name`, `ctc_lpa`, `breakdown_jsonb`, `compliance_status`, `accepted_at` |

### 3.2 Application State Machine

Each application undergoes strict deterministic state transitions:

```
┌─────────┐     ┌──────────┐     ┌────────────────┐     ┌───────────┐
│ APPLIED │ ──> │ REVIEWED │ ──> │ TEST_SCHEDULED │ ──> │ INTERVIEW │
└─────────┘     └──────────┘     └────────────────┘     └───────────┘
     │               │                   │                    │
     ▼               ▼                   ▼                    ▼
┌──────────┐    ┌──────────┐       ┌──────────┐         ┌───────────┐
│ REJECTED │    │ REJECTED │       │ REJECTED │         │  OFFERED  │
└──────────┘    └──────────┘       └──────────┘         └───────────┘
                                                              │
                                                ┌─────────────┴─────────────┐
                                                ▼                           ▼
                                         ┌─────────────┐             ┌─────────────┐
                                         │  ACCEPTED   │             │  DECLINED   │
                                         └─────────────┘             └─────────────┘
```

---

## 4. Frontend Route Hierarchy (`/dashboard/student`)

The Student portal is divided into dedicated functional modules:

```
src/app/(dashboard)/student/
├── page.tsx                           # Master Overview (Telemetry, Next Deadlines, Profile Strength)
├── assessment/
│   ├── page.tsx                       # Assessment Hub (Available Tests, History, Cutoffs)
│   ├── take/[templateId]/page.tsx     # Timed Test Runner with Proctoring Sandbox
│   └── results/[id]/page.tsx          # Score Breakdown & Topic Analysis
├── skill-profile/
│   └── page.tsx                       # Interactive Recharts Radar Chart & AI Gap Analyzer
├── learning/
│   ├── page.tsx                       # Curated Learning Pathways & Certifications
│   └── mentor/page.tsx                # Faculty & Corporate 1-on-1 Mentor Scheduler
├── portfolio/
│   ├── page.tsx                       # Verified Digital Showcase & Project Showcase
│   └── resume-builder/page.tsx        # 1-Click ATS Single-Column PDF Generator
├── jobs/
│   ├── page.tsx                       # Intelligent Opportunity Feed with Live Match Scores
│   └── [id]/page.tsx                  # Deep Job Specification, Prerequisite Audit & 1-Click Apply
├── applications/
│   └── page.tsx                       # Real-Time Kanban Application Tracker & History Log
├── interviews/
│   ├── page.tsx                       # Scheduled Rounds Calendar & Video Links
│   └── mock-ai/page.tsx               # Gemini Behavioral STAR Mock Interview Practice
└── settings/
    └── page.tsx                       # Academic Info, Notification Settings, Privacy Controls
```

---

## 5. AI Engine & Algorithm Specifications

### 5.1 Real-Time Match Score Calculation
The match engine executes a two-tier hybrid calculation:

1. **Deterministic Skill Vector Matching**:
   $$\text{SkillMatch} = \frac{\sum_{s \in S_{\text{req}}} w_s \cdot \min\left(1, \frac{\text{StudentScore}(s)}{\text{ReqScore}(s)}\right)}{\sum_{s \in S_{\text{req}}} w_s} \times 70\%$$
2. **Academic & Eligibility Fit**:
   $$\text{EligibilityMatch} = (\text{CGPA} \ge \text{MinCGPA} \ ? \ 15\% : 0\%) + (\text{Batch} == \text{ReqBatch} \ ? \ 15\% : 0\%)$$
3. **Total Match Score**:
   $$\text{TotalScore} = \text{SkillMatch} + \text{EligibilityMatch} \quad (0 \text{ to } 100\%)$$

### 5.2 Gemini AI Skill Gap Analysis Prompt Architecture
When an assessment is completed or target role updated, the backend invokes Gemini 2.5:

```typescript
const prompt = `
System: You are the Senior Technical Career Architect for the Student Council of India (SCI).
Analyze the following student assessment competency profile:
Target Role: "${targetRole}"
Current Competency Scores: ${JSON.stringify(categoryScores)}
Available Course Catalog: NPTEL, Coursera, freeCodeCamp, UGC Modules

Output strict JSON conforming to schema:
{
  "strengths": ["Top 3 verified core competencies"],
  "gaps": [
    {
      "skill": "Specific gap area",
      "severity": "critical" | "moderate" | "minor",
      "currentScore": number,
      "requiredScore": number,
      "impact": "Why this blocks target role hiring",
      "remedy": "Specific 2-week learning action plan",
      "recommended_resources": [
        {"title": "Resource Name", "provider": "NPTEL/Coursera", "url": "..."}
      ]
    }
  ],
  "estimatedTimeToRoleReadyWeeks": number,
  "summary": "2-sentence encouraging executive analysis"
}
`;
```

---

## 6. Implementation Milestones

| Milestone | Deliverables | Status |
|---|---|---|
| **M1: Core Onboarding & Auth** | Unified & role-specific sign-in/up, college affiliation dropdown, profile schema | **COMPLETE** |
| **M2: Assessment Runner** | Question engine, timer, proctor flags, automatic grading into `skill_assessments` | **COMPLETE** |
| **M3: Competency Radar & AI Gaps** | Recharts Radar Chart, `@google/genai` gap generator with fallback rules | **COMPLETE** |
| **M4: ATS Resume & Portfolio** | Dynamic Harvard-style ATS resume generator, verifiable public portfolio slug | Planned |
| **M5: Job Feed & Match Scoring** | Filterable opportunity catalog, real-time match percentage calculation, 1-click apply | **COMPLETE** |
| **M6: Telemetry Kanban** | Live application status tracker, status change history, real-time alerts | **COMPLETE** |
| **M7: Mock AI Interview Engine** | Gemini interactive behavioral practice simulator with STAR grading | Planned |
| **M8: Multi-Offer Compliance** | T&P dream offer verification, digital offer acceptance pass | Planned |
