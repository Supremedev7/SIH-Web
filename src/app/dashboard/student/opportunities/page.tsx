import { createClient } from "@/lib/supabase/server";
import { OpportunitiesClient } from "./opportunities-client";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Opportunities",
  description: "Discover jobs, internships, and projects matched to your skills.",
};

const PAGE_SIZE = 12;

interface SearchParams {
  page?: string;
  type?: string;
  remote?: string;
  q?: string;
}

export default async function OpportunitiesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const supabase = await createClient();
  const params = await searchParams;

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const currentPage = Math.max(1, parseInt(params.page || "1", 10));
  const typeFilter = params.type || "";
  const remoteFilter = params.remote || "";
  const searchQuery = params.q || "";
  const offset = (currentPage - 1) * PAGE_SIZE;

  // Build query
  let query = supabase
    .from("job_listings")
    .select("id, title, type, location, is_remote, stipend_salary_range, required_skills, status, created_at, employer_id", { count: "exact" })
    .eq("status", "open")
    .order("created_at", { ascending: false })
    .range(offset, offset + PAGE_SIZE - 1);

  if (typeFilter) {
    query = query.eq("type", typeFilter);
  }
  if (remoteFilter === "true") {
    query = query.eq("is_remote", true);
  }
  if (searchQuery) {
    query = query.ilike("title", `%${searchQuery}%`);
  }

  const { data: jobs, count: totalCount, error } = await query;

  if (error) {
    console.error("Error fetching job listings:", error);
  }

  // Fetch user applications
  const { data: userApplications } = await supabase
    .from("job_applications")
    .select("job_id")
    .eq("student_id", user.id);

  const appliedJobIds = new Set(userApplications?.map((a) => a.job_id) || []);

  // Fetch student's skill profile for match scoring
  const { data: skillProfile } = await supabase
    .from("skill_profiles")
    .select("technical_skills, soft_skills, domain_skills")
    .eq("user_id", user.id)
    .single();

  // Fetch employer profiles
  let enrichedJobs = (jobs || []).map((job) => ({
    ...job,
    employer: null as { company_name: string | null; industry_sector: string | null } | null,
    hasApplied: appliedJobIds.has(job.id),
    matchScore: 0,
  }));

  if (jobs && jobs.length > 0) {
    const employerIds = [...new Set(jobs.map((job) => job.employer_id))];
    const { data: employers } = await supabase
      .from("user_profiles")
      .select("auth_id, company_name, industry_sector")
      .in("auth_id", employerIds);

    const employerMap: Record<string, { company_name: string | null; industry_sector: string | null }> = {};
    employers?.forEach((emp) => {
      employerMap[emp.auth_id] = emp;
    });

    // Compute match scores from student skills vs job required_skills
    const studentSkills: Record<string, number> = {
      ...(skillProfile?.technical_skills || {}),
      ...(skillProfile?.soft_skills || {}),
      ...(skillProfile?.domain_skills || {}),
    };

    enrichedJobs = (jobs || []).map((job) => {
      const employer = employerMap[job.employer_id] || null;
      const requiredSkills = job.required_skills || {};
      let matchScore = 0;

      const skillKeys = Object.keys(requiredSkills);
      if (skillKeys.length > 0 && Object.keys(studentSkills).length > 0) {
        let totalMatch = 0;
        for (const skill of skillKeys) {
          // Fuzzy match: find best matching student skill
          const normalizedSkill = skill.toLowerCase().replace(/[^a-z0-9]/g, '');
          let bestMatch = 0;
          for (const [studentSkill, studentLevel] of Object.entries(studentSkills)) {
            const normalizedStudentSkill = studentSkill.toLowerCase().replace(/[^a-z0-9]/g, '');
            if (normalizedStudentSkill.includes(normalizedSkill) || normalizedSkill.includes(normalizedStudentSkill)) {
              bestMatch = Math.max(bestMatch, studentLevel);
            }
          }
          totalMatch += bestMatch > 0 ? Math.min(bestMatch / 100, 1) : 0;
        }
        matchScore = Math.round((totalMatch / skillKeys.length) * 100);
      }

      return {
        ...job,
        employer,
        hasApplied: appliedJobIds.has(job.id),
        matchScore,
      };
    });
  }

  return (
    <OpportunitiesClient
      jobs={enrichedJobs}
      totalCount={totalCount || 0}
      currentPage={currentPage}
      pageSize={PAGE_SIZE}
    />
  );
}
