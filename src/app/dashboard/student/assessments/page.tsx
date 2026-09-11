import { Metadata } from "next";
import { AssessmentsClient } from "./assessments-client";

export const metadata: Metadata = {
  title: "Assessments & Quizzes",
  description: "Standardized proctored evaluations and adaptive technical quizzes.",
};

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AssessmentsPage() {
  const supabase = await createClient();

  // Ensure user is authenticated
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  // Fetch assessments
  const { data: assessments } = await supabase
    .from('skill_assessments')
    .select('*, assessment_templates(title, description, duration_minutes)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  return <AssessmentsClient assessments={assessments || []} />;
}
