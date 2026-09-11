import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { FacultyDashboardClient } from "./faculty-dashboard-client";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Faculty Dashboard",
  description: "Overview of your academic and research activities.",
};

export default async function FacultyDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: userProfile } = await supabase
    .from('user_profiles')
    .select('full_name, institution_id')
    .eq('auth_id', user.id)
    .single();

  const userName = userProfile?.full_name || "Faculty Member";

  // Fetch active projects / consultancies
  const { data: activeProjects, count: activeCount } = await supabase
    .from('research_projects')
    .select('id, status', { count: 'exact' })
    .eq('lead_researcher_id', user.id)
    .eq('status', 'active');
    
  // Fetch pending projects (grants)
  const { data: pendingProjects, count: pendingCount } = await supabase
    .from('research_projects')
    .select('id, status', { count: 'exact' })
    .eq('lead_researcher_id', user.id)
    .eq('status', 'proposed');

  // Fetch FDP enrollments
  const { data: fdpEnrollments } = await supabase
    .from('fdp_enrollments')
    .select(`
      status,
      faculty_development_programs(duration_hours)
    `)
    .eq('faculty_id', user.id)
    .eq('status', 'completed');
    
  const fdpHoursCompleted = fdpEnrollments?.reduce((acc: number, curr: any) => acc + (curr.faculty_development_programs?.duration_hours || 0), 0) || 0;

  // Fetch unique students mentored
  const { data: mentorships } = await supabase
    .from('mentorship_sessions')
    .select('mentee_id')
    .eq('mentor_id', user.id);
    
  const uniqueStudents = new Set(mentorships?.map(m => m.mentee_id) || []);
  const studentsMentored = uniqueStudents.size;

  const stats = {
    activeConsultancies: activeCount || 0,
    fdpHoursCompleted,
    pendingGrants: pendingCount || 0,
    studentsMentored
  };

  // Fetch upcoming schedule from mentorships
  const { data: upcomingMentorships } = await supabase
    .from('mentorship_sessions')
    .select('id, scheduled_at, duration_minutes, status')
    .eq('mentor_id', user.id)
    .eq('status', 'scheduled')
    .gte('scheduled_at', new Date().toISOString())
    .order('scheduled_at', { ascending: true })
    .limit(3);
    
  const upcomingSchedule = upcomingMentorships?.map(session => ({
    id: session.id,
    title: "Mentorship Session",
    time: new Date(session.scheduled_at).toLocaleString(),
    duration: `${session.duration_minutes} mins`,
    type: "Meeting",
    typeColor: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    icon: "Users"
  })) || [];

  const aiRecommendations: any[] = [];

  return (
    <FacultyDashboardClient 
      stats={stats} 
      upcomingSchedule={upcomingSchedule} 
      aiRecommendations={aiRecommendations}
      userName={userName}
    />
  );
}
