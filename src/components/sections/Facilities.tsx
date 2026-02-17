"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { useInView } from "@/hooks/useAnimations";
import {
  Waves, Dumbbell, Sparkles, TreePine, Utensils, Gamepad2,
  BookOpen, Music, Baby, Wind, Sun, Coffee,
} from "lucide-react";

const IMG = "https://www.pavillionsquare.com.my/wp-content/uploads/2025/07";

type FacilityLevel = {
  level: string; title: string; subtitle: string; description: string;
  image: string; features: string[];
};

const levels: FacilityLevel[] = [
  {
    level: "Level 67",
    title: "118-Metre Infinity Pool",
    subtitle: "Rooftop Crown Jewel",
    description: "67 storeys above Kuala Lumpur, our rooftop infinity pool offers breathtaking views of the city. The longest rooftop infinity pool in Kuala Lumpur City Centre.",
    image: `${IMG}/Pavillion-Square-Sky-Facilities.webp`,
    features: ["118m Infinity Pool", "Sky Lounge", "Jacuzzi", "Sun Deck", "Panoramic KL Views"],
  },
  {
    level: "Level 66",
    title: "Sky Facilities",
    subtitle: "A Sanctuary Above the City",
    description: "An elevated sanctuary offering a harmonious blend of modern elegance and peaceful retreat amid the bustling cityscape, perfect for relaxation and enjoyment.",
    image: `${IMG}/Pavillion-Square-Facility-v1.webp`,
    features: ["Sky Terrace", "Entertainment Lounge", "BBQ Area", "Private Dining", "Event Space"],
  },
  {
    level: "Level 63A",
    title: "Sky Wellness",
    subtitle: "The Largest in KL City Centre",
    description: "15,000 sq.ft. of fitness facilities — the highest and largest Sky Wellness floor in Kuala Lumpur City Centre. Featuring fully-equipped indoor and outdoor gym with branded equipment.",
    image: `${IMG}/Pavillion-Square-Facility-v1.webp`,
    features: ["Indoor Gym", "Outdoor Gym", "Yoga Studio", "Sauna & Steam", "Sports Lounge"],
  },
  {
    level: "Level 12",
    title: "Courtyard Garden",
    subtitle: "Community Living",
    description: "Courtyard Garden features versatile indoor and outdoor spaces such as the Function Room, Entertainment Room, and BBQ Deck, perfect for gatherings and creating memories.",
    image: `${IMG}/Pavillion-Square-level12.webp`,
    features: ["Function Room", "Entertainment Room", "BBQ Deck", "Children's Play", "Garden Lounge"],
  },
];

const amenityIcons = [
  { icon: Waves, label: "Infinity Pool" },
  { icon: Dumbbell, label: "Gym" },
  { icon: Sparkles, label: "Spa & Sauna" },
  { icon: TreePine, label: "Gardens" },
  { icon: Utensils, label: "Gourmet Kitchen" },
  { icon: Gamepad2, label: "Game Room" },
  { icon: BookOpen, label: "Library" },
  { icon: Music, label: "Function Room" },
  { icon: Baby, label: "Nursery" },
  { icon: Wind, label: "Yoga Pavilion" },
  { icon: Coffee, label: "Sky Lounge" },
  { icon: Sun, label: "Sun Deck" },
];

