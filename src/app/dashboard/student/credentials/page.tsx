import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { CredentialsClient } from "./credentials-client";

export const metadata: Metadata = {
  title: "Credentials & Portfolio",
  description: "Verified academic depository and read-only employer view.",
};

export default async function CredentialsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('full_name, department, designation, bio, metadata')
    .eq('auth_id', user.id)
    .single();

  const { data: skillProfile } = await supabase
    .from('skill_profiles')
    .select('technical_skills, employability_score')
    .eq('user_id', user.id)
    .single();

  const { data: credentials } = await supabase
    .from('credentials')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  return <CredentialsClient profile={profile} credentials={credentials || []} skillProfile={skillProfile} email={user.email ?? null} />;
}
