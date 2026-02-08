-- À exécuter dans Supabase : SQL Editor
-- Corrige l'erreur "new row violates row-level security policy"

DROP POLICY IF EXISTS "allow_anon_insert" ON quiz_responses;
CREATE POLICY "allow_anon_insert" ON quiz_responses
  FOR INSERT TO anon WITH CHECK (true);

DROP POLICY IF EXISTS "allow_anon_select" ON quiz_responses;
CREATE POLICY "allow_anon_select" ON quiz_responses
  FOR SELECT TO anon USING (true);

GRANT INSERT, SELECT ON public.quiz_responses TO anon;
