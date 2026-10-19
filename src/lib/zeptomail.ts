const ZEPTOMAIL_URL = process.env.ZEPTOMAIL_URL || "https://api.zeptomail.in/v1.1/email";
const ZEPTOMAIL_API_KEY =
  process.env.ZEPTOMAIL_API_KEY ||
  process.env.ZEPTOMAIL_API_TOKEN ||
  "Zoho-enczapikey PHtE6r1YS+rijWB68hNV4vO4Q5TxNNsqr7xvelRC4twWDqBSTk1X/98pkTSz+EgjA/EQQv/Pwd08uLnOsrrXdDzqNjwfCWqyqK3sx/VYSPOZsbq6x00YtVQec0LeVIXoc9Rr0yzWvNjSNA==";

const ADMIN_EMAILS = [
  { address: "kunal@whitefrogproductions.com", name: "Kunal Khanna" },
  { address: "kunalkhanna2007@gmail.com", name: "Kunal Khanna" },
];
const FROM_EMAIL = process.env.MAIL_FROM_ADDRESS || "notifications@whitefrogproductions.com";
const FROM_NAME = "White Frog Productions";

export interface SendEmailOptions {
  to: { address: string; name?: string }[];
  subject: string;
  htmlBody: string;
  replyTo?: { address: string; name?: string }[];
}

