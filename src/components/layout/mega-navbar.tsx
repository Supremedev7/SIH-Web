"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth-store";
import { createClient } from "@/lib/supabase/client";
import { ROLE_DASHBOARD_PREFIX } from "@/lib/constants/roles";
import {
  MEGA_MENU_CONFIGS,
  type RoleMegaMenuConfig,
} from "@/lib/constants/public-navigation";
import {
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  Sun,
  Moon,
  LogOut,
} from "lucide-react";

export function MegaNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { user, isAuthenticated, clearSession } = useAuthStore();

  const handleSignOut = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {
      // ignore
    }
    clearSession();
    document.cookie = "sci-dev-role=; path=/; max-age=0; SameSite=Lax";
    router.push("/login");
    router.refresh();
  };

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

  // Close mobile menu on route change and blur focus-within elements
  useEffect(() => {
    setMobileOpen(false);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, [pathname]);

  // Close on ESC
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMobileOpen(false);
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
    <header className="sticky top-0 z-50 w-full glass-navbar border-b border-border/40 transition-colors bg-background/80 backdrop-blur-md">
      <div className="container mx-auto max-w-7xl flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex h-10 w-10 items-center justify-center group-hover:scale-105 transition-transform overflow-hidden shrink-0">
            <Image 
              src="/logo.png" 
              alt="SCI Logo" 
              fill
              className="object-contain"
              sizes="40px"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base tracking-tight text-foreground group-hover:text-primary transition-colors">
              SCI
            </span>
            <span className="text-[11px] text-muted-foreground leading-none font-medium hidden xs:block">
              Student Council of India
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-2">
          <Link
            href="/"
            className={`px-3.5 py-2 text-sm font-medium rounded-md transition-all ${
              pathname === "/"
                ? "text-primary bg-primary/10 font-semibold"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
            }`}
          >
            Overview
          </Link>

          {Object.entries(MEGA_MENU_CONFIGS).map(([key, config]) => {
            const isCurrentPage = pathname === config.href;
            return (
              <DesktopMegaMenu 
                key={key} 
                config={config} 
                isCurrentPage={isCurrentPage} 
              />
            );
          })}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">


          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <div className="hidden sm:flex items-center gap-2">
            <AuthActions 
              isAuthenticated={isAuthenticated} 
              user={user} 
              handleSignOut={handleSignOut} 
            />
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>

    <MobileDrawer 
      open={mobileOpen} 
      setOpen={setMobileOpen} 
      pathname={pathname}
      isAuthenticated={isAuthenticated}
      user={user}
      handleSignOut={handleSignOut}
    />
    </>
  );
}

// ==========================================
// Sub-Components
// ==========================================

