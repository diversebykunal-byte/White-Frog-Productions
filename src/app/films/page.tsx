"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import VideoModal from "@/components/VideoModal";
import { FEATURE_FILMS } from "@/data/siteData";
import { cld } from "@/lib/cloudinary";

export default function FilmsPage() {
  const [activeFilm, setActiveFilm] = useState<{ id: string; title: string; poster?: string } | null>(null);

  return (
    <div className="bg-white min-h-screen text-brand-dark">
      {/* 1. Pixieset Hero Banner (block-call-to-action-banner) */}
      <section className="relative w-full h-[55vh] sm:h-[65vh] md:h-[70vh] overflow-hidden bg-brand-cream">
        <Image
          src={cld("https://images-pw.pixieset.com/elementfield/012620381/1H3A9414-2bb1136a.jpeg", 2000)}
          alt="Films"
          fill
          unoptimized
          priority
          className="object-cover object-center brightness-[0.7]"
        />
        <div className="absolute inset-0 bg-black/35 flex items-center justify-center text-center px-6">
          <h1 className="font-forum text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-[0.2em] uppercase drop-shadow-md">
            Films
          </h1>
        </div>
      </section>

      {/* Top Cross-Navigation Hub */}
      <section className="border-b border-brand-sand/60 bg-brand-cream/30 py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-forum tracking-widest uppercase">
          <span className="px-4 py-2 bg-brand-dark text-white rounded-full">
            Wedding Films (29)
          </span>
          <span className="text-brand-sand">|</span>
          <Link
            href="/pre-weddings"
            className="px-4 py-2 text-brand-muted hover:text-brand-dark transition-colors"
          >
            Pre-Weddings (20)
          </Link>
          <span className="text-brand-sand">|</span>
          <Link
            href="/music-videos"
            className="px-4 py-2 text-brand-muted hover:text-brand-dark transition-colors"
          >
            Music Videos (14)
          </Link>
          <span className="text-brand-sand">|</span>
          <Link
            href="/in-media"
            className="px-4 py-2 text-brand-muted hover:text-brand-dark transition-colors"
          >
            In Media &amp; Press
          </Link>
        </div>
      </section>

      {/* 2. Grid of All 29 Real YouTube Films */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-14">
          {FEATURE_FILMS.map((film, idx) => (
            <div
              key={idx}
              onClick={() =>
                setActiveFilm({
                  id: film.youtubeId,
                  title: film.title,
                  poster: cld(film.coverImage, 800),
                })
              }
              className="group cursor-pointer space-y-4"
            >
              {/* 16:9 Cinema Card with Real YouTube Thumbnail */}
              <div className="editorial-card relative aspect-video bg-brand-cream overflow-hidden shadow-sm">
                <Image
                  src={cld(film.coverImage, 800)}
                  alt={film.title}
                  fill
                  unoptimized
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/45 transition-colors flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/95 text-brand-dark flex items-center justify-center pl-1 shadow-xl transform scale-90 group-hover:scale-105 transition-transform duration-300">
                    <Play className="w-5 h-5 fill-brand-dark" />
                  </div>
                </div>
              </div>

              {/* Film Title & Location (matching Pixieset uppercase tracking) */}
              <div className="text-center space-y-1">
                <h3 className="font-forum text-xl sm:text-2xl text-brand-dark tracking-wide uppercase group-hover:opacity-75 transition-opacity">
                  {film.title}
                </h3>
                {film.location && (
                  <span className="text-[11px] tracking-[0.25em] uppercase text-brand-muted font-sans block">
                    {film.location}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Pixieset Bottom 2-Column Links: About Us / Contact */}
      <section className="max-w-4xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-8 text-center border-t border-brand-sand/50">
        <Link
          href="/about"
          className="p-10 border border-brand-sand/60 hover:border-brand-dark/30 hover:bg-brand-cream/30 transition-all group"
        >
          <span className="text-[11px] tracking-widest uppercase text-brand-muted font-sans block mb-2">
            About Us
          </span>
          <h3 className="font-forum text-2xl text-brand-dark tracking-wide group-hover:text-brand-gold transition-colors">
            Get to know us
          </h3>
        </Link>

        <Link
          href="/reserve-your-experience"
          className="p-10 border border-brand-sand/60 hover:border-brand-dark/30 hover:bg-brand-cream/30 transition-all group"
        >
          <span className="text-[11px] tracking-widest uppercase text-brand-muted font-sans block mb-2">
            Contact
          </span>
          <h3 className="font-forum text-2xl text-brand-dark tracking-wide group-hover:text-brand-gold transition-colors">
            get in touch with us
          </h3>
        </Link>
      </section>

      {/* Video Modal Player with zero-flicker exit-safe retention */}
      <VideoModal
        youtubeId={activeFilm?.id || null}
        title={activeFilm?.title}
        poster={activeFilm?.poster}
        onClose={() => setActiveFilm(null)}
      />
    </div>
  );
}
