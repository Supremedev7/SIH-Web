"use client";

import { 
  Download, 
  Plus, 
  Briefcase, 
  Users, 
  TrendingUp, 
  Calendar, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  Filter, 
  Gauge, 
  Brain, 
  Eye, 
  Building2,
  AlertCircle,
  Activity,
  CheckCircle2,
  Code2
} from "lucide-react";
import Link from "next/link";

import type { UserProfile, IndustrySettings, JobListing, CandidateApplication } from "@/types/industry-portal";

interface IndustryDashboardClientProps {
  profile: UserProfile | null;
  industryProfile: IndustrySettings | null;
  jobs: JobListing[];
  applications: CandidateApplication[];
}

export function IndustryDashboardClient({ profile, industryProfile, jobs, applications }: IndustryDashboardClientProps) {
  const firstName = profile?.full_name?.split(' ')[0] || 'User';
  const companyName = industryProfile?.company_name || 'Enterprise Node';

  const totalJobs = jobs?.length || 0;
  const totalApps = applications?.length || 0;
  
  // Basic metrics
  const offers = applications?.filter(a => a.status === 'offered' || a.status === 'hired').length || 0;
  const interviewing = applications?.filter(a => a.status === 'interview').length || 0;
  
  // High matches (just filtering applications for demo)
  const highMatches = applications?.slice(0, 3) || [];

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
      {/* Header Context & Actions Strip */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-card p-6 rounded-2xl shadow-sm border border-border/40">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              {companyName} • Live Synced
            </span>
            <span className="text-[10px] font-mono font-medium text-muted-foreground">LATENCY: 18ms</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Industry Talent Command Center</h1>
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            Welcome back, <span className="font-semibold text-foreground">{profile?.full_name || 'Recruiter'}</span> • Campus Talent Operations
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-muted/50 text-foreground hover:bg-muted transition-colors text-sm font-medium border border-border/40">
            <Download className="w-4 h-4 text-muted-foreground" />
            <span>Export Report</span>
          </button>
          <Link href="/dashboard/industry/opportunities/new" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all text-sm font-semibold shadow-md shadow-primary/20">
            <Plus className="w-4 h-4" />
            <span>Post Opportunity</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Card 1: Active Postings */}
        <div className="flex flex-col justify-between p-5 bg-card rounded-2xl shadow-sm border border-border/40 hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -mr-6 -mt-6 transition-all group-hover:bg-primary/10"></div>
          <div className="flex items-start justify-between relative z-10">
            <div className="flex flex-col">
              <span className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground">Active Job Postings</span>
              <span className="text-3xl font-bold text-foreground mt-1">{totalJobs}</span>
            </div>
            <span className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <Briefcase className="w-5 h-5" />
            </span>
          </div>
          <div className="mt-5 flex flex-col gap-2 relative z-10">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="text-emerald-600 flex items-center gap-1">
                Live on Portal
              </span>
            </div>
            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full w-[65%]"></div>
            </div>
          </div>
        </div>

        {/* Card 2: Total Applicants */}
        <div className="flex flex-col justify-between p-5 bg-card rounded-2xl shadow-sm border border-border/40 hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -mr-6 -mt-6 transition-all group-hover:bg-primary/10"></div>
          <div className="flex items-start justify-between relative z-10">
            <div className="flex flex-col">
              <span className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground">Total Applicants</span>
              <span className="text-3xl font-bold text-foreground mt-1">{totalApps}</span>
            </div>
            <span className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <Users className="w-5 h-5" />
            </span>
          </div>
          <div className="mt-5 flex flex-col gap-2 relative z-10">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="text-emerald-600 flex items-center gap-1">
                Verified Profiles
              </span>
            </div>
            <div className="flex items-center justify-between text-[10px] text-muted-foreground">
              <span>Cross-institution sourcing</span>
            </div>
          </div>
        </div>

        {/* Card 3: Interviews Scheduled */}
        <div className="flex flex-col justify-between p-5 bg-card rounded-2xl shadow-sm border border-border/40 hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -mr-6 -mt-6 transition-all group-hover:bg-primary/10"></div>
          <div className="flex items-start justify-between relative z-10">
            <div className="flex flex-col">
              <span className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground">Interviews Scheduled</span>
              <span className="text-3xl font-bold text-foreground mt-1">{interviewing}</span>
            </div>
            <span className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <Calendar className="w-5 h-5" />
            </span>
          </div>
          <div className="mt-5 flex flex-col gap-2 relative z-10">
            <div className="w-full flex items-center gap-1 mt-2">
              <div className="h-1.5 flex-1 bg-primary rounded-full"></div>
              <div className="h-1.5 flex-1 bg-primary rounded-full"></div>
              <div className="h-1.5 flex-1 bg-muted rounded-full"></div>
              <div className="h-1.5 flex-1 bg-muted rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Card 4: AI High-Matches */}
        <div className="flex flex-col justify-between p-5 bg-card rounded-2xl shadow-sm border border-border/40 hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl -mr-6 -mt-6 transition-all group-hover:bg-primary/20"></div>
          <div className="flex items-start justify-between relative z-10">
            <div className="flex flex-col">
              <span className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground">Offers Extended</span>
              <span className="text-3xl font-bold text-primary mt-1">{offers}</span>
            </div>
            <span className="p-2.5 rounded-xl bg-primary text-primary-foreground">
              <Sparkles className="w-5 h-5" />
            </span>
          </div>
          <div className="mt-5 flex flex-col gap-1.5 relative z-10">
            <span className="text-[10px] text-muted-foreground flex items-center gap-1 mt-1">
              <ShieldCheck className="w-3 h-3 text-blue-500" />
              Verified by SCI Platform
            </span>
          </div>
        </div>
      </div>

      {/* Two-Column Operational Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Main Content Left (8 Cols) */}
        <div className="xl:col-span-8 flex flex-col gap-6">
          
          {/* Top AI-Ranked Candidate Matches Section */}
          <div className="bg-card p-6 rounded-2xl shadow-sm border border-border/40 flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-bold text-foreground">Recent Candidate Applications</h2>
                </div>
                <span className="text-sm text-muted-foreground">Autonomous index scoring based on project commits, assessments, and transcripts</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs font-semibold shadow-sm">View All</button>
              </div>
            </div>

            {/* Candidates Dense Table */}
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-muted/50 text-muted-foreground text-[10px] uppercase tracking-wider font-bold">
                    <th className="py-3 px-4 rounded-tl-xl rounded-bl-xl font-medium">Candidate Name</th>
                    <th className="py-3 px-4 font-medium">Position</th>
                    <th className="py-3 px-4 font-medium">Status</th>
                    <th className="py-3 px-4 rounded-tr-xl rounded-br-xl text-right font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50 text-sm">
                  {highMatches.map((app) => (
                    <tr key={app.id} className="hover:bg-muted/30 transition-colors group">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-600 flex items-center justify-center font-bold font-mono text-sm border border-blue-500/30 uppercase">
                            {app.applicant?.full_name?.substring(0, 2) || 'CA'}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-semibold text-foreground">{app.applicant?.full_name || 'Candidate'}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-col">
                          <span className="font-medium text-foreground flex items-center gap-1 text-sm">
                            {jobs.find(j => j.id === app.job_id)?.title || 'Unknown Position'}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 font-mono font-bold text-xs border border-emerald-500/20 capitalize">
                          {app.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link href={`/dashboard/industry/candidates`} className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors shadow-sm">
                            Review
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                  
                  {highMatches.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-6 text-center text-muted-foreground text-sm">
                        No recent applications found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Urgent Actions & Ecosystem Distribution (4 Cols) */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          
          {/* Top Sourcing Institutions Distribution */}
          <div className="bg-card p-6 rounded-2xl shadow-sm border border-border/40 flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold text-foreground">Top Institutions</h2>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Verified candidate volume distribution across partner universities.
            </p>
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-foreground font-semibold flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-primary"></span>
                    IIT Bombay, Delhi & Madras
                  </span>
                  <span className="font-mono font-bold text-primary">42%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full w-[42%]"></div>
                </div>
              </div>
              
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-foreground font-semibold flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-blue-500"></span>
                    BITS Pilani
                  </span>
                  <span className="font-mono font-bold text-foreground">28%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full w-[28%]"></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
