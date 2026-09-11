import Link from "next/link";
import { Suspense } from "react";
import { RegisterForm } from "@/components/auth/register-form";
import { GraduationCap, ArrowLeft, Loader2, Sparkles } from "lucide-react";

export default function StudentRegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 w-full max-w-lg mx-auto">
      {/* Back button */}
      <div className="w-full flex items-center justify-between">
        <Link
          href="/student"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Student Portal</span>
        </Link>
        <span className="text-[11px] font-mono text-blue-500 font-semibold bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
          Student Enrollment
        </span>
      </div>

      {/* Role Header */}
      <div className="text-center space-y-2">
        <div className="h-12 w-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mx-auto text-blue-500 shadow-lg shadow-blue-500/10">
          <GraduationCap className="h-6 w-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
          Join SCI as a Student
        </h1>
        <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
          Create your verified profile to discover internships, benchmark skills against national standards, and land top campus placements.
        </p>
      </div>

      {/* Auth Form Card */}
      <div className="w-full rounded-2xl border border-blue-500/20 bg-card p-6 sm:p-7 shadow-xl shadow-blue-500/5">
        <Suspense
          fallback={
            <div className="h-44 flex items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
            </div>
          }
        >
          <RegisterForm fixedRole="student" />
        </Suspense>
      </div>

      {/* Login Prompt */}
      <p className="text-xs text-muted-foreground text-center">
        Already registered as a student?{" "}
        <Link
          href="/student/login"
          className="font-bold text-blue-500 hover:underline"
        >
          Sign in here
        </Link>
      </p>
    </div>
  );
}
