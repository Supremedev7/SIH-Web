import Link from "next/link";
import { Suspense } from "react";
import { RegisterForm } from "@/components/auth/register-form";
import { Users, ArrowLeft, Loader2 } from "lucide-react";

export default function AcademicianRegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 w-full max-w-lg mx-auto">
      {/* Back button */}
      <div className="w-full flex items-center justify-between">
        <Link
          href="/academician"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Faculty Cell</span>
        </Link>
        <span className="text-[11px] font-mono text-purple-500 font-semibold bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
          Faculty Enrollment
        </span>
      </div>

      {/* Role Header */}
      <div className="text-center space-y-2">
        <div className="h-12 w-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center mx-auto text-purple-500 shadow-lg shadow-purple-500/10">
          <Users className="h-6 w-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
          Register Faculty Profile
        </h1>
        <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
          Join 50,000+ academicians across India. Guide national hackathon projects, access industry consultancies, and lead cutting-edge R&D tracks.
        </p>
      </div>

      {/* Auth Form Card */}
      <div className="w-full rounded-2xl border border-purple-500/20 bg-card p-6 sm:p-7 shadow-xl shadow-purple-500/5">
        <Suspense
          fallback={
            <div className="h-44 flex items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-purple-500" />
            </div>
          }
        >
          <RegisterForm fixedRole="academician" />
        </Suspense>
      </div>

      {/* Login Prompt */}
      <p className="text-xs text-muted-foreground text-center">
        Already registered as faculty?{" "}
        <Link
          href="/academician/login"
          className="font-bold text-purple-500 hover:underline"
        >
          Sign in here
        </Link>
      </p>
    </div>
  );
}
