import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { WorkshopsClient } from "./workshops-client";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Workshops & FDPs",
  description: "Manage faculty development programs.",
};


export default async function WorkshopsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: workshops } = await supabase
    .from('workshops')
    .select('id, title, date, duration, status, capacity, registered_count, is_virtual')
    .eq('faculty_id', user.id)
    .order('date', { ascending: true });

  const { data: mentorships } = await supabase
    .from('mentorship_sessions')
    .select(`
      id, status, scheduled_at, notes,
      mentee:user_profiles!mentee_id (
        full_name, role
      )
    `)
    .eq('mentor_id', user.id);

  let formattedWorkshops = workshops || [];
  let formattedMentorships = mentorships || [];

  return <WorkshopsClient workshops={formattedWorkshops} mentorships={formattedMentorships} />;
}
