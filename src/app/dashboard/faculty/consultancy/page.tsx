import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ConsultancyClient } from "./consultancy-client";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Consultancy Projects",
  description: "Manage industry consulting opportunities.",
};


export default async function ConsultancyPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  // Fetch RFPs (job listings with type freelance)
  const { data: rfpsData } = await supabase
    .from('job_listings')
    .select('*, employer_id')
    .eq('type', 'freelance')
    .eq('status', 'open');

  let rfps: any[] = [];
  if (rfpsData && rfpsData.length > 0) {
    const employerIds = rfpsData.map(r => r.employer_id);
    const { data: employerProfiles } = await supabase
      .from('user_profiles')
      .select('auth_id, industry_id')
      .in('auth_id', employerIds);

    const indIds = employerProfiles?.map(ep => ep.industry_id).filter(id => id != null) || [];
    let industryMap: Record<string, string> = {};

    if (indIds.length > 0) {
      const { data: industries } = await supabase
        .from('industries')
        .select('id, name')
        .in('id', indIds);
        
      const idToName = (industries || []).reduce((acc: any, curr) => {
         acc[curr.id] = curr.name;
         return acc;
      }, {});
      
      (employerProfiles || []).forEach(ep => {
         if (ep.industry_id && idToName[ep.industry_id]) {
             industryMap[ep.auth_id] = idToName[ep.industry_id];
         }
      });
    }

    rfps = rfpsData.map(r => ({
      id: r.id,
      title: r.title,
      company: industryMap[r.employer_id] || "Company",
      budget: r.stipend_salary_range,
      timeline: r.location || "Remote", // Just repurposing location for timeline if needed, or use deadline
      tags: Object.keys(r.required_skills || {}),
      status: r.status
    }));
  }

  // Fetch proposals (applications to freelance jobs)
  const { data: applications } = await supabase
    .from('job_applications')
    .select(`
      id,
      status,
      created_at,
      job_listings!inner(id, title, employer_id, stipend_salary_range)
    `)
    .eq('student_id', user.id) // faculty acts as student here in job_applications
    .eq('job_listings.type', 'freelance');

  let proposals: any[] = [];
  let activeContracts: any[] = [];

  if (applications && applications.length > 0) {
    // Similarly fetch company names
    const employerIds = applications.map((a: any) => a.job_listings.employer_id);
    const { data: employerProfiles } = await supabase
      .from('user_profiles')
      .select('auth_id, industry_id')
      .in('auth_id', employerIds);

    const indIds = employerProfiles?.map(ep => ep.industry_id).filter(id => id != null) || [];
    let industryMap: Record<string, string> = {};

    if (indIds.length > 0) {
      const { data: industries } = await supabase
        .from('industries')
        .select('id, name')
        .in('id', indIds);
        
      const idToName = (industries || []).reduce((acc: any, curr) => {
         acc[curr.id] = curr.name;
         return acc;
      }, {});
      
      (employerProfiles || []).forEach(ep => {
         if (ep.industry_id && idToName[ep.industry_id]) {
             industryMap[ep.auth_id] = idToName[ep.industry_id];
         }
      });
    }

    applications.forEach((app: any) => {
       const prop = {
         id: app.id,
         rfpId: app.job_listings.id.split('-')[0],
         company: industryMap[app.job_listings.employer_id] || "Company",
         title: app.job_listings.title,
         quoted: app.job_listings.stipend_salary_range || "Negotiable",
         submittedDate: new Date(app.created_at).toLocaleDateString(),
         status: app.status
       };
       proposals.push(prop);
       if (app.status === 'accepted') {
         activeContracts.push(prop);
       }
    });
  }

  return <ConsultancyClient rfps={rfps} proposals={proposals} activeContracts={activeContracts} />;
}
