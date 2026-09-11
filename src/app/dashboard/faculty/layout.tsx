"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  Search, 
  Bell, 
  ChevronDown, 
  Settings2,
  Home,
  MessageSquare,
  User,
  Sun,
  Moon,
  ArrowRight,
  GraduationCap,
  Briefcase,
  BookOpen,
  Microscope,
  Handshake,
  Users
} from "lucide-react";
import { DashboardFooter } from "@/components/layout/dashboard-footer";

const DASHBOARD_NAV = [
  {
    label: "Professional Growth",
    href: "/dashboard/faculty/internships",
    accentColor: "from-purple-600 to-indigo-600",
    spotlight: {
      badge: "Upskilling",
      title: "Industry Internships",
      description: "Gain hands-on experience through temporary industry roles or academic sabbaticals.",
      metricValue: "142",
      metricLabel: "Active Sabbaticals",
      ctaText: "Explore Roles",
      ctaHref: "/dashboard/faculty/internships",
    },
    columns: [
      {
        title: "Development",
        items: [
          { title: "Faculty Internships", href: "/dashboard/faculty/internships", icon: Briefcase },
          { title: "Development Programs (FDPs)", href: "/dashboard/faculty/fdps", icon: BookOpen },
        ]
      }
    ]
  },
  {
    label: "Industry Engagement",
    href: "/dashboard/faculty/consultancy",
    accentColor: "from-blue-600 to-purple-600",
    spotlight: {
      badge: "Consulting",
      title: "Consultancy & Research",
      description: "Offer your specialized expertise to MSMEs or partner on cutting-edge joint research.",
      metricValue: "85",
      metricLabel: "Open RFPs",
      ctaText: "View Projects",
      ctaHref: "/dashboard/faculty/consultancy",
    },
    columns: [
      {
        title: "Opportunities",
        items: [
          { title: "Consultancy Hub", href: "/dashboard/faculty/consultancy", icon: Handshake },
          { title: "Research & Innovation", href: "/dashboard/faculty/research", icon: Microscope },
        ]
      }
    ]
  },
  {
    label: "Mentorship",
    href: "/dashboard/faculty/workshops",
    accentColor: "from-indigo-600 to-violet-600",
    spotlight: {
      badge: "Give Back",
      title: "Host Workshops",
      description: "Share your knowledge by hosting technical webinars or mentoring students.",
      metricValue: "2.4k",
      metricLabel: "Students Reached",
      ctaText: "Schedule Event",
      ctaHref: "/dashboard/faculty/workshops",
    },
    columns: [
      {
        title: "Community",
        items: [
          { title: "Workshops & Events", href: "/dashboard/faculty/workshops", icon: Users },
          { title: "My Mentees", href: "/dashboard/faculty/mentorship", icon: GraduationCap },
        ]
      }
    ]
  }
];

export default function FacultyDashboardLayout({
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
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans relative z-10 selection:bg-foreground selection:text-background role-faculty">
      
      {/* MEGA NAVBAR */}
      <header className="sticky top-0 z-50 w-full glass-navbar border-b border-border/40 transition-colors bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Left: Logo & Search */}
          <div className="flex items-center gap-6">
            <Link href="/dashboard/faculty" className="flex items-center gap-3 group">
              <div className="relative flex h-8 w-8 items-center justify-center group-hover:scale-105 transition-transform overflow-hidden shrink-0">
                <Image src="/logo.png" alt="SCI Logo" fill className="object-contain" sizes="32px" priority />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm tracking-tight text-foreground group-hover:text-primary transition-colors">
                  SCI
                </span>
                <span className="text-[10px] text-primary font-semibold leading-none hidden sm:block">
                  Academician
                </span>
              </div>
            </Link>

            <div className="hidden lg:block relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search FDPs, research grants..." 
                className="w-full h-9 pl-9 pr-4 text-sm bg-muted/50 border border-border/60 rounded-full placeholder:text-muted-foreground text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary focus:bg-background transition-all"
              />
            </div>
          </div>

          {/* Center: Mega Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {DASHBOARD_NAV.map((config, idx) => (
              <DashboardMegaMenu 
                key={idx} 
                config={config} 
                current={pathname.includes(config.href)} 
              />
            ))}
          </nav>

          {/* Right: Notifications & Profile */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <div className="relative group">
              <button className="relative p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted/60 transition-colors focus:outline-none">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full ring-2 ring-background"></span>
              </button>
            </div>

            <div className="relative group">
              <button className="flex items-center gap-2 p-1 pr-2 rounded-full border border-border/40 hover:bg-muted/50 transition-colors focus:outline-none">
                <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold font-mono">
                  Dr
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground hidden sm:block" />
              </button>

              <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-border bg-card shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 p-1 flex flex-col">
                <div className="px-3 py-2 border-b border-border/40 mb-1">
                  <p className="text-sm font-semibold text-foreground">Dr. A. Kumar</p>
                  <p className="text-xs text-muted-foreground">Professor of CS</p>
                </div>
                
                <DropdownItem href="/dashboard/faculty/profile" icon={User} label="Academic Profile" />
                <div className="h-px bg-border/40 my-1"></div>
                <DropdownItem href="/dashboard/faculty/settings" icon={Settings2} label="Settings" />
              </div>
            </div>
          </div>
          
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full bg-background pb-20 md:pb-0 relative flex flex-col">
        <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-10 bg-[radial-gradient(at_85%_15%,_rgba(100,49,200,0.15)_0px,_transparent_50%),radial-gradient(at_15%_85%,_rgba(100,49,200,0.1)_0px,_transparent_50%)]" />
        
        <div className="relative z-10 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 w-full flex-1">
          {children}
        </div>
        
        <DashboardFooter portalName="Faculty" />
      </main>

      {/* Mobile Nav */}
      <nav className="fixed bottom-0 w-full z-50 flex justify-around items-center px-2 py-2 bg-background/90 backdrop-blur-md border-t border-border/40 md:hidden pb-safe">
        <MobileNavItem href="/dashboard/faculty" icon={Home} label="Home" current={pathname === "/dashboard/faculty"} />
        <MobileNavItem href="/dashboard/faculty/internships" icon={Briefcase} label="Sabbaticals" current={pathname.includes("/internships")} />
        <MobileNavItem href="/dashboard/faculty/consultancy" icon={Handshake} label="Consult" current={pathname.includes("/consultancy")} />
        <MobileNavItem href="/dashboard/faculty/research" icon={Microscope} label="Research" current={pathname.includes("/research")} />
        <MobileNavItem href="/dashboard/faculty/profile" icon={User} label="Profile" current={pathname.includes("/profile")} />
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
