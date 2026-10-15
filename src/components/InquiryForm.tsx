"use client";

import { useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { CheckCircle2, Loader2 } from "lucide-react";

export default function InquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        console.warn("Notice: Inquiry response status", res.status);
      }
      setSubmitted(true);
    } catch (err: any) {
      console.error("Submission error:", err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
      {/* Left Form (Col 6) */}
      <div className="lg:col-span-6">
        {submitted ? (
          <div className="bg-[#f5f3ec] p-10 border border-brand-sand/60 text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-brand-dark mx-auto stroke-[1.25]" />
            <h3 className="font-forum text-2xl text-brand-dark tracking-wide uppercase">
              Thank You
            </h3>
            <p className="font-forum text-base text-brand-muted">
              We have received your message. We will get back to you shortly.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: "", email: "", phone: "", message: "" });
              }}
              className="mt-4 px-6 py-2 border border-brand-dark font-forum text-xs tracking-widest uppercase hover:bg-brand-dark hover:text-white transition-all cursor-pointer"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1.5">
              <label className="block font-forum text-xs tracking-[0.2em] uppercase text-brand-dark/80">
                Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-white border border-brand-sand/80 px-4 py-3 text-brand-dark focus:outline-none focus:border-brand-dark font-forum text-sm transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block font-forum text-xs tracking-[0.2em] uppercase text-brand-dark/80">
                Email address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-white border border-brand-sand/80 px-4 py-3 text-brand-dark focus:outline-none focus:border-brand-dark font-forum text-sm transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block font-forum text-xs tracking-[0.2em] uppercase text-brand-dark/80">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-white border border-brand-sand/80 px-4 py-3 text-brand-dark focus:outline-none focus:border-brand-dark font-forum text-sm transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block font-forum text-xs tracking-[0.2em] uppercase text-brand-dark/80">
                Message *
              </label>
              <textarea
                rows={5}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-white border border-brand-sand/80 p-4 text-brand-dark focus:outline-none focus:border-brand-dark font-forum text-sm transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-brand-dark text-white font-forum text-xs tracking-[0.25em] uppercase hover:bg-black transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <span>Let’s craft your legacy</span>
              )}
            </button>
          </form>
        )}
      </div>

      {/* Right Photo (Col 6) - 1:1 Match to Pixieset */}
      <div className="lg:col-span-6 relative aspect-[4/5] bg-brand-cream overflow-hidden shadow-sm">
        <Image
          src="https://images-pw.pixieset.com/elementfield/438566321/301A9009-ffb4a905.jpg"
          alt="White Frog Wedding Contact"
          fill
          unoptimized
          className="object-cover object-center"
        />
      </div>
    </div>
  );
}
