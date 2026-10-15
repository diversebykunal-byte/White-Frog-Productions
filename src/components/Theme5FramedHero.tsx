import Image from "next/image";
import Link from "next/link";
import { cld } from "@/lib/cloudinary";

interface Theme5FramedHeroProps {
  title: string;
  subtitle: string;
  image: string;
  showContactLink?: boolean;
}

export default function Theme5FramedHero({
  title,
  subtitle,
  image,
  showContactLink = true,
}: Theme5FramedHeroProps) {
  return (
    <section className="relative px-4 sm:px-10 lg:px-16 pt-2 pb-8 max-w-[1550px] mx-auto select-none">
      {/* Left Rotated Vertical Subtitle */}
      <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 z-30 pointer-events-none">
        <span
          className="text-[9px] sm:text-[10px] tracking-[0.35em] text-brand-muted/80 uppercase font-sans whitespace-nowrap block"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          {subtitle}
        </span>
      </div>

      {/* Right Rotated Vertical "CONTACT US" Link (Exact match to Pixieset Screenshot 2) */}
      {showContactLink && (
        <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 z-30">
          <Link
            href="/reserve-your-experience"
            className="text-[9px] sm:text-[10px] tracking-[0.35em] text-brand-muted/80 hover:text-brand-dark uppercase font-sans whitespace-nowrap block transition-colors"
            style={{ writingMode: "vertical-rl" }}
          >
            CONTACT US
          </Link>
        </div>
      )}

      {/* Main Framed Hero Photo with Tint & Centered Title */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/10] max-h-[750px] overflow-hidden bg-brand-cream shadow-sm">
        <Image
          src={cld(image, 2000)}
          alt={title}
          fill
          unoptimized
          priority
          className="object-cover object-center brightness-[0.72]"
        />
        {/* Subtle Dark Vignette / Tint */}
        <div className="absolute inset-0 bg-black/25" />

        {/* Centered Typography Overlay (Exact Match to Screenshot 2) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <span className="md:hidden text-[10px] tracking-[0.3em] uppercase text-white/80 font-sans mb-3 block">
            {subtitle}
          </span>
          <h1 className="font-forum text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-[0.2em] uppercase drop-shadow-md">
            {title}
          </h1>
        </div>
      </div>
    </section>
  );
}
