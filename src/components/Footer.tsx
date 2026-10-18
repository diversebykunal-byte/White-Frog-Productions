import Link from "next/link";
import Image from "next/image";
import { Instagram, Youtube, Linkedin, Mail, Phone } from "lucide-react";
import { BRAND_INFO } from "@/data/siteData";

export default function Footer() {
  return (
    <footer className="bg-[#f4f2ec] border-t border-brand-sand/60 py-16 px-6 sm:px-8 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-10">
        {/* Brand Logo & Tagline */}
        <div className="space-y-4 flex flex-col items-center">
          <div className="relative w-36 sm:w-44 h-12 sm:h-14">
            <Image
              src="/logo.png"
              alt="White Frog Productions"
              fill
              unoptimized
              className="object-contain"
            />
          </div>
          <p className="font-cormorant text-lg sm:text-xl text-brand-muted max-w-xl mx-auto italic">
            Handcrafted luxury wedding cinema & fine-art photography. Preserving emotions as timeless heirlooms.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 font-forum text-sm sm:text-base tracking-widest text-brand-dark/80">
          <Link href="/gallery" className="hover:text-brand-dark transition-colors">
            Gallery
          </Link>
          <Link href="/portfolio" className="hover:text-brand-dark transition-colors">
            Portfolio
          </Link>
          <Link href="/films" className="hover:text-brand-dark transition-colors">
            Films
          </Link>
          <Link href="/music-videos" className="hover:text-brand-dark transition-colors">
            Music Videos
          </Link>
          <Link href="/corporate" className="hover:text-brand-dark transition-colors">
            Corporate
          </Link>
          <Link href="/blog" className="hover:text-brand-dark transition-colors">
            Blogs
          </Link>
          <Link href="/about" className="hover:text-brand-dark transition-colors">
            About
          </Link>
          <Link href="/experience" className="hover:text-brand-dark transition-colors">
            Experience
          </Link>
          <Link href="/faq" className="hover:text-brand-dark transition-colors">
            FAQ
          </Link>
          <Link href="/reserve-your-experience" className="hover:text-brand-dark transition-colors">
            Reserve
          </Link>
        </div>

        {/* Social Icons */}
        <div className="flex items-center space-x-6 text-brand-dark/70">
          <a
            href={BRAND_INFO.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-brand-dark transition-colors"
          >
            <Instagram className="w-5 h-5 stroke-[1.5]" />
          </a>
          <a
            href={BRAND_INFO.youtube}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="hover:text-brand-dark transition-colors"
          >
            <Youtube className="w-5 h-5 stroke-[1.5]" />
          </a>
          <a
            href={BRAND_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-brand-dark transition-colors"
          >
            <Linkedin className="w-5 h-5 stroke-[1.5]" />
          </a>
          <a
            href={`mailto:${BRAND_INFO.email}`}
            aria-label="Email"
            className="hover:text-brand-dark transition-colors"
          >
            <Mail className="w-5 h-5 stroke-[1.5]" />
          </a>
          <a
            href={`tel:${BRAND_INFO.phone}`}
            aria-label="Phone"
            className="hover:text-brand-dark transition-colors"
          >
            <Phone className="w-5 h-5 stroke-[1.5]" />
          </a>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-brand-sand/60 w-full max-w-2xl text-xs text-brand-muted tracking-widest font-sans flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>ALL CONTENT COPYRIGHT © {new Date().getFullYear()} WHITE FROG PRODUCTIONS</span>
          <span>NEW DELHI · WORLDWIDE</span>
        </div>
      </div>
    </footer>
  );
}
