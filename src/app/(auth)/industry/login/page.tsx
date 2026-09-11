import Link from "next/link";
import { Suspense } from "react";
import { LoginForm } from "@/components/auth/login-form";
import { Briefcase, CheckCircle2, ArrowLeft, Loader2 } from "lucide-react";

export default function IndustryLoginPage() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 w-full max-w-md mx-auto">
      {/* Back button */}
      <div className="w-full flex items-center justify-between">
        <Link
          href="/industry"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Industry Hub</span>
        </Link>
        <span className="text-[11px] font-mono text-emerald-500 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
          Corporate Recruiter
        </span>
      </div>

      {/* Role Header */}
      <div className="text-center space-y-2">
        <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-500 shadow-lg shadow-emerald-500/10">
          <Briefcase className="h-6 w-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
          Industry Recruiter Sign In
        </h1>
        <p className="text-xs text-muted-foreground max-w-xs mx-auto leading-relaxed">
          Access your candidate sourcing pipeline, manage live job openings, and shortlist applicants.
        </p>
      </div>

      {/* Auth Form Card */}
      <div className="w-full rounded-2xl border border-emerald-500/20 bg-card p-6 sm:p-7 shadow-xl shadow-emerald-500/5">
        <Suspense
          fallback={
            <div className="h-44 flex items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
            </div>
          }
        >
          <LoginForm fixedRole="industry" />
        </Suspense>
      </div>

      {/* Highlights */}
      <div className="w-full rounded-xl border border-border/60 bg-muted/20 p-3.5 space-y-2 text-xs">
        <div className="flex items-center gap-2 text-muted-foreground">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
          <span>96.8% precision candidate matching across 2M+ students</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
          <span>Automated test scoring & 1-click campus drive scheduling</span>
        </div>
      </div>

      {/* Register Prompt */}
      <p className="text-xs text-muted-foreground text-center">
        New corporate partner?{" "}
        <Link
          href="/industry/register"
          className="font-bold text-emerald-500 hover:underline"
        >
          Register your enterprise
        </Link>
      </p>
    </div>
  );
}
