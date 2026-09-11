-- ==========================================
-- Phase 2: Skill Assessments (student responses)
-- ==========================================

CREATE TABLE IF NOT EXISTS public.skill_assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    template_id UUID REFERENCES public.assessment_templates(id) ON DELETE SET NULL,
    assessment_type TEXT NOT NULL CHECK (assessment_type IN ('technical', 'soft', 'aptitude', 'domain_specific', 'combined')),
    questions_snapshot JSONB NOT NULL DEFAULT '[]'::jsonb,
    responses JSONB NOT NULL DEFAULT '{}'::jsonb,
    category_scores JSONB DEFAULT '{}'::jsonb,
    overall_score DOUBLE PRECISION DEFAULT 0,
    time_taken_seconds INTEGER,
    attempt_number INTEGER DEFAULT 1,
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.skill_assessments ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can view their own assessments
CREATE POLICY "Users can view own assessments."
    ON public.skill_assessments FOR SELECT
    USING (auth.uid() = user_id);

-- Users can insert their own assessments
CREATE POLICY "Users can insert own assessments."
    ON public.skill_assessments FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Institution users can view assessments of students in their institution
CREATE POLICY "Institutions can view student assessments."
    ON public.skill_assessments FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles p
            WHERE p.auth_id = auth.uid()
            AND p.role = 'institution'
            AND EXISTS (
                SELECT 1 FROM public.user_profiles s
                WHERE s.auth_id = public.skill_assessments.user_id
                AND s.institution_id = p.institution_id
            )
        )
    );

-- Indexes
CREATE INDEX idx_skill_assessments_user ON public.skill_assessments(user_id);
CREATE INDEX idx_skill_assessments_type ON public.skill_assessments(assessment_type);
CREATE INDEX idx_skill_assessments_completed ON public.skill_assessments(completed_at) WHERE completed_at IS NOT NULL;
