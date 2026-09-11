import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { OnboardingClient } from "./onboarding-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Onboarding - Student Portal",
  description: "Complete your profile and take your baseline skill assessment.",
};

export default async function OnboardingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Check if already onboarded
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('metadata')
    .eq('auth_id', user.id)
    .single();

  if (profile?.metadata?.onboarding_completed) {
    redirect('/dashboard/student');
  }

  // Fetch institutions for the dropdown
  const { data: institutions } = await supabase
    .from('institutions')
    .select('id, name')
    .order('name');

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 relative z-10">
      <OnboardingClient institutions={institutions || []} />
    </div>
  );
}
