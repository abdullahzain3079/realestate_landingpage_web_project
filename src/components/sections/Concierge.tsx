"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Sparkles, Car, Eye, Building2, ConciergeBell, CheckCircle,
  Star, Shield, ChevronLeft, ChevronRight, Anchor, Home,
} from "lucide-react";

const bgSlides = [
  { src: "/page_18_img_1.jpeg", label: "Grand Entrance Lobby" },
  { src: "/page_9_img_1.jpeg", label: "L67 Infinity Sky Pool" },
  { src: "/page_10_img_2.jpeg", label: "L66 Sky Garden & Lounge" },
  { src: "/page_4_img_3.jpeg", label: "Facade - Jalan Bukit Bintang" },
  { src: "/page_15_img_3.jpeg", label: "Residence Interior" },
  { src: "/page_15_img_5.jpeg", label: "Premium Suite" },
];

// OFFICIAL CONCIERGE SERVICES from Quick Fact for PSQ.docx
const officialServices = [
  {
    icon: Sparkles,
    title: "Housekeeping & Cleaning",
    subtitle: "Official Service",
    desc: "Professional housekeeping tailored to your schedule - from daily tidying to comprehensive deep cleans, ensuring your residence is always immaculate.",
    color: "#6ee7b7",
    glow: "rgba(110,231,183,0.22)",
  },
  {
    icon: Anchor,
    title: "Limousine, Private Jet & Yacht",
    subtitle: "Official Service",
    desc: "Bespoke land, air and sea arrangements - luxury chauffeur-driven transfers, private aviation bookings and exclusive yacht charter coordination.",
    color: "#7dd3fc",
    glow: "rgba(125,211,252,0.22)",
  },
  {
    icon: Building2,
    title: "Property Management & Viewing",
    subtitle: "Official Service",
    desc: "End-to-end property management - maintenance coordination, rental yield optimisation and private showflat viewings for prospective buyers.",
    color: "#c9a84c",
    glow: "rgba(201,168,76,0.28)",
  },
];

const extraServices = [
  { icon: ConciergeBell, title: "24/7 Concierge Desk", desc: "Round-the-clock personal concierge - restaurant reservations, event tickets and exclusive access." },
  { icon: Shield, title: "Multi-Tier Security", desc: "Advanced CCTV, card-access and on-site security personnel providing absolute resident safety." },
  { icon: Home, title: "Fully Furnished Units", desc: "Every residence and corporate suite delivered exclusively fully furnished - move in from day one." },
  { icon: Car, title: "Valet & Drop-off", desc: "Designer drop-off portico with dedicated valet parking for residents and guests." },
  { icon: Eye, title: "Private Viewings", desc: "After-hours showflat viewings arranged by appointment through the dedicated concierge team." },
  { icon: Star, title: "Pavilion KL Link", desc: "Pedestrian link bridge to Pavilion KL - 450+ retail, dining and entertainment options." },
];

// Project facts verified from Quick Fact for PSQ.docx
const projectFacts = [
  { label: "Developer", value: "Armani Hartajaya Sdn Bhd", sub: "Under Pavilion Group" },
  { label: "Tenure", value: "Leasehold 2122", sub: "Fully secure holding" },
  { label: "Completion", value: "Year 2030", sub: "58 months from SPA" },
  { label: "Title", value: "Commercial HDA", sub: "Serviced Residence" },
];

const stats = [
  { value: "960", label: "Luxury Residences" },
  { value: "106", label: "Corporate Suites" },
  { value: "70K", label: "sq.ft. Facilities" },
  { value: "24/7", label: "Concierge" },
];

