// ============================================================
// Student Portal — Typed Props & Data Interfaces
// ============================================================
// These interfaces replace all `any` types across student portal
// client components, ensuring type safety end-to-end.

// ── Dashboard ──

export interface DashboardUserProfile {
  full_name: string;
  metadata: Record<string, unknown> | null;
}

export interface DashboardSkillProfile {
  employability_score: number;
}

export interface DashboardJobMatch {
  id: string;
  title: string;
  stipend_salary_range: string | null;
  type: string;
  location: string | null;
  is_remote: boolean;
  required_skills: Record<string, string> | null;
  employer_id: string;
  employer: {
    full_name: string;
  };
}

export interface DashboardApplication {
  id: string;
  status: string;
  created_at: string;
  job_listings: {
    title: string;
    employer_id: string;
    employer: {
      full_name: string;
    };
  };
}

export interface DashboardStats {
  totalApplications: number;
  upcomingAssessments: number;
  unreadNotifications: number;
  skillGapsCount: number;
  percentileRank: string;
}

export interface StudentDashboardProps {
  userProfile: DashboardUserProfile | null;
  skillProfile: DashboardSkillProfile | null;
  applications: DashboardApplication[];
  jobMatches: DashboardJobMatch[];
  stats: DashboardStats;
}

// ── Skills ──

export interface SkillProfileData {
  employability_score: number;
  technical_skills: Record<string, number>;
  soft_skills: Record<string, number>;
  domain_skills: Record<string, number>;
  strengths: string[];
  weaknesses: string[];
  career_readiness: string;
  industry_alignment: Record<string, number>;
  last_assessed_at: string | null;
}

export interface SkillGapData {
  id: string;
  skill_name: string;
  category: string;
  current_level: number;
  required_level: number;
  gap_score: number;
  priority: string;
  recommended_resources: RecommendedResourceData[];
}

export interface RecommendedResourceData {
  title: string;
  type: string;
  url?: string;
  platform?: string;
  is_free?: boolean;
}

export interface SkillsPageProps {
  profile: SkillProfileData | null;
  gaps: SkillGapData[];
}

// ── Assessments ──

export interface AssessmentTemplateData {
  title: string;
  description: string;
  duration_minutes: number | null;
}

export interface AssessmentData {
  id: string;
  assessment_type: string;
  overall_score: number | null;
  category_scores: Record<string, number> | null;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
  assessment_templates: AssessmentTemplateData | null;
}

export interface AssessmentsPageProps {
  assessments: AssessmentData[];
}

// ── Opportunities ──

export interface JobEmployer {
  company_name: string | null;
  industry_sector: string | null;
}

export interface JobListingData {
  id: string;
  title: string;
  type: string;
  location: string | null;
  is_remote: boolean;
  stipend_salary_range: string | null;
  required_skills: Record<string, string> | null;
  status: string;
  created_at: string;
  employer_id: string;
  employer: JobEmployer | null;
  hasApplied: boolean;
  matchScore?: number;
}

export interface OpportunitiesPageProps {
  jobs: JobListingData[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
}

// ── Profile ──

export interface ProfileInstitution {
  name: string;
}

export interface UserProfileData {
  full_name: string;
  bio: string | null;
  phone: string | null;
  department: string | null;
  designation: string | null;
  avatar_url: string | null;
  metadata: Record<string, unknown> | null;
  institutions: ProfileInstitution | null;
}

export interface ProfilePageProps {
  profile: UserProfileData | null;
  email: string | null;
}

// ── Messaging ──

export interface MessageOtherUser {
  full_name: string;
  role: string;
}

export interface MessageData {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  is_read: boolean;
  created_at: string;
  other_user: MessageOtherUser | null;
}

export interface MessagingPageProps {
  currentUserId: string;
  initialMessages: MessageData[];
}

// ── Notifications ──

export interface NotificationData {
  id: string;
  title: string;
  description: string | null;
  type: string;
  is_unread: boolean;
  created_at: string;
}

export interface NotificationsPageProps {
  initialNotifications: NotificationData[];
}

// ── Credentials ──

export interface CredentialData {
  id: string;
  name: string;
  issuer: string;
  credential_type: string;
  issued_at: string;
  expires_at: string | null;
  credential_url: string | null;
  is_verified: boolean;
}

export interface CredentialsProfileData {
  full_name: string;
  department?: string | null;
  designation?: string | null;
  bio?: string | null;
  metadata?: Record<string, unknown> | null;
}

export interface CredentialsSkillData {
  technical_skills?: Record<string, any> | any[] | null;
  employability_score?: number | null;
}

export interface CredentialsPageProps {
  profile: CredentialsProfileData | null;
  credentials: CredentialData[];
  skillProfile: CredentialsSkillData | null;
  email: string | null;
}

// ── Settings ──

export interface SettingsPageProps {
  profile: (UserProfileData & { email?: string }) | null;
}
