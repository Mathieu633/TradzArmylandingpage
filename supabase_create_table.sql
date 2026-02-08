CREATE TABLE IF NOT EXISTS quiz_responses (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  firstname text,
  email text,
  phone text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE quiz_responses ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "allow_anon_insert" ON quiz_responses;
CREATE POLICY "allow_anon_insert" ON quiz_responses
  FOR INSERT TO anon WITH CHECK (true);

GRANT USAGE ON SCHEMA public TO anon;
GRANT INSERT ON public.quiz_responses TO anon;
