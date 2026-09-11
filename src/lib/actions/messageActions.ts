"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function sendMessage(receiverId: string, content: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  if (!content.trim()) throw new Error("Message cannot be empty");
  if (!receiverId) throw new Error("Recipient is required");

  const { error } = await supabase
    .from("messages")
    .insert({
      sender_id: user.id,
      receiver_id: receiverId,
      content: content.trim(),
    });

  if (error) {
    console.error("Error sending message:", error);
    throw new Error("Failed to send message");
  }

  revalidatePath("/dashboard/student/messaging");
}

export async function markMessageAsRead(messageId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("messages")
    .update({ is_read: true })
    .eq("id", messageId)
    .eq("receiver_id", user.id);

  if (error) {
    console.error("Error marking message read:", error);
    throw new Error("Failed to mark as read");
  }
}
