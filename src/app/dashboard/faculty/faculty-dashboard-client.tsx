"use client";

import {
  Briefcase,
  BookOpen,
  Microscope,
  Users,
  Calendar,
  Sparkles,
  ArrowRight,
  Clock,
  Video,
  FileText
} from "lucide-react";

export function FacultyDashboardClient({
  stats,
  upcomingSchedule,
  aiRecommendations,
  userName
}: {
  stats: any,
  upcomingSchedule: any[],
  aiRecommendations: any[],
  userName: string
}) {
  return (
    <div className="flex flex-col gap-8 pb-8 h-full">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome back, {userName}</h1>
          <p className="text-muted-foreground mt-1">
            Here's an overview of your active industry engagements, development programs, and research milestones.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm">
            <Calendar className="w-4 h-4" />
            Update Availability
          </button>
        </div>
      </div>

      {/* Quick Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-card border border-border/40 rounded-2xl p-5 shadow-sm hover:border-primary/50 transition-colors">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
              <Briefcase className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium text-muted-foreground">Ongoing</span>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-bold text-foreground">{stats.activeConsultancies}</h3>
            <p className="text-sm font-medium text-muted-foreground mt-1">Active Projects</p>
          </div>
          <div className="mt-4 pt-4 border-t border-border/40">
            <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
              <div className="bg-blue-500 h-full rounded-full w-[65%]" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Next milestone due in 4 days</p>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-card border border-border/40 rounded-2xl p-5 shadow-sm hover:border-primary/50 transition-colors">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium text-muted-foreground">This Academic Year</span>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-bold text-foreground">{stats.fdpHoursCompleted}</h3>
            <p className="text-sm font-medium text-muted-foreground mt-1">FDP Hours Completed</p>
          </div>
          <div className="mt-4 pt-4 border-t border-border/40 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Target: <strong className="text-foreground">150 hrs</strong></span>
            <span className="text-xs font-semibold text-emerald-500">{Math.round((stats.fdpHoursCompleted / 150) * 100)}% Reached</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-card border border-border/40 rounded-2xl p-5 shadow-sm hover:border-primary/50 transition-colors">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
              <Microscope className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium text-muted-foreground">Under Review</span>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-bold text-foreground">{stats.pendingGrants}</h3>
            <p className="text-sm font-medium text-muted-foreground mt-1">Pending Proposals</p>
          </div>
          <div className="mt-4 pt-4 border-t border-border/40">
            <p className="text-xs text-muted-foreground truncate">Grant reviews in progress</p>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-card border border-border/40 rounded-2xl p-5 shadow-sm hover:border-primary/50 transition-colors">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium text-muted-foreground">Across 4 cohorts</span>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-bold text-foreground">{stats.studentsMentored}</h3>
            <p className="text-sm font-medium text-muted-foreground mt-1">Students Mentored</p>
          </div>
          <div className="mt-4 pt-4 border-t border-border/40">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-muted border-2 border-card flex items-center justify-center text-[8px] font-bold">AJ</div>
              <div className="w-6 h-6 rounded-full bg-muted border-2 border-card flex items-center justify-center text-[8px] font-bold">SM</div>
              <div className="w-6 h-6 rounded-full bg-muted border-2 border-card flex items-center justify-center text-[8px] font-bold">RP</div>
              <div className="w-6 h-6 rounded-full bg-muted border-2 border-card flex items-center justify-center text-[8px] font-bold">+42</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Schedule */}
        <div className="bg-card border border-border/40 rounded-2xl p-6 shadow-sm flex flex-col min-h-0">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-foreground">Upcoming Schedule</h3>
              <p className="text-sm text-muted-foreground">Your academic and industry engagements.</p>
            </div>
            <button className="text-sm font-medium text-primary hover:underline">Full Calendar</button>
          </div>

          <div className="flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar flex-1">
            {upcomingSchedule.length === 0 && (
              <p className="text-sm text-muted-foreground">No upcoming schedule.</p>
            )}
            {upcomingSchedule.map((event) => {
              const Icon = event.icon === 'Video' ? Video : event.icon === 'Users' ? Users : BookOpen;
              return (
                <div key={event.id} className="flex gap-4 p-4 rounded-xl border border-border/40 hover:bg-muted/30 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0 border border-border/50">
                    <Icon className="w-5 h-5 text-foreground" />
                  </div>
                  <div className="flex flex-col justify-center min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-semibold text-foreground truncate">{event.title}</h4>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border shrink-0 ${event.typeColor}`}>
                        {event.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5" />
                        {event.time}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3.5 h-3.5" />
                        {event.duration}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="bg-card border border-border/40 rounded-2xl p-6 shadow-sm flex flex-col relative overflow-hidden min-h-0">
          {/* Subtle gradient background for AI section */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3" />
          
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold text-foreground">AI Recommendations</h3>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Curated opportunities based on your expertise.</p>
            </div>
            <button className="text-sm font-medium text-primary hover:underline">View All Matches</button>
          </div>

          <div className="flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar flex-1">
            {aiRecommendations.length === 0 && (
              <p className="text-sm text-muted-foreground">No recommendations at the moment.</p>
            )}
            {aiRecommendations.map((rec) => (
              <div key={rec.id} className="group relative flex flex-col p-5 rounded-xl border border-border/60 bg-background/50 hover:border-primary/50 hover:bg-card transition-all shadow-sm">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">{rec.title}</h4>
                    <p className="text-sm font-medium text-muted-foreground mt-0.5">{rec.company}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider shrink-0 border border-primary/20">
                    <Sparkles className="w-3 h-3" />
                    {rec.match}
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">
                  <span className="font-medium text-foreground">Why this fits:</span> {rec.reason}
                </p>
                
                <div className="mt-auto pt-4 border-t border-border/40 flex items-center justify-between">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{rec.type}</span>
                  <button className="flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                    Review Proposal <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
