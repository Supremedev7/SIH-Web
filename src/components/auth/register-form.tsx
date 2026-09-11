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
  Check,
  ShieldCheck,
} from "lucide-react";

import { registerSchema, type RegisterInput } from "@/lib/validators/auth";
import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/stores/auth-store";
import { ROLES, type UserRole, ROLE_DASHBOARD_PREFIX } from "@/lib/constants/roles";

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

interface RegisterFormProps {
  fixedRole?: UserRole | string;
}

const ROLE_CONFIGS = {
  student: {
    label: "Student",
    subtitle: "Job & internship seeker, AI skill profile",
    badge: "Student Hub",
    icon: GraduationCap,
    colorClass: "text-role-student bg-role-student/10 border-role-student/30",
    btnColor: "bg-role-student hover:bg-role-student/90 text-white shadow-role-student/20",
    loginHref: "/student/login",
  },
  institution: {
    label: "Institution / T&P Cell",
    subtitle: "Training & placement officer, NAAC/NIRF audits",
    badge: "TNP Console",
    icon: Building2,
    colorClass: "text-role-institute bg-role-institute/10 border-role-institute/30",
    btnColor: "bg-role-institute hover:bg-role-institute/90 text-white shadow-role-institute/20",
    loginHref: "/institution/login",
  },
  industry: {
    label: "Industry Recruiter",
    subtitle: "Corporate hiring teams, candidate sourcing",
    badge: "Enterprise Sourcing",
    icon: Briefcase,
    colorClass: "text-role-industry bg-role-industry/10 border-role-industry/30",
    btnColor: "bg-role-industry hover:bg-role-industry/90 text-white shadow-role-industry/20",
    loginHref: "/industry/login",
  },
  academician: {
    label: "Faculty / Academician",
    subtitle: "Professors, researchers & corporate mentors",
    badge: "Faculty Cell",
    icon: Users,
    colorClass: "text-role-faculty bg-role-faculty/10 border-role-faculty/30",
    btnColor: "bg-role-faculty hover:bg-role-faculty/90 text-white shadow-role-faculty/20",
    loginHref: "/academician/login",
  },
};

