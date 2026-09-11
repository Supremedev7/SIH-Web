import { z } from "zod"

export const opportunitySchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title must be less than 100 characters"),
  type: z.enum(["job", "internship", "project"]),
  location: z.string().min(2, "Location is required"),
  is_remote: z.boolean().default(false),
  description: z.string().min(50, "Description must be at least 50 characters"),
  requirements: z.string().min(10, "Requirements are needed"),
  skills_required: z.array(z.string()).min(1, "At least one skill is required"),
  stipend_salary: z.string().optional(),
  duration: z.string().optional(),
  status: z.enum(["draft", "open", "closed"]).default("open"),
  deadline: z.string().optional()
})

export type OpportunityFormValues = z.infer<typeof opportunitySchema>

export const industrySettingsSchema = z.object({
  company_name: z.string().min(2, "Company name is required"),
  industry_sector: z.string().min(2, "Industry sector is required"),
  company_size: z.enum(["startup", "sme", "large", "mnc"]),
  website: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  description: z.string().min(20, "Please provide a brief description").optional(),
  headquarters: z.string().min(2, "Headquarters location is required"),
  locations: z.string().optional(),
  contact_email: z.string().email("Must be a valid email"),
  contact_person: z.string().min(2, "Contact person name is required")
})

export type IndustrySettingsFormValues = z.infer<typeof industrySettingsSchema>

export const mentorshipSessionSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  duration_minutes: z.coerce.number().min(15).max(180),
  meeting_link: z.string().url("Must be a valid URL").optional().or(z.literal(""))
})

export type MentorshipSessionFormValues = z.infer<typeof mentorshipSessionSchema>
