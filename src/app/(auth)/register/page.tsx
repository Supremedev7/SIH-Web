import Link from "next/link";
import { Suspense } from "react";
import { RegisterForm } from "@/components/auth/register-form";
import { ShieldCheck, Loader2 } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 w-full max-w-lg mx-auto">
      {/* Header Banner */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border/80 bg-muted/40 text-[11px] font-semibold text-muted-foreground mb-1">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
          <span>National Directory Registration</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
          Create Your SCI Account
        </h1>
        <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
          Select your stakeholder role from the dropdown below to unlock tailored career, hiring, or institutional features.
        </p>
      </div>

      {/* Auth Card */}
      <div className="w-full rounded-2xl border border-border/80 bg-card p-6 sm:p-7 shadow-xl shadow-primary/5">
        <Suspense
          fallback={
            <div className="h-48 flex flex-col items-center justify-center gap-2 text-xs text-muted-foreground">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <span>Loading registration console...</span>
            </div>
          }
        >
          <RegisterForm />
        </Suspense>
      </div>

      {/* Footer link */}
      <div className="text-center space-y-3">
        <p className="text-xs text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-bold text-primary hover:underline"
          >
            Sign in
          </Link>
        </p>

        <div className="flex items-center justify-center gap-4 text-[11px] text-muted-foreground/80">
          <Link href="/student" className="hover:text-primary transition-colors">Students</Link>
          <span>•</span>
          <Link href="/institution" className="hover:text-primary transition-colors">Institutes</Link>
          <span>•</span>
          <Link href="/industry" className="hover:text-primary transition-colors">Industry</Link>
          <span>•</span>
          <Link href="/academician" className="hover:text-primary transition-colors">Faculty</Link>
        </div>
      </div>
    </div>
  );
}
