import { Metadata } from "next";
import { ProfileClient } from "./profile-client";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Profile",
  description: "Manage your professional and academic information.",
};

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('user_profiles')
    .select(`
      *,
      institutions (
        name
      )
    `)
    .eq('auth_id', user.id)
    .single();

  return <ProfileClient profile={profile} email={user.email ?? null} />;
}
