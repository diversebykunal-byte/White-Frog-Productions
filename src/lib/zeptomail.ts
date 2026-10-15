const ZEPTOMAIL_URL = process.env.ZEPTOMAIL_URL || "https://api.zeptomail.in/v1.1/email";
const ZEPTOMAIL_API_KEY =
  process.env.ZEPTOMAIL_API_KEY ||
  process.env.ZEPTOMAIL_API_TOKEN ||
  "Zoho-enczapikey PHtE6r1YS+rijWB68hNV4vO4Q5TxNNsqr7xvelRC4twWDqBSTk1X/98pkTSz+EgjA/EQQv/Pwd08uLnOsrrXdDzqNjwfCWqyqK3sx/VYSPOZsbq6x00YtVQec0LeVIXoc9Rr0yzWvNjSNA==";

const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || "kunal@whitefrogproductions.com";
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
    to: [{ address: ADMIN_EMAIL, name: "Kunal Khanna" }],
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
    to: [{ address: ADMIN_EMAIL, name: "Kunal Khanna" }],
    replyTo: [{ address: data.email, name: data.name }],
    subject: `📩 New Inquiry from ${data.name} ${data.eventDate ? `(${data.eventDate})` : ""}`,
    htmlBody: html,
  });
}

export interface ClientConfirmationData {
  fullName: string;
  email: string;
}

export async function sendClientConfirmationEmail(data: ClientConfirmationData) {
  const firstName = (data.fullName || "").trim().split(" ")[0] || "";

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          background-color: #ffffff;
          color: #111111;
          margin: 0;
          padding: 32px 20px;
          line-height: 1.65;
          font-size: 15px;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background: #ffffff;
        }
        .greeting {
          font-size: 16px;
          margin-bottom: 24px;
          color: #111111;
        }
        p {
          margin: 0 0 20px;
          color: #111111;
        }
        .bold {
          font-weight: 700;
        }
        .list-container {
          margin: 16px 0 24px 0;
          padding-left: 0;
          list-style: none;
        }
        .list-item {
          margin-bottom: 10px;
          padding-left: 24px;
          position: relative;
        }
        .list-number {
          position: absolute;
          left: 0;
          top: 0;
          font-weight: 400;
        }
        .signature {
          margin-top: 36px;
          color: #111111;
        }
        .signature-name {
          font-weight: 700;
          margin-top: 16px;
          font-size: 15px;
        }
        .signature-brand {
          color: #333333;
          font-size: 14px;
          margin-top: 4px;
        }
        .signature-link {
          color: #0b57d0;
          text-decoration: underline;
          font-size: 14px;
          display: inline-block;
          margin-top: 8px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="greeting">Hi ${firstName ? `${firstName} ,` : ","}</div>

        <p><strong>Thank you for sharing your wedding details with us. 💍✨</strong></p>

        <p><strong>At White Frog Productions, we don’t just capture weddings, we design cinematic heirlooms. Every moment, every glance, every detail is preserved with the same care as if it were our own family.</strong></p>

        <p><strong>Here's what happens next:</strong></p>

        <div class="list-container">
          <div class="list-item">
            <span class="list-number">1.</span>
            Our creative team will carefully review your vision and preferences.
          </div>
          <div class="list-item">
            <span class="list-number">2.</span>
            We'll craft a <strong>personalized proposal</strong> aligned with your story and expectations.
          </div>
          <div class="list-item">
            <span class="list-number">3.</span>
            Within the next <strong>48 hours</strong>, you'll receive a curated presentation with options designed exclusively for your wedding.
          </div>
        </div>

        <p><strong>Because we accept only a limited number of weddings each year, every couple we work with receives our full attention, planning, and creative energy.</strong></p>

        <p><strong>We're truly excited about the possibility of creating a timeless memory capsule for you and your family.</strong></p>

        <div class="signature">
          <p style="margin: 0;"><strong>Warm regards,</strong></p>
          <div class="signature-name">Kunal Khanna</div>
          <div class="signature-brand">White Frog Productions</div>
          <a href="https://www.whitefrogproductions.com" class="signature-link">www.whitefrogproductions.com</a>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: [{ address: data.email, name: data.fullName }],
    replyTo: [{ address: ADMIN_EMAIL, name: "Kunal Khanna" }],
    subject: "We’ve received your details",
    htmlBody: html,
  });
}

