"use client";

import { useState } from "react";
import Link from "next/link";
import { PartnerMarquee } from "@/components/shared/partner-marquee";
import {
  Briefcase,
  Target,
  Sparkles,
  Users,
  Building2,
  Code2,
  FileCheck2,
  TrendingUp,
  Clock,
  ShieldCheck,
  Check,
  ArrowRight,
  Search,
  Filter,
  Layers,
  Award,
} from "lucide-react";

export default function IndustryPage() {
  const [activeSkillFilter, setActiveSkillFilter] = useState("All");

  const candidatePool = [
    {
      name: "Rohan Nair",
      college: "IIT Bombay",
      degree: "B.Tech Computer Science",
      skills: ["React", "TypeScript", "Node.js", "System Design"],
      score: "98.4%",
      status: "Shortlisted",
      tier: "Tier-1 Apex",
    },
    {
      name: "Shruti Mukherjee",
      college: "BITS Pilani",
      degree: "B.E. Data Engineering",
      skills: ["Python", "PySpark", "BigQuery", "MLflow"],
      score: "96.2%",
      status: "Available",
      tier: "Tier-1 Apex",
    },
    {
      name: "Aman Verma",
      college: "NIT Trichy",
      degree: "MCA Cloud Computing",
      skills: ["Kubernetes", "AWS", "Golang", "Docker"],
      score: "94.8%",
      status: "Shortlisted",
      tier: "Tier-1 Apex",
    },
  ];

  const filteredCandidates =
    activeSkillFilter === "All"
      ? candidatePool
      : candidatePool.filter((c) =>
          c.skills.some((s) => s.toLowerCase().includes(activeSkillFilter.toLowerCase()))
        );

  return (
    <div className="min-h-screen bg-background">
      {/* ── Industry Hero Section ── */}
      <section className="relative pt-12 pb-20 md:pt-16 md:pb-24 border-b border-border/40 overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] -z-10 pointer-events-none opacity-30 dark:opacity-20">
          <div className="absolute top-10 left-1/3 w-80 h-80 bg-emerald-500/25 rounded-full blur-3xl" />
          <div className="absolute top-24 right-1/4 w-72 h-72 bg-teal-500/20 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left: Heading & Action */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>CORPORATE RECRUITING & SOURCING HUB</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-foreground leading-[1.08]">
                Hire India&apos;s Best <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600">
                  Campus Talent
                </span>
              </h1>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
                Unlock a vetted national pipeline of qualified students across 5,000+ top Indian institutes.
                Standardized verification, automated shortlisting, and smart AI matching built for robust enterprise
                scale.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Link
                  href="/industry/register"
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-6 shadow-md shadow-emerald-500/20 transition-all"
                >
                  Start Hiring
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
                <Link
                  href="#pricing"
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-border bg-card px-6 text-xs sm:text-sm font-semibold hover:bg-muted transition-colors"
                >
                  Request a Demo
                </Link>
              </div>
            </div>

            {/* Right: Sourcing Console Simulation Widget */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xl relative">
                {/* Console header */}
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-border/60">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="text-xs font-bold text-foreground">SCI Candidate Sourcing Console</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold">
                    AI Auto-Filter ON
                  </span>
                </div>

                {/* Metrics pill row */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="p-3.5 rounded-xl bg-muted/40 border border-border/40">
                    <span className="text-[11px] text-muted-foreground block">AI Matching Precision</span>
                    <span className="text-2xl font-black text-foreground">96.8% Avg</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-muted/40 border border-border/40">
                    <span className="text-[11px] text-muted-foreground block">Screened Candidates</span>
                    <span className="text-2xl font-black text-foreground">24,850 Vetted</span>
                  </div>
                </div>

                {/* Interactive Skill Quick Filters */}
                <div className="flex items-center gap-1.5 pb-4 mb-4 border-b border-border/40 overflow-x-auto text-xs">
                  <span className="text-muted-foreground text-[11px] mr-1">Filter:</span>
                  {["All", "React", "Python", "Kubernetes", "TypeScript"].map((skill) => (
                    <button
                      key={skill}
                      onClick={() => setActiveSkillFilter(skill)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                        activeSkillFilter === skill
                          ? "bg-emerald-500 text-white font-bold"
                          : "bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>

                {/* Simulated Candidate List */}
                <div className="space-y-2.5">
                  {filteredCandidates.map((cand, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl border border-border/50 bg-muted/20 hover:bg-muted/40 transition-colors flex items-center justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-foreground">{cand.name}</span>
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-emerald-500/10 text-emerald-500 font-bold">
                            {cand.score}
                          </span>
                        </div>
                        <p className="text-[11px] text-muted-foreground">
                          {cand.college} • {cand.degree}
                        </p>
                        <div className="flex gap-1 mt-1">
                          {cand.skills.map((s, sIdx) => (
                            <span key={sIdx} className="text-[9px] px-1.5 py-0.2 rounded-sm bg-card border border-border/60">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold shrink-0 transition-colors">
                        Shortlist
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Corporate Partner Marquee ── */}
      <PartnerMarquee headline="APEX RECRUITMENT PARTNER TO GLOBAL CORPORATE LEADERS" />

      {/* ── Value Prop: Why Top Recruiter Teams Trust SCI ── */}
      <section className="py-20 bg-muted/20 border-b border-border/40">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-bold tracking-widest text-emerald-500 mb-2 block">
              VALUE PROP
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Why Top Recruiter Teams Trust SCI
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              A multi-modal hiring suite that bypasses traditional job-portal noise, matching you directly with vetted students.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                stat: "5k+",
                title: "Institutes Nationwide",
                desc: "Gain direct digital placement keys to 5,000+ government and private institutions instantly without individual tie-ups.",
              },
              {
                stat: "94%",
                title: "AI Match Precision",
                desc: "Our vetting system analyzes verified transcript marks, coding commits, and skill challenges to drop target profiles in your inbox.",
              },
              {
                stat: "100%",
                title: "End-to-End Suite",
                desc: "Host virtual drives, deploy automated coding tests, manage bulk candidates, and extend offers on one secure dashboard.",
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-border/70 bg-card p-6 shadow-xs"
              >
                <span className="text-3xl sm:text-4xl font-black text-emerald-500 font-mono block mb-2">
                  {card.stat}
                </span>
                <h3 className="text-base font-bold text-foreground mb-2">{card.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Engineered for Scalable Sourcing ── */}
      <section className="py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-bold tracking-widest text-emerald-500 mb-2 block">
              HIRING SOLUTIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Engineered for Scalable Sourcing
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Advanced developer and recruiting consoles tailored to optimize every stage of campus placement drives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Campus Drive Management",
                desc: "Automate multi-university campus schedules, track candidate signups, and keep college TNP cells aligned.",
                icon: Building2,
              },
              {
                title: "Virtual Interview Platform",
                desc: "Conduct audio, video, and collaborative coding rounds with built-in evaluation sheets and whiteboards.",
                icon: Sparkles,
              },
              {
                title: "Skill-Based Filtering",
                desc: "Deploy custom challenges on next-gen tech, medical, or commerce disciplines to vet baseline skills before interviews.",
                icon: Code2,
              },
              {
                title: "Bulk Offer Management",
                desc: "Instantly create, dispatch, and track thousands of pre-formatted offer letters, saving days of manual HR cycles.",
                icon: FileCheck2,
              },
              {
                title: "Employer Branding",
                desc: "Showcase your work culture, tech stack, and virtual hackathons on premier university notice boards across states.",
                icon: Award,
              },
              {
                title: "Diversity Sourcing Tools",
                desc: "Leverage automated pipelines to easily fulfill ESG targets and gender diversity initiatives nationally.",
                icon: Users,
              },
            ].map((item, idx) => {
              const ItemIcon = item.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-border/70 bg-card p-6 shadow-xs hover:border-emerald-500/40 hover:-translate-y-1 transition-all group"
                >
                  <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 w-fit mb-5 group-hover:scale-110 transition-transform">
                    <ItemIcon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Seamless Recruiting in 4 Steps ── */}
      <section className="py-24 bg-muted/20 border-y border-border/40">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-bold tracking-widest text-emerald-500 mb-2 block">
              WORKFLOW
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Seamless Recruiting in 4 Steps
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              How recruiters leverage the automated SCI platform to go from sourcing needs to verified day-1 hires.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              {
                step: "01",
                title: "Post Requirements",
                desc: "Input job roles, stipends, and target university tiers on your enterprise dashboard.",
              },
              {
                step: "02",
                title: "Get Matches",
                desc: "Review vetted shortlists of students backed by standard academic transcripts.",
              },
              {
                step: "03",
                title: "Run Virtual Drives",
                desc: "Schedule online hackathons, coding challenges, and panel video interviews.",
              },
              {
                step: "04",
                title: "Extend Offers",
                desc: "Dispatch unified offer packages and track real-time join commits.",
              },
            ].map((step, idx) => (
              <div key={idx} className="p-6 rounded-2xl border border-border/70 bg-card shadow-xs">
                <span className="text-3xl font-black font-mono text-emerald-500/40 block mb-4">
                  {step.step}
                </span>
                <h3 className="text-base font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Sourcing ROI Banner */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-8 rounded-2xl border border-border/70 bg-card text-center max-w-5xl mx-auto shadow-xs">
            <div>
              <span className="text-3xl sm:text-4xl font-black text-emerald-500 font-mono">60%</span>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-1">Cost Per Hire Saved</p>
            </div>
            <div>
              <span className="text-3xl sm:text-4xl font-black text-emerald-500 font-mono">45%</span>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-1">Time-to-Hire Reduced</p>
            </div>
            <div>
              <span className="text-3xl sm:text-4xl font-black text-emerald-500 font-mono">3x</span>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-1">More Vetted Candidates</p>
            </div>
            <div>
              <span className="text-3xl sm:text-4xl font-black text-emerald-500 font-mono">500+</span>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-1">Campus Drives Run</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Case Study: Proven Sourcing Achievements ── */}
      <section className="py-20">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border/70 bg-card p-8 shadow-sm">
            <span className="text-[10px] font-mono uppercase font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-4 inline-block">
              SUCCESS STORY • TechCorp Case Report
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
              How TechCorp hired 200 engineers from 50 campuses in 2 weeks using SCI
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground italic leading-relaxed mb-6">
              &ldquo;Traditional drive schedules consumed 2 full months of HR bandwidth. Moving our campus pipeline
              to SCI&apos;s virtual sourcing loop cut total overhead by 75% while boosting first-year employee retention.&rdquo;
            </p>
            <div className="flex items-center gap-3 pt-4 border-t border-border/50">
              <div className="h-9 w-9 rounded-full bg-emerald-500/10 text-emerald-500 font-bold flex items-center justify-center text-xs">
                SK
              </div>
              <div>
                <h4 className="text-xs font-bold text-foreground">Sandeep Kulkarni</h4>
                <p className="text-[11px] text-muted-foreground">Talent Acquisition Head, TechCorp India</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sourcing Pricing Plans ── */}
      <section id="pricing" className="py-24 bg-muted/20 border-t border-border/40">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-bold tracking-widest text-emerald-500 mb-2 block">
              PRICING PLANS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Select Sourcing Plan
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              No hidden platform fees. Transparent national plans curated to accommodate active recruitment volumes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
            {/* Pay-Per-Drive */}
            <div className="rounded-2xl border border-border/70 bg-card p-7 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-foreground mb-1">Pay-Per-Drive</h3>
                <p className="text-xs text-muted-foreground mb-4">Best for startups or firms with seasonal hiring schedules.</p>
                <div className="mb-6">
                  <span className="text-3xl font-black text-foreground">₹ 15,000</span>
                  <span className="text-xs text-muted-foreground ml-1">/ Drive</span>
                </div>
                <ul className="space-y-3 pt-4 border-t border-border/50 text-xs">
                  {[
                    "Verify and interview up to 200 Students",
                    "Advanced Screening filters",
                    "Full Virtual Interview dashboard access",
                    "Standard email helpdesk support",
                  ].map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/industry/register"
                className="mt-8 w-full inline-flex items-center justify-center h-10 rounded-xl border border-border text-xs font-bold hover:bg-muted transition-colors"
              >
                Post a Drive
              </Link>
            </div>

            {/* Annual Partnership (Popular) */}
            <div className="rounded-2xl border-2 border-emerald-500 bg-card p-7 shadow-xl shadow-emerald-500/10 flex flex-col justify-between relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] uppercase font-black tracking-wider">
                POPULAR
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-1">Annual Partnership</h3>
                <p className="text-xs text-muted-foreground mb-4">Designed for mid-market corporate teams scaling hires.</p>
                <div className="mb-6">
                  <span className="text-3xl font-black text-foreground">₹ 1,80,000</span>
                  <span className="text-xs text-muted-foreground ml-1">/ Year</span>
                </div>
                <ul className="space-y-3 pt-4 border-t border-border/50 text-xs">
                  {[
                    "Run Unlimited Campus Drives",
                    "AI-Powered candidate matching active",
                    "Vetted transcript credential verify key",
                    "Collaborate with 5,000+ TNP cells",
                    "24/7 Priority chat & phone support",
                  ].map((f, i) => (
                    <li key={i} className="flex items-center gap-2 font-medium text-foreground">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/industry/register"
                className="mt-8 w-full inline-flex items-center justify-center h-11 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors shadow-md"
              >
                Get Annual Access
              </Link>
            </div>

            {/* Enterprise Custom */}
            <div className="rounded-2xl border border-border/70 bg-card p-7 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-foreground mb-1">Enterprise Custom</h3>
                <p className="text-xs text-muted-foreground mb-4">For Fortune 500 giants with custom compliance demands.</p>
                <div className="mb-6">
                  <span className="text-3xl font-black text-foreground">Custom Quote</span>
                </div>
                <ul className="space-y-3 pt-4 border-t border-border/50 text-xs">
                  {[
                    "Full White-labeled recruitment portal",
                    "Dedicated developer support & API keys",
                    "Unlimited transcript credential vetting",
                    "SLA backed priority uptime guarantees",
                    "Dedicated account audit managers",
                  ].map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/contact"
                className="mt-8 w-full inline-flex items-center justify-center h-10 rounded-xl border border-border text-xs font-bold hover:bg-muted transition-colors"
              >
                Contact Enterprise
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Partner with SCI Today CTA ── */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-center">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
            Find Your Next Star Employee — Partner with SCI Today
          </h2>
          <p className="text-sm sm:text-base text-emerald-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands of top companies sourcing pre-verified talent directly from premier Indian institutes on a single secure ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/industry/register"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-white text-emerald-700 px-8 text-sm font-bold shadow-lg hover:bg-emerald-50 transition-all hover:scale-105"
            >
              Register Your Enterprise
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-white/30 text-white px-8 text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              Talk to Sourcing Expert
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
