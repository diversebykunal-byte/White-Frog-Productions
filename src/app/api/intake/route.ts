import { NextResponse } from "next/server";
import { sendIntakeNotification, sendClientConfirmationEmail } from "@/lib/zeptomail";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { saveLeadToDatabase } from "@/lib/leadsDb";

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    const rateCheck = checkRateLimit(`intake:${ip}`, 5, 600000); // Max 5 submissions per 10 mins

    if (!rateCheck.success) {
      return NextResponse.json(
        { error: "Too many submissions. Please wait a few minutes before trying again." },
        { status: 429 }
      );
    }

    const body = await req.json();

    const {
      fullName,
      phone,
      email,
      weddingDates,
      venue,
      weddingType,
      primaryPriority,
      biggestFear,
      emotionalVision,
      budgetBracket,
      decisionMaker,
      website,
    } = body;

    // Honeypot Trap
    if (website && String(website).trim().length > 0) {
      console.warn(`[Bot Trap] Trapped spam submission from IP ${ip}`);
      return NextResponse.json(
        { success: true, message: "Intake form received successfully." },
        { status: 200 }
      );
    }

    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { error: "Full Name, Phone, and Email are required." },
        { status: 400 }
      );
    }

    // 1. Persist directly to our own database (resilient storage + Supabase)
    try {
      await saveLeadToDatabase({
        fullName,
        phone,
        email,
        weddingDates,
        venue,
        weddingType,
        primaryPriority,
        biggestFear,
        emotionalVision,
        budgetBracket,
        decisionMaker,
        source: "Website Intake Form",
      });
    } catch (dbErr: any) {
      console.warn("Notice: Database persist warning:", dbErr?.message);
    }

    // 2. Dispatch instant luxury email notification via ZeptoMail to Studio Team
    try {
      await sendIntakeNotification({
        fullName,
        phone,
        email,
        weddingDates,
        venue,
        weddingType,
        primaryPriority,
        biggestFear,
        emotionalVision,
        budgetBracket,
        decisionMaker,
      });
    } catch (mailErr: any) {
      console.warn("Notice: ZeptoMail intake notification warning:", mailErr?.message);
    }

    // 3. Send branded luxury confirmation email to the client from notifications@whitefrogproductions.com
    try {
      await sendClientConfirmationEmail({
        fullName,
        email,
        weddingDates,
        venue,
        weddingType,
      });
    } catch (clientMailErr: any) {
      console.warn("Notice: ZeptoMail client confirmation warning:", clientMailErr?.message);
    }

    return NextResponse.json({
      success: true,
      message: "Intake details recorded successfully.",
    });
  } catch (error: any) {
    console.error("API /api/intake error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
