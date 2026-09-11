"use client";

import { 
  Clock,
  Search,
  ArrowUpDown,
  ChevronDown,
  CheckCircle2,
  ArrowRight,
  Lock,
  Download
} from "lucide-react";

import { useState, useMemo } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function AssessmentsClient({ assessments = [] }: { assessments?: any[] }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("urgency");

  // Filter and Search Logic
  const filteredAssessments = useMemo(() => {
    return assessments.filter(a => {
      const matchesSearch = a.assessment_templates?.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            a.assessment_templates?.description?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFilter = activeFilter === "all" || a.assessment_type?.toLowerCase() === activeFilter;

      return matchesSearch && matchesFilter;
    }).sort((a, b) => {
      if (sortBy === "urgency") {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      } else if (sortBy === "highest_weightage") {
        return (b.overall_score || 0) - (a.overall_score || 0); // Mock sort
      } else {
        return (b.overall_score || 0) - (a.overall_score || 0);
      }
    });
  }, [assessments, searchQuery, activeFilter, sortBy]);

  const completedAssessments = filteredAssessments.filter(a => a.completed_at);
  const pendingAssessments = filteredAssessments.filter(a => !a.completed_at);
  const averageScore = completedAssessments.length > 0 
    ? Math.round(completedAssessments.reduce((acc, curr) => acc + (curr.overall_score || 0), 0) / completedAssessments.length)
    : 0;

  const handleStartQuiz = (id: string) => {
    toast.info("Initializing assessment environment...", {
      description: "Please ensure your camera and microphone are connected."
    });
    // Normally would redirect: router.push(`/dashboard/student/assessments/${id}`)
    setTimeout(() => {
      toast.error("Quiz module not found in this prototype.");
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-6 py-7 px-4 sm:px-6 lg:px-8">
      {/* Page Header Section */}
      <section className="bg-card rounded-2xl border border-border/80 shadow-sm p-6 sm:p-7 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          {/* Title & Context */}
          <div className="max-w-2xl flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              ASSIGNMENTS & ASSESSMENTS
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight font-display mt-1">
              Skill Assessments
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1 max-w-2xl leading-relaxed">
              Standardized evaluations and adaptive technical quizzes to benchmark your skills.
            </p>
          </div>
          {/* Right Summary Stats Block */}
          <div className="grid grid-cols-3 gap-3 self-stretch lg:self-auto shrink-0">
            {/* Stat 1 */}
            <div className="bg-background border border-border/80 rounded-xl px-4 py-3 flex flex-col justify-between min-w-[130px]">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Pending</span>
              <div className="flex items-baseline gap-1 my-1">
                <span className="text-xl font-bold font-display text-foreground">{pendingAssessments.length}</span>
                <span className="text-[11px] font-semibold text-emerald-600">Tasks</span>
              </div>
              <span className="text-[11px] text-muted-foreground font-medium">To be completed</span>
            </div>
            {/* Stat 2 */}
            <div className="bg-background border border-border/80 rounded-xl px-4 py-3 flex flex-col justify-between min-w-[130px]">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Average Score</span>
              <div className="flex items-baseline gap-1 my-1">
                <span className="text-xl font-bold font-display text-emerald-600">{averageScore}%</span>
                <span className="text-[11px] font-semibold text-muted-foreground">Score</span>
              </div>
              <span className="text-[11px] text-muted-foreground font-medium truncate">Overall performance</span>
            </div>
            {/* Stat 3 */}
            <div className="bg-background border border-border/80 rounded-xl px-4 py-3 flex flex-col justify-between min-w-[130px]">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Completed</span>
              <div className="flex items-baseline gap-1 my-1">
                <span className="text-xl font-bold font-display text-primary">{completedAssessments.length}</span>
                <span className="text-[11px] font-semibold text-primary">Done</span>
              </div>
              <span className="text-[11px] text-muted-foreground font-medium">All tasks</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Segmentation Controller */}
      <section className="bg-card rounded-xl border border-border/80 shadow-sm p-3.5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Filter pill buttons on left */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <button 
            onClick={() => setActiveFilter("all")}
            className={`px-3.5 py-1.5 rounded-lg font-semibold text-xs whitespace-nowrap transition-colors ${activeFilter === "all" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
          >
            All Assessments ({assessments.length})
          </button>
          <button 
            onClick={() => setActiveFilter("technical")}
            className={`px-3.5 py-1.5 rounded-lg font-semibold text-xs whitespace-nowrap transition-colors ${activeFilter === "technical" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
          >
            Coding ({assessments.filter(a => a.assessment_type?.toLowerCase() === "technical").length})
          </button>
          <button 
            onClick={() => setActiveFilter("aptitude")}
            className={`px-3.5 py-1.5 rounded-lg font-semibold text-xs whitespace-nowrap transition-colors ${activeFilter === "aptitude" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
          >
            Adaptive Quizzes ({assessments.filter(a => a.assessment_type?.toLowerCase() === "aptitude").length})
          </button>
          <button 
            onClick={() => setActiveFilter("behavioral")}
            className={`px-3.5 py-1.5 rounded-lg font-semibold text-xs whitespace-nowrap transition-colors ${activeFilter === "behavioral" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
          >
            Behavioral ({assessments.filter(a => a.assessment_type?.toLowerCase() === "behavioral").length})
          </button>
        </div>
        {/* Search & sort controls on right */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative w-full sm:w-60">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-8 pl-8 pr-3 bg-background border border-border/80 rounded-lg text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" 
              placeholder="Search evaluations..." 
              type="text" 
            />
          </div>
          <div className="relative flex items-center">
            <ArrowUpDown className="absolute left-2.5 w-4 h-4 text-muted-foreground pointer-events-none" />
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-8 pl-8 pr-8 bg-background hover:bg-muted border border-border/80 text-foreground font-semibold text-xs rounded-lg appearance-none cursor-pointer focus:outline-none transition-colors"
            >
              <option value="urgency">Sort: Urgency / Due Date</option>
              <option value="highest_weightage">Sort: Highest Weightage</option>
              <option value="percentile">Sort: Percentile (High to Low)</option>
            </select>
            <ChevronDown className="absolute right-2.5 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Immediate Action Required (Due Soon) Section */}
      <section className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
            <h2 className="text-base sm:text-lg font-bold text-foreground font-display">Action Required (Due Soon)</h2>
            <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/20 text-xs font-bold">{pendingAssessments.length} Pending</span>
          </div>
          <span className="text-xs text-muted-foreground font-medium">Please complete before the deadline</span>
        </div>
        
        {/* 2 Modern Rich Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {pendingAssessments.length === 0 ? (
            <div className="lg:col-span-2 text-sm text-muted-foreground py-8 text-center bg-card rounded-2xl border border-border/80">
              No pending assessments right now. You're all caught up!
            </div>
          ) : pendingAssessments.map(assessment => (
            <article key={assessment.id} className="bg-card rounded-2xl p-6 border border-border/80 hover:border-border shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                {/* Badges */}
                <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-semibold border border-primary/20 capitalize">
                      {assessment.assessment_type || 'General'}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-muted text-foreground/80 text-xs font-medium">
                      ⏱ {assessment.assessment_templates?.duration_minutes || 45} mins
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-600 font-medium text-xs border border-rose-500/20 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Due soon
                  </span>
                </div>
                {/* Title & Context */}
                <h3 className="text-lg font-bold font-display text-foreground group-hover:text-primary transition-colors leading-snug">
                  {assessment.assessment_templates?.title || 'Unknown Assessment'}
                </h3>
                <p className="text-xs text-muted-foreground mt-1 font-normal">
                  {assessment.assessment_templates?.description || 'Complete this evaluation to verify your skills.'}
                </p>
              </div>
              {/* Bottom Bar */}
              <div className="pt-4 mt-4 border-t border-border/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                  <Lock className="w-4 h-4 text-primary" />
                  <span>Proctored Session</span>
                </div>
                <button 
                  onClick={() => handleStartQuiz(assessment.id)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-sm transition-all shrink-0 active:scale-95"
                >
                  <span>Start Quiz</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Completed & Verified Evaluations Section */}
      <section className="flex flex-col gap-4 mt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <h2 className="text-base sm:text-lg font-bold text-foreground font-display">Completed Assessments</h2>
          </div>
          <button className="text-primary hover:text-primary/80 text-xs font-semibold flex items-center gap-1.5 transition-colors" type="button">
            <span>Download Report (PDF)</span>
            <Download className="w-4 h-4" />
          </button>
        </div>

        {/* Data Table Card */}
        <div className="bg-card rounded-xl border border-border/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-muted/50 border-b border-border/80 text-muted-foreground font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-6" scope="col">Assessment Title</th>
                  <th className="py-3.5 px-4" scope="col">Type</th>
                  <th className="py-3.5 px-4" scope="col">Score</th>
                  <th className="py-3.5 px-4" scope="col">Completed Date</th>
                  <th className="py-3.5 px-6 text-right" scope="col">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {completedAssessments.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-muted-foreground text-sm">
                      No completed assessments yet.
                    </td>
                  </tr>
                ) : completedAssessments.map(assessment => (
                  <tr key={assessment.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3.5">
                        <div className="w-9 h-9 rounded-lg bg-muted text-foreground/80 border border-border/80 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-foreground text-xs">{assessment.assessment_templates?.title || 'Unknown Assessment'}</span>
                          <span className="text-[11px] text-muted-foreground mt-0.5">{assessment.assessment_templates?.description || 'Evaluation'}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-md bg-muted text-foreground/80 font-medium text-[11px] capitalize">
                        {assessment.assessment_type || 'General'}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-foreground text-xs">{assessment.overall_score || 0} / 100</span>
                        <span className="text-[11px] font-semibold text-muted-foreground">Score</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground text-xs font-mono">
                      {new Date(assessment.completed_at).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button className="text-primary hover:text-primary/80 font-semibold text-xs inline-flex items-center gap-1 transition-colors">
                        <span>View Results</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
