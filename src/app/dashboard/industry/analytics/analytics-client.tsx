"use client";

import {
  Zap,
  TrendingUp,
  TrendingDown,
  ShieldCheck,
  BrainCircuit,
  Users,
  Sparkles,
  Calendar,
  Globe,
  Download,
  Lightbulb,
  Filter,
  CheckCircle,
  AlertTriangle,
  SlidersHorizontal,
  Search,
  Eye,
} from "lucide-react";

export function AnalyticsClient() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-[100vw] overflow-x-hidden pb-8">
      
      {/* Contextual Bar / Action Strip */}
      <section className="bg-card border border-border/40 rounded-2xl px-6 py-5 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
              Overview
            </span>
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Talent Pipeline Analytics & Market Intelligence</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Data across 450+ universities, technical skill distributions, and hiring funnel efficiency.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Filters */}
          <div className="flex items-center bg-background border border-border/40 shadow-sm rounded-xl px-3 py-2">
            <Calendar className="w-4 h-4 text-muted-foreground mr-2" />
            <select className="bg-transparent text-sm font-semibold text-foreground focus:outline-none cursor-pointer pr-2">
              <option>2024-2025 Placement Cycle</option>
              <option>Last 6 Months</option>
              <option>Q3 Autumn Cohort</option>
              <option>Full Fiscal Year 2024</option>
            </select>
          </div>
          <div className="flex items-center bg-background border border-border/40 shadow-sm rounded-xl px-3 py-2">
            <Globe className="w-4 h-4 text-muted-foreground mr-2" />
            <select className="bg-transparent text-sm font-semibold text-foreground focus:outline-none cursor-pointer pr-2">
              <option>All India (Pan-National)</option>
              <option>Tier-1 Institutes Only</option>
              <option>Southern Tech Corridor</option>
              <option>Northern Hubs (NCR/Punjab)</option>
            </select>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold shadow-sm transition-all hover:shadow-md">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
            <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px]">PDF</span>
          </button>
        </div>
      </section>

      {/* KPI Metric Summary Bar */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="p-5 bg-card border border-border/40 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Avg Sourcing Time</span>
            <Zap className="w-5 h-5 text-amber-500" />
          </div>
          <div className="my-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-foreground tracking-tight">12.4</span>
            <span className="text-sm text-muted-foreground font-medium">Days</span>
          </div>
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 flex items-center gap-1">
              <TrendingDown className="w-3.5 h-3.5" /> -3.2d vs peers
            </span>
            <span className="font-mono text-muted-foreground">Bench: 15.6d</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-5 bg-card border border-border/40 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Offer Acceptance Rate</span>
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="my-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-foreground tracking-tight">78.5%</span>
            <span className="text-sm text-emerald-500 font-bold">Top Quartile</span>
          </div>
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> +6.4% YoY
            </span>
            <span className="font-mono text-muted-foreground">142/181 Acc</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-5 bg-card border border-border/40 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Candidate Match Accuracy</span>
            <BrainCircuit className="w-5 h-5 text-primary" />
          </div>
          <div className="my-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-foreground tracking-tight">91.8%</span>
            <span className="text-sm text-muted-foreground font-medium">Overall Fit</span>
          </div>
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> High Precision
            </span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="p-5 bg-card border border-border/40 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Diversity & Tier-2 Reach</span>
            <Users className="w-5 h-5 text-blue-500" />
          </div>
          <div className="my-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-foreground tracking-tight">36.2%</span>
            <span className="text-sm text-muted-foreground font-medium">Non-Metro</span>
          </div>
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-500 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> +8.9% Reach
            </span>
            <span className="font-mono text-muted-foreground">164 Campuses</span>
          </div>
        </div>
      </section>

      {/* Main Grid: Heatmap & Yield Matrix */}
      <section className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* Technical Skill Supply vs Demand Heatmap */}
        <div className="xl:col-span-7 bg-card border border-border/40 rounded-2xl shadow-sm p-5 flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-foreground">Technical Skill Supply vs. Demand Heatmap</h2>
                <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-[10px] font-bold uppercase">Live Data</span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">Corporate requisitions cross-referenced with student portfolios.</p>
            </div>
            {/* Legend */}
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-semibold">
              <span>Scarce</span>
              <div className="flex items-center gap-0.5">
                <span className="w-3 h-3 rounded-sm bg-primary/10"></span>
                <span className="w-3 h-3 rounded-sm bg-primary/30"></span>
                <span className="w-3 h-3 rounded-sm bg-primary/50"></span>
                <span className="w-3 h-3 rounded-sm bg-primary/70"></span>
                <span className="w-3 h-3 rounded-sm bg-primary"></span>
              </div>
              <span>Surplus</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-muted/50 text-muted-foreground text-xs uppercase tracking-wider">
                  <th className="p-3 font-semibold rounded-tl-xl">Enterprise Skill Need</th>
                  <th className="p-3 font-semibold text-center">Req Status</th>
                  <th className="p-3 font-semibold text-center">IITs</th>
                  <th className="p-3 font-semibold text-center">NITs</th>
                  <th className="p-3 font-semibold text-center">BITS</th>
                  <th className="p-3 font-semibold text-center rounded-tr-xl">Tier 2/3</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="p-3 font-semibold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    Rust / Core Systems
                  </td>
                  <td className="p-3 text-center">
                    <span className="px-2 py-0.5 rounded bg-red-500/10 text-red-500 text-[10px] font-bold uppercase">Critical (18)</span>
                  </td>
                  <td className="p-3"><div className="mx-auto w-10 py-1 rounded bg-primary/70 text-white font-mono text-xs font-bold text-center">142</div></td>
                  <td className="p-3"><div className="mx-auto w-10 py-1 rounded bg-primary/10 text-foreground font-mono text-xs text-center">48</div></td>
                  <td className="p-3"><div className="mx-auto w-10 py-1 rounded bg-primary/50 text-white font-mono text-xs font-bold text-center">96</div></td>
                  <td className="p-3"><div className="mx-auto w-10 py-1 rounded bg-muted text-muted-foreground font-mono text-xs text-center">14</div></td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="p-3 font-semibold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    CUDA & Systems
                  </td>
                  <td className="p-3 text-center">
                    <span className="px-2 py-0.5 rounded bg-red-500/10 text-red-500 text-[10px] font-bold uppercase">Critical (12)</span>
                  </td>
                  <td className="p-3"><div className="mx-auto w-10 py-1 rounded bg-primary text-white font-mono text-xs font-bold text-center">218</div></td>
                  <td className="p-3"><div className="mx-auto w-10 py-1 rounded bg-primary/30 text-foreground font-mono text-xs text-center">64</div></td>
                  <td className="p-3"><div className="mx-auto w-10 py-1 rounded bg-primary/50 text-white font-mono text-xs font-bold text-center">88</div></td>
                  <td className="p-3"><div className="mx-auto w-10 py-1 rounded bg-muted text-muted-foreground font-mono text-xs text-center">18</div></td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="p-3 font-semibold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    Machine Learning Apps
                  </td>
                  <td className="p-3 text-center">
                    <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 text-[10px] font-bold uppercase">High (35)</span>
                  </td>
                  <td className="p-3"><div className="mx-auto w-10 py-1 rounded bg-primary text-white font-mono text-xs font-bold text-center">390</div></td>
                  <td className="p-3"><div className="mx-auto w-10 py-1 rounded bg-primary/70 text-white font-mono text-xs font-bold text-center">184</div></td>
                  <td className="p-3"><div className="mx-auto w-10 py-1 rounded bg-primary/70 text-white font-mono text-xs font-bold text-center">205</div></td>
                  <td className="p-3"><div className="mx-auto w-10 py-1 rounded bg-primary/30 text-foreground font-mono text-xs font-bold text-center">75</div></td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="p-3 font-semibold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Distributed K8s & Go
                  </td>
                  <td className="p-3 text-center">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase">Normal (40)</span>
                  </td>
                  <td className="p-3"><div className="mx-auto w-10 py-1 rounded bg-primary text-white font-mono text-xs font-bold text-center">512</div></td>
                  <td className="p-3"><div className="mx-auto w-10 py-1 rounded bg-primary text-white font-mono text-xs font-bold text-center">410</div></td>
                  <td className="p-3"><div className="mx-auto w-10 py-1 rounded bg-primary/70 text-white font-mono text-xs font-bold text-center">324</div></td>
                  <td className="p-3"><div className="mx-auto w-10 py-1 rounded bg-primary/50 text-white font-mono text-xs font-bold text-center">145</div></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5 font-semibold">
              <Lightbulb className="w-4 h-4 text-primary" />
              <span>Strategy Alert: Rust & CUDA present immediate campus deficits; prioritize targeted hackathons.</span>
            </div>
            <button className="text-primary font-bold hover:underline flex items-center gap-1">
              Deep Dive
            </button>
          </div>
        </div>

        {/* Funnel Drop-off */}
        <div className="xl:col-span-5 bg-card border border-border/40 rounded-2xl shadow-sm p-5 flex flex-col">
          <div className="flex items-center justify-between pb-4">
            <div>
              <h2 className="text-lg font-bold text-foreground">Funnel Drop-off & Bottlenecks</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Stage-by-stage candidate throughput.</p>
            </div>
            <span className="px-2 py-0.5 rounded bg-red-500/10 text-red-500 text-[10px] font-bold uppercase">Alert: Tech Round 2</span>
          </div>

          <div className="space-y-4 flex-1">
            {/* Stage 1 */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-foreground">1. Applied & Screened</span>
                <span className="font-mono font-bold">2,840</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full w-full"></div>
              </div>
            </div>
            {/* Stage 2 */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-foreground">2. Coding Challenge</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold">1,120</span>
                  <span className="text-[10px] font-bold text-red-500 bg-red-500/10 px-1.5 py-0.5 rounded">-60.5%</span>
                </div>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary/80 rounded-full w-[40%]"></div>
              </div>
            </div>
            {/* Stage 3 */}
            <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-red-500/5 border border-red-500/20">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-red-500 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" /> 3. System Design
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-red-500">318</span>
                  <span className="text-[10px] font-bold text-red-500 bg-red-500/10 px-1.5 py-0.5 rounded">-71.6%</span>
                </div>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-red-500 rounded-full w-[11%]"></div>
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">Interviewer feedback: Lack of practical high-concurrency exposure.</p>
            </div>
            {/* Stage 4 */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-foreground">4. Exec Interview</span>
                <span className="font-mono font-bold">210</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary/40 rounded-full w-[7.4%]"></div>
              </div>
            </div>
            {/* Stage 5 */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-emerald-500">5. Offers Extended</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-emerald-500">181</span>
                  <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded">86.2% Conv</span>
                </div>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full w-[6.4%]"></div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Roster Table */}
      <section className="bg-card border border-border/40 rounded-2xl shadow-sm p-5 flex flex-col">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-foreground">Regional Placement & Academic Cohort Benchmarking</h2>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">Comparative analytics across institutional partner clusters.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input className="pl-9 pr-3 py-1.5 bg-muted/50 border border-border/40 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary shadow-inner" placeholder="Filter institutions..." type="text" />
            </div>
            <button className="px-3 py-1.5 rounded-xl bg-background border border-border/40 font-semibold text-sm hover:bg-muted transition-colors flex items-center gap-1.5 shadow-sm">
              <Filter className="w-4 h-4" />
              <span>Metrics</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-muted/50 text-muted-foreground text-xs uppercase tracking-wider">
                <th className="p-3 font-semibold rounded-tl-xl">University & Campus</th>
                <th className="p-3 font-semibold">Zone / Cluster</th>
                <th className="p-3 font-semibold text-right">Pool Volume</th>
                <th className="p-3 font-semibold text-right">Pass Rate</th>
                <th className="p-3 font-semibold text-right">Avg. Match</th>
                <th className="p-3 font-semibold text-right">Offers Generated</th>
                <th className="p-3 font-semibold text-center rounded-tr-xl">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-xs border border-primary/20">IITB</div>
                    <div>
                      <div className="font-bold text-foreground">Indian Institute of Technology, Bombay</div>
                      <div className="text-xs text-muted-foreground font-semibold">Dept. of Computer Science & Engineering</div>
                    </div>
                  </div>
                </td>
                <td className="p-3 text-muted-foreground font-semibold text-xs">West Zone • Tier 1</td>
                <td className="p-3 text-right font-mono font-medium">482 Students</td>
                <td className="p-3 text-right font-mono font-bold text-emerald-500">41.2%</td>
                <td className="p-3 text-right">
                  <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-mono font-bold text-xs border border-primary/20">94.2%</span>
                </td>
                <td className="p-3 text-right font-mono font-bold">38 Offers</td>
                <td className="p-3 text-center">
                  <button className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold text-xs border border-indigo-500/20">BITS</div>
                    <div>
                      <div className="font-bold text-foreground">BITS Pilani</div>
                      <div className="text-xs text-muted-foreground font-semibold">Software & Systems</div>
                    </div>
                  </div>
                </td>
                <td className="p-3 text-muted-foreground font-semibold text-xs">North Zone • Tier 1</td>
                <td className="p-3 text-right font-mono font-medium">320 Students</td>
                <td className="p-3 text-right font-mono font-bold text-emerald-500">38.5%</td>
                <td className="p-3 text-right">
                  <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-mono font-bold text-xs border border-primary/20">89.1%</span>
                </td>
                <td className="p-3 text-right font-mono font-bold">24 Offers</td>
                <td className="p-3 text-center">
                  <button className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}
