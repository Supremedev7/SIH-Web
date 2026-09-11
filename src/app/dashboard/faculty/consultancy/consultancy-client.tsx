"use client";

import { useState } from "react";
import {
  Briefcase,
  FileText,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  IndianRupee,
  Building2,
  FileUp,
  MessageSquare,
  MoreVertical,
  Download,
  AlertTriangle,
  ArrowRight,
  Bookmark
} from "lucide-react";

export function ConsultancyClient({ 
  rfps, 
  proposals, 
  activeContracts 
}: { 
  rfps: any[], 
  proposals: any[],
  activeContracts: any[] 
}) {
  const [activeTab, setActiveTab] = useState<'rfps' | 'proposals' | 'active'>('rfps');

  return (
    <div className="flex flex-col gap-6 relative h-full">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Consultancy & Freelance Hub</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Offer your specialized expertise to industry challenges and manage ongoing contracts.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-background border border-border/60 text-foreground hover:bg-muted text-sm font-semibold transition-colors shadow-sm">
            <FileText className="w-4 h-4" />
            <span>My Invoices</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1 bg-muted/30 rounded-xl w-fit border border-border/40 overflow-x-auto">
        <button 
          onClick={() => setActiveTab('rfps')}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'rfps' 
              ? 'bg-background shadow-sm text-foreground border border-border/60' 
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent'
          }`}
        >
          Industry RFPs
        </button>
        <button 
          onClick={() => setActiveTab('proposals')}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'proposals' 
              ? 'bg-background shadow-sm text-foreground border border-border/60' 
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent'
          }`}
        >
          My Proposals
        </button>
        <button 
          onClick={() => setActiveTab('active')}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'active' 
              ? 'bg-background shadow-sm text-foreground border border-border/60' 
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent'
          }`}
        >
          Active Contracts
          <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
        </button>
      </div>

      {/* Content Areas */}
      
      {activeTab === 'rfps' && (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center gap-4 bg-card border border-border/40 rounded-xl p-3 shadow-sm">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search by keywords, companies, or tech stack..." 
                className="w-full pl-9 pr-4 py-2 bg-background border border-border/60 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
            <button className="p-2 rounded-lg border border-border/60 bg-background text-muted-foreground hover:bg-muted transition-colors shrink-0">
              <Filter className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rfps.length === 0 && (
              <div className="col-span-full py-8 text-center text-muted-foreground">
                No active RFPs found.
              </div>
            )}
            {rfps.map((rfp) => (
              <div key={rfp.id} className="bg-card border border-border/40 rounded-2xl shadow-sm hover:border-primary/50 transition-colors p-6 flex flex-col gap-4 group">
                <div className="flex items-start justify-between">
                  <div className="px-2 py-1 rounded bg-muted text-[10px] font-bold text-muted-foreground uppercase tracking-widest border border-border/60">
                    {rfp.id.split('-')[0]}-{rfp.id.substring(rfp.id.length - 4)}
                  </div>
                  <button className="p-1 rounded text-muted-foreground hover:text-primary transition-colors">
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-bold text-foreground leading-tight group-hover:text-primary transition-colors">{rfp.title}</h3>
                  <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground mt-1">
                    <Building2 className="w-4 h-4" /> {rfp.company}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 p-3 bg-muted/20 rounded-xl border border-border/40">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                      <IndianRupee className="w-3 h-3" /> Budget
                    </span>
                    <span className="text-sm font-bold text-foreground">{rfp.budget || "Negotiable"}</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Timeline
                    </span>
                    <span className="text-sm font-bold text-foreground">{rfp.timeline || "TBD"}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-2">
                  {rfp.tags.map((tag: string) => (
                    <span key={tag} className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold border border-primary/20">
                      {tag}
                    </span>
                  ))}
                </div>

                <button className="w-full mt-2 py-2.5 rounded-xl bg-background border border-border/60 text-foreground text-sm font-bold shadow-sm hover:bg-muted transition-colors flex items-center justify-center gap-2">
                  Submit Proposal
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'proposals' && (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4">
          
          <div className="bg-card border border-border/40 rounded-2xl shadow-sm p-6 overflow-hidden">
            <h2 className="text-lg font-bold text-foreground mb-4">My Submitted Proposals</h2>
            
            <div className="flex flex-col gap-4">
              {proposals.length === 0 && (
                <div className="py-8 text-center text-muted-foreground">
                  You have not submitted any proposals yet.
                </div>
              )}
              {proposals.map((prop, idx) => (
                <div key={idx} className={`flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl border border-border/60 bg-background ${prop.status === 'rejected' ? 'opacity-70' : ''}`}>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-muted-foreground">{prop.rfpId} • {prop.company}</span>
                    <h3 className="text-base font-bold text-foreground">{prop.title}</h3>
                    <div className="flex items-center gap-3 text-xs font-semibold text-muted-foreground mt-1">
                      <span className="flex items-center gap-1"><IndianRupee className="w-3.5 h-3.5" /> Quoted: {prop.quoted}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Submitted: {prop.submittedDate}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest border
                      ${prop.status === 'applied' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' : 
                        prop.status === 'rejected' ? 'bg-muted text-muted-foreground border-border/60' : 
                        'bg-amber-500/10 text-amber-500 border-amber-500/20'}
                    `}>
                      {prop.status}
                    </span>
                    <button className="p-2 text-muted-foreground hover:bg-muted rounded-lg transition-colors border border-transparent hover:border-border/60">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {activeTab === 'active' && (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4">
          {activeContracts.length === 0 && (
             <div className="bg-card border border-border/40 rounded-2xl p-8 text-center text-muted-foreground">
               No active contracts found.
             </div>
          )}
          {activeContracts.map((contract, idx) => (
          <div key={idx} className="bg-card border border-emerald-500/30 rounded-2xl shadow-md p-6 relative overflow-hidden mb-6">
            
            {/* Background accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col lg:flex-row gap-8">
              
              <div className="flex-1 flex flex-col gap-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-widest border border-emerald-500/20 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    Active Contract
                  </div>
                  <span className="text-xs font-bold text-muted-foreground font-mono">{contract.rfpId}</span>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{contract.title}</h2>
                  <div className="flex items-center gap-4 text-sm font-semibold text-muted-foreground mt-2">
                    <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4" /> {contract.company}</span>
                    <span className="flex items-center gap-1.5"><IndianRupee className="w-4 h-4" /> Total Value: {contract.quoted}</span>
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-sm font-bold">
                    <span className="text-foreground">Overall Progress</span>
                    <span className="text-emerald-500">65%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-2">
                  <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-background border border-border/60 text-foreground font-bold text-sm hover:bg-muted transition-colors shadow-sm">
                    <MessageSquare className="w-4 h-4" /> Client Chat
                  </button>
                  <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-colors shadow-sm">
                    <FileUp className="w-4 h-4" /> Upload Deliverable
                  </button>
                </div>
              </div>

              <div className="w-full lg:w-80 flex flex-col gap-4">
                <h3 className="text-sm font-bold text-foreground border-b border-border/40 pb-2">Milestone Tracker</h3>
                <div className="flex flex-col gap-0 relative">
                  <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-border/60 z-0"></div>
                  
                  {/* Milestone 1 */}
                  <div className="flex items-start gap-3 relative z-10 py-2">
                    <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5 ring-4 ring-card">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex flex-col gap-0.5 bg-card px-2">
                      <span className="text-sm font-bold text-foreground">Phase 1: Dataset Prep</span>
                      <span className="text-[10px] font-semibold text-emerald-500">Completed & Paid</span>
                    </div>
                  </div>
                  
                  {/* Milestone 3 (Current) */}
                  <div className="flex items-start gap-3 relative z-10 py-2">
                    <div className="w-6 h-6 rounded-full bg-card border-2 border-primary flex items-center justify-center shrink-0 mt-0.5 ring-4 ring-card">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                    </div>
                    <div className="flex flex-col gap-0.5 bg-card px-2">
                      <span className="text-sm font-bold text-foreground">Phase 2: Active</span>
                      <span className="text-[10px] font-semibold text-primary">In Progress</span>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
          ))}
        </div>
      )}

    </div>
  );
}
