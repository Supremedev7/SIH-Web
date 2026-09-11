-- ==========================================
-- Create Credentials (Certificates/Badges)
-- ==========================================

CREATE TABLE IF NOT EXISTS public.credentials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    issuer TEXT NOT NULL,
    issue_date DATE NOT NULL,
    expiry_date DATE,
    credential_id TEXT,
    credential_url TEXT,
    skills JSONB DEFAULT '[]'::jsonb,
    type TEXT NOT NULL CHECK (type IN ('certification', 'badge', 'award', 'other')),
    verified BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.credentials ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own credentials."
    ON public.credentials FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own credentials."
    ON public.credentials FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own credentials."
    ON public.credentials FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own credentials."
    ON public.credentials FOR DELETE
    USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX idx_credentials_user ON public.credentials(user_id);
