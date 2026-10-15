"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import VideoModal from "@/components/VideoModal";

const CORPORATE_PROJECTS = [
  {
    client: "DUCATI OFFICIAL CLUB",
    title: "LAUNCH EVENT",
    youtubeId: "MZLJI48_r-o",
    coverImage: "https://img.youtube.com/vi/MZLJI48_r-o/hqdefault.jpg",
  },
  {
    client: "Income Tax india",
    title: "Annual Film",
    youtubeId: "kL4Noppj1rY",
    coverImage: "https://img.youtube.com/vi/kL4Noppj1rY/hqdefault.jpg",
  },
  {
    client: "Center for development of telematics",
    title: "DWDM",
    youtubeId: "P72Yb1wkJRA",
    coverImage: "https://img.youtube.com/vi/P72Yb1wkJRA/hqdefault.jpg",
  },
  {
    client: "Center for development of telematics",
    title: "XGS-PON",
    youtubeId: "piPQQ5K2t5U",
    coverImage: "https://img.youtube.com/vi/piPQQ5K2t5U/hqdefault.jpg",
  },
  {
    client: "Center for development of telematics",
    title: "GREEN INITIATIVE",
    youtubeId: "2tcV2O5K3k8",
    coverImage: "https://img.youtube.com/vi/2tcV2O5K3k8/hqdefault.jpg",
  },
  {
    client: "PANASONIC LUMIX",
    title: "LUMIX S1R BRAND FILM",
    youtubeId: "773TXYifAns",
    coverImage: "https://img.youtube.com/vi/773TXYifAns/hqdefault.jpg",
  },
  {
    client: "FRENCH EMBASSY",
    title: "EUROPEAN CHEESE EVENT",
    youtubeId: "RBj2Tu9Ch4I",
    coverImage: "https://img.youtube.com/vi/RBj2Tu9Ch4I/hqdefault.jpg",
  },
  {
    client: "NIKON",
    title: "D-SLR TUTORIALS",
    youtubeId: "2gQVXesteCw",
    coverImage: "https://img.youtube.com/vi/2gQVXesteCw/hqdefault.jpg",
  },
  {
    client: "UTI MUTUAL FUNDS",
    title: "PARIS",
    youtubeId: "mau6w5go5_k",
    coverImage: "https://img.youtube.com/vi/mau6w5go5_k/hqdefault.jpg",
  },
  {
    client: "UTI MUTUAL FUNDS",
    title: "ISRAEL",
    youtubeId: "ATCRTikkzpU",
    coverImage: "https://img.youtube.com/vi/ATCRTikkzpU/hqdefault.jpg",
  },
  {
    client: "NETWORK 18",
    title: "UZBEKISTAN",
    youtubeId: "XjZ0FaY7Kms",
    coverImage: "https://img.youtube.com/vi/XjZ0FaY7Kms/hqdefault.jpg",
  },
  {
    client: "UJALA BRAND AV",
    title: "Featuring 'The Great Khali'",
    youtubeId: "xDCrBPbjze8",
    coverImage: "https://img.youtube.com/vi/xDCrBPbjze8/hqdefault.jpg",
  },
  {
    client: "REEBOK",
    title: "ZOKU BRAND LAUNCH FILM",
    youtubeId: "XjZ0FaY7Kms",
    coverImage: "https://img.youtube.com/vi/XjZ0FaY7Kms/hqdefault.jpg",
  },
];

export default function CorporatePage() {
  const [activeVideo, setActiveVideo] = useState<{ id: string; title: string } | null>(null);

  return (
    <div className="bg-white min-h-screen text-brand-dark pb-24">
      {/* 1. Header Banner */}
      <section className="max-w-4xl mx-auto px-6 sm:px-8 pt-12 sm:pt-20 pb-16 text-center space-y-4">
        <h1 className="font-forum text-4xl sm:text-6xl text-brand-dark tracking-wide uppercase">
          Corporates
        </h1>
      </section>

      {/* 2. Grid of 13 Corporate Films */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-14">
          {CORPORATE_PROJECTS.map((proj, idx) => (
            <div
              key={idx}
              onClick={() =>
                setActiveVideo({
                  id: proj.youtubeId,
                  title: `${proj.client} · ${proj.title}`,
                })
              }
              className="group cursor-pointer space-y-4"
            >
              <div className="editorial-card relative aspect-video bg-brand-cream overflow-hidden shadow-sm">
                <Image
                  src={proj.coverImage}
                  alt={proj.title}
                  fill
                  unoptimized
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white text-brand-dark flex items-center justify-center pl-1 shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                    <Play className="w-5 h-5 fill-brand-dark" />
                  </div>
                </div>
              </div>

              <div className="text-center space-y-1">
                <h3 className="font-forum text-xl sm:text-2xl text-brand-dark tracking-wide uppercase group-hover:opacity-75 transition-opacity">
                  {proj.client}
                </h3>
                <span className="text-xs tracking-[0.2em] uppercase text-brand-muted font-sans block">
                  {proj.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Bottom Navigation Feature Links (About Us, Contact, Testimonials) */}
      <section className="max-w-5xl mx-auto px-6 sm:px-8 pt-24 pb-12 grid grid-cols-1 md:grid-cols-3 gap-10 text-center border-t border-brand-sand/60 mt-20">
        <div className="space-y-2">
          <Link href="/about" className="group">
            <h3 className="font-forum text-2xl text-brand-dark tracking-wide uppercase group-hover:underline">
              About Us
            </h3>
            <p className="font-cormorant text-sm text-brand-muted">Get to know us</p>
          </Link>
        </div>

        <div className="space-y-2">
          <Link href="/reserve-your-experience" className="group">
            <h3 className="font-forum text-2xl text-brand-dark tracking-wide uppercase group-hover:underline">
              Contact
            </h3>
            <p className="font-cormorant text-sm text-brand-muted">get in touch with us</p>
          </Link>
        </div>

        <div className="space-y-2">
          <Link href="/about" className="group">
            <h3 className="font-forum text-2xl text-brand-dark tracking-wide uppercase group-hover:underline">
              Testimonials
            </h3>
            <p className="font-cormorant text-sm text-brand-muted">words from our clients</p>
          </Link>
        </div>
      </section>

      {/* Video Modal Player */}
      <VideoModal
        youtubeId={activeVideo?.id || null}
        title={activeVideo?.title}
        onClose={() => setActiveVideo(null)}
      />
    </div>
  );
}
