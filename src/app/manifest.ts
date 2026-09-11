import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SCI — Student Council of India",
    short_name: "SCI Portal",
    description:
      "Academia–Industry Collaboration Portal for Skill Mapping, Internships & Placement.",
    start_url: "/dashboard/student",
    display: "standalone",
    background_color: "#0B0F19",
    theme_color: "#0B0F19",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    shortcuts: [
      {
        name: "Student Hub",
        short_name: "Student",
        url: "/dashboard/student",
        description: "Access your skills radar, jobs & applications",
      },
      {
        name: "Industry ATS",
        short_name: "Recruiter",
        url: "/dashboard/industry/opportunities",
        description: "Source candidates and manage campus drives",
      },
      {
        name: "Institution Console",
        short_name: "T&P Cell",
        url: "/dashboard/institute",
        description: "Campus placement analytics & student tracking",
      },
      {
        name: "Faculty Cell",
        short_name: "Faculty",
        url: "/dashboard/faculty",
        description: "Academic research tracks and mentorship",
      },
    ],
  };
}
