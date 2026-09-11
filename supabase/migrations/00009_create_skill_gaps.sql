-- ==========================================
-- Phase 2: Skill Gaps (AI-identified gaps)
-- ==========================================

CREATE TABLE IF NOT EXISTS public.skill_gaps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    skill_profile_id UUID NOT NULL REFERENCES public.skill_profiles(id) ON DELETE CASCADE,
    skill_name TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('technical', 'soft', 'domain')),
    current_level DOUBLE PRECISION DEFAULT 0,
    required_level DOUBLE PRECISION DEFAULT 0,
    gap_score DOUBLE PRECISION DEFAULT 0,
    priority TEXT DEFAULT 'medium' CHECK (priority IN ('critical', 'high', 'medium', 'low')),
    recommended_resources JSONB DEFAULT '[]'::jsonb,
    identified_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.skill_gaps ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can view gaps linked to their own skill profile
CREATE POLICY "Users can view own skill gaps."
    ON public.skill_gaps FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.skill_profiles sp
            WHERE sp.id = public.skill_gaps.skill_profile_id
            AND sp.user_id = auth.uid()
        )
    );

-- Users can insert gaps for their own profile
CREATE POLICY "Users can insert own skill gaps."
    ON public.skill_gaps FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.skill_profiles sp
            WHERE sp.id = public.skill_gaps.skill_profile_id
            AND sp.user_id = auth.uid()
        )
    );

-- Users can delete their own gaps (for re-analysis)
CREATE POLICY "Users can delete own skill gaps."
    ON public.skill_gaps FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM public.skill_profiles sp
            WHERE sp.id = public.skill_gaps.skill_profile_id
            AND sp.user_id = auth.uid()
        )
    );

-- Institution users can view gaps of students in their institution
CREATE POLICY "Institutions can view student skill gaps."
    ON public.skill_gaps FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles p
            WHERE p.auth_id = auth.uid()
            AND p.role = 'institution'
            AND EXISTS (
                SELECT 1 FROM public.skill_profiles sp
                JOIN public.user_profiles s ON s.auth_id = sp.user_id
                WHERE sp.id = public.skill_gaps.skill_profile_id
                AND s.institution_id = p.institution_id
            )
        )
    );

-- Indexes
CREATE INDEX idx_skill_gaps_profile ON public.skill_gaps(skill_profile_id);
CREATE INDEX idx_skill_gaps_priority ON public.skill_gaps(priority);
CREATE INDEX idx_skill_gaps_category ON public.skill_gaps(category);
