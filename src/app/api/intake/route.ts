import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { sendIntakeNotification, sendClientConfirmationEmail } from "@/lib/zeptomail";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { saveLeadToDatabase } from "@/lib/leadsDb";

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSc0xjgZJ9KZyVhfMXr6DjnaSNQYn8nXyCDvNxNc6enJ_AV3bA/formResponse";

const ENTRY_MAP = {
  fullName: "entry.826387035",
  phone: "entry.331315308",
  email: "entry.1108967585",
  weddingDates: "entry.1101251213",
  venue: "entry.1375433248",
  weddingType: "entry.1875922911",
  primaryPriority: "entry.820414422",
  biggestFear: "entry.192648650",
  emotionalVision: "entry.2016479133",
  budgetBracket: "entry.1365534100",
  decisionMaker: "entry.1551275294",
};

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

    // 1. Submit in background to Google Form so it populates the Google Sheet
    try {
      const googleParams = new URLSearchParams();
      if (fullName) googleParams.append(ENTRY_MAP.fullName, String(fullName));
      if (phone) googleParams.append(ENTRY_MAP.phone, String(phone));
      if (email) googleParams.append(ENTRY_MAP.email, String(email));
      if (weddingDates) googleParams.append(ENTRY_MAP.weddingDates, String(weddingDates));
      if (venue) googleParams.append(ENTRY_MAP.venue, String(venue));
      if (weddingType) googleParams.append(ENTRY_MAP.weddingType, String(weddingType));
      if (primaryPriority) googleParams.append(ENTRY_MAP.primaryPriority, String(primaryPriority));
      if (biggestFear) googleParams.append(ENTRY_MAP.biggestFear, String(biggestFear));
      if (emotionalVision) googleParams.append(ENTRY_MAP.emotionalVision, String(emotionalVision));
      if (budgetBracket) googleParams.append(ENTRY_MAP.budgetBracket, String(budgetBracket));
      if (decisionMaker) googleParams.append(ENTRY_MAP.decisionMaker, String(decisionMaker));

      await fetch(GOOGLE_FORM_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
        },
        body: googleParams.toString(),
      });
    } catch (gErr: any) {
      console.warn("Notice: Google Form sync warning:", gErr?.message);
    }

    // 2. Persist to our own database (resilient storage + Supabase)
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

    // 3. Dispatch instant luxury email notification via ZeptoMail to Kunal
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

    // 4. Send branded luxury confirmation email to the client
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
      message: "Intake details recorded and synchronized successfully.",
    });
  } catch (error: any) {
    console.error("API /api/intake error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
