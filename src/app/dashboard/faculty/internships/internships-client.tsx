"use client";

import { useState } from "react";
import {
  Briefcase,
  Search,
  Filter,
  Building2,
  MapPin,
  Clock,
  ArrowRight,
  Bookmark,
  CheckCircle2,
  Calendar,
  Sparkles,
  ChevronRight
} from "lucide-react";

export function InternshipsClient({ opportunities = [], applications = [] }: { opportunities?: any[], applications?: any[] }) {
  const [activeTab, setActiveTab] = useState<'discover' | 'applied'>('discover');

  return (
    <div className="flex flex-col gap-6 relative h-full">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Faculty Internships & Sabbaticals</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Discover temporary industry roles and sabbaticals to update your practical knowledge.
          </p>
        </div>
      </div>

      {/* Stats/Overview Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border/40 rounded-2xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <Search className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-muted-foreground">Active Opportunities</span>
            <span className="text-2xl font-bold text-foreground">{opportunities.length}</span>
          </div>
        </div>
        <div className="bg-card border border-border/40 rounded-2xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
            <Briefcase className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-muted-foreground">Applied</span>
            <span className="text-2xl font-bold text-foreground">{applications.length}</span>
          </div>
        </div>
        <div className="bg-card border border-border/40 rounded-2xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-muted-foreground">Completed Sabbaticals</span>
            <span className="text-2xl font-bold text-foreground">0</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-card border border-border/40 rounded-2xl shadow-sm flex flex-col min-h-[500px]">
        
        {/* Tabs & Search */}
        <div className="p-4 border-b border-border/40 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-muted/20">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setActiveTab('discover')}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                activeTab === 'discover' 
                  ? 'bg-background shadow-sm text-foreground border border-border/60' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent'
              }`}
            >
              Opportunity Feed
            </button>
            <button 
              onClick={() => setActiveTab('applied')}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                activeTab === 'applied' 
                  ? 'bg-background shadow-sm text-foreground border border-border/60' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent'
              }`}
            >
              Application Manager
            </button>
          </div>
          
          {activeTab === 'discover' && (
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search roles or companies..." 
                  className="w-full pl-9 pr-4 py-1.5 bg-background border border-border/60 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>
              <button className="p-1.5 rounded-lg border border-border/60 bg-background text-muted-foreground hover:bg-muted transition-colors">
                <Filter className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Opportunity List */}
        <div className="p-6 flex-1 flex flex-col gap-4">
          
          {activeTab === 'discover' && (
            <>
              {opportunities.map((internship) => {
                const employerName = Array.isArray(internship.employer) ? internship.employer[0]?.full_name : internship.employer?.full_name;
                const companyName = Array.isArray(internship.employer) ? internship.employer[0]?.organization : internship.employer?.organization;
                const hasApplied = applications.some((app: any) => app.job?.id === internship.id);

                return (
                  <div key={internship.id} className="p-5 rounded-xl border border-border/60 bg-background hover:border-primary/50 hover:shadow-sm transition-all group flex flex-col md:flex-row md:items-center justify-between gap-6">
                    
                    <div className="flex flex-col gap-3 flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex flex-col gap-1">
                          <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{internship.title}</h3>
                          <div className="flex items-center gap-4 text-sm font-semibold text-muted-foreground">
                            <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4" /> {companyName || employerName || 'Unknown Company'}</span>
                            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {internship.location || (internship.is_remote ? 'Remote' : 'Not specified')}</span>
                          </div>
                        </div>
                        <button className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                          <Bookmark className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-1.5 border border-emerald-500/20 w-fit">
                          <Sparkles className="w-3.5 h-3.5" />
                          Good Match
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center shrink-0">
                      {hasApplied ? (
                         <span className="px-5 py-2.5 rounded-xl bg-muted text-muted-foreground text-sm font-bold shadow-sm flex items-center gap-2">
                          Applied <CheckCircle2 className="w-4 h-4" />
                        </span>
                      ) : (
                        <button className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold shadow-sm hover:bg-primary/90 transition-colors flex items-center gap-2">
                          Apply Now <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
              
              {opportunities.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Search className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">No Opportunities Found</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    There are no open roles available right now.
                  </p>
                </div>
              )}
            </>
          )}

          {activeTab === 'applied' && (
            <>
              {applications.map((app) => {
                const job = Array.isArray(app.job) ? app.job[0] : app.job;
                const employerName = Array.isArray(job?.employer) ? job?.employer[0]?.full_name : job?.employer?.full_name;
                const companyName = Array.isArray(job?.employer) ? job?.employer[0]?.organization : job?.employer?.organization;

                return (
                  <div key={app.id} className="p-5 rounded-xl border border-border/60 bg-background flex flex-col gap-4">
                    <div className="flex items-start justify-between">
                      <div className="flex flex-col gap-1">
                        <h3 className="text-lg font-bold text-foreground">{job?.title || 'Unknown Job'}</h3>
                        <div className="flex items-center gap-4 text-sm font-semibold text-muted-foreground">
                          <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4" /> {companyName || employerName || 'Unknown Company'}</span>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-bold uppercase tracking-widest border border-blue-500/20">
                        {app.status}
                      </span>
                    </div>
                    
                    <div className="flex flex-col gap-2 p-4 rounded-lg bg-muted/30 border border-border/40">
                      <div className="flex items-center justify-between text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">
                        <span>Application Timeline</span>
                      </div>
                      <div className="relative">
                        <div className="absolute left-2.5 top-2.5 bottom-2.5 w-0.5 bg-border/60"></div>
                        <div className="flex flex-col gap-4 relative z-10">
                          <div className="flex items-center gap-4">
                            <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0 ring-4 ring-background">
                              <CheckCircle2 className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-sm font-semibold text-foreground">Application Submitted ({new Date(app.created_at).toLocaleDateString()})</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {applications.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Briefcase className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">No Active Applications</h3>
                  <p className="text-sm text-muted-foreground mt-1 max-w-sm">
                    You haven't applied to any sabbaticals or industry roles yet. Explore the opportunity feed to find matches.
                  </p>
                  <button 
                    onClick={() => setActiveTab('discover')}
                    className="mt-4 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-bold"
                  >
                    Explore Opportunities
                  </button>
                </div>
              )}
            </>
          )}

        </div>

      </div>

    </div>
  );
}
