import { z } from "zod/v4";

export const profileSchema = z.object({
  full_name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters"),
  bio: z
    .string()
    .max(500, "Bio must be at most 500 characters")
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .regex(/^(\+?\d{10,15})?$/, "Enter a valid phone number")
    .optional()
    .or(z.literal("")),
  location: z
    .string()
    .max(100, "Location must be at most 100 characters")
    .optional()
    .or(z.literal("")),
  graduation_year: z
    .string()
    .regex(/^(20\d{2})?$/, "Enter a valid year (e.g. 2027)")
    .optional()
    .or(z.literal("")),
  linkedin: z
    .url("Enter a valid URL")
    .optional()
    .or(z.literal("")),
  github: z
    .url("Enter a valid URL")
    .optional()
    .or(z.literal("")),
  portfolio: z
    .url("Enter a valid URL")
    .optional()
    .or(z.literal("")),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
