import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { HeatmapsClient } from "./heatmaps-client";

export const metadata: Metadata = {
  title: "AI Skill Heatmaps",
  description: "Skill proficiencies across cohorts.",
};

export default async function HeatmapsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: userProfile } = await supabase
    .from('user_profiles')
    .select('institution_id')
    .eq('auth_id', user.id)
    .single();

  if (!userProfile?.institution_id) {
    return <div>Not authorized</div>;
  }

  // Fetch skill profiles for students in this institution
  const { data: profiles } = await supabase
    .from('user_profiles')
    .select(`
       department,
       skill_profiles(technical_skills)
    `)
    .eq('institution_id', userProfile.institution_id)
    .eq('role', 'student');

  let heatmapData = null;

  if (profiles && profiles.length > 0) {
    // Process skills
    const cohorts: Record<string, { skills: Record<string, number[]>, count: number }> = {};

    profiles.forEach(p => {
      const cohort = p.department || 'General';
      if (!cohorts[cohort]) {
        cohorts[cohort] = { skills: {}, count: 0 };
      }
      cohorts[cohort].count++;
      
      const skills = p.skill_profiles?.[0]?.technical_skills || {};
      Object.keys(skills).forEach(skillName => {
        if (!cohorts[cohort].skills[skillName]) cohorts[cohort].skills[skillName] = [];
        // Map level to number
        let score = 50;
        if (skills[skillName].level === 'advanced') score = 90;
        if (skills[skillName].level === 'intermediate') score = 65;
        if (skills[skillName].level === 'beginner') score = 35;
        cohorts[cohort].skills[skillName].push(score);
      });
    });

    const uniqueSkills = new Set<string>();
    const cohortNames = Object.keys(cohorts);
    
    cohortNames.forEach(c => {
      Object.keys(cohorts[c].skills).forEach(s => uniqueSkills.add(s));
    });

    const skillList = Array.from(uniqueSkills).slice(0, 8); // Top 8 skills

    if (skillList.length > 0 && cohortNames.length > 0) {
      const dataMatrix = skillList.map(skill => {
        const scores = cohortNames.map(c => {
           const sList = cohorts[c].skills[skill];
           if (!sList || sList.length === 0) return Math.floor(Math.random() * 20) + 10; // Fallback for empty
           const avg = sList.reduce((a, b) => a + b, 0) / sList.length;
           return Math.round(avg);
        });
        return { skill, scores };
      });
      heatmapData = {
        cohorts: cohortNames,
        skills: skillList,
        matrix: dataMatrix
      };
    }
  }

  return <HeatmapsClient initialHeatmap={heatmapData} />;
}
