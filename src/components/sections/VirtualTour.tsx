"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useInView as useInViewRIO } from "react-intersection-observer";
import { Compass, Expand, Minimize, Eye, RotateCcw, ChevronLeft, ChevronRight, MapPin, Navigation, View, Play } from "lucide-react";

/* ── BG images for this section ─────────────────────── */
const bgSlides = [
  { src: "/pavilionmainview.jpeg", label: "Pavilion Square — Aerial Overview" },
  { src: "/page_4_img_2.jpeg", label: "Exterior Architecture" },
  { src: "/page_5_img_2.jpeg", label: "Tower Elevation" },
  { src: "/page_8_img_1.jpeg", label: "Sky Level Views" },
  { src: "/page_18_img_1.jpeg", label: "Grand Entrance" },
];

/* ── Preview thumbnails ──────────────────────────────── */
const previews = [
  { src: "/page_9_img_1.jpeg", label: "L67 Pool" },
  { src: "/page_10_img_2.jpeg", label: "L66 Sky Deck" },
  { src: "/page_11_img_1.jpeg", label: "L63A Gym" },
  { src: "/page_15_img_1.jpeg", label: "Studio Interior" },
  { src: "/page_15_img_4.jpeg", label: "2BR Living" },
  { src: "/page_16_img_1.jpeg", label: "Corporate Suite" },
  { src: "/page_18_img_1.jpeg", label: "Lobby" },
];

/* ── Features ────────────────────────────────────────── */
const features = [
  { icon: Compass, title: "360° Panoramic", desc: "Navigate every angle of Pavilion Square in full 360°" },
  { icon: Eye, title: "True-to-Life View", desc: "Photorealistic renders of every level and unit type" },
  { icon: Navigation, title: "Guided Tour", desc: "Move through the building floor-by-floor interactively" },
];

