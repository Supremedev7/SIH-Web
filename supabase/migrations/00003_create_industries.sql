-- ==========================================
-- Phase 1: Industries Table
-- ==========================================

CREATE TYPE company_size AS ENUM ('startup', 'sme', 'large', 'mnc');

CREATE TABLE IF NOT EXISTS public.industries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name TEXT NOT NULL,
    industry_sector TEXT,
    company_size company_size,
    website TEXT,
    logo_url TEXT,
    description TEXT,
    headquarters TEXT,
    locations TEXT,
    contact_email TEXT,
    contact_person TEXT,
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Triggers
CREATE TRIGGER handle_industries_updated_at
    BEFORE UPDATE ON public.industries
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- RLS
ALTER TABLE public.industries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Industries are viewable by everyone"
    ON public.industries FOR SELECT
    USING (true);


