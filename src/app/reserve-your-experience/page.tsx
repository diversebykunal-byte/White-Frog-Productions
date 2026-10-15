import Image from "next/image";
import Link from "next/link";
import InquiryForm from "@/components/InquiryForm";

export default function ReservePage() {
  return (
    <div className="bg-white min-h-screen text-brand-dark pb-24">
      {/* 1. Pixieset Hero Banner (block-call-to-action-banner) */}
      <section className="relative w-full h-[55vh] sm:h-[65vh] overflow-hidden bg-brand-cream mb-16">
        <Image
          src="https://images-pw.pixieset.com/elementfield/587566321/5G4A2096-40f47ed3.jpg"
          alt="Reserve your Forever After Experience"
          fill
          unoptimized
          priority
          className="object-cover object-center brightness-[0.7]"
        />
        <div className="absolute inset-0 bg-black/35 flex flex-col items-center justify-center text-center px-6 space-y-4 text-white">
          <span className="text-xs sm:text-sm tracking-[0.35em] text-white/90 uppercase font-sans">
            Let&rsquo;s tell your love story
          </span>
          <h1 className="font-forum text-3xl sm:text-5xl md:text-6xl text-white tracking-[0.15em] uppercase drop-shadow-md">
            Reserve your Forever After Experience
          </h1>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/faq"
              className="inline-block px-8 py-3 border border-white text-white hover:bg-white hover:text-brand-dark font-forum text-xs tracking-widest uppercase transition-all backdrop-blur-sm"
            >
              Read the FAQ
            </Link>
            <Link
              href="/intake"
              className="inline-block px-8 py-3 bg-white text-brand-dark hover:bg-brand-cream font-forum text-xs tracking-widest uppercase transition-all font-medium shadow-md"
            >
              Detailed Intake Form
            </Link>
          </div>
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
            href="/portfolio"
            className="inline-block font-forum text-sm tracking-widest uppercase text-brand-dark hover:underline"
          >
            View Portfolio
          </Link>
        </div>
      </section>
    </div>
  );
}
