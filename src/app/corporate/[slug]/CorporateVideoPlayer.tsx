"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import VideoModal from "@/components/VideoModal";

interface CorporateVideoPlayerProps {
  coverImage: string;
  title: string;
  videoType: "youtube" | "vimeo";
  videoId: string;
}

export default function CorporateVideoPlayer({
  coverImage,
  title,
  videoType,
  videoId,
}: CorporateVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsPlaying(true)}
        className="group relative h-[320px] sm:h-[480px] md:h-[540px] w-full rounded-2xl overflow-hidden shadow-lg border border-brand-sand cursor-pointer bg-brand-dark"
      >
        <Image
          src={coverImage}
          alt={title}
          fill
          priority
          unoptimized
          className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.9]"
        />

        {/* Ambient Dark Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-brand-gold text-brand-dark flex items-center justify-center pl-1 shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
            <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-brand-dark" />
          </div>
        </div>

        {/* Bottom Banner Badge */}
        <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white/90">
          <span className="font-forum text-xs sm:text-sm tracking-widest uppercase bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded">
            Click to Watch Production Reel
          </span>
          <span className="text-xs font-forum tracking-wider uppercase hidden sm:inline-block bg-brand-gold/90 text-brand-dark px-2.5 py-1 rounded font-medium">
            4K Ultra HD
          </span>
        </div>
      </div>

      <VideoModal
        videoId={isPlaying ? videoId : null}
        videoType={videoType}
        title={title}
        poster={coverImage}
        onClose={() => setIsPlaying(false)}
      />
    </>
  );
}
