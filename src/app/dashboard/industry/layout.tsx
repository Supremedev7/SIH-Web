"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  Search, 
  Bell, 
  ChevronDown, 
  Briefcase, 
  Terminal, 
  ShieldCheck, 
  Settings2,
  Home,
  MessageSquare,
  User,
  FileText,
  Users2,
  Activity,
  Factory,
  Map,
  Route,
  Award,
  BookOpen,
  Globe,
  Layers,
  Sun,
  Moon,
  ArrowRight,
  Building
} from "lucide-react";
import { DashboardFooter } from "@/components/layout/dashboard-footer";

const DASHBOARD_NAV = [
  {
    label: "Recruitment",
    href: "/dashboard/industry/opportunities",
    accentColor: "from-teal-600 to-emerald-600",
    spotlight: {
      badge: "Hiring",
      title: "Active Opportunities",
      description: "Manage your campus recruitment drives, active job postings, and internship slots.",
      metricValue: "24",
      metricLabel: "Active Postings",
      ctaText: "Post New",
      ctaHref: "/dashboard/industry/opportunities",
    },
    columns: [
      {
        title: "Operations",
        items: [
          { title: "Opportunities & Postings", href: "/dashboard/industry/opportunities", icon: Briefcase },
          { title: "Candidates & ATS", href: "/dashboard/industry/candidates", icon: Users2 },
          { title: "Talent Analytics", href: "/dashboard/industry/analytics", icon: Activity },
        ]
      }
    ]
  },
  {
    label: "Ecosystem",
    href: "/dashboard/industry/collaborations",
    accentColor: "from-blue-600 to-indigo-600",
    spotlight: {
      badge: "Partnerships",
      title: "Academic Ties",
      description: "Foster innovation through joint labs, hackathons, and faculty mentorships.",
      metricValue: "62",
      metricLabel: "Connected Institutes",
      ctaText: "View Network",
      ctaHref: "/dashboard/industry/collaborations",
    },
    columns: [
      {
        title: "Collaboration",
        items: [
          { title: "Academic Programs", href: "/dashboard/industry/collaborations", icon: Building },
          { title: "Mentorship Network", href: "/dashboard/industry/mentorship", icon: Users2 },
        ]
      }
    ]
  }
];

