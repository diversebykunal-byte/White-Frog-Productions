"use client";

import { useEffect, useState, useRef } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface VideoModalProps {
  youtubeId: string | null;
  onClose: () => void;
  title?: string;
  poster?: string;
}

export default function VideoModal({ youtubeId, onClose, title, poster }: VideoModalProps) {
  // Retain video data during exit animation so everything remains visible during the fade
  const [activeData, setActiveData] = useState<{ id: string; title?: string; poster?: string } | null>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (youtubeId) {
      setActiveData({ id: youtubeId, title, poster });
      setIframeLoaded(false);
    } else if (iframeRef.current?.contentWindow) {
      // Pause video & mute immediately so audio stops in 0ms on close
      try {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: "command", func: "pauseVideo", args: [] }),
          "*"
        );
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: "command", func: "mute", args: [] }),
          "*"
        );
      } catch {
        // Ignore cross-origin postMessage errors
      }
    }
  }, [youtubeId, title, poster]);

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

  const displayData = youtubeId ? { id: youtubeId, title, poster } : activeData;
  const isVisible = Boolean(youtubeId);

  // Determine the instant cached poster URL
  const posterUrl =
    displayData?.poster ||
    (displayData?.id ? `https://i.ytimg.com/vi/${displayData.id}/hqdefault.jpg` : "");

  return (
    <AnimatePresence onExitComplete={() => setActiveData(null)}>
      {isVisible && displayData && (
        <motion.div
          key="video-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-3 sm:p-8 cursor-pointer"
        >
          {/* Top-Right Floating Close Button */}
          <button
            onClick={onClose}
            aria-label="Close Video"
            className="fixed top-4 right-4 sm:top-7 sm:right-7 z-50 p-2.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all cursor-pointer bg-black/40 sm:bg-transparent"
          >
            <X className="w-7 h-7 sm:w-8 sm:h-8 stroke-[1.25]" />
          </button>

          {/* Inner Content Wrapper - Pure opacity fade, no scale transforms */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl flex flex-col cursor-default"
          >
            {/* Header Title */}
            {displayData.title && (
              <div className="w-full flex items-center justify-between pb-2 sm:pb-3 text-white/80 pr-12 sm:pr-0">
                <h4 className="font-forum text-sm sm:text-xl tracking-[0.2em] uppercase truncate max-w-2xl text-white">
                  {displayData.title}
                </h4>
              </div>
            )}

            {/* 16:9 Cinema Container */}
            <div className="relative w-full aspect-video bg-black rounded overflow-hidden shadow-2xl border border-white/10">
              {/* Layer 1: Instant Cached Thumbnail (renders in 0ms, zero flash) */}
              {posterUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={posterUrl}
                  alt={displayData.title || "Video thumbnail"}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 select-none ${
                    iframeLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
                  }`}
                />
              )}

              {/* Gentle Luxury Spinner while YouTube connects */}
              {!iframeLoaded && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-10 h-10 rounded-full border-2 border-white/20 border-t-white/90 animate-spin" />
                </div>
              )}

              {/* Layer 2: YouTube Iframe - remains mounted and frozen during exit fade to avoid black void */}
              <iframe
                ref={iframeRef}
                src={`https://www.youtube.com/embed/${displayData.id}?autoplay=1&enablejsapi=1&rel=0&modestbranding=1&playsinline=1`}
                title={displayData.title || "YouTube video player"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onLoad={() => setIframeLoaded(true)}
                className={`absolute inset-0 w-full h-full border-0 bg-black transition-opacity duration-300 ${
                  iframeLoaded ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
