import { Metadata } from "next";
import { ResearchClient } from "./research-client";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Research & Innovation",
  description: "Collaborate on joint industry-academia research and seek funding.",
};

export default async function FacultyResearchPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: projects } = await supabase
    .from('research_projects')
    .select(`
      *,
      collaborations ( count )
    `)
    .eq('lead_researcher_id', user.id);

  return <ResearchClient initialProjects={projects || []} />;
}
