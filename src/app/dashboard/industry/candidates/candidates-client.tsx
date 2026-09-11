"use client";

import { useState } from "react";
import { 
  Calendar, 
  ChevronDown, 
  Kanban, 
  List, 
  UserPlus, 
  Search, 
  Sparkles, 
  X, 
  CheckCircle, 
  UserCheck, 
  Terminal, 
  MoreHorizontal, 
  GraduationCap, 
  Code2, 
  CalendarCheck, 
  MailCheck, 
  Share2, 
  FileText, 
  Download, 
  Boxes, 
  Star, 
  MessageSquare, 
  PlayCircle, 
  CalendarPlus,
  TrendingUp
} from "lucide-react";
import { createBrowserClient } from "@supabase/ssr";
import { updateApplicationStatus } from "@/lib/actions/jobActions";
import { toast } from "sonner";

import type { JobListing, CandidateApplication } from "@/types/industry-portal";

export function CandidatesClient({ initialJobs, initialApplications }: { initialJobs: JobListing[], initialApplications: CandidateApplication[] }) {
  const [selectedJobId, setSelectedJobId] = useState(initialJobs?.[0]?.id || null);
  const [applications, setApplications] = useState(initialApplications || []);
  const [selectedApp, setSelectedApp] = useState<any>(null);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const activeJob = initialJobs?.find((j) => j.id === selectedJobId);
  
  // Filter apps by job
  const filteredApps = applications.filter((app: CandidateApplication) => app.job_id === selectedJobId);

  // Group by status
  const applied = filteredApps.filter((a: CandidateApplication) => a.status === 'applied');
  const shortlisted = filteredApps.filter((a: CandidateApplication) => a.status === 'shortlisted');
  const interview = filteredApps.filter((a: CandidateApplication) => a.status === 'interview');
  const offered = filteredApps.filter((a: CandidateApplication) => ['offered', 'hired'].includes(a.status));

  const handleStatusChange = async (appId: string, newStatus: string) => {
    const previousApps = applications;
    const previousSelected = selectedApp;
    
    // Optimistic UI update
    setApplications((prev: CandidateApplication[]) => 
      prev.map((app: CandidateApplication) => app.id === appId ? { ...app, status: newStatus } : app)
    );
    if (selectedApp && selectedApp.id === appId) {
      setSelectedApp({ ...selectedApp, status: newStatus });
    }

    try {
      await updateApplicationStatus(appId, newStatus);
      toast.success(`Moved candidate to ${newStatus}`);
    } catch (error: any) {
      // Revert on failure
      setApplications(previousApps);
      setSelectedApp(previousSelected);
      toast.error(error.message || "Failed to update status");
    }
  };

  const getInitials = (name: string) => name ? name.substring(0, 2).toUpperCase() : '??';

  return (
    <div className="flex flex-col gap-6 w-full max-w-[100vw] overflow-x-hidden">
      
      {/* Top Command & Action Bar */}
      <section className="w-full bg-card border border-border/40 rounded-2xl px-6 py-5 flex flex-col gap-4 shadow-sm">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">Recruitment Ops</span>
              <span className="text-muted-foreground text-xs font-semibold flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Academic Cycle 2025–26
              </span>
            </div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Applicant Tracking System - Active Pipeline</h1>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            {/* Active Role Switcher Pill */}
            <div className="relative group">
              <select 
                value={selectedJobId || ''} 
                onChange={(e) => setSelectedJobId(e.target.value)}
                className="appearance-none flex items-center gap-2.5 px-3.5 py-2 pl-8 pr-10 rounded-xl bg-background border border-border/40 shadow-sm cursor-pointer hover:bg-muted transition-colors text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {initialJobs?.map((job: any) => (
                  <option key={job.id} value={job.id}>{job.title}</option>
                ))}
              </select>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <ChevronDown className="text-muted-foreground w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-background border border-border/40 p-1 rounded-xl shadow-sm">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold shadow-sm">
                <Kanban className="w-4 h-4" />
                <span>Kanban</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ATS Main Canvas: Kanban Pipeline */}
      <section className="w-full flex flex-col xl:flex-row items-start gap-6">
        
        {/* Kanban Track Area */}
        <div className="flex-1 min-w-0 w-full overflow-x-auto pb-4 custom-scrollbar">
          <div className="flex items-start gap-4 min-w-[980px]">
            
            {/* Column 1: Applied */}
            <div className="flex-1 flex flex-col gap-3.5 bg-muted/30 border border-border/40 p-3.5 rounded-xl min-w-[280px]">
              <div className="flex items-center justify-between pb-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                  <span className="font-semibold text-sm text-foreground">Applied</span>
                  <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-mono text-[10px]">{applied.length}</span>
                </div>
              </div>

              {applied.map((app: CandidateApplication) => (
                <div key={app.id} onClick={() => setSelectedApp(app)} className={`bg-card border ${selectedApp?.id === app.id ? 'border-primary ring-1 ring-primary' : 'border-border/60'} rounded-xl p-3.5 shadow-sm hover:shadow-md transition-all flex flex-col gap-2.5 cursor-pointer`}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-slate-500/10 text-slate-500 flex items-center justify-center font-bold text-xs flex-shrink-0 border border-slate-500/20">{getInitials(app.applicant?.full_name || '')}</div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-semibold text-foreground truncate">{app.applicant?.full_name}</h4>
                        <span className="text-xs text-muted-foreground flex items-center gap-1 truncate">
                           Applied: {new Date(app.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Column 2: Shortlisted (AI Screened) */}
            <div className="flex-1 flex flex-col gap-3.5 bg-muted/30 border border-border/40 p-3.5 rounded-xl min-w-[280px]">
              <div className="flex items-center justify-between pb-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <span className="font-semibold text-sm text-foreground">Shortlisted</span>
                  <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-mono text-[10px]">{shortlisted.length}</span>
                </div>
              </div>

              {shortlisted.map((app: CandidateApplication) => (
                <div key={app.id} onClick={() => setSelectedApp(app)} className={`bg-card border ${selectedApp?.id === app.id ? 'border-primary ring-1 ring-primary' : 'border-border/60'} rounded-xl p-3.5 shadow-sm hover:shadow-md transition-all flex flex-col gap-2.5 cursor-pointer`}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold text-xs flex-shrink-0 border border-blue-500/20">{getInitials(app.applicant?.full_name || '')}</div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-semibold text-foreground truncate">{app.applicant?.full_name}</h4>
                        <span className="text-xs text-muted-foreground flex items-center gap-1 truncate">
                           Score match
                        </span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 font-mono text-[10px] font-bold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> High
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Column 3: Interview */}
            <div className="flex-1 flex flex-col gap-3.5 bg-muted/30 border border-border/40 p-3.5 rounded-xl min-w-[280px]">
              <div className="flex items-center justify-between pb-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="font-semibold text-sm text-foreground">Interview</span>
                  <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-mono text-[10px]">{interview.length}</span>
                </div>
              </div>

              {interview.map((app: CandidateApplication) => (
                <div key={app.id} onClick={() => setSelectedApp(app)} className={`bg-card border ${selectedApp?.id === app.id ? 'border-primary ring-1 ring-primary' : 'border-border/60'} rounded-xl p-3.5 shadow-sm hover:shadow-md transition-all flex flex-col gap-2.5 cursor-pointer`}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold text-xs flex-shrink-0 border border-amber-500/20">{getInitials(app.applicant?.full_name || '')}</div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-semibold text-foreground truncate">{app.applicant?.full_name}</h4>
                        <span className="text-xs text-muted-foreground flex items-center gap-1 truncate">
                           Scheduled
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Column 4: Offered */}
            <div className="flex-1 flex flex-col gap-3.5 bg-muted/30 border border-border/40 p-3.5 rounded-xl min-w-[280px]">
              <div className="flex items-center justify-between pb-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="font-semibold text-sm text-foreground">Offered</span>
                  <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-mono text-[10px]">{offered.length}</span>
                </div>
              </div>

              {offered.map((app: CandidateApplication) => (
                <div key={app.id} onClick={() => setSelectedApp(app)} className={`bg-card border ${selectedApp?.id === app.id ? 'border-primary ring-1 ring-primary' : 'border-border/60'} rounded-xl p-3.5 shadow-sm hover:shadow-md transition-all flex flex-col gap-2.5 cursor-pointer`}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold text-xs flex-shrink-0 border border-emerald-500/20">{getInitials(app.applicant?.full_name || '')}</div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-semibold text-foreground truncate">{app.applicant?.full_name}</h4>
                        <span className="text-xs text-muted-foreground flex items-center gap-1 truncate">
                           {app.status === 'hired' ? 'Accepted' : 'Pending Sign'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Candidate Slide-out Drawer Panel (Right Side) */}
        {selectedApp && (
          <div className="w-full xl:w-[400px] flex-shrink-0 bg-card rounded-2xl shadow-lg border border-border/40 flex flex-col overflow-hidden">
            <div className="p-5 bg-muted/30 border-b border-border/40 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-blue-500 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                    <CheckCircle className="w-3 h-3" /> Verified Profile
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => setSelectedApp(null)} className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-start gap-3.5">
                <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center text-xl font-bold flex-shrink-0">
                  {getInitials(selectedApp.applicant?.full_name || '')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xl font-bold text-foreground truncate">{selectedApp.applicant?.full_name}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">Candidate ID: {selectedApp.applicant?.id?.substring(0,8)}</p>
                </div>
              </div>
              
              <div className="pt-2">
                 <p className="text-xs font-semibold mb-2">Change Status:</p>
                 <div className="flex flex-wrap gap-2">
                    <button onClick={() => handleStatusChange(selectedApp.id, 'applied')} className={`px-2 py-1 rounded text-xs font-medium border ${selectedApp.status === 'applied' ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted border-border'}`}>Applied</button>
                    <button onClick={() => handleStatusChange(selectedApp.id, 'shortlisted')} className={`px-2 py-1 rounded text-xs font-medium border ${selectedApp.status === 'shortlisted' ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted border-border'}`}>Shortlist</button>
                    <button onClick={() => handleStatusChange(selectedApp.id, 'interview')} className={`px-2 py-1 rounded text-xs font-medium border ${selectedApp.status === 'interview' ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted border-border'}`}>Interview</button>
                    <button onClick={() => handleStatusChange(selectedApp.id, 'offered')} className={`px-2 py-1 rounded text-xs font-medium border ${selectedApp.status === 'offered' ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted border-border'}`}>Offer</button>
                    <button onClick={() => handleStatusChange(selectedApp.id, 'rejected')} className={`px-2 py-1 rounded text-xs font-medium border ${selectedApp.status === 'rejected' ? 'bg-red-500 text-white border-red-500' : 'bg-muted border-border'}`}>Reject</button>
                 </div>
              </div>
            </div>
            
            <div className="p-5 flex flex-col gap-5 overflow-y-auto max-h-[500px] custom-scrollbar">
               {/* Resume Section */}
               <div className="bg-muted/30 border border-border/40 rounded-xl p-4 flex flex-col gap-3">
                <span className="text-sm font-bold text-foreground flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-primary" /> Resume / Cover Letter
                </span>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {selectedApp.cover_letter || "No cover letter provided."}
                </p>
                {selectedApp.resume_url && (
                  <div className="mt-2 p-3 bg-background border border-border/60 rounded-lg shadow-sm flex items-center justify-between">
                     <span className="text-xs font-mono">Resume.pdf</span>
                     <a href={selectedApp.resume_url} target="_blank" rel="noreferrer" className="text-xs text-primary font-medium hover:underline">Download</a>
                  </div>
                )}
               </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
