import Link from "next/link";
import { Suspense } from "react";
import { LoginForm } from "@/components/auth/login-form";
import { Building2, CheckCircle2, ArrowLeft, Loader2 } from "lucide-react";

export default function InstitutionLoginPage() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 w-full max-w-md mx-auto">
      {/* Back button */}
      <div className="w-full flex items-center justify-between">
        <Link
          href="/institution"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Institute Portal</span>
        </Link>
        <span className="text-[11px] font-mono text-amber-500 font-semibold bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
          T&P Cell Portal
        </span>
      </div>

      {/* Role Header */}
      <div className="text-center space-y-2">
        <div className="h-12 w-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-500 shadow-lg shadow-amber-500/10">
          <Building2 className="h-6 w-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
          Institution Sign In
        </h1>
        <p className="text-xs text-muted-foreground max-w-xs mx-auto leading-relaxed">
          Access the Placement Cell Console, student cohort metrics, and automated recruiter scheduling.
        </p>
      </div>

      {/* Auth Form Card */}
      <div className="w-full rounded-2xl border border-amber-500/20 bg-card p-6 sm:p-7 shadow-xl shadow-amber-500/5">
        <Suspense
          fallback={
            <div className="h-44 flex items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-amber-500" />
            </div>
          }
        >
          <LoginForm fixedRole="institution" />
        </Suspense>
      </div>

      {/* Highlights */}
      <div className="w-full rounded-xl border border-border/60 bg-muted/20 p-3.5 space-y-2 text-xs">
        <div className="flex items-center gap-2 text-muted-foreground">
          <CheckCircle2 className="h-3.5 w-3.5 text-amber-500 shrink-0" />
          <span>1-Click NAAC Criterion 5.2 & NIRF placement exports</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <CheckCircle2 className="h-3.5 w-3.5 text-amber-500 shrink-0" />
          <span>Department-level skill gap heatmaps & drive tracking</span>
        </div>
      </div>

      {/* Register Prompt */}
      <p className="text-xs text-muted-foreground text-center">
        Onboarding your college?{" "}
        <Link
          href="/institution/register"
          className="font-bold text-amber-500 hover:underline"
        >
          Register your institution
        </Link>
      </p>
    </div>
  );
}
