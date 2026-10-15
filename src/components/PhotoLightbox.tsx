"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

  if (currentIndex === null || !photos[currentIndex]) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-between p-4 sm:p-8 select-none"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Lightbox"
          className="absolute top-6 right-6 z-50 p-2 text-white/70 hover:text-white transition-colors"
        >
          <X className="w-8 h-8 stroke-[1.25]" />
        </button>

        {/* Previous Button */}
        <button
          onClick={onPrev}
          aria-label="Previous Photo"
          className="p-3 text-white/60 hover:text-white transition-colors z-50"
        >
          <ChevronLeft className="w-10 h-10 stroke-[1.25]" />
        </button>

        {/* Current Image */}
        <div className="relative w-full h-full max-h-[85vh] max-w-6xl mx-auto flex items-center justify-center">
          <Image
            src={photos[currentIndex]}
            alt={`Gallery photo ${currentIndex + 1}`}
            fill
            unoptimized
            className="object-contain"
            priority
          />
        </div>

        {/* Next Button */}
        <button
          onClick={onNext}
          aria-label="Next Photo"
          className="p-3 text-white/60 hover:text-white transition-colors z-50"
        >
          <ChevronRight className="w-10 h-10 stroke-[1.25]" />
        </button>

        {/* Counter */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-widest font-sans">
          {currentIndex + 1} / {photos.length}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
