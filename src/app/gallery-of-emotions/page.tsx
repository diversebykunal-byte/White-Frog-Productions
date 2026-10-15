"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PhotoLightbox from "@/components/PhotoLightbox";
import Theme5FramedHero from "@/components/Theme5FramedHero";
import { GALLERY_PHOTOS, STORIES } from "@/data/siteData";
import { cld } from "@/lib/cloudinary";

export default function GalleryOfEmotionsPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Combine fine-art photos
  const allStills = Array.from(
    new Set([
      ...GALLERY_PHOTOS,
      ...STORIES.flatMap((s) => s.photos || []),
    ])
  ).filter((img) => img && !img.includes("favicon"));

  return (
    <div className="bg-white min-h-screen text-brand-dark">
      {/* 0. Pixieset Theme-5 Framed Hero Header (10000% Match to Screenshot 2) */}
      <Theme5FramedHero
        title="Gallery of Emotions"
        subtitle="a collection of our work"
        image="https://images-pw.pixieset.com/elementfield/rLYl8D/DSCF0418-cf337b07-1500.JPEG"
        showContactLink={true}
      />

      {/* 1. Header matching Pixieset block-single-text exactly */}
      <section className="max-w-4xl mx-auto px-6 pt-12 sm:pt-20 pb-12 text-center space-y-3">
        <p className="text-[10px] sm:text-xs tracking-[0.35em] text-brand-muted uppercase font-sans">
          A FEW OF OUR FAVORITES
        </p>
        <h2 className="font-forum text-2xl sm:text-3xl md:text-4xl text-brand-dark tracking-wide font-normal leading-snug">
          Handcrafted, Luxury &amp; Contemporary Images from some of the weddings we love!
        </h2>
      </section>

      {/* 2. Masonry Photo Grid */}
      <section className="max-w-[1550px] mx-auto px-4 sm:px-8 lg:px-12 pb-20">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 sm:gap-8 space-y-6 sm:space-y-8">
          {allStills.map((photoUrl, idx) => (
            <div
              key={idx}
              onClick={() => setLightboxIndex(idx)}
              className="break-inside-avoid cursor-pointer overflow-hidden bg-brand-cream relative group shadow-sm hover:shadow-md transition-shadow"
            >
              <Image
                src={cld(photoUrl, 1200)}
                alt={`White Frog Wedding Still ${idx + 1}`}
                width={800}
                height={1000}
                unoptimized
                className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </section>

      {/* 3. Call To Action Banner: Working with us / The Experience (matching Pixieset block 3) */}
      <section className="relative w-full h-[65vh] overflow-hidden my-12">
        <Image
          src={cld("https://images-pw.pixieset.com/elementfield/0A6A4650copy-8f6d78d0-1500.jpg", 2000)}
          alt="The Experience"
          fill
          unoptimized
          className="object-cover object-center brightness-[0.7]"
        />
        <div className="absolute inset-0 bg-black/35 flex flex-col items-center justify-center text-center px-6 space-y-4 text-white">
          <span className="text-xs tracking-[0.3em] uppercase text-white/90 font-sans">
            Working with us
          </span>
          <h2 className="font-forum text-3xl sm:text-5xl md:text-6xl tracking-wide uppercase drop-shadow-sm">
            The Experience
          </h2>
          <div className="pt-4">
            <Link
              href="/experience"
              className="inline-block px-10 py-3.5 border border-white text-white hover:bg-white hover:text-brand-dark font-forum text-xs tracking-widest uppercase transition-all"
            >
              Learn more
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Follow Along & Travel (matching Pixieset block 5) */}
      <section className="max-w-5xl mx-auto px-6 sm:px-8 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 text-center md:text-left border-t border-brand-sand/60">
        <div className="space-y-3">
          <h4 className="font-forum text-2xl text-brand-dark tracking-wide">
            Follow Along
          </h4>
          <p className="font-cormorant text-lg text-brand-muted">
            Explore our latest reels, stills, and wedding previews.
          </p>
          <a
            href="https://www.instagram.com/whitefrogproductions"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-forum text-sm tracking-widest uppercase text-brand-dark hover:underline pt-2"
          >
            Instagram · @whitefrogproductions
          </a>
        </div>

        <div className="space-y-3">
          <h4 className="font-forum text-2xl text-brand-dark tracking-wide">
            Travel
          </h4>
          <p className="font-cormorant text-base text-brand-muted leading-relaxed">
            Available for hire Pan India and beyond. Previous travels include Hungary, Switzerland, Austria, France, Slovenia, Italy, Uzbekistan, Israel, Dubai, Thailand, and Malaysia.
          </p>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <PhotoLightbox
          photos={allStills}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNext={() => setLightboxIndex((prev) => ((prev ?? 0) + 1) % allStills.length)}
          onPrev={() => setLightboxIndex((prev) => ((prev ?? 0) - 1 + allStills.length) % allStills.length)}
        />
      )}
    </div>
  );
}
