"use client";

import { useState } from "react";
import {
  FlaskConical,
  Coins,
  Users,
  Search,
  Filter,
  ArrowRight,
  Bookmark,
  FileText,
  UploadCloud,
  MessageSquare,
  Building2,
  FolderOpen,
  Plus
} from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { proposeResearchWorkspace } from "@/lib/actions/collaborationActions";

function CreateWorkspaceModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "proposed"
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-card w-full max-w-lg rounded-2xl p-6 flex flex-col gap-4 border border-border/40 shadow-xl">
        <h2 className="text-xl font-bold text-foreground">Propose New Research Workspace</h2>
        
        <input 
          className="px-3 py-2.5 rounded-lg bg-background border border-border/40 text-sm focus:outline-none focus:ring-1 focus:ring-primary" 
          placeholder="Workspace Title" 
          value={formData.title}
          onChange={e => setFormData({...formData, title: e.target.value})}
        />
        
        <textarea 
          className="px-3 py-2.5 rounded-lg bg-background border border-border/40 text-sm focus:outline-none focus:ring-1 focus:ring-primary min-h-[100px]" 
          placeholder="Brief description of the research goals..." 
          value={formData.description}
          onChange={e => setFormData({...formData, description: e.target.value})}
        />
        
        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose} className="px-4 py-2 rounded-lg bg-muted text-foreground text-sm font-medium hover:bg-muted/80 transition-colors">Cancel</button>
          <button 
            disabled={isPending}
            onClick={() => {
              if (!formData.title) return toast.error("Title is required");
              startTransition(async () => {
                try {
                  await proposeResearchWorkspace(formData);
                  toast.success("Workspace proposed successfully!");
                  onClose();
                } catch (e: any) {
                  toast.error(e.message || "Failed to propose");
                }
              });
            }} 
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {isPending ? "Proposing..." : "Propose Workspace"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function ResearchClient({ initialProjects = [] }: { initialProjects?: any[] }) {
  const [activeTab, setActiveTab] = useState<'workspaces' | 'funding' | 'collaborators'>('workspaces');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // We should ideally have state for this, but just using the prop is fine for now
  const workspaces = initialProjects;

  return (
    <div className="flex flex-col gap-6 relative h-full">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Research & Innovation (R&D)</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Collaborate on joint industry-academia research, seek funding, and manage active projects.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-semibold transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            <span>New Workspace</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1 bg-muted/30 rounded-xl w-fit border border-border/40 overflow-x-auto">
        <button 
          onClick={() => setActiveTab('workspaces')}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'workspaces' 
              ? 'bg-background shadow-sm text-foreground border border-border/60' 
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent'
          }`}
        >
          Active Workspaces
        </button>
        <button 
          onClick={() => setActiveTab('funding')}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'funding' 
              ? 'bg-background shadow-sm text-foreground border border-border/60' 
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent'
          }`}
        >
          Funding & Grants
        </button>
        <button 
          onClick={() => setActiveTab('collaborators')}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'collaborators' 
              ? 'bg-background shadow-sm text-foreground border border-border/60' 
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent'
          }`}
        >
          Collaborator Search
        </button>
      </div>

      {/* Content Areas */}
      
      {activeTab === 'workspaces' && (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {workspaces.map((ws: any) => (
              <div key={ws.id} className="bg-card border border-border/40 rounded-2xl shadow-sm overflow-hidden flex flex-col group hover:border-primary/50 transition-colors">
                <div className="p-6 flex flex-col gap-4 border-b border-border/40 bg-muted/10">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                      <FlaskConical className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-widest border border-emerald-500/20">
                      {ws.status}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{ws.title}</h3>
                    <p className="text-sm font-semibold text-muted-foreground mt-1">
                      {ws.description}
                    </p>
                  </div>
                </div>
                
                <div className="p-6 grid grid-cols-2 gap-4">
                  <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-background border border-border/60 hover:bg-muted hover:border-primary/50 transition-all text-foreground font-bold shadow-sm">
                    <FolderOpen className="w-6 h-6 text-blue-500" />
                    <span className="text-sm">Datasets (0)</span>
                  </button>
                  <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-background border border-border/60 hover:bg-muted hover:border-primary/50 transition-all text-foreground font-bold shadow-sm">
                    <FileText className="w-6 h-6 text-amber-500" />
                    <span className="text-sm">Drafts (0)</span>
                  </button>
                  <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-background border border-border/60 hover:bg-muted hover:border-primary/50 transition-all text-foreground font-bold shadow-sm">
                    <Users className="w-6 h-6 text-purple-500" />
                    <span className="text-sm">Collaborators ({ws.collaborations?.[0]?.count || 0})</span>
                  </button>
                  <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-background border border-border/60 hover:bg-muted hover:border-primary/50 transition-all text-foreground font-bold shadow-sm">
                    <MessageSquare className="w-6 h-6 text-emerald-500" />
                    <span className="text-sm">Discussions</span>
                  </button>
                </div>
              </div>
            ))}

            {/* Workspace 2 (Empty state/New) */}
            <div 
              onClick={() => setIsModalOpen(true)}
              className="bg-card border border-border/40 border-dashed rounded-2xl shadow-sm flex flex-col items-center justify-center p-12 text-center opacity-70 hover:opacity-100 hover:border-primary/50 transition-all cursor-pointer">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4 text-muted-foreground">
                <Plus className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Create New Workspace</h3>
              <p className="text-sm font-semibold text-muted-foreground mt-2 max-w-xs">
                Start a new collaborative research project and invite academic or industry partners.
              </p>
            </div>

          </div>
        </div>
      )}

      {activeTab === 'funding' && (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center gap-4 bg-card border border-border/40 rounded-xl p-3 shadow-sm">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search grants, CSR funds, or sponsors..." 
                className="w-full pl-9 pr-4 py-2 bg-background border border-border/60 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
            <button className="p-2 rounded-lg border border-border/60 bg-background text-muted-foreground hover:bg-muted transition-colors shrink-0">
              <Filter className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="bg-card border border-border/40 rounded-2xl shadow-sm p-6 flex flex-col gap-4 group hover:border-primary/50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
                  <Coins className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-500 text-[10px] font-bold uppercase tracking-widest border border-amber-500/20">
                  Deadline: Oct 30
                </span>
              </div>
              
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">Green Energy CSR Fund</h3>
                <span className="text-sm font-semibold text-muted-foreground flex items-center gap-1.5"><Building2 className="w-4 h-4" /> Reliance Industries</span>
              </div>

              <div className="p-4 rounded-xl bg-muted/30 border border-border/40 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Max Funding</span>
                  <span className="text-lg font-bold text-foreground">₹20 Lakhs</span>
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Domain</span>
                  <span className="text-sm font-bold text-foreground">Renewables</span>
                </div>
              </div>

              <button className="w-full py-2.5 rounded-xl bg-background border border-border/60 text-foreground font-bold text-sm shadow-sm hover:bg-muted transition-colors flex items-center justify-center gap-2 mt-2">
                Apply for Grant <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-card border border-border/40 rounded-2xl shadow-sm p-6 flex flex-col gap-4 group hover:border-primary/50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <Coins className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-500 text-[10px] font-bold uppercase tracking-widest border border-amber-500/20">
                  Deadline: Nov 15
                </span>
              </div>
              
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">AI in Healthcare Research</h3>
                <span className="text-sm font-semibold text-muted-foreground flex items-center gap-1.5"><Building2 className="w-4 h-4" /> Apollo Hospitals R&D</span>
              </div>

              <div className="p-4 rounded-xl bg-muted/30 border border-border/40 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Max Funding</span>
                  <span className="text-lg font-bold text-foreground">₹15 Lakhs</span>
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Domain</span>
                  <span className="text-sm font-bold text-foreground">MedTech / AI</span>
                </div>
              </div>

              <button className="w-full py-2.5 rounded-xl bg-background border border-border/60 text-foreground font-bold text-sm shadow-sm hover:bg-muted transition-colors flex items-center justify-center gap-2 mt-2">
                Apply for Grant <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

      {activeTab === 'collaborators' && (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center gap-4 bg-card border border-border/40 rounded-xl p-3 shadow-sm">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search researchers by name, domain, or equipment..." 
                className="w-full pl-9 pr-4 py-2 bg-background border border-border/60 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
          </div>
          
          <div className="bg-card border border-border/40 rounded-2xl shadow-sm overflow-hidden p-12 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
              <Users className="w-10 h-10" />
            </div>
            <h3 className="text-lg font-bold text-foreground">Global Collaborator Directory</h3>
            <p className="text-sm font-semibold text-muted-foreground mt-2 max-w-md leading-relaxed">
              Find co-authors, request access to industry testing equipment, or join existing research groups. Use the search bar above to begin.
            </p>
          </div>
        </div>
      )}

      <CreateWorkspaceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