function DesktopMegaMenu({ config, isCurrentPage }: { config: RoleMegaMenuConfig, isCurrentPage: boolean }) {
  return (
    <div className="group relative">
      <Link
        href={config.href}
        className={`peer flex items-center gap-1 px-3.5 py-2 text-sm font-medium rounded-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
          isCurrentPage
            ? "text-primary bg-primary/10 font-semibold"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
        }`}
        aria-expanded={false}
      >
        {config.navLabel}
        <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180 opacity-70" />
      </Link>

      {/* Hover Bridge & Popover Container */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all duration-200 ease-out z-50 w-[850px] max-w-[90vw]">
        
        {/* Popover Card */}
        <div className="rounded-2xl shadow-xl bg-popover border border-border/60 overflow-hidden flex flex-col p-1.5 backdrop-blur-xl">
          
          <div className="flex bg-card rounded-xl overflow-hidden border border-border/30">
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
                  Explore {config.navLabel}
                </h3>
                <Link
                  href={config.href}
                  className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 focus-visible:outline-none focus-visible:underline"
                >
                  View All <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              <div className={`grid gap-x-8 gap-y-6 ${config.columns.length > 2 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                {config.columns.map((col, colIdx) => (
                  <div key={colIdx} className="space-y-3">
                    <h4 className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground">
                      {col.title}
                    </h4>
                    <ul className="space-y-1">
                      {col.items.map((item, itemIdx) => {
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

function AuthActions({ isAuthenticated, user, handleSignOut }: { isAuthenticated: boolean, user: any, handleSignOut: () => void }) {
  if (isAuthenticated && user) {
    return (
      <>
        <Link
          href={ROLE_DASHBOARD_PREFIX[user.role as keyof typeof ROLE_DASHBOARD_PREFIX] || "/dashboard/student"}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary/10 border border-primary/25 text-xs font-semibold text-primary hover:bg-primary/20 transition-all shadow-sm"
        >
          <span className="capitalize">{user.role} Dashboard</span>
          <ArrowRight className="h-3 w-3" />
        </Link>
        <button
          type="button"
          onClick={handleSignOut}
          className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
          title="Sign Out"
          aria-label="Sign Out"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </>
    );
  }

  return (
    <>
      <Link
        href="/login"
        className="px-3.5 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
      >
        Log In
      </Link>
      <Link
        href="/register"
        className="relative group inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
      >
        <span className="relative z-10 flex items-center gap-1.5">
          Register
        </span>
      </Link>
    </>
  );
}

function MobileDrawer({ 
  open, 
  setOpen, 
  pathname, 
  isAuthenticated, 
  user, 
  handleSignOut 
}: { 
  open: boolean; 
  setOpen: (v: boolean) => void; 
  pathname: string;
  isAuthenticated: boolean;
  user: any;
  handleSignOut: () => void;
}) {
  const [expandedRole, setExpandedRole] = useState<string | null>("student");

  if (!open) return null;

  return (
    <div className="lg:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      
      {/* Drawer */}
      <div 
        className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-background border-l border-border shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300 ease-out flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between p-4 border-b border-border/40">
          <span className="font-bold text-lg">Menu</span>
          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
              pathname === "/" ? "bg-primary/10 text-primary" : "hover:bg-muted"
            }`}
          >
            Overview Home
          </Link>

          {Object.entries(MEGA_MENU_CONFIGS).map(([key, config]) => {
            const isExpanded = expandedRole === key;
            return (
              <div key={key} className="rounded-xl border border-border/60 overflow-hidden bg-card">
                <button
                  onClick={() => setExpandedRole(isExpanded ? null : key)}
                  className="w-full flex items-center justify-between p-4 text-left font-bold text-sm text-foreground hover:bg-muted/40 transition-colors"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`h-2 w-2 rounded-full bg-gradient-to-r ${config.accentColor}`} />
                    <span>{config.navLabel}</span>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isExpanded ? "rotate-180 text-primary" : "text-muted-foreground"
                    }`}
                  />
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 space-y-4 border-t border-border/40 bg-muted/10">
                    <div className="pt-2">
                      <Link
                        href={config.href}
                        onClick={() => setOpen(false)}
                        className="text-xs font-bold text-primary flex items-center gap-1 mb-3"
                      >
                        Visit full {config.navLabel} page
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>

                    {config.columns.map((col, colIdx) => (
                      <div key={colIdx} className="space-y-2">
                        <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">
                          {col.title}
                        </p>
                        <div className="grid grid-cols-1 gap-1">
                          {col.items.map((item, itemIdx) => (
                            <Link
                              key={itemIdx}
                              href={item.href}
                              onClick={() => setOpen(false)}
                              className="flex items-center justify-between py-2 px-2 rounded-lg text-xs font-medium text-foreground hover:bg-muted transition-colors"
                            >
                              <span>{item.title}</span>
                              {item.badge && (
                                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-primary/10 text-primary">
                                  {item.badge}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="p-4 border-t border-border/40 bg-muted/20 space-y-2 mt-auto">
          {isAuthenticated && user ? (
            <>
              <Link
                href={ROLE_DASHBOARD_PREFIX[user.role as keyof typeof ROLE_DASHBOARD_PREFIX] || "/dashboard/student"}
                onClick={() => setOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 h-10 rounded-lg bg-primary text-primary-foreground text-sm font-semibold shadow hover:bg-primary/90 transition-colors"
              >
                <span>Go to {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Dashboard</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  handleSignOut();
                }}
                className="w-full inline-flex items-center justify-center gap-2 h-10 rounded-lg border border-border text-sm font-semibold text-destructive hover:bg-destructive/10 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out ({user.fullName || user.email})</span>
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="w-full inline-flex items-center justify-center h-10 rounded-lg border border-border text-sm font-semibold hover:bg-muted transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/register"
                onClick={() => setOpen(false)}
                className="w-full inline-flex items-center justify-center h-10 rounded-lg bg-primary text-primary-foreground text-sm font-semibold shadow hover:bg-primary/90 transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
