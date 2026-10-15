"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface VideoModalProps {
  youtubeId: string | null;
  onClose: () => void;
  title?: string;
}

export default function VideoModal({ youtubeId, onClose, title }: VideoModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (youtubeId) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [youtubeId, onClose]);

  return (
    <AnimatePresence>
      {youtubeId && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8"
        >
          {/* Header bar */}
          <div className="w-full max-w-5xl flex items-center justify-between pb-4 text-white/80">
            <h4 className="font-forum text-lg tracking-wider text-white">
              {title || "White Frog Film"}
            </h4>
            <button
              onClick={onClose}
              aria-label="Close Video"
              className="p-2 hover:text-white transition-colors"
            >
              <X className="w-6 h-6 stroke-[1.5]" />
            </button>
          </div>

          {/* 16:9 Video Player Container */}
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-sm overflow-hidden shadow-2xl">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
              title={title || "YouTube video player"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
