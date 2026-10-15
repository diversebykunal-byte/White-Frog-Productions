import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    const rateCheck = checkRateLimit(`inquiry:${ip}`, 5, 600000); // Max 5 submissions per 10 mins

    if (!rateCheck.success) {
      return NextResponse.json(
        { error: "Too many submissions. Please wait a few minutes before trying again." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, email, phone, message, location, eventDate, website } = body;

    // Honeypot Trap: Real users never fill the hidden 'website' field.
    // If a bot fills it, silently return success without touching Supabase or ZeptoMail.
    if (website && String(website).trim().length > 0) {
      console.warn(`[Bot Trap] Trapped spam submission from IP ${ip}`);
      return NextResponse.json(
        { success: true, message: "Inquiry received successfully." },
        { status: 200 }
      );
    }

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

    // Send email notification to Kunal via ZeptoMail
    try {
      const { sendInquiryNotification, sendClientConfirmationEmail } = await import("@/lib/zeptomail");
      await sendInquiryNotification({
        name,
        email,
        phone,
        message,
        location,
        eventDate,
      });

      // Also send confirmation email to the client
      await sendClientConfirmationEmail({
        fullName: name,
        email,
      });
    } catch (mailErr: any) {
      console.warn("Notice: ZeptoMail notification warning:", mailErr?.message);
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
