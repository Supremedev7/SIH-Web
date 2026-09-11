-- ==========================================
-- Phase 1: Institutions Table
-- ==========================================

CREATE TYPE institution_type AS ENUM ('university', 'college', 'polytechnic', 'institute');

CREATE TABLE IF NOT EXISTS public.institutions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    code TEXT UNIQUE,
    type institution_type NOT NULL,
    location TEXT,
    state TEXT,
    city TEXT,
    pincode TEXT,
    website TEXT,
    logo_url TEXT,
    contact_email TEXT,
    contact_phone TEXT,
    settings JSONB DEFAULT '{}'::jsonb,
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Triggers
CREATE TRIGGER handle_institutions_updated_at
    BEFORE UPDATE ON public.institutions
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- RLS
ALTER TABLE public.institutions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Institutions are viewable by everyone"
    ON public.institutions FOR SELECT
    USING (true);


