import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { full_name, bio, phone, location, graduation_year, linkedin, github, portfolio } = body;

    // First fetch existing metadata to not overwrite other fields
    const { data: existingProfile } = await supabase
      .from('user_profiles')
      .select('metadata')
      .eq('auth_id', user.id)
      .single();

    const existingMetadata = existingProfile?.metadata || {};

    const updatedMetadata = {
      ...existingMetadata,
      phone,
      location,
      graduation_year,
      linkedin,
      github,
      portfolio
    };

    const { error: updateError } = await supabase
      .from('user_profiles')
      .update({
        full_name,
        bio,
        metadata: updatedMetadata
      })
      .eq('auth_id', user.id);

    if (updateError) {
      console.error("Profile update error:", updateError);
      return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
    }

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error("Profile API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
