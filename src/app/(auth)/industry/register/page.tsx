import Link from "next/link";
import { Suspense } from "react";
import { RegisterForm } from "@/components/auth/register-form";
import { Briefcase, ArrowLeft, Loader2 } from "lucide-react";

export default function IndustryRegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 w-full max-w-lg mx-auto">
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
          Enterprise Sourcing
        </span>
      </div>

      {/* Role Header */}
      <div className="text-center space-y-2">
        <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-500 shadow-lg shadow-emerald-500/10">
          <Briefcase className="h-6 w-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
          Register Corporate Account
        </h1>
        <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
          Hire pre-screened campus talent from 5,000+ top engineering & management institutions across India with zero placement agency overhead.
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
          <RegisterForm fixedRole="industry" />
        </Suspense>
      </div>

      {/* Login Prompt */}
      <p className="text-xs text-muted-foreground text-center">
        Already registered your company?{" "}
        <Link
          href="/industry/login"
          className="font-bold text-emerald-500 hover:underline"
        >
          Sign in here
        </Link>
      </p>
    </div>
  );
}
