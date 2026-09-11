"use client";

import { useState } from "react";
import {
  Users,
  Video,
  Calendar,
  Clock,
  Plus,
  Users2,
  FileBadge,
  MessageSquare,
  MoreVertical,
  CheckCircle2,
  ExternalLink
} from "lucide-react";

export function WorkshopsClient({ workshops, mentorships = [] }: { workshops: any[], mentorships?: any[] }) {
  const [activeTab, setActiveTab] = useState<'workshops' | 'mentorship'>('workshops');

  const upcomingWorkshops = workshops.filter(w => w.status === 'upcoming' || w.status === 'live');
  const pastWorkshops = workshops.filter(w => w.status === 'past' || w.status === 'cancelled');

  return (
    <div className="flex flex-col gap-6 relative h-full">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Workshops & Mentorship</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Give back by hosting technical workshops or providing 1:1 mentorship across the SCI network.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1 bg-muted/30 rounded-xl w-fit border border-border/40">
        <button 
          onClick={() => setActiveTab('workshops')}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
            activeTab === 'workshops' 
              ? 'bg-background shadow-sm text-foreground border border-border/60' 
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent'
          }`}
        >
          My Workshops
        </button>
        <button 
          onClick={() => setActiveTab('mentorship')}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
            activeTab === 'mentorship' 
              ? 'bg-background shadow-sm text-foreground border border-border/60' 
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent'
          }`}
        >
          Mentorship Roster
        </button>
      </div>

      {/* Content Areas */}
      
      {activeTab === 'workshops' && (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Hosted Workshops List */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <h2 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                <Video className="w-5 h-5 text-primary" /> Scheduled & Past Workshops
              </h2>

              {upcomingWorkshops.length === 0 && pastWorkshops.length === 0 && (
                <div className="bg-card border border-border/40 rounded-2xl p-8 text-center text-muted-foreground">
                  No workshops found.
                </div>
              )}

              {/* Upcoming Workshops */}
              {upcomingWorkshops.map(workshop => (
                <div key={workshop.id} className="bg-card border border-border/40 rounded-2xl shadow-sm p-5 flex flex-col gap-4 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                  
                  <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex flex-col gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-500 text-[10px] font-bold uppercase tracking-widest border border-amber-500/20 w-fit">
                        {workshop.status}
                      </span>
                      <h3 className="text-xl font-bold text-foreground">{workshop.title}</h3>
                      <div className="flex items-center gap-4 text-sm font-semibold text-muted-foreground mt-1">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" /> 
                          {new Date(workshop.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" /> 
                          {new Date(workshop.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-muted/40 rounded-xl border border-border/40">
                      <Users2 className="w-4 h-4 text-primary" />
                      <span className="text-sm font-bold text-foreground">{workshop.registered_count} {workshop.capacity && `/ ${workshop.capacity}`}</span>
                      <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest ml-1">Registered</span>
                    </div>
                  </div>

                  <div className="relative z-10 mt-2 flex flex-col md:flex-row gap-3">
                    <button className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                      <Video className="w-4 h-4" /> {workshop.is_virtual ? "Start Webinar" : "View Details"}
                    </button>
                    <button className="flex-1 py-2.5 rounded-xl bg-background border border-border/60 text-foreground font-bold text-sm shadow-sm hover:bg-muted transition-colors flex items-center justify-center gap-2">
                      <FileBadge className="w-4 h-4" /> Prepare Certificates
                    </button>
                  </div>
                </div>
              ))}

              {/* Past Workshops */}
              {pastWorkshops.map(workshop => (
                <div key={workshop.id} className="bg-card border border-border/40 rounded-2xl shadow-sm p-5 flex flex-col gap-4 opacity-70">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Past Event</span>
                      <h3 className="text-lg font-bold text-foreground">{workshop.title}</h3>
                      <div className="flex items-center gap-4 text-xs font-semibold text-muted-foreground mt-1">
                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {new Date(workshop.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-muted/20 rounded-xl border border-border/40">
                      <span className="text-sm font-bold text-foreground">{workshop.registered_count}</span>
                      <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest ml-1">Attended</span>
                    </div>
                  </div>
                </div>
              ))}

            </div>

            {/* Host Workshop Form / CTA */}
            <div className="bg-card border border-border/40 rounded-2xl shadow-sm p-6 flex flex-col items-center justify-center text-center text-muted-foreground hover:border-primary/50 transition-colors h-fit sticky top-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                <Plus className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Host a New Workshop</h3>
              <p className="text-sm font-semibold mt-2 max-w-xs leading-relaxed">
                Schedule a webinar, set participant limits, and configure automatic certificate issuance.
              </p>
              <button className="mt-6 w-full px-6 py-2.5 rounded-xl bg-background border border-border/60 text-foreground font-bold text-sm shadow-sm hover:bg-muted transition-colors">
                Open Scheduling Form
              </button>
            </div>

          </div>
        </div>
      )}

      {activeTab === 'mentorship' && (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {mentorships.length === 0 && (
              <div className="col-span-full bg-card border border-border/40 rounded-2xl p-8 text-center text-muted-foreground">
                No active mentorship sessions found.
              </div>
            )}
            
            {mentorships.map(session => {
              const mentee = Array.isArray(session.mentee) ? session.mentee[0] : session.mentee;
              const name = mentee?.full_name || "Unknown Mentee";
              const initials = name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase();
              
              return (
                <div key={session.id} className="bg-card border border-border/40 rounded-2xl shadow-sm p-5 flex flex-col gap-4 group">
                  <div className="flex items-start justify-between border-b border-border/40 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-muted border border-border/60 flex items-center justify-center font-bold text-foreground">
                        {initials}
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">{name}</h3>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{mentee?.role || 'Student'}</span>
                      </div>
                    </div>
                    <button className="p-1.5 rounded-md text-muted-foreground hover:bg-muted transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex flex-col gap-2 flex-1">
                    <span className="text-xs font-bold text-foreground flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Goal: Mentorship Session
                    </span>
                    <p className="text-xs font-semibold text-muted-foreground leading-relaxed">
                      {session.notes || "No notes provided for this session."}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 mt-2 pt-4 border-t border-border/40">
                    <button className="flex-1 py-2 rounded-lg bg-primary/10 text-primary font-bold text-xs hover:bg-primary/20 transition-colors flex items-center justify-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" /> {new Date(session.scheduled_at).toLocaleDateString()}
                    </button>
                    <button className="flex-1 py-2 rounded-lg bg-background border border-border/60 text-foreground font-bold text-xs hover:bg-muted transition-colors flex items-center justify-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5" /> Chat
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Add Mentee */}
            <div className="bg-card border border-border/40 border-dashed rounded-2xl shadow-sm flex flex-col items-center justify-center p-6 text-center opacity-70 hover:opacity-100 hover:border-primary/50 transition-all cursor-pointer min-h-[250px]">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3 text-muted-foreground">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-foreground">Accept New Mentee</h3>
              <p className="text-xs font-semibold text-muted-foreground mt-1 max-w-[200px]">
                You have 2 pending mentorship requests.
              </p>
              <button className="mt-4 px-4 py-1.5 rounded-lg border border-border/60 bg-background text-foreground text-xs font-bold shadow-sm flex items-center gap-1 hover:bg-muted transition-colors">
                View Requests <ExternalLink className="w-3 h-3" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
