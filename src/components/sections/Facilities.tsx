"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Waves, Dumbbell, TreePine, Gamepad2, Wind, Sun, Coffee,
  ChevronLeft, ChevronRight, CheckCircle, Flame, Star, Users
} from "lucide-react";

/* ── Levels data ─────────────────────────────────────── */
const levels = [
  {
    id: "L67",
    level: "Level 67",
    headline: "118-Metre Infinity Pool",
    tagline: "Highest Rooftop Pool in KL City Centre",
    description:
      "67 storeys above Kuala Lumpur — plunge into the longest rooftop infinity pool in the city. At 118 metres, this sky-high oasis offers breathtaking 360° panoramic views of the KL skyline, surrounded by a sun deck, sky lounge, and private Jacuzzi.",
    image: "/page_9_img_1.jpeg",
    bgImage: "/page_9_img_1.jpeg",
    stat: "118m",
    statLabel: "Pool Length",
    accent: "#06b6d4",
    features: ["118m Infinity Pool", "Sky Lounge & Bar", "Private Jacuzzi", "Sun Deck Cabanas", "Panoramic KL Views", "Poolside Dining"],
    icon: Waves,
  },
  {
    id: "L66",
    level: "Level 66",
    headline: "Sky Facilities Deck",
    tagline: "Entertainment Above the Clouds",
    description:
      "A curated sky-high sanctuary blending modern sophistication with peaceful retreat. BBQ terraces, private dining, an entertainment lounge — making Level 66 the ultimate destination for gatherings above Kuala Lumpur.",
    image: "/page_10_img_2.jpeg",
    bgImage: "/page_10_img_2.jpeg",
    stat: "Level 66",
    statLabel: "Sky Deck",
    accent: "#f59e0b",
    features: ["Sky Terrace", "BBQ & Dining", "Entertainment Lounge", "Outdoor Cinema", "Private Function Rooms", "Alfresco Seating"],
    icon: Flame,
  },
  {
    id: "L63A",
    level: "Level 63A",
    headline: "Sky Wellness Centre",
    tagline: "Largest Sky Gym in KL City Centre",
    description:
      "15,000 sq.ft. of world-class wellness facilities — the highest and most expansive Sky Wellness floor in Kuala Lumpur. World-class gym equipment, yoga studios, sauna & steam rooms, and outdoor fitness decks.",
    image: "/page_11_img_1.jpeg",
    bgImage: "/page_12_img_1.jpeg",
    stat: "15,000",
    statLabel: "sq.ft. Wellness",
    accent: "#10b981",
    features: ["Indoor Sky Gym", "Outdoor Fitness Deck", "Yoga & Pilates Studio", "Sauna & Steam Room", "Sports Lounge", "Meditation Garden"],
    icon: Dumbbell,
  },
  {
    id: "L12",
    level: "Level 12",
    headline: "Courtyard Garden",
    tagline: "A Community at the Heart of It All",
    description:
      "A lushly landscaped 30,000 sq.ft. garden paradise at 12 storeys above street level — featuring a serene walk trail, kids playground, yoga deck, BBQ deck, multi-purpose hall, karaoke, pool table, and a club lounge.",
    image: "/page_13_img_1.jpeg",
    bgImage: "/page_14_img_1.jpeg",
    stat: "30K sqft",
    statLabel: "Garden Level",
    accent: "#84cc16",
    features: ["Serene Trail & Garden", "Kids Playground", "BBQ Deck", "Multi-purpose Hall", "Club Lounge", "Karaoke & Games Room"],
    icon: TreePine,
  },
];

/* ── Strip images ────────────────────────────────────── */
const stripImages = [
  "/page_9_img_1.jpeg",
  "/page_8_img_1.jpeg",
  "/page_10_img_2.jpeg",
  "/page_11_img_1.jpeg",
  "/page_12_img_1.jpeg",
  "/page_14_img_1.jpeg",
  "/page_9_img_1.jpeg",
  "/page_13_img_1.jpeg",
];

