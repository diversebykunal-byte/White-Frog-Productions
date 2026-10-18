"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Tv, ArrowRight, CheckCircle2, Mail, Phone, Award } from "lucide-react";
import VideoModal from "@/components/VideoModal";
import { MEDIA_FEATURES } from "@/data/siteData";
import { cld } from "@/lib/cloudinary";

export default function InMediaPage() {
  const [activeVideo, setActiveVideo] = useState<{ id: string; title: string; poster?: string } | null>(null);

  const feature = MEDIA_FEATURES[0];

  return (
    <div className="bg-white min-h-screen text-brand-dark">
      {/* 1. Broadcast Hero Banner */}
      <section className="relative w-full h-[50vh] sm:h-[60vh] md:h-[65vh] overflow-hidden bg-black">
        <Image
          src={cld(feature.coverImage, 2000)}
          alt="White Frog Productions featured on WION TV"
          fill
          unoptimized
          priority
          className="object-cover object-center brightness-[0.4] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60 flex flex-col items-center justify-center text-center px-6 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white/90 text-xs tracking-[0.25em] uppercase font-sans">
            <Tv className="w-3.5 h-3.5 text-brand-gold" />
            <span>NATIONAL &amp; GLOBAL BROADCASTS</span>
          </div>
          <h1 className="font-forum text-3xl sm:text-5xl md:text-6xl text-white tracking-[0.18em] uppercase drop-shadow-lg">
            In Media &amp; Press
          </h1>
          <p className="font-cormorant text-lg sm:text-2xl text-white/80 max-w-2xl mx-auto italic font-light">
            Insights on digital cinema, cutting-edge gear, and emotional storytelling featured across international television networks.
          </p>
        </div>
      </section>

      {/* 2. Top Cross-Navigation Hub */}
      <section className="border-b border-brand-sand/60 bg-brand-cream/30 py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-forum tracking-widest uppercase">
          <Link
            href="/films"
            className="px-4 py-2 text-brand-muted hover:text-brand-dark transition-colors"
          >
            Wedding Films (29)
          </Link>
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
          <span className="px-4 py-2 bg-brand-dark text-white rounded-full">
            In Media &amp; Press
          </span>
        </div>
      </section>

      {/* 3. Featured Broadcast Feature Spotlight: WION TV */}
      <section className="max-w-6xl mx-auto px-6 sm:px-12 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Video Player Card (Col 7) */}
          <div
            onClick={() =>
              setActiveVideo({
                id: feature.youtubeId,
                title: feature.title,
                poster: cld(feature.coverImage, 1000),
              })
            }
            className="lg:col-span-7 group cursor-pointer"
          >
            <div className="editorial-card relative aspect-video bg-neutral-900 overflow-hidden rounded-sm shadow-xl">
              <Image
                src={cld(feature.coverImage, 1000)}
                alt={feature.title}
                fill
                unoptimized
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/35 group-hover:bg-black/55 transition-colors flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/95 text-brand-dark flex items-center justify-center pl-1 shadow-2xl transform scale-90 group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-6 h-6 fill-brand-dark" />
                </div>
              </div>

              {/* Broadcast Channel Badge */}
              <div className="absolute top-4 left-4 px-3 py-1.5 rounded bg-black/80 backdrop-blur-md text-xs tracking-widest uppercase text-white font-sans flex items-center gap-2">
                <Tv className="w-3.5 h-3.5 text-brand-gold" />
                <span>WION TV · GLOBAL NEWS</span>
              </div>
            </div>
            <p className="text-center sm:text-left text-xs tracking-widest text-brand-muted mt-3 font-sans uppercase">
              Click to watch the full television broadcast (1080p HD)
            </p>
          </div>

          {/* Details & Quote Column (Col 5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs tracking-[0.25em] text-brand-gold uppercase font-sans font-medium block">
                {feature.show}
              </span>
              <h2 className="font-forum text-2xl sm:text-3xl text-brand-dark tracking-wide leading-snug">
                Digital Filmmaking &amp; The Evolution of Wedding Cinema
              </h2>
              <p className="text-sm text-brand-muted font-sans">
                Featuring <span className="text-brand-dark font-medium">{feature.featuredPerson}</span>
              </p>
            </div>

            <p className="font-cormorant text-xl text-brand-dark/85 italic leading-relaxed">
              &ldquo;{feature.quote}&rdquo;
            </p>

            <p className="font-sans text-sm text-brand-muted leading-relaxed">
              {feature.description}
            </p>

            <div className="space-y-2.5 pt-2">
              <div className="flex items-start gap-2.5 text-xs text-brand-dark/90 font-sans">
                <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <span>The shift toward cinema-grade sensor cameras in unscripted celebrations</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-brand-dark/90 font-sans">
                <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <span>Aerial drone perspectives and non-intrusive lens choices for real emotion</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-brand-dark/90 font-sans">
                <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <span>Color grading workflows ensuring heirloom preservation for decades</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Press & Editorial Desk */}
      <section className="bg-brand-cream/50 border-t border-brand-sand/60 py-16 sm:py-20 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-sand/50 text-[11px] tracking-widest uppercase font-sans text-brand-dark">
            <Award className="w-3.5 h-3.5 text-brand-gold" />
            <span>MEDIA INQUIRIES &amp; PRESS PASSES</span>
          </div>
          <h2 className="font-forum text-3xl sm:text-4xl tracking-wide text-brand-dark">
            Press &amp; Editorial Inquiries
          </h2>
          <p className="font-cormorant text-xl sm:text-2xl text-brand-muted italic max-w-2xl mx-auto leading-relaxed">
            For media interviews, podcast features, speaker engagements at filmmaking conferences, or high-resolution editorial assets, connect directly with our studio founders.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-6 text-sm font-sans">
            <a
              href="mailto:kunal@whitefrogproductions.com?subject=Press%20Inquiry%20-%20White%20Frog%20Productions"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-dark text-white rounded-none hover:bg-black transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>kunal@whitefrogproductions.com</span>
            </a>
            <a
              href="tel:+919899263434"
              className="inline-flex items-center gap-2 px-6 py-3 border border-brand-dark/30 hover:border-brand-dark transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>+91 98992 63434</span>
            </a>
          </div>
        </div>
      </section>

      {/* 5. On-Site Video Modal */}
      <VideoModal
        youtubeId={activeVideo?.id}
        title={activeVideo?.title}
        poster={activeVideo?.poster}
        onClose={() => setActiveVideo(null)}
      />
    </div>
  );
}
