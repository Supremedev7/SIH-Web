"use client";

import { 
  SlidersHorizontal,
  ChevronDown,
  X,
  MapPin,
  Briefcase,
  Coins,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useTransition, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { applyForJob } from "@/lib/actions/jobActions";
import { formatDistanceToNow } from "date-fns";
import type { OpportunitiesPageProps, JobListingData } from "@/types/student-portal";

function ApplyButton({ jobId, hasApplied }: { jobId: string; hasApplied: boolean }) {
  const [isPending, startTransition] = useTransition();

  if (hasApplied) {
    return (
      <button disabled className="w-full sm:w-auto px-4 py-2 rounded-lg bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 text-xs font-semibold cursor-not-allowed shrink-0">
        Applied
      </button>
    );
  }

  return (
    <button 
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          try {
            await applyForJob(jobId);
            toast.success("Successfully applied!");
          } catch (e: unknown) {
            const message = e instanceof Error ? e.message : "Failed to apply";
            toast.error(message);
          }
        });
      }}
      className="w-full sm:w-auto px-4 py-2 rounded-lg bg-foreground hover:bg-foreground/90 text-background text-xs font-semibold transition-all active:scale-95 shrink-0 disabled:opacity-50"
    >
      {isPending ? "Applying..." : "Apply"}
    </button>
  );
}

