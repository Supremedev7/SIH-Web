"use client";

import {
  Activity,
  AlertTriangle,
  Lightbulb,
  TrendingUp,
  Download,
  BookOpen,
  Filter,
  ArrowRight,
  Sparkles,
  Zap
} from "lucide-react";

// Mock Data for the Heatmap Matrix
const HEATMAP_SKILLS = ["React.js", "Python", "Cloud (AWS)", "Data Structures", "System Design", "CAD/CAM", "VLSI Design"];
const HEATMAP_COHORTS = ["CS - 4th Yr", "CS - 3rd Yr", "IT - 4th Yr", "ME - 4th Yr", "EC - 4th Yr"];

// Generates a mock proficiency level between 10 and 100 for color mapping
const generateProficiency = () => Math.floor(Math.random() * (100 - 10 + 1) + 10);

const HEATMAP_DATA = HEATMAP_SKILLS.map(skill => ({
  skill,
  scores: HEATMAP_COHORTS.map(() => generateProficiency())
}));

export function HeatmapsClient({ initialHeatmap }: { initialHeatmap?: any }) {
  const displayCohorts = initialHeatmap?.cohorts || HEATMAP_COHORTS;
  const displayData = initialHeatmap?.matrix || HEATMAP_DATA;

  
  // Helper to determine cell color based on score (Using Terracotta/Primary theme)
  const getHeatmapColor = (score: number) => {
    if (score >= 80) return "bg-primary";
    if (score >= 60) return "bg-primary/70";
    if (score >= 40) return "bg-primary/40";
    if (score >= 20) return "bg-primary/20";
    return "bg-primary/5";
  };

  return (
    <div className="flex flex-col gap-6 relative h-full">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">AI Skill Heatmaps</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Discover skill proficiencies across cohorts and identify critical industry gaps.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-background border border-border/60 text-foreground hover:bg-muted text-sm font-semibold transition-colors shadow-sm">
            <Filter className="w-4 h-4" />
            <span>Filter Cohorts</span>
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-semibold transition-colors shadow-sm">
            <Download className="w-4 h-4" />
            <span>Export Map</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* The Heatmap Matrix */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="bg-card border border-border/40 rounded-2xl shadow-sm p-6 flex flex-col overflow-hidden h-full">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold text-foreground">Proficiency Matrix</h2>
              </div>
              <div className="flex items-center gap-4 text-xs font-semibold text-muted-foreground">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-primary/5 border border-border/40"></span> Low</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-primary/40"></span> Medium</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-primary"></span> High</span>
              </div>
            </div>

            <div className="flex-1 overflow-x-auto pb-4">
              <div className="min-w-[600px]">
                {/* Headers */}
                <div className="grid grid-cols-6 gap-2 mb-2">
                  <div className="col-span-1"></div> {/* Empty top-left cell */}
                  {displayCohorts.map((cohort: string, i: number) => (
                    <div key={i} className="text-center">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{cohort}</span>
                    </div>
                  ))}
                </div>

                {/* Grid Rows */}
                <div className="flex flex-col gap-2">
                  {displayData.map((row: any, rowIndex: number) => (
                    <div key={rowIndex} className="grid grid-cols-6 gap-2 items-center group">
                      <div className="col-span-1 text-xs font-bold text-foreground text-right pr-2 group-hover:text-primary transition-colors">
                        {row.skill}
                      </div>
                      {row.scores.map((score: number, colIndex: number) => (
                        <div 
                          key={colIndex} 
                          className={`h-12 rounded-lg ${getHeatmapColor(score)} flex items-center justify-center transition-all hover:scale-105 hover:shadow-md cursor-pointer border border-border/10`}
                          title={`${row.skill} - ${displayCohorts[colIndex]}: ${score}%`}
                        >
                          <span className="text-xs font-bold text-background opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md">
                            {score}%
                          </span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Gap Analysis & Recommended Actions */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* AI Insights Card */}
          <div className="bg-primary border border-primary/20 rounded-2xl shadow-lg p-6 relative overflow-hidden flex flex-col gap-5 text-primary-foreground">
            {/* Background pattern */}
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Sparkles className="w-24 h-24" />
            </div>

            <div className="relative z-10 flex items-center gap-2">
              <div className="p-2 bg-background/20 rounded-lg backdrop-blur-sm">
                <Lightbulb className="w-5 h-5 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-bold">AI Gap Analysis</h3>
            </div>

            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-primary-foreground/70">Critical Finding</span>
                <p className="text-sm font-semibold leading-relaxed">
                  Industry demand for <strong className="text-white">Cloud Computing (AWS)</strong> has surged by 40% this quarter, but only 12% of final year students have verified cloud skills.
                </p>
              </div>

              <div className="w-full h-px bg-primary-foreground/20"></div>

              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-primary-foreground/70">Secondary Finding</span>
                <p className="text-sm font-semibold leading-relaxed">
                  Mechanical 4th Yr cohort is showing extremely low proficiency in <strong className="text-white">CAD/CAM</strong> (Average: 24%), which is a strict prerequisite for 3 upcoming core drives.
                </p>
              </div>
            </div>
          </div>

          {/* Recommended Actions */}
          <div className="bg-card border border-border/40 rounded-2xl shadow-sm p-6 flex flex-col flex-1">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              Recommended Actions
            </h3>
            
            <div className="flex flex-col gap-3">
              <div className="p-4 rounded-xl border border-border/60 hover:border-primary/50 bg-background transition-all group">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">Assign AWS Practitioner Course</h4>
                    <span className="text-xs text-muted-foreground font-semibold">Target: CS & IT Final Years (360 Students)</span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                    <BookOpen className="w-4 h-4" />
                  </div>
                </div>
                <button className="mt-4 text-xs font-bold text-primary flex items-center gap-1 hover:underline">
                  Deploy Now <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="p-4 rounded-xl border border-border/60 hover:border-primary/50 bg-background transition-all group">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">Schedule CAD/CAM Workshop</h4>
                    <span className="text-xs text-muted-foreground font-semibold">Target: ME 3rd & 4th Years (300 Students)</span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                </div>
                <button className="mt-4 text-xs font-bold text-primary flex items-center gap-1 hover:underline">
                  Notify Faculty <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="p-4 rounded-xl border border-border/60 hover:border-primary/50 bg-background transition-all group mt-auto opacity-70 hover:opacity-100">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">Review Full Gap Report</h4>
                    <span className="text-xs text-muted-foreground font-semibold">Contains 14 detailed insights across all departments.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
