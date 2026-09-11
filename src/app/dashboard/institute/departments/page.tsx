import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { DepartmentsClient } from "./departments-client";

export const metadata: Metadata = {
  title: "Departments",
  description: "Department Analytics.",
};

export default async function DepartmentsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: userProfile } = await supabase
    .from('user_profiles')
    .select('institution_id')
    .eq('auth_id', user.id)
    .single();

  if (!userProfile?.institution_id) {
    return <div>Not authorized</div>;
  }

  // Fetch all students for this institution
  const { data: studentsData } = await supabase
    .from('user_profiles')
    .select(`
       department,
       job_applications(status)
    `)
    .eq('institution_id', userProfile.institution_id)
    .eq('role', 'student');

  // Aggregate by department
  const depts: Record<string, any> = {};
  
  if (studentsData) {
    studentsData.forEach(student => {
      const deptName = student.department || 'General';
      if (!depts[deptName]) {
        depts[deptName] = { name: deptName, students: 0, placed: 0 };
      }
      depts[deptName].students++;
      
      const apps = student.job_applications || [];
      const isPlaced = apps.some((a: any) => a.status === 'hired');
      if (isPlaced) depts[deptName].placed++;
    });
  }

  const processedDepartments = Object.values(depts).map(d => ({
    id: d.name.substring(0, 3).toUpperCase(),
    name: d.name,
    head: "HOD",
    students: d.students,
    placed: d.placed,
    placementRate: d.students > 0 ? Math.round((d.placed / d.students) * 100) : 0,
    topSkill: "Programming",
  }));

  return <DepartmentsClient initialDepartments={processedDepartments} />;
}
