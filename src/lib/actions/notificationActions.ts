"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function markNotificationAsRead(notificationId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const { error } = await supabase
    .from("notifications")
    .update({ read_at: new Date().toISOString() })
    .eq("id", notificationId)
    .eq("user_id", user.id); // Ensure user owns the notification

  if (error) {
    console.error("Error marking notification as read:", error);
    throw new Error(error.message);
  }

  revalidatePath("/dashboard/student/notifications");
  return { success: true };
}

export async function markAllNotificationsAsRead() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const { error } = await supabase
    .from("notifications")
    .update({ read_at: new Date().toISOString() })
    .eq("user_id", user.id)
    .is("read_at", null);

  if (error) {
    console.error("Error marking all as read:", error);
    throw new Error(error.message);
  }

  revalidatePath("/dashboard/student/notifications");
  return { success: true };
}
