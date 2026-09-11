"use client";

import { 
  ArrowRight,
  AlertCircle,
  BadgeCheck,
  Activity,
  ExternalLink
} from "lucide-react";
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  ResponsiveContainer,
  Tooltip
} from "recharts";
import Link from "next/link";
import type { SkillsPageProps } from "@/types/student-portal";
import { formatDistanceToNow } from "date-fns";

function buildRadarData(profile: SkillsPageProps["profile"]) {
  if (!profile) return [];

  const allSkills: Record<string, number> = {
    ...profile.technical_skills,
    ...profile.soft_skills,
    ...profile.domain_skills,
  };

  // Take top 8 skills for the radar (too many makes it unreadable)
  const entries = Object.entries(allSkills)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  return entries.map(([skill, value]) => ({
    skill: skill.length > 16 ? skill.substring(0, 14) + '…' : skill,
    fullName: skill,
    value: Math.round(value),
    target: 80, // industry baseline
  }));
}

export function SkillsClient({ profile, gaps }: SkillsPageProps) {
  const overallScore = profile?.employability_score || 0;
  const gapCount = gaps?.length || 0;
  const topGap = gaps?.[0]?.skill_name || "N/A";
  const radarData = buildRadarData(profile);
  const lastAssessedText = profile?.last_assessed_at 
    ? formatDistanceToNow(new Date(profile.last_assessed_at), { addSuffix: true })
    : "Not assessed yet";

  return (
    <div className="flex flex-col gap-7 py-7 px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <section className="relative rounded-xl border border-border/80 bg-card p-6 overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-medium">Skills Overview</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground font-display">
              Your Skills Profile
            </h1>
            <p className="text-xs text-muted-foreground max-w-xl leading-relaxed">
              Your verified skill profile based on completed assessments, compared against industry recruitment benchmarks.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-6 lg:gap-8 border-t lg:border-t-0 lg:border-l border-border/80 pt-4 lg:pt-0 lg:pl-8">
            <div>
              <div className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">Overall Score</div>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-2xl font-semibold tracking-tight text-foreground font-mono">{overallScore}%</span>
              </div>
              <div className="w-32 bg-muted rounded-full h-1 mt-2">
                <div className="bg-primary h-1 rounded-full transition-all duration-500" style={{ width: `${overallScore}%` }}></div>
              </div>
            </div>
            <div>
              <div className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">Identified Gaps</div>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-2xl font-semibold tracking-tight text-foreground font-mono">{gapCount} Gaps</span>
                <span className="text-[11px] text-muted-foreground font-mono">Identified</span>
              </div>
              <div className="text-[11px] text-muted-foreground mt-2 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                Priority: {topGap}
              </div>
            </div>
            <div>
              <div className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">Career Status</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-semibold text-foreground font-mono capitalize">{profile?.career_readiness || 'Evaluating'}</span>
              </div>
              <div className="text-[11px] text-muted-foreground mt-1.5 flex items-center gap-1">
                <BadgeCheck className="w-3.5 h-3.5 text-emerald-500" />
                {radarData.length} Skills Assessed
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
        
        {/* Left Col: Radar Chart */}
        <div className="lg:col-span-6 bg-card rounded-xl border border-border/80 p-5 space-y-4 flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/40">
            <div>
              <h2 className="text-sm font-semibold text-foreground font-display">Skills Radar</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Your assessed skills vs target baseline (80%)</p>
            </div>
            <div className="flex items-center gap-4 bg-muted/50 px-3 py-1.5 rounded-lg border border-border/60 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                <span className="text-foreground/90 font-medium">Your Score</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 border-t border-dashed border-muted-foreground"></span>
                <span className="text-muted-foreground">Target (80%)</span>
              </div>
            </div>
          </div>
          
          {radarData.length > 0 ? (
            <div className="w-full flex items-center justify-center py-2">
              <ResponsiveContainer width="100%" height={380}>
                <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="75%">
                  <PolarGrid stroke="var(--color-border)" />
                  <PolarAngleAxis 
                    dataKey="skill" 
                    tick={{ fill: 'var(--color-foreground)', fontSize: 11, fontWeight: 500 }}
                  />
                  <PolarRadiusAxis 
                    angle={90} 
                    domain={[0, 100]} 
                    tick={{ fill: 'var(--color-muted-foreground)', fontSize: 10 }}
                  />
                  <Radar 
                    name="Target" 
                    dataKey="target" 
                    stroke="var(--color-muted-foreground)" 
                    fill="var(--color-muted)" 
                    fillOpacity={0.3}
                    strokeDasharray="4 3"
                  />
                  <Radar 
                    name="Your Score" 
                    dataKey="value" 
                    stroke="var(--color-primary)" 
                    fill="var(--color-primary)" 
                    fillOpacity={0.15}
                    strokeWidth={2}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--color-card)', 
                      border: '1px solid var(--color-border)',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                    formatter={(value: any, name: any) => [`${value}%`, name]}
                    labelFormatter={(label) => {
                      const item = radarData.find(d => d.skill === label);
                      return item?.fullName || label;
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center py-12 text-sm text-muted-foreground">
              <div className="text-center space-y-2">
                <Activity className="w-8 h-8 mx-auto text-muted-foreground/50" />
                <p>No skill data available yet.</p>
                <p className="text-xs">Complete your first assessment to see your radar chart.</p>
                <Link href="/dashboard/student/assessments" className="inline-flex items-center gap-1.5 mt-2 px-4 py-2 bg-primary text-primary-foreground text-xs font-medium rounded-lg hover:bg-primary/90 transition-colors">
                  Take Assessment <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}
          
          <div className="p-3.5 rounded-lg border border-border/60 bg-muted/30 flex items-start gap-3">
            <Activity className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
            <div>
              <span className="text-xs font-medium text-foreground block">Summary</span>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                {profile?.strengths && profile.strengths.length > 0 
                  ? `Strong mastery in ${profile.strengths.slice(0, 3).join(', ')}.` 
                  : "Complete assessments to identify your strengths."
                }
                {profile?.weaknesses && profile.weaknesses.length > 0 && (
                  <> Focus improvement on <span className="text-foreground/80 font-medium">{profile.weaknesses[0]}</span>.</>
                )}
              </p>
            </div>
          </div>
        </div>
        
        {/* Right Col: Skill Gap Breakdown */}
        <div className="lg:col-span-6 bg-card rounded-xl border border-border/80 p-5 space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-border/40">
            <div>
              <h2 className="text-sm font-semibold text-foreground font-display">Skill Gap Breakdown</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Your current levels vs required benchmarks</p>
            </div>
            <span className="text-xs font-mono text-muted-foreground">{gapCount} Gaps</span>
          </div>
          
          <div className="divide-y divide-border/40 flex-1">
            {gaps && gaps.length > 0 ? gaps.map((gap) => (
              <div key={gap.id} className="py-3 space-y-1.5 first:pt-0">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-foreground capitalize">{gap.skill_name} <span className="text-muted-foreground font-normal">({gap.category})</span></span>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded capitalize ${
                      gap.priority === 'critical' ? 'bg-red-500/10 text-red-600 border border-red-500/20' :
                      gap.priority === 'high' ? 'bg-amber-500/10 text-amber-600 border border-amber-500/20' :
                      'bg-muted text-muted-foreground border border-border/40'
                    }`}>{gap.priority}</span>
                    <span className="font-mono text-muted-foreground text-[11px]">{gap.current_level}% <span className="text-muted-foreground/60">/ {gap.required_level}%</span></span>
                  </div>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden relative">
                  <div className="absolute top-0 bottom-0 w-0.5 bg-muted-foreground z-10" style={{ left: `${gap.required_level}%` }}></div>
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      gap.current_level >= gap.required_level ? 'bg-emerald-500' : 'bg-primary'
                    }`} 
                    style={{ width: `${gap.current_level}%` }}
                  ></div>
                </div>
              </div>
            )) : (
              <div className="py-8 text-center text-sm text-muted-foreground">
                No skill gaps identified yet. Take more assessments to generate insights.
              </div>
            )}
          </div>
          
          <div className="pt-3 border-t border-border/40 flex items-center justify-between text-xs">
            <span className="text-[11px] font-mono text-muted-foreground">{lastAssessedText}</span>
            <Link 
              href="/dashboard/student/assessments" 
              className="px-3 py-1.5 rounded-md border border-border/80 hover:border-border text-xs font-medium text-foreground transition-colors flex items-center gap-1.5 active:scale-95"
            >
              <span>Request Re-Assessment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
      
      {/* Recommended Upskilling Pathways */}
      <div className="bg-card rounded-xl border border-border/80 p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border/40">
          <div>
            <h2 className="text-sm font-semibold text-foreground font-display">Recommended Upskilling Pathways</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Targeted resources to close identified skill gaps</p>
          </div>
          <span className="text-xs font-mono text-muted-foreground">{Math.min(gaps?.length || 0, 3)} Tracks</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {gaps && gaps.length > 0 ? gaps.slice(0, 3).map((gap) => (
            <div key={gap.id} className="rounded-lg border border-border/60 p-4 bg-background flex flex-col justify-between space-y-4 hover:border-border transition-colors">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                  <span className="capitalize">{gap.category} Skill</span>
                  <span className={`capitalize ${
                    gap.priority === 'critical' ? 'text-red-500' :
                    gap.priority === 'high' ? 'text-amber-500' : 'text-muted-foreground'
                  }`}>{gap.priority} Priority</span>
                </div>
                <h3 className="text-sm font-medium text-foreground">{gap.skill_name}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                  Improve from {gap.current_level}% to {gap.required_level}% ({(gap.required_level - gap.current_level).toFixed(0)}% gap).
                  {gap.recommended_resources?.length > 0 && ` ${gap.recommended_resources.length} resources available.`}
                </p>

                {/* Show first 2 resources if available */}
                {gap.recommended_resources?.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    {gap.recommended_resources.slice(0, 2).map((resource, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[11px]">
                        <ExternalLink className="w-3 h-3 text-primary shrink-0" />
                        {resource.url ? (
                          <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline truncate">
                            {resource.title}
                          </a>
                        ) : (
                          <span className="text-muted-foreground truncate">{resource.title}</span>
                        )}
                        {resource.is_free && (
                          <span className="text-emerald-600 font-medium shrink-0">Free</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="pt-3 border-t border-border/40 flex items-center justify-between">
                <span className="text-[11px] font-mono text-muted-foreground">
                  {gap.recommended_resources?.length || 0} Resources
                </span>
                <Link 
                  href="/dashboard/student/courses" 
                  className="px-3.5 py-1.5 rounded-md bg-foreground hover:bg-foreground/90 text-background text-xs font-medium transition-colors flex items-center gap-1 active:scale-95 shadow-sm"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )) : (
            <div className="col-span-full py-6 text-center text-sm text-muted-foreground border border-dashed border-border/60 rounded-lg">
              No specific upskilling pathways recommended at this time.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
