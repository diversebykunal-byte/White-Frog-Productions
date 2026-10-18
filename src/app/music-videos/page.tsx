"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Disc3, ArrowRight } from "lucide-react";
import VideoModal from "@/components/VideoModal";
import { MUSIC_VIDEOS, MusicVideo } from "@/data/siteData";
import { cld } from "@/lib/cloudinary";

type CategoryFilter = "All" | "Punjabi Hits" | "Indie & Bands" | "Mainstream & Hip-Hop" | "Teasers & Promos";

const CATEGORIES: CategoryFilter[] = [
  "All",
  "Indie & Bands",
  "Punjabi Hits",
  "Mainstream & Hip-Hop",
  "Teasers & Promos",
];

export default function MusicVideosPage() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("All");
  const [activeVideo, setActiveVideo] = useState<{ id: string; title: string; poster?: string } | null>(null);

  const filteredVideos =
    activeFilter === "All"
      ? MUSIC_VIDEOS
      : MUSIC_VIDEOS.filter((v) => v.category === activeFilter);

  return (
    <div className="bg-white min-h-screen text-brand-dark">
      {/* 1. Cinema Hero Banner */}
      <section className="relative w-full h-[55vh] sm:h-[65vh] md:h-[70vh] overflow-hidden bg-black">
        <Image
          src={cld("https://i.ytimg.com/vi/fLZFLP5y4cQ/maxresdefault.jpg", 2000)}
          alt="White Frog Productions Music Videos"
          fill
          unoptimized
          priority
          className="object-cover object-center brightness-[0.45] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/50 flex flex-col items-center justify-center text-center px-6 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white/90 text-xs tracking-[0.25em] uppercase font-sans">
            <Disc3 className="w-3.5 h-3.5 animate-spin text-brand-gold" />
            <span>ORIGINAL DIRECTORIAL PRODUCTIONS</span>
          </div>
          <h1 className="font-forum text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-[0.18em] uppercase drop-shadow-lg">
            Music Videos
          </h1>
          <p className="font-cormorant text-lg sm:text-2xl text-white/80 max-w-2xl mx-auto italic font-light">
            Visual storytelling crafted for leading labels &amp; independent artists — Sony Music India, SagaHits, Moviebox, Swastik The Band, and beyond.
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
          <span className="px-4 py-2 bg-brand-dark text-white rounded-full">
            Music Videos (14)
          </span>
          <span className="text-brand-sand">|</span>
          <Link
            href="/in-media"
            className="px-4 py-2 text-brand-muted hover:text-brand-dark transition-colors"
          >
            In Media &amp; Press
          </Link>
        </div>
      </section>

      {/* 3. Category Filter Tabs */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 pt-12 pb-4">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {CATEGORIES.map((cat) => {
            const count =
              cat === "All"
                ? MUSIC_VIDEOS.length
                : MUSIC_VIDEOS.filter((v) => v.category === cat).length;
            const isActive = activeFilter === cat;

            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 sm:px-5 py-2 rounded-full font-forum text-xs sm:text-sm tracking-wider uppercase transition-all cursor-pointer ${
                  isActive
                    ? "bg-brand-dark text-white shadow-sm"
                    : "bg-brand-sand/30 text-brand-dark/80 hover:bg-brand-sand/60"
                }`}
              >
                {cat} <span className="opacity-60 text-xs ml-1">({count})</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. Grid of 14 Music Videos */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12">
          {filteredVideos.map((video: MusicVideo) => (
            <div
              key={video.id}
              onClick={() =>
                setActiveVideo({
                  id: video.youtubeId,
                  title: `${video.title} - ${video.artist}`,
                  poster: cld(video.coverImage, 800),
                })
              }
              className="group cursor-pointer space-y-3.5"
            >
              {/* 16:9 Cinema Card */}
              <div className="editorial-card relative aspect-video bg-neutral-900 overflow-hidden shadow-sm rounded-sm">
                <Image
                  src={cld(video.coverImage, 800)}
                  alt={`${video.title} by ${video.artist}`}
                  fill
                  unoptimized
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/35 group-hover:bg-black/55 transition-colors flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/95 text-brand-dark flex items-center justify-center pl-1 shadow-xl transform scale-90 group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-5 h-5 fill-brand-dark" />
                  </div>
                </div>

                {/* Record Label / Badge Overlay */}
                {video.label && (
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded bg-black/75 backdrop-blur-sm text-[10px] tracking-widest uppercase text-white/90 font-sans">
                    {video.label}
                  </div>
                )}
              </div>

              {/* Title & Artist */}
              <div className="space-y-1 text-center sm:text-left">
                <h3 className="font-forum text-xl text-brand-dark tracking-wide group-hover:text-brand-gold transition-colors">
                  {video.title}
                </h3>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs text-brand-muted font-sans">
                  <span className="font-medium text-brand-dark/80">{video.artist}</span>
                  <span>•</span>
                  <span className="tracking-wider uppercase text-[11px] text-brand-muted/80">{video.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Production Inquiry & Directorial Commission */}
      <section className="bg-brand-cream/50 border-t border-brand-sand/60 py-16 sm:py-20 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="text-xs tracking-[0.3em] uppercase text-brand-muted font-sans block">
            MUSIC VIDEO COMMISSIONING &amp; DIRECTION
          </span>
          <h2 className="font-forum text-3xl sm:text-4xl md:text-5xl tracking-wide text-brand-dark">
            Bring Your Musical Vision to the Screen
          </h2>
          <p className="font-cormorant text-xl sm:text-2xl text-brand-muted italic max-w-2xl mx-auto leading-relaxed">
            Whether you are an independent artist releasing a debut single or an established record label seeking cinema-grade visuals and post-production, let&rsquo;s create something iconic together.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              href="/reserve-your-experience"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-dark text-white font-forum text-xs tracking-[0.25em] uppercase hover:bg-black transition-colors"
            >
              <span>Collaborate With Us</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. On-Site Video Modal */}
      <VideoModal
        youtubeId={activeVideo?.id}
        title={activeVideo?.title}
        poster={activeVideo?.poster}
        onClose={() => setActiveVideo(null)}
      />
    </div>
  );
}
