"use client";

import { useState } from "react";
import Link from "next/link";
import { MegaNavbar } from "@/components/layout/mega-navbar";
import { PublicFooter } from "@/components/layout/public-footer";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { PartnerMarquee } from "@/components/shared/partner-marquee";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import {
  GraduationCap,
  Building2,
  Briefcase,
  Users,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Award,
  CheckCircle2,
  FileCheck,
  ChevronRight,
  BarChart3,
  HelpCircle,
} from "lucide-react";

export default function HomePage() {
  const [selectedRole, setSelectedRole] = useState<"student" | "institute" | "industry" | "faculty">("student");

  const roleGatewayData = {
    student: {
      title: "I'm a Student",
      shortDesc: "Discover high tier jobs & grow",
      accent: "from-role-student to-brand-600",
      pillBorder: "border-role-student/40 bg-role-student/10 text-role-student",
      icon: GraduationCap,
      href: "/student",
      badge: "24,500+ Active Jobs",
      highlights: [
        "Pre-verified transcript scores to bypass initial ATS filters",
        "Direct corporate internship pipelines with Fortune 500s",
        "AI-driven skill gap mapping & tailored career roadmap",
      ],
      ctaText: "Explore Student Path",
      previewMetric: "Avg Package: ₹ 14.8 LPA",
    },
    institute: {
      title: "I'm an Institute",
      shortDesc: "Streamline campus placement",
      accent: "from-role-institute to-[#A33B1E]",
      pillBorder: "border-role-institute/40 bg-role-institute/10 text-role-institute",
      icon: Building2,
      href: "/institution",
      badge: "T&P Console v2.4",
      highlights: [
        "Unified digital placement cell managing hundreds of recruiters",
        "1-click NAAC & NIRF accreditation data reporting",
        "Real-time campus-wide student skill heatmaps & readiness scores",
      ],
      ctaText: "Explore Institute Path",
      previewMetric: "94.2% Placement Rate",
    },
    industry: {
      title: "I'm from Industry",
      shortDesc: "Source qualified talent pool",
      accent: "from-role-industry to-[#0B5C50]",
      pillBorder: "border-role-industry/40 bg-role-industry/10 text-role-industry",
      icon: Briefcase,
      href: "/industry",
      badge: "96.8% Precision Match",
      highlights: [
        "Vetted national pipeline across 5,000+ top Indian institutes",
        "Conduct virtual interviews, coding tests, and bulk offer letters",
        "Cut campus sourcing cycles from 2 months down to 2 weeks",
      ],
      ctaText: "Explore Industry Path",
      previewMetric: "60% Cost Saved Per Hire",
    },
    faculty: {
      title: "I'm Faculty",
      shortDesc: "Inspire & drive R&D",
      accent: "from-role-faculty to-[#4E269C]",
      pillBorder: "border-role-faculty/40 bg-role-faculty/10 text-role-faculty",
      icon: Users,
      href: "/academician",
      badge: "50,000+ Active Mentors",
      highlights: [
        "Co-author high-impact research with corporate engineering teams",
        "Monetize scientific expertise via enterprise consulting marketplace",
        "Mentor promising student cohorts across state boundaries",
      ],
      ctaText: "Explore Faculty Path",
      previewMetric: "2,000+ Joint Papers Filed",
    },
  };

  const activeRoleData = roleGatewayData[selectedRole];

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      <AnimatedBackground />
      <MegaNavbar />

      <main className="flex-1">
        {/* ── Apex Hero Section ── */}
        <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
          {/* Subtle ambient lighting mesh */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] -z-10 pointer-events-none opacity-40 dark:opacity-25">
            <div className="absolute top-12 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute top-24 right-1/4 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-1/3 w-96 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <ScrollReveal delay="0">
              {/* National Initiative Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/80 px-4 py-1.5 text-xs font-semibold shadow-xs mb-8">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-foreground">A GOVERNMENT OF INDIA PARTNERED PLACEMENTS INITIATIVE</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay="75">
              {/* Headline */}
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl mb-6 max-w-5xl mx-auto leading-[1.15]">
              Empowering India&apos;s Future — <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">
                One Connection at a Time
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mx-auto max-w-3xl text-base sm:text-lg text-muted-foreground mb-12 leading-relaxed">
              The absolute hub uniting over 5,000 institutes, millions of students, seasoned faculty members,
              and progressive corporate giants under a single automated placement & upskilling ecosystem.
            </p>

            </ScrollReveal>

            <ScrollReveal delay="150">
              {/* Interactive 4-Role Switcher Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-10">
              {(Object.keys(roleGatewayData) as Array<keyof typeof roleGatewayData>).map((key) => {
                const item = roleGatewayData[key];
                const isSelected = selectedRole === key;
                const RoleIcon = item.icon;

                return (
                  <button
                    key={key}
                    onClick={() => setSelectedRole(key)}
                    aria-label={`Select ${item.title} path`}
                    aria-pressed={isSelected}
                    className={`relative text-left p-5 rounded-xl border transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? "border-primary bg-card shadow-sm ring-1 ring-primary/20 -translate-y-0.5"
                        : "border-border/60 bg-card/40 hover:bg-card/80 hover:border-border/80"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2 rounded-xl border ${item.pillBorder}`}>
                        <RoleIcon className="h-5 w-5" />
                      </div>
                      {isSelected && (
                        <span className="flex h-2 w-2 rounded-full bg-primary animate-ping" />
                      )}
                    </div>
                    <h3 className="text-base font-bold text-foreground mb-1">{item.title}</h3>
                    <p className="text-xs text-muted-foreground mb-3">{item.shortDesc}</p>
                    <div className="flex items-center text-xs font-semibold text-primary">
                      <span>Explore Path</span>
                      <ArrowRight className="h-3 w-3 ml-1 transition-transform group-hover:translate-x-1" />
                    </div>
                  </button>
                );
              })}
              </div>
            </ScrollReveal>

            <ScrollReveal delay="200">
              {/* Dynamic Role Preview Card (Anti-Slop Interactive Feature) */}
            <div className="max-w-4xl mx-auto rounded-xl border border-border/60 bg-card/90 backdrop-blur-xl p-6 sm:p-8 shadow-sm text-left mb-14">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-5 border-b border-border/60">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl border ${activeRoleData.pillBorder}`}>
                    <activeRoleData.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-foreground">{activeRoleData.title}</h3>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                        {activeRoleData.badge}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{activeRoleData.shortDesc}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-lg bg-muted text-foreground border border-border/60">
                    {activeRoleData.previewMetric}
                  </span>
                  <Link
                    href={activeRoleData.href}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-all shadow-xs"
                  >
                    {activeRoleData.ctaText}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 pt-5">
                {activeRoleData.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-muted-foreground leading-relaxed">{highlight}</p>
                  </div>
                ))}
              </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay="300">
              {/* National Apex Metrics Bar */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto pt-6 border-t border-border/40">
              <div className="space-y-1">
                <span className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">5,000+</span>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Partnered Institutes</p>
              </div>
              <div className="space-y-1">
                <span className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">2M+</span>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Verified Students</p>
              </div>
              <div className="space-y-1">
                <span className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">10,000+</span>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Active Enterprises</p>
              </div>
              <div className="space-y-1">
                <span className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">50,000+</span>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Faculty Mentors</p>
              </div>
            </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── Partner Marquee ── */}
        <PartnerMarquee />

        {/* ── How SCI Works: The Path to Unified Growth ── */}
        <section className="py-24 bg-muted/20 border-b border-border/40">
          <ScrollReveal>
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs uppercase font-bold tracking-widest text-primary mb-2 block">
                HOW SCI WORKS
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                The Path to Unified Growth
              </h2>
              <p className="text-base text-muted-foreground">
                A seamless 4-step framework engineered to quickly connect and empower our four key stakeholders.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              {[
                {
                  step: "01",
                  title: "Register Profile",
                  desc: "Sign up as student, university admin, corporate partner, or faculty member with verified credentials.",
                  icon: Users,
                },
                {
                  step: "02",
                  title: "Complete Credentials",
                  desc: "Unlock automated verification using AI-assisted transcript, GitHub repository, and workspace tooling.",
                  icon: FileCheck,
                },
                {
                  step: "03",
                  title: "Get Best Match",
                  desc: "Receive targeted matches for corporate roles, research grants, high-stipend internships, or specialized courses.",
                  icon: Sparkles,
                },
                {
                  step: "04",
                  title: "Grow Together",
                  desc: "Complete campus hiring loops, mentor future engineers, and power India's self-reliant knowledge economy.",
                  icon: TrendingUp,
                },
              ].map((item, idx) => {
                const StepIcon = item.icon;
                return (
                  <div
                    key={idx}
                    className="relative rounded-xl border border-border/60 bg-card p-6 shadow-sm hover:border-border/80 transition-all group"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-3xl font-black font-mono text-muted-foreground/30 group-hover:text-primary transition-colors">
                        {item.step}
                      </span>
                      <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                        <StepIcon className="h-5 w-5" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ── Ecosystem Roles: Engineered Specifically for You ── */}
        <section className="py-24">
          <ScrollReveal>
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs uppercase font-bold tracking-widest text-primary mb-2 block">
                ECOSYSTEM ROLES
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                Engineered Specifically for You
              </h2>
              <p className="text-base text-muted-foreground">
                SCI provides customized digital modules and pipelines for each member of our national network.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {[
                {
                  role: "For Students",
                  desc: "Discover internship marketplaces, mock-interview modules, and verify your credentials on India's top secure network.",
                  href: "/student",
                  icon: GraduationCap,
                  accent: "border-role-student/30 bg-role-student/5 hover:border-role-student/60",
                  iconColor: "text-role-student bg-role-student/10",
                  btnText: "Explore Student Hub",
                  points: ["Fortune 500 Internships", "AI Skill Gap Radar", "ATS PDF Builder"],
                },
                {
                  role: "For Institutes",
                  desc: "A unified placement cell console to directly invite corporations, track analytics, and automate student verification.",
                  href: "/institution",
                  icon: Building2,
                  accent: "border-role-institute/30 bg-role-institute/5 hover:border-role-institute/60",
                  iconColor: "text-role-institute bg-role-institute/10",
                  btnText: "Explore Institute Hub",
                  points: ["Automated Drive Schedules", "NAAC & NIRF Data DB", "Skill Heatmaps"],
                },
                {
                  role: "For Industry",
                  desc: "Source directly from trusted campuses, verify student transcripts, and setup hackathons with curated talent pools.",
                  href: "/industry",
                  icon: Briefcase,
                  accent: "border-role-industry/30 bg-role-industry/5 hover:border-role-industry/60",
                  iconColor: "text-role-industry bg-role-industry/10",
                  btnText: "Explore Industry Hub",
                  points: ["96.8% Precision Sourcing", "Virtual Code Drives", "Bulk Offer Letters"],
                },
                {
                  role: "For Faculty",
                  desc: "Engage in cross-border research, sponsor corporate-driven workshops, and lead specialized national mentorship tracks.",
                  href: "/academician",
                  icon: Users,
                  accent: "border-role-faculty/30 bg-role-faculty/5 hover:border-role-faculty/60",
                  iconColor: "text-role-faculty bg-role-faculty/10",
                  btnText: "Explore Faculty Cell",
                  points: ["Joint Corporate R&D", "Consultancy Marketplace", "FDP Workshops"],
                },
              ].map((roleCard, idx) => {
                const RoleCardIcon = roleCard.icon;
                return (
                  <div
                    key={idx}
                    className={`rounded-xl border p-7 transition-all duration-300 flex flex-col justify-between ${roleCard.accent}`}
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`p-2.5 rounded-xl ${roleCard.iconColor}`}>
                          <RoleCardIcon className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground">{roleCard.role}</h3>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-6 leading-relaxed">
                        {roleCard.desc}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {roleCard.points.map((pt, pIdx) => (
                          <span
                            key={pIdx}
                            className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-card/80 border border-border/60 text-foreground"
                          >
                            {pt}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link
                      href={roleCard.href}
                      className="inline-flex items-center text-xs font-semibold text-primary hover:underline group"
                    >
                      {roleCard.btnText}
                      <ArrowRight className="h-3.5 w-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                );
              })}
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ── Testimonials: Direct From Our Partners ── */}
        <section className="py-24 bg-muted/20 border-t border-border/40">
          <ScrollReveal>
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs uppercase font-bold tracking-widest text-primary mb-2 block">
                TESTIMONIALS
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                Direct From Our Partners
              </h2>
              <p className="text-base text-muted-foreground">
                See how SCI is transforming placement drives, student lives, and corporate pipelines across Indian states.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                {
                  quote:
                    "SCI has automated 90% of our campus recruitment workflow. Our placement rates increased by 22% within a single season.",
                  author: "Dr. Rajesh Iyer",
                  role: "T&P Officer, NIT Trichy",
                  badge: "Institute Partner",
                },
                {
                  quote:
                    "Sourcing pre-verified engineering and management graduates via the national apex pipeline has cut our hiring lead time in half.",
                  author: "Siddharth Sen",
                  role: "Talent Head, Tata Group",
                  badge: "Enterprise Recruiter",
                },
                {
                  quote:
                    "The AI matching paired me directly with top cloud roles matching my proven open-source commits. Highly recommended!",
                  author: "Priya Sharma",
                  role: "Student, BITS Pilani (Now at Google India)",
                  badge: "Verified Student",
                },
              ].map((t, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-border/60 bg-card p-6 shadow-sm flex flex-col justify-between hover:border-border/80 transition-colors"
                >
                  <p className="text-xs sm:text-sm text-foreground/90 italic leading-relaxed mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="pt-4 border-t border-border/50 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-foreground">{t.author}</h4>
                      <p className="text-[11px] text-muted-foreground">{t.role}</p>
                    </div>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                      {t.badge}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
        </section>

        {/* ── National Movement CTA Banner ── */}
        <section className="py-24 relative overflow-hidden bg-primary text-primary-foreground">
          <ScrollReveal>
            <div className="absolute inset-0 -z-10 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-6">
              Join the Movement — Be Part of India&apos;s Largest Academic-Industry Network
            </h2>
            <p className="text-base sm:text-lg text-primary-foreground/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Start your secure registration today. Connect with thousands of verified colleges and recruiters across the country.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                className="w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-xl bg-background text-foreground px-8 text-sm font-bold shadow-md hover:bg-background/90 transition-all hover:scale-105"
              >
                Register Your Entity
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
              <Link
                href="/student"
                className="w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-xl border border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground px-8 text-sm font-semibold hover:bg-primary-foreground/20 transition-all"
              >
                Explore Student Portal
              </Link>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
