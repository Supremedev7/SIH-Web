"use client";

import { FileText, UploadCloud, CheckCircle2, MoreVertical, Search, File, AlertCircle, Loader2, Trash2 } from "lucide-react";
import { useState, useRef, useTransition } from "react";
import { uploadResume, deleteResume } from "@/lib/actions/resumeActions";
import { toast } from "sonner";

export function ResumeClient({ resumes = [] }: { resumes?: any[] }) {
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File is too large (max 5MB)");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    startTransition(async () => {
      toast.loading("Uploading resume...", { id: "resume-upload" });
      const result = await uploadResume(formData);
      if (result.error) {
        toast.error(result.error, { id: "resume-upload" });
      } else {
        toast.success("Resume uploaded successfully!", { id: "resume-upload" });
      }
    });
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      toast.loading("Deleting resume...", { id: "resume-delete" });
      const result = await deleteResume(id);
      if (result.error) {
        toast.error(result.error, { id: "resume-delete" });
      } else {
        toast.success("Resume deleted.", { id: "resume-delete" });
      }
    });
  };
  return (
    <div className="flex flex-col gap-8 py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black tracking-tight text-foreground flex items-center gap-3">
          <FileText className="w-8 h-8 text-primary" />
          Resume Manager
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          Upload your latest CVs. Our AI will parse them to update your Skill Map and recommend relevant opportunities.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content - Left Side */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Upload Zone */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="bg-card border-2 border-dashed border-border/60 hover:border-primary/50 transition-colors rounded-2xl p-10 flex flex-col items-center justify-center text-center cursor-pointer group"
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileChange}
            />
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              {isPending ? (
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              ) : (
                <UploadCloud className="w-8 h-8 text-primary" />
              )}
            </div>
            <h3 className="text-lg font-bold text-foreground">Click to upload or drag and drop</h3>
            <p className="text-sm text-muted-foreground mt-2 max-w-sm">
              PDF, DOCX, or TXT up to 5MB. AI will automatically extract your skills, experience, and projects.
            </p>
            <button 
              disabled={isPending}
              className="mt-6 bg-primary text-primary-foreground px-6 py-2 rounded-lg text-sm font-semibold shadow-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              Browse Files
            </button>
          </div>

          {/* Resume List */}
          <div className="bg-card border border-border/60 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-border/40 flex items-center justify-between">
              <h3 className="font-bold text-foreground">Uploaded Documents</h3>
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <input type="text" placeholder="Search..." className="h-8 pl-8 pr-3 text-xs bg-muted/50 border border-border/60 rounded-md focus:outline-none focus:border-primary" />
              </div>
            </div>
            
            <div className="divide-y divide-border/40">
              {resumes.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  No resumes uploaded yet. Upload your first resume above.
                </div>
              ) : (
                resumes.map((resume) => (
                  <div key={resume.id} className="p-4 flex items-center gap-4 hover:bg-muted/20 transition-colors">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${resume.status === 'active' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                      <File className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-semibold text-foreground truncate">{resume.name}</h4>
                        {resume.status === 'active' && (
                          <span className="bg-emerald-500/10 text-emerald-500 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Default
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                        <span>{resume.size}</span>
                        <span>•</span>
                        <span>Uploaded {resume.date}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <div className="flex items-center gap-1.5 bg-blue-500/10 px-2 py-1 rounded text-blue-500">
                        <span className="text-xs font-bold">ATS Score:</span>
                        <span className="text-sm font-black">{resume.score}</span>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => handleDelete(resume.id)}
                      disabled={isPending}
                      className="p-2 text-red-500 hover:text-red-600 rounded-md hover:bg-red-500/10 ml-2 transition-colors disabled:opacity-50"
                      title="Delete Resume"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar - AI Parsing Insights */}
        <div className="space-y-6">
          <div className="bg-card border border-border/60 rounded-2xl p-6 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full pointer-events-none" />
            
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">AI Resume Analysis</h3>
                <p className="text-xs text-muted-foreground">Based on your active resume</p>
              </div>
            </div>

            <div className="space-y-4 relative z-10">
              <div className="p-3 bg-muted/30 rounded-lg border border-border/40">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-semibold text-foreground">Action Verbs</span>
                  <span className="text-xs font-bold text-emerald-500">Excellent</span>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">You've started 90% of your bullet points with strong action verbs.</p>
              </div>

              <div className="p-3 bg-amber-500/5 rounded-lg border border-amber-500/20">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-semibold text-foreground">Quantifiable Results</span>
                  <span className="text-xs font-bold text-amber-500">Needs Work</span>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">Only 20% of your experience bullets include metrics. Try adding numbers to show impact.</p>
              </div>

              <div className="p-3 bg-muted/30 rounded-lg border border-border/40">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-semibold text-foreground">Formatting</span>
                  <span className="text-xs font-bold text-emerald-500">ATS Friendly</span>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">Your layout is perfectly readable by automated tracking systems.</p>
              </div>
            </div>

            <button className="w-full mt-6 bg-muted hover:bg-muted/80 text-foreground text-sm font-semibold py-2.5 rounded-lg transition-colors border border-border/60">
              View Detailed Report
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