export default function Facilities() {
  const [activeLevel, setActiveLevel] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const progressWidth = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);
  const { ref: titleRef, isInView: titleVisible } = useInView();

  return (
    <section id="facilities" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 luxury-gradient" />
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "linear-gradient(rgba(196,162,101,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(196,162,101,0.3) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={titleVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block text-[10px] uppercase tracking-[0.5em] text-gold mb-4"
          >
            Lifestyle Facilities
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={titleVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-champagne mb-6"
          >
            Over 70,000 sq.ft. of
            <br />
            <span className="gold-gradient-text">Lifestyle Facilities</span>
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
            Indulge in world-class amenities spread across four dedicated floors,
            including the longest rooftop infinity pool in KL City Centre.
          </motion.p>
        </div>

        {/* Level Selector Tabs */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {levels.map((lvl, i) => (
            <button
              key={lvl.level}
              onClick={() => setActiveLevel(i)}
              className={`px-5 py-3 text-xs uppercase tracking-widest font-medium transition-all duration-500 border ${activeLevel === i
                  ? "bg-gold text-dark-bg border-gold"
                  : "bg-dark-card/50 border-glass-border text-text-secondary hover:text-gold hover:border-gold/30"
                }`}
            >
              {lvl.level}
            </button>
          ))}
        </div>

        {/* Active Level Display */}
        <motion.div
          key={activeLevel}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-10 items-center mb-20"
        >
          {/* Image */}
          <div className="relative">
            <div className="img-zoom rounded-2xl overflow-hidden">
              <img
                src={levels[activeLevel].image}
                alt={levels[activeLevel].title}
                className="w-full aspect-[16/10] object-cover"
              />
            </div>
            {/* Level badge */}
            <div className="absolute top-4 left-4 glass-panel-gold rounded-lg px-4 py-2">
              <div className="text-xs font-semibold text-gold tracking-widest uppercase">{levels[activeLevel].level}</div>
            </div>
            {/* Floating stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-6 right-4 glass-panel rounded-xl px-5 py-3 shadow-2xl"
            >
              <div className="text-xl font-bold gold-gradient-text">
                {activeLevel === 0 ? "118m" : activeLevel === 2 ? "15,000 sq.ft." : "70,000+"}
              </div>
              <div className="text-[9px] uppercase tracking-widest text-text-muted">
                {activeLevel === 0 ? "Pool Length" : activeLevel === 2 ? "Fitness Area" : "Total Facilities"}
              </div>
            </motion.div>
          </div>

          {/* Info */}
          <div className="lg:pl-6">
            <div className="text-xs uppercase tracking-[0.4em] text-gold mb-3">{levels[activeLevel].subtitle}</div>
            <h3 className="text-3xl md:text-4xl font-heading font-bold text-champagne mb-5">{levels[activeLevel].title}</h3>
            <p className="text-text-secondary font-light leading-relaxed mb-8">{levels[activeLevel].description}</p>
            <div className="grid grid-cols-2 gap-3">
              {levels[activeLevel].features.map((feature, i) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-dark-card/50 border border-glass-border"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                  <span className="text-sm text-champagne">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Progress bar */}
        <div className="w-full h-px bg-dark-card mb-16 relative">
          <motion.div className="h-full bg-gold" style={{ width: progressWidth }} />
        </div>

        {/* Amenities Grid — improved icon containers */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-center text-xl font-heading text-champagne mb-8">
            Complete Amenities
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {amenityIcons.map((amenity, i) => (
              <motion.div
                key={amenity.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="gradient-border-card p-5 text-center group hover:bg-dark-elevated transition-colors duration-500 cursor-default"
              >
                <div className="icon-luxury mx-auto mb-3">
                  <amenity.icon className="w-5 h-5 text-gold" />
                </div>
                <div className="text-[10px] uppercase tracking-widest text-text-muted group-hover:text-champagne transition-colors">{amenity.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Full-width facility images strip */}
        <div className="mt-16 flex gap-3 overflow-hidden">
          {[
            `${IMG}/Pavillion-Square-Luxury-Residences-1.webp`,
            `${IMG}/Pavillion-Square-Luxury-Residences-2.webp`,
            `${IMG}/Pavillion-Square-Luxury-Residences-3.webp`,
            `${IMG}/Pavillion-Square-Grand-Lobby-v2.webp`,
          ].map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex-1 img-zoom rounded-xl overflow-hidden"
            >
              <img src={src} alt={`Facility ${i + 1}`} className="w-full aspect-[3/4] object-cover" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
