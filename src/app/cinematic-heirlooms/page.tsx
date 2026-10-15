"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import VideoModal from "@/components/VideoModal";
import { STORIES } from "@/data/siteData";

export default function CinematicHeirloomsPage() {
  const [activeVideo, setActiveVideo] = useState<{ id: string; title: string } | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 sm:py-24 space-y-16">
      {/* Page Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs tracking-ultra uppercase text-brand-muted font-sans">
          Portfolio Archive
        </span>
        <h1 className="font-forum text-4xl sm:text-6xl text-brand-dark tracking-wide">
          Cinematic Heirlooms
        </h1>
        <div className="w-16 h-[1px] bg-brand-sand mx-auto my-4" />
        <p className="font-cormorant text-xl text-brand-muted italic">
          Every celebration is a bespoke motion picture. From the majestic forts of Rajasthan to beach retreats across Thailand and Europe.
        </p>
      </div>

      {/* Grid of All 26 Stories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-14">
        {STORIES.map((story) => (
          <div
            key={story.slug}
            onClick={() =>
              setActiveVideo({
                id: story.youtubeId,
                title: `${story.couple} · ${story.location}`,
              })
            }
            className="group cursor-pointer space-y-4"
          >
            {/* Cover image tile */}
            <div className="editorial-card relative aspect-[4/5] bg-brand-cream overflow-hidden">
              <Image
                src={story.coverImage}
                alt={story.couple}
                fill
                unoptimized
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white text-brand-dark flex items-center justify-center pl-1 shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                  <Play className="w-5 h-5 fill-brand-dark" />
                </div>
              </div>
            </div>

            {/* Story titles */}
            <div className="text-center space-y-1">
              <span className="text-xs tracking-widest uppercase text-brand-muted font-sans block">
                {story.location}
              </span>
              <h3 className="font-forum text-2xl text-brand-dark tracking-wide group-hover:opacity-75 transition-opacity">
                {story.couple}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <VideoModal
        youtubeId={activeVideo?.id || null}
        title={activeVideo?.title}
        onClose={() => setActiveVideo(null)}
      />
    </div>
  );
}
