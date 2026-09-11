"use client";

import {
  Building2,
  TrendingUp,
  Users,
  Award,
  BookOpen,
  Laptop,
  Code,
  Cpu,
  ChevronRight,
  BarChart2,
  Target
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

const DEPARTMENTS = [
  {
    id: "CS",
    name: "Computer Science & Engg",
    head: "Dr. A. K. Sharma",
    students: 240,
    placed: 215,
    placementRate: 89,
    topSkill: "Full Stack Dev",
    icon: Code,
    color: "emerald"
  },
  {
    id: "EC",
    name: "Electronics & Comm.",
    head: "Dr. S. Reddy",
    students: 180,
    placed: 142,
    placementRate: 78,
    topSkill: "VLSI Design",
    icon: Cpu,
    color: "blue"
  },
  {
    id: "ME",
    name: "Mechanical Engg",
    head: "Dr. V. Menon",
    students: 150,
    placed: 98,
    placementRate: 65,
    topSkill: "CAD/CAM",
    icon: Building2,
    color: "orange"
  },
  {
    id: "IT",
    name: "Information Technology",
    head: "Dr. P. Joshi",
    students: 120,
    placed: 105,
    placementRate: 87,
    topSkill: "Cloud Computing",
    icon: Laptop,
    color: "indigo"
  }
];

const COMPARISON_DATA = [
  {
    name: "CS",
    "Internships": 190,
    "Assessments": 225,
    "Placements": 215,
  },
  {
    name: "EC",
    "Internships": 120,
    "Assessments": 160,
    "Placements": 142,
  },
  {
    name: "ME",
    "Internships": 75,
    "Assessments": 110,
    "Placements": 98,
  },
  {
    name: "IT",
    "Internships": 95,
    "Assessments": 115,
    "Placements": 105,
  }
];

export function DepartmentsClient({ initialDepartments }: { initialDepartments?: any[] }) {
  // If we have real DB data, use it. But for visual consistency we might map some colors.
  const displayDepts = initialDepartments?.length ? initialDepartments.map((d, i) => ({
    ...d,
    icon: [Code, Cpu, Building2, Laptop][i % 4],
    color: ['emerald', 'blue', 'orange', 'indigo'][i % 4]
  })) : [];

  const comparisonData = displayDepts.map(d => ({
    name: d.id,
    "Internships": Math.floor(d.students * 0.4),
    "Assessments": Math.floor(d.students * 0.8),
    "Placements": d.placed,
  }));

  return (
    <div className="flex flex-col gap-6 relative h-full">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Department Analytics</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Compare performance metrics, placement rates, and skill adoption across academic departments.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select className="px-4 py-2 rounded-xl bg-background border border-border/60 text-foreground text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-primary shadow-sm appearance-none">
            <option>Academic Year: 2024-25</option>
            <option>Academic Year: 2023-24</option>
          </select>
        </div>
      </div>

      {/* Department Scorecards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayDepts.length === 0 ? (
          <div className="col-span-full py-10 text-center text-muted-foreground bg-card border border-border/40 rounded-2xl">
            No departments or students found in the database.
          </div>
        ) : displayDepts.map((dept) => {
          const Icon = dept.icon;
          return (
            <div key={dept.id} className="bg-card border border-border/40 rounded-2xl p-5 shadow-sm group hover:border-primary/50 transition-colors cursor-pointer flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0
                  ${dept.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-500' : ''}
                  ${dept.color === 'blue' ? 'bg-blue-500/10 text-blue-500' : ''}
                  ${dept.color === 'orange' ? 'bg-orange-500/10 text-orange-500' : ''}
                  ${dept.color === 'indigo' ? 'bg-indigo-500/10 text-indigo-500' : ''}
                `}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest bg-muted px-2 py-0.5 rounded-md">
                  {dept.id}
                </span>
              </div>
              
              <div className="flex-1">
                <h3 className="text-base font-bold text-foreground leading-tight mb-1">{dept.name}</h3>
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">{dept.head}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Placement Rate</span>
                  <div className="flex items-end gap-1.5">
                    <span className="text-2xl font-bold text-foreground leading-none">{dept.placementRate}%</span>
                  </div>
                  <div className="w-full h-1 bg-muted rounded-full overflow-hidden mt-1.5">
                    <div 
                      className={`h-full rounded-full ${dept.placementRate > 80 ? 'bg-emerald-500' : dept.placementRate > 70 ? 'bg-blue-500' : 'bg-amber-500'}`} 
                      style={{ width: `${dept.placementRate}%` }} 
                    />
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Eligible Pool</span>
                  <div className="flex items-end gap-1.5">
                    <span className="text-2xl font-bold text-foreground leading-none">{dept.students}</span>
                  </div>
                  <span className="text-[10px] font-semibold text-muted-foreground mt-1">Placed: {dept.placed}</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-border/40 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Top Assessed Skill</span>
                  <span className="text-xs font-bold text-foreground mt-0.5">{dept.topSkill}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Comparative Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Comparison Chart */}
        <div className="lg:col-span-2 bg-card border border-border/40 rounded-2xl p-6 shadow-sm flex flex-col min-h-[400px]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-bold text-foreground">Department Performance Comparison</h3>
            </div>
          </div>
          
          <div className="flex-1 w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.4} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12, fontWeight: 600 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                />
                <Tooltip 
                  cursor={{ fill: 'hsl(var(--muted)/0.5)' }}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    borderColor: 'hsl(var(--border))',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px', fontWeight: 600 }} />
                <Bar dataKey="Assessments" fill="hsl(var(--muted-foreground)/0.3)" radius={[4, 4, 0, 0]} barSize={32} />
                <Bar dataKey="Internships" fill="hsl(var(--primary)/0.5)" radius={[4, 4, 0, 0]} barSize={32} />
                <Bar dataKey="Placements" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Insights & Alerts */}
        <div className="bg-card border border-border/40 rounded-2xl shadow-sm p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-bold text-foreground">AI Actionable Insights</h3>
          </div>
          
          <div className="flex flex-col gap-3 flex-1 overflow-y-auto">
            
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500 text-white text-[10px] font-bold shrink-0">1</span>
                <h4 className="text-sm font-bold text-emerald-700 dark:text-emerald-400">CS & IT Outperforming</h4>
              </div>
              <p className="text-xs font-semibold text-emerald-600/80 dark:text-emerald-500/80 leading-relaxed ml-7">
                Both departments are exceeding the 85% placement threshold. Strong adoption of Cloud and Full Stack assessments directly correlates with higher offers.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-500 text-white text-[10px] font-bold shrink-0">2</span>
                <h4 className="text-sm font-bold text-amber-700 dark:text-amber-400">Mechanical Gap Detected</h4>
              </div>
              <p className="text-xs font-semibold text-amber-600/80 dark:text-amber-500/80 leading-relaxed ml-7">
                Mechanical Engg has a 65% placement rate. The AI engine recommends mandating cross-functional IoT and Data Analysis modules to improve employability.
              </p>
              <button className="ml-7 mt-2 w-fit px-3 py-1.5 rounded-lg bg-amber-500 text-white text-[10px] font-bold shadow-sm hover:bg-amber-600 transition-colors">
                Deploy Remedial Courses
              </button>
            </div>

            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500 text-white text-[10px] font-bold shrink-0">3</span>
                <h4 className="text-sm font-bold text-blue-700 dark:text-blue-400">Internship Conversion</h4>
              </div>
              <p className="text-xs font-semibold text-blue-600/80 dark:text-blue-500/80 leading-relaxed ml-7">
                Electronics students with completed internships have a 92% chance of securing a PPO. Prioritize pre-final year internship drives for EC.
              </p>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
