"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import {
  Loader2,
  GraduationCap,
  Building2,
  Briefcase,
  Users,
  ChevronDown,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  Check,
  Sparkles,
} from "lucide-react";

import { loginSchema, type LoginInput } from "@/lib/validators/auth";
import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/stores/auth-store";
import { ROLE_DASHBOARD_PREFIX, ROLES, type UserRole } from "@/lib/constants/roles";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface LoginFormProps {
  fixedRole?: UserRole | string;
}

const ROLE_DETAILS = {
  student: {
    label: "Student",
    subtitle: "Job seeker, internships, and skill development",
    badge: "Student Hub",
    icon: GraduationCap,
    colorClass: "text-role-student bg-role-student/10 border-role-student/30",
    glowClass: "focus-within:ring-role-student/40",
    btnColor: "bg-role-student hover:bg-role-student/90 text-white shadow-role-student/20",
    registerHref: "/student/register",
  },
  institution: {
    label: "Institution / T&P Cell",
    subtitle: "Campus placement officers, NAAC/NIRF data",
    badge: "TNP Console",
    icon: Building2,
    colorClass: "text-role-institute bg-role-institute/10 border-role-institute/30",
    glowClass: "focus-within:ring-role-institute/40",
    btnColor: "bg-role-institute hover:bg-role-institute/90 text-white shadow-role-institute/20",
    registerHref: "/institution/register",
  },
  industry: {
    label: "Industry Recruiter",
    subtitle: "Corporate hiring teams & campus sourcing",
    badge: "Enterprise Sourcing",
    icon: Briefcase,
    colorClass: "text-role-industry bg-role-industry/10 border-role-industry/30",
    glowClass: "focus-within:ring-role-industry/40",
    btnColor: "bg-role-industry hover:bg-role-industry/90 text-white shadow-role-industry/20",
    registerHref: "/industry/register",
  },
  academician: {
    label: "Faculty / Academician",
    subtitle: "Professors, researchers & corporate mentors",
    badge: "Faculty Cell",
    icon: Users,
    colorClass: "text-role-faculty bg-role-faculty/10 border-role-faculty/30",
    glowClass: "focus-within:ring-role-faculty/40",
    btnColor: "bg-role-faculty hover:bg-role-faculty/90 text-white shadow-role-faculty/20",
    registerHref: "/academician/register",
  },
};

