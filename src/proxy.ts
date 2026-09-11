import { updateSession } from "@/lib/supabase/middleware";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Root proxy: Supabase session refresh + role-based route protection.
 */
export async function proxy(request: NextRequest) {
  const { supabase, supabaseResponse } = await updateSession(request);

  const pathname = request.nextUrl.pathname;

  // ── Skip static assets, API routes, and auth callbacks ──
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/logo") ||
    pathname.startsWith("/manifest") ||
    pathname.includes(".")
  ) {
    return supabaseResponse;
  }

  // ── Get authenticated user ──
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // ── Public routes that don't need auth ──
  const publicPaths = ["/login", "/register", "/student", "/institution", "/industry", "/academician", "/about", "/contact"];
  const isPublicRoute = pathname === "/" || publicPaths.some((p) => pathname.startsWith(p));

  if (isPublicRoute) {
    // If user is authenticated and visits "/", redirect to their dashboard
    if (pathname === "/" && user) {
      const { data: profile } = await supabase
        .from("user_profiles")
        .select("role")
        .eq("auth_id", user.id)
        .single();

      const role = profile?.role || "student";
      const rolePathMap: Record<string, string> = {
        student: "/dashboard/student",
        academician: "/dashboard/faculty",
        industry: "/dashboard/industry",
        institution: "/dashboard/institute",
      };
      return NextResponse.redirect(
        new URL(rolePathMap[role] || "/dashboard/student", request.url)
      );
    }
    return supabaseResponse;
  }

  // ── Protected dashboard routes ──
  if (pathname.startsWith("/dashboard")) {
    // Must be authenticated
    if (!user) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Check role matches route
    const routeSegments = pathname.split("/");
    const routeRole = routeSegments[2]; // e.g. "student", "industry", "faculty", "institute"

    if (routeRole) {
      const { data: profile } = await supabase
        .from("user_profiles")
        .select("role")
        .eq("auth_id", user.id)
        .single();

      const userRole = profile?.role;

      // Map DB roles to route segments
      const roleToRoute: Record<string, string> = {
        student: "student",
        academician: "faculty",
        industry: "industry",
        institution: "institute",
      };

      const allowedRoute = userRole ? roleToRoute[userRole] : null;

      if (allowedRoute && routeRole !== allowedRoute) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("required_role", routeRole);
        loginUrl.searchParams.set("current_role", userRole || "unknown");
        return NextResponse.redirect(loginUrl);
      }
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
