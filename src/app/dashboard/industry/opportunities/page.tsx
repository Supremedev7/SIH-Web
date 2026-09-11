import { createClient } from "@/lib/supabase/server";
import { OpportunitiesClient } from "./opportunities-client";
import { redirect } from "next/navigation";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Post Opportunities",
  description: "Create and manage job/internship listings.",
};


export default async function IndustryOpportunitiesPage() {
  const supabase = await createClient();

  // Ensure user is authenticated
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  // Fetch job listings for this specific employer
  const { data: jobs, error } = await supabase
    .from('job_listings')
    .select('id, title, type, stipend_salary_range, location, status, created_at')
    .eq('employer_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching job listings:", error);
  }

  return <OpportunitiesClient jobs={jobs || []} />;
}
