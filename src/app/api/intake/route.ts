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

    // Concurrently persist to DB and fire instant ZeptoMail notifications (Zero-Blocking)
    const [dbResult, adminMailResult, clientMailResult] = await Promise.allSettled([
      saveLeadToDatabase({
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
      }),
      sendIntakeNotification({
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
      }),
      sendClientConfirmationEmail({
        fullName,
        email,
        weddingDates,
        venue,
        weddingType,
      }),
    ]);

    if (dbResult.status === "rejected") {
      console.warn("Notice: Database persist warning:", dbResult.reason);
    }
    if (adminMailResult.status === "rejected") {
      console.warn("Notice: Admin mail dispatch warning:", adminMailResult.reason);
    } else if (!adminMailResult.value?.success) {
      console.warn("Notice: Admin mail dispatch notice:", adminMailResult.value?.error);
    }
    if (clientMailResult.status === "rejected") {
      console.warn("Notice: Client confirmation dispatch warning:", clientMailResult.reason);
    } else if (!clientMailResult.value?.success) {
      console.warn("Notice: Client confirmation dispatch notice:", clientMailResult.value?.error);
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
