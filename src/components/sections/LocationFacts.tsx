"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useInView as useInViewRIO } from "react-intersection-observer";
import {
  MapPin, Train, ShoppingBag, Building2, Landmark, Plane, Car,
  ArrowRight, ChevronLeft, ChevronRight, Star, Globe, Wifi,
  TrendingUp, Eye, Navigation
} from "lucide-react";

/* ── Slide images ─────────────────────────────────────── */
const slides = [
  {
    src: "/pavilionmainview.jpeg",
    headline: "The Epicentre of KL",
    sub: "75A Jalan Raja Chulan, Bukit Bintang",
  },
  {
    src: "/page_3_img_1.jpeg",
    headline: "Prime Golden Triangle",
    sub: "Steps from Pavilion KL via direct link bridge",
  },
  {
    src: "/page_4_img_1.jpeg",
    headline: "Connected to Everything",
    sub: "MRT, Monorail, KLCC — all within walking distance",
  },
  {
    src: "/page_6_img_1.jpeg",
    headline: "Bukit Bintang Landmark",
    sub: "Where luxury living meets world-class convenience",
  },
  {
    src: "/page_7_img_1.jpeg",
    headline: "KL's Most Coveted Address",
    sub: "67 storeys of architectural brilliance",
  },
];

/* ── Quick Facts ─────────────────────────────────────── */
const facts = [
  { value: "67", label: "Storeys", icon: Building2 },
  { value: "960+", label: "Residences", icon: Landmark },
  { value: "118m", label: "Infinity Pool", icon: Star },
  { value: "106", label: "Corp Suites", icon: TrendingUp },
  { value: "30K sqft", label: "Facilities", icon: Globe },
  { value: "Freehold", label: "Tenure", icon: Wifi },
];

/* ── Connectivity ────────────────────────────────────── */
const connectivity = [
  { name: "Pavilion KL Mall", detail: "Direct link bridge — no outdoor walk", icon: ShoppingBag, highlight: true },
  { name: "Bukit Bintang MRT", detail: "Walking distance, 3 min", icon: Train, highlight: true },
  { name: "Raja Chulan Monorail", detail: "300 metres away", icon: Train, highlight: false },
  { name: "KLCC / Petronas Towers", detail: "1.5 km — 5 min drive", icon: Building2, highlight: false },
  { name: "KL Tower", detail: "1 km panoramic landmark", icon: Landmark, highlight: false },
  { name: "KL International Airport", detail: "55 min via KLIA Ekspres", icon: Plane, highlight: false },
  { name: "Elite Highway / Smart Tunnel", detail: "Direct highway access", icon: Car, highlight: false },
  { name: "Starhill Gallery", detail: "Adjacent luxury retail hub", icon: Star, highlight: false },
];

