"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FullscreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FullscreenMenu({ isOpen, onClose }: FullscreenMenuProps) {
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          /* 1:1 match to screenshot: Frosted glass blurred background showing the blurred page underneath */
          className="fixed inset-0 z-40 bg-white/75 backdrop-blur-2xl flex flex-col items-center justify-center p-6 select-none"
          onClick={(e) => {
            // Close if clicked on empty background
            if (e.target === e.currentTarget) onClose();
          }}
        >
          {/* Centered Luxury Navigation - Exact 1:1 match to screenshot */}
          <motion.nav
            initial="closed"
            animate="open"
            variants={{
              open: {
                transition: { staggerChildren: 0.05, delayChildren: 0.05 },
              },
              closed: {},
            }}
            className="flex flex-col items-center space-y-6 sm:space-y-7 text-center"
          >
            <motion.div
              variants={{
                closed: { opacity: 0, y: 10 },
                open: { opacity: 1, y: 0 },
              }}
            >
              <Link
                href="/"
                onClick={onClose}
                className="font-forum text-2xl sm:text-3xl tracking-wide text-brand-dark hover:opacity-70 transition-opacity"
              >
                Home
              </Link>
            </motion.div>

            <motion.div
              variants={{
                closed: { opacity: 0, y: 10 },
                open: { opacity: 1, y: 0 },
              }}
            >
              <Link
                href="/cinematic-heirlooms"
                onClick={onClose}
                className="font-forum text-2xl sm:text-3xl tracking-wide text-brand-dark hover:opacity-70 transition-opacity"
              >
                Gallery
              </Link>
            </motion.div>

            <motion.div
              variants={{
                closed: { opacity: 0, y: 10 },
                open: { opacity: 1, y: 0 },
              }}
            >
              <Link
                href="/portfolio"
                onClick={onClose}
                className="font-forum text-2xl sm:text-3xl tracking-wide text-brand-dark hover:opacity-70 transition-opacity"
              >
                Portfolio
              </Link>
            </motion.div>

            <motion.div
              variants={{
                closed: { opacity: 0, y: 10 },
                open: { opacity: 1, y: 0 },
              }}
            >
              <Link
                href="/feature-films"
                onClick={onClose}
                className="font-forum text-2xl sm:text-3xl tracking-wide text-brand-dark hover:opacity-70 transition-opacity"
              >
                Feature Films
              </Link>
            </motion.div>

            <motion.div
              variants={{
                closed: { opacity: 0, y: 10 },
                open: { opacity: 1, y: 0 },
              }}
            >
              <Link
                href="/corporate"
                onClick={onClose}
                className="font-forum text-2xl sm:text-3xl tracking-wide text-brand-dark hover:opacity-70 transition-opacity"
              >
                Corporate
              </Link>
            </motion.div>

            <motion.div
              variants={{
                closed: { opacity: 0, y: 10 },
                open: { opacity: 1, y: 0 },
              }}
            >
              <Link
                href="/blog"
                onClick={onClose}
                className="font-forum text-2xl sm:text-3xl tracking-wide text-brand-dark hover:opacity-70 transition-opacity"
              >
                Blogs
              </Link>
            </motion.div>

            {/* Info + Collapsible Dropdown */}
            <motion.div
              variants={{
                closed: { opacity: 0, y: 10 },
                open: { opacity: 1, y: 0 },
              }}
              className="flex flex-col items-center"
            >
              <button
                onClick={() => setInfoOpen(!infoOpen)}
                className="font-forum text-2xl sm:text-3xl tracking-wide text-brand-dark hover:opacity-70 transition-opacity inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>Info +</span>
                <ChevronDown
                  className={`w-4 h-4 text-brand-dark transition-transform duration-300 ${
                    infoOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {infoOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col items-center space-y-3 mt-4 text-brand-muted"
                  >
                    <Link
                      href="/about"
                      onClick={onClose}
                      className="font-forum text-lg sm:text-xl tracking-wider hover:text-brand-dark transition-colors"
                    >
                      About
                    </Link>
                    <Link
                      href="/experience"
                      onClick={onClose}
                      className="font-forum text-lg sm:text-xl tracking-wider hover:text-brand-dark transition-colors"
                    >
                      Experience
                    </Link>
                    <Link
                      href="/faq"
                      onClick={onClose}
                      className="font-forum text-lg sm:text-xl tracking-wider hover:text-brand-dark transition-colors"
                    >
                      FAQ
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              variants={{
                closed: { opacity: 0, y: 10 },
                open: { opacity: 1, y: 0 },
              }}
            >
              <Link
                href="/reserve-your-experience"
                onClick={onClose}
                className="font-forum text-2xl sm:text-3xl tracking-wide text-brand-dark hover:opacity-70 transition-opacity"
              >
                Reserve Your Experience
              </Link>
            </motion.div>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
