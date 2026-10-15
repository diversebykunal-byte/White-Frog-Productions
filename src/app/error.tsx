"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RotateCcw, Home, AlertCircle } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an analytics or error tracking service silently
    console.error("Unhandled client exception:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#faf8f5] text-brand-dark flex flex-col justify-center items-center px-6 py-24 sm:py-32">
      <div className="max-w-xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-amber-50 border border-amber-200 rounded-full text-amber-800">
          <AlertCircle className="w-3.5 h-3.5" />
          <span className="text-[11px] font-forum tracking-[0.25em] uppercase">
            A Momentary Pause
          </span>
        </div>

        <div className="space-y-3">
          <h1 className="font-forum text-3xl sm:text-4xl md:text-5xl text-brand-dark tracking-wide leading-tight">
            An Unexpected Disruption
          </h1>
          <p className="font-cormorant text-lg sm:text-xl text-brand-muted max-w-md mx-auto italic leading-relaxed">
            Our digital stage encountered a fleeting interruption. We invite you to refresh the view or gracefully return to our collections.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-dark text-white rounded-full font-forum text-xs tracking-widest uppercase hover:bg-black transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-brand-gold" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white border border-brand-sand/80 text-brand-dark rounded-full font-forum text-xs tracking-widest uppercase hover:bg-brand-cream/50 transition-colors"
          >
            <Home className="w-3.5 h-3.5 text-brand-muted" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
