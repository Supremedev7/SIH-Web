"use client";

import {
  Calendar,
  UserPlus,
  Users,
  GraduationCap,
  TrendingUp,
  History,
  CheckCheck,
  Star,
  StarHalf,
  Filter,
  Download,
  MessageSquare,
  ExternalLink,
  MoreVertical,
  CalendarCheck,
  Video,
  Link,
  ShieldCheck,
  Clock,
  Medal,
  ArrowRight,
  ChevronDown,
  BadgeCheck,
} from "lucide-react";

import type { MentorshipSession } from "@/types/industry-portal";

export function MentorshipClient({ initialSessions = [] }: { initialSessions?: MentorshipSession[] }) {
  const activeSessions = initialSessions.filter(s => s.status === 'scheduled');
  const pastSessions = initialSessions.filter(s => s.status === 'completed');
  
  return (
    <div className="flex flex-col gap-6 w-full max-w-[100vw] overflow-x-hidden pb-8">
      
      {/* Context Banner & Header */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card p-8 rounded-2xl shadow-sm border border-border/40">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center px-2.5 py-1 rounded bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
              SCI Network Engine
            </span>
            <span className="inline-flex items-center text-xs font-semibold text-muted-foreground gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Fall 2025 Cohort Active
            </span>
          </div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">
            Industry Mentorship & Expert Network
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Empower student talent through 1:1 guidance, technical portfolio reviews, and university masterclasses with verified corporate engineers.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-background border border-border/60 hover:bg-muted text-foreground text-sm font-semibold transition-all shadow-sm">
            <Calendar className="w-4 h-4" />
            Sync Calendar
          </button>
          <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold shadow-sm hover:shadow-md transition-all">
            <UserPlus className="w-4 h-4" />
            Enroll New Mentor
          </button>
        </div>
      </section>

      {/* Top KPI Summary Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="bg-card border border-border/40 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Active Corporate Mentors</span>
              <div className="text-4xl font-bold text-foreground mt-2 font-mono">34</div>
            </div>
            <span className="p-2.5 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Users className="w-5 h-5" />
            </span>
          </div>
          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1 text-emerald-500 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">
                <TrendingUp className="w-3.5 h-3.5" /> +6
              </span>
              <span>from Tata Research & Cloud Labs</span>
            </div>
            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full w-[85%]"></div>
            </div>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-card border border-border/40 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Total Student Mentees</span>
              <div className="text-4xl font-bold text-foreground mt-2 font-mono">182</div>
            </div>
            <span className="p-2.5 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </span>
          </div>
          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1 text-emerald-500 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">
                <TrendingUp className="w-3.5 h-3.5" /> +28
              </span>
              <span>across 9 Tier-1 universities</span>
            </div>
            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full w-[91%]"></div>
            </div>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-card border border-border/40 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Completed Sessions</span>
              <div className="text-4xl font-bold text-foreground mt-2 font-mono">428 <span className="text-base font-sans text-muted-foreground">Hours</span></div>
            </div>
            <span className="p-2.5 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <History className="w-5 h-5" />
            </span>
          </div>
          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1 text-emerald-500 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">
                <CheckCheck className="w-3.5 h-3.5" /> 96.4%
              </span>
              <span>attendance target met</span>
            </div>
            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary/80 rounded-full w-[76%]"></div>
            </div>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-card border border-border/40 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Avg Mentee Rating</span>
              <div className="flex items-baseline gap-1.5 mt-2">
                <span className="text-4xl font-bold text-foreground font-mono">4.92</span>
                <span className="text-sm font-semibold text-muted-foreground">/ 5.0</span>
              </div>
            </div>
            <span className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Star className="w-5 h-5" />
            </span>
          </div>
          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1 text-amber-500 font-bold bg-amber-500/10 px-1.5 py-0.5 rounded">
                98% Satisfaction
              </span>
              <span>(312 reviews)</span>
            </div>
            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full w-[98%]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Two-Column Layout */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Section (8 cols) */}
        <div className="lg:col-span-8 space-y-6 flex flex-col">
          
          {/* Active Mentee Cohort Roster */}
          <div className="bg-card border border-border/40 rounded-2xl shadow-sm overflow-hidden flex flex-col">
            <div className="p-5 bg-muted/30 border-b border-border/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-primary/10 text-primary rounded-xl">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground">Active Mentee Cohort Roster</h2>
                  <p className="text-xs text-muted-foreground">Live tracking of active university talent across engineering disciplines</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <select className="pl-9 pr-8 py-2 text-sm font-semibold bg-background border border-border/40 rounded-xl text-foreground focus:outline-none focus:ring-1 focus:ring-primary shadow-sm appearance-none cursor-pointer">
                    <option>All Specializations</option>
                    <option>Distributed Systems</option>
                    <option>GenAI / LLMs</option>
                    <option>DevOps & Cloud</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
                <button className="p-2 bg-background border border-border/40 text-foreground hover:bg-muted rounded-xl shadow-sm transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-muted/20 border-b border-border/40 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    <th className="px-5 py-3">Student & College</th>
                    <th className="px-5 py-3">Focus Area</th>
                    <th className="px-5 py-3">Corporate Mentor</th>
                    <th className="px-5 py-3">Next Session</th>
                    <th className="px-5 py-3">Milestones</th>
                    <th className="px-5 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {activeSessions.map((session, i) => (
                    <tr key={session.id} className="hover:bg-muted/30 transition-colors group">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <img className="w-10 h-10 rounded-full object-cover shadow-sm border border-border/60" alt="Student" src={session.user_profiles?.avatar_url || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"} />
                          <div className="flex flex-col">
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm font-bold text-foreground">{session.user_profiles?.full_name}</span>
                              <BadgeCheck className="w-3.5 h-3.5 text-blue-500" />
                            </div>
                            <span className="text-xs text-muted-foreground">{session.user_profiles?.department || 'Engineering'}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="bg-primary/10 text-primary text-[10px] px-2 py-1 rounded-md font-bold uppercase tracking-wider">Tech Session</span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-foreground">You</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-foreground font-mono">{new Date(session.scheduled_at).toLocaleDateString()}</span>
                          <span className="text-xs text-muted-foreground">{session.duration_minutes}m Session</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex flex-col gap-1.5 w-28">
                          <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase">
                            <span>Sprint</span>
                            <span className="text-primary">Ongoing</span>
                          </div>
                          <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full w-[50%]"></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-1.5 text-primary hover:bg-primary/10 rounded-md transition-colors" title="Log Session Feedback">
                            <MessageSquare className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors" title="View Mentee Portfolio">
                            <ExternalLink className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors" title="More options">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {activeSessions.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-6 text-muted-foreground">No active sessions</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="p-4 bg-muted/20 border-t border-border/40 flex items-center justify-between">
              <span className="text-xs text-muted-foreground font-semibold">Showing 3 of 182 active cohorts</span>
              <div className="flex items-center gap-1.5">
                <button className="px-3 py-1.5 rounded-lg bg-background border border-border/40 text-muted-foreground text-xs font-bold disabled:opacity-50">Prev</button>
                <button className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-bold shadow-sm">1</button>
                <button className="px-3 py-1.5 rounded-lg bg-background border border-border/40 text-foreground text-xs font-bold hover:bg-muted transition-colors">2</button>
                <button className="px-3 py-1.5 rounded-lg bg-background border border-border/40 text-foreground text-xs font-bold hover:bg-muted transition-colors">Next</button>
              </div>
            </div>
          </div>

          {/* Upcoming Sessions & Agenda */}
          <div className="bg-card border border-border/40 rounded-2xl shadow-sm p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <CalendarCheck className="text-primary w-6 h-6" />
                  Upcoming Technical Masterclasses & 1:1 Sessions
                </h2>
                <p className="text-xs text-muted-foreground mt-1">Interactive agenda for corporate engineering panels & direct 1:1 mock drills</p>
              </div>
              <div className="flex items-center gap-1 bg-muted/50 p-1.5 rounded-xl border border-border/40">
                <button className="px-4 py-1.5 text-xs font-bold rounded-lg bg-background text-foreground shadow-sm">Weekly View</button>
                <button className="px-4 py-1.5 text-xs font-bold rounded-lg text-muted-foreground hover:text-foreground transition-colors">Monthly</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Session 1 */}
              <div className="p-5 rounded-2xl bg-muted/30 border border-border/40 flex flex-col justify-between group hover:bg-muted/60 transition-colors cursor-pointer">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="bg-emerald-500 text-white text-[10px] font-bold uppercase px-2 py-1 rounded">TOMORROW • 16:00 IST</span>
                    <span className="bg-background border border-border/40 text-muted-foreground text-[10px] font-bold px-2 py-1 rounded shadow-sm">1:1 Architecture Review</span>
                  </div>
                  <Video className="w-5 h-5 text-primary shrink-0" />
                </div>
                <div className="my-4 space-y-2">
                  <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">System Design Mock: Microservices Cache Invalidation</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">Student: Ananya Deshmukh (IIT Roorkee) with Vikram Rao (Principal Cloud Architect). Focusing on Redis clustering, read-through patterns & consistency trade-offs.</p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-border/40">
                  <span className="text-xs font-mono text-muted-foreground">Room: <b className="text-foreground">eng-sci-409</b></span>
                  <button className="px-3 py-1.5 bg-primary text-primary-foreground text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-sm hover:bg-primary/90 transition-colors">
                    <Video className="w-3.5 h-3.5" /> Join Meet
                  </button>
                </div>
              </div>

              {/* Session 2 */}
              <div className="p-5 rounded-2xl bg-muted/30 border border-border/40 flex flex-col justify-between group hover:bg-muted/60 transition-colors cursor-pointer">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="bg-primary text-primary-foreground text-[10px] font-bold uppercase px-2 py-1 rounded">OCT 27 • 18:00 IST</span>
                    <span className="bg-background border border-border/40 text-muted-foreground text-[10px] font-bold px-2 py-1 rounded shadow-sm">Cohort Masterclass</span>
                  </div>
                  <Users className="w-5 h-5 text-indigo-500 shrink-0" />
                </div>
                <div className="my-4 space-y-2">
                  <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">Distributed Consensus: Raft vs. Paxos in Production</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">Keynote by Neha Bansal & Devendra Pillai. Open to 45 pre-selected students from IITD, DTU & IITR. Live live-coding demo included.</p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-border/40">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="text-xs text-foreground font-bold">38 Registered</span>
                  </div>
                  <button className="px-3 py-1.5 bg-background border border-border/40 text-foreground text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-sm hover:bg-muted transition-colors">
                    <Link className="w-3.5 h-3.5" /> Invite Link
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section (4 cols) */}
        <div className="lg:col-span-4 space-y-6 flex flex-col">
          
          {/* Quick Mentorship Feedback Form Card */}
          <div className="bg-card border border-border/40 rounded-2xl shadow-sm p-6 flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-border/40">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 text-primary rounded-xl">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Log Feedback</h3>
              </div>
              <span className="bg-primary/10 text-primary text-[10px] font-bold uppercase px-2 py-0.5 rounded">Post-Session</span>
            </div>
            
            <p className="text-xs text-muted-foreground mt-4 mb-5">
              Record verified skill assessments instantly to update the candidate's ATS profile.
            </p>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Select Mentee</label>
                <div className="relative">
                  <select className="w-full px-4 py-2.5 text-sm font-semibold bg-muted/50 border border-border/40 rounded-xl text-foreground focus:outline-none focus:ring-1 focus:ring-primary shadow-sm appearance-none cursor-pointer">
                    {initialSessions.length === 0 && <option>No active mentees</option>}
                    {initialSessions.map(session => (
                      <option key={session.id}>{session.user_profiles?.full_name}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Technical Acumen</label>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-6 h-6 fill-amber-500" />
                  <Star className="w-6 h-6 fill-amber-500" />
                  <Star className="w-6 h-6 fill-amber-500" />
                  <Star className="w-6 h-6 fill-amber-500" />
                  <StarHalf className="w-6 h-6 fill-amber-500" />
                  <span className="font-mono text-sm font-bold text-foreground ml-2">4.5 / 5.0</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Verified Endorsements</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Data Structures', 'Distributed DBs', 'Microservices', 'Cloud Native'].map((skill, i) => (
                    <label key={i} className="flex items-center gap-2 p-2 rounded-lg bg-muted/30 border border-border/40 hover:bg-muted cursor-pointer transition-colors">
                      <input defaultChecked={i < 3} className="rounded text-primary focus:ring-primary w-4 h-4" type="checkbox" />
                      <span className="text-xs font-semibold text-foreground">{skill}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Mentor Evaluation</label>
                <textarea className="w-full h-[100px] p-3 text-sm bg-muted/50 border border-border/40 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary shadow-sm resize-none" placeholder="Highlight strengths in concurrency, algorithmic tradeoffs, and areas to improve before placements..."></textarea>
              </div>

              <button type="button" className="w-full py-3 bg-primary text-primary-foreground text-sm font-bold rounded-xl shadow-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                Submit & Endorse Profile
              </button>
            </form>
          </div>

          {/* Session Request Queue */}
          <div className="bg-card border border-border/40 rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between pb-4 border-b border-border/40 mb-4">
              <div className="flex items-center gap-3">
                <Clock className="text-amber-500 w-5 h-5" />
                <h3 className="text-lg font-bold text-foreground">Requests</h3>
              </div>
              <span className="bg-primary/10 text-primary text-[10px] font-bold uppercase px-2 py-0.5 rounded">3 Pending</span>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-muted/30 border border-border/40 flex flex-col gap-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-foreground">Saurav Paul</h4>
                    <span className="text-[10px] font-semibold text-muted-foreground">IIT Kharagpur • ML Engineer</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-primary">Oct 29</span>
                </div>
                <p className="text-xs text-muted-foreground italic leading-relaxed">"Seeking guidance on Transformer quantization for edge deployment."</p>
                <div className="flex items-center gap-2 mt-1">
                  <button className="flex-1 py-1.5 bg-primary text-primary-foreground text-xs font-bold rounded-lg shadow-sm hover:bg-primary/90 transition-colors">Accept</button>
                  <button className="px-4 py-1.5 bg-background border border-border/40 text-muted-foreground hover:text-destructive text-xs font-bold rounded-lg shadow-sm transition-colors">Decline</button>
                </div>
              </div>
            </div>
          </div>

          {/* Volunteer Leaderboard */}
          <div className="bg-card border border-border/40 rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between pb-4 border-b border-border/40 mb-4">
              <div className="flex items-center gap-3">
                <Medal className="text-amber-500 w-5 h-5" />
                <h3 className="text-lg font-bold text-foreground">Top Mentors</h3>
              </div>
              <span className="text-[10px] font-bold text-muted-foreground uppercase">This Qtr</span>
            </div>

            <div className="space-y-1">
              {[
                { name: 'Vikram Rao', role: 'Cloud Architect', hours: '54', rating: '4.98' },
                { name: 'Neha Bansal', role: 'AI Scientist', hours: '42', rating: '4.95' },
                { name: 'Arjun Menon', role: 'Platform Eng', hours: '36', rating: '4.91' }
              ].map((mentor, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors group cursor-pointer border border-transparent hover:border-border/40">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img className="w-10 h-10 rounded-full object-cover shadow-sm border border-border/60" src={`https://i.pravatar.cc/150?u=${i+10}`} alt={mentor.name} />
                      <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-background border border-border flex items-center justify-center text-[10px] font-bold text-foreground rounded-full shadow-sm">{i+1}</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{mentor.name}</h4>
                      <span className="text-[10px] font-semibold text-muted-foreground">{mentor.role}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-mono font-bold text-foreground">{mentor.hours} <span className="text-muted-foreground font-sans text-xs">Hrs</span></div>
                    <div className="text-[10px] font-bold text-amber-500 mt-0.5">{mentor.rating} ★</div>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-4 py-2 bg-muted/50 text-foreground text-xs font-bold rounded-xl hover:bg-muted transition-colors flex items-center justify-center gap-2 border border-border/40">
              View Full Roster (34) <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          
        </div>
      </section>
    </div>
  );
}
