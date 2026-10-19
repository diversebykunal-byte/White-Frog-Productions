"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, MapPin, Sparkles, ArrowRight } from "lucide-react";
import VideoModal from "@/components/VideoModal";
import { PRE_WEDDING_FILMS, PreWeddingFilm } from "@/data/siteData";
import { cld } from "@/lib/cloudinary";

type CategoryFilter =
  | "All"
  | "Forts & Palaces"
  | "Mountain & Scenic"
  | "Coastal & Destination"
  | "Exotic & Landscapes"
  | "Creative Concepts"
  | "Cinematic Romance";

const CATEGORIES: CategoryFilter[] = [
  "All",
  "Forts & Palaces",
  "Mountain & Scenic",
  "Coastal & Destination",
  "Exotic & Landscapes",
  "Creative Concepts",
  "Cinematic Romance",
];

export default function PreWeddingsPage() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("All");
  const [activeFilm, setActiveFilm] = useState<{ id: string; title: string; poster?: string } | null>(null);

  const filteredFilms =
    activeFilter === "All"
      ? PRE_WEDDING_FILMS
      : PRE_WEDDING_FILMS.filter((f) => {
          if (activeFilter === "Cinematic Romance") {
            return f.category === "Cinematic Romance" || f.category === "Proposals & Love Stories" || f.category === "Save The Date";
          }
          return f.category === activeFilter;
        });

  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: PRE_WEDDING_FILMS.map((pw, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "VideoObject",
        name: `${pw.title} · Pre-Wedding Film at ${pw.location}`,
        description: `Cinematic pre-wedding film ${pw.title} shot at ${pw.location} by White Frog Productions.`,
        thumbnailUrl: [
          pw.coverImage,
          `https://i.ytimg.com/vi/${pw.youtubeId}/maxresdefault.jpg`,
          `https://i.ytimg.com/vi/${pw.youtubeId}/hqdefault.jpg`,
        ],
        uploadDate: "2024-01-01T08:00:00+05:30",
        contentUrl: `https://www.youtube.com/watch?v=${pw.youtubeId}`,
        embedUrl: `https://www.youtube.com/embed/${pw.youtubeId}`,
        duration: "PT3M00S",
        inLanguage: "en",
        publisher: {
          "@type": "Organization",
          name: "White Frog Productions",
          logo: {
            "@type": "ImageObject",
            url: "https://res.cloudinary.com/lyoxtgem/image/upload/v1792099306/whitefrog/brand/logo.png",
          },
        },
      },
    })),
  };

  return (
    <div className="bg-white min-h-screen text-brand-dark">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />
      {/* 1. Romantic Hero Banner */}
      <section className="relative w-full h-[55vh] sm:h-[65vh] md:h-[70vh] overflow-hidden bg-black">
        <Image
          src={cld("https://i.ytimg.com/vi/c1ba8_Y-ItQ/maxresdefault.jpg", 2000)}
          alt="White Frog Productions Pre-Wedding Films"
          fill
          unoptimized
          priority
          className="object-cover object-center brightness-[0.45] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/50 flex flex-col items-center justify-center text-center px-6 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white/90 text-xs tracking-[0.25em] uppercase font-sans">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>BESPOKE LOVE STORIES &amp; PROPOSALS</span>
          </div>
          <h1 className="font-forum text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-[0.18em] uppercase drop-shadow-lg">
            Pre-Wedding Cinema
          </h1>
          <p className="font-cormorant text-lg sm:text-2xl text-white/80 max-w-2xl mx-auto italic font-light">
            Before the celebrations begin — quiet intimacy, stolen glances, and grand cinematic poetry framed against India&rsquo;s most extraordinary landscapes.
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
          <span className="px-4 py-2 bg-brand-dark text-white rounded-full">
            Pre-Weddings (20)
          </span>
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

      {/* 3. Category Filter Tabs */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 pt-12 pb-4">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {CATEGORIES.map((cat) => {
            const count =
              cat === "All"
                ? PRE_WEDDING_FILMS.length
                : PRE_WEDDING_FILMS.filter((f) => {
                    if (cat === "Cinematic Romance") {
                      return f.category === "Cinematic Romance" || f.category === "Proposals & Love Stories" || f.category === "Save The Date";
                    }
                    return f.category === cat;
                  }).length;
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

      {/* 4. Grid of 20 Pre-Wedding Films */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12">
          {filteredFilms.map((film: PreWeddingFilm) => (
            <div
              key={film.id}
              onClick={() =>
                setActiveFilm({
                  id: film.youtubeId,
                  title: `${film.title} · ${film.location}`,
                  poster: cld(film.coverImage, 800),
                })
              }
              className="group cursor-pointer space-y-3.5"
            >
              {/* 16:9 Cinema Card */}
              <div className="editorial-card relative aspect-video bg-neutral-900 overflow-hidden shadow-sm rounded-sm">
                <Image
                  src={cld(film.coverImage, 800)}
                  alt={`${film.title} - ${film.location}`}
                  fill
                  unoptimized
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/35 group-hover:bg-black/55 transition-colors flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/95 text-brand-dark flex items-center justify-center pl-1 shadow-xl transform scale-90 group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-5 h-5 fill-brand-dark" />
                  </div>
                </div>

                {/* Subtitle Badge */}
                {film.subtitle && (
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/75 backdrop-blur-sm text-[10px] tracking-widest uppercase text-white/90 font-sans">
                    {film.subtitle}
                  </div>
                )}
              </div>

              {/* Title & Location */}
              <div className="space-y-1 text-center sm:text-left">
                <h3 className="font-forum text-xl text-brand-dark tracking-wide uppercase group-hover:text-brand-gold transition-colors">
                  {film.title}
                </h3>
                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-brand-muted font-sans">
                  <MapPin className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                  <span className="tracking-wider uppercase text-[11px]">{film.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Destination Pre-Wedding Shoot Consultation CTA */}
      <section className="bg-brand-cream/50 border-t border-brand-sand/60 py-16 sm:py-20 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="text-xs tracking-[0.3em] uppercase text-brand-muted font-sans block">
            DESTINATION PRE-WEDDINGS &amp; PROPOSALS
          </span>
          <h2 className="font-forum text-3xl sm:text-4xl md:text-5xl tracking-wide text-brand-dark">
            Every Love Story Deserves Its Own Canvas
          </h2>
          <p className="font-cormorant text-xl sm:text-2xl text-brand-muted italic max-w-2xl mx-auto leading-relaxed">
            From styling advice to location scouting across heritage palaces, sand dunes, and snowcapped peaks — we handle every nuance so you can be completely present in each other&rsquo;s company.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              href="/reserve-your-experience"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-dark text-white font-forum text-xs tracking-[0.25em] uppercase hover:bg-black transition-colors"
            >
              <span>Inquire for Pre-Wedding Dates</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. On-Site Video Modal */}
      <VideoModal
        youtubeId={activeFilm?.id}
        title={activeFilm?.title}
        poster={activeFilm?.poster}
        onClose={() => setActiveFilm(null)}
      />
    </div>
  );
}
