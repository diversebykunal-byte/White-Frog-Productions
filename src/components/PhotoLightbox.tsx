"use client";

import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cld } from "@/lib/cloudinary";

interface PhotoLightboxProps {
  photos: string[];
  currentIndex: number | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function PhotoLightbox({
  photos,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: PhotoLightboxProps) {
  const [highResLoaded, setHighResLoaded] = useState(false);
  // Retain active photo & index during exit animation to prevent closing cut/flicker
  const [activePhoto, setActivePhoto] = useState<string | null>(null);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  // Mobile Touch Swipe Handling
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Sync active photo data whenever currentIndex changes
  useEffect(() => {
    if (currentIndex !== null && photos[currentIndex]) {
      setActivePhoto(photos[currentIndex]);
      setActiveIdx(currentIndex);
      setHighResLoaded(false);

      // Preload adjacent images in browser cache
      const nextIdx = (currentIndex + 1) % photos.length;
      const prevIdx = (currentIndex - 1 + photos.length) % photos.length;

      const imgNext = new window.Image();
      imgNext.src = cld(photos[nextIdx], 1600);

      const imgPrev = new window.Image();
      imgPrev.src = cld(photos[prevIdx], 1600);
    }
  }, [currentIndex, photos]);

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };

    if (currentIndex !== null) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex, onClose, onNext, onPrev]);

  // Touch Swipe Handlers for mobile gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) {
      onNext();
    } else if (isRightSwipe) {
      onPrev();
    }
  };

  const currentPhoto = currentIndex !== null && photos[currentIndex] ? photos[currentIndex] : activePhoto;
  const currentIdx = currentIndex !== null ? currentIndex : activeIdx;

  if (!currentPhoto || currentIdx === null) return null;

  // Instant cached URL (matches the masonry grid cache at 1200px)
  const cachedThumbnailUrl = cld(currentPhoto, 1200);
  // Crisp ultra-res URL for lightbox (1800px)
  const highResUrl = cld(currentPhoto, 1800);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-between p-2 sm:p-8 select-none cursor-pointer"
    >
      {/* Close Button - Safe-area positioned */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close Lightbox"
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 p-2 text-white/70 hover:text-white transition-colors cursor-pointer rounded-full bg-black/40 hover:bg-black/70"
      >
        <X className="w-7 h-7 sm:w-8 sm:h-8 stroke-[1.25]" />
      </button>

      {/* Previous Button - Accessible on both mobile and desktop */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous Photo"
        className="fixed left-2 sm:left-6 top-1/2 -translate-y-1/2 p-2 sm:p-3 text-white/60 hover:text-white transition-colors z-50 cursor-pointer rounded-full bg-black/30 hover:bg-black/60"
      >
        <ChevronLeft className="w-7 h-7 sm:w-10 sm:h-10 stroke-[1.25]" />
      </button>

      {/* Current Image Container with zero-flicker dual-layer display */}
      <div
        onClick={onClose}
        className="relative w-full h-full max-h-[90vh] max-w-6xl mx-auto flex items-center justify-center cursor-pointer px-8 sm:px-16"
      >
        <div
          onClick={(e) => {
            // Clicking inside the photo does not close
            e.stopPropagation();
          }}
          className="relative max-h-[88vh] max-w-full flex items-center justify-center cursor-default"
        >
          {/* Layer 1: Instant Cached Thumbnail (renders in 0ms from browser grid cache) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={`thumb-${currentIdx}`}
            src={cachedThumbnailUrl}
            alt={`Gallery photo ${currentIdx + 1} preview`}
            className="max-h-[88vh] max-w-full w-auto h-auto object-contain select-none"
          />

          {/* Layer 2: Ultra High-Res version, crossfades in smoothly when decoded */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={`highres-${currentIdx}`}
            src={highResUrl}
            alt={`Gallery photo ${currentIdx + 1}`}
            onLoad={() => setHighResLoaded(true)}
            className={`absolute inset-0 m-auto max-h-[88vh] max-w-full w-auto h-auto object-contain shadow-2xl select-none transition-opacity duration-300 ease-in-out ${
              highResLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      </div>

      {/* Next Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next Photo"
        className="fixed right-2 sm:right-6 top-1/2 -translate-y-1/2 p-2 sm:p-3 text-white/60 hover:text-white transition-colors z-50 cursor-pointer rounded-full bg-black/30 hover:bg-black/60"
      >
        <ChevronRight className="w-7 h-7 sm:w-10 sm:h-10 stroke-[1.25]" />
      </button>

      {/* Counter */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-[11px] sm:text-xs tracking-widest font-sans pointer-events-none bg-black/40 px-3 py-1 rounded-full"
      >
        {currentIdx + 1} / {photos.length}
      </div>
    </motion.div>
  );
}
