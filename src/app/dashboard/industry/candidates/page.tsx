import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { CandidatesClient } from "./candidates-client";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Candidate Search",
  description: "Find top talent for your organization.",
};


export default async function CandidatesPage() {
  const supabase = await createClient();
  
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    redirect('/login');
  }

  // Fetch user profile
  const { data: userProfile } = await supabase
    .from('user_profiles')
    .select('industry_id')
    .eq('auth_id', user.id)
    .single();

  // Fetch jobs for this company
  let jobs: any[] = [];
  if (userProfile?.industry_id) {
    const { data: fetchedJobs } = await supabase
      .from('job_listings')
      .select('id, title, status')
      .eq('employer_id', userProfile.industry_id)
      .order('created_at', { ascending: false });
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
        job_id,
        student_id,
        status,
        resume_url,
        cover_letter,
        created_at,
        user_profiles!student_id ( full_name, contact_email )
      `)
      .in('job_id', jobIds)
      .order('created_at', { ascending: false });
    applications = fetchedApps || [];
  }

  return (
    <CandidatesClient 
      initialJobs={jobs}
      initialApplications={applications}
    />
  );
}
