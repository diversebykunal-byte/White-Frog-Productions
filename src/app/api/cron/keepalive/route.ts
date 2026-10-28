import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    // Optional Vercel Cron header verification if secret configured
    const authHeader = req.headers.get("authorization");
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const timestamp = new Date().toISOString();

    // Query both tables to ensure active PostgreSQL and PostgREST connection
    const [leadsRes, inqRes] = await Promise.all([
      supabase.from("intake_leads").select("id").limit(1),
      supabase.from("inquiries").select("id").limit(1),
    ]);

    const leadsActive = !leadsRes.error || leadsRes.error.code !== "PGRST205";
    const inqActive = !inqRes.error || inqRes.error.code !== "PGRST205";

    return NextResponse.json({
      success: true,
      message: "Supabase keepalive ping successful. Inactivity counter reset.",
      timestamp,
      supabase: {
        intake_leads: leadsActive ? "active" : leadsRes.error?.message,
        inquiries: inqActive ? "active" : inqRes.error?.message,
      },
    });
  } catch (err: any) {
    console.error("Keepalive ping error:", err);
    return NextResponse.json(
      { success: false, error: err?.message || "Keepalive ping failed" },
      { status: 500 }
    );
  }
}

