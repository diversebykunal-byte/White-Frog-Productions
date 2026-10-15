"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import VideoModal from "@/components/VideoModal";
import { FEATURE_FILMS } from "@/data/siteData";

export default function FeatureFilmsPage() {
  const [activeFilm, setActiveFilm] = useState<{ id: string; title: string } | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 sm:py-24 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs tracking-ultra uppercase text-brand-muted font-sans">
          Cinema Collection
        </span>
        <h1 className="font-forum text-4xl sm:text-6xl text-brand-dark tracking-wide">
          Feature Films
        </h1>
        <div className="w-16 h-[1px] bg-brand-sand mx-auto my-4" />
        <p className="font-cormorant text-xl text-brand-muted italic">
          Extended wedding documentary films capturing the rhythm, the vows, and the complete celebration experience.
        </p>
      </div>

      {/* Grid of All 29 Real YouTube Films */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-14">
        {FEATURE_FILMS.map((film, idx) => (
          <div
            key={idx}
            onClick={() =>
              setActiveFilm({ id: film.youtubeId, title: film.title })
            }
            className="group cursor-pointer space-y-4"
          >
            {/* 16:9 Cinema Card with Real YouTube Thumbnail */}
            <div className="editorial-card relative aspect-video bg-brand-cream overflow-hidden shadow-sm">
              <Image
                src={film.coverImage}
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

            {/* Film Title & Location */}
            <div className="text-center space-y-1">
              {film.location && (
                <span className="text-[11px] tracking-widest uppercase text-brand-muted font-sans block">
                  {film.location}
                </span>
              )}
              <h3 className="font-forum text-xl sm:text-2xl text-brand-dark tracking-wide group-hover:opacity-75 transition-opacity">
                {film.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Theater Player */}
      <VideoModal
        youtubeId={activeFilm?.id || null}
        title={activeFilm?.title}
        onClose={() => setActiveFilm(null)}
      />
    </div>
  );
}
