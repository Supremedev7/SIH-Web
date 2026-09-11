import Link from "next/link";
import { Suspense } from "react";
import { RegisterForm } from "@/components/auth/register-form";
import { Building2, ArrowLeft, Loader2 } from "lucide-react";

export default function InstitutionRegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 w-full max-w-lg mx-auto">
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
          Institution Onboarding
        </span>
      </div>

      {/* Role Header */}
      <div className="text-center space-y-2">
        <div className="h-12 w-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-500 shadow-lg shadow-amber-500/10">
          <Building2 className="h-6 w-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
          Register Your Institution
        </h1>
        <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
          Connect your university or college to India's unified placement ledger. Automate recruiter workflows and boost student placement rates.
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
          <RegisterForm fixedRole="institution" />
        </Suspense>
      </div>

      {/* Login Prompt */}
      <p className="text-xs text-muted-foreground text-center">
        Already registered as an institution?{" "}
        <Link
          href="/institution/login"
          className="font-bold text-amber-500 hover:underline"
        >
          Sign in here
        </Link>
      </p>
    </div>
  );
}
