"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
import FullscreenMenu from "./FullscreenMenu";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm transition-all duration-300 py-6 px-6 sm:px-12">
        <div className="max-w-[1550px] mx-auto relative flex items-center justify-between">
          {/* Left spacer for centering */}
          <div className="w-10 hidden sm:block" />

          {/* Centered Golden Origami Frog Logo - Transparent PNG */}
          <Link href="/" className="mx-auto flex flex-col items-center group">
            <div className="relative w-36 sm:w-44 h-12 sm:h-14">
              <Image
                src="https://images-pw.pixieset.com/profile/894901/5401b7ff60df951c77d0ea7747e43f53e1171ae982ae899b31ff04c1bc44f01d.png"
                alt="White Frog Productions"
                fill
                unoptimized
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Minimalist Right Hamburger (2 lines) / Close toggle */}
          <div className="absolute right-0 flex items-center z-50">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
              className="p-2 text-brand-dark/80 hover:text-brand-dark transition-opacity flex flex-col items-end gap-1.5 cursor-pointer"
            >
              {menuOpen ? (
                <X className="w-7 h-7 stroke-[1.25] text-brand-dark" />
              ) : (
                <>
                  <span className="w-7 h-[1.25px] bg-brand-dark/90 transition-colors block" />
                  <span className="w-7 h-[1.25px] bg-brand-dark/90 transition-colors block" />
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* The 1:1 Pixieset Frosted Glass Overlay Menu */}
      <FullscreenMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
