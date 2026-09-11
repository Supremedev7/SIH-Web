"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateSettings(settings: Record<string, unknown>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  // Merge settings into existing metadata
  const { data: profile } = await supabase
    .from("user_profiles")
    .select("metadata")
    .eq("auth_id", user.id)
    .single();

  const currentMetadata = (profile?.metadata as Record<string, unknown>) || {};
  const mergedMetadata = { ...currentMetadata, settings };

  const { error } = await supabase
    .from("user_profiles")
    .update({ metadata: mergedMetadata })
    .eq("auth_id", user.id);

  if (error) {
    console.error("Error updating settings:", error);
    throw new Error("Failed to save settings");
  }

  revalidatePath("/dashboard/student/settings");
}

export async function changePassword(newPassword: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  if (newPassword.length < 8) throw new Error("Password must be at least 8 characters");

  const { error } = await supabase.auth.updateUser({ password: newPassword });

  if (error) {
    console.error("Error changing password:", error);
    throw new Error(error.message || "Failed to change password");
  }
}
