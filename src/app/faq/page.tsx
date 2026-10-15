"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { FAQS } from "@/data/siteData";

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="relative bg-white min-h-screen text-brand-dark pb-24">
      {/* 1. Framed Hero Header (Exact 1:1 match to Pixieset Block 0) */}
      <section className="relative px-4 sm:px-12 md:px-16 lg:px-24 pt-2 pb-6 max-w-[1550px] mx-auto select-none">
        {/* Left Vertical Subtitle (Positioned absolute to hero section, scrolls with hero) */}
        <div className="hidden lg:block absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 z-20 select-none pointer-events-none">
          <span
            className="text-[10px] tracking-[0.35em] text-brand-muted/70 uppercase font-sans whitespace-nowrap block"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            PREPARING FOR YOUR BIG DAY
          </span>
        </div>

        {/* Right Vertical "CONTACT US" Link (Exact match to Pixieset Theme-5) */}
        <div className="hidden lg:block absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 z-20">
          <Link
            href="/reserve-your-experience"
            className="text-[10px] tracking-[0.35em] text-brand-muted/70 hover:text-brand-dark uppercase font-sans whitespace-nowrap block transition-colors"
            style={{ writingMode: "vertical-rl" }}
          >
            CONTACT US
          </Link>
        </div>

        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/11] max-h-[82vh] overflow-hidden bg-brand-cream shadow-sm">
          <Image
            src="https://images-pw.pixieset.com/elementfield/501666321/WFP-19-d14aa76f.jpg"
            alt="FAQ - White Frog Productions"
            fill
            priority
            unoptimized
            className="object-cover object-center"
          />
          {/* Subtle darkened vignette for contrast */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Centered Editorial Title Overlay */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 space-y-4">
            <h1 className="font-forum text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-[0.18em] leading-tight uppercase drop-shadow-md">
              FAQ
            </h1>
            <div className="pt-2">
              <Link
                href="/reserve-your-experience"
                className="inline-block font-forum text-xs tracking-[0.25em] uppercase text-white/90 hover:text-white border-b border-white/60 pb-1 transition-colors"
              >
                contact us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Heading: The FAQ */}
      <section className="max-w-4xl mx-auto px-6 sm:px-8 pt-16 pb-8 text-center space-y-2">
        <h2 className="font-forum text-3xl sm:text-4xl text-brand-dark tracking-wide uppercase">
          The FAQ
        </h2>
      </section>

      {/* 3. FAQ Accordion (Word by Word from Pixieset) */}
      <section className="max-w-4xl mx-auto px-6 sm:px-8 space-y-4">
        {FAQS.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="border border-brand-sand/70 bg-white transition-colors"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full py-6 px-6 sm:px-8 flex items-center justify-between text-left group cursor-pointer"
              >
                <span className="font-forum text-xl sm:text-2xl text-brand-dark tracking-wide group-hover:opacity-75 transition-opacity">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-brand-dark/70 transition-transform duration-300 shrink-0 ml-4 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-6 sm:px-8 pb-6 pt-1 border-t border-brand-sand/40">
                  <p className="font-forum text-lg sm:text-xl text-brand-muted leading-relaxed whitespace-pre-line font-normal">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </section>

      {/* 4. Call-to-action Banner: More Questions? */}
      <section className="max-w-4xl mx-auto px-6 sm:px-8 pt-20 pb-12 text-center space-y-4">
        <span className="text-xs tracking-[0.25em] text-brand-muted uppercase font-sans block">
          We&rsquo;d love to hear from you
        </span>
        <h2 className="font-forum text-3xl sm:text-5xl text-brand-dark tracking-wide uppercase">
          More Questions?
        </h2>
        <div className="pt-4">
          <Link
            href="/reserve-your-experience"
            className="inline-block px-10 py-4 bg-brand-dark text-white font-forum text-xs tracking-[0.25em] uppercase hover:bg-black transition-colors"
          >
            Get in touch
          </Link>
        </div>
      </section>

      {/* 5. Follow Along, Travel, Contact Us Columns */}
      <section className="max-w-5xl mx-auto px-6 sm:px-8 py-16 grid grid-cols-1 md:grid-cols-3 gap-10 text-center border-t border-brand-sand/60">
        <div className="space-y-3">
          <h3 className="font-forum text-2xl text-brand-dark tracking-wide uppercase">
            Follow Along
          </h3>
          <a
            href="https://www.instagram.com/whitefrogproductions"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-forum text-sm tracking-widest uppercase text-brand-dark hover:underline"
          >
            Instagram
          </a>
        </div>

        <div className="space-y-3">
          <h3 className="font-forum text-2xl text-brand-dark tracking-wide uppercase">
            Travel
          </h3>
          <p className="font-forum text-sm text-brand-muted leading-relaxed">
            Available for hire Pan India and beyond.
            <br />
            Previous travels include France, Italy, Uzbekistan, Israel, Dubai, Thailand &amp; Malaysia. Contact us for an overseas quote.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="font-forum text-2xl text-brand-dark tracking-wide uppercase">
            Contact Us
          </h3>
          <a
            href="mailto:kunal@whitefrogproductions.com"
            className="inline-block font-forum text-sm text-brand-dark hover:underline"
          >
            kunal@whitefrogproductions.com
          </a>
        </div>
      </section>
    </div>
  );
}