export default function Facilities() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const active = levels[activeIdx];

  /* Auto-advance levels */
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActiveIdx((i) => (i + 1) % levels.length), 6000);
    return () => clearInterval(t);
  }, [paused]);

  const selectLevel = (i: number) => { setActiveIdx(i); setPaused(true); setTimeout(() => setPaused(false), 10000); };

  return (
    <section id="facilities" ref={sectionRef} className="relative min-h-screen overflow-hidden bg-[#060914]">

      {/* Full-bleed background per level */}
      {levels.map((l, i) => (
        <motion.div
          key={l.id}
          className="absolute inset-0"
          animate={{ opacity: i === activeIdx ? 1 : 0 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={l.bgImage} alt={l.headline} className="w-full h-full object-cover kb-zoom-bg" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060914]/96 via-[#0e0c14]/80 to-[#060914]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060914]/90 via-transparent to-[#060914]/50" />
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col max-w-7xl mx-auto w-full px-4 sm:px-6 py-16 sm:py-28">

        {/* Section heading */}
        <div className="mb-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-badge mb-5"
          >
            <Star className="w-3 h-3" />
            World-Class Lifestyle Amenities
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white leading-tight"
          >
            Sky-High <em style={{ fontStyle: "normal", WebkitTextFillColor: "transparent", background: "linear-gradient(135deg,#c9a84c,#ffd700)", WebkitBackgroundClip: "text", backgroundClip: "text" }}>Facilities</em>
            <br />Like No Other
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ transformOrigin: "left center" }}
            className="section-divider mt-4"
          />
        </div>

        {/* Level tabs */}
        <div className="flex gap-1 mb-8 sm:mb-10 border-b border-white/10 overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          {levels.map((l, i) => (
            <button
              key={l.id}
              onClick={() => selectLevel(i)}
              className={`tab-pill ${i === activeIdx ? "active" : ""}`}
            >
              <span className="mr-1.5 text-[10px]">{l.id}</span>
              {l.headline.split(" ").slice(0, 2).join(" ")}
            </button>
          ))}
        </div>

        {/* Main content area */}
        <div className="flex-1 grid lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 items-start">

          {/* Left — details */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Level badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-[11px] uppercase tracking-widest font-bold"
                  style={{ background: `${active.accent}18`, border: `1px solid ${active.accent}35`, color: active.accent }}>
                  <active.icon className="w-3.5 h-3.5" />
                  {active.level}
                </div>

                <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black text-white mb-2">
                  {active.headline}
                </h3>
                <div className="text-[#c9a84c]/80 text-sm mb-4 font-medium">{active.tagline}</div>
                <p className="text-white/65 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-[15px]">{active.description}</p>

                {/* Features grid */}
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5 mb-4 sm:mb-6">
                  {active.features.map((f) => (
                    <motion.div
                      key={f}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#c9a84c]/30 hover:bg-[#c9a84c]/8 transition-all duration-300 group"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-[#c9a84c] flex-shrink-0" />
                      <span className="text-xs text-white/75 group-hover:text-white/95 transition-colors font-medium">{f}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Big stat */}
                <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#c9a84c]/12 to-transparent border border-[#c9a84c]/20">
                  <div>
                    <div className="text-2xl sm:text-4xl font-heading font-black stat-number leading-none">{active.stat}</div>
                    <div className="text-xs uppercase tracking-widest text-white/45 mt-1">{active.statLabel}</div>
                  </div>
                  <div className="ml-auto">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: `${active.accent}15`, border: `1px solid ${active.accent}30` }}>
                      <active.icon className="w-7 h-7" style={{ color: active.accent }} />
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right — image + level nav */}
          <div className="lg:col-span-2 flex flex-col gap-2 sm:gap-4 order-first lg:order-last">
            {/* Main image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`img-${active.id}`}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.03 }}
                transition={{ duration: 0.7 }}
                className="relative aspect-[16/10] sm:aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 img-card-hover"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={active.image} alt={active.headline} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060914]/70 via-transparent to-transparent" />
                <div
                  className="absolute top-4 left-4 text-xs uppercase tracking-widest font-bold px-3 py-1.5 rounded-full"
                  style={{ background: `${active.accent}25`, border: `1px solid ${active.accent}40`, color: active.accent }}
                >
                  {active.level}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Level cards grid */}
            <div className="grid grid-cols-2 gap-2">
              {levels.map((l, i) => (
                <button
                  key={l.id}
                  onClick={() => selectLevel(i)}
                  className={`relative overflow-hidden rounded-xl sm:rounded-2xl p-2 sm:p-3.5 text-left transition-all duration-400 border ${i === activeIdx
                    ? "border-[#c9a84c]/45 bg-gradient-to-br from-[#c9a84c]/15 to-[#c9a84c]/5 shadow-[0_0_20px_rgba(201,168,76,0.1)]"
                    : "border-white/8 bg-white/5 hover:border-white/20 hover:bg-white/8"}`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <l.icon className={`w-4 h-4 ${i === activeIdx ? "text-[#c9a84c]" : "text-white/40"}`} />
                    <span className={`text-[10px] uppercase tracking-wider font-bold ${i === activeIdx ? "text-[#c9a84c]" : "text-white/40"}`}>{l.id}</span>
                  </div>
                  <div className={`text-xs font-semibold leading-tight ${i === activeIdx ? "text-white" : "text-white/55"}`}>
                    {l.headline.split(" ").slice(0, 3).join(" ")}
                  </div>
                  {/* Active indicator */}
                  {i === activeIdx && (
                    <motion.div layoutId="level-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#c9a84c] to-[#ffd700]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Image strip */}
        <div className="mt-10 overflow-hidden">
          <div className="flex gap-3" style={{ animation: "marquee 35s linear infinite", width: "max-content" }}>
            {[...stripImages, ...stripImages].map((src, i) => (
              <div key={i} className="w-20 h-14 sm:w-32 sm:h-20 rounded-lg sm:rounded-xl overflow-hidden flex-shrink-0 border border-white/10 img-card-hover">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gold line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/50 to-transparent" />
    </section>
  );
}
