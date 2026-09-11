import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { InstituteDashboardClient } from "./institute-dashboard-client";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Institute Dashboard",
  description: "Overview of institutional performance.",
};


export default async function InstituteDashboardPage() {
  const supabase = await createClient();
  
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    redirect('/login');
  }

  // Fetch user profile to get institution_id
  const { data: userProfile } = await supabase
    .from('user_profiles')
    .select('institution_id')
    .eq('auth_id', user.id)
    .single();

  let institutionProfile = null;
  let students: any[] = [];
  let applications: any[] = [];
  let skills: any[] = [];
  let recentActivities: any[] = [];

  if (userProfile?.institution_id) {
    // Fetch institution profile
    const { data: instData } = await supabase
      .from('institutions')
      .select('id, name')
      .eq('id', userProfile.institution_id)
      .single();
    institutionProfile = instData;

    // Fetch students of this institution
    const { data: studentsData } = await supabase
      .from('user_profiles')
      .select('auth_id, full_name, role')
      .eq('institution_id', userProfile.institution_id)
      .eq('role', 'student');
      
    students = studentsData || [];

    if (students.length > 0) {
      const studentAuthIds = students.map(s => s.auth_id);
      
      // Fetch their applications
      const { data: appsData } = await supabase
        .from('job_applications')
        .select(`
           id, student_id, status, created_at,
           job_listings ( employer_id, salary_range, title )
        `)
        .in('student_id', studentAuthIds);
      applications = appsData || [];

      // Fetch their skills
      const { data: skillsData } = await supabase
        .from('skill_profiles')
        .select('user_id, technical_skills')
        .in('user_id', studentAuthIds);
      skills = skillsData || [];
    }

    // Recent activity (e.g. recent applications or job postings from partnerships)
    // Here we'll just show the latest job listings as mock activity
    const { data: recentJobs } = await supabase
       .from('job_listings')
       .select('id, title, created_at')
       .order('created_at', { ascending: false })
       .limit(4);
    
    recentActivities = recentJobs?.map(j => ({
       title: `New placement drive added: ${j.title}`,
       time: j.created_at,
       type: 'drive'
    })) || [];
  }

  return (
    <InstituteDashboardClient 
       institutionProfile={institutionProfile}
       students={students}
       applications={applications}
       skills={skills}
       recentActivities={recentActivities}
    />
  );
}
