-- ==========================================
-- Phase 3: Institutional Placements & Analytics
-- ==========================================

CREATE TABLE IF NOT EXISTS public.placement_drives (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution_id UUID NOT NULL REFERENCES public.institutions(id) ON DELETE CASCADE,
    employer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL, -- Industry user
    title TEXT NOT NULL,
    description TEXT,
    drive_date TIMESTAMPTZ NOT NULL,
    status TEXT DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')),
    eligibility_criteria JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS
ALTER TABLE public.placement_drives ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view placement drives" 
    ON public.placement_drives FOR SELECT 
    USING (true);

CREATE POLICY "Institutions can manage their own drives" 
    ON public.placement_drives FOR ALL 
    USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles p
            WHERE p.auth_id = auth.uid()
            AND p.institution_id = placement_drives.institution_id
            AND p.role = 'institution'
        )
    );

CREATE TABLE IF NOT EXISTS public.department_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution_id UUID NOT NULL REFERENCES public.institutions(id) ON DELETE CASCADE,
    department_id UUID NOT NULL REFERENCES public.departments(id) ON DELETE CASCADE,
    academic_year TEXT NOT NULL, -- e.g., '2025-2026'
    total_students INTEGER DEFAULT 0,
    placed_students INTEGER DEFAULT 0,
    average_ctc NUMERIC(10, 2) DEFAULT 0,
    highest_ctc NUMERIC(10, 2) DEFAULT 0,
    top_recruiters JSONB DEFAULT '[]'::jsonb,
    skill_metrics JSONB DEFAULT '{}'::jsonb, -- e.g., {"React": 85, "Python": 90}
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(department_id, academic_year)
);

-- RLS
ALTER TABLE public.department_analytics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Institutions can view their own department analytics" 
    ON public.department_analytics FOR SELECT 
    USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles p
            WHERE p.auth_id = auth.uid()
            AND p.institution_id = department_analytics.institution_id
        )
    );

-- System handles insertion/updates to analytics via functions/crons

-- Triggers for updated_at
CREATE TRIGGER update_placement_drives_modtime
    BEFORE UPDATE ON public.placement_drives
    FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_department_analytics_modtime
    BEFORE UPDATE ON public.department_analytics
    FOR EACH ROW EXECUTE FUNCTION update_modified_column();
