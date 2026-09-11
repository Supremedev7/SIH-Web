-- ==========================================
-- Phase 1: User Profiles Table & Auth Trigger
-- ==========================================

CREATE TYPE user_role AS ENUM ('student', 'academician', 'industry', 'institution');

CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    email TEXT NOT NULL,
    role user_role NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT,
    avatar_url TEXT,
    institution_id UUID REFERENCES public.institutions(id) ON DELETE SET NULL,
    industry_id UUID REFERENCES public.industries(id) ON DELETE SET NULL,
    department TEXT,
    designation TEXT,
    bio TEXT,
    social_links JSONB DEFAULT '{}'::jsonb,
    metadata JSONB DEFAULT '{}'::jsonb,
    is_verified BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Triggers
CREATE TRIGGER handle_user_profiles_updated_at
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Enable RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public profiles are viewable by everyone."
    ON public.user_profiles FOR SELECT
    USING (true);

CREATE POLICY "Users can insert their own profile."
    ON public.user_profiles FOR INSERT
    WITH CHECK (auth.uid() = auth_id);

CREATE POLICY "Users can update own profile."
    ON public.user_profiles FOR UPDATE
    USING (auth.uid() = auth_id);

-- ==========================================
-- Auth Trigger: Automatically create profile on signup
-- ==========================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    v_role user_role;
    v_full_name TEXT;
    v_institution_id UUID;
    v_industry_id UUID;
BEGIN
    -- Extract metadata with defaults
    v_role := COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'student'::user_role);
    v_full_name := COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email);
    
    -- Cast IDs safely (handle empty strings as NULL)
    IF NULLIF(NEW.raw_user_meta_data->>'institution_id', '') IS NOT NULL THEN
        v_institution_id := (NEW.raw_user_meta_data->>'institution_id')::UUID;
    END IF;

    IF NULLIF(NEW.raw_user_meta_data->>'industry_id', '') IS NOT NULL THEN
        v_industry_id := (NEW.raw_user_meta_data->>'industry_id')::UUID;
    END IF;

    INSERT INTO public.user_profiles (
        auth_id,
        email,
        role,
        full_name,
        institution_id,
        industry_id,
        department,
        designation,
        phone
    ) VALUES (
        NEW.id,
        NEW.email,
        v_role,
        v_full_name,
        v_institution_id,
        v_industry_id,
        NEW.raw_user_meta_data->>'department',
        NEW.raw_user_meta_data->>'designation',
        NEW.raw_user_meta_data->>'phone'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==========================================
-- Deferred RLS Policies (Circular Dependencies)
-- ==========================================

-- From 00002_create_institutions.sql
CREATE POLICY "Institutions can be updated by their admins"
    ON public.institutions FOR UPDATE
    USING (
        auth.uid() IN (
            SELECT auth_id FROM public.user_profiles 
            WHERE institution_id = id 
            AND role = 'institution'
        )
    );

-- From 00003_create_industries.sql
CREATE POLICY "Industries can be updated by their admins"
    ON public.industries FOR UPDATE
    USING (
        auth.uid() IN (
            SELECT auth_id FROM public.user_profiles 
            WHERE industry_id = id 
            AND role = 'industry'
        )
    );

-- From 00004_create_departments.sql
CREATE POLICY "Institution admins can manage departments"
    ON public.departments FOR ALL
    USING (
        auth.uid() IN (
            SELECT auth_id FROM public.user_profiles 
            WHERE institution_id = departments.institution_id 
            AND role = 'institution'
        )
    );
