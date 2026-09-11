import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { StudentDashboardClient } from "./student-dashboard-client";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Dashboard",
  description: "Your personalized academic and career overview.",
};


export default async function StudentDashboardHome() {
  const supabase = await createClient();
  
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    redirect('/login');
  }

  // Fetch user profile
  const { data: userProfile } = await supabase
    .from('user_profiles')
    .select('full_name, metadata')
    .eq('auth_id', user.id)
    .single();

  if (!userProfile?.metadata?.onboarding_completed) {
    redirect('/dashboard/student/onboarding');
  }

  // Fetch skill profile
  const { data: skillProfile } = await supabase
    .from('skill_profiles')
    .select('id, employability_score')
    .eq('user_id', user.id)
    .single();

  // Fetch ALL applications (for total count)
  const { data: allApplications, count: totalApplicationCount } = await supabase
    .from('job_applications')
    .select('id', { count: 'exact', head: false })
    .eq('student_id', user.id);

  // Fetch latest 3 applications with details
  const { data: applications } = await supabase
    .from('job_applications')
    .select(`
      id,
      status,
      created_at,
      job_listings (
        title,
        employer_id
      )
    `)
    .eq('student_id', user.id)
    .order('created_at', { ascending: false })
    .limit(3);

  // Fetch upcoming/pending assessments count
  const { count: upcomingAssessments } = await supabase
    .from('skill_assessments')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .is('completed_at', null);

  // Fetch unread notifications count
  const { count: unreadNotifications } = await supabase
    .from('notifications')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .eq('is_unread', true);

  // Fetch skill gaps count
  const { count: skillGapsCount } = await supabase
    .from('skill_gaps')
    .select('id', { count: 'exact', head: true })
    .eq('skill_profile_id', skillProfile?.id || '00000000-0000-0000-0000-000000000000');

  // Compute percentile rank from all students' scores
  let percentileRank = "—";
  if (skillProfile?.employability_score) {
    const { count: totalStudents } = await supabase
      .from('skill_profiles')
      .select('id', { count: 'exact', head: true });

    const { count: belowCount } = await supabase
      .from('skill_profiles')
      .select('id', { count: 'exact', head: true })
      .lt('employability_score', skillProfile.employability_score);

    if (totalStudents && totalStudents > 0) {
      const percentile = Math.round(((belowCount || 0) / totalStudents) * 100);
      if (percentile >= 95) percentileRank = "Top 5%";
      else if (percentile >= 90) percentileRank = "Top 10%";
      else if (percentile >= 80) percentileRank = "Top 20%";
      else if (percentile >= 50) percentileRank = "Top 50%";
      else percentileRank = `Top ${100 - percentile}%`;
    }
  }

  // Fetch recommended job listings
  const { data: jobMatches } = await supabase
    .from('job_listings')
    .select('id, title, stipend_salary_range, type, location, is_remote, required_skills, employer_id')
    .eq('status', 'open')
    .order('created_at', { ascending: false })
    .limit(2);

  // Get all unique employer IDs
  const employerIds = new Set<string>();
  applications?.forEach((app: Record<string, unknown>) => {
    const jobListings = app.job_listings as { employer_id?: string } | null;
    if (jobListings?.employer_id) employerIds.add(jobListings.employer_id);
  });
  jobMatches?.forEach((job: Record<string, unknown>) => {
    if (job.employer_id) employerIds.add(job.employer_id as string);
  });

  const employerMap: Record<string, { full_name: string; role: string }> = {};
  if (employerIds.size > 0) {
    const { data: employers } = await supabase
      .from('user_profiles')
      .select('auth_id, full_name, role')
      .in('auth_id', Array.from(employerIds));
    
    employers?.forEach((emp) => {
      employerMap[emp.auth_id] = emp;
    });
  }

  // Enrich data
  const enrichedApplications = applications?.map((app: Record<string, unknown>) => {
    const jobListings = app.job_listings as { title?: string; employer_id?: string } | null;
    return {
      id: app.id as string,
      status: app.status as string,
      created_at: app.created_at as string,
      job_listings: {
        title: jobListings?.title || 'Unknown Position',
        employer_id: jobListings?.employer_id || '',
        employer: employerMap[jobListings?.employer_id || ''] || { full_name: 'Unknown Employer' },
      },
    };
  }) || [];

  const enrichedJobMatches = jobMatches?.map((job: Record<string, unknown>) => ({
    id: job.id as string,
    title: job.title as string,
    stipend_salary_range: job.stipend_salary_range as string | null,
    type: job.type as string,
    location: job.location as string | null,
    is_remote: job.is_remote as boolean,
    required_skills: job.required_skills as Record<string, string> | null,
    employer_id: job.employer_id as string,
    employer: employerMap[job.employer_id as string] || { full_name: 'Unknown Employer' },
  })) || [];

  return (
    <StudentDashboardClient 
      userProfile={userProfile}
      skillProfile={skillProfile}
      applications={enrichedApplications}
      jobMatches={enrichedJobMatches}
      stats={{
        totalApplications: totalApplicationCount || allApplications?.length || 0,
        upcomingAssessments: upcomingAssessments || 0,
        unreadNotifications: unreadNotifications || 0,
        skillGapsCount: skillGapsCount || 0,
        percentileRank,
      }}
    />
  );
}
