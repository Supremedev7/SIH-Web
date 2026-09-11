import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard/student";

  if (code) {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              );
            } catch {
              // The `setAll` method was called from a Server Component.
              // This can be ignored if you have middleware refreshing
              // user sessions.
            }
          },
        },
      }
    );

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error && data.user) {
      const explicitNext = searchParams.get("next");
      if (explicitNext) {
        return NextResponse.redirect(`${origin}${explicitNext}`);
      }

      const { data: profile } = await supabase
        .from("user_profiles")
        .select("role")
        .eq("auth_id", data.user.id)
        .single();

      const role = profile?.role || data.user.user_metadata?.role || "student";
      const roleMap: Record<string, string> = {
        student: "/dashboard/student",
        industry: "/dashboard/industry",
        institution: "/dashboard/institute",
        academician: "/dashboard/faculty",
      };

      const targetPath = roleMap[role] || "/dashboard/student";
      return NextResponse.redirect(`${origin}${targetPath}`);
    }
  }

  // Redirect to error page on failure
  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
}
