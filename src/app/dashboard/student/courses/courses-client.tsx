"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  BookOpen, 
  Search, 
  Filter, 
  PlayCircle,
  Clock,
  Star,
  Award,
  ChevronRight,
  TrendingUp,
  Bookmark
} from "lucide-react";

export function CoursesClient({ courses, studentCourses, skillGaps }: any) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredCourses = courses.filter((course: any) => {
    // Search filter
    if (searchQuery && !course.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !course.provider.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Tab filter
    if (activeTab === "certifications" && course.type !== "certification") return false;
    if (activeTab === "university" && course.type !== "course") return false;
    if (activeTab === "oer" && course.type !== "oer") return false;
    
    return true;
  });

  return (
    <div className="flex flex-col gap-8 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-foreground flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-primary" />
            Learning Hub
          </h1>
          <p className="text-sm text-muted-foreground mt-2 max-w-xl">
            Access world-class certifications, university courses, and open educational resources mapped directly to your skill gaps.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-9 pr-4 text-sm bg-card border border-border/80 rounded-lg placeholder:text-muted-foreground text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all shadow-sm"
            />
          </div>
          <button className="h-10 w-10 flex items-center justify-center bg-card border border-border/80 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors shadow-sm shrink-0">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Continue Learning Strip */}
      {studentCourses.length > 0 && (
        <div className="bg-card border border-border/60 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          
          <div className="flex items-center gap-5 w-full md:w-auto relative z-10">
            <div className="w-16 h-16 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0">
              <BookOpen className="w-8 h-8 text-blue-500" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1">Continue Learning</p>
              <h3 className="text-lg font-bold text-foreground">{studentCourses[0].courses.title}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{studentCourses[0].courses.provider}</p>
              
              <div className="flex items-center gap-3 mt-3">
                <div className="h-1.5 w-48 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${studentCourses[0].progress}%` }}></div>
                </div>
                <span className="text-xs font-semibold text-foreground">{studentCourses[0].progress}%</span>
              </div>
            </div>
          </div>

          <button className="w-full md:w-auto inline-flex items-center justify-center gap-2 h-10 px-6 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow hover:bg-primary/90 transition-all relative z-10 whitespace-nowrap">
            <PlayCircle className="w-4 h-4" />
            Resume Course
          </button>
        </div>
      )}

      {/* Course Catalog */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-border/40 pb-px">
          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar">
            {['all', 'certifications', 'university', 'oer'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap capitalize ${activeTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
              >
                {tab === 'oer' ? 'OER Materials' : tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course: any) => (
            <div key={course.id} className="group flex flex-col bg-card border border-border/60 rounded-2xl overflow-hidden hover:border-border hover:shadow-lg transition-all duration-300">
              
              {/* Thumbnail */}
              <div className={`h-36 ${course.image_url || 'bg-muted'} relative p-4 flex flex-col justify-between border-b border-border/40`}>
                <div className="flex justify-between items-start">
                  <span className="bg-background/80 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-foreground capitalize shadow-sm">
                    {course.type}
                  </span>
                  <button className="text-muted-foreground hover:text-foreground p-1 bg-background/50 backdrop-blur-md rounded-full transition-colors">
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex items-center gap-2">
                  <Award className="w-6 h-6 text-foreground/80 opacity-50" />
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  {(course.tags || []).map((tag: string) => (
                    <span key={tag} className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-base font-bold text-foreground leading-tight mb-1 group-hover:text-primary transition-colors line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-xs font-medium text-muted-foreground mb-4">
                  {course.provider}
                </p>

                <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground mb-4 mt-auto">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{course.rating}</span>
                    <span className="text-muted-foreground">({course.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border/40 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <span className="text-xs font-semibold text-foreground">View Details</span>
                  </div>
                  <button className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filteredCourses.length === 0 && (
            <div className="col-span-full py-12 text-center text-muted-foreground">
              No courses found matching your criteria.
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
