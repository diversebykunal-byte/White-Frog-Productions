-- Supabase Schema for White Frog Productions Lead CRM
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    event_date TEXT,
    event_location TEXT,
    guest_count TEXT,
    services_needed TEXT[] DEFAULT '{}',
    message TEXT,
    status TEXT DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Proposal Sent', 'Booked', 'Archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Allow anonymous visitors to submit wedding inquiries (INSERT only)
CREATE POLICY "Allow public insert of inquiries"
ON inquiries
FOR INSERT
TO anon
WITH CHECK (true);

-- Allow authenticated admins to view and manage inquiries
CREATE POLICY "Allow admin full access"
ON inquiries
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);
