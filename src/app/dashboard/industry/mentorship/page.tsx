import { Metadata } from "next";
import { MentorshipClient } from "./mentorship-client";

export const metadata: Metadata = {
  title: "Mentorship",
  description: "Industry mentorship and expert network.",
};

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function MentorshipPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: sessions } = await supabase
    .from('mentorship_sessions')
    .select(`
      *,
      user_profiles!mentee_id (
        full_name,
        department,
        avatar_url
      )
    `)
    .eq('mentor_id', user.id)
    .order('scheduled_at', { ascending: true });

  return <MentorshipClient initialSessions={sessions || []} />;
}
