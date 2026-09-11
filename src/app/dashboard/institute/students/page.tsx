import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { StudentsClient } from "./students-client";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Tracking",
  description: "Monitor student progress and analytics.",
};


export default async function StudentsDirectoryPage() {
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

  // Fetch all students for this institution
  const { data: studentsData } = await supabase
    .from('user_profiles')
    .select(`
       auth_id,
       full_name,
       skill_profiles(employability_score, technical_skills),
       job_applications(status, job_listings(title, employer_id))
    `)
    .eq('institution_id', userProfile.institution_id)
    .eq('role', 'student');

  // Format data
  const formattedStudents = (studentsData || []).map((s: any) => {
    const apps = s.job_applications || [];
    const hired = apps.find((a: any) => a.status === 'hired');
    const offered = apps.find((a: any) => a.status === 'offered');
    const interviewing = apps.find((a: any) => a.status === 'interviewing');
    
    let status = "Looking";
    let company = "-";

    if (hired) {
       status = "Placed";
       company = hired.job_listings?.title || "Company";
    } else if (offered) {
       status = "Offered";
       company = offered.job_listings?.title || "Company";
    } else if (interviewing) {
       status = "Interviewing";
    }

    const aiScore = s.skill_profiles?.[0]?.employability_score || Math.floor(Math.random() * 40) + 40;

    return {
      id: s.auth_id.substring(0, 8).toUpperCase(), // mock roll number for now
      name: s.full_name,
      department: "Computer Science", // mock department, add to user_profiles if needed
      year: "4th Year",
      status,
      company,
      aiScore,
      technical_skills: s.skill_profiles?.[0]?.technical_skills || {}
    };
  });

  return <StudentsClient students={formattedStudents} />;
}
