import { Metadata } from "next";
import { FDPsClient } from "./fdps-client";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Faculty Development Programs",
  description: "Discover and enroll in industry-sponsored FDPs.",
};

export default async function FacultyFDPsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: fdps } = await supabase
    .from('faculty_development_programs')
    .select('*');

  const { data: enrollments } = await supabase
    .from('fdp_enrollments')
    .select('*')
    .eq('faculty_id', user.id);

  return <FDPsClient fdps={fdps || []} enrollments={enrollments || []} />;
}
