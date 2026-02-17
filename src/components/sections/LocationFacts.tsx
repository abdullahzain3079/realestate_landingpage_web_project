"use client";

import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from "framer-motion";
import { useRef, useState, useEffect, MouseEvent } from "react";
import { useInView } from "@/hooks/useAnimations";
import CountUp from "react-countup";
import { useInView as useInViewRIO } from "react-intersection-observer";
import { MapPin, Train, ShoppingBag, Building2, Landmark, TrendingUp, Timer, Ruler, RotateCcw, Map, Scan, Globe, Maximize, Minimize } from "lucide-react";
import Particles from "../ui/Particles";

const IMG = "https://www.pavillionsquare.com.my/wp-content/uploads/2025/07";
const TOUR_URL = "https://pavilionsquarekl.com/ISP/";

const quickFacts = [
  { icon: Building2, label: "Storeys", value: 67, suffix: "" },
  { icon: Landmark, label: "Luxury Units", value: 960, suffix: "+" },
  { icon: Ruler, label: "Land Size (Acres)", value: 2.023, suffix: "", decimals: 3 },
  { icon: TrendingUp, label: "Corporate Suites", value: 106, suffix: "" },
  { icon: Timer, label: "Infinity Pool (m)", value: 118, suffix: "" },
  { icon: ShoppingBag, label: "Facilities (sq.ft.)", value: 70000, suffix: "+", separator: "," },
];

const nearbyPlaces = [
  { name: "Pavilion KL Mall", distance: "Direct Link Bridge", icon: ShoppingBag },
  { name: "KLCC / Petronas Towers", distance: "1.5 km", icon: Building2 },
  { name: "Bukit Bintang MRT", distance: "Walking Distance", icon: Train },
  { name: "Raja Chulan Monorail", distance: "300m", icon: Train },
  { name: "KL Tower", distance: "1 km", icon: Landmark },
  { name: "Jalan Raja Chulan", distance: "Direct Frontage", icon: MapPin },
];

