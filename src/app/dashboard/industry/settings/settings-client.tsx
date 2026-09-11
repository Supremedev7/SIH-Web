"use client";

import {
  BadgeCheck,
  Eye,
  RefreshCw,
  Building,
  IdCard,
  Settings2,
  BellRing,
  Webhook,
  Edit2,
  Building2,
  Camera,
  ChevronDown,
  Plus,
  GraduationCap,
  Laptop,
  IndianRupee,
  Plane,
  Trash2,
  ImagePlus,
  UserPlus,
  Shield,
  CheckCircle2,
  MoreHorizontal,
  Code2,
  XCircle,
  Users,
  BrainCircuit,
  CloudCog,
  Settings,
  Copy,
  Check,
} from "lucide-react";

import type { UserProfile } from "@/types/industry-portal";

export function SettingsClient({ initialProfile }: { initialProfile?: UserProfile }) {
  const companyName = initialProfile?.full_name || 'Enterprise Settings';
  const industryDomain = initialProfile?.department || 'Technology';
  const bio = initialProfile?.bio || '';
  
  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full pb-20 relative">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-foreground">Company Settings & Employer Brand</h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-bold">
              <BadgeCheck className="w-3.5 h-3.5" />
              Tier-1 Partner
            </span>
          </div>
          <p className="text-sm text-muted-foreground">Manage enterprise corporate profile, recruiter access control, and SCI integration preferences.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-background border border-border/40 text-foreground hover:bg-muted transition-colors text-sm font-bold shadow-sm">
            <Eye className="w-4 h-4 text-muted-foreground" />
            <span>Public Talent Portal View</span>
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all text-sm font-bold shadow-sm">
            <RefreshCw className="w-4 h-4" />
            <span>Publish & Sync</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs / Sub-nav */}
      <div className="bg-muted/30 p-1.5 rounded-xl flex items-center gap-1 overflow-x-auto shadow-sm border border-border/40">
        <button className="px-4 py-2 rounded-lg bg-background text-primary font-bold text-sm shadow-sm flex items-center gap-2 whitespace-nowrap border border-border/40">
          <Building className="w-4 h-4" />
          <span>Corporate Branding</span>
          <span className="w-1.5 h-1.5 rounded-full bg-primary ml-1"></span>
        </button>
        <button className="px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors font-semibold text-sm flex items-center gap-2 whitespace-nowrap">
          <IdCard className="w-4 h-4" />
          <span>Team & RBAC Permissions</span>
        </button>
        <button className="px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors font-semibold text-sm flex items-center gap-2 whitespace-nowrap">
          <Settings2 className="w-4 h-4" />
          <span>AI Matching Weights</span>
        </button>
        <button className="px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors font-semibold text-sm flex items-center gap-2 whitespace-nowrap">
          <BellRing className="w-4 h-4" />
          <span>Notifications & Webhooks</span>
        </button>
        <button className="px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors font-semibold text-sm flex items-center gap-2 whitespace-nowrap">
          <Webhook className="w-4 h-4" />
          <span>API Keys & ATS Integrations</span>
        </button>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (Corporate Branding & Media) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Cover & Identity Card */}
          <div className="bg-card rounded-2xl shadow-sm border border-border/40 overflow-hidden flex flex-col">
            {/* Cover Banner */}
            <div className="relative w-full h-52 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200')" }}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button className="px-3 py-1.5 rounded-lg bg-black/50 backdrop-blur-md text-white text-xs font-bold hover:bg-black/70 flex items-center gap-1.5 transition-colors border border-white/20">
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Change Cover</span>
                </button>
              </div>
              <div className="absolute bottom-4 left-6 flex items-center gap-2 text-white">
                <Building2 className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-wider">Campus Headquarters: Pune & Bengaluru Labs</span>
              </div>
            </div>
            
            {/* Logo & Primary Details Bar */}
            <div className="p-6 pt-0 flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-12 gap-4">
                <div className="flex items-end gap-4">
                  <div className="relative w-24 h-24 rounded-2xl bg-card p-1.5 shadow-lg flex-shrink-0 border border-border/60">
                    <div className="w-full h-full rounded-xl bg-muted/50 flex items-center justify-center overflow-hidden border border-border/40">
                      {initialProfile?.avatar_url ? (
                        <img src={initialProfile.avatar_url} alt="Logo" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-3xl font-black text-primary">{companyName.substring(0, 2).toUpperCase()}</span>
                      )}
                    </div>
                    <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 shadow-md ring-2 ring-background">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex flex-col mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-foreground">{companyName}</span>
                      <BadgeCheck className="w-5 h-5 text-blue-500" />
                    </div>
                    <span className="text-sm font-semibold text-muted-foreground mt-0.5">{industryDomain}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-md bg-muted border border-border/40 font-mono text-xs font-bold text-muted-foreground">ID: SCI-ENT-4890</span>
                  <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-500 text-xs font-bold uppercase tracking-wider">Active Enterprise</span>
                </div>
              </div>
              
              {/* Profile Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Legal Entity Name</label>
                  <input className="w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-border/40 text-sm font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-primary shadow-sm" type="text" defaultValue={companyName} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Industry Domain</label>
                  <input className="w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-border/40 text-sm font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-primary shadow-sm" type="text" defaultValue={industryDomain} />
                </div>
                <div className="md:col-span-2 flex flex-col gap-1.5 mt-2">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Institution Overview & Talent Mission</label>
                  <textarea className="w-full p-4 rounded-xl bg-muted/30 border border-border/40 text-sm font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-primary shadow-sm resize-none" rows={3} defaultValue={bio || "Partnering with premier academic research cohorts across India and APAC."}></textarea>
                </div>
              </div>
              
              {/* Culture Perks & Badges */}
              <div className="flex flex-col gap-3 pt-4 border-t border-border/40 mt-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-foreground">Verified Employer Perks</span>
                  <button className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Perk</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/50 border border-border/40 text-xs font-bold text-foreground">
                    <GraduationCap className="w-4 h-4 text-primary" />
                    <span>M.Tech / MS Sponsorship</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/50 border border-border/40 text-xs font-bold text-foreground">
                    <Laptop className="w-4 h-4 text-primary" />
                    <span>Dedicated Compute GPU Clusters</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/50 border border-border/40 text-xs font-bold text-foreground">
                    <IndianRupee className="w-4 h-4 text-primary" />
                    <span>Tier-1 Fellowship Stipends</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/50 border border-border/40 text-xs font-bold text-foreground">
                    <Plane className="w-4 h-4 text-primary" />
                    <span>Global R&D Exchanges</span>
                  </span>
                </div>
              </div>
              
              {/* Campus Showcase Gallery */}
              <div className="flex flex-col gap-3 pt-4 border-t border-border/40 mt-2">
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <span className="text-sm font-bold text-foreground block mb-0.5">Campus Showcase Gallery</span>
                    <p className="text-xs text-muted-foreground">Visual media showcased to university talent on the SCI Career Discovery Hub.</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-muted-foreground bg-muted px-2 py-1 rounded-md">3 / 8 uploaded</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="relative h-28 rounded-xl overflow-hidden group border border-border/40">
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt="Lab 1" src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 rounded-full bg-destructive/90 text-white hover:bg-destructive shadow-md">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="relative h-28 rounded-xl overflow-hidden group border border-border/40">
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt="Lab 2" src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 rounded-full bg-destructive/90 text-white hover:bg-destructive shadow-md">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <button className="h-28 rounded-xl bg-muted/30 border-2 border-dashed border-border/60 hover:bg-muted/50 hover:border-primary/50 flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-primary transition-all cursor-pointer">
                    <ImagePlus className="w-6 h-6" />
                    <span className="text-xs font-bold">Upload Asset</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Team Management & RBAC Table */}
          <div className="bg-card rounded-2xl shadow-sm border border-border/40 p-6 flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-foreground">Authorized Team Members & RBAC</h3>
                  <span className="px-2 py-0.5 rounded-md bg-muted border border-border/40 text-xs font-bold text-muted-foreground">3 Active Users</span>
                </div>
                <p className="text-xs text-muted-foreground">Control recruiter visibility, offer dispatch privileges, and hackathon judging rights.</p>
              </div>
              <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all text-sm font-bold shadow-sm shrink-0">
                <UserPlus className="w-4 h-4" />
                <span>Invite Team Member</span>
              </button>
            </div>
            
            {/* RBAC Data Table */}
            <div className="overflow-x-auto rounded-xl border border-border/40">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-muted/50 border-b border-border/40 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    <th className="px-4 py-3">Member</th>
                    <th className="px-4 py-3">Assigned Role</th>
                    <th className="px-4 py-3 text-center">ATS Access</th>
                    <th className="px-4 py-3 text-center">Extend Offers</th>
                    <th className="px-4 py-3 text-center">Hackathons</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary/20 text-primary font-bold text-sm flex items-center justify-center shrink-0 border border-primary/20">PS</div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-sm font-bold text-foreground truncate">Priya Sharma</span>
                          <span className="text-[10px] font-semibold text-muted-foreground truncate">priya.sharma@tcs.com</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-blue-500/10 text-blue-500 text-[10px] font-bold uppercase tracking-wider">
                        <Shield className="w-3 h-3" />
                        Admin / Owner
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center"><CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                    <td className="px-4 py-3 text-center"><CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                    <td className="px-4 py-3 text-center"><CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                    <td className="px-4 py-3 text-right">
                      <button className="p-1.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"><MoreHorizontal className="w-4 h-4" /></button>
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-muted text-muted-foreground font-bold text-sm flex items-center justify-center shrink-0 border border-border/40">VR</div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-sm font-bold text-foreground truncate">Vikram Rao</span>
                          <span className="text-[10px] font-semibold text-muted-foreground truncate">vikram.rao@tcs.com</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-muted border border-border/40 text-muted-foreground text-[10px] font-bold uppercase tracking-wider">
                        <Code2 className="w-3 h-3" />
                        Technical Evaluator
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center"><CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                    <td className="px-4 py-3 text-center"><XCircle className="w-5 h-5 text-muted-foreground/50 mx-auto" /></td>
                    <td className="px-4 py-3 text-center"><CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                    <td className="px-4 py-3 text-right">
                      <button className="p-1.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"><MoreHorizontal className="w-4 h-4" /></button>
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-muted text-muted-foreground font-bold text-sm flex items-center justify-center shrink-0 border border-border/40">AJ</div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-sm font-bold text-foreground truncate">Ananya Joshi</span>
                          <span className="text-[10px] font-semibold text-muted-foreground truncate">ananya.joshi@tcs.com</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-muted border border-border/40 text-muted-foreground text-[10px] font-bold uppercase tracking-wider">
                        <Users className="w-3 h-3" />
                        Recruiter
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center"><CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                    <td className="px-4 py-3 text-center"><CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                    <td className="px-4 py-3 text-center"><XCircle className="w-5 h-5 text-muted-foreground/50 mx-auto" /></td>
                    <td className="px-4 py-3 text-right">
                      <button className="p-1.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"><MoreHorizontal className="w-4 h-4" /></button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column (AI Weights & Webhook Integration) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* AI Match Scoring Weights */}
          <div className="bg-card rounded-2xl shadow-sm border border-border/40 p-6 flex flex-col gap-6">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-primary" />
                <h3 className="text-sm font-bold text-foreground">AI Matching Weights</h3>
              </div>
              <span className="px-2 py-1 rounded-md bg-primary/10 text-primary text-[10px] font-bold font-mono tracking-wider">100% Total</span>
            </div>
            <p className="text-xs text-muted-foreground -mt-3">Calibrate how the SCI AI Match Index ranks applicant cohorts against your enterprise criteria.</p>
            
            <div className="flex flex-col gap-5">
              {/* Weight 1 */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-foreground">Technical Assessment</span>
                  <span className="font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded">40%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden cursor-pointer border border-border/40">
                  <div className="h-full bg-primary rounded-full w-[40%]"></div>
                </div>
                <span className="text-[10px] font-semibold text-muted-foreground">Automated coding, algorithms & system test results</span>
              </div>
              
              {/* Weight 2 */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-foreground">Verified Code Repositories</span>
                  <span className="font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded">30%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden cursor-pointer border border-border/40">
                  <div className="h-full bg-primary rounded-full w-[30%]"></div>
                </div>
                <span className="text-[10px] font-semibold text-muted-foreground">GitHub/GitLab production PRs, forks, commit frequency</span>
              </div>
              
              {/* Weight 3 */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-foreground">Academic Transcript & GPA</span>
                  <span className="font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded">20%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden cursor-pointer border border-border/40">
                  <div className="h-full bg-primary rounded-full w-[20%]"></div>
                </div>
                <span className="text-[10px] font-semibold text-muted-foreground">Institutional NIRF percentile & semester transcript</span>
              </div>
              
              {/* Weight 4 */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-foreground">Hackathons & Collabs</span>
                  <span className="font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded">10%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden cursor-pointer border border-border/40">
                  <div className="h-full bg-primary rounded-full w-[10%]"></div>
                </div>
                <span className="text-[10px] font-semibold text-muted-foreground">SCI Smart India Hackathon awards & collaborative builds</span>
              </div>
            </div>
            
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 flex items-start gap-3 mt-2">
              <BrainCircuit className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-foreground">High Sensitivity Preset</span>
                <span className="text-[10px] font-semibold text-muted-foreground">Rankings prioritize verified repo contributions and live technical test output over raw university tier scores.</span>
              </div>
            </div>
          </div>

          {/* ATS Webhook & Live Synchronization */}
          <div className="bg-card rounded-2xl shadow-sm border border-border/40 p-6 flex flex-col gap-5">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-foreground">Enterprise ATS Integrations</h3>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Live Connected
              </span>
            </div>
            
            {/* Workday Sync Tile */}
            <div className="p-3 rounded-xl bg-muted/30 border border-border/40 flex items-center justify-between hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-background border border-border/40 flex items-center justify-center text-primary shadow-sm shrink-0">
                  <CloudCog className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-foreground">Workday Enterprise ATS</span>
                  <span className="text-[10px] font-semibold text-muted-foreground">Synced 4 mins ago · Webhook active</span>
                </div>
              </div>
              <button className="p-2 rounded-lg text-muted-foreground hover:bg-background hover:text-foreground shadow-sm transition-colors border border-transparent hover:border-border/40">
                <Settings className="w-4 h-4" />
              </button>
            </div>
            
            {/* Greenhouse Sync Tile */}
            <div className="p-3 rounded-xl bg-muted/30 border border-border/40 flex items-center justify-between hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-background border border-border/40 flex items-center justify-center text-primary shadow-sm shrink-0">
                  <Webhook className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-foreground">Greenhouse ATS</span>
                  <span className="text-[10px] font-semibold text-muted-foreground">Secondary pipeline mapped</span>
                </div>
              </div>
              <button className="p-2 rounded-lg text-muted-foreground hover:bg-background hover:text-foreground shadow-sm transition-colors border border-transparent hover:border-border/40">
                <Settings className="w-4 h-4" />
              </button>
            </div>
            
            {/* Secret Key Token Strip */}
            <div className="flex flex-col gap-2 mt-2 pt-4 border-t border-border/40">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Production Webhook Secret</span>
                <button className="text-[10px] font-bold text-primary hover:underline">Regenerate</button>
              </div>
              <div className="px-3 py-2.5 rounded-xl bg-muted/50 border border-border/40 flex items-center justify-between font-mono text-xs font-bold text-foreground">
                <span>sci_live_sec_994x****3a7f</span>
                <button className="text-muted-foreground hover:text-primary transition-colors p-1" title="Copy to clipboard">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Sticky Bottom Save Action Bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-8 z-40 bg-card border border-border/40 p-3 sm:p-4 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center gap-4 sm:gap-8 min-w-[320px] max-w-2xl w-max animate-in slide-in-from-bottom-8">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse shrink-0"></span>
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 text-center sm:text-left">
            <span className="text-sm font-bold text-foreground">Unsaved modifications detected</span>
            <span className="hidden sm:block text-muted-foreground/40">•</span>
            <span className="text-[10px] font-semibold text-muted-foreground">AI matching profile updated across 4 parameters</span>
          </div>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-muted hover:bg-muted/80 text-foreground text-xs font-bold transition-colors">
            Discard
          </button>
          <button className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 whitespace-nowrap">
            <Check className="w-3.5 h-3.5" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

    </div>
  );
}
