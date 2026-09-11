import { Metadata } from "next";
import { MessagingClient } from "./messaging-client";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Messages",
  description: "Direct communications with recruiters, faculty, and groups.",
};

export default async function MessagingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  // Fetch messages where user is sender or receiver
  const { data: messages } = await supabase
    .from('messages')
    .select(`
      id,
      content,
      created_at,
      is_read,
      sender_id,
      receiver_id
    `)
    .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
    .order('created_at', { ascending: false });

  // Fetch profiles for the participants
  const participantIds = new Set<string>();
  messages?.forEach(m => {
    if (m.sender_id !== user.id) participantIds.add(m.sender_id);
    if (m.receiver_id !== user.id) participantIds.add(m.receiver_id);
  });

  let profiles: Array<{ auth_id: string; full_name: string; role: string }> = [];
  if (participantIds.size > 0) {
    const { data: p } = await supabase
      .from('user_profiles')
      .select('auth_id, full_name, role')
      .in('auth_id', Array.from(participantIds));
    profiles = p || [];
  }

  // Format messages for the client
  const formattedMessages = messages?.map(m => {
    const otherId = m.sender_id === user.id ? m.receiver_id : m.sender_id;
    const otherProfile = profiles.find(p => p.auth_id === otherId);
    return {
      ...m,
      other_user: otherProfile || { full_name: 'Unknown User', role: 'unknown' }
    };
  }) || [];

  return <MessagingClient currentUserId={user.id} initialMessages={formattedMessages} />;
}