export default function VirtualTour() {
  const [current, setCurrent] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [paused, setPaused] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const { ref: iframeRef, inView: iframeVisible } = useInViewRIO({ triggerOnce: true, threshold: 0.2 });

  /* Auto-advance bg */
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setCurrent((c) => (c + 1) % bgSlides.length), 5500);
    return () => clearInterval(t);
  }, [paused]);

  const goTo = (i: number) => { setCurrent(i); setPaused(true); setTimeout(() => setPaused(false), 9000); };

  return (
    <section id="virtual-tour" className="relative min-h-screen overflow-hidden bg-[#060914]">

      {/* BG slider */}
      {bgSlides.map((s, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          animate={{ opacity: i === current ? 1 : 0 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={s.src} alt={s.label} className="w-full h-full object-cover kb-zoom-bg" style={{ filter: "grayscale(30%) brightness(0.5)" }} />
        </motion.div>
      ))}
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#060914]/97 via-[#060914]/80 to-[#060914]/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#060914] via-transparent to-[#060914]/60" />
      {/* Dot grid overlay */}
      <div className="absolute inset-0 opacity-[0.018]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(201,168,76,0.8) 1px, transparent 0)", backgroundSize: "48px 48px" }} />

      <div className="relative z-10 min-h-screen max-w-7xl mx-auto w-full px-4 sm:px-6 py-16 sm:py-28 flex flex-col">

        {/* Header */}
        <div className="mb-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-badge mb-5"
          >
            <View className="w-3 h-3" />
            Immersive 360° Experience
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-6xl font-heading font-black text-white leading-tight"
          >
            Virtual <em style={{ fontStyle: "normal", WebkitTextFillColor: "transparent", background: "linear-gradient(135deg,#c9a84c,#ffd700)", WebkitBackgroundClip: "text", backgroundClip: "text" }}>Tour</em>
          </motion.h2>
          <div className="section-divider mt-4" />
        </div>

        <div className="flex-1 flex flex-col-reverse lg:grid lg:grid-cols-5 gap-6 lg:gap-10 items-start">

          {/* Left — features + controls */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 flex flex-col gap-3 sm:gap-6"
          >
            <p className="text-white/65 text-sm sm:text-[15px] leading-relaxed">
              Step inside Pavilion Square KL without leaving your home. Our immersive 360° virtual tour lets you explore every floor — from the 118m sky pool to the luxurious residences and corporate suites.
            </p>

            {/* Feature cards */}
            <div className="flex flex-col gap-3">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  className="group flex items-start gap-4 p-4 rounded-2xl glow-card glow-card-slow cursor-default"
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#c9a84c]/20 to-[#c9a84c]/5 border border-[#c9a84c]/25 flex items-center justify-center flex-shrink-0 group-hover:border-[#ffd700]/45 group-hover:shadow-[0_0_16px_rgba(255,215,0,0.15)] transition-all duration-300">
                    <f.icon className="w-5 h-5 text-[#c9a84c]" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white mb-1">{f.title}</div>
                    <div className="text-xs text-white/60 leading-relaxed">{f.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* BG slide dots */}
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-3 font-semibold">Current View</div>
              <div className="flex gap-2 items-center mb-2">
                {bgSlides.map((_, i) => (
                  <button key={i} onClick={() => goTo(i)} className={`slider-dot ${i === current ? "active" : "w-2 h-2"}`} />
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="text-xs text-white/40 italic"
                >
                  {bgSlides[current].label}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right — 360 iframe */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-3 flex flex-col gap-4"
          >
            {/* Iframe container */}
            <div
              ref={iframeRef}
              className={`relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#c9a84c]/20 transition-all duration-500 ${isExpanded ? "fixed inset-4 z-[150]" : "aspect-[4/3] sm:aspect-video"}`}
            >
              {/* Start Overlay */}
              {!isStarted && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm group cursor-pointer" onClick={() => setIsStarted(true)}>
                  <div className="absolute inset-0 bg-[url('/pavilionmainview.jpeg')] bg-cover bg-center opacity-40 scale-105 group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60" />

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => { e.stopPropagation(); setIsStarted(true); }}
                    className="relative z-30 flex items-center gap-4 px-8 py-4 sm:px-10 sm:py-5 bg-gradient-to-r from-[#c9a84c] via-[#ffd700] to-[#c9a84c] bg-[length:200%_auto] animate-shine rounded-full shadow-[0_0_40px_rgba(196,162,101,0.5)] hover:shadow-[0_0_60px_rgba(196,162,101,0.8)] transition-all duration-500 group-hover:shadow-[0_0_80px_rgba(196,162,101,1)]"
                  >
                    <div className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center backdrop-blur-sm border border-white/20">
                      <Play className="w-5 h-5 text-white fill-white ml-1" />
                    </div>
                    <span className="text-[#0e0c12] font-heading font-bold uppercase tracking-widest text-sm sm:text-base">Start Virtual Tour</span>
                  </motion.button>

                  <div className="relative z-30 mt-6 text-white/50 text-xs sm:text-sm tracking-widest uppercase">Click to Explore 360° View</div>
                </div>
              )}

              {/* Loading skeleton (only shows after start click) */}
              {isStarted && !iframeLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-[#141218] to-[#0e0c12] flex flex-col items-center justify-center gap-4 z-10">
                  <div className="w-16 h-16 rounded-2xl bg-[#c9a84c]/15 border border-[#c9a84c]/25 flex items-center justify-center">
                    <RotateCcw className="w-8 h-8 text-[#c9a84c] animate-spin" style={{ animationDuration: "2s" }} />
                  </div>
                  <div className="text-sm text-white/50">Loading 360° Tour...</div>
                  <div className="w-48 h-1 bg-white/8 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#c9a84c] to-[#ffd700] shimmer-bar rounded-full" />
                  </div>
                </div>
              )}

              {isStarted && (
                <iframe
                  src="/pano-viewer.html"
                  className="w-full h-full border-0"
                  allow="fullscreen; vr; xr"
                  onLoad={() => setIframeLoaded(true)}
                  title="Pavilion Square 360° Virtual Tour"
                />
              )}

              {/* Overlay controls */}
              <div className="absolute top-3 right-3 flex gap-2">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="slider-arrow w-10 h-10"
                >
                  {isExpanded ? <Minimize className="w-4 h-4" /> : <Expand className="w-4 h-4" />}
                </button>
              </div>

              {/* Tour indicator */}
              <div className="absolute bottom-3 left-3 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[11px] text-white/60 backdrop-blur-sm bg-[#060914]/50 px-2 py-1 rounded">
                  Live 360° View — Click & Drag to Explore
                </span>
              </div>
            </div>

            {/* Preview strip — auto scroll */}
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-3 font-semibold">Gallery Preview</div>
              <div className="overflow-hidden rounded-xl">
                <div className="flex gap-2" style={{ animation: "marquee 28s linear infinite", width: "max-content" }}>
                  {[...previews, ...previews].map((p, i) => (
                    <div key={i} className="relative w-20 sm:w-28 rounded-lg sm:rounded-xl overflow-hidden flex-shrink-0 border border-white/10 img-card-hover group cursor-pointer">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.src} alt={p.label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" style={{ height: "56px" }} />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#060914]/80 via-transparent to-transparent" />
                      <div className="absolute bottom-1 left-2 text-[8px] text-white/60 font-medium">{p.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Location CTA */}
            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
              <a href="#contact" className="btn-gold flex-1 rounded-xl py-3 sm:py-3.5">
                <MapPin className="w-4 h-4" />Book Gallery Visit
              </a>
              <a
                href="https://www.pavillionsquare.com.my"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost-gold flex-1 rounded-xl py-3 sm:py-3.5"
              >
                <Compass className="w-4 h-4" />Official Site
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/50 to-transparent" />
    </section>
  );
}
