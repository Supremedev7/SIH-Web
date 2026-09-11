import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { CoursesClient } from "./courses-client";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Courses",
  description: "Access your enrolled courses and learning materials.",
};


export default async function CoursesPage() {
  const supabase = await createClient();
  
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    redirect('/login');
  }

  // Fetch available courses
  const { data: courses } = await supabase
    .from('courses')
    .select('id, title, provider, type, image_url, tags, rating, reviews, duration, created_at')
    .order('created_at', { ascending: false });

  // Fetch student's enrolled courses with progress
  const { data: studentCourses } = await supabase
    .from('student_courses')
    .select(`
      progress,
      enrolled_at,
      courses (id, title, provider)
    `)
    .eq('student_id', user.id)
    .order('enrolled_at', { ascending: false });

  // Fetch student's skill gaps (optional, to map to courses)
  const { data: skillGaps } = await supabase
    .from('skill_gaps')
    .select('id, skill_profile_id')
    .eq('skill_profile_id', user.id) // Need to join properly if using skill_profile_id
    .limit(5);

  return (
    <CoursesClient 
      courses={courses || []} 
      studentCourses={studentCourses || []}
      skillGaps={skillGaps || []}
    />
  );
}
