// ============================================================
// SCI — TypeScript Types for Auth & User Profiles
// ============================================================

import type { UserRole } from "@/lib/constants/roles";

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  fullName: string;
  avatarUrl: string | null;
  metadata?: Record<string, any> | null;
}

export interface UserProfile {
  id: string;
  authId: string;
  email: string;
  role: UserRole;
  fullName: string;
  phone: string | null;
  avatarUrl: string | null;
  institutionId: string | null;
  industryId: string | null;
  department: string | null;
  designation: string | null;
  bio: string | null;
  socialLinks: SocialLinks | null;
  metadata: Record<string, unknown> | null;
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SocialLinks {
  linkedin?: string;
  github?: string;
  twitter?: string;
  website?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  fullName: string;
  role: UserRole;
  phone?: string;
  institutionId?: string;
  industryId?: string;
  department?: string;
  designation?: string;
}

export interface AuthState {
  user: AuthUser | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}
