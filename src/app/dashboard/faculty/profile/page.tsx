import { Metadata } from "next";
import { ProfileClient } from "./profile-client";

export const metadata: Metadata = {
  title: "Academic Profile & Settings",
  description: "Manage your digital CV, credentials, and visibility.",
};

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function FacultyProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('auth_id', user.id)
    .single();

  const { data: credentials } = await supabase
    .from('credentials')
    .select('*')
    .eq('user_id', user.id);

  return <ProfileClient profile={profile} credentials={credentials || []} />;
}
