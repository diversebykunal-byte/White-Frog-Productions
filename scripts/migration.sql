-- ============================================================
-- WFP Supabase Migration — Run this in Supabase SQL Editor
-- Dashboard: https://supabase.com/dashboard/project/zmuxdlhzogomqopucqrp/sql/new
-- ============================================================

-- 1. inquiries table (from /reserve-your-experience contact form)
CREATE TABLE IF NOT EXISTS public.inquiries (
  id             uuid          DEFAULT gen_random_uuid() PRIMARY KEY,
  name           text          NOT NULL,
  email          text          NOT NULL,
  phone          text,
  event_location text,
  event_date     text,
  message        text,
  created_at     timestamptz   DEFAULT now()
);

-- 2. intake_leads table (from /intake WFP intake form)
CREATE TABLE IF NOT EXISTS public.intake_leads (
  id                uuid          DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name         text          NOT NULL,
  phone             text          NOT NULL,
  email             text          NOT NULL,
  wedding_dates     text,
  venue             text,
  wedding_type      text,
  primary_priority  text,
  biggest_fear      text,
  emotional_vision  text,
  budget_bracket    text,
  decision_maker    text,
  created_at        timestamptz   DEFAULT now()
);

-- 3. Enable Row Level Security on both tables
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.intake_leads ENABLE ROW LEVEL SECURITY;

-- 4. Allow service_role (server-side) to INSERT into both tables
CREATE POLICY "service_role_insert_inquiries"
  ON public.inquiries FOR INSERT
  TO service_role WITH CHECK (true);

CREATE POLICY "service_role_insert_intake_leads"
  ON public.intake_leads FOR INSERT
  TO service_role WITH CHECK (true);

-- 5. Verification — should return both table names
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN ('inquiries', 'intake_leads');
