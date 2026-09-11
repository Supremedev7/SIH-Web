// ============================================================
// SCI — Status Enums for Applications, Postings, Programs
// ============================================================

// ── Application Status ──
export const APPLICATION_STATUS = {
  APPLIED: "applied",
  UNDER_REVIEW: "under_review",
  SHORTLISTED: "shortlisted",
  INTERVIEW_SCHEDULED: "interview_scheduled",
  INTERVIEWED: "interviewed",
  OFFERED: "offered",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
  WITHDRAWN: "withdrawn",
} as const;

export type ApplicationStatus = (typeof APPLICATION_STATUS)[keyof typeof APPLICATION_STATUS];

export const APPLICATION_STATUS_LABELS: Record<ApplicationStatus, string> = {
  applied: "Applied",
  under_review: "Under Review",
  shortlisted: "Shortlisted",
  interview_scheduled: "Interview Scheduled",
  interviewed: "Interviewed",
  offered: "Offered",
  accepted: "Accepted",
  rejected: "Rejected",
  withdrawn: "Withdrawn",
};

export const APPLICATION_STATUS_COLORS: Record<ApplicationStatus, string> = {
  applied: "blue",
  under_review: "yellow",
  shortlisted: "purple",
  interview_scheduled: "indigo",
  interviewed: "cyan",
  offered: "emerald",
  accepted: "green",
  rejected: "red",
  withdrawn: "gray",
};

// ── Posting Status ──
export const POSTING_STATUS = {
  DRAFT: "draft",
  OPEN: "open",
  CLOSED: "closed",
  FILLED: "filled",
  CANCELLED: "cancelled",
} as const;

export type PostingStatus = (typeof POSTING_STATUS)[keyof typeof POSTING_STATUS];

export const POSTING_STATUS_LABELS: Record<PostingStatus, string> = {
  draft: "Draft",
  open: "Open",
  closed: "Closed",
  filled: "Filled",
  cancelled: "Cancelled",
};

// ── Program Status ──
export const PROGRAM_STATUS = {
  UPCOMING: "upcoming",
  OPEN: "open",
  ACTIVE: "active",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
} as const;

export type ProgramStatus = (typeof PROGRAM_STATUS)[keyof typeof PROGRAM_STATUS];

// ── Location Type ──
export const LOCATION_TYPE = {
  REMOTE: "remote",
  ONSITE: "onsite",
  HYBRID: "hybrid",
} as const;

export type LocationType = (typeof LOCATION_TYPE)[keyof typeof LOCATION_TYPE];

// ── Program Types ──
export const LEARNING_PROGRAM_TYPES = {
  CERTIFICATION: "certification",
  WORKSHOP: "workshop",
  MENTORSHIP: "mentorship",
  TRAINING: "training",
  BOOTCAMP: "bootcamp",
  WEBINAR: "webinar",
  COURSE: "course",
} as const;

export const COLLABORATION_PROGRAM_TYPES = {
  MENTORSHIP: "mentorship",
  WORKSHOP: "workshop",
  GUEST_LECTURE: "guest_lecture",
  HACKATHON: "hackathon",
  INNOVATION_CHALLENGE: "innovation_challenge",
  LIVE_PROJECT: "live_project",
  RESEARCH_COLLAB: "research_collab",
  FDP: "fdp",
  CONSULTANCY: "consultancy",
  INDUSTRIAL_TRAINING: "industrial_training",
} as const;

// ── Target Audience ──
export const TARGET_AUDIENCE = {
  STUDENT: "student",
  ACADEMICIAN: "academician",
  BOTH: "both",
} as const;

export type TargetAudience = (typeof TARGET_AUDIENCE)[keyof typeof TARGET_AUDIENCE];

// ── Career Readiness Levels ──
export const CAREER_READINESS = {
  BEGINNER: "beginner",
  INTERMEDIATE: "intermediate",
  ADVANCED: "advanced",
  INDUSTRY_READY: "industry_ready",
} as const;

export type CareerReadiness = (typeof CAREER_READINESS)[keyof typeof CAREER_READINESS];

export const CAREER_READINESS_LABELS: Record<CareerReadiness, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
  industry_ready: "Industry Ready",
};

export const CAREER_READINESS_COLORS: Record<CareerReadiness, string> = {
  beginner: "red",
  intermediate: "yellow",
  advanced: "blue",
  industry_ready: "green",
};

// ── Document Types ──
export const DOCUMENT_TYPES = {
  RESUME: "resume",
  CERTIFICATE: "certificate",
  INTERNSHIP_REPORT: "internship_report",
  ACADEMIC_RECORD: "academic_record",
  PROJECT_REPORT: "project_report",
  OTHER: "other",
} as const;

export type DocumentType = (typeof DOCUMENT_TYPES)[keyof typeof DOCUMENT_TYPES];

// ── Notification Types ──
export const NOTIFICATION_TYPES = {
  APPLICATION_UPDATE: "application_update",
  NEW_RECOMMENDATION: "new_recommendation",
  DEADLINE_REMINDER: "deadline_reminder",
  NEW_OPPORTUNITY: "new_opportunity",
  MENTOR_FEEDBACK: "mentor_feedback",
  SYSTEM: "system",
  ACHIEVEMENT: "achievement",
} as const;

export type NotificationType = (typeof NOTIFICATION_TYPES)[keyof typeof NOTIFICATION_TYPES];

// ── Assessment Types ──
export const ASSESSMENT_TYPES = {
  TECHNICAL: "technical",
  SOFT: "soft",
  APTITUDE: "aptitude",
  DOMAIN_SPECIFIC: "domain_specific",
  COMBINED: "combined",
} as const;

export type AssessmentType = (typeof ASSESSMENT_TYPES)[keyof typeof ASSESSMENT_TYPES];

// ── Skill Categories ──
export const SKILL_CATEGORIES = {
  TECHNICAL: "technical",
  SOFT: "soft",
  DOMAIN: "domain",
} as const;

export type SkillCategory = (typeof SKILL_CATEGORIES)[keyof typeof SKILL_CATEGORIES];

// ── Gap Priority ──
export const GAP_PRIORITY = {
  CRITICAL: "critical",
  HIGH: "high",
  MEDIUM: "medium",
  LOW: "low",
} as const;

export type GapPriority = (typeof GAP_PRIORITY)[keyof typeof GAP_PRIORITY];

export const GAP_PRIORITY_COLORS: Record<GapPriority, string> = {
  critical: "red",
  high: "orange",
  medium: "yellow",
  low: "green",
};
