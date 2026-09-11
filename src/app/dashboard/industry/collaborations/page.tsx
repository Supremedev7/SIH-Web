import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { CollaborationsClient } from "./collaborations-client";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collaborations",
  description: "Manage academic partnerships and projects.",
};


export default async function CollaborationsPage() {
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

  let researchProjects: any[] = [];
  let partnerships: any[] = [];

  if (userProfile?.industry_id) {
    const { data: projectsData } = await supabase
      .from('research_projects')
      .select(`
        id, title, description, status, grant_amount, created_at,
        institutions ( name )
      `)
      .eq('industry_id', userProfile.industry_id)
      .order('created_at', { ascending: false });
    
    researchProjects = projectsData || [];

    const { data: partnershipsData } = await supabase
      .from('institutional_partnerships')
      .select(`
        id, status, created_at,
        institutions ( name )
      `)
      .eq('industry_id', userProfile.industry_id)
      .order('created_at', { ascending: false });

    partnerships = partnershipsData || [];
  }

  return (
    <CollaborationsClient 
      industryProfile={userProfile}
      researchProjects={researchProjects}
      partnerships={partnerships}
    />
  );
}
