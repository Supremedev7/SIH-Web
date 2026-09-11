"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building2,
  TrendingUp,
  BarChart3,
  CalendarCheck,
  ShieldCheck,
  FileSpreadsheet,
  Network,
  Users,
  Check,
  ArrowRight,
  Sparkles,
  Award,
  Clock,
  Layers,
  HelpCircle,
} from "lucide-react";

export default function InstitutionPage() {
  const [activeWeek, setActiveWeek] = useState(5);

  const weeklyData = [
    { week: "W01", count: 42, label: "Initial Drives" },
    { week: "W02", count: 68, label: "Aptitude Tests" },
    { week: "W03", count: 95, label: "Tech Rounds" },
    { week: "W04", count: 124, label: "HR Panels" },
    { week: "W05", count: 156, label: "Final Offers" },
    { week: "W06", count: 182, label: "Offer Letters" },
    { week: "W07", count: 210, label: "Joining Commits" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* ── Institute Hero Section ── */}
      <section className="relative pt-12 pb-20 md:pt-16 md:pb-24 border-b border-border/40 overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] -z-10 pointer-events-none opacity-30 dark:opacity-20">
          <div className="absolute top-10 left-1/3 w-80 h-80 bg-amber-500/25 rounded-full blur-3xl" />
          <div className="absolute top-24 right-1/4 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left: Heading & Value Prop */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold">
                <span className="flex h-1.5 w-1.5 rounded-full bg-amber-500" />
                <span>NATIONAL PLACEMENTS DIRECTORY</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-foreground leading-[1.08]">
                Transform Campus <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600">
                  Placements
                </span>
              </h1>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
                Equip your Training & Placement cell with a comprehensive dashboard. Effortlessly verify
                credentials, invite Fortune 500 recruiters, track analytics, and boost placement success rates by
                up to 25%.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Link
                  href="/institution/register"
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm px-6 shadow-md shadow-amber-500/20 transition-all"
                >
                  Partner with SCI
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
                <Link
                  href="#pricing"
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-border bg-card px-6 text-xs sm:text-sm font-semibold hover:bg-muted transition-colors"
                >
                  View Pricing Tiers
                </Link>
              </div>
            </div>

            {/* Right: Interactive Placement Analytics Widget */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xl relative">
                {/* Console header */}
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-border/60">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-amber-500" />
                    <span className="text-xs font-bold text-foreground">Placement Analytics</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border/60">
                    Live Data
                  </span>
                </div>

                {/* Key Metric Cards */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-muted/40 border border-border/50">
                    <span className="text-xs text-muted-foreground block mb-1">Overall Placement</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-foreground">94.2%</span>
                      <span className="text-xs font-bold text-emerald-500">+6.4%</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-muted/40 border border-border/50">
                    <span className="text-xs text-muted-foreground block mb-1">Active Recruiters</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-foreground">148</span>
                      <span className="text-xs font-bold text-emerald-500">+22 Co&apos;s</span>
                    </div>
                  </div>
                </div>

                {/* Interactive Weekly Success Bar Chart */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-foreground">Weekly Student Application Success</span>
                    <span className="text-muted-foreground font-mono">
                      Selected: {weeklyData[activeWeek].week} ({weeklyData[activeWeek].count} offers)
                    </span>
                  </div>

                  <div className="h-28 flex items-end justify-between gap-2 pt-4 px-2 bg-muted/20 rounded-xl border border-border/40">
                    {weeklyData.map((d, idx) => {
                      const heightPercent = (d.count / 220) * 100;
                      const isActive = activeWeek === idx;
                      return (
                        <button
                          key={d.week}
                          onClick={() => setActiveWeek(idx)}
                          className="flex-1 flex flex-col items-center gap-1 group cursor-pointer focus:outline-hidden"
                        >
                          <div
                            style={{ height: `${heightPercent}%` }}
                            className={`w-full rounded-t-md transition-all ${
                              isActive
                                ? "bg-amber-500 shadow-md shadow-amber-500/30"
                                : "bg-muted-foreground/30 group-hover:bg-amber-500/60"
                            }`}
                          />
                          <span
                            className={`text-[10px] font-mono ${
                              isActive ? "font-bold text-amber-500" : "text-muted-foreground"
                            }`}
                          >
                            {d.week}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>Accreditation Ready: NAAC Criterion 5.2</span>
                  <span className="text-emerald-500 font-semibold flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5" /> ISO 27001 Certified
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Common Challenges Placement Cells Face ── */}
      <section className="py-20 bg-muted/20 border-b border-border/40">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-bold tracking-widest text-amber-500 mb-2 block">
              CHALLENGES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Common Challenges Placement Cells Face
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              We surveyed hundreds of Indian placement officers to identify the key hurdles to campus hiring loops.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: "Manual Processes",
                desc: "Tracking batches on spreadsheets leads to slow outreach and error-prone credential logging during peak hiring season.",
                icon: FileSpreadsheet,
              },
              {
                title: "Limited Connections",
                desc: "Struggling to capture global or tier-1 recruiter pipelines outside of standard metropolitan regions.",
                icon: Network,
              },
              {
                title: "Lack of Readiness Data",
                desc: "No standardized student scores to confidently benchmark candidates before high-stakes interviews begin.",
                icon: BarChart3,
              },
            ].map((c, idx) => {
              const ChallengeIcon = c.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-border/70 bg-card p-6 shadow-xs"
                >
                  <div className="p-3 rounded-xl bg-rose-500/10 text-rose-500 w-fit mb-5">
                    <ChallengeIcon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-2">{c.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── The SCI Apex Solution Suite ── */}
      <section className="py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-bold tracking-widest text-amber-500 mb-2 block">
              SOLUTIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              The SCI Apex Solution Suite
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Standardize and run your campus placement loop on a secure national platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Digital Placement Cell",
                desc: "Invite companies, schedule placement sessions, and manage candidate workflows on one apex dashboard.",
                icon: Building2,
              },
              {
                title: "Industry Pipeline",
                desc: "Direct outreach connections to thousands of pre-verified hiring managers nationally.",
                icon: Users,
              },
              {
                title: "Readiness Scores",
                desc: "Benchmark student skill sets automatically using valid, vetted, and authority-backed test pools.",
                icon: Award,
              },
              {
                title: "Automated Scheduling",
                desc: "Auto-coordinate resume drops, virtual rounds, and final interview calendars without overlaps.",
                icon: CalendarCheck,
              },
              {
                title: "Vetted Reports",
                desc: "Instantly compile complex audit summaries, benchmarking profiles, and compliance documents.",
                icon: BarChart3,
              },
              {
                title: "Accreditation Support",
                desc: "Maintain structured, ready-to-audit databases to support NAAC and NIRF college review seasons.",
                icon: ShieldCheck,
              },
            ].map((sol, idx) => {
              const SolIcon = sol.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-border/70 bg-card p-6 shadow-xs hover:border-amber-500/40 hover:-translate-y-1 transition-all group"
                >
                  <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500 w-fit mb-5 group-hover:scale-110 transition-transform">
                    <SolIcon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-2">{sol.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{sol.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Transparent National Pricing Plans ── */}
      <section id="pricing" className="py-24 bg-muted/20 border-t border-border/40">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-bold tracking-widest text-amber-500 mb-2 block">
              TIERS & PLANS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Transparent National Pricing Plans
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Select a package designed to fit your university size. No surprise fees. Solid, clear tier choices.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
            {/* Starter Plan */}
            <div className="rounded-2xl border border-border/70 bg-card p-7 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-foreground mb-1">Starter</h3>
                <p className="text-xs text-muted-foreground mb-4">For small colleges starting automated placements.</p>
                <div className="mb-6">
                  <span className="text-3xl font-black text-foreground">Free</span>
                  <span className="text-xs text-muted-foreground ml-1">/ Year</span>
                </div>
                <ul className="space-y-3 pt-4 border-t border-border/50 text-xs">
                  {["Verify up to 100 Students", "Standard Placement Console", "Basic Email Support"].map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-amber-500 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/institution/register"
                className="mt-8 w-full inline-flex items-center justify-center h-10 rounded-xl border border-border text-xs font-bold hover:bg-muted transition-colors"
              >
                Get Started
              </Link>
            </div>

            {/* Growth Plan (Popular) */}
            <div className="rounded-2xl border-2 border-amber-500 bg-card p-7 shadow-xl shadow-amber-500/10 flex flex-col justify-between relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-amber-500 text-white text-[10px] uppercase font-black tracking-wider">
                POPULAR
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-1">Growth Plan</h3>
                <p className="text-xs text-muted-foreground mb-4">
                  For mid-sized institutions seeking robust industry access.
                </p>
                <div className="mb-6">
                  <span className="text-3xl font-black text-foreground">₹ 49,000</span>
                  <span className="text-xs text-muted-foreground ml-1">/ Year</span>
                </div>
                <ul className="space-y-3 pt-4 border-t border-border/50 text-xs">
                  {[
                    "Verify up to 1,000 Students",
                    "Full Placements Dashboard",
                    "AI-Powered Job Matching",
                    "Direct Recruiter Outreach",
                    "24/7 Priority Support",
                  ].map((f, i) => (
                    <li key={i} className="flex items-center gap-2 font-medium text-foreground">
                      <Check className="h-4 w-4 text-amber-500 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/institution/register"
                className="mt-8 w-full inline-flex items-center justify-center h-11 rounded-xl bg-amber-500 text-white text-xs font-bold hover:bg-amber-600 transition-colors shadow-md"
              >
                Subscribe Now
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="rounded-2xl border border-border/70 bg-card p-7 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-foreground mb-1">Enterprise</h3>
                <p className="text-xs text-muted-foreground mb-4">
                  For multi-campus universities demanding full custom support.
                </p>
                <div className="mb-6">
                  <span className="text-3xl font-black text-foreground">Custom</span>
                  <span className="text-xs text-muted-foreground ml-1">/ Year</span>
                </div>
                <ul className="space-y-3 pt-4 border-t border-border/50 text-xs">
                  {[
                    "Unlimited Student Verifications",
                    "Accreditation Compliant DB",
                    "Dedicated Account Manager",
                    "White-labeled Portal Domain",
                  ].map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-amber-500 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/contact"
                className="mt-8 w-full inline-flex items-center justify-center h-10 rounded-xl border border-border text-xs font-bold hover:bg-muted transition-colors"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Institutes Network Coverage ── */}
      <section className="py-20 border-t border-border/40">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase font-bold tracking-widest text-amber-500 mb-2 block">
            INSTITUTES NETWORK
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
            National Footprint & Coverage
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mb-10 max-w-2xl mx-auto">
            SCI unites leading government and private colleges on a single network map.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto mb-6">
            {[
              "IIT Bombay",
              "NIT Calicut",
              "VIT Vellore",
              "SRM University",
              "Delhi University",
              "Anna University",
              "DTU Delhi",
              "RVCE Bangalore",
            ].map((college, idx) => (
              <span
                key={idx}
                className="px-4 py-2 rounded-xl border border-border/70 bg-card text-xs font-semibold text-foreground shadow-xs"
              >
                {college}
              </span>
            ))}
          </div>

          <p className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400">
            Active coverage across 28 states and 8 union territories.
          </p>
        </div>
      </section>

      {/* ── Elevate Campus Placements CTA ── */}
      <section className="py-20 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-center">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
            Elevate Your Campus Placements — Join SCI
          </h2>
          <p className="text-sm sm:text-base text-amber-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Transform your T&P cell performance. Register as an institute partner today.
          </p>
          <Link
            href="/institution/register"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-white text-amber-600 px-8 text-sm font-bold shadow-lg hover:bg-amber-50 transition-all hover:scale-105"
          >
            Partner with SCI Now
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}
