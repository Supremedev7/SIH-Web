import { z } from "zod";
import { ROLES } from "@/lib/constants/roles";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character");

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  role: z.enum(["student", "academician", "industry", "institution"], {
    message: "Please select a role",
  }),
  fullName: z.string().min(2, "Full name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  password: passwordSchema,
  confirmPassword: z.string(),
  // Conditional fields based on role
  institutionId: z.string().optional(),
  institutionName: z.string().optional(),
  aisheCode: z.string().optional(),
  industryId: z.string().optional(),
  companyName: z.string().optional(),
  collegeName: z.string().optional(),
  stream: z.string().optional(),
  graduationYear: z.string().optional(),
  department: z.string().optional(),
  designation: z.string().optional(),
  phone: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type RegisterInput = z.infer<typeof registerSchema>;

// Reset password schemas
export const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export const updatePasswordSchema = z.object({
  password: passwordSchema,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>;
