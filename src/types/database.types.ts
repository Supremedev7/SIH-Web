// ============================================================
// SCI — TypeScript Types for Database Entities
// ============================================================

import type {
  ApplicationStatus,
  AssessmentType,
  CareerReadiness,
  DocumentType,
  GapPriority,
  LocationType,
  NotificationType,
  PostingStatus,
  ProgramStatus,
  SkillCategory,
  TargetAudience,
} from "@/lib/constants/status";
import type { UserRole } from "@/lib/constants/roles";

// ── Institution ──
export interface Institution {
  id: string;
  name: string;
  code: string | null;
  type: "university" | "college" | "polytechnic" | "institute";
  location: string | null;
  state: string | null;
  city: string | null;
  pincode: string | null;
  website: string | null;
  logoUrl: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  settings: Record<string, unknown> | null;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

// ── Industry / Company ──
export interface Industry {
  id: string;
  companyName: string;
  industrySector: string | null;
  companySize: "startup" | "sme" | "large" | "mnc" | null;
  website: string | null;
  logoUrl: string | null;
  description: string | null;
  headquarters: string | null;
  locations: string | null;
  contactEmail: string | null;
  contactPerson: string | null;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

// ── Department ──
export interface Department {
  id: string;
  institutionId: string;
  name: string;
  code: string;
  hodName: string | null;
  isActive: boolean;
}

// ── Skill Assessment ──
export interface SkillAssessment {
  id: string;
  userId: string;
  assessmentType: AssessmentType;
  questionsSnapshot: unknown;
  responses: Record<string, unknown>;
  categoryScores: Record<string, number>;
  overallScore: number;
  timeTakenSeconds: number | null;
  attemptNumber: number;
  startedAt: string | null;
  completedAt: string | null;
  createdAt: string;
}

// ── Skill Profile ──
export interface SkillProfile {
  id: string;
  userId: string;
  technicalSkills: Record<string, number>;
  softSkills: Record<string, number>;
  domainSkills: Record<string, number>;
  strengths: string[];
  weaknesses: string[];
  employabilityScore: number;
  careerReadiness: CareerReadiness;
  industryAlignment: Record<string, number>;
  lastAssessedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

// ── Skill Gap ──
export interface SkillGap {
  id: string;
  skillProfileId: string;
  skillName: string;
  category: SkillCategory;
  currentLevel: number;
  requiredLevel: number;
  gapScore: number;
  priority: GapPriority;
  recommendedResources: RecommendedResource[];
  identifiedAt: string;
}

export interface RecommendedResource {
  title: string;
  type: "course" | "certification" | "tutorial" | "book" | "practice";
  url?: string;
  platform?: string;
  isFree?: boolean;
}

// ── Internship ──
export interface Internship {
  id: string;
  industryId: string;
  title: string;
  description: string;
  responsibilities: string | null;
  requiredSkills: Record<string, number>;
  preferredSkills: Record<string, number> | null;
  duration: string;
  stipend: string | null;
  locationType: LocationType;
  location: string | null;
  maxApplicants: number | null;
  applicationDeadline: string | null;
  startDate: string | null;
  endDate: string | null;
  targetAudience: TargetAudience;
  status: PostingStatus;
  eligibility: Record<string, unknown> | null;
  viewsCount: number;
  createdAt: string;
  updatedAt: string;
  // Joined fields
  industry?: Industry;
  matchScore?: number;
}

// ── Job Posting ──
export interface JobPosting {
  id: string;
  industryId: string;
  title: string;
  description: string;
  responsibilities: string | null;
  requiredSkills: Record<string, number>;
  qualifications: Record<string, unknown> | null;
  experienceLevel: string;
  salaryRange: string | null;
  employmentType: "full-time" | "part-time" | "contract";
  locationType: LocationType;
  location: string | null;
  maxApplicants: number | null;
  applicationDeadline: string | null;
  status: PostingStatus;
  eligibility: Record<string, unknown> | null;
  viewsCount: number;
  createdAt: string;
  updatedAt: string;
  // Joined fields
  industry?: Industry;
  matchScore?: number;
}

// ── Application ──
export interface Application {
  id: string;
  userId: string;
  internshipId: string | null;
  jobId: string | null;
  status: ApplicationStatus;
  coverLetter: string | null;
  resumeUrl: string | null;
  additionalDocs: string[] | null;
  recruiterNotes: Record<string, unknown> | null;
  skillMatchScore: number | null;
  appliedAt: string;
  lastStatusChange: string | null;
  createdAt: string;
  updatedAt: string;
  // Joined fields
  internship?: Internship;
  job?: JobPosting;
}

// ── Learning Program ──
export interface LearningProgram {
  id: string;
  industryId: string;
  title: string;
  description: string;
  programType: string;
  skillsCovered: string[];
  duration: string | null;
  cost: string | null;
  isFree: boolean;
  url: string | null;
  platform: string | null;
  maxParticipants: number | null;
  startDate: string | null;
  endDate: string | null;
  registrationDeadline: string | null;
  status: ProgramStatus;
  targetAudience: TargetAudience;
  createdAt: string;
  updatedAt: string;
  // Joined
  industry?: Industry;
}

// ── Collaboration Program ──
export interface CollaborationProgram {
  id: string;
  industryId: string;
  title: string;
  description: string;
  programType: string;
  requirements: Record<string, unknown> | null;
  deliverables: string[] | null;
  duration: string | null;
  startDate: string | null;
  endDate: string | null;
  applicationDeadline: string | null;
  maxParticipants: number | null;
  targetAudience: TargetAudience;
  status: ProgramStatus;
  location: string | null;
  mode: "online" | "offline" | "hybrid";
  createdAt: string;
  updatedAt: string;
  // Joined
  industry?: Industry;
}

// ── Digital Portfolio ──
export interface DigitalPortfolio {
  id: string;
  userId: string;
  verifiedSkills: VerifiedSkill[];
  certifications: Certification[];
  projects: Project[];
  internshipRecords: InternshipRecord[];
  achievements: Achievement[];
  education: Education[];
  workExperience: WorkExperience[];
  personalStatement: string | null;
  portfolioUrl: string | null;
  isPublic: boolean;
  profileCompleteness: number;
  createdAt: string;
  updatedAt: string;
}

export interface VerifiedSkill {
  name: string;
  source: string;
  dateVerified: string;
  level: number;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  url?: string;
  isVerified: boolean;
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  url?: string;
  media?: string[];
  startDate?: string;
  endDate?: string;
}

export interface InternshipRecord {
  company: string;
  role: string;
  duration: string;
  description?: string;
  isVerified: boolean;
}

export interface Achievement {
  title: string;
  description: string;
  date: string;
  type: "award" | "competition" | "publication" | "other";
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
  cgpa?: string;
  specialization?: string;
}

export interface WorkExperience {
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

// ── Recommendation ──
export interface Recommendation {
  id: string;
  userId: string;
  skillProfileId: string;
  recommendationType: "internship" | "job" | "course" | "certification" | "career_path";
  targetId: string;
  targetTable: string;
  matchScore: number;
  reasoning: string;
  matchingSkills: string[];
  missingSkills: string[];
  isDismissed: boolean;
  generatedAt: string;
  expiresAt: string | null;
}

// ── Notification ──
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  notificationType: NotificationType;
  channel: "in_app" | "email" | "both";
  isRead: boolean;
  actionUrl: string | null;
  metadata: Record<string, unknown> | null;
  createdAt: string;
  readAt: string | null;
}

// ── Mentor Feedback ──
export interface MentorFeedback {
  id: string;
  applicationId: string;
  mentorId: string;
  menteeId: string;
  rating: number;
  feedbackText: string;
  skillRatings: Record<string, number> | null;
  milestones: Milestone[];
  feedbackType: "progress" | "mid_term" | "final";
  createdAt: string;
}

export interface Milestone {
  title: string;
  status: "pending" | "in_progress" | "completed";
  date?: string;
}

// ── Document ──
export interface Document {
  id: string;
  userId: string;
  fileName: string;
  fileUrl: string;
  documentType: DocumentType;
  mimeType: string;
  fileSizeBytes: number;
  isVerified: boolean;
  verifiedBy: string | null;
  metadata: Record<string, unknown> | null;
  uploadedAt: string;
}

// ── Career Path ──
export interface CareerPath {
  id: string;
  title: string;
  industrySector: string;
  description: string;
  requiredSkills: Record<string, number>;
  recommendedCertifications: string[];
  salaryInsights: {
    entry: string;
    mid: string;
    senior: string;
  };
  growthTrajectory: {
    role: string;
    yearsExperience: string;
  }[];
  relatedPaths: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// ── Assessment Template ──
export interface AssessmentTemplate {
  id: string;
  title: string;
  description: string;
  assessmentType: AssessmentType;
  industrySector: string | null;
  questions: AssessmentQuestion[];
  timeLimitMinutes: number | null;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface AssessmentQuestion {
  id: string;
  text: string;
  type: "multiple_choice" | "rating" | "true_false" | "text";
  category: SkillCategory;
  skillName: string;
  options?: { label: string; value: string; score: number }[];
  maxScore: number;
  timeLimit?: number; // seconds, for aptitude
}

// ── Pagination ──
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ── API Response ──
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
export type Database = any;
