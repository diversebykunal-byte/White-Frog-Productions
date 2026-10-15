"use client";

import { useState } from "react";
import Image from "next/image";
import PhotoLightbox from "@/components/PhotoLightbox";
import { GALLERY_PHOTOS, STORIES } from "@/data/siteData";

export default function GalleryOfEmotionsPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Combine gallery photos and story photos
  const allStills = Array.from(
    new Set([
      ...GALLERY_PHOTOS,
      ...STORIES.flatMap((s) => s.photos || []),
    ])
  ).filter((img) => img && !img.includes("favicon"));

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 sm:py-24 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs tracking-ultra uppercase text-brand-muted font-sans">
          Still Photography
        </span>
        <h1 className="font-forum text-4xl sm:text-6xl text-brand-dark tracking-wide">
          Gallery of Emotions
        </h1>
        <div className="w-16 h-[1px] bg-brand-sand mx-auto my-4" />
        <p className="font-cormorant text-xl text-brand-muted italic">
          Unscripted, timeless moments frozen in fine-art composition. Click any photograph to view in high definition.
        </p>
      </div>

      {/* Masonry-Style Responsive Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {allStills.map((photoUrl, idx) => (
          <div
            key={idx}
            onClick={() => setLightboxIndex(idx)}
            className="editorial-card break-inside-avoid cursor-pointer overflow-hidden bg-brand-cream relative group"
          >
            <div className="relative w-full aspect-[4/5]">
              <Image
                src={photoUrl}
                alt={`Fine-art wedding still ${idx + 1}`}
                fill
                unoptimized
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="px-4 py-2 bg-white/90 text-brand-dark font-forum text-xs tracking-widest uppercase">
                View Large
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Photo Lightbox */}
      <PhotoLightbox
        photos={allStills}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNext={() =>
          setLightboxIndex((prev) =>
            prev !== null ? (prev + 1) % allStills.length : null
          )
        }
        onPrev={() =>
          setLightboxIndex((prev) =>
            prev !== null
              ? (prev - 1 + allStills.length) % allStills.length
              : null
          )
        }
      />
    </div>
  );
}
