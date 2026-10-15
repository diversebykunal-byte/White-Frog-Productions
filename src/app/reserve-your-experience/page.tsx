import InquiryForm from "@/components/InquiryForm";
import Link from "next/link";

export default function ReservePage() {
  return (
    <div className="bg-white min-h-screen text-brand-dark pb-24">
      {/* 1. Header Banner */}
      <section className="max-w-4xl mx-auto px-6 sm:px-8 pt-12 sm:pt-20 pb-16 text-center space-y-4">
        <span className="text-xs tracking-[0.25em] text-brand-muted uppercase font-sans block">
          Let&rsquo;s tell your love story
        </span>
        <h1 className="font-forum text-4xl sm:text-6xl text-brand-dark tracking-wide uppercase">
          Reserve your Forever After Experience
        </h1>
        <div className="pt-2 flex items-center justify-center gap-6">
          <Link
            href="/faq"
            className="inline-block font-forum text-xs tracking-[0.25em] uppercase text-brand-dark/80 hover:text-brand-dark border-b border-brand-dark/40 pb-1 transition-colors"
          >
            Read the FAQ
          </Link>
          <span className="text-brand-sand">•</span>
          <Link
            href="/intake"
            className="inline-block font-forum text-xs tracking-[0.25em] uppercase text-brand-dark hover:text-brand-gold border-b border-brand-dark/40 pb-1 transition-colors font-medium"
          >
            Detailed Intake Form &amp; Quotation
          </Link>
        </div>
      </section>

      {/* 2. Contact Form with Photo */}
      <section className="max-w-[1350px] mx-auto px-6 sm:px-12 pb-16">
        <InquiryForm />
      </section>

      {/* 3. Direct Email Single Text */}
      <section className="max-w-4xl mx-auto px-6 sm:px-8 py-8 text-center border-t border-brand-sand/60">
        <h3 className="font-forum text-base sm:text-lg text-brand-dark tracking-widest uppercase">
          Email:{" "}
          <a href="mailto:kunal@whitefrogproductions.com" className="hover:underline lowercase">
            kunal@whitefrogproductions.com
          </a>{" "}
          &amp;{" "}
          <a href="mailto:MADHAVI@WHITEFROGPRODUCTIONS.COM" className="hover:underline lowercase">
            MADHAVI@WHITEFROGPRODUCTIONS.COM
          </a>
        </h3>
      </section>

      {/* 4. Bottom Multiple Text: Follow Along, Travel, See Our Work */}
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
            See Our Work
          </h3>
          <Link
            href="/gallery-of-emotions"
            className="inline-block font-forum text-sm tracking-widest uppercase text-brand-dark hover:underline"
          >
            View Portfolio
          </Link>
        </div>
      </section>
    </div>
  );
}
