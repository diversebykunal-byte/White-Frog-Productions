"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, ArrowLeft, ArrowRight } from "lucide-react";
import VideoModal from "@/components/VideoModal";

const HERO_SLIDES = [
  {
    id: 1,
    image: "https://images-pw.pixieset.com/elementfield/blK9LJ/Screenshot2025-05-31at12.38.52AM-223909a0-1500.png",
    title: "PRESERVING LOVE, AS ART, FOR GENERATIONS",
  },
  {
    id: 2,
    image: "https://images-pw.pixieset.com/elementfield/1naox6/DSCF0325copy-8ff17774-1500.jpg",
    title: "PRESERVING LOVE, AS ART, FOR GENERATIONS",
  },
  {
    id: 3,
    image: "https://images-pw.pixieset.com/elementfield/a0zLmd/DSCF3386-e589a9b8-1500.jpg",
    title: "PRESERVING LOVE, AS ART, FOR GENERATIONS",
  },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(1); // 0-indexed: 1 = slide 02 (matching screenshot)
  const [activeVideo, setActiveVideo] = useState<{ id: string; title: string; poster?: string } | null>(null);

  // Auto advance slides gently every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  return (
    <div className="relative min-h-screen bg-white text-brand-dark pb-24">
      {/* 1. Framed Hero Slider (1:1 Replica of Screenshot) */}
      <section className="relative px-4 sm:px-12 md:px-16 lg:px-24 pt-2 pb-12 max-w-[1550px] mx-auto select-none">
        {/* Left Vertical Subtitle (Positioned absolute to hero section, scrolls with hero) */}
        <div className="hidden lg:block absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 z-20 select-none pointer-events-none">
          <span
            className="text-[10px] tracking-[0.35em] text-brand-muted/70 uppercase font-sans whitespace-nowrap block"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            LUXURY WEDDING FILMS &amp; FINE ART PHOTOGRAPHY
          </span>
        </div>

        {/* Right Vertical "CONTACT US" Link (Exact match to Pixieset Theme-5) */}
        <div className="hidden lg:block absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 z-20">
          <Link
            href="/reserve-your-experience"
            className="text-[10px] tracking-[0.35em] text-brand-muted/70 hover:text-brand-dark uppercase font-sans whitespace-nowrap block transition-colors"
            style={{ writingMode: "vertical-rl" }}
          >
            CONTACT US
          </Link>
        </div>
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/11] max-h-[82vh] overflow-hidden bg-brand-cream shadow-sm">
          {HERO_SLIDES.map((slide, idx) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <Image
                src={slide.image}
                alt="White Frog Productions Wedding Film"
                fill
                unoptimized
                priority={idx === 0 || idx === 1}
                className="object-cover object-center"
              />
              {/* Subtle darkened vignette for contrast */}
              <div className="absolute inset-0 bg-black/25" />
            </div>
          ))}

          {/* Centered Editorial Title Overlay (Exact typography from screenshot) */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
            <h1 className="font-forum text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-[0.18em] leading-tight sm:leading-relaxed max-w-4xl drop-shadow-md uppercase">
              Preserving love, as art, for
              <br />
              generations
            </h1>
          </div>
        </div>

        {/* Carousel Counter & Navigation (← 02 / 03 →) - Exact Match to Screenshot */}
        <div className="flex items-center justify-center gap-6 pt-6 text-brand-dark/70 font-forum text-sm tracking-widest">
          <button
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="p-2 hover:text-brand-dark transition-colors"
          >
            <ArrowLeft className="w-4 h-4 stroke-[1.25]" />
          </button>

          <span className="text-xs font-sans tracking-[0.25em] text-brand-dark/80">
            0{currentSlide + 1} &nbsp;/&nbsp; 0{HERO_SLIDES.length}
          </span>

          <button
            onClick={nextSlide}
            aria-label="Next Slide"
            className="p-2 hover:text-brand-dark transition-colors"
          >
            <ArrowRight className="w-4 h-4 stroke-[1.25]" />
          </button>
        </div>
      </section>

      {/* 2. Welcome Intro Statement */}
      <section className="max-w-4xl mx-auto px-6 sm:px-8 py-16 text-center space-y-6">
        <p className="font-forum text-xl sm:text-2xl md:text-3xl text-brand-dark leading-relaxed font-normal">
          Welcome to White Frog Productions. We design cinematic heirlooms, timeless wedding films and photographs crafted for couples who believe their love story deserves more than just documentation. Based in Delhi, available worldwide.
        </p>
      </section>

      {/* 3. Parallax Banner Quote */}
      <section className="relative w-full h-[60vh] sm:h-[70vh] overflow-hidden my-12">
        <Image
          src="https://images-pw.pixieset.com/elementfield/5kmXpe/_WFP9778-766e69b7-1500.jpg"
          alt="White Frog Legacy Wedding"
          fill
          unoptimized
          className="object-cover object-center brightness-[0.7]"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-center px-6">
          <p className="font-forum text-2xl sm:text-3xl md:text-4xl text-white tracking-wide max-w-3xl leading-relaxed italic drop-shadow-sm">
            &ldquo;Seeking the magic in every heartbeat, the moments that live on as your legacy&rdquo;
          </p>
        </div>
      </section>

      {/* 4. Cinematic Heirlooms Featured Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-16 space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs tracking-ultra uppercase text-brand-muted font-sans block">
            —
          </span>
          <h2 className="font-forum text-3xl sm:text-4xl text-brand-dark tracking-wide">
            Cinematic Heirlooms
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {[
            {
              couple: "Rea & Varaul",
              location: "Trident, Agra",
              image: "https://images-pw.pixieset.com/elementfield/Wz3WGa/DSCF0201copy-ebb2deca-2500.jpg",
              youtubeId: "6YFjgDYZXPM",
            },
            {
              couple: "Tanya & Eshan",
              location: "Greater Noida",
              image: "https://images-pw.pixieset.com/elementfield/ZJvybl/_WFP9992copy-8a8fe80d-2500.jpg",
              youtubeId: "ZqG2K2Fgelw",
            },
            {
              couple: "Mridali & Prayas",
              location: "Indana Palace, Jodhpur",
              image: "https://images-pw.pixieset.com/elementfield/39nX1V/DSC00158-372c9162-2500.jpg",
              youtubeId: "7FOXGQdaYrs",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              onClick={() =>
                setActiveVideo({
                  id: item.youtubeId,
                  title: `${item.couple} · ${item.location}`,
                  poster: item.image,
                })
              }
              className="group cursor-pointer space-y-4"
            >
              <div className="editorial-card relative aspect-[4/5] bg-brand-cream overflow-hidden">
                <Image
                  src={item.image}
                  alt={`${item.couple} luxury destination wedding cinema & photography at ${item.location} | White Frog Productions`}
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
                <span className="text-[11px] tracking-widest uppercase text-brand-muted font-sans block">
                  {item.location}
                </span>
                <h3 className="font-forum text-2xl text-brand-dark tracking-wide group-hover:opacity-75 transition-opacity">
                  {item.couple}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-4">
          <Link
            href="/cinematic-heirlooms"
            className="inline-block px-8 py-3.5 border border-brand-dark/40 font-forum text-xs tracking-widest uppercase text-brand-dark hover:bg-brand-dark hover:text-white transition-all"
          >
            More Love Stories
          </Link>
        </div>
      </section>

      {/* 5. "Adventure with us" Experience Banner */}
      <section className="relative w-full h-[65vh] overflow-hidden my-12">
        <Image
          src="https://images-pw.pixieset.com/elementfield/579566321/475A3403-3ddbe6fe.jpg"
          alt="Adventure with us"
          fill
          unoptimized
          className="object-cover object-center brightness-[0.7]"
        />
        <div className="absolute inset-0 bg-black/35 flex flex-col items-center justify-center text-center px-6 space-y-4 text-white">
          <span className="text-xs tracking-ultra uppercase text-white/80 font-sans">
            Weddings | Films | Corporates
          </span>
          <h2 className="font-forum text-3xl sm:text-5xl tracking-wide uppercase drop-shadow-sm">
            Adventure with us
          </h2>
          <div className="pt-4">
            <Link
              href="/experience"
              className="inline-block px-8 py-3 border border-white text-white hover:bg-white hover:text-brand-dark font-forum text-xs tracking-widest uppercase transition-all backdrop-blur-sm"
            >
              The Experience
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Travel & Follow Along Section */}
      <section className="max-w-5xl mx-auto px-6 sm:px-8 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 text-center md:text-left border-b border-brand-sand/60">
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
            Available for hire Worldwide. Previous travels include Hungary, Switzerland, Austria, France, Slovenia, Italy, Uzbekistan, Israel, Dubai, Thailand, and Malaysia.
          </p>
        </div>
      </section>

      {/* 7. Featured Trailer Video Player Banner (Hua Hin, Thailand) */}
      <section className="relative w-full h-[65vh] overflow-hidden my-12">
        <Image
          src="https://images-pw.pixieset.com/elementfield/e6GO4X/AMOLYT-1d85e7d4-1500.png"
          alt="Amol & Sahil - Hua Hin Thailand"
          fill
          unoptimized
          className="object-cover object-center brightness-[0.75]"
        />
        <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-center px-6 space-y-5 text-white">
          <span className="text-xs tracking-ultra uppercase text-white/80 font-sans">
            Hua Hin, Thailand
          </span>
          <h2 className="font-forum text-3xl sm:text-5xl tracking-wide uppercase drop-shadow-sm">
            Amol &amp; Sahil
          </h2>
          <button
            onClick={() => setActiveVideo({ id: "2PTtTGuPzbg", title: "Amol & Sahil · Hua Hin, Thailand" })}
            className="w-16 h-16 rounded-full bg-white text-brand-dark flex items-center justify-center pl-1 shadow-2xl hover:scale-110 transition-transform"
          >
            <Play className="w-6 h-6 fill-brand-dark" />
          </button>
        </div>
      </section>

      {/* 8. Reserve CTA Button */}
      <section className="max-w-xl mx-auto px-6 py-12 text-center">
        <Link
          href="/reserve-your-experience"
          className="block w-full py-5 bg-brand-dark text-white font-forum text-sm tracking-[0.25em] uppercase hover:bg-black transition-colors shadow-sm"
        >
          Reserve Your Forever After Experience
        </Link>
      </section>

      {/* Video Modal Player */}
      <VideoModal
        youtubeId={activeVideo?.id || null}
        title={activeVideo?.title}
        poster={activeVideo?.poster}
        onClose={() => setActiveVideo(null)}
      />
    </div>
  );
}
