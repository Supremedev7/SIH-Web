import { Metadata } from "next";
import { SettingsClient } from "./settings-client";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your account preferences, security, and notifications.",
};

export default async function SettingsPage() {
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

  return <SettingsClient profile={profile} />;
}
