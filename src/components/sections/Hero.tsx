"use client";

import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from "framer-motion";
import { useRef, useState, useEffect, MouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { Building2, Gem, MapPin, ArrowRight, ArrowDown, Star, ArrowUpRight } from "lucide-react";

const PANO_VIEWER_URL = "/pano-viewer.html";

/* ── Marquee Text Strip ───────────────────────────────── */
function MarqueeStrip() {
  const items = [
    "67 STOREYS", "960 LUXURY UNITS", "118M INFINITY POOL", "SKY WELLNESS",
    "CONCIERGE SERVICES", "LINK BRIDGE TO PAVILION KL", "FREEHOLD", "BUKIT BINTANG",
    "CORPORATE SUITES", "FULLY FURNISHED",
  ];
  return (
    <div className="absolute bottom-32 left-0 w-full z-20 overflow-hidden opacity-30 pointer-events-none mix-blend-overlay hidden sm:block">
      <div className="marquee-track flex whitespace-nowrap gap-16" style={{ willChange: "transform" }}>
        {[...items, ...items].map((item, i) => (
          <span key={i} className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-medium flex items-center gap-8">
            {item} <span className="w-1.5 h-1.5 rounded-full bg-gold/80 shadow-[0_0_10px_rgba(196,162,101,0.5)] inline-block" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Hero Stats HUD (Compact) ─────────────────────────── */
function HeroStats() {
  const stats = [
    { icon: Building2, label: "Storeys", value: "67" },
    { icon: Gem, label: "Units", value: "960" },
    { icon: MapPin, label: "Location", value: "Bukit Bintang" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 2.2, ease: "easeOut" }}
      className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-30 pointer-events-auto w-[calc(100%-2rem)] sm:w-auto max-w-[95vw]"
    >
      <div className="flex items-center justify-center gap-2 sm:gap-6 md:gap-10 bg-[#0e0c14]/80 backdrop-blur-xl px-3 sm:px-8 py-2.5 sm:py-4 rounded-full border border-white/10 shadow-2xl hover:border-gold/30 transition-colors duration-500">
        {stats.map((stat, i) => (
          <div key={i} className="flex items-center gap-2 sm:gap-4 group">
            <div className="w-5 h-5 sm:w-8 sm:h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
              <stat.icon className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-gold" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs sm:text-lg font-heading font-bold text-white leading-none group-hover:text-gold transition-colors">{stat.value}</span>
              <span className="text-[7px] sm:text-[9px] uppercase tracking-widest text-white/50">{stat.label}</span>
            </div>
            {i < stats.length - 1 && <div className="w-px h-6 bg-white/10 hidden sm:block" />}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Magnetic Button Component ────────────────────────── */
function MagneticButton({ children, href, primary = false }: { children: React.ReactNode, href: string, primary?: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.25);
    y.set((clientY - centerY) * 0.25);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative inline-flex items-center justify-center px-8 py-4 sm:px-12 sm:py-5 rounded-full overflow-hidden group transition-all duration-500 ${primary
        ? "bg-gradient-to-r from-[#c9a84c] via-[#ffd700] to-[#c9a84c] bg-[length:200%_auto] animate-shine text-[#0e0c12] shadow-[0_0_30px_rgba(196,162,101,0.4)] hover:shadow-[0_0_50px_rgba(196,162,101,0.7)] hover:scale-105 border border-[#ffd700]/50"
        : "bg-[#0e0c14]/40 backdrop-blur-md border border-white/20 text-white hover:bg-[#0e0c14]/80 hover:border-gold/60 hover:text-gold hover:shadow-[0_0_30px_rgba(196,162,101,0.2)]"
        }`}
    >
      {/* Text Container */}
      <span className={`relative z-10 flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs uppercase tracking-[0.25em] font-bold`}>
        {children}
        {primary ? (
          <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
        ) : (
          <ArrowUpRight className="w-4 h-4 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        )}
      </span>
    </motion.a>
  );
}


/* ── Main Hero Component ──────────────────────────────── */
export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const [iframeReady, setIframeReady] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);

  // Delay initial iframe mount until main thread is free
  useEffect(() => {
    const timer = setTimeout(() => setIframeReady(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Mount/unmount iframe based on hero visibility
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const showIframe = iframeReady && heroVisible;

  return (
    <section id="hero" ref={containerRef} className="relative w-full min-h-screen overflow-hidden bg-[#0e0f1a]">
      {/* ▸ Layer 0: Fallback Pre-loader Image (Camouflages lag until 360 iframe loads) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/page_3_img_1.jpeg"
          alt="Pavilion Square KL"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60 mix-blend-screen scale-105"
        />
        <div className="absolute inset-0 bg-[#0e0f1a]/40" />
      </div>

      {/* ▸ Layer 1: Full-screen 360° Panorama Background */}
      <div className="absolute inset-0 z-0">
        {showIframe && (
          <motion.iframe
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            src={`${PANO_VIEWER_URL}?nowheel=1`}
            className="absolute inset-0 w-full h-full border-0 pointer-events-none sm:pointer-events-auto"
            allowFullScreen
            allow="gyroscope; accelerometer"
            title="Pavilion Square KL — 360° Panorama"
          />
        )}

        {/* Stronger Vignette for better text visibility */}
        <div className="absolute inset-0 pointer-events-none z-[2]"
          style={{
            background: `
              linear-gradient(180deg, rgba(14,15,26,0.3) 0%, transparent 25%, transparent 75%, rgba(14,15,26,0.8) 100%),
              radial-gradient(circle at center, transparent 0%, rgba(14,15,26,0.4) 100%)
            `,
          }}
        />
      </div>

      {/* Decorative side lines */}
      <div className="absolute left-8 top-0 bottom-0 w-px bg-white/5 z-20 hidden xl:block" />
      <div className="absolute right-8 top-0 bottom-0 w-px bg-white/5 z-20 hidden xl:block" />

      {/* ▸ Main Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-16 sm:py-20 pointer-events-none">

        <motion.div
          style={{ y: textY, opacity: heroOpacity }}
          className="w-full max-w-7xl px-4 relative z-10 mx-auto text-center"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-[8.5vw] sm:text-6xl md:text-7xl lg:text-[8vw] leading-[0.85] font-heading font-black text-white tracking-tighter mb-8 sm:mb-14 md:mb-20 drop-shadow-[0_4px_12px_rgba(0,0,0,1)] whitespace-nowrap"
          >
            <span className="drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]">PAVILION</span>{" "}
            <span className="inline-block relative">
              {/* Opacity-based glow layer (hardware accelerated) */}
              <motion.span
                className="absolute inset-0 gold-gradient-text blur-[12px] z-0"
                animate={{ opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{ willChange: "opacity" }}
                aria-hidden="true"
              >
                SQUARE
              </motion.span>

              {/* Static foreground text with a lightweight text-shadow */}
              <span className="relative z-10 gold-gradient-text drop-shadow-[0_0_15px_rgba(196,162,101,0.5)]">
                SQUARE
              </span>
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 pointer-events-auto"
          >
            <MagneticButton href="#units" primary>
              Discover More
            </MagneticButton>

            <MagneticButton href="#contact">
              Register Interest
            </MagneticButton>
          </motion.div>

        </motion.div>
      </div>

      {/* Marquee */}
      <MarqueeStrip />

      {/* Stats HUD (New High Visibility Design) */}
      <HeroStats />

      {/* Scroll indicator (Removed to not clutter the stats) */}

    </section>
  );
}
