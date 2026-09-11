"use client";

import { useState } from "react";
import {
  User,
  Settings2,
  FileBadge,
  GraduationCap,
  Briefcase,
  Lightbulb,
  Award,
  Link as LinkIcon,
  BookOpen,
  Camera,
  Save,
  CheckCircle2,
  ShieldCheck,
  ToggleRight,
  Sparkles
} from "lucide-react";

export function ProfileClient({ profile, credentials = [] }: { profile?: any, credentials?: any[] }) {
  const [activeTab, setActiveTab] = useState<'credentials' | 'settings'>('credentials');

  return (
    <div className="flex flex-col gap-6 relative h-full">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Academic Profile & Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your digital CV, credentials, and visibility preferences.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 px-6 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-semibold transition-colors shadow-sm">
            <Save className="w-4 h-4" />
            <span>Save Profile</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mt-2">
        
        {/* Settings Navigation Sidebar */}
        <div className="w-full lg:w-64 flex flex-col gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('credentials')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-left
              ${activeTab === 'credentials' 
                ? 'bg-background border border-border/60 text-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent'}
            `}
          >
            <FileBadge className="w-4 h-4" />
            Credentials Manager
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-left
              ${activeTab === 'settings' 
                ? 'bg-background border border-border/60 text-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent'}
            `}
          >
            <Settings2 className="w-4 h-4" />
            Account Settings
          </button>
        </div>

        {/* Settings Content Area */}
        <div className="flex-1 bg-card border border-border/40 rounded-2xl shadow-sm p-6 lg:p-8 animate-in fade-in">
          
          {/* CREDENTIALS TAB */}
          {activeTab === 'credentials' && (
            <div className="flex flex-col gap-8">
              
              {/* Basic Profile */}
              <div className="flex flex-col md:flex-row gap-8 pb-8 border-b border-border/40">
                <div className="relative group w-32 h-32 shrink-0">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300" alt="Profile" className="w-full h-full rounded-2xl object-cover border-2 border-border/60 shadow-sm" />
                  <button className="absolute -bottom-3 -right-3 p-3 rounded-xl bg-primary text-primary-foreground shadow-md hover:scale-105 transition-transform border-2 border-card">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex-1 flex flex-col gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Full Name</label>
                      <input 
                        type="text" 
                        defaultValue={profile?.full_name || "Faculty Member"}
                        className="w-full px-4 py-2 bg-background border border-border/60 rounded-xl text-sm font-semibold text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Designation</label>
                      <input 
                        type="text" 
                        defaultValue={profile?.designation || "Faculty"}
                        className="w-full px-4 py-2 bg-background border border-border/60 rounded-xl text-sm font-semibold text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-2 md:col-span-2">
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                        ORCID iD <LinkIcon className="w-3.5 h-3.5" />
                      </label>
                      <input 
                        type="text" 
                        defaultValue={profile?.social_links?.orcid || ""}
                        placeholder="0000-0000-0000-0000"
                        className="w-full px-4 py-2 bg-background border border-border/60 rounded-xl text-sm font-mono text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Verified Expertise Tags (AI) */}
              <div>
                <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" /> Verified Expertise (AI Generated)
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-bold border border-primary/20 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Machine Learning
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-bold border border-primary/20 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Computer Vision
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-bold border border-primary/20 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Neural Networks
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-muted text-muted-foreground text-xs font-bold border border-border/60 border-dashed cursor-not-allowed">
                    Based on 14 analyzed publications
                  </span>
                </div>
              </div>

              {/* Education & Ph.D */}
              <div>
                <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-muted-foreground" /> Education Details
                </h3>
                <div className="p-4 rounded-xl border border-border/40 bg-background flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-foreground">Ph.D. in Computer Science</h4>
                    <span className="text-xs font-semibold text-muted-foreground">2012 - 2016</span>
                  </div>
                  <span className="text-sm font-semibold text-muted-foreground">Indian Institute of Technology, Bombay (IIT-B)</span>
                  <p className="text-xs font-semibold text-muted-foreground mt-2 italic">
                    Thesis: "Scalable Architectures for Deep Convolutional Networks in Edge Computing"
                  </p>
                </div>
              </div>

              {/* Publications & Patents */}
              <div>
                <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-muted-foreground" /> Key Publications & Patents
                </h3>
                <div className="flex flex-col gap-3">
                  
                  {credentials.length === 0 && (
                    <div className="p-6 rounded-xl border border-border/40 border-dashed bg-background flex flex-col items-center justify-center text-center gap-2">
                      <span className="text-sm font-bold text-muted-foreground">No credentials added yet</span>
                    </div>
                  )}

                  {credentials.map(cred => (
                    <div key={cred.id} className="p-4 rounded-xl border border-border/40 bg-background flex flex-col gap-2 relative group">
                      <button className="absolute top-4 right-4 text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">Edit</button>
                      <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 text-[10px] font-bold uppercase tracking-widest w-fit border border-blue-500/20">
                        {cred.type}
                      </span>
                      <h4 className="text-sm font-bold text-foreground pr-10">{cred.title}</h4>
                      <span className="text-xs font-semibold text-muted-foreground">{cred.issuer} • {new Date(cred.issue_date).getFullYear()}</span>
                    </div>
                  ))}

                </div>
                <button className="mt-4 px-4 py-2 rounded-lg border border-border/60 bg-background text-foreground text-xs font-bold shadow-sm hover:bg-muted transition-colors">
                  + Add Entry
                </button>
              </div>

            </div>
          )}

          {/* SETTINGS TAB */}
          {activeTab === 'settings' && (
            <div className="flex flex-col gap-8">
              
              <div>
                <h2 className="text-lg font-bold text-foreground mb-1">Privacy & Visibility</h2>
                <p className="text-sm font-semibold text-muted-foreground">Control how you appear to industry partners and students.</p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="p-4 rounded-xl border border-border/40 bg-background flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold text-foreground">Open to Consultancy</span>
                    <span className="text-xs font-semibold text-muted-foreground max-w-sm">Allow companies to invite you directly to RFPs and projects.</span>
                  </div>
                  <ToggleRight className="w-8 h-8 text-primary cursor-pointer" />
                </div>

                <div className="p-4 rounded-xl border border-border/40 bg-background flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold text-foreground">Open to Mentorship</span>
                    <span className="text-xs font-semibold text-muted-foreground max-w-sm">Allow students to request 1:1 mentorship sessions.</span>
                  </div>
                  <ToggleRight className="w-8 h-8 text-muted-foreground cursor-pointer opacity-50" />
                </div>

                <div className="p-4 rounded-xl border border-border/40 bg-background flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold text-foreground">Public Profile</span>
                    <span className="text-xs font-semibold text-muted-foreground max-w-sm">Make your digital CV visible in the global SCI directory.</span>
                  </div>
                  <ToggleRight className="w-8 h-8 text-primary cursor-pointer" />
                </div>
              </div>

              <div className="w-full h-px bg-border/40 my-2"></div>

              <div>
                <h2 className="text-lg font-bold text-foreground mb-1">Security</h2>
                <p className="text-sm font-semibold text-muted-foreground">Manage your account security and authentication.</p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="p-4 rounded-xl border border-border/40 bg-background flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold text-foreground">Password</span>
                    <span className="text-xs font-semibold text-muted-foreground">Last changed 3 months ago</span>
                  </div>
                  <button className="px-4 py-2 rounded-lg border border-border/60 text-xs font-bold hover:bg-muted transition-colors">
                    Change
                  </button>
                </div>

                <div className="p-4 rounded-xl border border-border/40 bg-background flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold text-foreground flex items-center gap-1.5">
                      Two-Factor Authentication <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    </span>
                    <span className="text-xs font-semibold text-muted-foreground">Currently enabled via Authenticator App</span>
                  </div>
                  <button className="px-4 py-2 rounded-lg border border-border/60 text-xs font-bold hover:bg-muted transition-colors">
                    Manage
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>

    </div>
  );
}
