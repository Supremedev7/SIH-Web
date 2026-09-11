"use client";

import { 
  Key,
  BadgeCheck,
  Mail,
  Download,
  MapPin,
  CalendarDays,
  Badge,
  User,
  Contact,
  Terminal,
  Building2,
  AtSign,
  Medal,
  ExternalLink,
  CheckCircle2,
  GraduationCap
} from "lucide-react";
import { useState } from "react";

import type { CredentialsPageProps } from "@/types/student-portal";

export function CredentialsClient({ profile, credentials = [], skillProfile, email }: CredentialsPageProps) {
  const [copied, setCopied] = useState(false);
  const fullName = profile?.full_name || "Student";
  const initials = fullName.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase();
  const department = profile?.department || "Computer Science";
  const bio = profile?.bio || "A highly motivated student exploring opportunities in the tech industry.";
  const github: string = typeof profile?.metadata?.github === 'string' ? profile.metadata.github : "#";
  const linkedin: string = typeof profile?.metadata?.linkedin === 'string' ? profile.metadata.linkedin : "#";
  const githubUsername = github !== "#" ? github.replace('https://github.com/', '') : 'github.com/username';
  const linkedinUsername = linkedin !== "#" ? linkedin.replace('https://linkedin.com/in/', '') : 'linkedin.com/in/username';
  
  const technicalSkillsObj = (skillProfile?.technical_skills as Record<string, number>) || {};
  const technicalSkills = Object.entries(technicalSkillsObj).map(([name, score]) => ({
    name,
    score
  }));
  const employabilityScore = skillProfile?.employability_score || 0;

  const handleShare = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6 py-6 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Hero Section */}
      <section className="w-full bg-card rounded-xl border border-border/60 shadow-sm overflow-hidden relative">
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <button 
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted bg-background rounded-lg border border-border/80 transition-colors shadow-sm active:scale-95" 
            type="button"
          >
            {copied ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Link Copied</span>
              </>
            ) : (
              <>
                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                <span>Share Profile</span>
              </>
            )}
          </button>
        </div>

        {/* Header Cover */}
        <div className="w-full h-24 bg-gradient-to-r from-primary/10 to-transparent border-b border-border/40"></div>
        
        {/* Candidate Identity Body */}
        <div className="px-6 sm:px-8 pb-7 pt-0 relative">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 -mt-10 mb-5">
            {/* Avatar and Title */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
              <div className="relative">
                <div className="w-24 h-24 rounded-2xl bg-primary text-primary-foreground font-display text-2xl font-bold flex items-center justify-center shadow-md ring-4 ring-card">
                  {initials}
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="text-2xl font-bold tracking-tight text-foreground font-display">{fullName}</h1>
                  {Boolean(profile?.metadata?.onboarding_completed) && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                      <BadgeCheck className="w-3.5 h-3.5" />
                      Verified Student
                    </span>
                  )}
                </div>
                <p className="text-sm text-foreground/80 font-medium">
                  {profile?.designation || "Student"} • {department}
                </p>
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1 font-medium text-foreground/80">
                    <GraduationCap className="w-3.5 h-3.5 text-primary" />
                    National Institute of Technology (NIT) Karnataka
                  </span>
                  <span className="text-muted-foreground/40">•</span>
                  <span>Class of 2026</span>
                  <span className="text-muted-foreground/40">•</span>
                  <span className="font-medium text-foreground/80">
                    CGPA: 9.18 / 10.0
                  </span>
                </div>
              </div>
            </div>
            
            {/* Primary Actions */}
            <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
              <button className="flex-1 lg:flex-initial px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-sm active:scale-95" type="button">
                <Mail className="w-4 h-4" />
                <span>Contact Candidate</span>
              </button>
              <button className="flex-1 lg:flex-initial px-4 py-2.5 rounded-xl bg-background border border-border/80 hover:bg-muted text-foreground font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors active:scale-95" type="button">
                <Download className="w-4 h-4 text-muted-foreground" />
                <span>Download Resume</span>
              </button>
            </div>
          </div>
          
          {/* Meta Tags Row */}
          <div className="pt-4 flex flex-wrap items-center gap-3 text-xs text-foreground/80">
            <span className="flex items-center gap-1.5 font-medium">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              Bangalore, India
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <CalendarDays className="w-4 h-4 text-muted-foreground" />
              Available for Summer 2026 / Full-time
            </span>
          </div>
        </div>
      </section>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* 1. Executive Summary */}
          <div className="bg-card rounded-xl border border-border/60 p-5 space-y-3.5 shadow-sm">
            <div className="flex items-center gap-2 pb-3 border-b border-border/40">
              <User className="w-4 h-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold text-foreground">About</h2>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">
              {bio}
            </p>
          </div>

          {/* 2. Professional Links */}
          <div className="bg-card rounded-xl border border-border/60 p-5 space-y-3.5 shadow-sm">
            <div className="flex items-center pb-3 border-b border-border/40">
              <div className="flex items-center gap-2">
                <Contact className="w-4 h-4 text-muted-foreground" />
                <h2 className="text-sm font-semibold text-foreground">Links</h2>
              </div>
            </div>
            <div className="space-y-2">
              <a className="p-2.5 rounded-lg border border-border/40 bg-muted/30 hover:bg-muted transition-colors flex items-center justify-between group text-sm" href={github} target="_blank" rel="noreferrer">
                <div className="flex items-center gap-3 min-w-0">
                  <Terminal className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  <div className="truncate">
                    <span className="font-medium text-foreground truncate block">{githubUsername}</span>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              
              <a className="p-2.5 rounded-lg border border-border/40 bg-muted/30 hover:bg-muted transition-colors flex items-center justify-between group text-sm" href={linkedin} target="_blank" rel="noreferrer">
                <div className="flex items-center gap-3 min-w-0">
                  <Building2 className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  <div className="truncate">
                    <span className="font-medium text-foreground truncate block">{linkedinUsername}</span>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              
              <div className="p-2.5 rounded-lg border border-border/40 bg-muted/30 flex items-center justify-between text-sm">
                <div className="flex items-center gap-3 min-w-0">
                  <AtSign className="w-4 h-4 text-muted-foreground" />
                  <div className="truncate">
                    <span className="font-medium text-foreground truncate block">{email || "Not provided"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* SECTION 1: Skills & Competencies */}
          <section className="bg-card rounded-xl border border-border/60 p-5 space-y-4 shadow-sm">
            <div className="pb-3 border-b border-border/40">
              <h2 className="text-sm font-semibold text-foreground">Skills & Competencies</h2>
              <p className="text-xs text-muted-foreground mt-1">Self-assessed and platform-verified technical skills</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {technicalSkills.length > 0 ? (
                technicalSkills.map((skill, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">{skill.name}</span>
                      <span className="text-xs font-medium text-muted-foreground">{skill.score}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${skill.score}%` }}></div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-muted-foreground col-span-2 py-6 text-center border border-dashed border-border/60 rounded-xl">
                  No technical skills added yet.
                </div>
              )}
            </div>
          </section>

          {/* SECTION 2: Certifications */}
          <section className="bg-card rounded-xl border border-border/60 p-5 space-y-4 shadow-sm">
            <div className="pb-3 border-b border-border/40">
              <h2 className="text-sm font-semibold text-foreground">Certifications & Achievements</h2>
              <p className="text-xs text-muted-foreground mt-1">Credentials earned and verified</p>
            </div>
            
            <div className="space-y-3">
              {credentials?.length === 0 ? (
                <div className="text-center py-6 text-sm text-muted-foreground border border-dashed rounded-xl border-border/60">
                  No credentials found.
                </div>
              ) : (
                credentials?.map((cred) => (
                  <div key={cred.id} className="p-4 rounded-xl border border-border/40 bg-muted/20 hover:bg-muted/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Medal className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold text-foreground">{cred.name || 'Credential'}</h4>
                        <p className="text-sm text-muted-foreground">Issued by {cred.issuer}</p>
                        <p className="text-xs text-muted-foreground pt-1">
                          Issued: {new Date(cred.issued_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    {cred.credential_url && (
                      <a href={cred.credential_url} target="_blank" rel="noopener noreferrer" className="self-end sm:self-center px-4 py-2 rounded-lg bg-background border border-border/60 hover:bg-muted text-foreground text-sm font-medium transition-colors flex items-center gap-2 shrink-0 shadow-sm active:scale-95">
                        <span>View Certificate</span>
                        <ExternalLink className="w-4 h-4 text-muted-foreground" />
                      </a>
                    )}
                  </div>
                ))
              )}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
