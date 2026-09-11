import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { SkillsClient } from "./skills-client";

export const metadata: Metadata = {
  title: "Skill Map",
  description: "View your competency analysis and skill gap assessment.",
};

export default async function SkillsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Fetch complete skill profile
  const { data: profile } = await supabase
    .from("skill_profiles")
    .select(`
      id,
      employability_score,
      technical_skills,
      soft_skills,
      domain_skills,
      strengths,
      weaknesses,
      career_readiness,
      industry_alignment,
      last_assessed_at
    `)
    .eq("user_id", user.id)
    .single();

  // Fetch skill gaps with resources
  const { data: gaps } = await supabase
    .from("skill_gaps")
    .select("id, skill_name, category, current_level, required_level, gap_score, priority, recommended_resources")
    .eq("skill_profile_id", profile?.id || "00000000-0000-0000-0000-000000000000")
    .order("gap_score", { ascending: false });

  return <SkillsClient profile={profile} gaps={gaps || []} />;
}
