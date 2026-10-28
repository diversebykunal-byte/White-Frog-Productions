import fs from "fs";
import path from "path";
import { createAdminClient, supabase } from "@/lib/supabase";

export interface StoredLead {
  id: string;
  timestamp: string;
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
  source?: string;
}

export interface StoredInquiry {
  id: string;
  timestamp: string;
  name: string;
  email: string;
  phone?: string | null;
  message?: string | null;
  eventLocation?: string | null;
  eventDate?: string | null;
}

// Helper for resilient database operations with strict timeout
async function withTimeout<T>(promise: PromiseLike<T>, ms = 3500, fallback: T): Promise<T> {
  let timer: NodeJS.Timeout;
  const timeoutPromise = new Promise<T>((resolve) => {
    timer = setTimeout(() => {
      console.warn(`[Timeout] Supabase query timed out after ${ms}ms - continuing execution.`);
      resolve(fallback);
    }, ms);
  });
  return Promise.race([
    Promise.resolve(promise).then((res) => {
      clearTimeout(timer);
      return res;
    }),
    timeoutPromise,
  ]);
}

// Resilient filesystem paths (local dev vs Vercel serverless)
const LOCAL_LEADS_FILE = path.join(process.cwd(), "src", "data", "leads_storage.json");
const TMP_LEADS_FILE = path.join("/tmp", "wfp_leads_db.json");

function getStoragePath(): string {
  try {
    const dir = path.dirname(LOCAL_LEADS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    // Test write permission
    fs.accessSync(dir, fs.constants.W_OK);
    return LOCAL_LEADS_FILE;
  } catch {
    return TMP_LEADS_FILE;
  }
}

export function readStoredLeads(): StoredLead[] {
  const candidates = [LOCAL_LEADS_FILE, TMP_LEADS_FILE];
  const allLeads: StoredLead[] = [];
  const seen = new Set<string>();

  for (const filePath of candidates) {
    try {
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, "utf-8");
        const list: StoredLead[] = JSON.parse(raw);
        if (Array.isArray(list)) {
          for (const item of list) {
            const key = `${item.email || ""}_${item.phone || ""}_${item.timestamp || ""}`;
            if (!seen.has(key)) {
              seen.add(key);
              allLeads.push(item);
            }
          }
        }
      }
    } catch {
      // Ignore file read error
    }
  }

  return allLeads;
}

export async function saveLeadToDatabase(lead: Omit<StoredLead, "id" | "timestamp">): Promise<StoredLead> {
  const newLead: StoredLead = {
    ...lead,
    id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: new Date().toISOString(),
  };

  // 1. Save to local resilient file storage
  try {
    const filePath = getStoragePath();
    const existing = readStoredLeads();
    existing.unshift(newLead);
    fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), "utf-8");
  } catch (fsErr: any) {
    console.warn("Notice: Local DB file write notice:", fsErr?.message);
  }

  // 2. Insert into Supabase (if configured, wrapped with 3.5s timeout)
  try {
    const admin = createAdminClient();
    await withTimeout(
      admin.from("intake_leads").insert([
        {
          full_name: newLead.fullName,
          phone: newLead.phone,
          email: newLead.email,
          wedding_dates: newLead.weddingDates || null,
          venue: newLead.venue || null,
          wedding_type: newLead.weddingType || null,
          primary_priority: newLead.primaryPriority || null,
          biggest_fear: newLead.biggestFear || null,
          emotional_vision: newLead.emotionalVision || null,
          budget_bracket: newLead.budgetBracket || null,
          decision_maker: newLead.decisionMaker || null,
          created_at: newLead.timestamp,
        },
      ]),
      3500,
      { data: null, error: { message: "Supabase insert timed out" } } as any
    );
  } catch (sbErr: any) {
    // Non-blocking fallback
    console.warn("Supabase lead sync note:", sbErr?.message);
  }

  return newLead;
}

export async function saveInquiryToDatabase(inquiry: Omit<StoredInquiry, "id" | "timestamp">): Promise<StoredInquiry> {
  const newInq: StoredInquiry = {
    ...inquiry,
    id: `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: new Date().toISOString(),
  };

  // 1. Save to local resilient file storage
  try {
    const inqFile = path.join(path.dirname(getStoragePath()), "inquiries_storage.json");
    let existing: StoredInquiry[] = [];
    if (fs.existsSync(inqFile)) {
      try {
        existing = JSON.parse(fs.readFileSync(inqFile, "utf-8"));
      } catch {}
    }
    existing.unshift(newInq);
    fs.writeFileSync(inqFile, JSON.stringify(existing, null, 2), "utf-8");
  } catch (fsErr: any) {
    console.warn("Notice: Local Inquiry file write notice:", fsErr?.message);
  }

  // 2. Insert into Supabase (if configured, wrapped with 3.5s timeout)
  try {
    const admin = createAdminClient();
    await withTimeout(
      admin.from("inquiries").insert([
        {
          name: newInq.name,
          email: newInq.email,
          phone: newInq.phone || null,
          message: newInq.message || null,
          event_location: newInq.eventLocation || null,
          event_date: newInq.eventDate || null,
          created_at: newInq.timestamp,
        },
      ]),
      3500,
      { data: null, error: { message: "Supabase insert timed out" } } as any
    );
  } catch (sbErr: any) {
    console.warn("Supabase inquiry sync note:", sbErr?.message);
  }

  return newInq;
}
