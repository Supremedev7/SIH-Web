-- ==========================================
-- SCI Comprehensive Seed Data
-- ==========================================

-- 1. Insert Industries
INSERT INTO public.industries (id, company_name, industry_sector, company_size, website, logo_url, description, is_verified)
VALUES 
('d1a2c3b4-1234-5678-90ab-cdef12345678', 'TechCorp Innovations', 'Information Technology', 'large', 'https://techcorp.example.com', 'https://ui-avatars.com/api/?name=TC&background=0D8ABC&color=fff', 'Leading software solutions provider specializing in AI and cloud infrastructure.', true),
('e2b3d4c5-1234-5678-90ab-cdef12345678', 'Global Finance Inc', 'Finance', 'mnc', 'https://gfi.example.com', 'https://ui-avatars.com/api/?name=GF&background=2C7A7B&color=fff', 'Multinational banking and financial services corporation.', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Insert Institutions
INSERT INTO public.institutions (id, name, code, type, location, state, city, website, is_verified)
VALUES 
('f3c4e5d6-1234-5678-90ab-cdef12345678', 'Indian Institute of Technology, Bombay', 'IITB', 'university', 'Powai', 'Maharashtra', 'Mumbai', 'https://iitb.ac.in', true)
ON CONFLICT (id) DO NOTHING;

-- 3. Insert Auth Users (Passwords: password123)
INSERT INTO auth.users (
  id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
) VALUES (
  '11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'student@example.com', crypt('password123', gen_salt('bf')), now(), 
  '{"provider": "email", "providers": ["email"]}',
  '{"role": "student", "full_name": "Rahul Sharma", "phone": "+91 9876543210", "institution_id": "f3c4e5d6-1234-5678-90ab-cdef12345678", "department": "Computer Science"}',
  now(), now()
),
(
  '22222222-2222-2222-2222-222222222222', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'industry@techcorp.com', crypt('password123', gen_salt('bf')), now(), 
  '{"provider": "email", "providers": ["email"]}',
  '{"role": "industry", "full_name": "Priya Patel", "designation": "Talent Acquisition Head", "industry_id": "d1a2c3b4-1234-5678-90ab-cdef12345678"}',
  now(), now()
),
(
  '33333333-3333-3333-3333-333333333333', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'faculty@iitb.ac.in', crypt('password123', gen_salt('bf')), now(), 
  '{"provider": "email", "providers": ["email"]}',
  '{"role": "academician", "full_name": "Dr. Amit Kumar", "designation": "Associate Professor", "institution_id": "f3c4e5d6-1234-5678-90ab-cdef12345678", "department": "Computer Science"}',
  now(), now()
) ON CONFLICT (id) DO NOTHING;

-- 4. Insert Job Listings (Opportunities)
INSERT INTO public.job_listings (id, employer_id, title, description, type, location, is_remote, stipend_salary_range, status, required_skills, deadline)
VALUES 
('a1111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 'Frontend Developer Intern', 'Join our core platform team to build scalable React applications using Next.js and Tailwind CSS.', 'internship', 'Bengaluru', true, '₹25,000/month', 'open', '{"React": "intermediate", "TypeScript": "intermediate", "Tailwind CSS": "beginner"}', now() + interval '30 days'),
('b2222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'Junior Full Stack Engineer', 'Full-time position for recent graduates. Stack: Node.js, Express, PostgreSQL, React.', 'full_time', 'Pune', false, '₹8,00,000 - ₹12,00,000/year', 'open', '{"Node.js": "advanced", "PostgreSQL": "intermediate", "React": "intermediate"}', now() + interval '60 days'),
('c3333333-3333-3333-3333-333333333333', '22222222-2222-2222-2222-222222222222', 'Data Science Intern', 'Work on predictive models using Python, scikit-learn, and TensorFlow.', 'internship', 'Bengaluru', true, '₹30,000/month', 'open', '{"Python": "advanced", "Machine Learning": "intermediate", "SQL": "beginner"}', now() + interval '15 days'),
('d4444444-4444-4444-4444-444444444444', '22222222-2222-2222-2222-222222222222', 'DevOps Engineer (Contract)', '6-month contract to help migrate CI/CD pipelines to GitHub Actions and Kubernetes.', 'freelance', 'Remote', true, '₹50,000/month', 'open', '{"Docker": "advanced", "Kubernetes": "intermediate", "CI/CD": "advanced"}', now() + interval '10 days')
ON CONFLICT (id) DO NOTHING;

-- 5. Insert Job Applications
INSERT INTO public.job_applications (id, job_id, student_id, status, cover_letter, match_score)
VALUES 
('e5555555-5555-5555-5555-555555555555', 'a1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'under_review', 'I am very interested in this frontend role. I have extensive experience building dashboards with Next.js.', 88.50),
('f6666666-6666-6666-6666-666666666666', 'c3333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', 'shortlisted', 'I have completed several Kaggle competitions and am eager to apply my ML skills in production.', 92.00)
ON CONFLICT (id) DO NOTHING;

-- 6. Insert Old Assessment Templates
INSERT INTO public.assessment_templates (id, title, description, assessment_type, questions, time_limit_minutes, is_active)
VALUES 
(
  'e659b8be-5ba1-4fc3-a447-e17912384a6c',
  'Software Engineering Basics',
  'A fundamental assessment covering basic algorithms, data structures, and logical reasoning.',
  'technical',
  '[
    {"id": "q1", "text": "What is the time complexity of binary search?", "type": "single_choice", "options": ["O(n)", "O(log n)", "O(n^2)", "O(1)"], "category": "Algorithms"},
    {"id": "q2", "text": "Which of the following are NoSQL databases?", "type": "multiple_choice", "options": ["MongoDB", "PostgreSQL", "Cassandra", "MySQL"], "category": "Databases"},
    {"id": "q3", "text": "Rate your comfort level with React.js.", "type": "scale", "category": "Frontend Frameworks"}
  ]'::jsonb,
  30,
  true
),
(
  '4e9dfc6a-c215-4fa8-b2b5-e67c52514ccb',
  'Soft Skills & Communication',
  'Evaluate your teamwork, leadership, and professional communication skills.',
  'soft',
  '[
    {"id": "q1", "text": "How do you handle conflicts in a team?", "type": "single_choice", "options": ["Ignore it", "Discuss openly", "Report to manager immediately", "Argue"], "category": "Teamwork"},
    {"id": "q2", "text": "Rate your public speaking confidence.", "type": "scale", "category": "Communication"}
  ]'::jsonb,
  15,
  true
)
ON CONFLICT (id) DO NOTHING;

-- 7. Insert Courses
INSERT INTO public.courses (id, title, provider, description, rating, reviews, duration, type, tags, image_url)
VALUES 
('c1111111-1111-1111-1111-111111111111', 'Advanced Data Structures in C++', 'IIT Bombay x NPTEL', 'Master advanced data structures like AVL trees, Graphs, and Hash Tables.', 4.8, 12000, '12 weeks', 'certification', '["Core", "Programming"]', 'bg-blue-500/20'),
('c2222222-2222-2222-2222-222222222222', 'Google Cloud Engineering Professional', 'Google Cloud', 'Complete professional certificate for Google Cloud Architects.', 4.9, 45000, '8 weeks', 'certification', '["Cloud", "DevOps"]', 'bg-indigo-500/20'),
('c3333333-3333-3333-3333-333333333333', 'System Design for Scale', 'OER Foundation', 'Open educational resource covering scalable backend architectures.', 4.7, 8000, '4 weeks', 'oer', '["Architecture", "Backend"]', 'bg-emerald-500/20'),
('c4444444-4444-4444-4444-444444444444', 'Modern React with Next.js 15', 'Vercel Academy', 'Deep dive into App Router, Server Components, and Next.js 15 features.', 4.9, 102000, '6 weeks', 'course', '["Frontend", "Web"]', 'bg-violet-500/20')
ON CONFLICT (id) DO NOTHING;

-- 8. Insert Student Courses (Enrollments)
INSERT INTO public.student_courses (student_id, course_id, progress)
VALUES 
('11111111-1111-1111-1111-111111111111', 'c1111111-1111-1111-1111-111111111111', 65),
('11111111-1111-1111-1111-111111111111', 'c2222222-2222-2222-2222-222222222222', 12),
('11111111-1111-1111-1111-111111111111', 'c3333333-3333-3333-3333-333333333333', 0),
('11111111-1111-1111-1111-111111111111', 'c4444444-4444-4444-4444-444444444444', 100)
ON CONFLICT (student_id, course_id) DO NOTHING;

-- 9. Insert Notifications
INSERT INTO public.notifications (user_id, type, title, description, is_unread)
VALUES 
('11111111-1111-1111-1111-111111111111', 'job', 'New Internship Match', 'Google is looking for Software Engineering Interns for Summer 2027. Your skill profile is a 92% match.', true),
('11111111-1111-1111-1111-111111111111', 'assessment', 'Assessment Scored', 'Your recent React Native assessment has been scored. You achieved 94% (Top 5% nationwide).', true),
('11111111-1111-1111-1111-111111111111', 'badge', 'Skill Badge Unlocked', 'Congratulations! You earned the ''Cloud Native Architect'' badge from AWS.', false),
('11111111-1111-1111-1111-111111111111', 'message', 'New Message', 'Sarah Jenkins (Recruiter at Microsoft) sent you a message regarding your recent application.', false)
ON CONFLICT (id) DO NOTHING;

-- 10. Insert Placement Drives
INSERT INTO public.placement_drives (institution_id, employer_id, title, description, drive_date, status, eligibility_criteria)
VALUES 
('f3c4e5d6-1234-5678-90ab-cdef12345678', '22222222-2222-2222-2222-222222222222', 'TechCorp Campus Hiring 2027', 'Hiring for Software Engineer and Data Scientist roles.', now() + interval '30 days', 'upcoming', '{"min_cgpa": 7.5, "branches": ["Computer Science", "Information Technology"]}'),
('f3c4e5d6-1234-5678-90ab-cdef12345678', NULL, 'Global Finance Analysts Recruitment', 'Bulk hiring for Quant Analysts and Financial Modellers.', now() + interval '45 days', 'upcoming', '{"min_cgpa": 8.0, "branches": ["Mathematics", "Computer Science", "Economics"]}')
ON CONFLICT (id) DO NOTHING;

-- 11. Insert Research Projects (Consultancy)
INSERT INTO public.research_projects (id, lead_researcher_id, industry_partner_id, title, description, funding_amount, status, tags)
VALUES 
('r1111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333333', '22222222-2222-2222-2222-222222222222', 'AI-Driven Supply Chain Optimization', 'Joint research to develop predictive models for global logistics.', 5000000.00, 'active', '["AI", "Supply Chain", "Machine Learning"]'),
('r2222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333', NULL, 'Quantum Cryptography Frameworks', 'Government-funded research on quantum-resistant encryption protocols.', 12000000.00, 'proposed', '["Quantum Computing", "Cybersecurity"]')
ON CONFLICT (id) DO NOTHING;

-- 12. Insert Workshops
INSERT INTO public.workshops (faculty_id, title, description, date, duration, status, capacity, registered_count, location, is_virtual)
VALUES 
('33333333-3333-3333-3333-333333333333', 'Advanced React Patterns FDP', 'Faculty Development Program covering Next.js 15 and Server Components.', now() + interval '10 days', '2 Days', 'upcoming', 100, 45, 'Zoom', true),
('33333333-3333-3333-3333-333333333333', 'Machine Learning in Healthcare', 'Interdisciplinary workshop for applying ML models to medical datasets.', now() - interval '5 days', '1 Day', 'past', 50, 50, 'Seminar Hall 1', false)
ON CONFLICT (id) DO NOTHING;
