import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { IndustryDashboardClient } from "./industry-dashboard-client";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industry Dashboard",
  description: "Overview of your talent pipeline and partnerships.",
};


import type { IndustrySettings } from "@/types/industry-portal";

export default async function IndustryDashboard() {
  const supabase = await createClient();
  
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    redirect('/login');
  }

  // Fetch user profile
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('auth_id', user.id)
    .single();

  // Fetch industry profile
  let industryProfile: IndustrySettings | null = null;
  if (profile?.industry_id) {
    const { data } = await supabase
      .from('industries')
      .select('*')
      .eq('id', profile.industry_id)
      .single();
    industryProfile = data as IndustrySettings | null;
  }
    
  if (!industryProfile) {
    // If not an industry user, might redirect, but for now we proceed
  }

  // Fetch jobs for this company
  let jobs: any[] = [];
  if (profile?.industry_id) {
    const { data: fetchedJobs } = await supabase
      .from('job_listings')
      .select('id, title, status, location, employment_type, created_at, job_applications(id)')
      .eq('employer_id', profile.industry_id)
      .eq('status', 'published');
    jobs = fetchedJobs || [];
  }

  // Fetch applications for these jobs
  let applications: any[] = [];
  if (jobs.length > 0) {
    const jobIds = jobs.map(j => j.id);
    const { data: fetchedApps } = await supabase
      .from('job_applications')
      .select(`
        id,
        status,
        created_at,
        job_listings ( title ),
        user_profiles!student_id ( full_name )
      `)
      .in('job_id', jobIds)
      .order('created_at', { ascending: false });
    applications = fetchedApps || [];
  }

  return (
    <IndustryDashboardClient 
      profile={profile}
      industryProfile={industryProfile}
      jobs={jobs}
      applications={applications}
    />
  );
}
