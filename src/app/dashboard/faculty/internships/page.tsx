import { Metadata } from "next";
import { InternshipsClient } from "./internships-client";

export const metadata: Metadata = {
  title: "Faculty Internships",
  description: "Discover temporary industry roles and sabbaticals.",
};

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function FacultyInternshipsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: opportunities } = await supabase
    .from('job_listings')
    .select(`
      id, title, description, location, is_remote, status,
      employer:user_profiles!employer_id(full_name, organization)
    `)
    .eq('status', 'open');

  const { data: applications } = await supabase
    .from('job_applications')
    .select(`
      id, status, created_at,
      job:job_listings(id, title, location, employer:user_profiles!employer_id(full_name, organization))
    `)
    .eq('student_id', user.id);

  return <InternshipsClient opportunities={opportunities || []} applications={applications || []} />;
}