/* ── Full-bleed BG Slider ────────────────────────────── */
function BgSlider({ current, slides }: { current: number; slides: { src: string; headline: string; sub: string }[] }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {slides.map((s, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: i === current ? 1 : 0 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={s.src}
            alt={s.headline}
            className="w-full h-full object-cover kb-zoom-bg"
          />
        </motion.div>
      ))}
      {/* Deep navy gradient overlay — left-heavy for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#060914]/95 via-[#060914]/70 to-[#060914]/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#060914] via-transparent to-[#060914]/60" />
      {/* Gold shimmer line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/60 to-transparent" />
    </div>
  );
}

/* ── Animated counter ────────────────────────────────── */
function StatItem({ value, label, icon: Icon, delay }: { value: string; label: string; icon: React.ElementType; delay: number }) {
  const { ref, inView } = useInViewRIO({ triggerOnce: true, threshold: 0.3 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}
      className="group flex flex-col items-center text-center gap-2"
    >
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#c9a84c]/20 to-[#c9a84c]/5 border border-[#c9a84c]/25 flex items-center justify-center mb-1 group-hover:border-[#ffd700]/50 group-hover:shadow-[0_0_20px_rgba(255,215,0,0.15)] transition-all duration-400">
        <Icon className="w-5 h-5 text-[#c9a84c]" />
      </div>
      <div className="text-2xl font-heading font-black stat-number leading-none">{value}</div>
      <div className="text-[10px] uppercase tracking-[0.2em] text-white/62 font-medium">{label}</div>
    </motion.div>
  );
}

export default function LocationFacts() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { ref: statsRef, inView: statsInView } = useInViewRIO({ triggerOnce: true, threshold: 0.1 });

  /* Auto-advance slider */
  useEffect(() => {
    if (isPaused) return;
    const t = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, [isPaused]);

  const goTo = (i: number) => { setCurrent(i); setIsPaused(true); setTimeout(() => setIsPaused(false), 8000); };
  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const next = () => goTo((current + 1) % slides.length);

  return (
    <section id="location" ref={sectionRef} className="relative min-h-screen overflow-hidden bg-[#060914]">
      <BgSlider current={current} slides={slides} />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="flex-1 max-w-7xl mx-auto w-full px-6 pt-28 pb-12 grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT — Hero text + slide info */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="section-badge mb-6"
            >
              <Navigation className="w-3 h-3" />
              Prime Location — Bukit Bintang, KL
            </motion.div>

            {/* Slide headline */}
            <div className="overflow-hidden mb-3">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={current}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="text-5xl md:text-6xl lg:text-7xl font-heading font-black text-white leading-[0.9] tracking-tight"
                >
                  {slides[current].headline.split(" ").map((w, i) =>
                    i === slides[current].headline.split(" ").length - 1 ? (
                      <span key={i} className="text-glow-gold" style={{ WebkitTextFillColor: "transparent", background: "linear-gradient(135deg,#c9a84c,#ffd700,#f0d070)", WebkitBackgroundClip: "text", backgroundClip: "text" }}>{w} </span>
                    ) : <span key={i}>{w} </span>
                  )}
                </motion.h1>
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
              <motion.p
                key={`sub-${current}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-white/60 text-base mb-8 font-light"
              >
                {slides[current].sub}
              </motion.p>
            </AnimatePresence>

            {/* Slide progress bar */}
            <div className="flex items-center gap-3 mb-10">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`slider-dot transition-all duration-500 ${i === current ? "active w-8" : "w-3"}`}
                />
              ))}
              <div className="ml-auto flex gap-2">
                <button onClick={prev} className="slider-arrow"><ChevronLeft className="w-4 h-4" /></button>
                <button onClick={next} className="slider-arrow"><ChevronRight className="w-4 h-4" /></button>
              </div>
            </div>

            {/* Connectivity list */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="text-[10px] uppercase tracking-[0.3em] text-[#c9a84c]/70 mb-4 font-semibold">Connectivity & Surroundings</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {connectivity.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.05 * i }}
                    className={`group flex items-start gap-3 p-3 rounded-xl transition-all duration-300 cursor-default ${item.highlight
                      ? "bg-gradient-to-r from-[#c9a84c]/12 to-transparent border border-[#c9a84c]/20 hover:border-[#ffd700]/35"
                      : "hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${item.highlight ? "bg-[#c9a84c]/20 border border-[#c9a84c]/30" : "bg-white/8 border border-white/10"} group-hover:border-[#c9a84c]/40`}>
                      <item.icon className={`w-3.5 h-3.5 ${item.highlight ? "text-[#c9a84c]" : "text-white/50"} group-hover:text-[#c9a84c] transition-colors`} />
                    </div>
                    <div>
                      <div className={`text-sm font-semibold ${item.highlight ? "text-[#f0d070]" : "text-white/85"} group-hover:text-white transition-colors leading-tight`}>{item.name}</div>
                      <div className="text-[11px] text-white/60 group-hover:text-white/80 transition-colors mt-0.5">{item.detail}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT — Big stats grid + map CTA */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            {/* Project title card */}
            <div className="glow-card rounded-3xl p-7">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.35em] text-[#c9a84c]/70 mb-2 font-semibold">Pavilion Group Development</div>
                  <h3 className="text-2xl font-heading font-black text-white">Pavilion Square KL</h3>
                  <p className="text-white/68 text-sm mt-1">Armani Hartajaya Sdn Bhd</p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#c9a84c]/20 to-[#c9a84c]/5 border border-[#c9a84c]/25 flex items-center justify-center">
                  <Building2 className="w-7 h-7 text-[#c9a84c]" />
                </div>
              </div>

              <p className="text-white/60 text-sm leading-relaxed mb-5">
                A 67-storey mixed landmark at the heart of Kuala Lumpur&apos;s Golden Triangle — directly connected to Pavilion KL Mall via an exclusive link bridge. Freehold, fully furnished, world-class.
              </p>

              {/* Key highlights */}
              <div className="flex flex-wrap gap-2">
                {["Freehold", "Direct Mall Link", "Sky Pool 118m", "67 Storeys", "Fully Furnished"].map((tag) => (
                  <span key={tag} className="feature-tag text-[11px]">{tag}</span>
                ))}
              </div>
            </div>

            {/* Stats grid */}
            <div ref={statsRef} className="glow-card rounded-3xl p-6">
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/55 mb-5 font-semibold">Project Highlights</div>
              <div className="grid grid-cols-3 gap-x-4 gap-y-6">
                {facts.map((f, i) => (
                  <StatItem key={f.label} {...f} delay={0.08 * i} />
                ))}
              </div>
            </div>

            {/* Map CTA */}
            <motion.a
              href="https://maps.google.com/?q=75A+Jalan+Raja+Chulan+Kuala+Lumpur"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="glow-card rounded-2xl p-4 flex items-center gap-4 cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#c9a84c]/20 to-[#c9a84c]/5 border border-[#c9a84c]/25 flex items-center justify-center flex-shrink-0 group-hover:border-[#ffd700]/45 group-hover:shadow-[0_0_20px_rgba(255,215,0,0.15)] transition-all duration-300">
                <MapPin className="w-6 h-6 text-[#c9a84c]" />
              </div>
              <div className="flex-1">
                <div className="text-white font-semibold text-sm group-hover:text-[#f0d070] transition-colors">75A Jalan Raja Chulan</div>
                <div className="text-white/62 text-xs">50200 Kuala Lumpur — Tap to open Maps</div>
              </div>
              <ArrowRight className="w-5 h-5 text-[#c9a84c]/60 group-hover:text-[#ffd700] group-hover:translate-x-1 transition-all duration-300" />
            </motion.a>

            {/* View on site CTA */}
            <div className="flex gap-3">
              <a href="#contact" className="btn-gold flex-1 text-center rounded-xl py-3.5">
                <Eye className="w-4 h-4" />Register Interest
              </a>
              <a href="#virtual-tour" className="btn-ghost-gold flex-1 text-center rounded-xl py-3.5">
                <Globe className="w-4 h-4" />Virtual Tour
              </a>
            </div>
          </motion.div>
        </div>

        {/* Slide counter */}
        <div className="relative z-20 text-center pb-8">
          <div className="inline-flex items-center gap-2 text-xs text-white/30">
            <span className="text-[#c9a84c]">{String(current + 1).padStart(2, "0")}</span>
            <span>/</span>
            <span>{String(slides.length).padStart(2, "0")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