export async function sendEmail({ to, subject, htmlBody, replyTo }: SendEmailOptions) {
  try {
    const payload = {
      from: {
        address: FROM_EMAIL,
        name: FROM_NAME,
      },
      to: to.map((t) => ({
        email_address: {
          address: t.address,
          name: t.name || t.address,
        },
      })),
      ...(replyTo && replyTo.length > 0
        ? {
            reply_to: replyTo.map((r) => ({
              address: r.address,
              name: r.name || r.address,
            })),
          }
        : {}),
      subject,
      htmlbody: htmlBody,
    };

    const res = await fetch(ZEPTOMAIL_URL, {
      method: "POST",
      headers: {
        Authorization: ZEPTOMAIL_API_KEY,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      console.error("ZeptoMail error:", res.status, data);
      return { success: false, status: res.status, error: data };
    }

    return { success: true, data };
  } catch (error: any) {
    console.error("sendEmail exception:", error);
    return { success: false, error: error?.message };
  }
}

export interface IntakeData {
  fullName: string;
  phone: string;
  email: string;
  weddingDates?: string;
  venue?: string;
  weddingType?: string;
  primaryPriority?: string;
  biggestFear?: string;
  emotionalVision?: string;
  budgetBracket?: string;
  decisionMaker?: string;
}

export async function sendIntakeNotification(data: IntakeData) {
  const cleanPhone = (data.phone || "").replace(/\D/g, "");
  const waLink = cleanPhone ? `https://wa.me/${cleanPhone}` : "";

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #f7f6f2; color: #1c1c1b; margin: 0; padding: 24px; }
        .card { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 8px; border: 1px solid #e5e0d4; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        .header { background: #1c1c1b; color: #ffffff; padding: 28px 32px; text-align: center; }
        .header h1 { margin: 0; font-size: 22px; font-weight: 400; letter-spacing: 0.15em; text-transform: uppercase; }
        .header p { margin: 6px 0 0; font-size: 13px; color: #d4af37; letter-spacing: 0.2em; text-transform: uppercase; }
        .content { padding: 32px; }
        .badge { display: inline-block; background: #f4ede0; color: #8a6d2b; padding: 4px 12px; border-radius: 4px; font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 20px; }
        .section-title { font-size: 12px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #8a6d2b; border-bottom: 1px solid #f0eae1; padding-bottom: 6px; margin: 24px 0 14px; }
        .field { margin-bottom: 14px; }
        .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #7a7a78; margin-bottom: 4px; }
        .value { font-size: 15px; font-weight: 500; color: #1c1c1b; line-height: 1.5; }
        .quote-box { background: #faf8f5; border-left: 3px solid #8a6d2b; padding: 12px 16px; border-radius: 0 4px 4px 0; font-style: italic; color: #2e2e2c; font-size: 14px; }
        .cta-bar { margin-top: 28px; padding-top: 20px; border-top: 1px solid #f0eae1; text-align: center; }
        .btn { display: inline-block; background: #1c1c1b; color: #ffffff !important; text-decoration: none; padding: 10px 20px; border-radius: 4px; font-size: 13px; font-weight: 500; letter-spacing: 0.05em; margin: 0 6px 8px; }
        .btn-wa { background: #25D366; }
        .footer { background: #faf8f5; padding: 18px 32px; text-align: center; font-size: 11px; color: #9c9c98; border-top: 1px solid #f0eae1; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1>White Frog Productions</h1>
          <p>New Wedding Intake Submission</p>
        </div>
        <div class="content">
          <span class="badge">Exclusive Wedding Lead</span>

          <div class="section-title">Client Details</div>
          <div class="field">
            <div class="label">Full Name</div>
            <div class="value">${data.fullName}</div>
          </div>
          <div class="field">
            <div class="label">Phone / WhatsApp</div>
            <div class="value"><a href="tel:${data.phone}" style="color:#1c1c1b;text-decoration:none;font-weight:600;">${data.phone}</a></div>
          </div>
          <div class="field">
            <div class="label">Email Address</div>
            <div class="value"><a href="mailto:${data.email}" style="color:#1c1c1b;text-decoration:none;">${data.email}</a></div>
          </div>

          <div class="section-title">Wedding &amp; Logistics</div>
          <div class="field">
            <div class="label">Wedding Date(s)</div>
            <div class="value">${data.weddingDates || "Not specified"}</div>
          </div>
          <div class="field">
            <div class="label">Venue / City / Destination</div>
            <div class="value">${data.venue || "Not specified"}</div>
          </div>
          <div class="field">
            <div class="label">Wedding Type &amp; Scope</div>
            <div class="value">${data.weddingType || "Not specified"}</div>
          </div>
          <div class="field">
            <div class="label">Budget Bracket</div>
            <div class="value" style="color:#8a6d2b;font-weight:700;">${data.budgetBracket || "Not specified"}</div>
          </div>
          <div class="field">
            <div class="label">Primary Decision Maker</div>
            <div class="value">${data.decisionMaker || "Not specified"}</div>
          </div>

          <div class="section-title">Artistic &amp; Emotional Vision</div>
          <div class="field">
            <div class="label">Primary Priority for Film &amp; Stills</div>
            <div class="value">${data.primaryPriority || "Not specified"}</div>
          </div>
          ${
            data.emotionalVision
              ? `
          <div class="field">
            <div class="label">Emotional Vision</div>
            <div class="quote-box">"${data.emotionalVision}"</div>
          </div>`
              : ""
          }
          ${
            data.biggestFear
              ? `
          <div class="field">
            <div class="label">Biggest Fear / Past Experience</div>
            <div class="quote-box" style="border-left-color:#c44d34;">"${data.biggestFear}"</div>
          </div>`
              : ""
          }

          <div class="cta-bar">
            ${waLink ? `<a href="${waLink}" class="btn btn-wa" target="_blank">Chat on WhatsApp</a>` : ""}
            <a href="mailto:${data.email}?subject=White Frog Productions — Regarding Your Wedding" class="btn">Reply via Email</a>
            <a href="tel:${data.phone}" class="btn">Call Client</a>
          </div>
        </div>
        <div class="footer">
          Received via White Frog Productions Intake Portal &bull; <a href="https://whitefrog.vercel.app/admin" style="color:#8a6d2b;">View Admin CRM</a>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: ADMIN_EMAILS,
    replyTo: [{ address: data.email, name: data.fullName }],
    subject: `💍 New Wedding Intake: ${data.fullName} (${data.weddingDates || "Dates TBD"})`,
    htmlBody: html,
  });
}

export interface InquiryData {
  name: string;
  email: string;
  phone?: string | null;
  location?: string | null;
  eventDate?: string | null;
  message?: string | null;
}

export async function sendInquiryNotification(data: InquiryData) {
  const cleanPhone = (data.phone || "").replace(/\D/g, "");
  const waLink = cleanPhone ? `https://wa.me/${cleanPhone}` : "";

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #f7f6f2; color: #1c1c1b; margin: 0; padding: 24px; }
        .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; border: 1px solid #e5e0d4; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        .header { background: #1c1c1b; color: #ffffff; padding: 24px 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 20px; font-weight: 400; letter-spacing: 0.15em; text-transform: uppercase; }
        .content { padding: 30px; }
        .field { margin-bottom: 16px; }
        .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #7a7a78; margin-bottom: 4px; }
        .value { font-size: 15px; font-weight: 500; color: #1c1c1b; }
        .quote-box { background: #faf8f5; border-left: 3px solid #8a6d2b; padding: 14px 18px; border-radius: 0 4px 4px 0; font-style: italic; color: #2e2e2c; font-size: 14px; margin-top: 6px; }
        .cta-bar { margin-top: 24px; padding-top: 20px; border-top: 1px solid #f0eae1; text-align: center; }
        .btn { display: inline-block; background: #1c1c1b; color: #ffffff !important; text-decoration: none; padding: 10px 18px; border-radius: 4px; font-size: 13px; font-weight: 500; margin: 0 4px; }
        .btn-wa { background: #25D366; }
        .footer { background: #faf8f5; padding: 14px 24px; text-align: center; font-size: 11px; color: #9c9c98; border-top: 1px solid #f0eae1; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1>White Frog Productions</h1>
          <p style="margin:4px 0 0;font-size:12px;color:#d4af37;letter-spacing:0.15em;text-transform:uppercase;">New Inquiry Received</p>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Name</div>
            <div class="value">${data.name}</div>
          </div>
          <div class="field">
            <div class="label">Email</div>
            <div class="value"><a href="mailto:${data.email}" style="color:#1c1c1b;text-decoration:none;">${data.email}</a></div>
          </div>
          ${
            data.phone
              ? `
          <div class="field">
            <div class="label">Phone</div>
            <div class="value"><a href="tel:${data.phone}" style="color:#1c1c1b;text-decoration:none;font-weight:600;">${data.phone}</a></div>
          </div>`
              : ""
          }
          ${
            data.eventDate
              ? `
          <div class="field">
            <div class="label">Event Date</div>
            <div class="value">${data.eventDate}</div>
          </div>`
              : ""
          }
          ${
            data.location
              ? `
          <div class="field">
            <div class="label">Location / Destination</div>
            <div class="value">${data.location}</div>
          </div>`
              : ""
          }
          ${
            data.message
              ? `
          <div class="field">
            <div class="label">Message</div>
            <div class="quote-box">"${data.message}"</div>
          </div>`
              : ""
          }

          <div class="cta-bar">
            ${waLink ? `<a href="${waLink}" class="btn btn-wa" target="_blank">Chat on WhatsApp</a>` : ""}
            <a href="mailto:${data.email}?subject=White Frog Productions — Response to your inquiry" class="btn">Reply to Email</a>
            ${data.phone ? `<a href="tel:${data.phone}" class="btn">Call</a>` : ""}
          </div>
        </div>
        <div class="footer">
          Received via Reserve Your Experience form &bull; White Frog Productions
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: ADMIN_EMAILS,
    replyTo: [{ address: data.email, name: data.name }],
    subject: `📩 New Inquiry from ${data.name} ${data.eventDate ? `(${data.eventDate})` : ""}`,
    htmlBody: html,
  });
}

export interface ClientConfirmationData {
  fullName: string;
  email: string;
  weddingDates?: string;
  venue?: string;
  weddingType?: string;
}

export async function sendClientConfirmationEmail(data: ClientConfirmationData) {
  const rawFirst = (data.fullName || "").trim().split(" ")[0];
  const firstName = rawFirst && rawFirst.length > 0 ? rawFirst : "there";

  const hasDetails = data.weddingDates || data.venue || data.weddingType;
  const detailsHtml = hasDetails
    ? `
      <div style="background:#faf8f5;border:1px solid #ede8df;border-radius:6px;padding:16px 20px;margin:22px 0;">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#8a6d2b;margin-bottom:10px;">Celebration Overview</div>
        ${data.weddingDates ? `<div style="margin-bottom:6px;font-size:13px;color:#444;"><span style="display:inline-block;width:130px;color:#7a7a78;text-transform:uppercase;font-size:11px;letter-spacing:0.05em;">Wedding Date(s):</span> <strong style="color:#1c1c1b;">${data.weddingDates}</strong></div>` : ""}
        ${data.venue ? `<div style="margin-bottom:6px;font-size:13px;color:#444;"><span style="display:inline-block;width:130px;color:#7a7a78;text-transform:uppercase;font-size:11px;letter-spacing:0.05em;">Destination / Venue:</span> <strong style="color:#1c1c1b;">${data.venue}</strong></div>` : ""}
        ${data.weddingType ? `<div style="margin-bottom:6px;font-size:13px;color:#444;"><span style="display:inline-block;width:130px;color:#7a7a78;text-transform:uppercase;font-size:11px;letter-spacing:0.05em;">Scope &amp; Format:</span> <strong style="color:#1c1c1b;">${data.weddingType}</strong></div>` : ""}
      </div>
    `
    : "";

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          background-color: #f7f6f2;
          color: #1c1c1b;
          margin: 0;
          padding: 28px 16px;
          line-height: 1.6;
        }
        .card {
          max-width: 620px;
          margin: 0 auto;
          background: #ffffff;
          border-radius: 8px;
          border: 1px solid #e5e0d4;
          overflow: hidden;
          box-shadow: 0 4px 16px rgba(0,0,0,0.06);
        }
        .header {
          background: #1c1c1b;
          color: #ffffff;
          padding: 30px;
          text-align: center;
        }
        .brand-title {
          margin: 0;
          font-size: 22px;
          font-weight: 400;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #ffffff;
        }
        .brand-sub {
          margin: 8px 0 0;
          font-size: 11px;
          color: #d4af37;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          font-weight: 500;
        }
        .content {
          padding: 32px;
        }
        .badge {
          display: inline-block;
          background: #f4ede0;
          color: #8a6d2b;
          padding: 5px 14px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 20px;
        }
        .greeting {
          font-size: 18px;
          font-weight: 600;
          color: #1c1c1b;
          margin-bottom: 14px;
        }
        .lead-text {
          font-size: 15px;
          color: #2e2e2c;
          line-height: 1.7;
          margin-bottom: 18px;
        }
        .timeline {
          margin: 24px 0;
          border-top: 1px solid #f0eae1;
          padding-top: 20px;
        }
        .timeline-title {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #8a6d2b;
          margin-bottom: 14px;
        }
        .timeline-step {
          display: flex;
          gap: 12px;
          margin-bottom: 14px;
        }
        .step-num {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #1c1c1b;
          color: #d4af37;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
          flex-shrink: 0;
        }
        .step-text {
          font-size: 13px;
          color: #2e2e2c;
          line-height: 1.5;
        }
        .cta-bar {
          margin-top: 28px;
          padding-top: 20px;
          border-top: 1px solid #f0eae1;
          text-align: center;
        }
        .btn {
          display: inline-block;
          background: #1c1c1b;
          color: #ffffff !important;
          text-decoration: none;
          padding: 11px 22px;
          border-radius: 4px;
          font-size: 13px;
          font-weight: 500;
          margin: 0 4px 8px;
        }
        .btn-wa {
          background: #25D366;
        }
        .signature {
          margin-top: 28px;
          padding-top: 20px;
          border-top: 1px solid #f0eae1;
          font-size: 14px;
          color: #2e2e2c;
        }
        .footer {
          background: #faf8f5;
          padding: 18px 30px;
          text-align: center;
          font-size: 11px;
          color: #9c9c98;
          border-top: 1px solid #f0eae1;
          line-height: 1.6;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <div class="brand-title">White Frog Productions</div>
          <div class="brand-sub">Exclusive Wedding Cinema &amp; Fine-Art Photography</div>
        </div>
        <div class="content">
          <span class="badge">Wedding Vision Received</span>
          <div class="greeting">Hi ${firstName},</div>
          <p class="lead-text">Thank you for inviting us into the sacred beginnings of your wedding story. 💍✨</p>
          <p class="lead-text">At <strong>White Frog Productions</strong>, we don’t merely document celebrations; we craft bespoke <em>cinematic heirlooms</em>. Every glance, unscripted tear, and joyous burst of emotion is preserved with the same reverence as if it were our own family.</p>
          
          ${detailsHtml}

          <div class="timeline">
            <div class="timeline-title">What Happens Next</div>
            <div class="timeline-step">
              <div class="step-num">1</div>
              <div class="step-text"><strong>Creative Vision Review:</strong> Our directorial team will carefully review your dates, destination aesthetics, and storytelling preferences.</div>
            </div>
            <div class="timeline-step">
              <div class="step-num">2</div>
              <div class="step-text"><strong>Curated Proposal:</strong> We will craft a personalized presentation and bespoke options tailored exclusively to your wedding story.</div>
            </div>
            <div class="timeline-step">
              <div class="step-num">3</div>
              <div class="step-text"><strong>Direct Consultation (Within 24–48 Hours):</strong> Kunal or Madhavi will connect with you directly to align on availability and begin crafting your heirlooms.</div>
            </div>
          </div>

          <p class="lead-text" style="font-size: 13px; color: #7a7a78; font-style: italic;">
            Because we accept only a limited number of destination weddings each season, every couple we work with receives our dedicated focus, artistic energy, and personal attention.
          </p>

          <div class="cta-bar">
            <a href="https://wa.me/919899263434?text=Hi%20Kunal,%20we%20just%20submitted%20our%20wedding%20details%20on%20White%20Frog%20Productions!" class="btn btn-wa" target="_blank">Chat with Kunal on WhatsApp</a>
            <a href="https://www.whitefrogproductions.com/films" class="btn" target="_blank">Explore Our Films</a>
          </div>

          <div class="signature">
            Warm regards,<br/>
            <strong>Kunal &amp; Madhavi</strong><br/>
            <span style="color:#7a7a78;font-size:12px;">Founders &amp; Directors &bull; White Frog Productions</span>
          </div>
        </div>
        <div class="footer">
          Sent from notifications@whitefrogproductions.com &bull; New Delhi &bull; Worldwide<br/>
          <a href="https://www.whitefrogproductions.com" style="color:#8a6d2b;text-decoration:none;">www.whitefrogproductions.com</a> &bull; +91 98992 63434
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: [{ address: data.email, name: data.fullName }],
    replyTo: [{ address: "kunal@whitefrogproductions.com", name: "Kunal Khanna" }],
    subject: "💍 We’ve received your wedding details · White Frog Productions",
    htmlBody: html,
  });
}


