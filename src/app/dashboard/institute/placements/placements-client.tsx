"use client";

import { useState } from "react";
import {
  Calendar as CalendarIcon,
  Filter,
  Plus,
  Briefcase,
  Search,
  Building,
  Target,
  ArrowRight,
  Clock,
  Download
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

const FUNNEL_DATA = [
  { stage: "Applied", count: 450, color: "hsl(var(--primary))" },
  { stage: "Online Test", count: 280, color: "hsl(var(--primary)/0.8)" },
  { stage: "Shortlisted", count: 120, color: "hsl(var(--primary)/0.6)" },
  { stage: "Interviews", count: 45, color: "hsl(var(--primary)/0.4)" },
  { stage: "Offered", count: 12, color: "hsl(var(--primary)/0.2)" },
];

export function PlacementsClient({ drives }: { drives: any[] }) {
  const [selectedDrive, setSelectedDrive] = useState(drives.length > 0 ? drives[0] : null);

  return (
    <div className="flex flex-col gap-6 relative h-full">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Placement & Drive Management</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Organize campus recruitment, track student applications, and monitor hiring funnels.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-background border border-border/60 text-foreground hover:bg-muted text-sm font-semibold transition-colors shadow-sm">
            <Download className="w-4 h-4" />
            <span>Drive Report</span>
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-semibold transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            <span>Create Drive</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Active Drives List */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          <div className="bg-card border border-border/40 rounded-2xl shadow-sm flex flex-col h-full overflow-hidden">
            <div className="p-4 border-b border-border/40 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-muted/20">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold text-foreground">Active Drives Table</h2>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder="Search company or role..." 
                    className="w-full pl-9 pr-4 py-1.5 bg-background border border-border/60 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>
                <button className="p-1.5 rounded-lg border border-border/60 bg-background text-muted-foreground hover:bg-muted transition-colors">
                  <Filter className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-muted/30 border-b border-border/40 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    <th className="px-6 py-3">Company & Role</th>
                    <th className="px-6 py-3">Eligibility</th>
                    <th className="px-6 py-3">CTC / Stipend</th>
                    <th className="px-6 py-3 text-center">Status</th>
                    <th className="px-6 py-3 text-right">Applied</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {drives.length === 0 ? (
                     <tr><td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">No drives found.</td></tr>
                  ) : drives.map((drive) => (
                    <tr 
                      key={drive.id}
                      className={`hover:bg-muted/30 transition-colors cursor-pointer ${selectedDrive?.id === drive.id ? 'bg-primary/5' : ''}`}
                      onClick={() => setSelectedDrive(drive)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-muted border border-border/60 flex items-center justify-center font-bold text-foreground text-sm shadow-sm shrink-0">
                            {drive.company.charAt(0)}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-sm font-bold text-foreground truncate">{drive.company}</span>
                            <span className="text-[10px] font-semibold text-muted-foreground truncate uppercase tracking-wider">{drive.role}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-mono text-muted-foreground font-semibold">{drive.eligibility}</td>
                      <td className="px-6 py-4 text-sm font-bold text-foreground">{drive.ctc}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider
                          ${drive.status === 'ongoing' ? 'bg-emerald-500/10 text-emerald-500' : 
                            drive.status === 'upcoming' ? 'bg-amber-500/10 text-amber-500' : 
                            'bg-muted text-muted-foreground'}
                        `}>
                          {drive.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex flex-col items-end">
                          <span className="text-sm font-bold text-foreground">{drive.applied}</span>
                          <span className="text-[10px] text-muted-foreground">{drive.shortlisted} short</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Analytics & Funnel */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Application Funnel */}
          {selectedDrive && (
          <div className="bg-card border border-border/40 rounded-2xl shadow-sm p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-foreground">Application Funnel</h3>
              <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md uppercase tracking-wider">
                {selectedDrive.company}
              </span>
            </div>
            
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={FUNNEL_DATA} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="hsl(var(--border))" opacity={0.4} />
                  <XAxis type="number" hide />
                  <YAxis dataKey="stage" type="category" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12, fontWeight: 600 }} width={80} />
                  <Tooltip 
                    cursor={{fill: 'hsl(var(--muted)/0.5)'}}
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '0.5rem', fontSize: '12px', fontWeight: 'bold' }}
                    itemStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={24}>
                    {FUNNEL_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border/40 mt-2">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Conversion Rate</span>
                <span className="text-lg font-bold text-foreground">2.6%</span>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground/50" />
              <div className="flex flex-col text-right">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Offers Generated</span>
                <span className="text-lg font-bold text-emerald-500">12</span>
              </div>
            </div>
          </div>
          )}

          {/* Drive Calendar Highlights */}
          <div className="bg-card border border-border/40 rounded-2xl shadow-sm p-5 flex flex-col gap-4 flex-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold text-foreground">Upcoming Schedule</h3>
              </div>
              <button className="text-xs font-bold text-primary hover:underline">View Calendar</button>
            </div>
            
            <div className="flex flex-col gap-3">
              {drives.slice(0,3).map((d: any, idx: number) => {
                 const date = new Date(d.date);
                 return (
                  <div key={idx} className="flex gap-4 group">
                    <div className="flex flex-col items-center mt-1 w-10 shrink-0">
                      <span className="text-xs font-bold text-primary uppercase">{date.toLocaleString('default', { month: 'short' })}</span>
                      <span className="text-xl font-bold text-foreground leading-none">{date.getDate()}</span>
                    </div>
                    <div className="flex-1 p-3 rounded-xl bg-muted/30 border border-border/40 group-hover:bg-muted/50 group-hover:border-primary/30 transition-colors">
                      <h4 className="text-sm font-bold text-foreground">{d.company} Drive</h4>
                      <div className="flex items-center gap-2 mt-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 10:00 AM</span>
                        <span className="flex items-center gap-1"><Building className="w-3 h-3" /> Campus</span>
                      </div>
                    </div>
                  </div>
                 )
              })}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
