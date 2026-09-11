import { Metadata } from "next";
import { ResumeClient } from "./resume-client";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Resume Manager",
  description: "Upload CVs for AI parsing, skill extraction, and ATS scoring.",
};

export default async function ResumePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: files } = await supabase.storage.from('resumes').list(user.id);

  const resumes = (files || [])
    .filter(f => f.name !== '.emptyFolderPlaceholder')
    .map((f, index) => ({
      id: f.id || f.name,
      name: f.name,
      size: f.metadata?.size ? (f.metadata.size / 1024 / 1024).toFixed(2) + " MB" : "0 MB",
      date: f.created_at ? new Date(f.created_at).toLocaleDateString() : "Recently",
      status: index === 0 ? 'active' : 'archived', 
      score: "Pending AI Review", 
    }));

  return <ResumeClient resumes={resumes} />;
}
