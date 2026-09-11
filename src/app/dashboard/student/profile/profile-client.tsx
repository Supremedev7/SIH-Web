"use client";

import { User, Mail, Phone, MapPin, GraduationCap, Code2, Link as LinkIcon, Save, Loader2, AlertCircle } from "lucide-react";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { profileSchema, type ProfileFormData } from "@/lib/validators/profile";
import type { ProfilePageProps } from "@/types/student-portal";

export function ProfileClient({ profile, email }: ProfilePageProps) {
  const router = useRouter();
  const metadata = (profile?.metadata as Record<string, string>) || {};
  
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ProfileFormData, string>>>({});
  
  const [formData, setFormData] = useState<ProfileFormData>({
    full_name: profile?.full_name || "",
    bio: profile?.bio || "",
    phone: metadata.phone || "",
    location: metadata.location || "",
    graduation_year: metadata.graduation_year || "",
    linkedin: metadata.linkedin || "",
    github: metadata.github || "",
    portfolio: metadata.portfolio || "",
  });

  const initials = formData.full_name ? formData.full_name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase() : "U";

  const completenessScore = useMemo(() => {
    let score = 0;
    let total = 0;
    
    // Core fields
    total += 3;
    if (formData.full_name.trim().length > 0) score++;
    if (email) score++;
    if (profile?.institutions?.name) score++;
    
    // Optional/metadata fields
    const optionalFields = ['bio', 'phone', 'location', 'graduation_year', 'linkedin', 'github', 'portfolio'] as const;
    total += optionalFields.length;
    
    for (const field of optionalFields) {
      if (formData[field] && formData[field]!.trim().length > 0) {
        score++;
      }
    }
    
    return Math.round((score / total) * 100);
  }, [formData, email, profile]);

  const handleSave = async () => {
    try {
      setErrors({});
      
      // Zod Validation
      const result = profileSchema.safeParse(formData);
      if (!result.success) {
        const newErrors: Partial<Record<keyof ProfileFormData, string>> = {};
        for (const err of result.error.issues) {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof ProfileFormData] = err.message;
          }
        }
        setErrors(newErrors);
        toast.error("Please fix the errors in the form.");
        return;
      }

      setIsSaving(true);
      const res = await fetch('/api/student/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(result.data),
      });

      if (!res.ok) throw new Error("Failed to save profile");

      toast.success("Profile saved successfully");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while saving");
    } finally {
      setIsSaving(false);
    }
  };

  const getError = (field: keyof ProfileFormData) => errors[field];

  return (
    <div className="flex flex-col gap-8 py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      
      {/* Header & Completeness */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-foreground flex items-center gap-3">
            <User className="w-8 h-8 text-primary" />
            Full Details
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Keep your professional and academic information up to date to get better opportunities.
          </p>
        </div>
        
        <div className="bg-card border border-border/60 rounded-xl p-4 min-w-[240px] shadow-sm">
          <div className="flex justify-between items-end mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Profile Completeness</span>
            <span className="text-lg font-bold font-mono text-primary">{completenessScore}%</span>
          </div>
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-1000 ease-out rounded-full" 
              style={{ width: `${completenessScore}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        
        {/* Personal Details Section */}
        <section className="bg-card border border-border/60 rounded-2xl p-6 md:p-8 shadow-sm">
          <h2 className="text-lg font-bold text-foreground mb-6">Personal Details</h2>
          
          <div className="flex flex-col md:flex-row gap-8 items-start">
            
            {/* Avatar */}
            <div className="flex flex-col items-center gap-3 shrink-0">
              <div className="w-24 h-24 rounded-full bg-primary/10 text-primary flex items-center justify-center text-2xl font-bold font-mono border-2 border-primary/20">
                {initials}
              </div>
              <button className="text-xs font-semibold text-primary hover:underline bg-primary/10 px-3 py-1.5 rounded-md">
                Change Photo
              </button>
            </div>

            {/* Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 flex-1 w-full">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex justify-between">
                  Full Name <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input 
                    type="text" 
                    value={formData.full_name} 
                    onChange={e => setFormData({ ...formData, full_name: e.target.value })}
                    className={`w-full h-10 pl-9 pr-3 text-sm bg-muted/50 border ${getError('full_name') ? 'border-destructive' : 'border-border/60'} rounded-lg focus:outline-none focus:border-primary transition-colors`}
                  />
                </div>
                {getError('full_name') && <p className="text-[10px] text-destructive flex items-center gap-1"><AlertCircle className="w-3 h-3"/>{getError('full_name')}</p>}
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type="email" value={email || ""} disabled className="w-full h-10 pl-9 pr-3 text-sm bg-muted border border-border/60 rounded-lg opacity-70 cursor-not-allowed" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Phone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input 
                    type="tel" 
                    value={formData.phone || ""}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full h-10 pl-9 pr-3 text-sm bg-muted/50 border ${getError('phone') ? 'border-destructive' : 'border-border/60'} rounded-lg focus:outline-none focus:border-primary transition-colors`}
                  />
                </div>
                {getError('phone') && <p className="text-[10px] text-destructive flex items-center gap-1"><AlertCircle className="w-3 h-3"/>{getError('phone')}</p>}
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input 
                    type="text" 
                    value={formData.location || ""}
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                    className={`w-full h-10 pl-9 pr-3 text-sm bg-muted/50 border ${getError('location') ? 'border-destructive' : 'border-border/60'} rounded-lg focus:outline-none focus:border-primary transition-colors`}
                  />
                </div>
                {getError('location') && <p className="text-[10px] text-destructive flex items-center gap-1"><AlertCircle className="w-3 h-3"/>{getError('location')}</p>}
              </div>
              
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Professional Bio</label>
                <textarea 
                  rows={4}
                  value={formData.bio || ""}
                  onChange={e => setFormData({ ...formData, bio: e.target.value })}
                  className={`w-full p-3 text-sm bg-muted/50 border ${getError('bio') ? 'border-destructive' : 'border-border/60'} rounded-lg focus:outline-none focus:border-primary transition-colors resize-y`}
                />
                {getError('bio') && <p className="text-[10px] text-destructive flex items-center gap-1"><AlertCircle className="w-3 h-3"/>{getError('bio')}</p>}
              </div>
            </div>
          </div>
        </section>

        {/* Academic Details Section */}
        <section className="bg-card border border-border/60 rounded-2xl p-6 md:p-8 shadow-sm">
          <h2 className="text-lg font-bold text-foreground mb-6">Academic Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">University / Institution</label>
              <div className="relative">
                <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="text" value={profile?.institutions?.name || "Not Enrolled"} disabled className="w-full h-10 pl-9 pr-3 text-sm bg-muted border border-border/60 rounded-lg opacity-70 cursor-not-allowed" />
              </div>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Degree</label>
              <input type="text" value={metadata.degree || ""} disabled className="w-full h-10 px-3 text-sm bg-muted border border-border/60 rounded-lg opacity-70 cursor-not-allowed" />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Major / Specialization</label>
              <input type="text" value={profile?.department || ""} disabled className="w-full h-10 px-3 text-sm bg-muted border border-border/60 rounded-lg opacity-70 cursor-not-allowed" />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Expected Graduation</label>
              <input 
                type="text" 
                value={formData.graduation_year || ""} 
                onChange={e => setFormData({ ...formData, graduation_year: e.target.value })}
                placeholder="e.g. 2027"
                className={`w-full h-10 px-3 text-sm bg-muted/50 border ${getError('graduation_year') ? 'border-destructive' : 'border-border/60'} rounded-lg focus:outline-none focus:border-primary transition-colors`}
              />
              {getError('graduation_year') && <p className="text-[10px] text-destructive flex items-center gap-1"><AlertCircle className="w-3 h-3"/>{getError('graduation_year')}</p>}
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">CGPA</label>
              <input type="text" value={metadata.cgpa || ""} disabled className="w-full h-10 px-3 text-sm bg-muted border border-border/60 rounded-lg opacity-70 cursor-not-allowed" />
            </div>
          </div>
        </section>

        {/* Links & Socials */}
        <section className="bg-card border border-border/60 rounded-2xl p-6 md:p-8 shadow-sm">
          <h2 className="text-lg font-bold text-foreground mb-6">Links & Portfolios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">LinkedIn</label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type="url" 
                  value={formData.linkedin || ""}
                  onChange={e => setFormData({ ...formData, linkedin: e.target.value })}
                  placeholder="https://linkedin.com/in/..."
                  className={`w-full h-10 pl-9 pr-3 text-sm bg-muted/50 border ${getError('linkedin') ? 'border-destructive' : 'border-border/60'} rounded-lg focus:outline-none focus:border-primary transition-colors`}
                />
              </div>
              {getError('linkedin') && <p className="text-[10px] text-destructive flex items-center gap-1"><AlertCircle className="w-3 h-3"/>{getError('linkedin')}</p>}
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">GitHub</label>
              <div className="relative">
                <Code2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type="url" 
                  value={formData.github || ""}
                  onChange={e => setFormData({ ...formData, github: e.target.value })}
                  placeholder="https://github.com/..."
                  className={`w-full h-10 pl-9 pr-3 text-sm bg-muted/50 border ${getError('github') ? 'border-destructive' : 'border-border/60'} rounded-lg focus:outline-none focus:border-primary transition-colors`}
                />
              </div>
              {getError('github') && <p className="text-[10px] text-destructive flex items-center gap-1"><AlertCircle className="w-3 h-3"/>{getError('github')}</p>}
            </div>
            
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Personal Website</label>
              <input 
                type="url" 
                value={formData.portfolio || ""} 
                onChange={e => setFormData({ ...formData, portfolio: e.target.value })}
                placeholder="https://your-portfolio.com" 
                className={`w-full h-10 px-3 text-sm bg-muted/50 border ${getError('portfolio') ? 'border-destructive' : 'border-border/60'} rounded-lg focus:outline-none focus:border-primary transition-colors`}
              />
              {getError('portfolio') && <p className="text-[10px] text-destructive flex items-center gap-1"><AlertCircle className="w-3 h-3"/>{getError('portfolio')}</p>}
            </div>
          </div>
        </section>

        {/* Action Bar */}
        <div className="flex justify-end pt-4">
          <button 
            disabled={isSaving}
            onClick={handleSave}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {isSaving ? 'Saving...' : 'Save Profile'}
          </button>
        </div>
      </div>
    </div>
  );
}
