-- ==========================================
-- Phase 2: Skill Profiles (aggregated skill data)
-- ==========================================

CREATE TABLE IF NOT EXISTS public.skill_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    technical_skills JSONB DEFAULT '{}'::jsonb,
    soft_skills JSONB DEFAULT '{}'::jsonb,
    domain_skills JSONB DEFAULT '{}'::jsonb,
    strengths JSONB DEFAULT '[]'::jsonb,
    weaknesses JSONB DEFAULT '[]'::jsonb,
    employability_score DOUBLE PRECISION DEFAULT 0,
    career_readiness TEXT DEFAULT 'beginner' CHECK (career_readiness IN ('beginner', 'intermediate', 'advanced', 'industry_ready')),
    industry_alignment JSONB DEFAULT '{}'::jsonb,
    last_assessed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Triggers
CREATE TRIGGER handle_skill_profiles_updated_at
    BEFORE UPDATE ON public.skill_profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Enable RLS
ALTER TABLE public.skill_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can view their own skill profile
CREATE POLICY "Users can view own skill profile."
    ON public.skill_profiles FOR SELECT
    USING (auth.uid() = user_id);

-- Users can insert/update their own skill profile
CREATE POLICY "Users can insert own skill profile."
    ON public.skill_profiles FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own skill profile."
    ON public.skill_profiles FOR UPDATE
    USING (auth.uid() = user_id);

-- Institution users can view skill profiles of students in their institution
CREATE POLICY "Institutions can view student skill profiles."
    ON public.skill_profiles FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles p
            WHERE p.auth_id = auth.uid()
            AND p.role = 'institution'
            AND EXISTS (
                SELECT 1 FROM public.user_profiles s
                WHERE s.auth_id = public.skill_profiles.user_id
                AND s.institution_id = p.institution_id
            )
        )
    );

-- Industry users can view skill profiles (for candidate matching)
CREATE POLICY "Industry can view skill profiles for matching."
    ON public.skill_profiles FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles p
            WHERE p.auth_id = auth.uid()
            AND p.role = 'industry'
        )
    );

-- Indexes
CREATE INDEX idx_skill_profiles_user ON public.skill_profiles(user_id);
CREATE INDEX idx_skill_profiles_readiness ON public.skill_profiles(career_readiness);
CREATE INDEX idx_skill_profiles_score ON public.skill_profiles(employability_score);
