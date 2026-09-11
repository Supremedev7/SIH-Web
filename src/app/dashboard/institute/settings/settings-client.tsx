"use client";

import { useState } from "react";
import {
  Building2,
  Users,
  Webhook,
  Camera,
  ShieldCheck,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  Copy,
  UserPlus
} from "lucide-react";

export function SettingsClient({ initialProfile }: { initialProfile?: any }) {
  const [activeTab, setActiveTab] = useState<'profile' | 'roles' | 'api'>('profile');
  const institutionName = initialProfile?.full_name || 'National Institute of Technology';
  const bio = initialProfile?.bio || 'Established in 1960, NIT is an institute of national importance...';
  const avatarUrl = initialProfile?.avatar_url;


  return (
    <div className="flex flex-col gap-6 relative h-full">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Institution Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage university branding, faculty access roles, and system integrations.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 px-6 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-semibold transition-colors shadow-sm">
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mt-2">
        
        {/* Settings Navigation Sidebar */}
        <div className="w-full lg:w-64 flex flex-col gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-left
              ${activeTab === 'profile' 
                ? 'bg-background border border-border/60 text-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent'}
            `}
          >
            <Building2 className="w-4 h-4" />
            University Profile
          </button>

          <button
            onClick={() => setActiveTab('roles')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-left
              ${activeTab === 'roles' 
                ? 'bg-background border border-border/60 text-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent'}
            `}
          >
            <Users className="w-4 h-4" />
            Role Management
          </button>

          <button
            onClick={() => setActiveTab('api')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-left
              ${activeTab === 'api' 
                ? 'bg-background border border-border/60 text-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent'}
            `}
          >
            <Webhook className="w-4 h-4" />
            API & Integrations
          </button>
        </div>

        {/* Settings Content Area */}
        <div className="flex-1 bg-card border border-border/40 rounded-2xl shadow-sm p-6 lg:p-8 animate-in fade-in">
          
          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="flex flex-col gap-8">
              <div>
                <h2 className="text-lg font-bold text-foreground mb-1">University Branding</h2>
                <p className="text-sm font-semibold text-muted-foreground">Manage your institution's public profile and crest.</p>
              </div>

              <div className="flex items-center gap-6">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-full bg-muted border-2 border-border/60 overflow-hidden flex items-center justify-center">
                    {avatarUrl ? (
                       <img src={avatarUrl} alt="Institution Logo" className="w-full h-full object-cover" />
                    ) : (
                       <Building2 className="w-8 h-8 text-muted-foreground" />
                    )}
                  </div>
                  <button className="absolute bottom-0 right-0 p-2 rounded-full bg-primary text-primary-foreground shadow-md hover:scale-105 transition-transform border-2 border-card">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold text-foreground">Institution Crest / Logo</span>
                  <span className="text-xs font-semibold text-muted-foreground">Recommended size: 256x256px (PNG or SVG)</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Institution Name</label>
                  <input 
                    type="text" 
                    defaultValue={institutionName}
                    className="w-full px-4 py-2 bg-background border border-border/60 rounded-xl text-sm font-semibold text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Institution Code (AISHE/NIRF)</label>
                  <input 
                    type="text" 
                    defaultValue="U-0133"
                    className="w-full px-4 py-2 bg-muted/40 border border-border/60 rounded-xl text-sm font-mono text-muted-foreground cursor-not-allowed"
                    readOnly
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">About Institution</label>
                <textarea 
                  rows={4}
                  defaultValue={bio}
                  className="w-full px-4 py-3 bg-background border border-border/60 rounded-xl text-sm font-semibold text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                ></textarea>
              </div>

              <div className="w-full h-px bg-border/40 my-2"></div>

              <div>
                <h2 className="text-lg font-bold text-foreground mb-1">Leadership Desk</h2>
                <p className="text-sm font-semibold text-muted-foreground">Director/Chancellor message displayed on the public landing page.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Director Name</label>
                  <input 
                    type="text" 
                    placeholder="Dr. Full Name"
                    className="w-full px-4 py-2 bg-background border border-border/60 rounded-xl text-sm font-semibold text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Welcome Message</label>
                <textarea 
                  rows={3}
                  placeholder="Enter the welcome message..."
                  className="w-full px-4 py-3 bg-background border border-border/60 rounded-xl text-sm font-semibold text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                ></textarea>
              </div>

            </div>
          )}

          {/* ROLES TAB */}
          {activeTab === 'roles' && (
            <div className="flex flex-col gap-8">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-bold text-foreground mb-1">Faculty & Role Management</h2>
                  <p className="text-sm font-semibold text-muted-foreground">Invite faculty and assign department-level access.</p>
                </div>
                <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-background border border-border/60 text-foreground hover:bg-muted text-sm font-bold transition-colors shadow-sm">
                  <UserPlus className="w-4 h-4 text-primary" />
                  Invite Faculty
                </button>
              </div>

              <div className="border border-border/40 rounded-xl overflow-hidden bg-background">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-muted/30 border-b border-border/40 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                      <th className="px-4 py-3">Faculty Member</th>
                      <th className="px-4 py-3">Role / Permission Level</th>
                      <th className="px-4 py-3">Department Access</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/40">
                    <tr className="hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex flex-col">
                           <span className="text-sm font-bold text-foreground">Dr. A. K. Sharma</span>
                           <span className="text-xs font-semibold text-muted-foreground">ak.sharma@nit.edu</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-bold border border-primary/20">
                          <ShieldCheck className="w-3.5 h-3.5" /> HOD (Read/Write)
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-foreground">Computer Science</td>
                      <td className="px-4 py-3 text-right">
                        <button className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex flex-col">
                           <span className="text-sm font-bold text-foreground">R. Krishnan</span>
                           <span className="text-xs font-semibold text-muted-foreground">tpo@nit.edu</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-500 text-xs font-bold border border-purple-500/20">
                          <ShieldCheck className="w-3.5 h-3.5" /> TPO (Admin)
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-foreground">All Departments</td>
                      <td className="px-4 py-3 text-right">
                        <button className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* API & INTEGRATIONS TAB */}
          {activeTab === 'api' && (
            <div className="flex flex-col gap-8">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-bold text-foreground mb-1">API & ERP Integrations</h2>
                  <p className="text-sm font-semibold text-muted-foreground">Connect SCI portal data with your internal university ERP.</p>
                </div>
                <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-background border border-border/60 text-foreground hover:bg-muted text-sm font-bold transition-colors shadow-sm">
                  <Plus className="w-4 h-4 text-primary" />
                  Generate New Key
                </button>
              </div>

              <div className="p-6 rounded-xl border border-primary/30 bg-primary/5 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <Webhook className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-sm font-bold text-foreground">Master API Key</h3>
                    <span className="text-xs font-semibold text-muted-foreground">Created on Oct 12, 2024</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex-1 px-4 py-2.5 rounded-lg bg-background border border-border/60 text-sm font-mono text-muted-foreground flex items-center justify-between">
                    <span>sci_live_8f92jksdf834jksdf89...</span>
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 uppercase">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Active
                    </span>
                  </div>
                  <button className="p-2.5 rounded-lg bg-background border border-border/60 hover:bg-muted text-foreground transition-colors shadow-sm">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-widest">Active Webhooks</h3>
                
                <div className="p-4 rounded-xl border border-border/40 bg-background flex items-center justify-between group">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold text-foreground">Student Registration Sync</span>
                    <span className="text-xs font-mono text-muted-foreground">https://erp.nit.edu/api/webhooks/sci/sync</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      <span className="text-xs font-bold text-emerald-500">Listening</span>
                    </div>
                    <button className="text-xs font-bold text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:underline">
                      Revoke
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>

    </div>
  );
}
