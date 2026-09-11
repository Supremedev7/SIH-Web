import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { NotificationsClient } from "./notifications-client";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notifications",
  description: "View your recent alerts and messages.",
};


export default async function NotificationsPage() {
  const supabase = await createClient();
  
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    redirect('/login');
  }

  // Fetch notifications
  const { data: notifications } = await supabase
    .from('notifications')
    .select('id, title, description, type, is_unread, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  return (
    <NotificationsClient initialNotifications={notifications || []} />
  );
}