export function RegisterForm({ fixedRole }: RegisterFormProps = {}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryRole = searchParams?.get("role") as UserRole | undefined;

  const [selectedRole, setSelectedRole] = React.useState<UserRole>(
    (fixedRole as UserRole) || queryRole || ROLES.STUDENT
  );
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: selectedRole,
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      collegeName: "",
      stream: "",
      graduationYear: "",
      companyName: "",
      institutionName: "",
      aisheCode: "",
      department: "",
      designation: "",
      phone: "",
    },
  });

  React.useEffect(() => {
    if (queryRole && !fixedRole) {
      setSelectedRole(queryRole);
    }
  }, [queryRole, fixedRole]);

  // Sync role with form
  React.useEffect(() => {
    form.setValue("role", selectedRole);
  }, [selectedRole, form]);

  const isLoading = form.formState.isSubmitting;
  const currentRoleInfo = ROLE_CONFIGS[selectedRole] || ROLE_CONFIGS.student;
  const RoleIcon = currentRoleInfo.icon;

  const setSession = useAuthStore((state) => state.setSession);

  async function onSubmit(data: RegisterInput) {
    setError(null);
    const supabase = createClient();

    try {
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
            role: data.role,
            phone: data.phone,
            college_name: data.collegeName,
            stream: data.stream,
            graduation_year: data.graduationYear,
            company_name: data.companyName,
            institution_name: data.institutionName,
            aishe_code: data.aisheCode,
            department: data.department,
            designation: data.designation,
          },
        },
      });

      if (signUpError) throw signUpError;

      const role = data.role;
      const userId = authData.user?.id || `user-${Date.now()}`;
      document.cookie = `sci-dev-role=${role}; path=/; max-age=86400; SameSite=Lax`;

      setSession(
        {
          id: userId,
          email: data.email,
          role: role,
          fullName: data.fullName,
          avatarUrl: null,
          metadata: null,
        },
        {
          id: userId,
          authId: userId,
          email: data.email,
          role: role,
          fullName: data.fullName,
          phone: null,
          avatarUrl: null,
          institutionId: null,
          industryId: null,
          department: null,
          designation: null,
          bio: null,
          socialLinks: null,
          metadata: null,
          isVerified: true,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      );

      window.location.href = ROLE_DASHBOARD_PREFIX[role] || "/dashboard/student";
    } catch (err: Error | unknown) {
      setError(err instanceof Error ? err.message : "Failed to create account. Please try again.");
    }
  }

  return (
    <div className="w-full space-y-5">
      {/* ── Role Selector Dropdown (Unified Mode) ── */}
      {!fixedRole && (
        <div className="space-y-1.5" ref={dropdownRef}>
          <label className="text-xs font-semibold text-foreground flex items-center justify-between">
            <span>Registering As</span>
            <span className="text-[11px] font-normal text-muted-foreground">Select role to personalize fields</span>
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
                {(Object.keys(ROLE_CONFIGS) as UserRole[]).map((roleKey) => {
                  const roleItem = ROLE_CONFIGS[roleKey];
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
                {currentRoleInfo.label} Registration
              </span>
              <span className="text-[11px] text-muted-foreground">
                Verified enrollment on national apex platform
              </span>
            </div>
          </div>
          <Link
            href="/register"
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

          <div className="grid sm:grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold">Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Aditi Rao" disabled={isLoading} className="h-10 rounded-xl" {...field} />
                  </FormControl>
                  <FormMessage className="text-[11px]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold">Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="name@domain.com" type="email" disabled={isLoading} className="h-10 rounded-xl" {...field} />
                  </FormControl>
                  <FormMessage className="text-[11px]" />
                </FormItem>
              )}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold">Password</FormLabel>
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Min 8 chars, 1 uppercase, 1 number"
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
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold">Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Re-enter password"
                      disabled={isLoading}
                      className="h-10 rounded-xl"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[11px]" />
                </FormItem>
              )}
            />
          </div>

          {/* ── Dynamic Role-Specific Fields ── */}
          {selectedRole === "student" && (
            <div className="space-y-3 pt-2 border-t border-border/40">
              <span className="text-[11px] font-bold uppercase tracking-wider text-role-student">
                Academic Details
              </span>
              <div className="grid sm:grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="collegeName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">College / University</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. IIT Delhi, NIT Trichy" disabled={isLoading} className="h-10 rounded-xl" {...field} value={field.value || ""} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stream"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Degree & Stream</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. B.Tech Computer Science" disabled={isLoading} className="h-10 rounded-xl" {...field} value={field.value || ""} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}

          {selectedRole === "institution" && (
            <div className="space-y-3 pt-2 border-t border-border/40">
              <span className="text-[11px] font-bold uppercase tracking-wider text-role-institute">
                Institution Verification
              </span>
              <div className="grid sm:grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="institutionName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">University / College Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Delhi Technological University" disabled={isLoading} className="h-10 rounded-xl" {...field} value={field.value || ""} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="aisheCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">AISHE Code / Designation</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. U-0123 or Head of T&P" disabled={isLoading} className="h-10 rounded-xl" {...field} value={field.value || ""} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}

          {selectedRole === "industry" && (
            <div className="space-y-3 pt-2 border-t border-border/40">
              <span className="text-[11px] font-bold uppercase tracking-wider text-role-industry">
                Corporate Credentials
              </span>
              <div className="grid sm:grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Company Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Tata Group, Microsoft India" disabled={isLoading} className="h-10 rounded-xl" {...field} value={field.value || ""} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="designation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Recruiter Designation</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Talent Acquisition Lead" disabled={isLoading} className="h-10 rounded-xl" {...field} value={field.value || ""} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}

          {selectedRole === "academician" && (
            <div className="space-y-3 pt-2 border-t border-border/40">
              <span className="text-[11px] font-bold uppercase tracking-wider text-role-faculty">
                Faculty & Research Affiliation
              </span>
              <div className="grid sm:grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">University & Department</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. IIT Bombay • Dept of CSE" disabled={isLoading} className="h-10 rounded-xl" {...field} value={field.value || ""} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="designation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Academic Rank</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Associate Professor / Dean R&D" disabled={isLoading} className="h-10 rounded-xl" {...field} value={field.value || ""} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between text-xs pt-1">
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-muted-foreground hover:text-foreground flex items-center gap-1.5"
            >
              {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              <span>{showPassword ? "Hide passwords" : "Show passwords"}</span>
            </button>
            <span className="text-[11px] text-muted-foreground">Encrypted by Supabase</span>
          </div>

          <Button
            type="submit"
            className={`w-full h-11 rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all ${currentRoleInfo.btnColor}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating {currentRoleInfo.label} Account...
              </>
            ) : (
              `Create ${currentRoleInfo.label} Account`
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
