import { z } from "zod/v4";

export const jobApplicationSchema = z.object({
  job_id: z.string().uuid("Invalid job ID"),
  cover_letter: z
    .string()
    .max(2000, "Cover letter must be at most 2000 characters")
    .optional()
    .or(z.literal("")),
  resume_url: z
    .url("Enter a valid resume URL")
    .optional()
    .or(z.literal("")),
});

export type JobApplicationFormData = z.infer<typeof jobApplicationSchema>;