/* ── Holographic Card Component ───────────────────────── */
/* ── Crystal Tech Card Component ──────────────────────── */
function HoloCard({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ duration: 0.6, delay, type: "spring", stiffness: 200, damping: 20 }}
      className={`group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] ${className}`}
      onMouseMove={handleMouseMove}
    >
      {/* ── Glass Shimmer Effect ── */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100 z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.15),
              transparent 60%
            )
          `,
        }}
      />

      {/* ── Geometric Accents ── */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent opacity-20 blur-2xl rounded-bl-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gold/10 blur-xl rounded-tr-full pointer-events-none" />

      {/* ── Content ── */}
      <div className="relative z-20 h-full p-6 flex flex-col items-center justify-center">
        {children}
      </div>

      {/* ── Border Highlight ── */}
      <div className="absolute inset-0 rounded-2xl border border-white/5 pointer-events-none transition-colors group-hover:border-gold/30" />
    </motion.div>
  );
}

export default function LocationFacts() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const { ref: titleRef, isInView: titleVisible } = useInView();
  const { ref: counterRef, inView: counterInView } = useInViewRIO({ triggerOnce: true, threshold: 0.2 });
  const [tourLoaded, setTourLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { ref: tourTriggerRef, inView: tourInView } = useInViewRIO({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  return (
    <section id="location" ref={sectionRef} className="relative py-32 overflow-hidden bg-[#0e0f1a]">

      {/* ── Background: Cyber Grid & Particles ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-10"></div>

        <motion.div style={{ y: bgY }} className="absolute inset-0 opacity-60 mix-blend-screen">
          <img
            src={`${IMG}/Pavillion-Square-Street-View.webp`}
            alt="Background"
            className="w-full h-[120%] object-cover contrast-125 saturate-0 kenburns"
          />
        </motion.div>

        {/* Lighter Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e0f1a] via-[#0e0f1a]/40 to-[#0e0f1a] z-0"></div>

        <Particles className="absolute inset-0 z-20" quantity={40} staticity={30} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* ── Section Header: Typewriter Reveal ── */}
        <div ref={titleRef} className="text-center mb-24 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={titleVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/10 blur-[120px] rounded-full pointer-events-none"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={titleVisible ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-gold/40 bg-[#0e0f1a]/60 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(196,162,101,0.2)]"
          >
            <Globe className="w-3 h-3 text-gold animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold">Prime Coordinates</span>
          </motion.div>

          <h2 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white mb-8 tracking-tighter leading-[0.9] drop-shadow-2xl">
            <span className="block text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] text-4xl md:text-6xl mb-2 animate-pulse-slow">The Epicentre of</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#c4a265] via-[#e8d5a8] to-[#c4a265] bg-[length:200%_auto] animate-shimmer drop-shadow-[0_0_30px_rgba(196,162,101,0.4)]">
              Kuala Lumpur
            </span>
          </h2>

          <p className="text-white/90 max-w-2xl mx-auto text-lg font-light leading-relaxed drop-shadow-md">
            Situated on <span className="text-gold font-semibold animate-pulse">Jalan Raja Chulan</span> in the vibrant heart of Bukit Bintang.
            A melting pot where lives intersect — connected directly to Pavilion KL Mall.
          </p>
        </div>

        {/* ── Holo-Deck Stats Grid ── */}
        <div ref={counterRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-32">
          {quickFacts.map((stat, i) => (
            <HoloCard key={stat.label} delay={i * 0.1} className="h-full">

              <div className="mb-5 p-3 rounded-full bg-gradient-to-br from-white/10 to-transparent border border-white/10 shadow-inner group-hover:border-gold/50 transition-colors duration-500">
                <stat.icon className="w-6 h-6 text-white/80 group-hover:text-gold transition-colors duration-300" />
              </div>

              <div className="text-3xl lg:text-4xl font-heading font-bold mb-2 break-all sm:break-normal">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40 drop-shadow-lg filter group-hover:drop-shadow-[0_0_10px_rgba(196,162,101,0.5)] transition-all duration-300">
                  {counterInView ? (
                    <CountUp end={stat.value} duration={3.5} decimals={stat.decimals ?? 0} separator={stat.separator ?? ""} suffix={stat.suffix} />
                  ) : "0"}
                </span>
              </div>

              <div className="h-px w-10 bg-gradient-to-r from-transparent via-gold/50 to-transparent my-3 opacity-30 group-hover:opacity-100 group-hover:w-20 transition-all duration-500" />

              <div className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-medium text-center leading-relaxed group-hover:text-gold/80 transition-colors">
                {stat.label}
              </div>

            </HoloCard>
          ))}
        </div>

        {/* ── Interactive 360 Map Module ── */}
        <div className="grid lg:grid-cols-12 gap-6 items-stretch mb-32 h-auto lg:h-[600px]">

          {/* Left: Interactive Map Card */}
          <motion.div
            id="map-container"
            ref={tourTriggerRef}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className={`relative rounded-3xl overflow-hidden border border-gold/20 bg-[#0e0f1a] shadow-[0_0_40px_rgba(0,0,0,0.5)] group lg:col-span-8 h-full min-h-[400px] flex flex-col ${isFullscreen ? "fixed inset-0 z-[100] rounded-none" : ""
              }`}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-50 z-20"></div>

            {/* 360 Viewer */}
            <div className="relative w-full h-full bg-dark-card flex-grow">
              {!tourLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-dark-card z-10">
                  <Scan className="w-8 h-8 text-gold/50 animate-pulse mb-4" />
                  <span className="text-xs uppercase tracking-widest text-white/30">Initializing Satellite Feed...</span>
                </div>
              )}
              {tourInView && (
                <iframe
                  src={TOUR_URL}
                  className={`absolute inset-0 w-full h-full border-0 transition-opacity duration-1000 ${tourLoaded ? "opacity-100" : "opacity-0"}`}
                  allowFullScreen
                  loading="lazy"
                  onLoad={() => setTourLoaded(true)}
                />
              )}

              {/* Controls Overlay */}
              <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10 rounded-3xl z-20" />

              {/* Fullscreen Toggle */}
              <button
                onClick={() => {
                  const elem = document.getElementById('map-container');
                  if (!document.fullscreenElement) {
                    elem?.requestFullscreen().catch(err => {
                      console.error(`Error attempting to enable fullscreen: ${err.message}`);
                    });
                    setIsFullscreen(true);
                  } else {
                    document.exitFullscreen();
                    setIsFullscreen(false);
                  }
                }}
                className="absolute top-6 right-6 pointer-events-auto z-30 bg-black/60 backdrop-blur-md p-2 rounded-lg border border-white/10 text-white/70 hover:text-gold hover:bg-white/10 transition-all active:scale-95"
              >
                {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
              </button>
            </div>
          </motion.div>

          {/* Right: Connection Data */}
          <div className="lg:col-span-4 h-full flex flex-col">
            <div className="mb-6 shrink-0">
              <h3 className="text-3xl font-heading font-bold text-white mb-2 leading-tight drop-shadow-xl">
                Strategically <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-white to-gold animate-gradient-flow">Connected</span>
              </h3>
              <div className="h-1.5 w-24 bg-gradient-to-r from-gold to-transparent rounded-full opacity-80" />
            </div>

            <div className="flex-grow flex flex-col justify-between gap-2">
              {nearbyPlaces.map((place, i) => (
                <motion.div
                  key={place.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 p-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-gold/50 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(196,162,101,0.1)] transition-all duration-300 group cursor-pointer flex-1"
                >
                  <div className="p-2.5 rounded-lg bg-[#0e0f1a]/50 border border-white/10 group-hover:border-gold/50 transition-colors shadow-inner shrink-0">
                    <place.icon className="w-5 h-5 text-white/60 group-hover:text-gold transition-colors" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-white group-hover:text-gold transition-colors tracking-wide truncate">{place.name}</div>
                    <div className="text-[10px] text-white/50 font-mono group-hover:text-white/80 transition-colors truncate">{place.distance}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
