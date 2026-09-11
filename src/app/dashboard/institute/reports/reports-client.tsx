"use client";

import { useState } from "react";
import {
  FileText,
  FileCheck2,
  FileSpreadsheet,
  Download,
  Calendar,
  Filter,
  CheckCircle2,
  Settings2,
  Layers,
  Sparkles
} from "lucide-react";

export function ReportsClient() {
  const [activeTab, setActiveTab] = useState<'compliance' | 'builder'>('compliance');

  return (
    <div className="flex flex-col gap-6 relative h-full">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Reports & Compliance</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Generate standardized compliance reports and build custom data exports.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1 bg-muted/30 rounded-xl w-fit border border-border/40">
        <button 
          onClick={() => setActiveTab('compliance')}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
            activeTab === 'compliance' 
              ? 'bg-background shadow-sm text-foreground border border-border/60' 
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent'
          }`}
        >
          1-Click Compliance
        </button>
        <button 
          onClick={() => setActiveTab('builder')}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
            activeTab === 'builder' 
              ? 'bg-background shadow-sm text-foreground border border-border/60' 
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent'
          }`}
        >
          Custom Report Builder
        </button>
      </div>

      {activeTab === 'compliance' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4">
          
          {/* NBA Format */}
          <div className="bg-card border border-border/40 rounded-2xl shadow-sm overflow-hidden flex flex-col group hover:border-primary/50 transition-colors">
            <div className="p-6 flex-1 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-2">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">NBA Format Report</h2>
                <p className="text-sm font-semibold text-muted-foreground mt-2 leading-relaxed">
                  National Board of Accreditation standardized format. Includes student-faculty ratios, placement statistics, and continuous improvement matrices.
                </p>
              </div>
              
              <div className="mt-4 flex flex-col gap-2 text-sm font-semibold text-foreground">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> CAY (Current Academic Year)
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> CAYm1 & CAYm2 Data
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Placement & Higher Studies (Criterion 4)
                </span>
              </div>
            </div>
            <div className="p-4 border-t border-border/40 bg-muted/20 flex gap-3">
              <button className="flex-1 py-2.5 rounded-xl bg-background border border-border/60 text-foreground font-bold text-sm shadow-sm hover:bg-muted transition-colors flex items-center justify-center gap-2">
                <Download className="w-4 h-4" /> PDF
              </button>
              <button className="flex-1 py-2.5 rounded-xl bg-background border border-border/60 text-foreground font-bold text-sm shadow-sm hover:bg-muted transition-colors flex items-center justify-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-emerald-500" /> Excel
              </button>
            </div>
          </div>

          {/* NAAC Format */}
          <div className="bg-card border border-border/40 rounded-2xl shadow-sm overflow-hidden flex flex-col group hover:border-primary/50 transition-colors relative">
            <div className="absolute top-4 right-4 px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Recommended
            </div>
            <div className="p-6 flex-1 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-2">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">NAAC SSR Data</h2>
                <p className="text-sm font-semibold text-muted-foreground mt-2 leading-relaxed">
                  Self Study Report data points for National Assessment and Accreditation Council. Focuses on student progression and alumni engagement.
                </p>
              </div>
              
              <div className="mt-4 flex flex-col gap-2 text-sm font-semibold text-foreground">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Criteria 5.2.1: Placements
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Criteria 5.2.2: Competitive Exams
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Alumni Contributions
                </span>
              </div>
            </div>
            <div className="p-4 border-t border-border/40 bg-muted/20 flex gap-3">
              <button className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                <Download className="w-4 h-4" /> Generate Report
              </button>
            </div>
          </div>

          {/* NIRF Format */}
          <div className="bg-card border border-border/40 rounded-2xl shadow-sm overflow-hidden flex flex-col group hover:border-primary/50 transition-colors">
            <div className="p-6 flex-1 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center mb-2">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">NIRF Ranking Data</h2>
                <p className="text-sm font-semibold text-muted-foreground mt-2 leading-relaxed">
                  Data points aligned with National Institutional Ranking Framework. Highly focused on median salary, graduations, and PhD student counts.
                </p>
              </div>
              
              <div className="mt-4 flex flex-col gap-2 text-sm font-semibold text-foreground">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Median Salary of Placed Grads
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Total Students Admitted vs Graduated
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 3-Year Aggregated Data
                </span>
              </div>
            </div>
            <div className="p-4 border-t border-border/40 bg-muted/20 flex gap-3">
              <button className="flex-1 py-2.5 rounded-xl bg-background border border-border/60 text-foreground font-bold text-sm shadow-sm hover:bg-muted transition-colors flex items-center justify-center gap-2">
                <Download className="w-4 h-4" /> PDF
              </button>
              <button className="flex-1 py-2.5 rounded-xl bg-background border border-border/60 text-foreground font-bold text-sm shadow-sm hover:bg-muted transition-colors flex items-center justify-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-emerald-500" /> Excel
              </button>
            </div>
          </div>

        </div>
      ) : (
        <div className="bg-card border border-border/40 rounded-2xl shadow-sm flex flex-col lg:flex-row overflow-hidden min-h-[500px] animate-in fade-in slide-in-from-bottom-4">
          
          {/* Builder Sidebar */}
          <div className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-border/40 bg-muted/10 p-6 flex flex-col gap-6">
            <div>
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Settings2 className="w-5 h-5 text-primary" /> Configuration
              </h3>
              
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Date Range</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <select className="w-full pl-9 pr-4 py-2.5 bg-background border border-border/60 rounded-xl text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-primary appearance-none">
                      <option>Last 12 Months</option>
                      <option>Academic Year 23-24</option>
                      <option>Custom Range...</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Departments</label>
                  <div className="p-3 bg-background border border-border/60 rounded-xl flex flex-col gap-2">
                    <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
                      <input type="checkbox" className="rounded accent-primary w-4 h-4" defaultChecked />
                      Computer Science
                    </label>
                    <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
                      <input type="checkbox" className="rounded accent-primary w-4 h-4" defaultChecked />
                      Electronics & Comm.
                    </label>
                    <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
                      <input type="checkbox" className="rounded accent-primary w-4 h-4" defaultChecked />
                      Mechanical Engg
                    </label>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Data Points</label>
                  <div className="p-3 bg-background border border-border/60 rounded-xl flex flex-col gap-2">
                    <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
                      <input type="checkbox" className="rounded accent-primary w-4 h-4" defaultChecked />
                      Student Demographics
                    </label>
                    <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
                      <input type="checkbox" className="rounded accent-primary w-4 h-4" defaultChecked />
                      Verified Skills Score
                    </label>
                    <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
                      <input type="checkbox" className="rounded accent-primary w-4 h-4" defaultChecked />
                      Placement Offers
                    </label>
                    <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
                      <input type="checkbox" className="rounded accent-primary w-4 h-4" />
                      Internship Details
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Builder Preview */}
          <div className="flex-1 p-6 flex flex-col items-center justify-center bg-muted/5 text-center relative">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
              <FileSpreadsheet className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Ready to Build</h3>
            <p className="text-sm font-semibold text-muted-foreground max-w-sm mb-8 leading-relaxed">
              Based on your selection, this report will generate approximately <strong>1,240 rows</strong> across <strong>14 columns</strong>.
            </p>
            
            <div className="flex gap-4">
              <button className="px-6 py-3 rounded-xl bg-background border border-border/60 text-foreground font-bold shadow-sm hover:bg-muted transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" /> Export CSV
              </button>
              <button className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold shadow-sm hover:bg-primary/90 transition-colors flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4" /> Generate Excel
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
