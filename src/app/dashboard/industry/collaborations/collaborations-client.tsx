"use client";

import {
  BadgeCheck,
  Download,
  Plus,
  Handshake,
  Terminal,
  Users,
  FlaskConical,
  Clock,
  Landmark,
  GraduationCap,
  Bot,
  BrainCircuit,
  Calendar,
  IdCard,
  Network,
  Megaphone,
  ClipboardCheck,
  FileText,
  Gavel,
  Send,
  ChevronDown,
  CheckCircle,
  TrendingUp,
} from "lucide-react";

export function CollaborationsClient({ industryProfile, researchProjects, partnerships }: any) {
  const activePartnerships = partnerships?.filter((p: any) => p.status === 'active') || [];
  const activeProjects = researchProjects?.filter((p: any) => p.status === 'active' || p.status === 'proposed') || [];

  return (
    <div className="flex flex-col gap-6 w-full max-w-[100vw] overflow-x-hidden pb-8">
      
      {/* Top Header Area */}
      <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 bg-card p-8 rounded-2xl shadow-sm border border-border/40">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center px-2.5 py-1 rounded bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
              INSTITUTIONAL SYNERGY • Verified NIRF Tier-1 Network
            </span>
            <span className="inline-flex items-center text-xs font-semibold text-blue-500 gap-1">
              <BadgeCheck className="w-4 h-4" /> Audited Campus Nodes
            </span>
          </div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">
            Academic Programs & University Collaborations
          </h1>
          <p className="text-muted-foreground">
            Co-create joint R&D, sponsor collegiate hackathons, and fund faculty development with SCI affiliated campuses.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold shadow-sm hover:shadow-md transition-all">
            <Plus className="w-4 h-4" />
            New Academic Initiative
          </button>
        </div>
      </section>

      {/* Top KPI Metric Summaries */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="bg-card border border-border/40 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Active MoUs & Partnerships</span>
              <div className="text-3xl font-bold text-foreground mt-2 font-mono">{activePartnerships.length}</div>
            </div>
            <span className="p-2.5 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Handshake className="w-5 h-5" />
            </span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-card border border-border/40 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Active Projects</span>
              <div className="text-3xl font-bold text-foreground mt-2 font-mono">{activeProjects.length}</div>
            </div>
            <span className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <FlaskConical className="w-5 h-5" />
            </span>
          </div>
        </div>

      </section>

      {/* Active Institutional Programs Grid Section */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Ongoing Commitments</span>
            <h2 className="text-xl font-bold text-foreground mt-1">Active Institutional Programs</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {activeProjects.map((project: any) => (
            <div key={project.id} className="bg-card border border-border/40 rounded-2xl overflow-hidden shadow-sm flex flex-col group hover:shadow-md transition-all">
              <div className="relative h-44 w-full overflow-hidden bg-muted">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-muted flex items-center justify-center">
                    <FlaskConical className="w-12 h-12 text-primary/50" />
                </div>
                <div className="absolute top-3 left-3 bg-card/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] text-primary font-bold flex items-center gap-1.5 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  {project.status === 'active' ? 'Phase 2 Active' : 'Proposed'}
                </div>
                <div className="absolute top-3 right-3 bg-slate-900/80 text-white px-2 py-0.5 rounded-md text-[10px] font-mono font-bold">
                  Grant: ₹{project.grant_amount || '0'}
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="text-xs text-primary font-bold flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4" />
                    {project.institutions?.name || 'Partner Institute'}
                  </div>
                  <h3 className="font-bold text-foreground line-clamp-2">{project.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{project.description}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-border/40 flex items-center justify-between">
                  <span className="text-xs text-foreground font-semibold flex items-center gap-1.5">
                    <Bot className="text-primary w-4 h-4" />
                    Project Lab
                  </span>
                  <button className="text-primary hover:text-primary/80 text-xs font-bold flex items-center gap-0.5">
                    View Hub &rarr;
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {activeProjects.length === 0 && (
             <div className="col-span-full py-8 text-center text-muted-foreground bg-muted/20 rounded-xl border border-dashed border-border/60">
                 No active research projects found. Create a proposal below.
             </div>
          )}
        </div>
      </section>

      {/* Lower Section: Proposal Form & Countersigned Dossiers */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4">
        
        {/* Left Column: Interactive Proposal Form */}
        <div className="lg:col-span-7 bg-card border border-border/40 rounded-2xl p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-between pb-6 border-b border-border/40">
            <div>
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Institutional Outreach</span>
              <h3 className="text-xl font-bold text-foreground mt-1">Submit Joint Research Proposal</h3>
            </div>
            <span className="p-2.5 bg-primary/10 text-primary rounded-xl shrink-0">
              <Megaphone className="w-6 h-6" />
            </span>
          </div>

          <form className="space-y-5 pt-5 flex-1 flex flex-col" onSubmit={(e) => e.preventDefault()}>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Initiative Category</label>
                <div className="relative">
                  <select className="w-full pl-3 pr-8 py-2.5 bg-muted/50 border border-border/40 rounded-xl text-sm font-semibold text-foreground appearance-none focus:outline-none focus:ring-1 focus:ring-primary shadow-sm cursor-pointer">
                    <option>Joint R&D Lab & Research Grant</option>
                    <option>Sponsorship: National Collegiate Hackathon</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Estimated Grant Budget (INR)</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-mono">₹</span>
                  <input className="w-full pl-7 pr-3 py-2.5 bg-muted/50 border border-border/40 rounded-xl text-sm font-mono font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-primary shadow-sm" placeholder="500000" type="number" defaultValue="500000" />
                </div>
              </div>
            </div>

            <div className="space-y-2 flex-1">
              <label className="text-sm font-semibold text-foreground">Proposal Description</label>
              <textarea className="w-full h-[100px] p-3.5 bg-muted/50 border border-border/40 rounded-xl text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground shadow-sm resize-none" placeholder="Detail corporate engineering mentors, GPU compute tokens, proprietary SDK licenses..."></textarea>
            </div>

            <div className="pt-4 mt-auto border-t border-border/40 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                <BadgeCheck className="text-primary w-4 h-4" />
                Requires Dean of R&D authorization
              </div>
              <button type="button" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-bold shadow-sm transition-all">
                <span>Dispatch Proposal</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Countersigned MoUs & Legal Dossiers */}
        <div className="lg:col-span-5 bg-card border border-border/40 rounded-2xl p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-between pb-6 border-b border-border/40">
            <div>
              <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">Compliance & Contracts</span>
              <h3 className="text-xl font-bold text-foreground mt-1">Countersigned MoUs</h3>
            </div>
            <span className="p-2.5 bg-indigo-500/10 text-indigo-500 rounded-xl shrink-0">
              <ClipboardCheck className="w-6 h-6" />
            </span>
          </div>

          <div className="space-y-3 flex-1 mt-5">
            {activePartnerships.map((mou: any) => (
               <div key={mou.id} className="p-3.5 rounded-xl bg-background border border-border/60 flex items-center justify-between hover:bg-muted transition-colors group cursor-pointer shadow-sm">
                 <div className="flex items-center gap-3.5 min-w-0">
                   <div className="w-10 h-10 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center shrink-0 border border-red-500/20">
                     <FileText className="w-5 h-5" />
                   </div>
                   <div className="min-w-0">
                     <h4 className="text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors">{mou.institutions?.name || 'Institution'} - MoU</h4>
                     <div className="flex items-center gap-2 text-[10px] font-semibold text-muted-foreground mt-0.5">
                       <span className="font-mono">Start: {new Date(mou.created_at).toLocaleDateString()}</span>
                       <span>•</span>
                       <span className="text-emerald-500 font-bold uppercase">{mou.status}</span>
                     </div>
                   </div>
                 </div>
                 <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-background shadow-sm transition-all shrink-0 ml-2" title="Download">
                   <Download className="w-4 h-4" />
                 </button>
               </div>
            ))}
            
            {activePartnerships.length === 0 && (
               <div className="text-sm text-center py-4 text-muted-foreground">
                   No active MoUs found.
               </div>
            )}
          </div>

          <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 flex items-center gap-3 mt-4">
            <Gavel className="text-primary w-6 h-6 shrink-0" />
            <div className="min-w-0">
              <span className="text-xs text-primary font-bold block">SCI Standard Academic IP Charter</span>
              <span className="text-[10px] text-muted-foreground font-medium mt-0.5 block">Non-exclusive commercialization privileges granted to sponsors.</span>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}
