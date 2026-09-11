"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function proposeResearchWorkspace(workspaceData: any) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const { error } = await supabase
    .from("research_projects")
    .insert({
      ...workspaceData,
      lead_researcher_id: user.id,
      status: "proposed"
    });

  if (error) {
    console.error("Error proposing workspace:", error);
    throw new Error(error.message);
  }

  revalidatePath("/dashboard/faculty/research");
  return { success: true };
}