export function LoginForm({ fixedRole }: LoginFormProps = {}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams?.get("redirect");
  const queryRole = searchParams?.get("role") as UserRole | undefined;
  const requiredRole = searchParams?.get("required_role") as UserRole | undefined;
  const currentRoleMismatch = searchParams?.get("current_role") as UserRole | undefined;

  const { user: currentAuthUser, isAuthenticated, clearSession, setSession } = useAuthStore();

  const [selectedRole, setSelectedRole] = React.useState<UserRole>(
    (fixedRole as UserRole) || requiredRole || queryRole || ROLES.STUDENT
  );
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (requiredRole && !fixedRole) {
      setSelectedRole(requiredRole);
    } else if (queryRole && !fixedRole) {
      setSelectedRole(queryRole);
    }
  }, [requiredRole, queryRole, fixedRole]);

  // Auto-redirect if already logged in and session is verified
  React.useEffect(() => {
    let isMounted = true;
    async function checkActiveSession() {
      if (isAuthenticated && currentAuthUser) {
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();
        if (!isMounted) return;

        if (!session) {
          // Stale local storage state, clear it
          clearSession();
          return;
        }

        if (redirect) {
          window.location.href = redirect;
        } else if (currentAuthUser.role && ROLE_DASHBOARD_PREFIX[currentAuthUser.role as keyof typeof ROLE_DASHBOARD_PREFIX]) {
          window.location.href = ROLE_DASHBOARD_PREFIX[currentAuthUser.role as keyof typeof ROLE_DASHBOARD_PREFIX];
        } else {
          window.location.href = "/dashboard/student";
        }
      }
    }
    checkActiveSession();
    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, currentAuthUser, redirect, clearSession]);

  // Close role dropdown on click outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const currentRoleInfo = ROLE_DETAILS[selectedRole] || ROLE_DETAILS.student;
  const RoleIcon = currentRoleInfo.icon;



  async function onSubmit(data: LoginInput) {
    setError(null);
    const supabase = createClient();

    try {
      const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (signInError) throw signInError;

      if (authData.user) {
        // Fetch profile to get role and complete session state
        const { data: profile } = await supabase
          .from("user_profiles")
          .select("*")
          .eq("auth_id", authData.user.id)
          .single();

        const userRole = profile?.role || authData.user.user_metadata?.role || selectedRole;
        document.cookie = `sci-dev-role=${userRole}; path=/; max-age=86400; SameSite=Lax`;

        setSession(
          {
            id: authData.user.id,
            email: authData.user.email!,
            role: userRole,
            fullName: profile?.full_name || authData.user.user_metadata?.full_name,
            avatarUrl: profile?.avatar_url,
          },
          profile
        );

        if (redirect) {
          window.location.href = redirect;
        } else if (userRole && ROLE_DASHBOARD_PREFIX[userRole as keyof typeof ROLE_DASHBOARD_PREFIX]) {
          window.location.href = ROLE_DASHBOARD_PREFIX[userRole as keyof typeof ROLE_DASHBOARD_PREFIX];
        } else {
          window.location.href = ROLE_DASHBOARD_PREFIX[selectedRole] || "/dashboard/student";
        }
      }
    } catch (err: Error | unknown) {
      setError(err instanceof Error ? err.message : "Invalid login credentials. Please try again.");
    }
  }

  return (
    <div className="w-full space-y-5">
      {/* ── Role Access Required Warning ── */}
      {requiredRole && (
        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-700 dark:text-amber-400 text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
          <ShieldCheck className="h-4 w-4 shrink-0 mt-0.5 text-amber-500" />
          <div className="space-y-0.5">
            <p className="font-semibold text-xs text-foreground">Role Authorization Required</p>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              You attempted to access a portal that requires an{" "}
              <strong className="text-amber-600 dark:text-amber-400">{ROLE_DETAILS[requiredRole]?.label || requiredRole}</strong> account.
              {currentRoleMismatch && ` (You are currently active as ${currentRoleMismatch}).`} Please sign in with the required credentials or click instant access below.
            </p>
          </div>
        </div>
      )}



      {/* ── Role Selector Dropdown (Unified Mode) ── */}
      {!fixedRole && (
        <div className="space-y-1.5" ref={dropdownRef}>
          <label className="text-xs font-semibold text-foreground flex items-center justify-between">
            <span>Select Account Role</span>
            <span className="text-[11px] font-normal text-muted-foreground">Switch roles anytime</span>
          </label>

          <div className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full flex items-center justify-between p-3 rounded-xl border border-border/80 bg-card hover:bg-card/80 hover:border-primary/40 transition-all text-left shadow-xs cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className={`p-2 rounded-lg border ${currentRoleInfo.colorClass} shrink-0`}>
                  <RoleIcon className="h-4 w-4" />
                </div>
                <div className="truncate">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-foreground truncate">
                      {currentRoleInfo.label}
                    </span>
                    <span className="text-[10px] font-mono font-semibold px-1.5 py-0.2 rounded-full bg-primary/10 text-primary border border-primary/20 shrink-0">
                      {currentRoleInfo.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground truncate">
                    {currentRoleInfo.subtitle}
                  </p>
                </div>
              </div>
              <ChevronDown
                className={`h-4 w-4 text-muted-foreground shrink-0 ml-2 transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180 text-primary" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1.5 z-50 rounded-xl border border-border/80 bg-card/95 backdrop-blur-xl p-1.5 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150">
                {(Object.keys(ROLE_DETAILS) as UserRole[]).map((roleKey) => {
                  const roleItem = ROLE_DETAILS[roleKey];
                  const ItemIcon = roleItem.icon;
                  const isSelected = selectedRole === roleKey;

                  return (
                    <button
                      key={roleKey}
                      type="button"
                      onClick={() => {
                        setSelectedRole(roleKey);
                        setDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-2.5 rounded-lg text-left transition-all cursor-pointer ${
                        isSelected
                          ? "bg-primary/10 border border-primary/20"
                          : "hover:bg-muted/60"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`p-1.5 rounded-md ${roleItem.colorClass}`}>
                          <ItemIcon className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-foreground">
                              {roleItem.label}
                            </span>
                          </div>
                          <p className="text-[10px] text-muted-foreground line-clamp-1">
                            {roleItem.subtitle}
                          </p>
                        </div>
                      </div>
                      {isSelected && <Check className="h-4 w-4 text-primary shrink-0 ml-2" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* If role is locked (Dedicated Page mode), show locked role indicator banner */}
      {fixedRole && (
        <div className="flex items-center justify-between p-3 rounded-xl border border-border/70 bg-card/60">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-lg border ${currentRoleInfo.colorClass}`}>
              <RoleIcon className="h-4 w-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-foreground block">
                {currentRoleInfo.label} Portal
              </span>
              <span className="text-[11px] text-muted-foreground">
                Authenticating on official SCI directory
              </span>
            </div>
          </div>
          <Link
            href="/login"
            className="text-[11px] font-semibold text-primary hover:underline shrink-0"
          >
            Change Role
          </Link>
        </div>
      )}

      {/* ── Form Inputs ── */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive font-medium">
              {error}
            </div>
          )}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-semibold">Email Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. name@university.ac.in or work email"
                    type="email"
                    disabled={isLoading}
                    className="h-10 rounded-xl"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[11px]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel className="text-xs font-semibold">Password</FormLabel>
                  <Link
                    href="/forgot-password"
                    className="text-[11px] text-muted-foreground hover:text-primary transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      disabled={isLoading}
                      className="h-10 rounded-xl pr-10"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage className="text-[11px]" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className={`w-full h-11 rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all ${currentRoleInfo.btnColor}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              `Sign In to ${currentRoleInfo.label}`
            )}
          </Button>


        </form>
      </Form>
    </div>
  );
}
