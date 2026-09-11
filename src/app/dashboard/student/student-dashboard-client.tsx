"use client";

import Link from "next/link";
import { 
  Clock, 
  ArrowRight,
  Bell,
  AlertTriangle,
  BookOpen,
  Target,
  TrendingUp
} from "lucide-react";
import type { StudentDashboardProps } from "@/types/student-portal";
import { formatDistanceToNow } from "date-fns";

const APPLICATION_STATUS_ORDER = ['applied', 'under_review', 'shortlisted', 'interview', 'offered'] as const;

function getStatusIndex(status: string): number {
  const idx = APPLICATION_STATUS_ORDER.indexOf(status as typeof APPLICATION_STATUS_ORDER[number]);
  return idx >= 0 ? idx : 0;
}

export function StudentDashboardClient({ userProfile, skillProfile, jobMatches, applications, stats }: StudentDashboardProps) {
  const firstName = userProfile?.full_name?.split(' ')[0] || 'Student';
  const readiness = skillProfile?.employability_score || 0;

  // Find the next action: the nearest non-terminal application status
  const nextAction = applications.length > 0
    ? applications.find(app => !['offered', 'rejected'].includes(app.status))
    : null;
  const nextActionText = nextAction
    ? `Next: ${nextAction.job_listings.title} — ${nextAction.status.replace('_', ' ')}`
    : applications.length > 0 ? 'All applications reviewed' : 'No active submissions';

  return (
    <div className="flex flex-col gap-7 py-7 px-4 sm:px-6 lg:px-8">
      
      {/* HERO STRIP */}
      <section className="relative rounded-xl border border-border/80 bg-card p-6 overflow-hidden">
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
              <span className="font-medium">Student Portal</span>
              <span className="text-muted-foreground/50">/</span>
              <span className="font-medium">Verified Academic Profile</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground font-display">
              Welcome back, {firstName}
            </h1>
            <p className="text-xs text-muted-foreground max-w-xl leading-relaxed">
              Explore curated career opportunities, assessments, and interview updates from leading employers.
            </p>
          </div>
          
          {/* Metric Strip */}
          <div className="flex flex-wrap items-center gap-6 lg:gap-8 border-t lg:border-t-0 lg:border-l border-border/80 pt-4 lg:pt-0 lg:pl-8">
            <div>
              <div className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">Profile Readiness</div>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-2xl font-semibold tracking-tight text-foreground font-mono">{readiness}%</span>
                <span className="text-[11px] text-muted-foreground font-mono">/ {stats.percentileRank}</span>
              </div>
              <div className="w-32 bg-muted rounded-full h-1 mt-2">
                <div className="bg-foreground h-1 rounded-full transition-all duration-500" style={{ width: `${readiness}%` }}></div>
              </div>
            </div>
            
            <div>
              <div className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">Active Applications</div>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-2xl font-semibold tracking-tight text-foreground font-mono">{stats.totalApplications}</span>
                <span className="text-[11px] text-muted-foreground">in pipeline</span>
              </div>
              <div className="text-[11px] text-muted-foreground mt-2 flex items-center gap-1 truncate max-w-[200px]">
                <Clock className="w-3 h-3 text-muted-foreground shrink-0" />
                <span className="truncate">{nextActionText}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK STATS ROW */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Link href="/dashboard/student/notifications" className="bg-card rounded-xl border border-border/80 p-4 hover:border-border transition-colors group">
          <div className="flex items-center justify-between mb-2">
            <Bell className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            {stats.unreadNotifications > 0 && (
              <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                {stats.unreadNotifications > 9 ? '9+' : stats.unreadNotifications}
              </span>
            )}
          </div>
          <div className="text-lg font-semibold text-foreground font-mono">{stats.unreadNotifications}</div>
          <div className="text-[11px] text-muted-foreground font-medium">Unread Alerts</div>
        </Link>

        <Link href="/dashboard/student/assessments" className="bg-card rounded-xl border border-border/80 p-4 hover:border-border transition-colors group">
          <div className="flex items-center justify-between mb-2">
            <Target className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            {stats.upcomingAssessments > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            )}
          </div>
          <div className="text-lg font-semibold text-foreground font-mono">{stats.upcomingAssessments}</div>
          <div className="text-[11px] text-muted-foreground font-medium">Pending Assessments</div>
        </Link>

        <Link href="/dashboard/student/skills" className="bg-card rounded-xl border border-border/80 p-4 hover:border-border transition-colors group">
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle className="w-4 h-4 text-muted-foreground group-hover:text-amber-500 transition-colors" />
          </div>
          <div className="text-lg font-semibold text-foreground font-mono">{stats.skillGapsCount}</div>
          <div className="text-[11px] text-muted-foreground font-medium">Skill Gaps</div>
        </Link>

        <Link href="/dashboard/student/courses" className="bg-card rounded-xl border border-border/80 p-4 hover:border-border transition-colors group">
          <div className="flex items-center justify-between mb-2">
            <BookOpen className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <div className="text-lg font-semibold text-foreground font-mono">
            <TrendingUp className="w-4 h-4 inline text-emerald-500" />
          </div>
          <div className="text-[11px] text-muted-foreground font-medium">Explore Courses</div>
        </Link>
      </div>

      {/* CONTENT GRID (8 Cols Content / 4 Cols Rail) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
        
        {/* LEFT COLUMN (col-span-8) */}
        <div className="lg:col-span-8 space-y-7">
          
          {/* SECTION: Curated Opportunities */}
          <div className="bg-card rounded-xl border border-border/80 p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/40">
              <div>
                <h2 className="text-sm font-semibold text-foreground font-display">Ranked Opportunities</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Matched based on your verified skill profile</p>
              </div>
              <div className="flex items-center gap-1 bg-muted/30 p-0.5 rounded-lg border border-border/60 text-xs">
                <button className="px-2.5 py-1 rounded font-medium bg-background text-foreground shadow-sm">Curated</button>
              </div>
            </div>

            <div className="space-y-3">
              {jobMatches?.map((job) => (
                <div key={job.id} className="rounded-lg border border-border/60 p-4 bg-background hover:border-border hover:-translate-y-[1px] hover:shadow-sm transition-all duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-md bg-foreground text-background flex items-center justify-center font-mono font-medium text-xs shrink-0 tracking-tight uppercase">
                        {job.title.substring(0, 2)}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-foreground">{job.employer?.full_name || 'Employer'}</span>
                          <span className="text-muted-foreground/30">/</span>
                          <span className="text-xs text-muted-foreground font-mono">Top Match</span>
                        </div>
                        <h3 className="text-sm font-medium text-foreground">{job.title}</h3>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground pt-0.5">
                          <span className="font-medium text-foreground/80">{job.stipend_salary_range || 'Competitive'}</span>
                          <span className="text-muted-foreground/30">•</span>
                          <span className="capitalize">{job.type.replace('_', ' ')}</span>
                          <span className="text-muted-foreground/30">•</span>
                          <span>{job.location} {job.is_remote ? '(Remote)' : ''}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 shrink-0">
                      <Link href={`/dashboard/student/opportunities`} className="px-3.5 py-1.5 rounded-md bg-foreground hover:bg-foreground/90 text-background text-xs font-medium transition-colors active:scale-95">
                        Apply Now
                      </Link>
                    </div>
                  </div>
                  <div className="mt-3.5 pt-3 border-t border-border/40 flex flex-wrap items-center justify-between text-xs text-muted-foreground font-sans gap-2">
                    <div className="flex items-center gap-3 text-foreground/70">
                      {Object.keys(job.required_skills || {}).slice(0, 4).map(skill => (
                        <span key={skill}>{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              
              {!jobMatches?.length && (
                <div className="text-sm text-muted-foreground text-center py-4">
                  No active matches found. Complete more assessments!
                </div>
              )}
            </div>
            
            <div className="pt-2 text-center">
              <Link href="/dashboard/student/opportunities" className="w-full py-2 border border-border/60 hover:border-border/100 text-xs font-medium text-muted-foreground hover:text-foreground rounded-md transition-colors flex items-center justify-center gap-1.5">
                <span>View all opportunities</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE RAIL (col-span-4) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* ATS APPLICATION TRACKER */}
          <div className="bg-card rounded-xl border border-border/80 p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border/40">
              <h3 className="text-xs font-semibold text-foreground font-display">Active Submissions</h3>
              <span className="text-[11px] font-mono text-muted-foreground">{stats.totalApplications} Total</span>
            </div>
            
            {applications?.map((app) => {
              const statusIdx = getStatusIndex(app.status);
              return (
                <div key={app.id} className="p-3 rounded-lg border border-border/60 bg-background space-y-2.5">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0 pr-2">
                      <div className="text-xs font-semibold text-foreground truncate">{app.job_listings?.employer?.full_name || 'Employer'}</div>
                      <div className="text-[11px] text-muted-foreground truncate">{app.job_listings?.title}</div>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className="text-[10px] font-mono text-muted-foreground capitalize">{app.status.replace('_', ' ')}</span>
                      <span className="text-[9px] text-muted-foreground">{formatDistanceToNow(new Date(app.created_at), { addSuffix: true })}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="grid grid-cols-5 gap-1">
                      {APPLICATION_STATUS_ORDER.map((step, i) => (
                        <div 
                          key={step} 
                          className={`h-1 rounded-full ${i <= statusIdx ? 'bg-foreground' : 'bg-muted border border-border/50'}`}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
            
            {!applications?.length && (
              <div className="text-xs text-muted-foreground text-center py-2">
                No active applications.
              </div>
            )}

            {stats.totalApplications > 3 && (
              <Link href="/dashboard/student/opportunities" className="block text-center text-xs text-primary hover:text-primary/80 font-medium transition-colors pt-1">
                View all {stats.totalApplications} applications →
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
