"use client";

import { 
  Network, 
  Sliders, 
  Globe,
  Sparkles, 
  BrainCircuit, 
  CheckCircle, 
  PlusCircle, 
  TrendingUp, 
  ChevronDown, 
  Download, 
  PauseCircle, 
  Zap, 
  Eye, 
  MoreVertical, 
  Bot, 
  GraduationCap, 
  Building, 
  MapPin, 
  Key, 
  Microscope, 
  Home, 
  Cloud,
  Search,
  Settings
} from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { createJobPosting } from "@/lib/actions/jobActions";
import type { JobListing } from "@/types/industry-portal";

function CreateJobModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    title: "",
    type: "full_time",
    location: "",
    stipend_salary_range: "",
    status: "open",
    description: "",
    requirements: {}
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-card w-full max-w-lg rounded-2xl p-6 flex flex-col gap-4 border border-border/40 shadow-xl">
        <h2 className="text-xl font-bold text-foreground">Create New Job Posting</h2>
        
        <input 
          className="px-3 py-2.5 rounded-lg bg-background border border-border/40 text-sm focus:outline-none focus:ring-1 focus:ring-primary" 
          placeholder="Job Title (e.g. Frontend Developer)" 
          value={formData.title}
          onChange={e => setFormData({...formData, title: e.target.value})}
        />
        
        <select 
          className="px-3 py-2.5 rounded-lg bg-background border border-border/40 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          value={formData.type}
          onChange={e => setFormData({...formData, type: e.target.value})}
        >
          <option value="full_time">Full Time</option>
          <option value="internship">Internship</option>
        </select>
        
        <input 
          className="px-3 py-2.5 rounded-lg bg-background border border-border/40 text-sm focus:outline-none focus:ring-1 focus:ring-primary" 
          placeholder="Location (e.g. Remote, Bangalore)" 
          value={formData.location}
          onChange={e => setFormData({...formData, location: e.target.value})}
        />
        
        <input 
          className="px-3 py-2.5 rounded-lg bg-background border border-border/40 text-sm focus:outline-none focus:ring-1 focus:ring-primary" 
          placeholder="Salary/Stipend (e.g. ₹15,00,000)" 
          value={formData.stipend_salary_range}
          onChange={e => setFormData({...formData, stipend_salary_range: e.target.value})}
        />
        
        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose} className="px-4 py-2 rounded-lg bg-muted text-foreground text-sm font-medium hover:bg-muted/80 transition-colors">Cancel</button>
          <button 
            disabled={isPending}
            onClick={() => {
              if (!formData.title) return toast.error("Title is required");
              startTransition(async () => {
                try {
                  await createJobPosting(formData);
                  toast.success("Job posting created!");
                  onClose();
                } catch (e: any) {
                  toast.error(e.message || "Failed to create");
                }
              });
            }} 
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {isPending ? "Creating..." : "Create Job"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function OpportunitiesClient({ jobs }: { jobs: JobListing[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      
      {/* Top Header Section */}
      <div className="relative w-full overflow-hidden bg-card border border-border/40 rounded-2xl px-6 sm:px-8 pt-8 pb-10 shadow-sm">
        {/* Decorative background glows */}
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 top-0 w-80 h-80 rounded-full bg-emerald-500/5 blur-2xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border/40">
          <div className="flex flex-col max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] uppercase font-bold tracking-wider">
                <Globe className="w-3.5 h-3.5" />
                Institutional Network
              </span>
              <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                SYNCED WITH NIRF & ABET DATABASES
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
              Opportunities & Postings <span className="text-xl text-primary font-semibold">(450+ Universities Live)</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Create, track, and optimize AI-matched campus listings across 450+ partnered tier-1 and accredited technical institutions.
            </p>
          </div>
          
          <div className="flex items-center gap-3 self-start md:self-auto">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-background border border-border/40 text-foreground hover:bg-muted transition-all shadow-sm text-sm font-medium group">
              <Sliders className="w-4 h-4 text-primary group-hover:rotate-90 transition-transform" />
              Matching Criteria
              <span className="bg-muted px-1.5 py-0.5 rounded font-mono text-[10px] ml-1">v3.4</span>
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-md text-sm font-medium">
              <PlusCircle className="w-5 h-5" />
              Create New Posting
            </button>
          </div>
        </div>

        {/* Banner: SCI Engine Weighting Model Active */}
        <div className="relative z-10 mt-6 w-full rounded-2xl bg-background/50 border border-border/40 p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 shadow-inner">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-foreground">SCI Engine Weighting Model Active</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                  Live Calibrated
                </span>
              </div>
              <span className="text-xs text-muted-foreground truncate">
                Composite neural matching vectors calculated daily against real-time academic transcripts & verified project commits.
              </span>
            </div>
          </div>
          
          {/* Weight Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-lg border border-border/40">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-xs font-semibold text-foreground">Technical Skills</span>
              <span className="text-xs font-mono font-bold text-primary">40%</span>
            </div>
            <div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-lg border border-border/40">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-xs font-semibold text-foreground">Verified Repos</span>
              <span className="text-xs font-mono font-bold text-blue-500">30%</span>
            </div>
            <div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-lg border border-border/40">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-xs font-semibold text-foreground">Academic Standing</span>
              <span className="text-xs font-mono font-bold text-amber-500">20%</span>
            </div>
            <div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-lg border border-border/40">
              <span className="w-2 h-2 rounded-full bg-slate-500" />
              <span className="text-xs font-semibold text-foreground">Hackathons</span>
              <span className="text-xs font-mono font-bold text-slate-500">10%</span>
            </div>
            <button className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl bg-card border border-border/40 p-5 shadow-sm flex flex-col justify-between hover:border-primary/30 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Active Openings</span>
            <span className="px-2 py-0.5 rounded bg-muted text-[10px] font-bold text-primary">All Cohorts</span>
          </div>
          <div className="flex items-baseline justify-between mt-3">
            <span className="text-3xl font-bold text-foreground">24</span>
            <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-500">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+4 this week</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-border/40 flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">14 FT • 8 Intern • 2 Fellow</span>
          </div>
        </div>

        <div className="rounded-2xl bg-card border border-border/40 p-5 shadow-sm flex flex-col justify-between hover:border-primary/30 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">AI Qualified Matches</span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-primary/10 text-[10px] font-bold text-primary">
              <Sparkles className="w-3 h-3" />
              92% avg score
            </span>
          </div>
          <div className="flex items-baseline justify-between mt-3">
            <span className="text-3xl font-bold text-foreground font-mono">1,842</span>
            <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-500">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18.4% MoM</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-border/40 flex items-center gap-2">
            <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
              <div className="bg-primary h-full rounded-full w-[92%]" />
            </div>
            <span className="text-xs font-mono text-primary font-bold">92%</span>
          </div>
        </div>

        <div className="rounded-2xl bg-card border border-border/40 p-5 shadow-sm flex flex-col justify-between hover:border-primary/30 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Applicant Volume</span>
            <span className="text-[10px] font-semibold text-muted-foreground">450 Campuses</span>
          </div>
          <div className="flex items-baseline justify-between mt-3">
            <span className="text-3xl font-bold text-foreground font-mono">3,618</span>
            <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-500">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>99.2% verified</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-border/40 flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Avg. 150.7 apps/opening</span>
          </div>
        </div>

        <div className="rounded-2xl bg-card border border-border/40 p-5 shadow-sm flex flex-col justify-between hover:border-primary/30 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Offers Accepted</span>
            <span className="text-[10px] font-semibold font-mono text-muted-foreground">Target: 110</span>
          </div>
          <div className="flex items-baseline justify-between mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-foreground font-mono">88</span>
              <span className="text-sm font-semibold text-muted-foreground">/ 110</span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500">80% Yield</span>
          </div>
          <div className="mt-4 pt-4 border-t border-border/40 flex items-center gap-3">
            <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full w-[80%]" />
            </div>
            <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap">22 pending</span>
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="rounded-2xl bg-card border border-border/40 p-4 shadow-sm flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 flex-1">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input 
                className="w-full pl-9 pr-3 py-2 text-sm bg-muted/50 border border-border/40 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary shadow-inner" 
                placeholder="Filter roles, code, keywords..." 
                type="text"
              />
            </div>
            
            <div className="flex items-center bg-muted/30 p-1 rounded-xl gap-1 border border-border/40">
              <button className="px-3 py-1.5 rounded-lg bg-background text-foreground text-sm font-semibold shadow-sm transition-all border border-border/60">
                All Postings <span className="ml-1 text-primary font-mono text-[10px]">24</span>
              </button>
              <button className="px-3 py-1.5 rounded-lg text-muted-foreground hover:text-foreground text-sm font-medium transition-all">
                Full-Time <span className="ml-1 opacity-50 font-mono text-[10px]">14</span>
              </button>
              <button className="px-3 py-1.5 rounded-lg text-muted-foreground hover:text-foreground text-sm font-medium transition-all">
                Internships <span className="ml-1 opacity-50 font-mono text-[10px]">8</span>
              </button>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-2.5">
            <button className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-muted/50 border border-border/40 hover:bg-muted text-foreground text-sm font-medium transition-colors">
              <Sliders className="w-4 h-4 text-muted-foreground" />
              <span>Status: <strong className="text-primary">All Active</strong></span>
              <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
            <div className="h-6 w-px bg-border/60 hidden sm:block mx-1" />
            <button className="p-2 rounded-xl bg-muted/50 border border-border/40 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" title="Export">
              <Download className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-xl bg-muted/50 border border-border/40 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" title="Pause">
              <PauseCircle className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors text-sm font-semibold shadow-sm">
              <Zap className="w-4 h-4" />
              Boost on Feeds
            </button>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="rounded-2xl bg-card border border-border/40 shadow-sm overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/30 text-muted-foreground text-xs uppercase tracking-wider border-b border-border/40">
                <th className="py-3.5 px-5 w-12 text-center">
                  <input className="rounded accent-primary w-4 h-4 cursor-pointer" type="checkbox" />
                </th>
                <th className="py-3.5 px-4 font-semibold min-w-[240px]">Opportunity & Role</th>
                <th className="py-3.5 px-4 font-semibold min-w-[180px]">Department & Mode</th>
                <th className="py-3.5 px-4 font-semibold min-w-[170px]">AI Matches</th>
                <th className="py-3.5 px-4 font-semibold min-w-[200px]">Progress</th>
                <th className="py-3.5 px-4 font-semibold w-32">Status</th>
                <th className="py-3.5 px-4 font-semibold min-w-[140px]">Timeline</th>
                <th className="py-3.5 px-5 text-right w-24">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40 text-sm">
              {jobs?.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-muted-foreground">
                    No opportunities found.
                  </td>
                </tr>
              ) : (
                jobs?.map((job) => (
                  <tr key={job.id} className="hover:bg-muted/20 transition-colors group">
                    <td className="py-4 px-5 text-center">
                      <input className="rounded accent-primary w-4 h-4 cursor-pointer" type="checkbox" />
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0 mt-0.5 border border-indigo-500/20">
                          <Bot className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-2">
                            <a className="font-semibold text-foreground group-hover:text-primary transition-colors hover:underline" href="#">
                              {job.title}
                            </a>
                            <span className="px-1.5 py-0.5 rounded bg-muted text-[10px] font-bold text-muted-foreground uppercase border border-border/40">
                              {job.type?.replace('_', '-')}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1 text-blue-500 font-medium">
                              <GraduationCap className="w-3.5 h-3.5" />
                              {job.type === 'internship' ? 'Student' : 'Professional'}
                            </span>
                            <span>•</span>
                            <span>{job.stipend_salary_range || 'Competitive'}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col">
                        <span className="text-foreground font-medium">Engineering</span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <Building className="w-3.5 h-3.5" />
                          {job.location || 'Remote'}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col gap-1.5">
                        <span className="font-mono font-bold text-foreground">Pending</span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold w-max">
                          <Sparkles className="w-3 h-3" />
                          Calculating
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-foreground font-mono font-medium">0 apps</span>
                          <span className="text-muted-foreground">Target: 100</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                          <div className="bg-primary h-full rounded-full" style={{ width: '0%' }} />
                        </div>
                        <span className="text-[10px] font-semibold text-muted-foreground">Accepting applications</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-500 text-xs font-semibold border border-emerald-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {job.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col">
                        <span className="text-foreground font-medium text-xs">Ongoing</span>
                        <span className="text-[10px] text-muted-foreground mt-0.5">Posted recently</span>
                      </div>
                    </td>
                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-muted transition-colors" title="View Pipeline">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors" title="More Actions">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <CreateJobModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
