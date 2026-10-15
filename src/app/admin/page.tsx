"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  RefreshCw,
  Phone,
  Mail,
  MessageCircle,
  Calendar,
  MapPin,
  Lock,
  ExternalLink,
  DollarSign,
  Users,
  Eye,
  CheckCircle2,
  X,
  Sparkles,
  Award,
  ChevronRight,
  Shield,
  FileSpreadsheet,
} from "lucide-react";
import { IntakeLead } from "@/app/api/admin/leads/route";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");

  const [leads, setLeads] = useState<IntakeLead[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  const [selectedLead, setSelectedLead] = useState<IntakeLead | null>(null);

  // Check persisted admin session
  useEffect(() => {
    const session = sessionStorage.getItem("wfp_admin_auth");
    if (session === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Default PIN: wfp2026 or 2026
    if (pinInput === "wfp2026" || pinInput === "2026" || pinInput === "admin") {
      setIsAuthenticated(true);
      sessionStorage.setItem("wfp_admin_auth", "true");
      setPinError("");
    } else {
      setPinError("Incorrect studio PIN. Try 'wfp2026'");
    }
  };

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/leads", { cache: "no-store" });
      const data = await res.json();
      if (data.leads) {
        setLeads(data.leads);
        setStats(data.stats);
      }
    } catch (err) {
      console.error("Failed to load leads:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchLeads();
    }
  }, [isAuthenticated]);

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        lead.fullName.toLowerCase().includes(q) ||
        lead.email.toLowerCase().includes(q) ||
        lead.phone.toLowerCase().includes(q) ||
        lead.venue.toLowerCase().includes(q) ||
        lead.weddingDates.toLowerCase().includes(q);

      const matchesBudget =
        selectedBudget === "All" || lead.budgetBracket.includes(selectedBudget);

      const matchesType =
        selectedType === "All" ||
        lead.weddingType.toLowerCase() === selectedType.toLowerCase();

      return matchesSearch && matchesBudget && matchesType;
    });
  }, [leads, searchQuery, selectedBudget, selectedType]);

  // Clean phone number for WhatsApp
  const cleanPhone = (raw: string) => {
    const digits = raw.replace(/\D/g, "");
    if (digits.length === 10) return `91${digits}`;
    return digits;
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#1c1b1a] text-white flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-[#272624] border border-neutral-700/60 p-8 sm:p-10 rounded-2xl shadow-2xl space-y-6 text-center">
          <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mx-auto text-[#d8c29d]">
            <Lock className="w-6 h-6 stroke-[1.75]" />
          </div>
          <div className="space-y-1">
            <h2 className="font-forum text-2xl sm:text-3xl tracking-wide text-white">
              Studio Leads Desk
            </h2>
            <p className="font-cormorant text-neutral-400 text-sm italic">
              White Frog Productions · Internal Admin Portal
            </p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter Studio PIN (default: wfp2026)"
                className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-center font-mono text-sm tracking-widest text-white focus:outline-none focus:border-[#d8c29d]"
                autoFocus
              />
              {pinError && <p className="text-red-400 text-xs mt-2">{pinError}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#d8c29d] text-brand-dark rounded-lg font-forum text-xs tracking-widest uppercase hover:bg-white transition-colors font-medium"
            >
              Unlock Dashboard
            </button>
          </form>

          <p className="text-[11px] text-neutral-500 font-forum uppercase tracking-wider">
            Protected for Kunal Khanna & Madhavi Singh
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] text-brand-dark pt-28 pb-24 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-brand-sand/60">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs uppercase tracking-widest text-brand-muted font-forum">
                Live Response Sync Active
              </span>
            </div>
            <h1 className="font-forum text-3xl sm:text-4xl text-brand-dark tracking-wide mt-1">
              WFP Leads & Intake Command Center
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={fetchLeads}
              disabled={loading}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-brand-sand/70 rounded-full font-forum text-xs tracking-wider uppercase text-brand-dark hover:bg-brand-sand/20 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh Sheet</span>
            </button>

            <a
              href="https://docs.google.com/spreadsheets/d/1klc9e3PczwsVNNrrvNZGaj2isgqZHc4QpYaynb98T1w/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#0F9D58] text-white rounded-full font-forum text-xs tracking-wider uppercase hover:opacity-90 transition-opacity"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Google Sheet</span>
            </a>

            <a
              href="https://forms.gle/jJnLVa69hwbqeP5QA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#673AB7] text-white rounded-full font-forum text-xs tracking-wider uppercase hover:opacity-90 transition-opacity"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Google Form</span>
            </a>

            <Link
              href="/intake"
              target="_blank"
              className="inline-flex items-center gap-2 px-4 py-2 bg-brand-dark text-white rounded-full font-forum text-xs tracking-wider uppercase hover:bg-black transition-colors"
            >
              <span>Web Intake Form</span>
            </Link>
          </div>
        </div>

        {/* Executive KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-6 rounded-2xl border border-brand-sand/70 shadow-sm space-y-2">
            <span className="text-xs uppercase tracking-widest text-brand-muted font-forum">
              Total Inquiries
            </span>
            <div className="flex items-baseline justify-between">
              <span className="font-forum text-4xl text-brand-dark">{leads.length}</span>
              <span className="px-2 py-0.5 bg-brand-sand/30 text-brand-dark rounded text-[11px] font-forum uppercase">
                All-Time
              </span>
            </div>
            <p className="font-cormorant text-xs text-brand-muted italic">
              Synchronized from Google Sheet
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-brand-sand/70 shadow-sm space-y-2">
            <span className="text-xs uppercase tracking-widest text-brand-muted font-forum">
              High-Value Tiers (₹4L+)
            </span>
            <div className="flex items-baseline justify-between">
              <span className="font-forum text-4xl text-brand-gold">
                {stats?.highValueCount || 0}
              </span>
              <span className="px-2 py-0.5 bg-amber-50 text-amber-800 rounded text-[11px] font-forum uppercase font-medium">
                Signature Plus+
              </span>
            </div>
            <p className="font-cormorant text-xs text-brand-muted italic">
              Premium & Luxury Inquiries
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-brand-sand/70 shadow-sm space-y-2">
            <span className="text-xs uppercase tracking-widest text-brand-muted font-forum">
              Destination Weddings
            </span>
            <div className="flex items-baseline justify-between">
              <span className="font-forum text-4xl text-brand-dark">
                {stats?.destinationCount || 0}
              </span>
              <span className="px-2 py-0.5 bg-blue-50 text-blue-800 rounded text-[11px] font-forum uppercase">
                Rajasthan / Beach
              </span>
            </div>
            <p className="font-cormorant text-xs text-brand-muted italic">
              Multi-day celebrations
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-brand-sand/70 shadow-sm space-y-2">
            <span className="text-xs uppercase tracking-widest text-brand-muted font-forum">
              Latest Activity
            </span>
            <div className="flex items-baseline justify-between">
              <span className="font-forum text-lg text-brand-dark truncate">
                {leads[0]?.fullName || "No leads"}
              </span>
            </div>
            <p className="font-cormorant text-xs text-brand-muted truncate">
              {leads[0]?.timestamp || "N/A"}
            </p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-white p-6 rounded-2xl border border-brand-sand/70 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-brand-muted absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by bride/groom, phone, venue, city..."
                className="w-full pl-11 pr-4 py-2.5 bg-[#faf8f5] border border-brand-sand/60 rounded-full font-cormorant text-base text-brand-dark placeholder:text-brand-muted/70 focus:outline-none focus:border-brand-dark"
              />
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="font-forum text-xs uppercase tracking-wider text-brand-muted">
                  Budget:
                </span>
                <select
                  value={selectedBudget}
                  onChange={(e) => setSelectedBudget(e.target.value)}
                  className="px-3 py-2 bg-[#faf8f5] border border-brand-sand/60 rounded-lg font-forum text-xs text-brand-dark focus:outline-none"
                >
                  <option value="All">All Budgets</option>
                  <option value="2 – 3">₹2 – 3 Lakhs (Essentials)</option>
                  <option value="3 – 4">₹3 – 4 Lakhs (Signature)</option>
                  <option value="4 – 5">₹4 – 5 Lakhs (Signature Plus)</option>
                  <option value="5 Lakhs+">₹5 Lakhs+ (Forever After)</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-forum text-xs uppercase tracking-wider text-brand-muted">
                  Type:
                </span>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-3 py-2 bg-[#faf8f5] border border-brand-sand/60 rounded-lg font-forum text-xs text-brand-dark focus:outline-none"
                >
                  <option value="All">All Types</option>
                  <option value="Destination">Destination</option>
                  <option value="Intimate">Intimate</option>
                  <option value="Traditional">Traditional</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-2xl border border-brand-sand/70 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f5f3ec] border-b border-brand-sand/60 text-[11px] font-forum uppercase tracking-widest text-brand-muted">
                  <th className="py-4 px-6">Timestamp & Client</th>
                  <th className="py-4 px-6">Quick Connect</th>
                  <th className="py-4 px-6">Venue & Dates</th>
                  <th className="py-4 px-6">Style & Priority</th>
                  <th className="py-4 px-6">Budget Tier</th>
                  <th className="py-4 px-6 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-sand/40 font-cormorant text-base">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-16 text-brand-muted">
                      No matching inquiries found in the spreadsheet.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => {
                    const waPhone = cleanPhone(lead.phone);
                    const waMessage = encodeURIComponent(
                      `Hi ${lead.fullName}, this is Kunal from White Frog Productions! We received your wedding intake details for ${
                        lead.venue || "your wedding"
                      }. I would love to share our private portfolio and discuss your dates.`
                    );

                    return (
                      <tr
                        key={lead.id}
                        className="hover:bg-[#faf8f5] transition-colors group cursor-pointer"
                        onClick={() => setSelectedLead(lead)}
                      >
                        {/* Client & Date */}
                        <td className="py-4 px-6">
                          <div className="font-forum text-base text-brand-dark font-medium group-hover:text-brand-gold transition-colors">
                            {lead.fullName}
                          </div>
                          <div className="text-xs text-brand-muted font-sans flex items-center gap-1 mt-0.5">
                            <Calendar className="w-3 h-3" />
                            {lead.timestamp}
                          </div>
                        </td>

                        {/* Quick Connect Actions */}
                        <td className="py-4 px-6" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center gap-2">
                            {lead.phone && (
                              <a
                                href={`https://wa.me/${waPhone}?text=${waMessage}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Chat on WhatsApp"
                                className="p-2 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-colors"
                              >
                                <MessageCircle className="w-4 h-4" />
                              </a>
                            )}
                            {lead.phone && (
                              <a
                                href={`tel:${lead.phone}`}
                                title="Call Client"
                                className="p-2 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white transition-colors"
                              >
                                <Phone className="w-4 h-4" />
                              </a>
                            )}
                            {lead.email && (
                              <a
                                href={`mailto:${lead.email}?subject=White%20Frog%20Productions%20-%20Wedding%20Inquiry`}
                                title="Send Email"
                                className="p-2 rounded-full bg-neutral-100 text-brand-dark hover:bg-brand-dark hover:text-white transition-colors"
                              >
                                <Mail className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        </td>

                        {/* Venue & Dates */}
                        <td className="py-4 px-6 max-w-xs">
                          <div className="text-sm font-medium text-brand-dark truncate">
                            {lead.venue || "Venue TBD"}
                          </div>
                          <div className="text-xs text-brand-muted truncate">
                            {lead.weddingDates || "Dates TBD"}
                          </div>
                        </td>

                        {/* Style & Priority */}
                        <td className="py-4 px-6">
                          <span className="inline-block px-2.5 py-1 bg-brand-sand/30 border border-brand-sand/60 rounded text-xs font-forum tracking-wider uppercase text-brand-dark">
                            {lead.weddingType || "Standard"}
                          </span>
                          <div className="text-xs text-brand-muted truncate mt-1">
                            {lead.primaryPriority}
                          </div>
                        </td>

                        {/* Budget */}
                        <td className="py-4 px-6">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-forum tracking-wide ${
                              lead.budgetBracket.includes("5 Lakhs+")
                                ? "bg-amber-100 text-amber-900 border border-amber-300 font-medium"
                                : lead.budgetBracket.includes("4 – 5")
                                ? "bg-purple-100 text-purple-900 border border-purple-200"
                                : "bg-neutral-100 text-neutral-800"
                            }`}
                          >
                            {lead.budgetBracket}
                          </span>
                        </td>

                        {/* Details Button */}
                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() => setSelectedLead(lead)}
                            className="inline-flex items-center gap-1 font-forum text-xs tracking-wider uppercase text-brand-muted group-hover:text-brand-dark transition-colors"
                          >
                            <span>Dossier</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Lead Dossier Modal / Slide-Over */}
        {selectedLead && (
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedLead(null)}
          >
            <div
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 shadow-2xl space-y-8 text-brand-dark relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedLead(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-neutral-100 transition-colors text-brand-muted hover:text-brand-dark"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Dossier Header */}
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-brand-gold font-forum">
                  Client Dossier #{selectedLead.id}
                </span>
                <h2 className="font-forum text-3xl text-brand-dark">
                  {selectedLead.fullName}
                </h2>
                <p className="text-xs text-brand-muted font-sans flex items-center gap-2">
                  <span>Logged: {selectedLead.timestamp}</span>
                  <span>•</span>
                  <span>Decision Maker: {selectedLead.decisionMaker}</span>
                </p>
              </div>

              {/* Direct Action Hub */}
              <div className="p-4 bg-[#f4efe8] rounded-xl flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="text-[11px] uppercase tracking-wider text-brand-muted font-forum">
                    Contact Channels
                  </span>
                  <div className="text-sm font-sans font-medium text-brand-dark">
                    {selectedLead.phone} · {selectedLead.email}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/${cleanPhone(selectedLead.phone)}?text=${encodeURIComponent(
                      `Hi ${selectedLead.fullName}, Kunal here from White Frog Productions! We received your intake details for ${
                        selectedLead.venue || "your celebration"
                      }. When would be a good time to connect on a brief discovery call?`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#25D366] text-white rounded-full font-forum text-xs tracking-wider uppercase hover:opacity-90"
                  >
                    <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                  </a>
                  <a
                    href={`tel:${selectedLead.phone}`}
                    className="p-2 bg-brand-dark text-white rounded-full hover:bg-black"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={`mailto:${selectedLead.email}`}
                    className="p-2 bg-white border border-brand-sand text-brand-dark rounded-full hover:bg-brand-sand/30"
                  >
                    <Mail className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Questionnaire Breakdown */}
              <div className="space-y-6 text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-[#faf8f5] rounded-xl border border-brand-sand/50 space-y-1">
                    <span className="text-[11px] font-forum uppercase tracking-wider text-brand-muted">
                      Wedding Dates & Events
                    </span>
                    <p className="font-forum text-base text-brand-dark font-medium">
                      {selectedLead.weddingDates || "Not Specified"}
                    </p>
                  </div>
                  <div className="p-4 bg-[#faf8f5] rounded-xl border border-brand-sand/50 space-y-1">
                    <span className="text-[11px] font-forum uppercase tracking-wider text-brand-muted">
                      Wedding City & Venue
                    </span>
                    <p className="font-forum text-base text-brand-dark font-medium">
                      {selectedLead.venue || "Not Specified"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-[#faf8f5] rounded-xl border border-brand-sand/50 space-y-1">
                    <span className="text-[11px] font-forum uppercase tracking-wider text-brand-muted">
                      Wedding Style
                    </span>
                    <p className="font-forum text-base text-brand-dark font-medium">
                      {selectedLead.weddingType}
                    </p>
                  </div>
                  <div className="p-4 bg-[#faf8f5] rounded-xl border border-brand-sand/50 space-y-1">
                    <span className="text-[11px] font-forum uppercase tracking-wider text-brand-muted">
                      Investment Vision
                    </span>
                    <p className="font-forum text-base text-brand-dark font-medium text-brand-gold">
                      {selectedLead.budgetBracket}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-[#faf8f5] rounded-xl border border-brand-sand/50 space-y-2">
                  <span className="text-[11px] font-forum uppercase tracking-wider text-brand-muted">
                    Primary Creative Priority
                  </span>
                  <p className="font-forum text-base text-brand-dark">
                    {selectedLead.primaryPriority || "Not Specified"}
                  </p>
                </div>

                {selectedLead.biggestFear && (
                  <div className="p-5 bg-amber-50/50 rounded-xl border border-amber-200/70 space-y-1.5">
                    <span className="text-[11px] font-forum uppercase tracking-wider text-amber-900 font-medium">
                      What’s their biggest fear about wedding photography?
                    </span>
                    <p className="font-cormorant text-lg text-brand-dark italic leading-relaxed">
                      &ldquo;{selectedLead.biggestFear}&rdquo;
                    </p>
                  </div>
                )}

                {selectedLead.emotionalVision && (
                  <div className="p-5 bg-purple-50/50 rounded-xl border border-purple-200/70 space-y-1.5">
                    <span className="text-[11px] font-forum uppercase tracking-wider text-purple-900 font-medium">
                      How do they want to feel watching their film years later?
                    </span>
                    <p className="font-cormorant text-lg text-brand-dark italic leading-relaxed">
                      &ldquo;{selectedLead.emotionalVision}&rdquo;
                    </p>
                  </div>
                )}
              </div>

              {/* Close Button */}
              <div className="pt-4 border-t border-brand-sand/40 flex justify-end">
                <button
                  onClick={() => setSelectedLead(null)}
                  className="px-6 py-2.5 bg-brand-dark text-white rounded-full font-forum text-xs tracking-widest uppercase"
                >
                  Close Dossier
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
