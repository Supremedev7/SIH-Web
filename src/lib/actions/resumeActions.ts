"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function uploadResume(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const file = formData.get('file') as File;
  if (!file) {
    return { error: "No file provided" };
  }

  // Upload to resumes bucket under user's folder
  const filePath = `${user.id}/${Date.now()}_${file.name}`;
  const { data, error } = await supabase.storage
    .from('resumes')
    .upload(filePath, file);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard/student/resume");
  return { success: true, path: data.path };
}

export async function deleteResume(filePath: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  // Ensure user is only deleting their own resume
  if (!filePath.startsWith(`${user.id}/`)) {
    return { error: "Unauthorized file access" };
  }

  const { error } = await supabase.storage
    .from('resumes')
    .remove([filePath]);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard/student/resume");
  return { success: true };
}
