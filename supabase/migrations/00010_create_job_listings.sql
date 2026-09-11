-- Create ENUM for job types
CREATE TYPE job_type AS ENUM ('internship', 'full_time', 'part_time', 'freelance');

-- Create ENUM for job status
CREATE TYPE job_status AS ENUM ('draft', 'open', 'closed', 'cancelled');

CREATE TABLE public.job_listings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    employer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    type job_type NOT NULL DEFAULT 'internship',
    location TEXT,
    is_remote BOOLEAN DEFAULT false,
    stipend_salary_range TEXT,
    status job_status NOT NULL DEFAULT 'draft',
    deadline TIMESTAMPTZ,
    required_skills JSONB DEFAULT '{}'::jsonb, -- e.g., {"React": "intermediate", "Node.js": "advanced"}
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes for querying
CREATE INDEX idx_job_listings_employer_id ON public.job_listings(employer_id);
CREATE INDEX idx_job_listings_status ON public.job_listings(status);
CREATE INDEX idx_job_listings_type ON public.job_listings(type);

-- RLS
ALTER TABLE public.job_listings ENABLE ROW LEVEL SECURITY;

-- Employers can manage their own listings
CREATE POLICY "Employers can view their own listings" 
    ON public.job_listings FOR SELECT 
    USING (auth.uid() = employer_id);

CREATE POLICY "Employers can insert their own listings" 
    ON public.job_listings FOR INSERT 
    WITH CHECK (auth.uid() = employer_id);

CREATE POLICY "Employers can update their own listings" 
    ON public.job_listings FOR UPDATE 
    USING (auth.uid() = employer_id);

CREATE POLICY "Employers can delete their own listings" 
    ON public.job_listings FOR DELETE 
    USING (auth.uid() = employer_id);

-- Everyone can view open listings
CREATE POLICY "Anyone can view open listings" 
    ON public.job_listings FOR SELECT 
    USING (status = 'open');

-- Trigger for updated_at
CREATE TRIGGER update_job_listings_modtime
    BEFORE UPDATE ON public.job_listings
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();
