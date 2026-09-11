-- Create ENUM for application status
CREATE TYPE application_status AS ENUM (
    'applied', 
    'under_review', 
    'shortlisted', 
    'interview', 
    'offered', 
    'rejected'
);

CREATE TABLE public.job_applications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    job_id UUID NOT NULL REFERENCES public.job_listings(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    status application_status NOT NULL DEFAULT 'applied',
    cover_letter TEXT,
    resume_url TEXT, -- URL in Supabase Storage, optional
    match_score NUMERIC(5, 2), -- Calculated AI fit percentage, e.g. 85.50
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(job_id, student_id) -- Prevent multiple applications to the same job
);

-- Indexes for querying
CREATE INDEX idx_job_applications_job_id ON public.job_applications(job_id);
CREATE INDEX idx_job_applications_student_id ON public.job_applications(student_id);
CREATE INDEX idx_job_applications_status ON public.job_applications(status);

-- RLS
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- Students can view their own applications
CREATE POLICY "Students can view their own applications" 
    ON public.job_applications FOR SELECT 
    USING (auth.uid() = student_id);

-- Students can create applications
CREATE POLICY "Students can insert their own applications" 
    ON public.job_applications FOR INSERT 
    WITH CHECK (auth.uid() = student_id);

-- Students can update their own applications (e.g. withdraw, though we might restrict this)
CREATE POLICY "Students can update their own applications" 
    ON public.job_applications FOR UPDATE 
    USING (auth.uid() = student_id);

-- Employers can view applications for their listings
CREATE POLICY "Employers can view applications for their jobs" 
    ON public.job_applications FOR SELECT 
    USING (
        EXISTS (
            SELECT 1 FROM public.job_listings 
            WHERE job_listings.id = job_applications.job_id 
            AND job_listings.employer_id = auth.uid()
        )
    );

-- Employers can update application status for their listings
CREATE POLICY "Employers can update applications for their jobs" 
    ON public.job_applications FOR UPDATE 
    USING (
        EXISTS (
            SELECT 1 FROM public.job_listings 
            WHERE job_listings.id = job_applications.job_id 
            AND job_listings.employer_id = auth.uid()
        )
    );

-- Trigger for updated_at
CREATE TRIGGER update_job_applications_modtime
    BEFORE UPDATE ON public.job_applications
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();
