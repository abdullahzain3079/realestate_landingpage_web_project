"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useAnimations";
import { Eye, ExternalLink, RotateCcw, Compass, Building2, MapPin, Maximize2 } from "lucide-react";
import { useState } from "react";
import { useInView as useInViewRIO } from "react-intersection-observer";

const IMG_BASE = "https://www.pavillionsquare.com.my/wp-content/uploads/2025/07";
const TOUR_URL = "/pano-viewer.html";

const tourFeatures = [
  { icon: Compass, title: "360° Compass Navigation", desc: "Explore every direction with intuitive compass controls" },
  { icon: Building2, title: "Tower Selection", desc: "Switch between Residential Zones & Corporate Suites" },
  { icon: MapPin, title: "Interactive Landmarks", desc: "Discover nearby attractions and key locations" },
];

export default function VirtualTour() {
  const { ref: titleRef, isInView: titleVisible } = useInView();
  const [tourLoaded, setTourLoaded] = useState(false);
  const { ref: iframeTriggerRef, inView: shouldLoadIframe } = useInViewRIO({ triggerOnce: true, threshold: 0.05 });
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="virtual-tour" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 luxury-gradient" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(196,162,101,0.5) 1px, transparent 0)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={titleVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block text-[10px] uppercase tracking-[0.5em] text-gold mb-4"
          >
            Immersive Experience
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={titleVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-champagne mb-6"
          >
            360° Virtual
            <br />
            <span className="gold-gradient-text">Tour</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={titleVisible ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="section-divider mx-auto mb-6"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={titleVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-text-secondary max-w-2xl mx-auto font-light"
          >
            Step inside Pavilion Square from anywhere in the world.
            Navigate through every tower, explore the panoramic skyline, and discover interactive landmarks.
          </motion.p>
        </div>

        {/* ── Tour Feature Pills ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {tourFeatures.map((f, i) => (
            <div key={f.title} className="flex items-center gap-2 px-4 py-2 rounded-full bg-dark-card/60 border border-glass-border">
              <f.icon className="w-3.5 h-3.5 text-gold" />
              <span className="text-xs text-champagne font-medium">{f.title}</span>
            </div>
          ))}
        </motion.div>

        {/* ── VR Tour Embed — Cinematic Frame ── */}
        <motion.div
          ref={iframeTriggerRef}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8 }}
          className={`relative transition-all duration-700 ${isExpanded ? "fixed inset-0 z-[100] rounded-none p-0" : "rounded-2xl overflow-hidden glow-border-gold mb-12"}`}
        >
          {/* iframe embed */}
          <div className={`relative bg-dark-card ${isExpanded ? "w-full h-full" : "w-full aspect-[16/9]"}`}>
            {/* Loading skeleton */}
            {!tourLoaded && shouldLoadIframe && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-dark-card">
                <RotateCcw className="w-8 h-8 text-gold/60 animate-spin mb-3" style={{ animationDuration: "2s" }} />
                <span className="text-xs uppercase tracking-[0.4em] text-gold/50 font-medium">Initializing 360° Experience</span>
                <div className="mt-4 w-48 h-1 bg-dark-elevated rounded-full overflow-hidden">
                  <div className="h-full bg-gold/60 rounded-full shimmer-bar" />
                </div>
              </div>
            )}

            {shouldLoadIframe && (
              <iframe
                src={TOUR_URL}
                className={`absolute inset-0 w-full h-full border-0 transition-opacity duration-1000 ${tourLoaded ? "opacity-100" : "opacity-0"}`}
                allowFullScreen
                title="Pavilion Square KL — 360° Virtual Tour"
                onLoad={() => setTourLoaded(true)}
              />
            )}

            {/* Vignette for non-expanded */}
            {!isExpanded && (
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-dark-bg/30 via-transparent to-transparent z-[5]" />
            )}
          </div>

          {/* Labels & Controls */}
          <div className="absolute top-4 left-4 z-20">
            <div className="glass-panel-gold rounded-lg px-4 py-2 flex items-center gap-2">
              <RotateCcw className="w-3.5 h-3.5 text-gold animate-spin" style={{ animationDuration: "4s" }} />
              <span className="text-xs font-semibold text-gold tracking-widest uppercase">
                360° Interactive
              </span>
            </div>
          </div>

          <div className="absolute top-4 right-4 z-20 flex gap-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="glass-panel-gold rounded-lg px-3 py-2 flex items-center gap-2 hover:bg-gold/15 transition-colors cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5 text-gold" />
              <span className="text-[10px] font-medium text-gold tracking-widest uppercase hidden sm:inline">
                {isExpanded ? "Exit" : "Expand"}
              </span>
            </button>
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <a
            href={TOUR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gold text-dark-bg text-sm uppercase tracking-[0.2em] font-semibold hover:bg-gold-bright transition-colors glow-pulse"
          >
            <Eye className="w-4 h-4" />
            Launch Full Virtual Tour
          </a>
          <a
            href="https://www.pavillionsquare.com.my"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 border border-gold/30 text-gold text-sm uppercase tracking-[0.2em] font-medium hover:bg-gold/10 transition-all duration-500 hover:border-gold/60"
          >
            <ExternalLink className="w-4 h-4" />
            Visit Official Website
          </a>
        </motion.div>

        {/* Preview cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              img: `${IMG_BASE}/Pavillion-Square-Grand-Lobby-v1.webp`,
              title: "Grand Lobby",
              desc: "Experience the opulent arrival experience",
            },
            {
              img: `${IMG_BASE}/Pavillion-Square-Sky-Facilities.webp`,
              title: "Sky Facilities",
              desc: "Explore facilities 67 storeys above KL",
            },
            {
              img: `${IMG_BASE}/Pavillion-Square-Luxury-Residences-1.webp`,
              title: "Luxury Residences",
              desc: "Walk through our beautifully designed units",
            },
          ].map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="gradient-border-card group cursor-pointer overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-transparent" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-heading font-semibold text-champagne mb-1">{card.title}</h3>
                <p className="text-xs text-text-muted">{card.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
