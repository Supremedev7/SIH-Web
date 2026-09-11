import {
  LayoutDashboard,
  ClipboardCheck,
  BarChart3,
  Briefcase,
  GraduationCap,
  FileText,
  FolderOpen,
  Bell,
  Settings,
  BookOpen,
  Users,
  Building2,
  Target,
  Award,
  Lightbulb,
  Handshake,
  TrendingUp,
  Compass,
  FileSearch,
  PieChart,
  School,
  UserCheck,
  type LucideIcon,
} from "lucide-react";
import type { UserRole } from "./roles";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  children?: NavItem[];
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

// ── Student Navigation ──
const studentNav: NavSection[] = [
  {
    title: "Overview",
    items: [
      { title: "Dashboard", href: "/dashboard/student", icon: LayoutDashboard },
      { title: "Notifications", href: "/dashboard/student/notifications", icon: Bell },
    ],
  },
  {
    title: "Skill Development",
    items: [
      { title: "Skill Assessment", href: "/dashboard/student/assessment", icon: ClipboardCheck },
      { title: "Skill Profile", href: "/dashboard/student/skill-profile", icon: BarChart3 },
      { title: "Career Guidance", href: "/dashboard/student/career-guidance", icon: Compass },
    ],
  },
  {
    title: "Opportunities",
    items: [
      { title: "Internships", href: "/dashboard/student/internships", icon: Briefcase },
      { title: "Jobs", href: "/dashboard/student/jobs", icon: Target },
      { title: "Learning Programs", href: "/dashboard/student/learning", icon: BookOpen },
      { title: "My Applications", href: "/dashboard/student/applications", icon: FileSearch },
    ],
  },
  {
    title: "Profile",
    items: [
      { title: "Digital Portfolio", href: "/dashboard/student/portfolio", icon: Award },
      { title: "Recommendations", href: "/dashboard/student/recommendations", icon: Lightbulb },
      { title: "Documents", href: "/dashboard/student/documents", icon: FolderOpen },
      { title: "Settings", href: "/dashboard/student/settings", icon: Settings },
    ],
  },
];

// ── Academician Navigation ──
const academicianNav: NavSection[] = [
  {
    title: "Overview",
    items: [
      { title: "Dashboard", href: "/dashboard/academician", icon: LayoutDashboard },
      { title: "Notifications", href: "/dashboard/academician/notifications", icon: Bell },
    ],
  },
  {
    title: "Opportunities",
    items: [
      { title: "Faculty Internships", href: "/dashboard/academician/internships", icon: Briefcase },
      { title: "FDPs", href: "/dashboard/academician/fdp", icon: GraduationCap },
      { title: "Industrial Training", href: "/dashboard/academician/industrial-training", icon: Building2 },
      { title: "Consultancy", href: "/dashboard/academician/consultancy", icon: Handshake },
      { title: "Research Projects", href: "/dashboard/academician/research", icon: FileText },
      { title: "Workshops", href: "/dashboard/academician/workshops", icon: Users },
    ],
  },
  {
    title: "Profile",
    items: [
      { title: "My Applications", href: "/dashboard/academician/applications", icon: FileSearch },
      { title: "Academic Profile", href: "/dashboard/academician/profile", icon: UserCheck },
      { title: "Settings", href: "/dashboard/settings", icon: Settings },
    ],
  },
];

// ── Industry Navigation ──
const industryNav: NavSection[] = [
  {
    title: "Overview",
    items: [
      { title: "Dashboard", href: "/dashboard/industry", icon: LayoutDashboard },
    ],
  },
  {
    title: "Recruitment",
    items: [
      { title: "Internships", href: "/dashboard/industry/internships", icon: Briefcase },
      { title: "Job Postings", href: "/dashboard/industry/jobs", icon: Target },
      { title: "Candidates", href: "/dashboard/industry/candidates", icon: Users },
      { title: "Mentorship", href: "/dashboard/industry/mentorship", icon: Handshake },
    ],
  },
  {
    title: "Programs",
    items: [
      { title: "Learning Programs", href: "/dashboard/industry/programs", icon: BookOpen },
      { title: "Collaboration", href: "/dashboard/industry/collaboration", icon: Lightbulb },
    ],
  },
  {
    title: "Insights",
    items: [
      { title: "Analytics", href: "/dashboard/industry/analytics", icon: TrendingUp },
      { title: "Company Settings", href: "/dashboard/industry/settings", icon: Settings },
    ],
  },
];

// ── Institution Navigation ──
const institutionNav: NavSection[] = [
  {
    title: "Overview",
    items: [
      { title: "Dashboard", href: "/dashboard/institution", icon: LayoutDashboard },
    ],
  },
  {
    title: "Monitoring",
    items: [
      { title: "Students", href: "/dashboard/institution/students", icon: GraduationCap },
      { title: "Skill Analytics", href: "/dashboard/institution/skill-analytics", icon: BarChart3 },
      { title: "Placements", href: "/dashboard/institution/placements", icon: TrendingUp },
      { title: "Internships", href: "/dashboard/institution/internships", icon: Briefcase },
      { title: "Departments", href: "/dashboard/institution/departments", icon: School },
    ],
  },
  {
    title: "Administration",
    items: [
      { title: "Faculty Tracking", href: "/dashboard/institution/academicians", icon: BookOpen },
      { title: "Reports", href: "/dashboard/institution/reports", icon: PieChart },
      { title: "Settings", href: "/dashboard/institution/settings", icon: Settings },
    ],
  },
];

/**
 * Get navigation sections for a given role.
 */
export function getNavigationForRole(role: UserRole): NavSection[] {
  switch (role) {
    case "student":
      return studentNav;
    case "academician":
      return academicianNav;
    case "industry":
      return industryNav;
    case "institution":
      return institutionNav;
    default:
      return [];
  }
}
