"use client";

import { useState, useTransition } from "react";
import { 
  Settings2, 
  User, 
  Bell, 
  ShieldCheck, 
  Moon, 
  Sun,
  Laptop, 
  Save,
  LogOut,
  Smartphone
} from "lucide-react";
import { updateSettings, changePassword } from "@/lib/actions/settingsActions";
import { toast } from "sonner";
import type { SettingsPageProps } from "@/types/student-portal";
import { createClient } from "@/lib/supabase/client";

export function SettingsClient({ profile }: SettingsPageProps) {
  const [activeTab, setActiveTab] = useState("account");
  const [isPending, startTransition] = useTransition();
  const supabase = createClient();
  
  const [fullName, setFullName] = useState(profile?.full_name || "");
  const metadata = profile?.metadata as Record<string, any> || {};
  const [phone, setPhone] = useState(metadata.phone || profile?.phone || "");
  const [email, setEmail] = useState(metadata.email || profile?.email || "");
  
  const settings = metadata.settings || {};
  const [emailNotifs, setEmailNotifs] = useState(settings.emailNotifs ?? true);
  const [pushNotifs, setPushNotifs] = useState(settings.pushNotifs ?? true);
  const [smsNotifs, setSmsNotifs] = useState(settings.smsNotifs ?? false);

  const [newPassword, setNewPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const institution = profile?.institutions?.name || "Not Enrolled";

  const handleSaveAccount = () => {
    startTransition(async () => {
      try {
        await updateSettings({ phone, email_display: email });
        toast.success("Account details saved successfully");
      } catch (error: any) {
        toast.error(error.message || "Failed to save account details");
      }
    });
  };

  const handleSaveNotifications = () => {
    startTransition(async () => {
      try {
        await updateSettings({ emailNotifs, pushNotifs, smsNotifs });
        toast.success("Notification preferences updated");
      } catch (error: any) {
        toast.error(error.message || "Failed to update notifications");
      }
    });
  };

  const handlePasswordChange = () => {
    if (!newPassword || newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    
    startTransition(async () => {
      try {
        await changePassword(newPassword);
        toast.success("Password changed successfully");
        setIsChangingPassword(false);
        setNewPassword("");
      } catch (error: any) {
        toast.error(error.message || "Failed to change password");
      }
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  return (
    <div className="flex flex-col gap-8 py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black tracking-tight text-foreground flex items-center gap-3">
          <Settings2 className="w-8 h-8 text-primary" />
          Settings
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          Manage your account preferences, security, and notifications.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <nav className="flex flex-col gap-1">
            <button 
              onClick={() => setActiveTab("account")}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'account' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
            >
              <User className="w-4 h-4" /> Account Details
            </button>
            <button 
              onClick={() => setActiveTab("notifications")}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'notifications' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
            >
              <Bell className="w-4 h-4" /> Notifications
            </button>
            <button 
              onClick={() => setActiveTab("security")}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'security' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
            >
              <ShieldCheck className="w-4 h-4" /> Security & Privacy
            </button>
            <button 
              onClick={() => setActiveTab("preferences")}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'preferences' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
            >
              <Laptop className="w-4 h-4" /> App Preferences
            </button>
          </nav>
        </aside>

        {/* Content Area */}
        <div className="flex-1 bg-card border border-border/60 rounded-2xl p-6 md:p-8 shadow-sm">
          
          {activeTab === "account" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Account Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Full Name</label>
                  <input type="text" disabled value={fullName} className="w-full h-10 px-3 text-sm bg-muted border border-border/60 rounded-lg opacity-70 cursor-not-allowed" title="Name changes must be done via Profile" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email Address</label>
                  <input type="email" disabled value={email} className="w-full h-10 px-3 text-sm bg-muted border border-border/60 rounded-lg opacity-70 cursor-not-allowed" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Phone Number</label>
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full h-10 px-3 text-sm bg-muted/50 border border-border/60 rounded-lg focus:outline-none focus:border-primary transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Institution</label>
                  <input type="text" disabled value={institution} className="w-full h-10 px-3 text-sm bg-muted border border-border/60 rounded-lg opacity-70 cursor-not-allowed" />
                </div>
              </div>

              <div className="pt-6 border-t border-border/40 mt-6 flex justify-end">
                <button 
                  disabled={isPending}
                  onClick={handleSaveAccount}
                  className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {isPending ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Notification Preferences</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-border/60 rounded-xl hover:bg-muted/30 transition-colors">
                  <div>
                    <h4 className="font-semibold text-sm text-foreground">Email Notifications</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">Receive job matches and assessment results via email.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={emailNotifs} onChange={e => setEmailNotifs(e.target.checked)} className="sr-only peer" />
                    <div className="w-9 h-5 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-foreground after:border-border after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-border/60 rounded-xl hover:bg-muted/30 transition-colors">
                  <div>
                    <h4 className="font-semibold text-sm text-foreground">Push Notifications</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">Get real-time alerts in your browser.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={pushNotifs} onChange={e => setPushNotifs(e.target.checked)} className="sr-only peer" />
                    <div className="w-9 h-5 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-foreground after:border-border after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border border-border/60 rounded-xl hover:bg-muted/30 transition-colors">
                  <div>
                    <h4 className="font-semibold text-sm text-foreground">SMS Alerts</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">Critical updates like interview schedules sent to your phone.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={smsNotifs} onChange={e => setSmsNotifs(e.target.checked)} className="sr-only peer" />
                    <div className="w-9 h-5 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-foreground after:border-border after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>

              <div className="pt-6 border-t border-border/40 mt-6 flex justify-end">
                <button 
                  disabled={isPending}
                  onClick={handleSaveNotifications}
                  className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {isPending ? "Saving..." : "Save Preferences"}
                </button>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Security & Privacy</h2>
              
              <div className="space-y-4">
                <div className="p-5 border border-border/60 rounded-xl">
                  <h4 className="font-semibold text-sm text-foreground mb-1">Change Password</h4>
                  <p className="text-xs text-muted-foreground mb-4">Update your password to keep your account secure.</p>
                  
                  {isChangingPassword ? (
                    <div className="flex items-center gap-3 max-w-sm">
                      <input 
                        type="password" 
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        placeholder="New Password" 
                        className="flex-1 h-9 px-3 text-sm bg-muted/50 border border-border/60 rounded-lg focus:outline-none focus:border-primary transition-colors"
                      />
                      <button 
                        onClick={handlePasswordChange}
                        disabled={isPending}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-xs font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
                      >
                        Save
                      </button>
                      <button 
                        onClick={() => { setIsChangingPassword(false); setNewPassword(""); }}
                        className="px-4 py-2 border border-border rounded-lg text-xs font-semibold hover:bg-muted transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setIsChangingPassword(true)}
                      className="px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors"
                    >
                      Update Password
                    </button>
                  )}
                </div>

                <div className="p-5 border border-border/60 rounded-xl">
                  <h4 className="font-semibold text-sm text-foreground mb-1">Two-Factor Authentication (2FA)</h4>
                  <p className="text-xs text-muted-foreground mb-4">Add an extra layer of security using an authenticator app.</p>
                  <button className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-bold hover:bg-primary/20 transition-colors">
                    Enable 2FA
                  </button>
                </div>
              </div>

              <div className="pt-6 border-t border-border/40 mt-6">
                <button 
                  onClick={handleSignOut}
                  className="flex items-center gap-2 text-destructive hover:bg-destructive/10 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign out
                </button>
              </div>
            </div>
          )}

          {activeTab === "preferences" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-foreground mb-4">App Preferences</h2>
              
              <div className="p-5 border border-border/60 rounded-xl">
                <h4 className="font-semibold text-sm text-foreground mb-1">Theme Settings</h4>
                <p className="text-xs text-muted-foreground mb-4">You can change the active theme using the toggle in the navigation bar.</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 p-3 border border-border rounded-lg bg-muted/30">
                    <Sun className="w-5 h-5 text-muted-foreground hidden dark:block" />
                    <Moon className="w-5 h-5 text-muted-foreground block dark:hidden" />
                    <span className="text-sm font-medium text-foreground">Theme managed via Navbar</span>
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
