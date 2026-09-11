-- ==========================================
-- Create Faculty Development Programs
-- ==========================================

CREATE TABLE IF NOT EXISTS public.faculty_development_programs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    sponsor TEXT NOT NULL,
    domain TEXT NOT NULL,
    duration_hours INTEGER NOT NULL,
    rating DOUBLE PRECISION DEFAULT 0.0,
    image_url TEXT,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.fdp_enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    fdp_id UUID NOT NULL REFERENCES public.faculty_development_programs(id) ON DELETE CASCADE,
    faculty_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    status TEXT NOT NULL CHECK (status IN ('enrolled', 'in_progress', 'completed')),
    progress_percentage INTEGER DEFAULT 0,
    enrolled_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    completed_at TIMESTAMPTZ,
    UNIQUE(fdp_id, faculty_id)
);

-- Enable RLS
ALTER TABLE public.faculty_development_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fdp_enrollments ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can view FDPs."
    ON public.faculty_development_programs FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Faculty can view own enrollments."
    ON public.fdp_enrollments FOR SELECT
    USING (auth.uid() = faculty_id);

CREATE POLICY "Faculty can insert own enrollments."
    ON public.fdp_enrollments FOR INSERT
    WITH CHECK (auth.uid() = faculty_id);

CREATE POLICY "Faculty can update own enrollments."
    ON public.fdp_enrollments FOR UPDATE
    USING (auth.uid() = faculty_id);
