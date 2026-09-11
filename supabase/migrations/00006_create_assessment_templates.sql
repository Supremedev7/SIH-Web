-- ==========================================
-- Phase 2: Assessment Templates
-- ==========================================

CREATE TABLE IF NOT EXISTS public.assessment_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    assessment_type TEXT NOT NULL CHECK (assessment_type IN ('technical', 'soft', 'aptitude', 'domain_specific', 'combined')),
    industry_sector TEXT,
    questions JSONB NOT NULL DEFAULT '[]'::jsonb,
    time_limit_minutes INTEGER,
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Triggers
CREATE TRIGGER handle_assessment_templates_updated_at
    BEFORE UPDATE ON public.assessment_templates
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Enable RLS
ALTER TABLE public.assessment_templates ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Everyone can read active templates
CREATE POLICY "Active assessment templates are viewable by everyone."
    ON public.assessment_templates FOR SELECT
    USING (is_active = true);

-- Only service role / admin can insert/update templates
CREATE POLICY "Admins can manage assessment templates."
    ON public.assessment_templates FOR ALL
    USING (auth.uid() = created_by);

-- Indexes
CREATE INDEX idx_assessment_templates_type ON public.assessment_templates(assessment_type);
CREATE INDEX idx_assessment_templates_active ON public.assessment_templates(is_active) WHERE is_active = true;
