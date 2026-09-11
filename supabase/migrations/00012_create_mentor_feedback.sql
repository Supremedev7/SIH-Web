CREATE TABLE public.mentor_feedback (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    application_id UUID NOT NULL REFERENCES public.job_applications(id) ON DELETE CASCADE,
    mentor_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    feedback_text TEXT NOT NULL,
    performance_rating INTEGER CHECK (performance_rating >= 1 AND performance_rating <= 5),
    milestone_reached TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes for querying
CREATE INDEX idx_mentor_feedback_application_id ON public.mentor_feedback(application_id);
CREATE INDEX idx_mentor_feedback_mentor_id ON public.mentor_feedback(mentor_id);

-- RLS
ALTER TABLE public.mentor_feedback ENABLE ROW LEVEL SECURITY;

-- Mentors (employers) can insert feedback for applications on their jobs
CREATE POLICY "Mentors can insert feedback for their jobs" 
    ON public.mentor_feedback FOR INSERT 
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.job_applications
            JOIN public.job_listings ON job_applications.job_id = job_listings.id
            WHERE job_applications.id = mentor_feedback.application_id
            AND job_listings.employer_id = auth.uid()
            AND mentor_feedback.mentor_id = auth.uid()
        )
    );

-- Mentors can view their own feedback
CREATE POLICY "Mentors can view their own feedback" 
    ON public.mentor_feedback FOR SELECT 
    USING (auth.uid() = mentor_id);

-- Students can view feedback on their own applications
CREATE POLICY "Students can view feedback on their applications" 
    ON public.mentor_feedback FOR SELECT 
    USING (
        EXISTS (
            SELECT 1 FROM public.job_applications
            WHERE job_applications.id = mentor_feedback.application_id
            AND job_applications.student_id = auth.uid()
        )
    );

-- Trigger for updated_at
CREATE TRIGGER update_mentor_feedback_modtime
    BEFORE UPDATE ON public.mentor_feedback
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();
