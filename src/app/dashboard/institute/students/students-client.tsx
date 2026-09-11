"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Filter,
  MoreVertical,
  Download,
  Mail,
  GraduationCap,
  Briefcase,
  UserCheck,
  Building,
  Target,
  BadgeCheck,
  TrendingUp,
  X,
  ShieldCheck
} from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { verifyStudentSkills } from "@/lib/actions/profileActions";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

export function StudentsClient({ students }: { students: any[] }) {
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [isPending, startTransition] = useTransition();

  const handleVerify = (studentId: string) => {
    startTransition(async () => {
      try {
        await verifyStudentSkills(studentId, "institute");
        toast.success("Student skills verified successfully!");
      } catch (e: any) {
        toast.error(e.message || "Failed to verify skills");
      }
    });
  };

  const filteredStudents = useMemo(() => {
    return students.filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.id.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;
      if (filter === "All") return true;
      if (filter === "Placed" && s.status === "Placed") return true;
      if (filter === "Unplaced" && s.status !== "Placed" && s.status !== "Offered") return true;
      if (filter === "Computer Science" && s.department === "Computer Science") return true;
      return false;
    });
  }, [students, searchQuery, filter]);

  const getRadarData = (technicalSkills: any) => {
    const keys = Object.keys(technicalSkills || {}).slice(0, 6);
    if (keys.length === 0) {
      return [
        { subject: 'Data Structures', A: 0, fullMark: 100 },
        { subject: 'Algorithms', A: 0, fullMark: 100 },
        { subject: 'System Design', A: 0, fullMark: 100 },
        { subject: 'Cloud Tech', A: 0, fullMark: 100 },
        { subject: 'Web Dev', A: 0, fullMark: 100 },
        { subject: 'Soft Skills', A: 0, fullMark: 100 },
      ];
    }
    return keys.map(k => ({
      subject: k,
      A: technicalSkills[k].level === 'advanced' ? 90 : technicalSkills[k].level === 'intermediate' ? 60 : 30,
      fullMark: 100
    }));
  };

  return (
    <div className="flex flex-col gap-6 relative h-full">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Student Directory</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage, filter, and analyze the verified talent pool across all departments.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-background border border-border/60 text-foreground hover:bg-muted text-sm font-semibold transition-colors shadow-sm">
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-semibold transition-colors shadow-sm">
            <Mail className="w-4 h-4" />
            <span>Bulk Announce</span>
          </button>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-card border border-border/40 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search by name, ID..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-muted/40 border border-border/60 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <button onClick={() => setFilter("All")} className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${filter === "All" ? "bg-primary/10 text-primary border border-primary/20" : "bg-background border border-border/60 text-muted-foreground hover:bg-muted"}`}>
             All Students
          </button>
          <button onClick={() => setFilter("Computer Science")} className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${filter === "Computer Science" ? "bg-primary/10 text-primary border border-primary/20" : "bg-background border border-border/60 text-muted-foreground hover:bg-muted"}`}>
            Computer Science
          </button>
          <button onClick={() => setFilter("Placed")} className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${filter === "Placed" ? "bg-primary/10 text-primary border border-primary/20" : "bg-background border border-border/60 text-muted-foreground hover:bg-muted"}`}>
            Placed
          </button>
          <button onClick={() => setFilter("Unplaced")} className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1 ${filter === "Unplaced" ? "bg-primary/10 text-primary border border-primary/20" : "bg-background border border-border/60 text-muted-foreground hover:bg-muted"}`}>
            Unplaced <span className="w-2 h-2 rounded-full bg-amber-500 ml-1"></span>
          </button>
        </div>
      </div>

      {/* Advanced Data Table */}
      <div className="bg-card border border-border/40 rounded-2xl shadow-sm overflow-hidden flex-1">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/50 border-b border-border/40 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                <th className="px-6 py-4 w-12 text-center">
                  <input type="checkbox" className="rounded accent-primary w-4 h-4" />
                </th>
                <th className="px-6 py-4">Student Name</th>
                <th className="px-6 py-4">Roll Number</th>
                <th className="px-6 py-4">Department & Year</th>
                <th className="px-6 py-4">Placement Status</th>
                <th className="px-6 py-4">AI Score</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {filteredStudents.length === 0 ? (
                 <tr><td colSpan={7} className="px-6 py-8 text-center text-muted-foreground">No students found.</td></tr>
              ) : filteredStudents.map((student) => (
                <tr 
                  key={student.id} 
                  className="hover:bg-muted/30 transition-colors cursor-pointer"
                  onClick={() => setSelectedStudent(student)}
                >
                  <td className="px-6 py-4 text-center" onClick={(e) => e.stopPropagation()}>
                    <input type="checkbox" className="rounded accent-primary w-4 h-4" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full object-cover border border-border/60 shadow-sm bg-primary/10 flex items-center justify-center font-bold text-primary">
                        {student.name.charAt(0)}
                      </div>
                      <span className="font-bold text-sm text-foreground">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-mono text-muted-foreground">{student.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-foreground">{student.department}</span>
                      <span className="text-xs text-muted-foreground">{student.year}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {student.status === "Placed" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-500 text-xs font-bold">
                        <BadgeCheck className="w-3.5 h-3.5" />
                        Placed: {student.company}
                      </span>
                    )}
                    {student.status === "Interviewing" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-500 text-xs font-bold">
                        <Briefcase className="w-3.5 h-3.5" />
                        Interviewing
                      </span>
                    )}
                    {student.status === "Offered" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-500 text-xs font-bold">
                        <Target className="w-3.5 h-3.5" />
                        Offered: {student.company}
                      </span>
                    )}
                    {student.status === "Looking" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-500 text-xs font-bold">
                        <Search className="w-3.5 h-3.5" />
                        Active Seeker
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold font-mono">
                        {student.aiScore}
                      </div>
                      <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${student.aiScore}%` }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-muted-foreground hover:bg-background hover:text-foreground rounded-lg transition-colors border border-transparent hover:border-border/60">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        <div className="px-6 py-4 border-t border-border/40 bg-muted/20 flex items-center justify-between text-xs font-semibold text-muted-foreground">
          <span>Showing 1 to {filteredStudents.length} of {students.length} students</span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 rounded-lg border border-border/60 hover:bg-background transition-colors disabled:opacity-50">Previous</button>
            <button className="px-3 py-1.5 rounded-lg border border-border/60 hover:bg-background transition-colors">Next</button>
          </div>
        </div>
      </div>

      {/* Student 360-View Slide-out (Drawer) */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-background/90 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedStudent(null)}
          ></div>
          
          {/* Drawer */}
          <div className="relative w-full max-w-md h-full bg-card shadow-2xl border-l border-border/40 flex flex-col animate-in slide-in-from-right">
            {/* Drawer Header */}
            <div className="p-6 border-b border-border/40 flex items-start justify-between bg-muted/20">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold bg-primary/10 text-primary border-2 border-background shadow-md">
                   {selectedStudent.name.charAt(0)}
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-xl font-bold text-foreground">{selectedStudent.name}</h2>
                  <span className="text-xs font-mono font-bold text-primary px-2 py-0.5 rounded-md bg-primary/10 w-fit">{selectedStudent.id}</span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedStudent(null)}
                className="p-2 rounded-full hover:bg-muted text-muted-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8">
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-background border border-border/60 shadow-sm flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5" /> Department
                  </span>
                  <span className="text-sm font-semibold text-foreground mt-1">{selectedStudent.department || "Unknown"}</span>
                  <span className="text-xs text-muted-foreground">{selectedStudent.year || "Student"}</span>
                </div>
                <div className="p-4 rounded-xl bg-background border border-border/60 shadow-sm flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5" /> Placement
                  </span>
                  <span className="text-sm font-semibold text-foreground mt-1">{selectedStudent.status}</span>
                  <span className="text-xs text-muted-foreground">{selectedStudent.company}</span>
                </div>
              </div>

              {/* AI Radar Chart */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    AI Competency Radar
                  </h3>
                  <span className="text-[10px] font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded-md">Score: {selectedStudent.aiScore}</span>
                </div>
                <div className="h-64 w-full bg-background border border-border/60 rounded-xl shadow-sm p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={getRadarData(selectedStudent.technical_skills)}>
                      <PolarGrid stroke="hsl(var(--border))" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10, fontWeight: 600 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                      <Radar name="Student" dataKey="A" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 mt-auto">
                <button className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-all shadow-sm flex items-center justify-center gap-2">
                  <UserCheck className="w-4 h-4" /> View Full Portfolio
                </button>
                <button 
                  disabled={isPending}
                  onClick={() => handleVerify(selectedStudent.id)}
                  className="w-full py-3 rounded-xl bg-emerald-500/10 text-emerald-600 font-bold text-sm hover:bg-emerald-500/20 transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50">
                  <ShieldCheck className="w-4 h-4" /> {isPending ? "Verifying..." : "Verify Skills"}
                </button>
                <button className="w-full py-3 rounded-xl bg-background border border-border/60 text-foreground font-bold text-sm hover:bg-muted transition-all shadow-sm flex items-center justify-center gap-2">
                  <Briefcase className="w-4 h-4 text-muted-foreground" /> Assign to Drive
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
