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
  Compass,
  TrendingUp,
  Activity,
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

  // Live SEO Radar state
  const [showRadar, setShowRadar] = useState(false);
  const [radarData, setRadarData] = useState<any>(null);
  const [radarError, setRadarError] = useState("");
  const [loadingRadar, setLoadingRadar] = useState(false);

  const fetchRadar = async () => {
    setLoadingRadar(true);
    setRadarError("");
    try {
      const pin = sessionStorage.getItem("wfp_admin_pin") || "wfp2026";
      const res = await fetch("/api/admin/seo-radar", {
        headers: { "x-admin-pin": pin },
      });
      const data = await res.json();
      if (data.success) {
        setRadarData(data);
        setRadarError("");
      } else {
        setRadarError(data.message || "Failed to load SEO radar data.");
      }
    } catch (err: any) {
      console.error("Failed to load SEO radar:", err);
      setRadarError("Network connection error while connecting to SEO radar.");
    } finally {
      setLoadingRadar(false);
    }
  };

  // Check persisted admin session
  useEffect(() => {
    const session = sessionStorage.getItem("wfp_admin_auth");
    if (session === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pin = pinInput.trim();
    if (pin === "wfp2026" || pin === "2026" || pin === "admin") {
      setIsAuthenticated(true);
      sessionStorage.setItem("wfp_admin_auth", "true");
      sessionStorage.setItem("wfp_admin_pin", pin);
      setPinError("");
    } else {
      setPinError("Incorrect studio access PIN.");
    }
  };

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const pin = sessionStorage.getItem("wfp_admin_pin") || "wfp2026";
      const res = await fetch("/api/admin/leads", {
        cache: "no-store",
        headers: {
          "x-admin-pin": pin,
        },
      });
      if (res.status === 401) {
        setIsAuthenticated(false);
        sessionStorage.removeItem("wfp_admin_auth");
        sessionStorage.removeItem("wfp_admin_pin");
        setPinError("Session expired. Please re-enter PIN.");
        return;
      }
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

            <button
              onClick={() => {
                const nextState = !showRadar;
                setShowRadar(nextState);
                if (nextState && !radarData) {
                  fetchRadar();
                }
              }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-forum text-xs tracking-wider uppercase transition-all ${
                showRadar
                  ? "bg-brand-gold text-brand-dark font-medium shadow-sm"
                  : "bg-white border border-brand-sand text-brand-dark hover:border-brand-gold"
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-brand-gold" />
              <span>Live SEO Radar</span>
            </button>
          </div>
        </div>

        {/* Live SEO Radar Panel */}
        {showRadar && (
          <div className="bg-[#faf8f5] p-6 sm:p-8 rounded-3xl border border-brand-gold/30 shadow-md space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-sand/60 pb-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-forum">
                    Autonomous SERP Engine
                  </span>
                </div>
                <h3 className="font-forum text-2xl text-brand-dark">
                  Live Google Search &amp; GA4 Intelligence Radar
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={fetchRadar}
                  disabled={loadingRadar}
                  className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-brand-sand rounded-full font-forum text-xs tracking-wider uppercase text-brand-dark hover:bg-brand-cream disabled:opacity-50 transition-colors"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingRadar ? "animate-spin" : ""}`} />
                  <span>Refresh Radar</span>
                </button>
                <button
                  onClick={() => setShowRadar(false)}
                  className="p-1.5 text-brand-muted hover:text-brand-dark transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {loadingRadar && !radarData ? (
              <div className="py-12 text-center space-y-3">
                <RefreshCw className="w-6 h-6 animate-spin mx-auto text-brand-gold" />
                <p className="font-cormorant text-base text-brand-muted italic">
                  Polling live Google Search Console &amp; GA4 telemetry...
                </p>
              </div>
            ) : radarData ? (
              <div className="space-y-6">
                {/* Radar Top Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-brand-sand/60">
                    <span className="text-[10px] uppercase tracking-wider text-brand-muted font-forum">
                      Active Realtime Users
                    </span>
                    <p className="font-forum text-2xl text-emerald-600 mt-1">
                      {radarData.summary?.ga4RealtimeUsers || 0}
                    </p>
                    <span className="text-[10px] text-brand-muted font-cormorant italic">Live in last 30 mins</span>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-brand-sand/60">
                    <span className="text-[10px] uppercase tracking-wider text-brand-muted font-forum">
                      Striking Distance (Pos 2-15)
                    </span>
                    <p className="font-forum text-2xl text-brand-gold mt-1">
                      {radarData.summary?.strikingDistanceCount || 0}
                    </p>
                    <span className="text-[10px] text-brand-muted font-cormorant italic">Prime for #1 takeover</span>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-brand-sand/60">
                    <span className="text-[10px] uppercase tracking-wider text-brand-muted font-forum">
                      Top Converting Keywords
                    </span>
                    <p className="font-forum text-2xl text-brand-dark mt-1">
                      {radarData.summary?.topPerformersCount || 0}
                    </p>
                    <span className="text-[10px] text-brand-muted font-cormorant italic">Dominating Top 5</span>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-brand-sand/60">
                    <span className="text-[10px] uppercase tracking-wider text-brand-muted font-forum">
                      Total Tracked Queries
                    </span>
                    <p className="font-forum text-2xl text-brand-dark mt-1">
                      {radarData.summary?.totalGscQueriesTracked || 0}
                    </p>
                    <span className="text-[10px] text-brand-muted font-cormorant italic">In Google Index</span>
                  </div>
                </div>

                {/* 2-Column Deep Dive */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Striking Distance Targets */}
                  <div className="bg-white p-5 rounded-2xl border border-brand-sand/60 space-y-4">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-brand-gold" />
                      <h4 className="font-forum text-sm tracking-wider uppercase text-brand-dark">
                        Striking Distance Hijack Opportunities
                      </h4>
                    </div>
                    <div className="divide-y divide-brand-sand/40 max-h-72 overflow-y-auto">
                      {(radarData.strikingDistance || []).map((item: any, i: number) => (
                        <div key={i} className="py-2.5 flex items-center justify-between text-xs font-cormorant">
                          <div className="space-y-0.5 max-w-[70%]">
                            <p className="font-medium text-brand-dark truncate">{item.query}</p>
                            <p className="text-[11px] text-brand-muted">
                              Impressions: <span className="text-brand-dark">{item.impressions}</span> · Clicks: {item.clicks}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="inline-block px-2 py-0.5 bg-amber-50 text-amber-900 border border-amber-200/60 rounded font-forum text-[11px]">
                              Pos {item.position}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top Performers & High-Opportunity Queries */}
                  <div className="bg-white p-5 rounded-2xl border border-brand-sand/60 space-y-4">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-emerald-600" />
                      <h4 className="font-forum text-sm tracking-wider uppercase text-brand-dark">
                        Top Performers &amp; High Impressions
                      </h4>
                    </div>
                    <div className="divide-y divide-brand-sand/40 max-h-72 overflow-y-auto">
                      {(radarData.topPerformers || []).map((item: any, i: number) => (
                        <div key={i} className="py-2.5 flex items-center justify-between text-xs font-cormorant">
                          <div className="space-y-0.5 max-w-[70%]">
                            <p className="font-medium text-brand-dark truncate">{item.query}</p>
                            <p className="text-[11px] text-brand-muted">
                              Clicks: <span className="text-emerald-700 font-semibold">{item.clicks}</span> · CTR: {(item.ctr * 100).toFixed(1)}%
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="inline-block px-2 py-0.5 bg-emerald-50 text-emerald-900 border border-emerald-200/60 rounded font-forum text-[11px]">
                              Rank #{item.position}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Real-Time Geographies */}
                {radarData.ga4TopLocations && radarData.ga4TopLocations.length > 0 && (
                  <div className="bg-white p-4 rounded-xl border border-brand-sand/60">
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="w-4 h-4 text-brand-gold" />
                      <h5 className="font-forum text-xs tracking-wider uppercase text-brand-dark">
                        Top Audience Locations (GA4 30-Day Activity)
                      </h5>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {radarData.ga4TopLocations.map((loc: any, i: number) => (
                        <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-cream text-brand-dark rounded-full font-forum text-xs border border-brand-sand/50">
                          <span>{loc.city || "Direct/Global"}</span>
                          <span className="text-brand-muted font-sans text-[10px]">({loc.views} views)</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : radarError ? (
              <div className="py-8 px-6 bg-white rounded-2xl border border-amber-300/80 shadow-sm space-y-4 max-w-2xl mx-auto text-center">
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
                  <Shield className="w-5 h-5" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-forum text-lg text-brand-dark">
                    Google Cloud Telemetry Setup Required
                  </h4>
                  <p className="font-cormorant text-sm sm:text-base text-brand-muted leading-relaxed">
                    {radarError}
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    onClick={fetchRadar}
                    disabled={loadingRadar}
                    className="inline-flex items-center gap-2 px-5 py-2 bg-brand-dark text-white rounded-full font-forum text-xs tracking-wider uppercase hover:bg-black transition-colors"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${loadingRadar ? "animate-spin" : ""}`} />
                    <span>Retry Connection</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-6 text-center font-cormorant text-sm text-brand-muted">
                Radar data currently unavailable.
              </div>
            )}
          </div>
        )}

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
