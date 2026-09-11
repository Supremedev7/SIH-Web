"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function applyForJob(jobId: string, coverLetter?: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const { error } = await supabase
    .from("job_applications")
    .insert({
      job_id: jobId,
      student_id: user.id,
      cover_letter: coverLetter,
      status: "applied"
    });

  if (error) {
    console.error("Error applying for job:", error);
    throw new Error(error.message);
  }

  revalidatePath("/dashboard/student/opportunities");
  revalidatePath("/dashboard/student");
  return { success: true };
}

export async function updateApplicationStatus(applicationId: string, status: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const { error } = await supabase
    .from("job_applications")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", applicationId);

  if (error) {
    console.error("Error updating application status:", error);
    throw new Error(error.message);
  }

  revalidatePath("/dashboard/industry/candidates");
  return { success: true };
}

export async function createJobPosting(jobData: any) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const { error } = await supabase
    .from("job_listings")
    .insert({
      ...jobData,
      employer_id: user.id,
    });

  if (error) {
    console.error("Error creating job posting:", error);
    throw new Error(error.message);
  }

  revalidatePath("/dashboard/industry/opportunities");
  return { success: true };
}
