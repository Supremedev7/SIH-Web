-- ==========================================
-- Phase 3: Learning & Development (Courses & Workshops)
-- ==========================================

CREATE TYPE course_type AS ENUM ('certification', 'course', 'oer');

CREATE TABLE IF NOT EXISTS public.courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    provider TEXT NOT NULL,
    description TEXT,
    rating NUMERIC(2, 1) DEFAULT 0.0,
    reviews INTEGER DEFAULT 0,
    duration TEXT,
    type course_type NOT NULL DEFAULT 'course',
    tags JSONB DEFAULT '[]'::jsonb,
    image_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS for Courses
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view courses" 
    ON public.courses FOR SELECT 
    USING (true);


CREATE TABLE IF NOT EXISTS public.student_courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    enrolled_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    completed_at TIMESTAMPTZ,
    UNIQUE(student_id, course_id)
);

-- RLS for Student Courses
ALTER TABLE public.student_courses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Students can view their own enrollments" 
    ON public.student_courses FOR SELECT 
    USING (auth.uid() = student_id);

CREATE POLICY "Students can update their own progress" 
    ON public.student_courses FOR UPDATE 
    USING (auth.uid() = student_id);

CREATE POLICY "Students can enroll in courses" 
    ON public.student_courses FOR INSERT 
    WITH CHECK (auth.uid() = student_id);


CREATE TYPE workshop_status AS ENUM ('upcoming', 'live', 'past', 'cancelled');

CREATE TABLE IF NOT EXISTS public.workshops (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    faculty_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    date TIMESTAMPTZ NOT NULL,
    duration TEXT,
    status workshop_status NOT NULL DEFAULT 'upcoming',
    capacity INTEGER,
    registered_count INTEGER DEFAULT 0,
    location TEXT,
    is_virtual BOOLEAN DEFAULT true,
    tags JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS for Workshops
ALTER TABLE public.workshops ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view workshops" 
    ON public.workshops FOR SELECT 
    USING (true);

CREATE POLICY "Faculty can insert their own workshops" 
    ON public.workshops FOR INSERT 
    WITH CHECK (auth.uid() = faculty_id);

CREATE POLICY "Faculty can update their own workshops" 
    ON public.workshops FOR UPDATE 
    USING (auth.uid() = faculty_id);

CREATE POLICY "Faculty can delete their own workshops" 
    ON public.workshops FOR DELETE 
    USING (auth.uid() = faculty_id);

-- Trigger for updated_at
CREATE TRIGGER update_courses_modtime
    BEFORE UPDATE ON public.courses
    FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_workshops_modtime
    BEFORE UPDATE ON public.workshops
    FOR EACH ROW EXECUTE FUNCTION update_modified_column();
