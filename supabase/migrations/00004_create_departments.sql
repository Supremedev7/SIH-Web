-- ==========================================
-- Phase 1: Departments Table
-- ==========================================

CREATE TABLE IF NOT EXISTS public.departments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution_id UUID NOT NULL REFERENCES public.institutions(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    code TEXT NOT NULL,
    hod_name TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(institution_id, code)
);

-- Triggers
CREATE TRIGGER handle_departments_updated_at
    BEFORE UPDATE ON public.departments
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- RLS
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Departments are viewable by everyone"
    ON public.departments FOR SELECT
    USING (true);


