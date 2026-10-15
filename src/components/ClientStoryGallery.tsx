"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cld } from "@/lib/cloudinary";
import PhotoLightbox from "@/components/PhotoLightbox";

interface StoryProps {
  couple: string;
  location: string;
  coverImage: string;
  photos: string[];
}

export default function ClientStoryGallery({
  couple,
  location,
  coverImage,
  photos,
}: StoryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const allPhotos = photos && photos.length > 0 ? photos : [coverImage];

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Hero Cover Banner matching Pixieset block-call-to-action-banner */}
      <section className="relative w-full h-[65vh] sm:h-[75vh] md:h-[82vh] max-h-[850px] overflow-hidden bg-brand-cream">
        <Image
          src={cld(coverImage, 2000)}
          alt={couple}
          fill
          unoptimized
          priority
          className="object-cover object-center brightness-[0.7]"
        />
        <div className="absolute inset-0 bg-black/35 flex flex-col items-center justify-center text-center px-6 space-y-4">
          <span className="text-xs sm:text-sm tracking-[0.35em] uppercase text-white/90 font-sans">
            {location}
          </span>
          <h1 className="font-forum text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-[0.15em] uppercase drop-shadow-md">
            {couple}
          </h1>
        </div>
      </section>

      {/* Spacer */}
      <div className="h-12 sm:h-20" />

      {/* 2. Photo Grid matching Pixieset block-photo-grid */}
      <section className="max-w-[1550px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 sm:gap-8 space-y-6 sm:space-y-8">
          {allPhotos.map((photo, idx) => (
            <div
              key={idx}
              onClick={() => setLightboxIndex(idx)}
              className="relative overflow-hidden cursor-pointer group bg-brand-cream/50 break-inside-avoid shadow-sm hover:shadow-md transition-shadow"
            >
              <Image
                src={cld(photo, 1200)}
                alt={`${couple} photo ${idx + 1}`}
                width={800}
                height={1000}
                unoptimized
                className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </section>

      {/* Spacer */}
      <div className="h-16 sm:h-24" />

      {/* 3. Button: MORE FROM THE JOURNAL */}
      <div className="text-center">
        <Link
          href="/cinematic-heirlooms"
          className="inline-block px-8 py-3.5 border border-brand-dark/40 font-forum text-xs tracking-widest uppercase text-brand-dark hover:bg-brand-dark hover:text-white transition-all"
        >
          MORE FROM THE JOURNAL
        </Link>
      </div>

      {/* Spacer */}
      <div className="h-16 sm:h-24" />

      {/* 4. Two Feature Cards matching Pixieset block-feature-links-text */}
      <section className="max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
        <Link
          href="/gallery-of-emotions"
          className="p-10 border border-brand-sand/60 hover:border-brand-dark/30 hover:bg-brand-cream/30 transition-all group"
        >
          <span className="text-[11px] tracking-widest uppercase text-brand-muted font-sans block mb-2">
            Portfolio
          </span>
          <h3 className="font-forum text-2xl text-brand-dark tracking-wide group-hover:text-brand-gold transition-colors">
            Check out our work
          </h3>
        </Link>

        <Link
          href="/cinematic-heirlooms"
          className="p-10 border border-brand-sand/60 hover:border-brand-dark/30 hover:bg-brand-cream/30 transition-all group"
        >
          <span className="text-[11px] tracking-widest uppercase text-brand-muted font-sans block mb-2">
            Love Stories
          </span>
          <h3 className="font-forum text-2xl text-brand-dark tracking-wide group-hover:text-brand-gold transition-colors uppercase">
            YOUR STORIES, BY US!
          </h3>
        </Link>
      </section>

      {/* Spacer */}
      <div className="h-20 sm:h-28" />

      {/* 5. Single Text & Contact CTA */}
      <section className="max-w-2xl mx-auto px-6 text-center space-y-6">
        <div className="space-y-1 font-forum text-2xl sm:text-3xl text-brand-dark tracking-wide">
          <h3>Want to work together? Just Get in touch</h3>
          <h3>and lets start the adventure!</h3>
        </div>
        <div className="pt-2">
          <Link
            href="/reserve-your-experience"
            className="inline-block px-10 py-4 bg-brand-dark text-white font-forum text-xs tracking-widest uppercase hover:bg-black transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>

      {/* Spacer */}
      <div className="h-24 sm:h-32" />

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <PhotoLightbox
          photos={allPhotos}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNext={() => setLightboxIndex((prev) => ((prev ?? 0) + 1) % allPhotos.length)}
          onPrev={() => setLightboxIndex((prev) => ((prev ?? 0) - 1 + allPhotos.length) % allPhotos.length)}
        />
      )}
    </div>
  );
}
