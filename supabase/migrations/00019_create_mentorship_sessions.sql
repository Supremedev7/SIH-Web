-- ==========================================
-- Create Mentorship Sessions
-- ==========================================

CREATE TABLE IF NOT EXISTS public.mentorship_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mentor_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    mentee_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    scheduled_at TIMESTAMPTZ NOT NULL,
    duration_minutes INTEGER NOT NULL DEFAULT 60,
    status TEXT NOT NULL CHECK (status IN ('scheduled', 'completed', 'cancelled')),
    meeting_link TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.mentorship_sessions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own mentorship sessions."
    ON public.mentorship_sessions FOR SELECT
    USING (auth.uid() = mentor_id OR auth.uid() = mentee_id);

CREATE POLICY "Users can update own mentorship sessions."
    ON public.mentorship_sessions FOR UPDATE
    USING (auth.uid() = mentor_id OR auth.uid() = mentee_id);

CREATE POLICY "Mentors can insert sessions."
    ON public.mentorship_sessions FOR INSERT
    WITH CHECK (auth.uid() = mentor_id);

-- Indexes
CREATE INDEX idx_mentorship_mentor ON public.mentorship_sessions(mentor_id);
CREATE INDEX idx_mentorship_mentee ON public.mentorship_sessions(mentee_id);
