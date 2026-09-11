"use client";

import { useState } from "react";
import Link from "next/link";
import {
  STREAM_CATEGORIES,
  STUDENT_STORIES,
} from "@/lib/constants/public-navigation";
import {
  Search,
  MapPin,
  Sparkles,
  Target,
  Briefcase,
  Award,
  FileText,
  Code2,
  Users,
  Check,
  X,
  ArrowRight,
  ShieldCheck,
  Building2,
  Calendar,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

export default function StudentPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedStream, setSelectedStream] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const sampleOpportunities = [
    {
      title: "Systems Software Engineer Intern",
      company: "Google India",
      location: "Bangalore",
      stipend: "₹ 1,15,000 / mo",
      type: "Summer 2026",
      stream: "engineering",
      skills: ["C++", "Distributed Systems", "Algorithms"],
      matchRate: "98%",
    },
    {
      title: "Associate Product Strategy Intern",
      company: "McKinsey & Company",
      location: "Mumbai",
      stipend: "₹ 90,000 / mo",
      type: "Winter 2026",
      stream: "management",
      skills: ["Market Modeling", "SQL", "Strategic Roadmaps"],
      matchRate: "95%",
    },
    {
      title: "Cloud Infrastructure Specialist",
      company: "Reliance Jio Platforms",
      location: "Hyderabad",
      stipend: "₹ 80,000 / mo",
      type: "Full-Time Campus Drive",
      stream: "engineering",
      skills: ["Kubernetes", "Go", "Network Engineering"],
      matchRate: "92%",
    },
    {
      title: "UX Design & Interaction Researcher",
      company: "Flipkart",
      location: "Bangalore",
      stipend: "₹ 75,000 / mo",
      type: "Summer 2026",
      stream: "design",
      skills: ["Figma", "User Research", "Design Systems"],
      matchRate: "94%",
    },
  ];

  const filteredOpportunities = sampleOpportunities.filter((opp) => {
    const matchesQuery =
      !searchQuery ||
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCity =
      selectedCity === "All Cities" || opp.location.toLowerCase() === selectedCity.toLowerCase();
    const matchesStream = !selectedStream || opp.stream === selectedStream;
    return matchesQuery && matchesCity && matchesStream;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* ── Student Hero Section ── */}
      <section className="relative pt-12 pb-20 md:pt-16 md:pb-24 border-b border-border/40 overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] -z-10 pointer-events-none opacity-30 dark:opacity-20">
          <div className="absolute top-10 left-1/3 w-80 h-80 bg-blue-500/25 rounded-full blur-3xl" />
          <div className="absolute top-24 right-1/4 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left: Heading & Search Form */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold">
                <span className="flex h-1.5 w-1.5 rounded-full bg-blue-500" />
                <span>NATIONAL PLACEMENTS DIRECTORY</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-foreground leading-[1.08]">
                Your Career <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Starts Here
                </span>
              </h1>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
                Join the apex network designed to elevate your career journey. Access pre-verified internships,
                standard mock interviews, and connect with faculty mentors from premier universities.
              </p>

              {/* Interactive Dual Filter Search Bar */}
              <div className="p-2 rounded-2xl border border-border/80 bg-card/90 backdrop-blur-md shadow-md shadow-primary/5 space-y-2 sm:space-y-0 sm:flex sm:items-center sm:gap-2">
                <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-xl bg-muted/40 border border-border/40 focus-within:border-primary/50 focus-within:bg-background transition-colors">
                  <Search className="h-4 w-4 text-muted-foreground shrink-0" />
                  <input
                    type="text"
                    placeholder="Role, skills, or stream..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setHasSearched(true);
                    }}
                    className="w-full bg-transparent text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-hidden"
                  />
                </div>

                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-muted/40 border border-border/40 shrink-0">
                  <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                  <select
                    value={selectedCity}
                    onChange={(e) => {
                      setSelectedCity(e.target.value);
                      setHasSearched(true);
                    }}
                    className="bg-transparent text-xs sm:text-sm text-foreground focus:outline-hidden cursor-pointer"
                  >
                    <option value="All Cities">All India</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi NCR">Delhi NCR</option>
                    <option value="Pune">Pune</option>
                  </select>
                </div>

                <button
                  onClick={() => setHasSearched(true)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs sm:text-sm font-semibold hover:bg-primary/95 transition-all shrink-0 shadow-xs"
                >
                  Find Opportunities
                </button>
              </div>

              {/* Active Jobs Pill */}
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                <span>AI MATCHING ACTIVE — 24,500 active jobs posted today</span>
              </div>
            </div>

            {/* Right: Live Matching Preview Card Widget */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-border/60">
                  <div className="flex items-center gap-2.5">
                    <div className="h-9 w-9 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold text-sm">
                      DV
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-foreground">Devendra Verma</h4>
                      <p className="text-[11px] text-muted-foreground">IIT Delhi • B.Tech CSE</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    98% Match
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-muted/40 border border-border/40">
                    <div className="flex items-center justify-between text-xs font-semibold mb-1">
                      <span>Target Role: Systems Software Engineer</span>
                      <span className="text-primary font-bold">Google India</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-card border border-border/60">C++</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-card border border-border/60">Distributed Systems</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-card border border-border/60">Algorithms</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-muted-foreground">Transcript Verified:</span>
                    <span className="font-semibold text-emerald-500 flex items-center gap-1">
                      <ShieldCheck className="h-3.5 w-3.5" /> CGPA 9.4 (Apex Tier-1)
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 text-[11px] text-primary leading-relaxed">
                    ⚡ Fast-tracked to technical panel interviews via National AI Talent Pool.
                  </div>
                </div>
              </div>

              {/* Floating micro-badge */}
              <div className="absolute -bottom-4 -left-4 hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border/80 shadow-lg text-xs font-bold">
                <Sparkles className="h-4 w-4 text-amber-500" />
                <span>Standardized ATS Compliant</span>
              </div>
            </div>
          </div>

          {/* Interactive Search Results Drawer (if user searched or filtered) */}
          {hasSearched && (
            <div className="mt-8 p-5 rounded-2xl border border-primary/30 bg-card shadow-lg animate-in fade-in duration-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-foreground">
                  Active Results ({filteredOpportunities.length} matches found)
                </h3>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCity("All Cities");
                    setSelectedStream(null);
                    setHasSearched(false);
                  }}
                  className="text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  Clear filters
                </button>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {filteredOpportunities.map((opp, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-border/60 bg-muted/20 hover:bg-muted/40 transition-colors flex items-start justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-foreground">{opp.title}</span>
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                          {opp.matchRate}
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground mb-2">
                        {opp.company} • {opp.location} • <span className="font-semibold text-foreground">{opp.stipend}</span>
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {opp.skills.map((s, sIdx) => (
                          <span key={sIdx} className="text-[9px] px-1.5 py-0.2 rounded-sm bg-card border border-border/50">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Link
                      href="/student/register"
                      className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold shrink-0 hover:bg-primary/90 transition-colors"
                    >
                      Apply
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Features: Engineered to Give You the Edge ── */}
      <section id="assessment" className="py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-bold tracking-widest text-primary mb-2 block">
              FEATURES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Engineered to Give You the Edge
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Everything you need to successfully navigate, learn, and grow into modern high-tier industries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "AI-Powered Job Matching",
                desc: "Our engine targets specific corporate roles based on verified university transcripts and GitHub/portfolio scans.",
                icon: Target,
              },
              {
                title: "Internship Marketplace",
                desc: "Access high-stipend pre-verified summer & winter internships directly from Fortune 500 corporations.",
                icon: Briefcase,
              },
              {
                title: "Skill Certification",
                desc: "Gain valid national credentials on specialized tech, medical, and business streams backed by apex authorities.",
                icon: Award,
              },
              {
                title: "ATS Resume Builder",
                desc: "Create standards-compliant PDF resumes instantly, formatted automatically to meet rigorous corporate system filters.",
                icon: FileText,
              },
              {
                title: "Mock Interview Prep",
                desc: "Practice real coding and business rounds using our custom browser prep dashboard with automated AI feedback.",
                icon: Code2,
              },
              {
                title: "Mentor Network",
                desc: "Connect directly with experienced faculty and top corporate managers for guidance on your specific stream.",
                icon: Users,
              },
            ].map((feat, idx) => {
              const FeatIcon = feat.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-border/70 bg-card p-6 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all group"
                >
                  <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit mb-5 group-hover:scale-110 transition-transform">
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

      {/* ── Categories: Browse Curated Streams ── */}
      <section id="streams" className="py-20 bg-muted/20 border-y border-border/40">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs uppercase font-bold tracking-widest text-primary mb-2 block">
              CATEGORIES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Browse Curated Streams
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Explore thousands of pre-verified national jobs and internships grouped logically by core streams.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {STREAM_CATEGORIES.map((stream) => {
              const StreamIcon = stream.icon;
              const isCurrent = selectedStream === stream.id;
              return (
                <button
                  key={stream.id}
                  onClick={() => {
                    setSelectedStream(isCurrent ? null : stream.id);
                    setHasSearched(true);
                  }}
                  className={`text-left p-5 rounded-2xl border transition-all cursor-pointer ${
                    isCurrent
                      ? "border-primary bg-primary/5 ring-1 ring-primary/40 shadow-sm"
                      : "border-border/70 bg-card hover:border-border hover:bg-card/80 hover:-translate-y-0.5"
                  }`}
                >
                  <div className={`p-2.5 rounded-xl w-fit mb-3 ${stream.color}`}>
                    <StreamIcon className="h-5 w-5" />
                  </div>
                  <h4 className="text-sm font-bold text-foreground mb-1">{stream.name}</h4>
                  <span className="text-xs font-mono text-muted-foreground">{stream.count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Comparison: The SCI Difference ── */}
      <section className="py-24">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs uppercase font-bold tracking-widest text-primary mb-2 block">
              COMPARISON
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              The SCI Difference
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Explore why millions of Indian students are switching from traditional search to the apex SCI network.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Traditional Portals */}
            <div className="rounded-2xl border border-border/70 bg-muted/20 p-6 sm:p-8">
              <h3 className="text-base font-bold text-muted-foreground mb-6 pb-4 border-b border-border/50">
                Traditional Job Portals
              </h3>
              <ul className="space-y-4">
                {[
                  "Unverified metrics leading to corporate resume filters",
                  "High application volumes with <2% response rates",
                  "Self-reported metrics requiring manual HR reviews",
                  "Zero mentorship connection to faculty administrators",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-muted-foreground">
                    <X className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* On SCI Apex Platform */}
            <div className="rounded-2xl border border-primary/40 bg-card p-6 sm:p-8 shadow-md relative overflow-hidden">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/50">
                <h3 className="text-base font-bold text-foreground">
                  On SCI Apex Platform
                </h3>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                  Verified Tier
                </span>
              </div>
              <ul className="space-y-4">
                {[
                  "Pre-verified transcript score ensures highest recruiter review tier",
                  "Direct pipeline from premier national corporate partnerships",
                  "Standard resume formatting completely prevents ATS dropouts",
                  "Seamless research collaboration & verified 1-on-1 mentor access",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-foreground">
                    <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Student Placement Stories ── */}
      <section className="py-20 bg-muted/20 border-t border-border/40">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-bold tracking-widest text-primary mb-2 block">
              SUCCESS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Student Placement Stories
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Real students, real colleges, real global offers secured on the unified SCI platform.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {STUDENT_STORIES.map((story, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-border/70 bg-card p-6 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-base font-bold text-foreground">{story.name}</h4>
                      <p className="text-xs text-muted-foreground">{story.college}</p>
                    </div>
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      {story.outcome}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground italic leading-relaxed mb-6">
                    &ldquo;{story.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-border/50 flex items-center justify-between text-xs">
                  <span className="font-semibold text-primary">{story.company}</span>
                  <span className="text-muted-foreground">{story.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Live Events: National Hackathons & Job Fairs ── */}
      <section id="events" className="py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs uppercase font-bold tracking-widest text-primary mb-2 block">
              LIVE EVENTS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              National Hackathons & Job Fairs
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Explore upcoming national competitions, career expos, and expert live webinars.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                tag: "Hackathon",
                deadline: "Register by March 15",
                title: "National Smart India Hackathon",
                desc: "Collaborate on critical government problem statements. Top prototypes win national CSR grants and incubator fast-tracks.",
              },
              {
                tag: "Job Fair",
                deadline: "Live on March 22",
                title: "Apex Tech Placement Fair 2026",
                desc: "Direct interview pathways with 200+ fast-growing startups and certified Fortune 500 enterprises.",
              },
              {
                tag: "Webinar",
                deadline: "April 05 • 3 PM IST",
                title: "Building AI-Native Products",
                desc: "A live session with Google India's VP of engineering explaining next-generation developer environments.",
              },
            ].map((event, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-border/70 bg-card p-6 shadow-xs flex flex-col justify-between hover:border-primary/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 text-xs font-semibold">
                    <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                      {event.tag}
                    </span>
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {event.deadline}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-2">{event.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                    {event.desc}
                  </p>
                </div>

                <Link
                  href="/student/register"
                  className="inline-flex items-center text-xs font-semibold text-primary hover:underline"
                >
                  Register for Event <ArrowRight className="h-3 w-3 ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Student Registration CTA Banner ── */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
            Start Your Journey — Register as a Student Today
          </h2>
          <p className="text-sm sm:text-base text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Create your verified student profile to unlock matches, standard transcripts, and expert mentors.
          </p>
          <Link
            href="/student/register"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-white text-blue-600 px-8 text-sm font-bold shadow-lg hover:bg-blue-50 transition-all hover:scale-105"
          >
            Register Student Profile
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}
