-- ==========================================
-- Phase 3: Research & Collaborations
-- ==========================================

CREATE TYPE project_status AS ENUM ('proposed', 'active', 'completed', 'cancelled');

CREATE TABLE IF NOT EXISTS public.research_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    lead_researcher_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE, -- Faculty
    industry_partner_id UUID REFERENCES auth.users(id) ON DELETE SET NULL, -- Optional Industry partner
    funding_amount NUMERIC(12, 2) DEFAULT 0,
    status project_status NOT NULL DEFAULT 'proposed',
    start_date TIMESTAMPTZ,
    end_date TIMESTAMPTZ,
    tags JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS
ALTER TABLE public.research_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view research projects" 
    ON public.research_projects FOR SELECT 
    USING (true);

CREATE POLICY "Faculty can insert their own research projects" 
    ON public.research_projects FOR INSERT 
    WITH CHECK (auth.uid() = lead_researcher_id);

CREATE POLICY "Faculty can update their own research projects" 
    ON public.research_projects FOR UPDATE 
    USING (auth.uid() = lead_researcher_id);

CREATE POLICY "Industry partners can update projects they are linked to" 
    ON public.research_projects FOR UPDATE 
    USING (auth.uid() = industry_partner_id);

CREATE TABLE IF NOT EXISTS public.collaborations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES public.research_projects(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE, -- Student, Faculty, or Industry
    role TEXT NOT NULL DEFAULT 'contributor', -- e.g., 'co-investigator', 'research_assistant'
    joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(project_id, user_id)
);

-- RLS
ALTER TABLE public.collaborations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view collaborations" 
    ON public.collaborations FOR SELECT 
    USING (true);

CREATE POLICY "Project leads can manage collaborations" 
    ON public.collaborations FOR ALL 
    USING (
        EXISTS (
            SELECT 1 FROM public.research_projects rp
            WHERE rp.id = collaborations.project_id
            AND rp.lead_researcher_id = auth.uid()
        )
    );

-- Triggers for updated_at
CREATE TRIGGER update_research_projects_modtime
    BEFORE UPDATE ON public.research_projects
    FOR EACH ROW EXECUTE FUNCTION update_modified_column();
