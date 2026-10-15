"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  Loader2,
  Sparkles,
  Heart,
  Calendar,
  MapPin,
  Camera,
  Shield,
  MessageCircle,
  ArrowRight,
  ChevronLeft,
} from "lucide-react";

export default function IntakePage() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    weddingDates: "",
    venue: "",
    weddingType: "Destination",
    primaryPriority: "Cinematic wedding film",
    biggestFear: "",
    emotionalVision: "",
    budgetBracket: "₹4 – 5 Lakhs (Signature Plus Experience)",
    decisionMaker: "Couple",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Unable to submit form. Please try again.");
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error("Intake submission error:", err);
      setErrorMsg(err.message || "Something went wrong. Please try again or reach out on WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-brand-dark pt-32 pb-24 px-6 sm:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-forum text-xs tracking-widest uppercase text-brand-muted hover:text-brand-dark transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-brand-sand/30 rounded-full border border-brand-sand/60 text-xs tracking-widest uppercase text-brand-muted font-forum">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>Private Client Consultation</span>
          </div>
          <h1 className="font-forum text-4xl sm:text-5xl md:text-6xl text-brand-dark tracking-wide">
            WFP Intake Form
          </h1>
          <p className="font-cormorant text-xl sm:text-2xl text-brand-muted max-w-xl mx-auto italic font-light leading-relaxed">
            We don’t just capture weddings. We design cinematic heirlooms.
            To give you the most seamless and luxurious experience, please share a few details with us.
          </p>
        </div>

        {submitted ? (
          <div className="bg-white border border-brand-sand/70 rounded-2xl p-10 sm:p-14 text-center space-y-6 shadow-sm">
            <div className="w-16 h-16 bg-[#f4efe8] rounded-full flex items-center justify-center mx-auto text-brand-dark">
              <CheckCircle2 className="w-8 h-8 stroke-[1.5]" />
            </div>
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-brand-gold font-forum">
                Intake Received
              </span>
              <h2 className="font-forum text-3xl sm:text-4xl text-brand-dark tracking-wide">
                Thank You, {formData.fullName}!
              </h2>
            </div>
            <p className="font-cormorant text-lg sm:text-xl text-brand-muted max-w-md mx-auto leading-relaxed">
              We take on only a limited number of weddings each year to ensure a stress-free, white-glove experience. Kunal & Madhavi will personally review your celebration details and connect with a curated proposal.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`https://wa.me/919871111762?text=${encodeURIComponent(
                  `Hi Kunal & Madhavi! I just filled out the WFP intake form for my wedding (${formData.weddingDates || "upcoming"}). Looking forward to connecting!`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#25D366] text-white rounded-full font-forum text-xs tracking-widest uppercase hover:opacity-90 transition-opacity"
              >
                <MessageCircle className="w-4 h-4" /> Message Kunal on WhatsApp
              </a>
              <Link
                href="/films"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-brand-dark text-white rounded-full font-forum text-xs tracking-widest uppercase hover:bg-black transition-colors"
              >
                Watch Films <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-brand-sand/70 rounded-2xl p-8 sm:p-12 shadow-sm space-y-10"
          >
            {errorMsg && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
                {errorMsg}
              </div>
            )}

            {/* Section 1: Contact Information */}
            <div className="space-y-6">
              <div className="border-b border-brand-sand/40 pb-3 flex items-center justify-between">
                <h3 className="font-forum text-xl sm:text-2xl text-brand-dark tracking-wide">
                  1. Contact Information
                </h3>
                <span className="text-xs tracking-widest uppercase font-forum text-brand-muted">
                  The Basics
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block font-forum text-xs uppercase tracking-widest text-brand-dark mb-1.5">
                    Full Name <span className="text-brand-gold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Radhika Sharma & Siddharth Mehta"
                    className="w-full px-4 py-3 bg-[#faf8f5] border border-brand-sand/60 rounded-lg font-cormorant text-lg text-brand-dark focus:outline-none focus:border-brand-dark transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-forum text-xs uppercase tracking-widest text-brand-dark mb-1.5">
                      Contact / WhatsApp Number <span className="text-brand-gold">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 bg-[#faf8f5] border border-brand-sand/60 rounded-lg font-cormorant text-lg text-brand-dark focus:outline-none focus:border-brand-dark transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-forum text-xs uppercase tracking-widest text-brand-dark mb-1.5">
                      Email Address <span className="text-brand-gold">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="radhika@example.com"
                      className="w-full px-4 py-3 bg-[#faf8f5] border border-brand-sand/60 rounded-lg font-cormorant text-lg text-brand-dark focus:outline-none focus:border-brand-dark transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Dates & Itinerary */}
            <div className="space-y-6">
              <div className="border-b border-brand-sand/40 pb-3 flex items-center justify-between">
                <h3 className="font-forum text-xl sm:text-2xl text-brand-dark tracking-wide">
                  2. Wedding Itinerary & Venues
                </h3>
                <span className="text-xs tracking-widest uppercase font-forum text-brand-muted">
                  Logistics
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block font-forum text-xs uppercase tracking-widest text-brand-dark mb-1.5">
                    Wedding Dates (write all dates with Events) <span className="text-brand-gold">*</span>
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={formData.weddingDates}
                    onChange={(e) => setFormData({ ...formData, weddingDates: e.target.value })}
                    placeholder="e.g. 18th Nov: Mehendi & Sangeet, 19th Nov: Haldi & Golden Hour Pheras"
                    className="w-full px-4 py-3 bg-[#faf8f5] border border-brand-sand/60 rounded-lg font-cormorant text-lg text-brand-dark focus:outline-none focus:border-brand-dark transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-forum text-xs uppercase tracking-widest text-brand-dark mb-1.5">
                    Wedding City / Venue (write venues for all events) <span className="text-brand-gold">*</span>
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={formData.venue}
                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                    placeholder="e.g. Fairmont Jaipur / Tijara Fort Palace Alwar"
                    className="w-full px-4 py-3 bg-[#faf8f5] border border-brand-sand/60 rounded-lg font-cormorant text-lg text-brand-dark focus:outline-none focus:border-brand-dark transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-forum text-xs uppercase tracking-widest text-brand-dark mb-2">
                    What kind of wedding are you planning?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {["Intimate", "Destination", "Traditional", "Other"].map((type) => {
                      const isSel = formData.weddingType === type;
                      return (
                        <button
                          type="button"
                          key={type}
                          onClick={() => setFormData({ ...formData, weddingType: type })}
                          className={`py-3 px-4 rounded-lg font-forum text-xs uppercase tracking-wider transition-all border ${
                            isSel
                              ? "bg-brand-dark text-white border-brand-dark shadow-sm"
                              : "bg-[#faf8f5] text-brand-dark/80 border-brand-sand/60 hover:border-brand-dark"
                          }`}
                        >
                          {type}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Priorities & Emotional Goals */}
            <div className="space-y-6">
              <div className="border-b border-brand-sand/40 pb-3 flex items-center justify-between">
                <h3 className="font-forum text-xl sm:text-2xl text-brand-dark tracking-wide">
                  3. Creative Priorities & Vision
                </h3>
                <span className="text-xs tracking-widest uppercase font-forum text-brand-muted">
                  The Art
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block font-forum text-xs uppercase tracking-widest text-brand-dark mb-2">
                    Which is most important to you?
                  </label>
                  <div className="space-y-2">
                    {[
                      "Cinematic wedding film",
                      "Candid photography",
                      "Stress-free family portraits",
                      "Same-day reels & highlights",
                      "Luxury albums & legacy pieces",
                    ].map((pri) => {
                      const isSel = formData.primaryPriority === pri;
                      return (
                        <label
                          key={pri}
                          className={`flex items-center gap-3 p-3.5 rounded-lg border cursor-pointer transition-all ${
                            isSel
                              ? "bg-[#f4efe8] border-brand-gold text-brand-dark font-medium"
                              : "bg-[#faf8f5] border-brand-sand/60 text-brand-muted hover:border-brand-dark"
                          }`}
                        >
                          <input
                            type="radio"
                            name="primaryPriority"
                            value={pri}
                            checked={isSel}
                            onChange={(e) =>
                              setFormData({ ...formData, primaryPriority: e.target.value })
                            }
                            className="text-brand-dark focus:ring-brand-dark"
                          />
                          <span className="font-forum text-sm tracking-wide">{pri}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block font-forum text-xs uppercase tracking-widest text-brand-dark mb-1.5">
                    What’s your biggest fear about wedding photography?
                  </label>
                  <textarea
                    rows={2}
                    value={formData.biggestFear}
                    onChange={(e) => setFormData({ ...formData, biggestFear: e.target.value })}
                    placeholder="e.g. Stiff awkward posing, intrusive cameras blocking guests, or slow delivery"
                    className="w-full px-4 py-3 bg-[#faf8f5] border border-brand-sand/60 rounded-lg font-cormorant text-lg text-brand-dark focus:outline-none focus:border-brand-dark transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-forum text-xs uppercase tracking-widest text-brand-dark mb-1.5">
                    How do you want to feel when you watch your wedding film years later?
                  </label>
                  <textarea
                    rows={2}
                    value={formData.emotionalVision}
                    onChange={(e) =>
                      setFormData({ ...formData, emotionalVision: e.target.value })
                    }
                    placeholder="e.g. Goosebumps, laughing through tears, reliving the genuine energy of our people"
                    className="w-full px-4 py-3 bg-[#faf8f5] border border-brand-sand/60 rounded-lg font-cormorant text-lg text-brand-dark focus:outline-none focus:border-brand-dark transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Section 4: Budget & Stakeholders */}
            <div className="space-y-6">
              <div className="border-b border-brand-sand/40 pb-3 flex items-center justify-between">
                <h3 className="font-forum text-xl sm:text-2xl text-brand-dark tracking-wide">
                  4. Investment & Stakeholders
                </h3>
                <span className="text-xs tracking-widest uppercase font-forum text-brand-muted">
                  Alignment
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block font-forum text-xs uppercase tracking-widest text-brand-dark mb-1">
                    Our wedding experiences range between ₹2 lakhs – ₹6 lakhs depending on coverage and exclusivity.
                  </label>
                  <p className="font-cormorant text-sm text-brand-muted italic mb-3">
                    Which bracket best matches your vision?
                  </p>
                  <div className="space-y-2">
                    {[
                      "₹2 – 3 Lakhs (Essentials Experience)",
                      "₹3 – 4 Lakhs (Signature Experience)",
                      "₹4 – 5 Lakhs (Signature Plus Experience)",
                      "₹5 Lakhs+ (Forever After Luxury Experience)",
                    ].map((bracket) => {
                      const isSel = formData.budgetBracket === bracket;
                      return (
                        <label
                          key={bracket}
                          className={`flex items-center gap-3 p-3.5 rounded-lg border cursor-pointer transition-all ${
                            isSel
                              ? "bg-[#f4efe8] border-brand-gold text-brand-dark font-medium"
                              : "bg-[#faf8f5] border-brand-sand/60 text-brand-muted hover:border-brand-dark"
                          }`}
                        >
                          <input
                            type="radio"
                            name="budgetBracket"
                            value={bracket}
                            checked={isSel}
                            onChange={(e) =>
                              setFormData({ ...formData, budgetBracket: e.target.value })
                            }
                            className="text-brand-dark focus:ring-brand-dark"
                          />
                          <span className="font-forum text-sm tracking-wide">{bracket}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block font-forum text-xs uppercase tracking-widest text-brand-dark mb-2">
                    Who else is involved in finalizing photography & film decisions?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {["Couple", "Parents", "Planner", "Others"].map((stakeholder) => {
                      const isSel = formData.decisionMaker === stakeholder;
                      return (
                        <button
                          type="button"
                          key={stakeholder}
                          onClick={() =>
                            setFormData({ ...formData, decisionMaker: stakeholder })
                          }
                          className={`py-3 px-4 rounded-lg font-forum text-xs uppercase tracking-wider transition-all border ${
                            isSel
                              ? "bg-brand-dark text-white border-brand-dark shadow-sm"
                              : "bg-[#faf8f5] text-brand-dark/80 border-brand-sand/60 hover:border-brand-dark"
                          }`}
                        >
                          {stakeholder}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-brand-sand/50 space-y-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-brand-dark text-white rounded-full font-forum text-sm tracking-widest uppercase hover:bg-black transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Submitting Your Vision...
                  </>
                ) : (
                  <>
                    Submit Intake & Request Proposal <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
              <p className="font-cormorant text-xs sm:text-sm text-brand-muted text-center italic">
                By submitting, your details will be synchronized directly to our studio production desk.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
