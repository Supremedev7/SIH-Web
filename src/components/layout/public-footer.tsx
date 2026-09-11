import Link from "next/link";
import { ShieldCheck, School, Heart } from "lucide-react";

export function PublicFooter() {
  return (
    <footer className="border-t border-border/60 bg-muted/30 text-muted-foreground transition-colors">
      {/* ── Main Links ── */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand Info & Authority */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground font-black text-base shadow-sm">
                <span className="font-mono">SCI</span>
              </div>
              <div>
                <span className="font-bold text-base text-foreground tracking-tight">
                  Student Council of India
                </span>
                <span className="block text-[11px] text-muted-foreground">
                  Apex Collaboration Network
                </span>
              </div>
            </Link>

            <p className="text-xs text-muted-foreground/90 leading-relaxed pr-6">
              SCI is India&apos;s premier integrated apex platform linking academic talent,
              educational institutions, industry mentors, and faculty leaders to forge a
              self-reliant, high-skill knowledge economy.
            </p>

            <div className="flex items-center gap-2 pt-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="h-4 w-4" />
              <span>National Academic-Industry Synergy Cell</span>
            </div>
          </div>

          {/* Column 1: For Students */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">
              For Students
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/student#internships" className="hover:text-foreground transition-colors">
                  Internships Marketplace
                </Link>
              </li>
              <li>
                <Link href="/student#assessment" className="hover:text-foreground transition-colors">
                  AI Skill Assessment
                </Link>
              </li>
              <li>
                <Link href="/student#resume" className="hover:text-foreground transition-colors">
                  ATS Resume Builder
                </Link>
              </li>
              <li>
                <Link href="/student#prep" className="hover:text-foreground transition-colors">
                  Mock Interview Prep
                </Link>
              </li>
              <li>
                <Link href="/student#mentors" className="hover:text-foreground transition-colors">
                  Faculty Mentorship
                </Link>
              </li>
              <li>
                <Link href="/student#events" className="hover:text-foreground transition-colors">
                  National Hackathons
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: For Institutes */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">
              For Institutes
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/institution#digital-cell" className="hover:text-foreground transition-colors">
                  T&P Cell Dashboard
                </Link>
              </li>
              <li>
                <Link href="/institution#pipeline" className="hover:text-foreground transition-colors">
                  Industry Recruiter Pipeline
                </Link>
              </li>
              <li>
                <Link href="/institution#accreditation" className="hover:text-foreground transition-colors">
                  NAAC / NIRF Exporter
                </Link>
              </li>
              <li>
                <Link href="/institution#analytics" className="hover:text-foreground transition-colors">
                  Placement Analytics
                </Link>
              </li>
              <li>
                <Link href="/institution#scheduling" className="hover:text-foreground transition-colors">
                  Automated Scheduling
                </Link>
              </li>
              <li>
                <Link href="/institution#pricing" className="hover:text-foreground transition-colors">
                  Pricing & Tiers
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: For Industry */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">
              For Industry
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/industry#sourcing-console" className="hover:text-foreground transition-colors">
                  Candidate Sourcing Console
                </Link>
              </li>
              <li>
                <Link href="/industry#campus-drives" className="hover:text-foreground transition-colors">
                  Virtual Campus Drives
                </Link>
              </li>
              <li>
                <Link href="/industry#filtering" className="hover:text-foreground transition-colors">
                  Skill-Based Shortlisting
                </Link>
              </li>
              <li>
                <Link href="/industry#rnd" className="hover:text-foreground transition-colors">
                  University R&D Hub
                </Link>
              </li>
              <li>
                <Link href="/industry#csr" className="hover:text-foreground transition-colors">
                  CSR Skill Initiatives
                </Link>
              </li>
              <li>
                <Link href="/industry#pricing" className="hover:text-foreground transition-colors">
                  Enterprise Sourcing Plans
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Faculty Cell */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">
              Faculty Cell
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/academician#mentorship" className="hover:text-foreground transition-colors">
                  Student Mentorship Portal
                </Link>
              </li>
              <li>
                <Link href="/academician#research" className="hover:text-foreground transition-colors">
                  Joint Corporate Research
                </Link>
              </li>
              <li>
                <Link href="/academician#consulting" className="hover:text-foreground transition-colors">
                  Consulting Marketplace
                </Link>
              </li>
              <li>
                <Link href="/academician#fdp" className="hover:text-foreground transition-colors">
                  Specialized FDP Workshops
                </Link>
              </li>
              <li>
                <Link href="/academician#sabbatical" className="hover:text-foreground transition-colors">
                  Sabbatical Internships
                </Link>
              </li>
              <li>
                <Link href="/academician#patents" className="hover:text-foreground transition-colors">
                  Patent Commercialization
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Sub-Footer Bar ── */}
      <div className="border-t border-border/40 py-6 bg-muted/50 text-[11px]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-center sm:text-left">
            © {new Date().getFullYear()} Student Council of India (SCI). Government-partnered national apex directory. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link href="/security" className="hover:text-foreground transition-colors">
              Security Standards
            </Link>
            <Link href="/helpdesk" className="hover:text-foreground transition-colors">
              National Helpdesk
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
