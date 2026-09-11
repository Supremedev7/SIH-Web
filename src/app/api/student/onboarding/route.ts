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
    const { profile, role, score } = body;

    // Resolve institution name to ID if possible
    let resolvedInstitutionId = null;
    let customInstitution = null;

    if (profile.institutionId) {
      const { data: instData } = await supabase
        .from('institutions')
        .select('id')
        .ilike('name', profile.institutionId)
        .single();
      
      if (instData) {
        resolvedInstitutionId = instData.id;
      } else {
        customInstitution = profile.institutionId;
      }
    }

    // 1. Update user_profiles
    const { error: profileError } = await supabase
      .from('user_profiles')
      .update({
        full_name: profile.fullName,
        bio: profile.bio,
        institution_id: resolvedInstitutionId,
        department: profile.department,
        metadata: {
          hobbies: profile.hobbies,
          target_role: role,
          onboarding_completed: true,
          custom_institution: customInstitution
        }
      })
      .eq('auth_id', user.id);

    if (profileError) {
      console.error("Profile Error:", profileError);
      return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
    }

    // 2. Generate Skill Profile Data based on role and score
    const baseTechnicalSkills = getBaseSkillsForRole(role);
    const technicalSkillsMap: Record<string, number> = {};
    baseTechnicalSkills.forEach(s => {
      technicalSkillsMap[s.name] = Math.round((s.level * score) / 100);
    });

    const softSkillsMap: Record<string, number> = {
      "Communication": 75,
      "Problem Solving": 85
    };

    const readiness = score > 80 ? 'industry_ready' : score > 60 ? 'advanced' : score > 40 ? 'intermediate' : 'beginner';

    // 3. Upsert Skill Profile
    const { error: skillError } = await supabase
      .from('skill_profiles')
      .upsert({
        user_id: user.id,
        technical_skills: technicalSkillsMap,
        soft_skills: softSkillsMap,
        employability_score: score,
        career_readiness: readiness,
        last_assessed_at: new Date().toISOString()
      }, { onConflict: 'user_id' });

    if (skillError) {
      console.error("Skill Profile Error:", skillError);
      // We don't hard fail here as profile was updated
    }

    // 4. (Optional) Log to skill_assessments
    // We would need an assessment_template_id, but since we hardcoded questions,
    // we can skip this step or insert a dummy assessment if schema allows null template_id.
    // For now, we will just rely on the skill_profiles update.

    return NextResponse.json({ success: true, readiness });

  } catch (error: any) {
    console.error("Onboarding API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

function getBaseSkillsForRole(role: string) {
  switch (role) {
    case 'frontend':
      return [
        { name: 'React', level: 100 },
        { name: 'Next.js', level: 90 },
        { name: 'CSS/Tailwind', level: 100 },
        { name: 'TypeScript', level: 85 }
      ];
    case 'backend':
      return [
        { name: 'Node.js', level: 100 },
        { name: 'PostgreSQL', level: 90 },
        { name: 'System Design', level: 80 },
        { name: 'API Design', level: 95 }
      ];
    case 'data_science':
      return [
        { name: 'Python', level: 100 },
        { name: 'Machine Learning', level: 85 },
        { name: 'Pandas/NumPy', level: 95 },
        { name: 'SQL', level: 90 }
      ];
    case 'core_engineering':
      return [
        { name: 'AutoCAD', level: 90 },
        { name: 'Thermodynamics', level: 85 },
        { name: 'Fluid Mechanics', level: 80 },
        { name: 'MATLAB', level: 95 }
      ];
    default:
      return [
        { name: 'General Programming', level: 80 }
      ];
  }
}
