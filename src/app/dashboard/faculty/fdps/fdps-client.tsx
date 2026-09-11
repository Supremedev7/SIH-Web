"use client";

import { useState } from "react";
import {
  BookOpen,
  Search,
  Filter,
  GraduationCap,
  Award,
  PlayCircle,
  Download,
  Calendar,
  Clock,
  CheckCircle2,
  TrendingUp,
  Star
} from "lucide-react";

export function FDPsClient({ fdps, enrollments }: { fdps: any[], enrollments: any[] }) {
  const [activeTab, setActiveTab] = useState<'catalog' | 'learning'>('catalog');
  
  // Combine FDPs with enrollment status
  const programs = fdps.map(fdp => {
    const enrollment = enrollments.find(e => e.fdp_id === fdp.id);
    return {
      ...fdp,
      duration: `${fdp.duration_hours} Hours`,
      enrolled: !!enrollment,
      progress: enrollment?.progress_percentage || 0,
      status: enrollment?.status || null,
      image: fdp.image_url || "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=400"
    };
  });

  return (
    <div className="flex flex-col gap-6 relative h-full">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Faculty Development Programs</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Discover and enroll in industry-sponsored FDPs to enhance your teaching and research skills.
          </p>
        </div>
      </div>

      {/* Tabs & Search Area */}
      <div className="bg-card border border-border/40 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 p-4">
        
        <div className="flex items-center gap-2 bg-muted/30 p-1 rounded-xl w-fit border border-border/40">
          <button 
            onClick={() => setActiveTab('catalog')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'catalog' 
                ? 'bg-background shadow-sm text-foreground border border-border/60' 
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent'
            }`}
          >
            Program Catalog
          </button>
          <button 
            onClick={() => setActiveTab('learning')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'learning' 
                ? 'bg-background shadow-sm text-foreground border border-border/60' 
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent'
            }`}
          >
            My Learning Path
          </button>
        </div>

        {activeTab === 'catalog' && (
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search FDPs by domain or sponsor..." 
                className="w-full pl-9 pr-4 py-2 bg-background border border-border/60 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
              />
            </div>
            <button className="p-2 rounded-xl border border-border/60 bg-background text-muted-foreground hover:bg-muted transition-colors shadow-sm shrink-0">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      {activeTab === 'catalog' ? (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4">
          
          {/* AI Recommended Section */}
          <div>
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" /> Recommended for You
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {programs.filter(fdp => !fdp.enrolled).map((fdp) => (
                <div key={fdp.id} className="bg-card border border-border/40 rounded-2xl shadow-sm overflow-hidden group hover:border-primary/50 transition-all flex flex-col hover:shadow-md cursor-pointer">
                  <div className="relative h-40 overflow-hidden">
                    <img src={fdp.image} alt={fdp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-background/90 backdrop-blur-sm text-foreground text-xs font-bold shadow-sm">
                      {fdp.domain}
                    </div>
                  </div>
                  <div className="p-5 flex flex-col gap-4 flex-1">
                    <div className="flex flex-col gap-1">
                      <h3 className="text-lg font-bold text-foreground leading-tight group-hover:text-primary transition-colors">{fdp.title}</h3>
                      <span className="text-sm font-semibold text-muted-foreground">Sponsored by {fdp.sponsor}</span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs font-semibold text-muted-foreground mt-auto pt-4 border-t border-border/40">
                      <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {fdp.duration}</span>
                      <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-amber-500 fill-amber-500" /> {fdp.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full h-px bg-border/40 my-2"></div>

          {/* All Programs Categories */}
          <div>
            <h2 className="text-lg font-bold text-foreground mb-4">Browse by Domain</h2>
            <div className="flex flex-wrap items-center gap-3">
              {['All Domains', 'AI/ML', 'Manufacturing', 'Pedagogy', 'Computer Science', 'Data Science', 'Electronics'].map((domain, i) => (
                <button 
                  key={i} 
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
                    i === 0 
                      ? 'bg-primary text-primary-foreground border-transparent shadow-sm' 
                      : 'bg-background text-foreground border-border/60 hover:border-primary hover:text-primary'
                  }`}
                >
                  {domain}
                </button>
              ))}
            </div>
          </div>

        </div>
      ) : (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* In Progress FDPs */}
            <div className="flex flex-col gap-4">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <PlayCircle className="w-5 h-5 text-blue-500" /> In Progress
              </h2>
              
              {programs.filter(f => f.enrolled && (f.status === 'in_progress' || f.status === 'enrolled')).map((fdp) => (
                <div key={fdp.id} className="bg-card border border-border/40 rounded-2xl shadow-sm p-5 flex flex-col gap-4">
                  <div className="flex gap-4">
                    <img src={fdp.image} alt={fdp.title} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                    <div className="flex flex-col gap-1 flex-1 min-w-0">
                      <h3 className="text-base font-bold text-foreground truncate">{fdp.title}</h3>
                      <span className="text-xs font-semibold text-muted-foreground">{fdp.sponsor}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 p-3 bg-muted/30 rounded-xl border border-border/40">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-muted-foreground">Course Progress</span>
                      <span className="text-primary">{fdp.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${fdp.progress}%` }}></div>
                    </div>
                  </div>
                  
                  <button className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold shadow-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                    <PlayCircle className="w-4 h-4" /> Continue Learning
                  </button>
                </div>
              ))}
            </div>

            {/* Completed FDPs */}
            <div className="flex flex-col gap-4">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-500" /> Completed Programs
              </h2>
              
              {programs.filter(f => f.enrolled && f.status === 'completed').map((fdp) => (
                <div key={fdp.id} className="bg-card border border-border/40 rounded-2xl shadow-sm p-5 flex flex-col gap-4">
                  <div className="flex gap-4">
                    <div className="relative">
                      <img src={fdp.image} alt={fdp.title} className="w-16 h-16 rounded-xl object-cover shrink-0 opacity-70 grayscale" />
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-card text-white">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 flex-1 min-w-0">
                      <h3 className="text-base font-bold text-foreground truncate">{fdp.title}</h3>
                      <span className="text-xs font-semibold text-muted-foreground">{fdp.sponsor}</span>
                    </div>
                  </div>
                  
                  <button className="w-full py-2.5 rounded-xl bg-background border border-border/60 text-foreground text-sm font-bold shadow-sm hover:bg-muted transition-colors flex items-center justify-center gap-2 mt-auto">
                    <Download className="w-4 h-4" /> Download Certificate
                  </button>
                </div>
              ))}
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
