"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateProfile(profileData: any) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const { error } = await supabase
    .from("user_profiles")
    .update(profileData)
    .eq("auth_id", user.id);

  if (error) {
    console.error("Error updating profile:", error);
    throw new Error(error.message);
  }

  // Determine paths to revalidate based on likely roles, or revalidate everything
  revalidatePath("/dashboard/student/profile");
  revalidatePath("/dashboard/faculty/profile");
  revalidatePath("/dashboard/industry/settings");
  revalidatePath("/dashboard/institute/settings");
  return { success: true };
}

export async function updateUserSettings(settings: Record<string, unknown>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  // Fetch existing metadata to prevent wiping onboarding_completed or other fields
  const { data: existingProfile } = await supabase
    .from("user_profiles")
    .select("metadata")
    .eq("auth_id", user.id)
    .single();

  const currentMetadata = (existingProfile?.metadata as Record<string, unknown>) || {};
  const mergedMetadata = {
    ...currentMetadata,
    ...settings,
  };

  const { error } = await supabase
    .from("user_profiles")
    .update({ metadata: mergedMetadata })
    .eq("auth_id", user.id);

  if (error) {
    console.error("Error updating settings:", error);
    throw new Error(error.message);
  }

  return { success: true };
}

export async function verifyStudentSkills(studentId: string, verifiedBy: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  // Simple stub for verifying skills
  const { error } = await supabase
    .from("skill_profiles")
    .update({ verified_by: verifiedBy, verified_at: new Date().toISOString() })
    .eq("user_id", studentId);

  if (error) {
    console.error("Error verifying skills:", error);
    throw new Error(error.message);
  }

  revalidatePath("/dashboard/institute/students");
  return { success: true };
}
