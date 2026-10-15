import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Compass, Film, Heart, Home, Phone } from "lucide-react";
import { cld } from "@/lib/cloudinary";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#faf8f5] text-brand-dark flex flex-col justify-center items-center px-6 py-24 sm:py-32">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Subtle Brand Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-brand-sand/40 border border-brand-sand rounded-full">
          <Compass className="w-3.5 h-3.5 text-brand-gold" />
          <span className="text-[11px] font-forum tracking-[0.25em] uppercase text-brand-dark">
            404 · Uncharted Territory
          </span>
        </div>

        {/* Headline */}
        <div className="space-y-3">
          <h1 className="font-forum text-4xl sm:text-5xl md:text-6xl text-brand-dark tracking-wide leading-tight">
            This Chapter Has Yet to Be Written
          </h1>
          <p className="font-cormorant text-lg sm:text-xl text-brand-muted max-w-lg mx-auto italic leading-relaxed">
            The story or archival page you are seeking may have moved or gently shifted into memory. Allow us to guide you back to our curated collections.
          </p>
        </div>

        {/* Quick Discovery Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-left">
          <Link
            href="/"
            className="p-5 bg-white border border-brand-sand/70 rounded-xl hover:border-brand-dark/40 hover:shadow-md transition-all group flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-full bg-brand-cream flex items-center justify-center shrink-0 text-brand-gold group-hover:scale-110 transition-transform">
              <Home className="w-4 h-4" />
            </div>
            <div className="space-y-0.5">
              <h3 className="font-forum text-base text-brand-dark tracking-wide group-hover:text-brand-gold transition-colors">
                Return Home
              </h3>
              <p className="font-cormorant text-xs text-brand-muted">
                Begin at the beginning of our world.
              </p>
            </div>
          </Link>

          <Link
            href="/portfolio"
            className="p-5 bg-white border border-brand-sand/70 rounded-xl hover:border-brand-dark/40 hover:shadow-md transition-all group flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-full bg-brand-cream flex items-center justify-center shrink-0 text-brand-gold group-hover:scale-110 transition-transform">
              <Heart className="w-4 h-4" />
            </div>
            <div className="space-y-0.5">
              <h3 className="font-forum text-base text-brand-dark tracking-wide group-hover:text-brand-gold transition-colors">
                Portfolio
              </h3>
              <p className="font-cormorant text-xs text-brand-muted">
                Explore fine-art stills and unscripted rituals.
              </p>
            </div>
          </Link>

          <Link
            href="/films"
            className="p-5 bg-white border border-brand-sand/70 rounded-xl hover:border-brand-dark/40 hover:shadow-md transition-all group flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-full bg-brand-cream flex items-center justify-center shrink-0 text-brand-gold group-hover:scale-110 transition-transform">
              <Film className="w-4 h-4" />
            </div>
            <div className="space-y-0.5">
              <h3 className="font-forum text-base text-brand-dark tracking-wide group-hover:text-brand-gold transition-colors">
                Films
              </h3>
              <p className="font-cormorant text-xs text-brand-muted">
                Watch full wedding documentary films.
              </p>
            </div>
          </Link>

          <Link
            href="/blog"
            className="p-5 bg-white border border-brand-sand/70 rounded-xl hover:border-brand-dark/40 hover:shadow-md transition-all group flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-full bg-brand-cream flex items-center justify-center shrink-0 text-brand-gold group-hover:scale-110 transition-transform">
              <Compass className="w-4 h-4" />
            </div>
            <div className="space-y-0.5">
              <h3 className="font-forum text-base text-brand-dark tracking-wide group-hover:text-brand-gold transition-colors">
                The Journal & Guides
              </h3>
              <p className="font-cormorant text-xs text-brand-muted">
                Browse 900+ luxury destination wedding guides.
              </p>
            </div>
          </Link>
        </div>

        {/* Direct Contact Button */}
        <div className="pt-6">
          <Link
            href="/reserve-your-experience"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-dark text-white rounded-full font-forum text-xs tracking-widest uppercase hover:bg-black transition-colors"
          >
            <span>Reserve Your Experience</span>
            <ArrowRight className="w-3.5 h-3.5 text-brand-gold" />
          </Link>
        </div>
      </div>
    </div>
  );
}