function MatchBadge({ score }: { score: number }) {
  const color = score >= 75 ? "emerald" : score >= 50 ? "amber" : "muted";
  const colorClasses = {
    emerald: "bg-emerald-500/10 border-emerald-500/20 text-emerald-600",
    amber: "bg-amber-500/10 border-amber-500/20 text-amber-600",
    muted: "bg-muted border-border/60 text-muted-foreground",
  };

  return (
    <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md border ${colorClasses[color]}`}>
      <span className="text-lg font-bold font-mono">{score}%</span>
      <span className="text-[9px] font-bold uppercase tracking-wider leading-tight">Match</span>
    </div>
  );
}

export function OpportunitiesClient({ jobs, totalCount, currentPage, pageSize }: OpportunitiesPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  const [searchInput, setSearchInput] = useState(searchParams.get("q") || "");
  const [typeFilter, setTypeFilter] = useState(searchParams.get("type") || "");
  const [remoteFilter, setRemoteFilter] = useState(searchParams.get("remote") === "true");
  const [highPrecision, setHighPrecision] = useState(false);
  const [sortBy, setSortBy] = useState("match");

  // Client-side sort
  const sortedJobs = [...(jobs || [])];
  if (sortBy === "match") {
    sortedJobs.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
  } else if (sortBy === "recent") {
    sortedJobs.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  // Client-side high precision filter
  const displayJobs = highPrecision ? sortedJobs.filter(j => (j.matchScore || 0) >= 80) : sortedJobs;

  // Compute stats from real data
  const topMatchScore = jobs.length > 0 ? Math.max(...jobs.map(j => j.matchScore || 0)) : 0;
  const appliedCount = jobs.filter(j => j.hasApplied).length;

  const buildUrl = useCallback((updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }
    // Reset to page 1 on filter change (unless it's a page change)
    if (!("page" in updates)) {
      params.delete("page");
    }
    return `/dashboard/student/opportunities?${params.toString()}`;
  }, [searchParams]);

  const applyFilters = () => {
    router.push(buildUrl({ type: typeFilter, remote: remoteFilter ? "true" : "", q: searchInput }));
  };

  const resetFilters = () => {
    setTypeFilter("");
    setRemoteFilter(false);
    setSearchInput("");
    router.push("/dashboard/student/opportunities");
  };

  return (
    <div className="flex flex-col gap-6 py-7 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <section className="bg-card rounded-xl border border-border/80 p-6 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="max-w-2xl flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
              <span className="font-medium">Career Opportunities</span>
              <span className="text-muted-foreground/30">/</span>
              <span className="font-medium">Skill-Matched Feed</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground font-display">
              Verified Career Opportunities
            </h1>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Positions matched to your verified skill profile. Match scores are computed from your assessment data.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 shrink-0">
            <div className="bg-background border border-border/80 rounded-xl px-4 py-3 flex flex-col justify-between min-w-[110px]">
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Active</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-xl font-semibold font-mono text-foreground">{totalCount}</span>
                <span className="text-[11px] text-emerald-600 font-medium">Open</span>
              </div>
            </div>
            <div className="bg-background border border-border/80 rounded-xl px-4 py-3 flex flex-col justify-between min-w-[110px]">
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Top Match</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-xl font-semibold font-mono text-emerald-600">{topMatchScore}%</span>
              </div>
            </div>
            <div className="bg-background border border-border/80 rounded-xl px-4 py-3 flex flex-col justify-between min-w-[110px]">
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Applied</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-xl font-semibold font-mono text-primary">{appliedCount}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Filters */}
        <aside className="lg:col-span-4 xl:col-span-3 bg-card rounded-xl border border-border/80 p-5 sticky top-24 flex flex-col gap-5">
          <div className="flex items-center justify-between pb-3.5 border-b border-border/40">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-foreground/80" />
              <h2 className="text-sm font-semibold text-foreground font-display">Filters</h2>
            </div>
            <button onClick={resetFilters} className="text-xs font-medium text-primary hover:text-primary/80 transition-colors" type="button">
              Reset
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search by title..." 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && applyFilters()}
              className="w-full h-9 pl-9 pr-3 text-xs bg-background border border-border/60 rounded-lg focus:outline-none focus:border-primary transition-colors" 
            />
          </div>

          {/* High Precision Toggle */}
          <div className="bg-muted/30 rounded-lg p-3 border border-border/80 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-foreground">High Precision Only</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input checked={highPrecision} onChange={(e) => setHighPrecision(e.target.checked)} className="sr-only peer" type="checkbox" />
                <div className="w-8 h-4 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-foreground after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            <p className="text-[11px] text-muted-foreground leading-tight">Only show opportunities with &gt;80% match score.</p>
          </div>

          {/* Role Type */}
          <div className="flex flex-col gap-2.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Role Type</span>
            <div className="flex flex-col gap-2 text-xs text-foreground/80">
              {[
                { value: "", label: "All Types" },
                { value: "full_time", label: "Full-Time" },
                { value: "internship", label: "Internship" },
                { value: "part_time", label: "Part-Time" },
                { value: "contract", label: "Contract" },
              ].map((opt) => (
                <label key={opt.value} className="flex items-center gap-2 cursor-pointer group">
                  <input 
                    checked={typeFilter === opt.value} 
                    onChange={() => setTypeFilter(opt.value)} 
                    className="w-3.5 h-3.5 text-primary border-border focus:ring-primary" 
                    name="roleType" 
                    type="radio" 
                  />
                  <span className="group-hover:text-foreground">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Remote Filter */}
          <div className="flex flex-col gap-2.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Work Modality</span>
            <label className="flex items-center gap-2 cursor-pointer group text-xs text-foreground/80">
              <input 
                checked={remoteFilter} 
                onChange={(e) => setRemoteFilter(e.target.checked)} 
                className="w-3.5 h-3.5 rounded border-border text-primary focus:ring-primary" 
                type="checkbox" 
              />
              <span className="group-hover:text-foreground">Remote Only</span>
            </label>
          </div>

          {/* Apply Filters Button */}
          <button
            onClick={applyFilters}
            className="w-full py-2 rounded-lg bg-foreground text-background text-xs font-semibold hover:bg-foreground/90 transition-colors active:scale-[0.98]"
          >
            Apply Filters
          </button>
        </aside>

        {/* Right: Feed */}
        <section className="lg:col-span-8 xl:col-span-9 flex flex-col gap-4">
          {/* Controls Bar */}
          <div className="bg-card rounded-xl border border-border/80 px-4 py-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="text-xs text-muted-foreground">
              Showing <strong className="text-foreground font-semibold">{displayJobs.length}</strong> of {totalCount} opportunities
              {highPrecision && <span className="text-primary ml-1">(high precision)</span>}
            </div>
            <div className="relative flex items-center shrink-0">
              <Filter className="absolute left-2.5 w-4 h-4 text-muted-foreground pointer-events-none" />
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="pl-8 pr-8 py-1.5 bg-background hover:bg-muted/50 border border-border/80 rounded-lg text-xs font-semibold text-foreground focus:outline-none appearance-none cursor-pointer transition-colors"
              >
                <option value="match">Highest Match</option>
                <option value="recent">Most Recent</option>
              </select>
              <ChevronDown className="absolute right-2.5 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          {/* Job Cards */}
          <div className="flex flex-col gap-3.5">
            {displayJobs.length === 0 ? (
              <div className="bg-card rounded-xl p-8 border border-border/80 text-center">
                <p className="text-muted-foreground text-sm">No opportunities found matching your criteria.</p>
                <button onClick={resetFilters} className="mt-3 text-xs text-primary hover:underline">Clear all filters</button>
              </div>
            ) : (
              displayJobs.map((job) => (
                <article key={job.id} className="bg-card rounded-xl p-5 border border-border/80 hover:border-border transition-all flex flex-col gap-4 group">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-lg bg-foreground text-background flex items-center justify-center font-bold text-sm tracking-tight shrink-0">
                        {(job.employer?.company_name?.[0] || job.title[0] || "?").toUpperCase()}
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                            {job.title}
                          </h3>
                          {job.type === "internship" && (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 text-[10px] font-semibold border border-emerald-500/20">
                              Internship
                            </span>
                          )}
                          {job.is_remote && (
                            <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 text-[10px] font-semibold border border-blue-500/20">
                              Remote
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
                          <span className="font-medium text-foreground/80">{job.employer?.company_name || "Employer"}</span>
                          {job.employer?.industry_sector && (
                            <>
                              <span className="text-muted-foreground/30">•</span>
                              <span>{job.employer.industry_sector}</span>
                            </>
                          )}
                          <span className="text-muted-foreground/30">•</span>
                          <span>{formatDistanceToNow(new Date(job.created_at), { addSuffix: true })}</span>
                        </div>
                      </div>
                    </div>
                    <MatchBadge score={job.matchScore || 0} />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-3 border-y border-border/40">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5 text-muted-foreground/70" />
                      <span className="truncate">{job.location || "Remote"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Briefcase className="w-3.5 h-3.5 text-muted-foreground/70" />
                      <span className="truncate capitalize">{job.type?.replace("_", " ")}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Coins className="w-3.5 h-3.5 text-muted-foreground/70" />
                      <span className="font-medium text-foreground/80 truncate">{job.stipend_salary_range || "Competitive"}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {job.required_skills && Object.keys(job.required_skills).slice(0, 5).map(skill => (
                        <span key={skill} className="px-2 py-0.5 rounded bg-muted text-foreground/80 text-[11px] font-medium border border-border/60">
                          {skill}
                        </span>
                      ))}
                      {job.required_skills && Object.keys(job.required_skills).length > 5 && (
                        <span className="px-2 py-0.5 rounded bg-muted text-muted-foreground text-[11px]">
                          +{Object.keys(job.required_skills).length - 5}
                        </span>
                      )}
                    </div>
                    <ApplyButton jobId={job.id} hasApplied={job.hasApplied} />
                  </div>
                </article>
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4">
              <button 
                disabled={currentPage <= 1}
                onClick={() => router.push(buildUrl({ page: String(currentPage - 1) }))}
                className="px-3 py-1.5 rounded-lg border border-border/80 text-xs font-medium text-muted-foreground hover:bg-muted transition-colors disabled:opacity-40 flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Previous
              </button>
              
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let page: number;
                if (totalPages <= 5) {
                  page = i + 1;
                } else if (currentPage <= 3) {
                  page = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  page = totalPages - 4 + i;
                } else {
                  page = currentPage - 2 + i;
                }
                return (
                  <button
                    key={page}
                    onClick={() => router.push(buildUrl({ page: String(page) }))}
                    className={`w-8 h-8 rounded-lg text-xs font-medium flex items-center justify-center transition-colors ${
                      page === currentPage
                        ? "bg-foreground text-background font-bold"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button 
                disabled={currentPage >= totalPages}
                onClick={() => router.push(buildUrl({ page: String(currentPage + 1) }))}
                className="px-3 py-1.5 rounded-lg border border-border/80 text-xs font-medium text-foreground hover:bg-muted transition-colors disabled:opacity-40 flex items-center gap-1"
              >
                Next <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