export default function IndustryDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans relative z-10 selection:bg-foreground selection:text-background role-industry">
      
      {/* MEGA NAVBAR STYLE HEADER */}
      <header className="sticky top-0 z-50 w-full glass-navbar border-b border-border/40 transition-colors bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Left: Logo & Search */}
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link href="/dashboard/industry" className="flex items-center gap-3 group">
              <div className="relative flex h-8 w-8 items-center justify-center group-hover:scale-105 transition-transform overflow-hidden shrink-0">
                <Image src="/logo.png" alt="SCI Logo" fill className="object-contain" sizes="32px" priority />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm tracking-tight text-foreground group-hover:text-primary transition-colors">
                  SCI
                </span>
                <span className="text-[10px] text-primary font-semibold leading-none hidden sm:block">
                  Industry
                </span>
              </div>
            </Link>

            {/* Search Bar */}
            <div className="hidden lg:block relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search candidates, skills..." 
                className="w-full h-9 pl-9 pr-4 text-sm bg-muted/50 border border-border/60 rounded-full placeholder:text-muted-foreground text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary focus:bg-background transition-all"
              />
            </div>
          </div>

          {/* Center: Mega Navigation Links */}
          <nav className="hidden md:flex items-center gap-2">
            {DASHBOARD_NAV.map((config, idx) => (
              <DashboardMegaMenu 
                key={idx} 
                config={config} 
                current={pathname.includes(config.href)} 
              />
            ))}
            <Link 
              href="/dashboard/industry/messaging" 
              className={`flex items-center gap-1 px-3.5 py-2 text-sm font-medium rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                pathname.includes('/messaging')
                  ? "text-primary bg-primary/10 font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              }`}
            >
              Messages
            </Link>
          </nav>

          {/* Right: Notifications & Profile */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Notifications Dropdown */}
            <div className="relative group">
              <button className="relative p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted/60 transition-colors focus:outline-none">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-background"></span>
              </button>

              {/* Notification Popover */}
              <div className="absolute right-0 top-full mt-2 w-80 rounded-2xl border border-border bg-card shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 flex flex-col overflow-hidden">
                <div className="px-4 py-3 border-b border-border/40 flex items-center justify-between bg-muted/20">
                  <span className="text-sm font-bold text-foreground">Notifications</span>
                  <Link href="/dashboard/industry/notifications" className="text-[10px] font-semibold text-primary hover:underline">
                    View All
                  </Link>
                </div>
                
                <div className="flex flex-col max-h-[300px] overflow-y-auto">
                  {/* Sample Notification 1 */}
                  <Link href="/dashboard/industry/candidates" className="px-4 py-3 hover:bg-muted/50 border-b border-border/40 transition-colors flex gap-3 group/notif">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-500 mt-0.5">
                      <Users2 className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground group-hover/notif:text-primary transition-colors">New High Match Applicant</p>
                      <p className="text-[11px] text-muted-foreground line-clamp-2 mt-0.5">Raghav Patel applied for Software Engineering Intern with a 95% AI match score.</p>
                      <span className="text-[9px] font-medium text-muted-foreground mt-1 block">2 hours ago</span>
                    </div>
                  </Link>

                  {/* Sample Notification 2 */}
                  <Link href="/dashboard/industry/opportunities" className="px-4 py-3 hover:bg-muted/50 border-b border-border/40 transition-colors flex gap-3 group/notif">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 mt-0.5">
                      <Briefcase className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground group-hover/notif:text-primary transition-colors">Posting Expiring Soon</p>
                      <p className="text-[11px] text-muted-foreground line-clamp-2 mt-0.5">Your Cloud Architect posting is expiring in 3 days. Renew now?</p>
                      <span className="text-[9px] font-medium text-muted-foreground mt-1 block">5 hours ago</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Profile Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-2 p-1 pr-2 rounded-full border border-border/40 hover:bg-muted/50 transition-colors focus:outline-none">
                <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold font-mono">
                  PS
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground hidden sm:block" />
              </button>

              {/* Dropdown Menu */}
              <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-border bg-card shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 p-1 flex flex-col">
                <div className="px-3 py-2 border-b border-border/40 mb-1">
                  <p className="text-sm font-semibold text-foreground">Priya Sharma</p>
                  <p className="text-xs text-muted-foreground">Head of Campus Talent</p>
                </div>
                
                <DropdownItem href="/dashboard/industry/settings" icon={User} label="Company Profile" />
                <div className="h-px bg-border/40 my-1"></div>
                <DropdownItem href="/dashboard/industry/settings" icon={Settings2} label="Settings" />
              </div>
            </div>
          </div>
          
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full bg-background pb-20 md:pb-0 relative flex flex-col">
        <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-10 bg-[radial-gradient(at_15%_15%,_rgba(14,121,105,0.15)_0px,_transparent_50%),radial-gradient(at_85%_20%,_rgba(14,121,105,0.1)_0px,_transparent_50%),radial-gradient(at_50%_90%,_rgba(241,245,249,0.8)_0px,_transparent_70%)]" />
        
        <div className="relative z-10 max-w-7xl mx-auto w-full flex-1">
          {children}
        </div>
        
        <DashboardFooter portalName="Industry" />
      </main>

      {/* BottomNavBar (Mobile Only) */}
      <nav className="fixed bottom-0 w-full z-50 flex justify-around items-center px-2 py-2 bg-background/90 backdrop-blur-md border-t border-border/40 md:hidden pb-safe">
        <MobileNavItem href="/dashboard/industry" icon={Home} label="Home" current={pathname === "/dashboard/industry"} />
        <MobileNavItem href="/dashboard/industry/opportunities" icon={Briefcase} label="Postings" current={pathname.includes("/opportunities")} />
        <MobileNavItem href="/dashboard/industry/candidates" icon={Users2} label="ATS" current={pathname.includes("/candidates")} />
        <MobileNavItem href="/dashboard/industry/messaging" icon={MessageSquare} label="Chats" current={pathname.includes("/messaging")} />
        <MobileNavItem href="/dashboard/industry/settings" icon={Settings2} label="Settings" current={pathname.includes("/settings")} />
      </nav>
    </div>
  );
}

