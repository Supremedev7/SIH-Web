// ============================================================
// SCI — Role Definitions & Permission Matrix
// ============================================================

export const ROLES = {
  STUDENT: "student",
  ACADEMICIAN: "academician",
  INDUSTRY: "industry",
  INSTITUTION: "institution",
} as const;

export type UserRole = (typeof ROLES)[keyof typeof ROLES];

export const ROLE_LABELS: Record<UserRole, string> = {
  student: "Student",
  academician: "Academician",
  industry: "Industry Partner",
  institution: "Institution",
};

export const ROLE_DESCRIPTIONS: Record<UserRole, string> = {
  student: "Access skill assessments, apply for internships & jobs, build your portfolio",
  academician: "Explore faculty internships, FDPs, consultancy & research opportunities",
  industry: "Post internships, jobs, programs & collaborate with academia",
  institution: "Monitor students, track placements & view analytics dashboards",
};

export const ROLE_ICONS: Record<UserRole, string> = {
  student: "GraduationCap",
  academician: "BookOpen",
  industry: "Building2",
  institution: "School",
};

export const ROLE_COLORS: Record<UserRole, string> = {
  student: "blue",
  academician: "purple",
  industry: "emerald",
  institution: "amber",
};

/**
 * Route prefix for each role's dashboard.
 */
export const ROLE_DASHBOARD_PREFIX: Record<UserRole, string> = {
  student: "/dashboard/student",
  academician: "/dashboard/faculty",
  industry: "/dashboard/industry",
  institution: "/dashboard/institute",
};

/**
 * Permissions matrix — which resources each role can access.
 */
export const PERMISSIONS: Record<UserRole, string[]> = {
  student: [
    "assessment:take",
    "assessment:view_own",
    "skill_profile:view_own",
    "internship:browse",
    "internship:apply",
    "job:browse",
    "job:apply",
    "application:view_own",
    "application:withdraw",
    "learning:browse",
    "learning:enroll",
    "portfolio:manage_own",
    "portfolio:view_public",
    "recommendation:view_own",
    "document:upload_own",
    "document:view_own",
    "notification:view_own",
    "career_guidance:view",
  ],
  academician: [
    "internship:browse",
    "internship:apply",
    "fdp:browse",
    "fdp:enroll",
    "consultancy:browse",
    "consultancy:apply",
    "research:browse",
    "research:apply",
    "workshop:browse",
    "workshop:apply",
    "application:view_own",
    "profile:manage_own",
    "document:upload_own",
    "document:view_own",
    "notification:view_own",
  ],
  industry: [
    "internship:create",
    "internship:manage_own",
    "internship:view_applicants",
    "job:create",
    "job:manage_own",
    "job:view_applicants",
    "candidate:search",
    "candidate:shortlist",
    "application:update_status",
    "program:create",
    "program:manage_own",
    "collaboration:create",
    "collaboration:manage_own",
    "mentorship:give_feedback",
    "analytics:view_own",
    "document:view_applicant",
    "notification:view_own",
  ],
  institution: [
    "student:view_all",
    "student:view_progress",
    "skill_analytics:view",
    "placement:view_analytics",
    "internship:view_analytics",
    "department:manage",
    "department:view_analytics",
    "report:generate",
    "report:export",
    "academician:view_participation",
    "settings:manage_institution",
    "notification:view_own",
  ],
};

/**
 * Check if a role has a specific permission.
 */
export function hasPermission(role: UserRole, permission: string): boolean {
  return PERMISSIONS[role]?.includes(permission) ?? false;
}

/**
 * Get all roles as an array for selectors.
 */
export function getAllRoles(): { value: UserRole; label: string; description: string }[] {
  return Object.values(ROLES).map((role) => ({
    value: role,
    label: ROLE_LABELS[role],
    description: ROLE_DESCRIPTIONS[role],
  }));
}
