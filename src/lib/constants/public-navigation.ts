import {
  GraduationCap,
  Briefcase,
  Building2,
  BookOpen,
  Award,
  Compass,
  FileText,
  Users,
  Target,
  BarChart3,
  TrendingUp,
  FileCheck2,
  CalendarCheck,
  ShieldCheck,
  Lightbulb,
  Handshake,
  Sparkles,
  Zap,
  Code2,
  Microscope,
  Cpu,
  type LucideIcon,
} from "lucide-react";

export interface MegaMenuItem {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

export interface MegaMenuColumn {
  title: string;
  items: MegaMenuItem[];
}

export interface MegaMenuSpotlight {
  badge: string;
  title: string;
  description: string;
  metricLabel: string;
  metricValue: string;
  ctaText: string;
  ctaHref: string;
  roleAccent: "student" | "institute" | "industry" | "faculty";
}

export interface RoleMegaMenuConfig {
  roleId: "student" | "institution" | "industry" | "academician";
  navLabel: string;
  href: string;
  tagline: string;
  accentColor: string;
  badgeText: string;
  columns: MegaMenuColumn[];
  spotlight: MegaMenuSpotlight;
}

export const MEGA_MENU_CONFIGS: Record<string, RoleMegaMenuConfig> = {
  student: {
    roleId: "student",
    navLabel: "For Students",
    href: "/student",
    tagline: "Your Career Starts Here — Pre-verified Internships & AI Skill Gap Mapping",
    accentColor: "from-role-student to-brand-600",
    badgeText: "24.5k Active Jobs",
    columns: [
      {
        title: "Skill Development",
        items: [
          {
            title: "AI Skill Assessment",
            description: "Standardized tests benchmarking coding, aptitude, and core domain skills",
            href: "/student#assessment",
            icon: Target,
            badge: "AI Powered",
          },
          {
            title: "Skill Profile & Radar",
            description: "Interactive visual map comparing your competencies to industry demand",
            href: "/student#skills",
            icon: BarChart3,
          },
          {
            title: "Career Guidance",
            description: "Personalized roadmap based on verified university transcripts and projects",
            href: "/student#guidance",
            icon: Compass,
          },
          {
            title: "Mock Interview Prep",
            description: "Browser-based coding challenges & AI behavioral interview rounds",
            href: "/student#prep",
            icon: Code2,
          },
        ],
      },
      {
        title: "Opportunities",
        items: [
          {
            title: "Internship Marketplace",
            description: "High-stipend pre-verified summer & winter internships from Fortune 500s",
            href: "/student#internships",
            icon: Briefcase,
            badge: "Verified",
          },
          {
            title: "National Campus Jobs",
            description: "Direct corporate hiring drives with pre-verified transcript fast-tracks",
            href: "/student#jobs",
            icon: Zap,
          },
          {
            title: "Curated Streams",
            description: "Engineering, Management, Medical, Design, Sciences, and Commerce roles",
            href: "/student#streams",
            icon: BookOpen,
          },
          {
            title: "Application Tracker",
            description: "Live real-time visibility into employer review stages and interview calls",
            href: "/student#applications",
            icon: FileCheck2,
          },
        ],
      },
      {
        title: "Tools & Portfolio",
        items: [
          {
            title: "ATS Resume Builder",
            description: "Standards-compliant formatting eliminating recruiter screening dropouts",
            href: "/student#resume",
            icon: FileText,
            badge: "Free",
          },
          {
            title: "Digital Verified Portfolio",
            description: "Showcase code commits, certifications, and institutional accreditations",
            href: "/student#portfolio",
            icon: Award,
          },
          {
            title: "Mentor Network",
            description: "Connect 1-on-1 with experienced faculty and Fortune 500 corporate leaders",
            href: "/student#mentors",
            icon: Users,
          },
          {
            title: "Live Hackathons & Fairs",
            description: "National Smart India Hackathon and virtual pan-India job expos",
            href: "/student#events",
            icon: Sparkles,
          },
        ],
      },
    ],
    spotlight: {
      badge: "LIVE DRIVE",
      title: "Apex Tech Placement Fair 2026",
      description: "Direct interview pathways with 200+ fast-growing startups and certified Fortune 500 enterprises.",
      metricLabel: "Active Opportunities",
      metricValue: "24,500+",
      ctaText: "Explore Student Hub",
      ctaHref: "/student",
      roleAccent: "student",
    },
  },

  institution: {
    roleId: "institution",
    navLabel: "For Institutes",
    href: "/institution",
    tagline: "Equip your T&P cell with a national corporate pipeline and NAAC/NIRF audit reports",
    accentColor: "from-role-institute to-[#A33B1E]",
    badgeText: "T&P Cell v2.4",
    columns: [
      {
        title: "Placement Operations",
        items: [
          {
            title: "Digital Placement Cell",
            description: "Unified console to invite corporations and schedule multi-day campus drives",
            href: "/institution#digital-cell",
            icon: Building2,
            badge: "Core",
          },
          {
            title: "Automated Scheduling",
            description: "Zero-conflict virtual test rooms and panel interview calendars",
            href: "/institution#scheduling",
            icon: CalendarCheck,
          },
          {
            title: "Bulk Offer Tracking",
            description: "Track student offer letters, acceptances, and multi-offer compliance rules",
            href: "/institution#offers",
            icon: FileCheck2,
          },
          {
            title: "Direct Recruiter Outreach",
            description: "Access a verified national network of 10,000+ active enterprise recruiters",
            href: "/institution#pipeline",
            icon: Handshake,
          },
        ],
      },
      {
        title: "Analytics & Insights",
        items: [
          {
            title: "Placement Analytics Cell",
            description: "Real-time graphs of overall offer rates, average CTC, and branch statistics",
            href: "/institution#analytics",
            icon: BarChart3,
            badge: "Live",
          },
          {
            title: "Campus Skill Heatmaps",
            description: "Benchmark cohort performance against national industry standards",
            href: "/institution#heatmaps",
            icon: TrendingUp,
          },
          {
            title: "Readiness Scores",
            description: "Standardized student diagnostic metrics before corporate drive shortlists",
            href: "/institution#readiness",
            icon: Target,
          },
          {
            title: "Department Breakdown",
            description: "Comparative metrics across Engineering, Management, and Science schools",
            href: "/institution#departments",
            icon: BookOpen,
          },
        ],
      },
      {
        title: "Accreditation & Audits",
        items: [
          {
            title: "NAAC & NIRF Reports",
            description: "One-click audit-compliant exports formatted to national ranking guidelines",
            href: "/institution#accreditation",
            icon: ShieldCheck,
            badge: "Compliant",
          },
          {
            title: "Transcript Verification",
            description: "Official university mark sheets and degree credentials",
            href: "/institution#verification",
            icon: FileText,
          },
          {
            title: "National Network Map",
            description: "Collaborative placement consortium across 5,000+ partner universities",
            href: "/institution#network",
            icon: Users,
          },
          {
            title: "Annual Pricing Tiers",
            description: "Transparent institutional subscriptions from Free Starter to Enterprise",
            href: "/institution#pricing",
            icon: Award,
          },
        ],
      },
    ],
    spotlight: {
      badge: "PLATFORM METRIC",
      title: "Placement Analytics v2.4",
      description: "Boost campus placement success rates by up to 25% with verified student transcripts.",
      metricLabel: "Placement Rate",
      metricValue: "94.2%",
      ctaText: "Partner with SCI",
      ctaHref: "/institution",
      roleAccent: "institute",
    },
  },

  industry: {
    roleId: "industry",
    navLabel: "Industry Hub",
    href: "/industry",
    tagline: "Corporate Recruiting & Sourcing Hub — Hire India's Top Campus Talent at Scale",
    accentColor: "from-role-industry to-[#0B5C50]",
    badgeText: "96.8% Match Rate",
    columns: [
      {
        title: "Talent Sourcing",
        items: [
          {
            title: "Candidate Sourcing Console",
            description: "Filtered access to 24,850+ pre-vetted students across 5,000+ campuses",
            href: "/industry#sourcing-console",
            icon: Target,
            badge: "96.8% Precision",
          },
          {
            title: "Skill-Based Filtering",
            description: "Filter by verified coding challenges, transcripts, and repository commits",
            href: "/industry#filtering",
            icon: Code2,
          },
          {
            title: "Campus Drive Management",
            description: "Run simultaneous virtual drives across Tier-1, Tier-2, and Tier-3 colleges",
            href: "/industry#campus-drives",
            icon: Building2,
          },
          {
            title: "Diversity Sourcing Tools",
            description: "Automated pipelines to easily fulfill national ESG and gender balance goals",
            href: "/industry#diversity",
            icon: Users,
          },
        ],
      },
      {
        title: "Recruitment Suite",
        items: [
          {
            title: "Virtual Interview Platform",
            description: "Integrated audio, video, collaborative code editors, and evaluation sheets",
            href: "/industry#interviews",
            icon: Sparkles,
          },
          {
            title: "Automated Coding Tests",
            description: "Plagiarism-protected technical rounds with instant grading leaderboards",
            href: "/industry#assessments",
            icon: Cpu,
          },
          {
            title: "Bulk Offer Management",
            description: "Generate, dispatch, and track thousands of offer letters with 1-click joins",
            href: "/industry#offers",
            icon: FileCheck2,
            badge: "Instant",
          },
          {
            title: "Employer Branding Hub",
            description: "Feature your tech stack, hackathons, and culture on university noticeboards",
            href: "/industry#branding",
            icon: Award,
          },
        ],
      },
      {
        title: "Corporate Programs",
        items: [
          {
            title: "R&D & Lab Sponsorship",
            description: "Sponsor premier university research grants and co-author technical patents",
            href: "/industry#rnd",
            icon: Microscope,
          },
          {
            title: "Corporate Mentorship",
            description: "Empower engineering managers to mentor student cohorts and scout leaders",
            href: "/industry#mentorship",
            icon: Handshake,
          },
          {
            title: "CSR Skill Initiatives",
            description: "Fund rural and tier-3 upskilling bootcamps under government CSR provisions",
            href: "/industry#csr",
            icon: Lightbulb,
          },
          {
            title: "Sourcing Plans & Pricing",
            description: "Transparent packages: Pay-Per-Drive (₹15k) and Annual Partnership (₹1.8L)",
            href: "/industry#pricing",
            icon: Briefcase,
          },
        ],
      },
    ],
    spotlight: {
      badge: "ENTERPRISE PROOF",
      title: "TechCorp Case Study",
      description: "How TechCorp hired 200 engineers from 50 campuses in 2 weeks, reducing time-to-hire by 45%.",
      metricLabel: "Cost Per Hire Saved",
      metricValue: "60%",
      ctaText: "Start Hiring",
      ctaHref: "/industry",
      roleAccent: "industry",
    },
  },

  academician: {
    roleId: "academician",
    navLabel: "Faculty Cell",
    href: "/academician",
    tagline: "National Academic-Industry Synergy Cell — Shape Careers, Drive Research, Monetize Expertise",
    accentColor: "from-role-faculty to-[#4E269C]",
    badgeText: "50,000+ Mentors",
    columns: [
      {
        title: "Academic Synergy",
        items: [
          {
            title: "Academic Mentor Portal",
            description: "Conduct mock interviews, review resumes, and guide regional student cohorts",
            href: "/academician#mentorship",
            icon: Users,
            badge: "Active",
          },
          {
            title: "Industry Researcher",
            description: "Co-author with top corporate engineering teams and secure R&D funding",
            href: "/academician#research",
            icon: Microscope,
          },
          {
            title: "Consulting Marketplace",
            description: "Solve specialized industry challenges and earn corporate advisory honorariums",
            href: "/academician#consulting",
            icon: Handshake,
            badge: "Monetize",
          },
          {
            title: "Patent Commercialization",
            description: "Register joint patents and license intellectual property to enterprises",
            href: "/academician#patents",
            icon: Lightbulb,
          },
        ],
      },
      {
        title: "Development & Training",
        items: [
          {
            title: "Specialized FDP Workshops",
            description: "Collaborate on next-gen AI, robotics, and data science curricula",
            href: "/academician#fdp",
            icon: Cpu,
            badge: "Reg Open",
          },
          {
            title: "Sabbatical Internships",
            description: "Spend 2-4 months inside Fortune 500 corporate labs to gain hands-on insights",
            href: "/academician#sabbatical",
            icon: Briefcase,
          },
          {
            title: "National Conference Hub",
            description: "Secure paper submission and invitation pipelines to apex national symposiums",
            href: "/academician#conferences",
            icon: CalendarCheck,
          },
          {
            title: "Peer Review Network",
            description: "Assess state and national academic proposals on a verified authority portal",
            href: "/academician#peer-review",
            icon: FileCheck2,
          },
        ],
      },
      {
        title: "Profile & Hub",
        items: [
          {
            title: "Verified Faculty Profile",
            description: "Manage publications, citations, consulting briefs, and patents online",
            href: "/academician#profile",
            icon: Award,
          },
          {
            title: "Research Stream Grants",
            description: "Access corporate funding in AI/ML, Biotech, and Clean Energy streams",
            href: "/academician#grants",
            icon: Sparkles,
          },
          {
            title: "Curriculum Advisory",
            description: "Work directly with tech leads to align degree programs with market needs",
            href: "/academician#curriculum",
            icon: BookOpen,
          },
          {
            title: "Faculty Community",
            description: "Join 50,000+ professors and department deans nationwide",
            href: "/academician#community",
            icon: Building2,
          },
        ],
      },
    ],
    spotlight: {
      badge: "NATIONAL SYNERGY",
      title: "Joint Corporate Research Grants",
      description: "Partner with Google India, Tata R&D, and Reliance Labs for sponsored research projects.",
      metricLabel: "Papers Filed",
      metricValue: "2,000+",
      ctaText: "Join Faculty Cell",
      ctaHref: "/academician",
      roleAccent: "faculty",
    },
  },
};

export const PARTNER_LOGOS = [
  { name: "IIT Delhi", category: "Premier Institute", type: "institute" },
  { name: "IIT Bombay", category: "Premier Institute", type: "institute" },
  { name: "BITS Pilani", category: "Premier Institute", type: "institute" },
  { name: "NIT Trichy", category: "Premier Institute", type: "institute" },
  { name: "VIT Vellore", category: "Deemed University", type: "institute" },
  { name: "Tata Group", category: "Conglomerate", type: "industry" },
  { name: "Infosys", category: "IT & Consulting", type: "industry" },
  { name: "Wipro", category: "Technology Solutions", type: "industry" },
  { name: "Google India", category: "Global Tech", type: "industry" },
  { name: "Reliance Industries", category: "Conglomerate", type: "industry" },
  { name: "Deloitte", category: "Advisory & Tech", type: "industry" },
  { name: "Amazon India", category: "E-Commerce & Cloud", type: "industry" },
  { name: "Zomato", category: "Tech & Consumer", type: "industry" },
  { name: "Mahindra", category: "Automotive & IT", type: "industry" },
];

export const STREAM_CATEGORIES = [
  { id: "engineering", name: "Engineering", count: "12,450 Jobs", icon: Cpu, color: "text-role-student bg-role-student/10" },
  { id: "management", name: "Management", count: "8,920 Jobs", icon: Briefcase, color: "text-role-institute bg-role-institute/10" },
  { id: "medical", name: "Medical & Health", count: "3,110 Jobs", icon: Microscope, color: "text-rose-500 bg-rose-500/10" },
  { id: "arts", name: "Arts & Humanities", count: "2,150 Jobs", icon: BookOpen, color: "text-role-faculty bg-role-faculty/10" },
  { id: "sciences", name: "Pure Sciences", count: "4,560 Jobs", icon: Sparkles, color: "text-cyan-500 bg-cyan-500/10" },
  { id: "law", name: "Law & Compliance", count: "1,200 Jobs", icon: ShieldCheck, color: "text-indigo-500 bg-indigo-500/10" },
  { id: "design", name: "Design & UX", count: "3,890 Jobs", icon: Award, color: "text-role-industry bg-role-industry/10" },
  { id: "commerce", name: "Commerce & Finance", count: "5,110 Jobs", icon: TrendingUp, color: "text-orange-500 bg-orange-500/10" },
];

export const STUDENT_STORIES = [
  {
    name: "Devendra Verma",
    college: "IIT Delhi • B.Tech",
    outcome: "₹ 32 LPA",
    company: "Placed at Google India",
    quote: "The AI transcript verification bypassed the initial resume filter and matched me directly with Google India's systems team.",
    role: "Software Development Engineer",
  },
  {
    name: "Ananya Iyer",
    college: "BITS Pilani • MBA",
    outcome: "₹ 24 LPA",
    company: "Placed at McKinsey India",
    quote: "Standardized competency scores helped McKinsey recruiters benchmark my strategic consulting aptitude instantly.",
    role: "Associate Business Analyst",
  },
  {
    name: "Kunal Deshmukh",
    college: "NIT Trichy • MCA",
    outcome: "₹ 18 LPA",
    company: "Placed at Reliance Industries",
    quote: "SCI gave me direct access to virtual campus drives that typically never visited our campus in earlier years.",
    role: "Cloud Infrastructure Specialist",
  },
];