function DashboardMegaMenu({ config, current }: { config: any, current: boolean }) {
  return (
    <div className="group relative">
      <Link
        href={config.href}
        className={`peer flex items-center gap-1 px-3.5 py-2 text-sm font-medium rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
          current
            ? "text-primary bg-primary/10 font-semibold"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
        }`}
      >
        {config.label}
        <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180 opacity-70" />
      </Link>

      {/* Hover Bridge & Popover Container */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out z-50 w-[850px] max-w-[90vw]">
        
        {/* Popover Card */}
        <div className="rounded-3xl shadow-2xl bg-popover border border-border overflow-hidden flex flex-col p-2">
          
          <div className="flex bg-card rounded-2xl overflow-hidden border border-border/40">
            {/* Left Pane (Spotlight) - 35% */}
            <div className="w-[35%] p-8 bg-muted/30 flex flex-col justify-between border-r border-border/40 relative overflow-hidden">
              <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl opacity-20 rounded-full bg-gradient-to-br ${config.accentColor}`} />
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`h-2.5 w-2.5 rounded-full bg-gradient-to-r ${config.accentColor}`} />
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/25">
                    {config.spotlight.badge}
                  </span>
                </div>
                <h4 className="text-xl font-bold tracking-tight text-foreground mb-3">
                  {config.spotlight.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {config.spotlight.description}
                </p>
              </div>

              <div className="relative z-10 space-y-4">
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-black tracking-tighter text-foreground">
                    {config.spotlight.metricValue}
                  </span>
                  <span className="text-xs text-muted-foreground font-medium pb-1.5">
                    {config.spotlight.metricLabel}
                  </span>
                </div>
                <Link
                  href={config.spotlight.ctaHref}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold py-3 px-4 shadow-md hover:bg-primary/90 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {config.spotlight.ctaText}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Right Pane (Links) - 65% */}
            <div className="w-[65%] p-8 bg-card">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-border/50">
                <h3 className="text-base font-bold tracking-tight text-foreground">
                  Explore {config.label}
                </h3>
                <Link
                  href={config.href}
                  className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 focus-visible:outline-none focus-visible:underline"
                >
                  View All <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              <div className={`grid gap-x-8 gap-y-6 ${config.columns.length > 2 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                {config.columns.map((col: any, colIdx: number) => (
                  <div key={colIdx} className="space-y-3">
                    <h4 className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground">
                      {col.title}
                    </h4>
                    <ul className="space-y-1">
                      {col.items.map((item: any, itemIdx: number) => {
                        const ItemIcon = item.icon;
                        return (
                          <li key={itemIdx}>
                            <Link
                              href={item.href}
                              className="group/link flex items-center gap-2.5 p-2 -mx-2 rounded-lg hover:bg-muted/50 transition-all focus-visible:outline-none focus-visible:bg-muted/50"
                            >
                              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border/40 bg-muted/30 text-muted-foreground group-hover/link:text-foreground group-hover/link:border-foreground/20 group-hover/link:bg-background transition-colors">
                                <ItemIcon className="h-3.5 w-3.5" />
                              </div>
                              <span className="text-sm font-medium text-muted-foreground group-hover/link:text-foreground group-hover/link:translate-x-1 transition-all">
                                {item.title}
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

function DropdownItem({ href, icon: Icon, label }: { href: string; icon: any; label: string }) {
  return (
    <Link 
      href={href}
      className="flex items-center gap-2.5 px-3 py-2 text-sm text-muted-foreground rounded-lg hover:bg-muted hover:text-foreground transition-colors"
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </Link>
  );
}

function MobileNavItem({ href, icon: Icon, label, current }: { href: string; icon: any; label: string; current: boolean }) {
  if (current) {
    return (
      <Link href={href} className="flex flex-col items-center justify-center text-primary bg-primary/10 rounded-xl px-3 py-1.5 active:scale-90 transition-all">
        <Icon className="w-5 h-5" style={{ strokeWidth: 2.5 }} />
        <span className="text-[10px] font-bold mt-1 tracking-wide">{label}</span>
      </Link>
    );
  }

  return (
    <Link href={href} className="flex flex-col items-center justify-center text-muted-foreground px-3 py-1.5 hover:text-foreground active:scale-90 transition-all">
      <Icon className="w-5 h-5" />
      <span className="text-[10px] font-semibold mt-1 tracking-wide">{label}</span>
    </Link>
  );
}
