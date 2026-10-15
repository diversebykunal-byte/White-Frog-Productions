import { createClient } from '@supabase/supabase-js';

// Public client — safe for browser (uses anon JWT key)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side admin client — NEVER use on the client side
export function createAdminClient() {
  const url = process.env.SUPABASE_URL!;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export interface InquiryRecord {
  id?: string;
  name: string;
  email: string;
  phone: string;
  message?: string;
  created_at?: string;
}

export interface IntakeLeadRecord {
  id?: string;
  full_name: string;
  phone: string;
  email: string;
  wedding_dates: string;
  venue: string;
  wedding_type: string;
  primary_priority: string;
  biggest_fear: string;
  emotional_vision: string;
  budget_bracket: string;
  decision_maker: string;
  created_at?: string;
}
