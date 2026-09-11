"use client";

import {
  Users,
  Briefcase,
  TrendingUp,
  Award,
  Download,
  CalendarPlus,
  ArrowUpRight,
  Building,
  GraduationCap,
  Clock
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { useState } from "react";

const placementData = [
  { month: "Aug", offers: 45, target: 40 },
  { month: "Sep", offers: 120, target: 100 },
  { month: "Oct", offers: 280, target: 250 },
  { month: "Nov", offers: 410, target: 380 },
  { month: "Dec", offers: 460, target: 450 },
  { month: "Jan", offers: 520, target: 500 },
  { month: "Feb", offers: 680, target: 600 },
];

export function InstituteDashboardClient({ 
  institutionProfile, 
  students, 
  applications, 
  skills,
  recentActivities
}: any) {
  const [chartYear, setChartYear] = useState('2024-25');

  const totalStudents = students?.length || 0;
  
  // Calculate Placed (status: hired or offered)
  const placedApps = applications?.filter((a: any) => a.status === 'hired' || a.status === 'offered') || [];
  const placedStudentIds = new Set(placedApps.map((a: any) => a.student_id));
  const totalPlaced = placedStudentIds.size;
  const placementPercentage = totalStudents > 0 ? (totalPlaced / totalStudents) * 100 : 0;

  // Calculate Average Package
  const packages = placedApps.map((a: any) => {
    // extract from salary_range if exists, e.g. "800000-1200000"
    const range = a.job_listings?.salary_range;
    if (range) {
       const parts = range.split('-');
       return parts.length === 2 ? (parseInt(parts[0]) + parseInt(parts[1])) / 2 : parseInt(parts[0]);
    }
    return 0;
  }).filter((v: number) => !isNaN(v) && v > 0);
  
  const avgPackageRaw = packages.length > 0 ? packages.reduce((a: number,b: number) => a+b, 0) / packages.length : 0;
  const avgPackage = avgPackageRaw > 0 ? `₹${(avgPackageRaw / 100000).toFixed(1)}L` : '₹0L';
  const maxPackageRaw = packages.length > 0 ? Math.max(...packages) : 0;
  const maxPackage = maxPackageRaw > 0 ? `₹${(maxPackageRaw / 100000).toFixed(1)}L` : '₹0L';

  // Calculate Companies Visiting
  const distinctEmployers = new Set(applications?.map((a: any) => a.job_listings?.employer_id));
  
  // Calculate Skill Badges (sum of skills in technical_skills)
  let totalBadges = 0;
  skills?.forEach((s: any) => {
     if (s.technical_skills) {
       totalBadges += Object.keys(s.technical_skills).length;
     }
  });

  return (
    <div className="flex flex-col gap-8 pb-8">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Command Center</h1>
          <p className="text-muted-foreground mt-1">
            Overview of student readiness, placement velocity, and active industry drives for {institutionProfile?.name || 'your institution'}.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-xl bg-card border border-border/60 hover:bg-muted text-foreground transition-colors shadow-sm">
            <Download className="w-4 h-4" />
            Export NAAC Report
          </button>
          <button className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm">
            <CalendarPlus className="w-4 h-4" />
            Schedule Drive
          </button>
        </div>
      </div>

      {/* Quick Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-card border border-border/40 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Users className="w-5 h-5" />
            </div>
            <span className="flex items-center gap-1 text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">
              <ArrowUpRight className="w-3 h-3" />
              12% YoY
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-bold text-foreground">{totalPlaced}</h3>
            <div className="flex items-center justify-between mt-1">
              <p className="text-sm font-medium text-muted-foreground">Total Placed</p>
              <p className="text-xs text-muted-foreground font-mono">{totalStudents} Eligible</p>
            </div>
          </div>
          <div className="mt-4 h-1.5 w-full bg-muted overflow-hidden rounded-full">
            <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${placementPercentage}%` }} />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-card border border-border/40 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-bold text-foreground">{avgPackage}</h3>
            <p className="text-sm font-medium text-muted-foreground mt-1">Average Package (CTC)</p>
          </div>
          <div className="mt-4 pt-4 border-t border-border/40 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Highest: <strong className="text-foreground">{maxPackage}</strong></span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-card border border-border/40 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500">
              <Building className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-bold text-foreground">{distinctEmployers.size}</h3>
            <p className="text-sm font-medium text-muted-foreground mt-1">Visiting Companies</p>
          </div>
          <div className="mt-4 pt-4 border-t border-border/40 flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-medium">Top Recruiters Participated</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-card border border-border/40 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
              <Award className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium text-muted-foreground">This Semester</span>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-bold text-foreground">{totalBadges}</h3>
            <p className="text-sm font-medium text-muted-foreground mt-1">Skill Badges Earned</p>
          </div>
          <div className="mt-4 pt-4 border-t border-border/40 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Highest adoption: <strong className="text-foreground">AI/ML</strong></span>
          </div>
        </div>
      </div>

      {/* Charts & Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart Column */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-card border border-border/40 rounded-2xl p-5 shadow-sm flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg font-bold text-foreground">Placement Trajectory</h3>
                <p className="text-sm text-muted-foreground">Cumulative offers vs historical targets</p>
              </div>
              <div className="flex items-center p-1 bg-muted/50 rounded-lg">
                <button 
                  onClick={() => setChartYear('2024-25')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${chartYear === '2024-25' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  2024-25
                </button>
                <button 
                  onClick={() => setChartYear('2023-24')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${chartYear === '2023-24' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  2023-24
                </button>
              </div>
            </div>
            
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={placementData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.4} />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      borderColor: 'hsl(var(--border))',
                      borderRadius: '0.5rem',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                    itemStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                  <Line 
                    type="monotone" 
                    name="Actual Offers"
                    dataKey="offers" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ r: 4, strokeWidth: 2 }}
                    activeDot={{ r: 6 }} 
                  />
                  <Line 
                    type="monotone" 
                    name="Target Offers"
                    dataKey="target" 
                    stroke="hsl(var(--muted-foreground))" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Activity Column */}
        <div className="bg-card border border-border/40 rounded-2xl p-5 shadow-sm flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-foreground">Recent Activity</h3>
            <button className="text-sm font-medium text-primary hover:underline">View All</button>
          </div>
          
          <div className="flex flex-col gap-6 flex-1 overflow-y-auto pr-2">
            {recentActivities.map((activity: any, idx: number) => {
              const Icon = activity.type === 'drive' ? Briefcase : activity.type === 'achievement' ? Award : Download;
              return (
                <div key={idx} className="flex gap-4 relative group">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0 border border-background ring-4 ring-card z-10 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  {/* Timeline connector */}
                  {idx !== recentActivities.length - 1 && (
                    <div className="absolute top-10 left-5 bottom-[-24px] w-px bg-border/60 -z-0" />
                  )}
                  
                  <div className="flex flex-col pt-2.5 pb-2">
                    <p className="text-sm font-semibold text-foreground leading-snug">{activity.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="flex items-center gap-1 text-[10px] font-medium text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {new Date(activity.time).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {recentActivities.length === 0 && (
               <div className="text-sm text-muted-foreground text-center py-4">No recent activity.</div>
            )}
          </div>
          
        </div>
      </div>

    </div>
  );
}