export default function Concierge() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [activeExtra, setActiveExtra] = useState<number | null>(null);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setCurrent((c) => (c + 1) % bgSlides.length), 5500);
    return () => clearInterval(t);
  }, [paused]);

  const goTo = (i: number) => { setCurrent(i); setPaused(true); setTimeout(() => setPaused(false), 9000); };
  const prev = () => goTo((current - 1 + bgSlides.length) % bgSlides.length);
  const next = () => goTo((current + 1) % bgSlides.length);

  return (
    <section id="concierge" className="relative min-h-screen overflow-hidden bg-[#060914]">

      {/* BG Slider */}
      {bgSlides.map((s, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          animate={{ opacity: i === current ? 1 : 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={s.src}
            alt={s.label}
            className="w-full h-full object-cover kb-zoom-bg"
            style={{ filter: "brightness(0.35) saturate(0.8)" }}
          />
        </motion.div>
      ))}
      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#060914]/98 via-[#060914]/78 to-[#060914]/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#060914] via-transparent to-[#060914]/55" />
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: "radial-gradient(ellipse 60% 50% at 70% 50%, rgba(201,168,76,1) 0%, transparent 70%)" }}
      />

      {/* BG Controls */}
      <div className="absolute bottom-4 sm:bottom-10 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-6 flex flex-col items-center sm:items-end gap-2 z-20">
        <div className="flex items-center gap-2">
          <button onClick={prev} className="slider-arrow w-9 h-9"><ChevronLeft className="w-3.5 h-3.5" /></button>
          <div className="flex gap-1.5">
            {bgSlides.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} className={`slider-dot ${i === current ? "active" : ""}`} />
            ))}
          </div>
          <button onClick={next} className="slider-arrow w-9 h-9"><ChevronRight className="w-3.5 h-3.5" /></button>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-[10px] text-white/30 italic text-right"
          >
            {bgSlides[current].label}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 pt-16 pb-12 sm:pt-28 sm:pb-24">

        {/* Header */}
        <div className="mb-14">
          <motion.div
            initial={{ opacity: 0, y: -18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-badge mb-5"
          >
            <ConciergeBell className="w-3 h-3" />White-Glove Living &middot; Pavilion Group
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white leading-tight"
          >
            Concierge &amp; <br className="hidden md:block" />
            <span style={{ WebkitTextFillColor: "transparent", background: "linear-gradient(135deg,#c9a84c 0%,#ffd700 50%,#f0d070 100%)", WebkitBackgroundClip: "text", backgroundClip: "text" }}>
              Lifestyle Services
            </span>
          </motion.h2>
          <div className="section-divider mt-4 mb-5" />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-white/72 text-[15px] leading-relaxed max-w-xl"
          >
            Pavilion Square, developed by{" "}
            <strong className="text-[#e8c050] font-bold">Armani Hartajaya Sdn Bhd under Pavilion Group</strong>,
            delivers an unrivalled suite of bespoke concierge services for residents who expect nothing less than extraordinary.
          </motion.p>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-10 sm:mb-14"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.value}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glow-card rounded-xl sm:rounded-2xl text-center py-4 sm:py-6 px-2 sm:px-3"
            >
              <div className="text-xl sm:text-3xl md:text-4xl font-heading font-bold stat-number">{s.value}</div>
              <div className="text-[11px] text-white/60 uppercase tracking-[0.22em] font-semibold">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-10">

          {/* Official Services + Extra grid */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            <div className="text-[10px] uppercase tracking-[0.35em] text-[#c9a84c]/70 font-bold mb-1">
              Official Pavilion Concierge Services
            </div>

            {/* 3 official cards with glow-card border animation */}
            <div className="flex flex-col gap-3 sm:gap-4">
              {officialServices.map((svc, i) => (
                <motion.div
                  key={svc.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 border border-[#c9a84c]/30 rounded-xl sm:rounded-2xl p-3 sm:p-6 flex gap-3 sm:gap-5 items-start hover:border-[#c9a84c]/60 hover:bg-white/10 transition-colors duration-300"
                >
                  <div
                    className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${svc.glow}, transparent)`,
                      border: `1.5px solid ${svc.color}44`,
                      boxShadow: `0 0 20px ${svc.glow}`,
                    }}
                  >
                    <svc.icon className="w-5 h-5 sm:w-7 sm:h-7" style={{ color: svc.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="text-[13px] sm:text-[15px] font-bold text-white">{svc.title}</span>
                      <span
                        className="text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-[0.18em]"
                        style={{
                          background: `${svc.color}18`,
                          border: `1px solid ${svc.color}35`,
                          color: svc.color,
                        }}
                      >
                        {svc.subtitle}
                      </span>
                    </div>
                    <p className="text-[11px] sm:text-[13px] text-white/72 leading-relaxed">{svc.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Extra services compact grid */}
            <div className="mt-2">
              <div className="text-[10px] uppercase tracking-[0.35em] text-white/35 font-bold mb-3">
                Additional Premium Services
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
                {extraServices.map((svc, i) => (
                  <motion.div
                    key={svc.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    onMouseEnter={() => setActiveExtra(i)}
                    onMouseLeave={() => setActiveExtra(null)}
                    className="bg-white/5 border border-[#c9a84c]/25 rounded-lg sm:rounded-xl p-3 sm:p-4 flex flex-col gap-2 sm:gap-2.5 cursor-default hover:bg-white/10 hover:border-[#c9a84c]/50 transition-all duration-300"
                  >
                    <div
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-300"
                      style={{
                        background: activeExtra === i ? "rgba(201,168,76,0.18)" : "rgba(255,255,255,0.05)",
                        border: `1px solid ${activeExtra === i ? "rgba(201,168,76,0.5)" : "rgba(255,255,255,0.1)"}`,
                        boxShadow: activeExtra === i ? "0 0 14px rgba(201,168,76,0.25)" : "none",
                      }}
                    >
                      <svc.icon
                        className="w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-300"
                        style={{ color: activeExtra === i ? "#ffd700" : "rgba(255,255,255,0.6)" }}
                      />
                    </div>
                    <div>
                      <div className="text-[11px] sm:text-[13px] font-bold text-white mb-1 leading-tight">{svc.title}</div>
                      <div className="text-[10px] sm:text-[11px] text-white/60 leading-relaxed">{svc.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-4"
          >
            {/* Project facts */}
            <div className="bg-[#0e0c12]/60 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-[#c9a84c]/12 border border-[#c9a84c]/25 flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-[#c9a84c]" />
                </div>
                <span className="text-sm font-bold text-white">Project Overview</span>
              </div>
              <div className="flex flex-col gap-0">
                {projectFacts.map((f) => (
                  <div key={f.label} className="flex items-start justify-between gap-3 py-3 border-b border-white/6 last:border-0">
                    <span className="text-[11px] text-white/45 uppercase tracking-[0.14em] font-semibold flex-shrink-0">
                      {f.label}
                    </span>
                    <div className="text-right">
                      <div className="text-[13px] font-bold text-white/92">{f.value}</div>
                      <div className="text-[10px] text-white/38">{f.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div className="bg-[#0e0c12]/60 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-4 h-4 text-[#c9a84c] fill-[#c9a84c]" />
                <span className="text-sm font-bold text-white">Why Pavilion Square?</span>
              </div>
              <ul className="flex flex-col gap-3">
                {[
                  "Exclusively fully furnished  move-in ready",
                  "Direct link bridge to Pavilion KL Mall",
                  "Opposite Pavilion KL, Jalan Bukit Bintang",
                  "Commercial HDA title  full legal protection",
                  "70,000 sq.ft. lifestyle facilities, 4 levels",
                  "Leasehold till 2122  96+ years remaining",
                ].map((h) => (
                  <li key={h} className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#c9a84c] flex-shrink-0 mt-0.5" />
                    <span className="text-[13px] text-white/75 leading-relaxed">{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tagline */}
            <div className="relative rounded-2xl overflow-hidden p-5 bg-gradient-to-br from-[#c9a84c]/15 to-[#192050]/40 border border-[#c9a84c]/25">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/70 to-transparent" />
              <div className="text-[10px] uppercase tracking-[0.3em] text-[#c9a84c]/65 font-semibold mb-2.5">Our Promise</div>
              <p className="text-white/82 text-[13px] leading-relaxed italic">
                &ldquo;From the moment you arrive to every quiet evening at home &mdash; invisible, indispensable, and always exceptional.&rdquo;
              </p>
              <div className="mt-3 text-[10px] text-white/32"> Pavilion Square Concierge Team</div>
            </div>

            <a href="#contact" className="btn-gold rounded-xl py-3 sm:py-4 justify-center w-full">
              <ConciergeBell className="w-4 h-4" />Register Your Interest
            </a>
            <a
              href="https://wa.link/kgsiw7"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost-gold rounded-xl py-3 sm:py-4 justify-center w-full"
            >
              <Anchor className="w-4 h-4" />WhatsApp Enquiry
            </a>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/50 to-transparent" />
    </section>
  );
}