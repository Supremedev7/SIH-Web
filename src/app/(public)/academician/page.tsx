"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Users,
  Microscope,
  Briefcase,
  Lightbulb,
  Award,
  BookOpen,
  Cpu,
  Sparkles,
  ShieldCheck,
  Search,
  ArrowRight,
  CheckCircle2,
  Calendar,
  FileCheck2,
  TrendingUp,
} from "lucide-react";

export default function AcademicianPage() {
  const [expertiseInput, setExpertiseInput] = useState("");
  const [activeResearchTab, setActiveResearchTab] = useState<"ai" | "biotech" | "sustainability">("ai");

  const researchTopics = {
    ai: {
      title: "Artificial Intelligence & ML",
      topics: [
        "Large Language Models & Agentic Workflows",
        "Autonomous Computer Vision for Robotics",
        "Edge ML & Low-Power Embedded Inference",
        "AI Alignment & Mathematical Safety Bounds",
      ],
      sponsors: "Google India, Microsoft Research, Tata Elxsi",
    },
    biotech: {
      title: "Biotech & Healthcare",
      topics: [
        "Computational Genomics & Sequencing",
        "Targeted Drug Delivery Nanoparticles",
        "Biomarker Diagnostics & Telemedicine",
        "AI Diagnostic Imaging for Oncology",
      ],
      sponsors: "Cipla, Biocon, Sun Pharma R&D",
    },
    sustainability: {
      title: "Sustainability & Materials",
      topics: [
        "Carbon Capture & Geological Sequestration",
        "Organic Perovskite Solar Cells",
        "Circular Lithium Battery Recycling",
        "Microplastic Filtration Membranes",
      ],
      sponsors: "Reliance New Energy, Tata Power, Mahindra Sustainability",
    },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* ── Faculty Hero Section ── */}
      <section className="relative pt-12 pb-20 md:pt-16 md:pb-24 border-b border-border/40 overflow-hidden">
        {/* Ambient glow background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] -z-10 pointer-events-none opacity-30 dark:opacity-20">
          <div className="absolute top-10 left-1/3 w-80 h-80 bg-purple-500/25 rounded-full blur-3xl" />
          <div className="absolute top-24 right-1/4 w-72 h-72 bg-violet-500/20 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left: Heading & Search */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-semibold">
                <span className="flex h-1.5 w-1.5 rounded-full bg-purple-500" />
                <span>NATIONAL ACADEMIC-INDUSTRY SYNERGY CELL</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-foreground leading-[1.08]">
                Shape Careers. <br />
                Drive Research. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600">
                  Lead Innovation.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
                Join India&apos;s premier integrated apex network designed exclusively for professors,
                researchers, and academic mentors. Collaborate with industry leaders, guide promising students, and
                monetize your scientific and business expertise.
              </p>

              {/* Interactive Expertise Search Bar */}
              <div className="p-2 rounded-2xl border border-border/80 bg-card/90 backdrop-blur-md shadow-md shadow-purple-500/5 sm:flex sm:items-center sm:gap-2">
                <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-xl bg-muted/40 border border-border/40 focus-within:border-purple-500/50 focus-within:bg-background transition-colors">
                  <Search className="h-4 w-4 text-muted-foreground shrink-0" />
                  <input
                    type="text"
                    placeholder="Enter your expertise (e.g. AI/ML, Nanotech, Finance)..."
                    value={expertiseInput}
                    onChange={(e) => setExpertiseInput(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-hidden"
                  />
                </div>

                <Link
                  href="/academician/register"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm font-semibold transition-all shrink-0 shadow-xs inline-flex items-center justify-center gap-1.5"
                >
                  Join as Faculty
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Live Count Pill */}
              <div className="flex items-center gap-2 text-xs font-semibold text-purple-600 dark:text-purple-400">
                <span className="flex h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
                <span>FACULTY CELL ACTIVE — 50,000+ Active Mentors Nationally</span>
              </div>
            </div>

            {/* Right: Academic Mentor Profile Highlight Widget */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xl relative">
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-border/60">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-purple-500/10 text-purple-600 font-bold flex items-center justify-center text-sm">
                      AS
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground">Dr. Ananya Sharma</h4>
                      <p className="text-xs text-muted-foreground">Prof. of AI, IIT Delhi</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-500 border border-purple-500/20 font-bold">
                    Apex Mentor
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-muted/40 border border-border/40">
                    <span className="text-xs font-bold text-foreground block mb-1">
                      Active Corporate Research Grant
                    </span>
                    <p className="text-xs text-muted-foreground">
                      Joint LLM Safety & Reasoning Optimization with <span className="font-semibold text-foreground">Google India</span>
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-center text-xs">
                    <div className="p-2.5 rounded-lg border border-border/50 bg-card">
                      <span className="font-black text-foreground block text-base">28</span>
                      <span className="text-[11px] text-muted-foreground">Students Mentored</span>
                    </div>
                    <div className="p-2.5 rounded-lg border border-border/50 bg-card">
                      <span className="font-black text-foreground block text-base">3</span>
                      <span className="text-[11px] text-muted-foreground">Patents Filed</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-purple-500/5 border border-purple-500/20 text-[11px] text-purple-600 dark:text-purple-400">
                    🏆 Commercial Advisory Rate: Vetted Enterprise Tier 1
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Primary Pillars of Academic Synergy ── */}
      <section className="py-20 bg-muted/20 border-b border-border/40">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-bold tracking-widest text-purple-500 mb-2 block">
              ECOSYSTEM ROLES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Primary Pillars of Academic Synergy
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              SCI provides tailored interfaces and tools customized to amplify each role you claim in the national system.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: "Academic Mentor",
                roleSub: "Guide Student Career Paths",
                desc: "Provide mock interviews, evaluate resume files, run specialised upskilling bootcamps, and directly elevate young talent from your home state.",
                icon: Users,
              },
              {
                title: "Industry Researcher",
                roleSub: "Co-author with Top Corporates",
                desc: "Secure funding for critical R&D pipelines, publish jointly with corporate developers, and register patents on next-gen tech streams.",
                icon: Microscope,
              },
              {
                title: "Expert Consultant",
                roleSub: "Monetize Academic Knowledge",
                desc: "Solve specialized industry challenges, provide third-party reviews, and earn commercial advisory rates from vetted enterprise partners.",
                icon: Briefcase,
              },
            ].map((pillar, idx) => {
              const PillarIcon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-border/70 bg-card p-6 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500 w-fit mb-5">
                      <PillarIcon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-1">{pillar.title}</h3>
                    <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 block mb-3">
                      {pillar.roleSub}
                    </span>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{pillar.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Engineered to Drive Innovation ── */}
      <section className="py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-bold tracking-widest text-purple-500 mb-2 block">
              FEATURES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Engineered to Drive Innovation
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Advanced digital pipelines tailored to optimize academic publications, mentor connections, and R&D partnerships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Student Mentorship Portal",
                desc: "Access standard matching structures to seamlessly coach regional student cohorts.",
                icon: Users,
              },
              {
                title: "Academia-Industry R&D",
                desc: "Collaborate directly on active commercial research challenges and secure funding.",
                icon: Microscope,
              },
              {
                title: "Consulting Marketplace",
                desc: "Receive targeted notifications for paid advisory contracts based on proven academic streams.",
                icon: Briefcase,
              },
              {
                title: "Peer Review Network",
                desc: "Assess state and national academic compliance proposals on a secure platform.",
                icon: ShieldCheck,
              },
              {
                title: "Profile & Portfolio Hub",
                desc: "Manage verified papers, ongoing consulting briefs, and patents securely online.",
                icon: Award,
              },
              {
                title: "Publication Hub",
                desc: "Gain quick invitations to premier, authority-backed national science forums.",
                icon: BookOpen,
              },
            ].map((feat, idx) => {
              const FeatIcon = feat.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-border/70 bg-card p-6 shadow-xs hover:border-purple-500/40 hover:-translate-y-1 transition-all group"
                >
                  <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500 w-fit mb-5 group-hover:scale-110 transition-transform">
                    <FeatIcon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-2">{feat.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Unified Academic Research & Corporate Collaboration ── */}
      <section className="py-24 bg-muted/20 border-y border-border/40">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs uppercase font-bold tracking-widest text-purple-500 mb-2 block">
              BRIDGING THE ACADEMIA-INDUSTRY GAP
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Unified Academic Research & Corporate Collaboration
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Our platform connects faculty experts with active corporate research pipelines. Work together on high-impact
              projects, publish jointly, and commercialize technology across key national streams.
            </p>
          </div>

          {/* Stream Switcher Tabs */}
          <div className="flex justify-center gap-2 mb-8">
            {(Object.keys(researchTopics) as Array<keyof typeof researchTopics>).map((key) => (
              <button
                key={key}
                onClick={() => setActiveResearchTab(key)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeResearchTab === key
                    ? "bg-purple-600 text-white shadow-sm"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {researchTopics[key].title}
              </button>
            ))}
          </div>

          {/* Active Research Stream Card */}
          <div className="max-w-4xl mx-auto rounded-2xl border border-border/70 bg-card p-6 sm:p-8 mb-16 shadow-xs">
            <h3 className="text-lg font-bold text-foreground mb-4">
              {researchTopics[activeResearchTab].title} Research Tracks
            </h3>
            <div className="grid sm:grid-cols-2 gap-3 mb-6">
              {researchTopics[activeResearchTab].topics.map((t, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-purple-500 shrink-0 mt-0.5" />
                  <span>{t}</span>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
              <span>Active Corporate Sponsors:</span>
              <span className="font-semibold text-foreground">{researchTopics[activeResearchTab].sponsors}</span>
            </div>
          </div>

          {/* National R&D Metrics Strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center max-w-5xl mx-auto">
            <div className="p-6 rounded-2xl border border-border/70 bg-card shadow-xs">
              <span className="text-3xl sm:text-4xl font-black text-purple-500 font-mono block">10,000+</span>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-1">Students Mentored</p>
            </div>
            <div className="p-6 rounded-2xl border border-border/70 bg-card shadow-xs">
              <span className="text-3xl sm:text-4xl font-black text-purple-500 font-mono block">2,000+</span>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-1">Research Papers Filed</p>
            </div>
            <div className="p-6 rounded-2xl border border-border/70 bg-card shadow-xs">
              <span className="text-3xl sm:text-4xl font-black text-purple-500 font-mono block">500+</span>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-1">Industry Projects Run</p>
            </div>
            <div className="p-6 rounded-2xl border border-border/70 bg-card shadow-xs">
              <span className="text-3xl sm:text-4xl font-black text-purple-500 font-mono block">50+</span>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-1">Patents Secured</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Spotlight: Prominent Faculty Mentors ── */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-bold tracking-widest text-purple-500 mb-2 block">
              SPOTLIGHT
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Our Prominent Faculty Mentors
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Read direct testimonials from seasoned professors and consultants leveraging SCI&apos;s academic-industry network.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote:
                  "SCI matched my team with five corporate-sponsored research grants, allowing us to publish three joint papers with Google India developers.",
                name: "Dr. Ananya Sharma",
                role: "Professor of AI, IIT Delhi",
              },
              {
                quote:
                  "Through the Consulting Marketplace, I advised three health startups on computational drug delivery, earning significant advisory rates.",
                name: "Dr. Raghu Raman",
                role: "Head of Biotech, BITS Pilani",
              },
              {
                quote:
                  "The mock interview tools built into SCI let our faculty mentors guide hundreds of rural graduates into verified tech placements.",
                name: "Dr. Priyesha Iyer",
                role: "Dean of R&D, NIT Trichy",
              },
            ].map((prof, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-border/70 bg-card p-6 shadow-xs flex flex-col justify-between"
              >
                <p className="text-xs sm:text-sm text-muted-foreground italic leading-relaxed mb-6">
                  &ldquo;{prof.quote}&rdquo;
                </p>
                <div className="pt-4 border-t border-border/50">
                  <h4 className="text-xs font-bold text-foreground">{prof.name}</h4>
                  <p className="text-[11px] text-muted-foreground">{prof.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Faculty Development & Training (FDP & Sabbaticals) ── */}
      <section className="py-20 bg-muted/20 border-t border-border/40">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs uppercase font-bold tracking-widest text-purple-500 mb-2 block">
              DEVELOPMENT
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Faculty Development & Training
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Explore specialized national mentorship tracks, peer review modules, and sabbatical industry placements.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                badge: "FDP Active • Register by April 10",
                title: "Specialized Workshops",
                desc: "Collaborate on next-gen tech and data science curricula alongside enterprise curriculum designers.",
              },
              {
                badge: "Industry Placement • Commencing May 2026",
                title: "Sabbatical Internships",
                desc: "Spend 2-4 months inside certified corporate labs to gain hands-on operational workflow insight.",
              },
              {
                badge: "Conference Hub • Register by May 15",
                title: "National Conferences",
                desc: "Secure paper submission and invitation pipelines to premier apex academic-industry forums.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-border/70 bg-card p-6 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-500 border border-purple-500/20 mb-4 inline-block">
                    {item.badge}
                  </span>
                  <h3 className="text-base font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>
                <Link
                  href="/academician/register"
                  className="inline-flex items-center text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline"
                >
                  Register Application <ArrowRight className="h-3 w-3 ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Empower the Next Generation CTA ── */}
      <section className="py-20 bg-gradient-to-r from-purple-700 via-violet-700 to-indigo-800 text-white text-center">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
            Empower the Next Generation — Join SCI as Faculty
          </h2>
          <p className="text-sm sm:text-base text-purple-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Transform your academic profile, co-author joint research, and guide promising students across states. Create your verified portfolio profile today.
          </p>
          <Link
            href="/academician/register"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-white text-purple-700 px-8 text-sm font-bold shadow-lg hover:bg-purple-50 transition-all hover:scale-105"
          >
            Join as Faculty Member Now
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}
