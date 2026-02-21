"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Location", href: "#location" },
  { label: "Units", href: "#units" },
  { label: "Facilities", href: "#facilities" },
  { label: "360° Tour", href: "#virtual-tour" },
  { label: "Concierge", href: "#concierge" },
  { label: "Gallery", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sections.forEach((sectionId) => {
      const el = document.getElementById(sectionId);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(sectionId); },
        { threshold: 0.2, rootMargin: "-80px 0px -30% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    const handleScrollBottom = () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 20) {
        setActiveSection(sections[sections.length - 1]);
      }
    };
    window.addEventListener("scroll", handleScrollBottom);

    return () => {
      observers.forEach((o) => o.disconnect());
      window.removeEventListener("scroll", handleScrollBottom);
    };
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-[90] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${scrolled
          ? "bg-[#0e0c14]/80 backdrop-blur-2xl border-b border-white/5 py-3 sm:py-4 shadow-2xl shadow-black/20"
          : "bg-transparent py-4 sm:py-6"
          }`}
      >
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-12 grid grid-cols-[auto_1fr_auto] lg:grid-cols-[1fr_auto_1fr] items-center h-14 sm:h-16 md:h-20">
          {/* Logo (Left) */}
          <div className="flex justify-start">
            <Link href="#hero" className="flex items-center gap-4 group relative z-50">
              <div className="relative w-11 h-11 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 border border-gold/30 rotate-45 transition-transform duration-700 group-hover:rotate-[225deg] group-hover:border-gold" />
                <div className="absolute inset-0 border border-white/10 rotate-45 scale-90" />
                <span className="text-gold font-heading font-bold text-xl relative z-10 transition-transform duration-500 group-hover:scale-110">P</span>
              </div>
              <div className="hidden sm:block">
                <div className="text-base font-heading font-bold text-white tracking-[0.2em] group-hover:text-gold transition-colors duration-500">PAVILION</div>
                <div className="text-[10px] uppercase tracking-[0.4em] text-white/50 group-hover:text-white/70 transition-colors duration-500">Square KL</div>
              </div>
            </Link>
          </div>

          {/* Desktop Links (Center) */}
          <div className="hidden lg:flex justify-center">
            <div className="flex items-center gap-1 bg-[#0e0c14]/30 rounded-full px-2 py-2 border border-white/10 backdrop-blur-md shadow-2xl shadow-black/20">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.href.replace("#", "");
                const isHovered = hoveredIndex === i;

                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setActiveSection(link.href.replace("#", ""))}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="relative px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] font-bold transition-colors duration-500"
                  >
                    {/* Floating Pill Background for Active/Hover State */}
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-gold rounded-full z-0 shadow-[0_0_20px_rgba(196,162,101,0.4)]"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    {/* Subtle Hover Pill if not active */}
                    {!isActive && isHovered && (
                      <motion.div
                        layoutId="nav-hover"
                        className="absolute inset-0 bg-white/10 rounded-full z-0"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}

                    {/* Text Content */}
                    <span className={`relative z-10 transition-colors duration-300 ${isActive ? "text-dark-bg font-extrabold" : "text-white/90"}`}>
                      {link.label}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* CTA + Mobile Toggle (Right) */}
          <div className="flex justify-end items-center gap-4">
            <a
              href="https://wa.link/9ckvr8"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex relative group overflow-hidden rounded-full shadow-[0_4px_15px_rgba(196,162,101,0.3)] transition-all duration-300 hover:shadow-[0_6px_20px_rgba(196,162,101,0.5)] hover:-translate-y-0.5"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#c9a84c] via-[#ffd700] to-[#c9a84c] bg-[length:200%_auto] animate-shine" />
              <div className="relative px-8 py-4 sm:px-10 sm:py-4.5 flex items-center gap-3 text-dark-bg transition-colors duration-300 text-[11px] uppercase tracking-[0.2em] font-bold">
                <Phone className="w-3.5 h-3.5 fill-dark-bg" />
                <span>Book Viewing</span>
              </div>
            </a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-12 h-12 flex items-center justify-center text-[#c9a84c] border border-[#c9a84c]/40 rounded-full hover:bg-white/5 transition-all shadow-[0_0_20px_rgba(201,168,76,0.4)] bg-[#0e0c12]/80 backdrop-blur-md"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 drop-shadow-[0_0_8px_rgba(201,168,76,1)]" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[85] bg-[#0e0c14]/98 backdrop-blur-3xl flex items-center justify-center"
          >
            <motion.div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={closeMobile}
                  initial={{ opacity: 0, y: 40, rotateX: -20 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: i * 0.05, type: "spring", stiffness: 300, damping: 30 }}
                  className={`text-2xl sm:text-3xl font-heading font-light tracking-wider hover:text-gold transition-all duration-500 ${activeSection === link.href.replace("#", "") ? "text-gold scale-110 font-medium" : "text-white/50"
                    }`}
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="mt-8">
                <a
                  href="https://wa.link/9ckvr8"
                  target="_blank"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#c9a84c] via-[#ffd700] to-[#c9a84c] bg-[length:200%_auto] animate-shine rounded-full text-dark-bg text-sm uppercase tracking-widest font-bold shadow-[0_0_30px_rgba(196,162,101,0.3)] hover:shadow-[0_0_50px_rgba(196,162,101,0.5)] transition-shadow duration-500"
                >
                  <Phone className="w-4 h-4" />
                  Book Viewing
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
