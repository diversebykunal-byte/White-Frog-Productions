import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, message, location, eventDate } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and Email are required fields." },
        { status: 400 }
      );
    }

    // Basic sanitization
    const payload = {
      name: String(name).slice(0, 150).trim(),
      email: String(email).slice(0, 150).trim(),
      phone: phone ? String(phone).slice(0, 50).trim() : null,
      message: message ? String(message).slice(0, 3000).trim() : null,
      event_location: location ? String(location).slice(0, 150).trim() : null,
      event_date: eventDate ? String(eventDate).slice(0, 50).trim() : null,
      created_at: new Date().toISOString(),
    };

    const adminClient = createAdminClient();
    const { error } = await adminClient.from("inquiries").insert([payload]);
    if (error) {
      console.error("Supabase inquiries insert error:", error.message);
    }

    return NextResponse.json(
      { success: true, message: "Inquiry received successfully." },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("API /api/inquiries error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
