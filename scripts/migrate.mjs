#!/usr/bin/env node
/**
 * WFP Supabase Migration
 * Creates: inquiries, intake_leads tables with RLS policies
 * Run: node scripts/migrate.mjs
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://zmuxdlhzogomqopucqrp.supabase.co';
// Using the publishable key — we'll create tables via the management API workaround
// Note: DDL via REST requires the service role key with a special header
const SERVICE_ROLE_KEY = 'sb_secret_l8Mv-mAvnBAnzjfmastuAw_5Ka4cZIa';

const sb = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const SQL = `
-- inquiries table (from /reserve-your-experience contact form)
CREATE TABLE IF NOT EXISTS public.inquiries (
  id            uuid          DEFAULT gen_random_uuid() PRIMARY KEY,
  name          text          NOT NULL,
  email         text          NOT NULL,
  phone         text,
  event_location text,
  event_date    text,
  message       text,
  created_at    timestamptz   DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Allow server (service role) to insert
CREATE POLICY IF NOT EXISTS "service_role_insert_inquiries"
  ON public.inquiries FOR INSERT
  TO service_role WITH CHECK (true);

-- intake_leads table (from /intake WFP form)
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

-- Enable Row Level Security
ALTER TABLE public.intake_leads ENABLE ROW LEVEL SECURITY;

-- Allow server (service role) to insert
CREATE POLICY IF NOT EXISTS "service_role_insert_intake_leads"
  ON public.intake_leads FOR INSERT
  TO service_role WITH CHECK (true);
`;

async function runMigration() {
  console.log('🚀 Running WFP Supabase migration...\n');

  // Supabase doesn't expose raw SQL via PostgREST — use the pg endpoint
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/run_sql`, {
    method: 'POST',
    headers: {
      'apikey': SERVICE_ROLE_KEY,
      'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sql: SQL }),
  });
  
  const text = await res.text();
  console.log('Response:', text);
  
  // Verify tables now exist
  const { data: i, error: ie } = await sb.from('inquiries').select('id').limit(1);
  console.log('\n✅ inquiries table:', ie ? '❌ ' + ie.message : '✅ exists');
  
  const { data: l, error: le } = await sb.from('intake_leads').select('id').limit(1);
  console.log('✅ intake_leads table:', le ? '❌ ' + le.message : '✅ exists');
}

runMigration().catch(console.error);
