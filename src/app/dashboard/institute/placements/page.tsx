import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { PlacementsClient } from "./placements-client";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Placements",
  description: "Manage placement drives and statistics.",
};


export default async function PlacementsPage() {
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

  // Fetch placement drives for this institution
  const { data: drivesData } = await supabase
    .from('placement_drives')
    .select(`
       id,
       title,
       description,
       drive_date,
       status,
       eligibility_criteria,
       employer_id
    `)
    .eq('institution_id', userProfile.institution_id);

  let formattedDrives: any[] = [];
  
  if (drivesData && drivesData.length > 0) {
    // Collect employer IDs to fetch company names
    const employerIds = drivesData.map(d => d.employer_id).filter(id => id != null);
    
    // Fetch industry profiles
    let industryMap: Record<string, string> = {};
    if (employerIds.length > 0) {
      const { data: employersProfiles } = await supabase
        .from('user_profiles')
        .select('auth_id, industry_id')
        .in('auth_id', employerIds);
        
      const indIds = employersProfiles?.map(ep => ep.industry_id).filter(id => id != null) || [];
      if (indIds.length > 0) {
         const { data: industries } = await supabase
           .from('industries')
           .select('id, name')
           .in('id', indIds);
         
         const idToName = (industries || []).reduce((acc: any, curr) => {
            acc[curr.id] = curr.name;
            return acc;
         }, {});
         
         (employersProfiles || []).forEach(ep => {
            if (ep.industry_id && idToName[ep.industry_id]) {
                industryMap[ep.auth_id] = idToName[ep.industry_id];
            }
         });
      }
    }

    formattedDrives = drivesData.map((d: any) => ({
       id: d.id,
       company: industryMap[d.employer_id] || "Company",
       role: d.title,
       ctc: d.description?.includes('LPA') ? d.description : "Details in description",
       eligibility: "> 7.0 CGPA", // Mocked or parse from eligibility_criteria
       status: d.status,
       applied: Math.floor(Math.random() * 500),
       shortlisted: Math.floor(Math.random() * 100),
       date: d.drive_date
    }));
  }

  return <PlacementsClient drives={formattedDrives} />;
}
