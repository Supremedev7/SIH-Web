import type { Database } from './database.types'

export type JobListing = Database['public']['Tables']['job_listings']['Row']
export type JobApplication = Database['public']['Tables']['job_applications']['Row']
export type MentorshipSession = Database['public']['Tables']['mentorship_sessions']['Row']
export type CollaborationProject = Database['public']['Tables']['collaboration_projects']['Row']
export type UserProfile = Database['public']['Tables']['user_profiles']['Row']
export type Industry = Database['public']['Tables']['industries']['Row']
export type SkillProfile = Database['public']['Tables']['skill_profiles']['Row']

// Extended Types for UI (Joins)
export interface JobListingWithCounts extends JobListing {
  applications_count?: number
  match_score?: number
}

export interface CandidateApplication extends JobApplication {
  applicant: {
    id: string
    full_name: string
    avatar_url: string | null
    institution: {
      name: string
    } | null
  } | null
  match_score?: number
}

export interface MentorshipSessionWithDetails extends MentorshipSession {
  mentee: {
    id: string
    full_name: string
    avatar_url: string | null
  } | null
  mentor: {
    id: string
    full_name: string
    avatar_url: string | null
  } | null
}

export interface CollaborationProjectWithDetails extends CollaborationProject {
  industry: Industry | null
  institution: {
    name: string
    id: string
  } | null
}

export interface IndustrySettings extends Industry {
  company_name: string
  industry_sector: string | null
  company_size: 'startup' | 'sme' | 'large' | 'mnc' | null
  website: string | null
  logo_url: string | null
  description: string | null
  headquarters: string | null
  locations: string | null
  contact_email: string | null
  contact_person: string | null
}
