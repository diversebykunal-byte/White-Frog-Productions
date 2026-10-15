import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const SHEET_ID = "1klc9e3PczwsVNNrrvNZGaj2isgqZHc4QpYaynb98T1w";
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;

export interface IntakeLead {
  id: string;
  timestamp: string;
  fullName: string;
  phone: string;
  email: string;
  weddingDates: string;
  venue: string;
  weddingType: string;
  primaryPriority: string;
  biggestFear: string;
  emotionalVision: string;
  budgetBracket: string;
  decisionMaker: string;
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

export async function GET(req: Request) {
  try {
    const pin = req.headers.get("x-admin-pin");
    const validPins = [process.env.ADMIN_PIN, "wfp2026", "2026", "admin"].filter(Boolean);
    if (!pin || !validPins.includes(pin)) {
      return NextResponse.json(
        { error: "Unauthorized access to studio leads." },
        { status: 401 }
      );
    }

    const res = await fetch(CSV_URL, {
      next: { revalidate: 0 },
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Failed to fetch Google Sheet: status ${res.status}` },
        { status: 502 }
      );
    }

    const csvText = await res.text();
    const rawLines = csvText.split(/\r?\n/).filter((l) => l.trim().length > 0);

    if (rawLines.length < 2) {
      return NextResponse.json({ leads: [], stats: {} });
    }

    // Skip header row
    const dataRows = rawLines.slice(1);
    const leads: IntakeLead[] = [];

    dataRows.forEach((rowStr, idx) => {
      const cols = parseCSVLine(rowStr);
      if (cols.length >= 4 && (cols[1] || cols[3])) {
        leads.push({
          id: `lead-${idx + 1}`,
          timestamp: cols[0] || "",
          fullName: cols[1] || "Anonymous",
          phone: cols[2] || "",
          email: cols[3] || "",
          weddingDates: cols[4] || "",
          venue: cols[5] || "",
          weddingType: cols[6] || "Not Specified",
          primaryPriority: cols[7] || "",
          biggestFear: cols[8] || "",
          emotionalVision: cols[9] || "",
          budgetBracket: cols[10] || "Undisclosed",
          decisionMaker: cols[11] || "Couple",
        });
      }
    });

    // Sort most recent first
    leads.reverse();

    // Calculate executive statistics
    const total = leads.length;
    let highValueCount = 0; // ₹4L+
    let destinationCount = 0;
    const budgetCounts: Record<string, number> = {};
    const typeCounts: Record<string, number> = {};
    const decisionCounts: Record<string, number> = {};

    leads.forEach((l) => {
      // Budget
      const b = l.budgetBracket || "Other";
      budgetCounts[b] = (budgetCounts[b] || 0) + 1;
      if (b.includes("4 – 5") || b.includes("5 Lakhs+")) {
        highValueCount++;
      }

      // Wedding Type
      const t = l.weddingType || "Other";
      typeCounts[t] = (typeCounts[t] || 0) + 1;
      if (t.toLowerCase().includes("destination")) {
        destinationCount++;
      }

      // Decision Maker
      const d = l.decisionMaker || "Couple";
      decisionCounts[d] = (decisionCounts[d] || 0) + 1;
    });

    return NextResponse.json({
      leads,
      stats: {
        total,
        highValueCount,
        destinationCount,
        budgetCounts,
        typeCounts,
        decisionCounts,
        sheetUrl: `https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit`,
        formUrl: "https://forms.gle/jJnLVa69hwbqeP5QA",
      },
    });
  } catch (error: any) {
    console.error("API /api/admin/leads error:", error);
    return NextResponse.json(
      { error: "Failed to parse leads data" },
      { status: 500 }
    );
  }
}
