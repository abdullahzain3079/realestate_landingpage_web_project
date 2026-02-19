"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { BedDouble, Bath, Maximize2, ChevronLeft, ChevronRight, X, ArrowRight, MessageSquare, Building2, Star, Eye } from "lucide-react";

/* ── Unit types ──────────────────────────────────────── */
const residentialUnits = [
  {
    type: "Type A", label: "Studio",
    sqft: 504, sqm: 46.8, beds: 0, baths: 1,
    floors: "L13A–37 & L39–62",
    image: "/page_15_img_1.jpeg",
    bgImage: "/page_15_img_1.jpeg",
    price: "From RM 800K",
    features: ["Open-plan layout", "Premium finishes", "City view", "Fully furnished"],
    highlight: false,
  },
  {
    type: "Type B1", label: "1 Bedroom",
    sqft: 614, sqm: 57.0, beds: 1, baths: 1,
    floors: "L13A–62",
    image: "/page_15_img_2.jpeg",
    bgImage: "/page_15_img_2.jpeg",
    price: "From RM 980K",
    features: ["Separate bedroom", "Balcony", "Designer kitchen", "Fully furnished"],
    highlight: false,
  },
  {
    type: "Type B2", label: "1 Bedroom",
    sqft: 678, sqm: 63.0, beds: 1, baths: 1,
    floors: "L13A–62",
    image: "/page_15_img_3.jpeg",
    bgImage: "/page_15_img_3.jpeg",
    price: "From RM 1.1M",
    features: ["Generous living area", "Wraparound views", "Luxury bathroom", "Fully furnished"],
    highlight: false,
  },
  {
    type: "Type C1", label: "2 Bedrooms",
    sqft: 872, sqm: 81.0, beds: 2, baths: 2,
    floors: "L13A–62",
    image: "/page_15_img_4.jpeg",
    bgImage: "/page_15_img_4.jpeg",
    price: "From RM 1.4M",
    features: ["Dual master", "Full kitchen", "Entertainment area", "Fully furnished"],
    highlight: true,
  },
  {
    type: "Type C2", label: "2 Bedrooms",
    sqft: 958, sqm: 89.0, beds: 2, baths: 2,
    floors: "L13A–62",
    image: "/page_15_img_5.jpeg",
    bgImage: "/page_15_img_5.jpeg",
    price: "From RM 1.55M",
    features: ["Corner unit", "Panoramic views", "Double vanity", "Fully furnished"],
    highlight: false,
  },
  {
    type: "Type C3", label: "2 Bedrooms",
    sqft: 1023, sqm: 95.0, beds: 2, baths: 2,
    floors: "L13A–62",
    image: "/page_15_img_1.jpeg",
    bgImage: "/page_15_img_1.jpeg",
    price: "From RM 1.65M",
    features: ["Premium floor level", "Extended balcony", "High-spec fit-out", "Fully furnished"],
    highlight: false,
  },
  {
    type: "Type C4", label: "2 Bedrooms",
    sqft: 1131, sqm: 105.1, beds: 2, baths: 2,
    floors: "L13A–62",
    image: "/page_15_img_2.jpeg",
    bgImage: "/page_15_img_2.jpeg",
    price: "From RM 1.8M",
    features: ["Dual-aspect view", "Walk-in wardrobe", "Luxury bathtub", "Fully furnished"],
    highlight: false,
  },
  {
    type: "Type D", label: "3 Bedrooms",
    sqft: 1272, sqm: 118.2, beds: 3, baths: 3,
    floors: "L13A–62",
    image: "/page_15_img_4.jpeg",
    bgImage: "/page_15_img_4.jpeg",
    price: "From RM 2.1M",
    features: ["Flagship unit", "Sky views all sides", "3 en-suite baths", "Fully furnished"],
    highlight: true,
  },
];

const corporateUnits = [
  {
    type: "Office 1", label: "Corporate Suite",
    sqft: 2464, sqm: 228.9, beds: 0, baths: 2,
    floors: "Office Tower",
    image: "/page_16_img_1.jpeg",
    bgImage: "/page_16_img_1.jpeg",
    price: "From RM 3.8M",
    features: ["Boardroom ready", "Prestige address", "KLCC views", "Smart system"],
    highlight: true,
  },
  {
    type: "Office 2", label: "Corporate Suite",
    sqft: 1093, sqm: 101.6, beds: 0, baths: 1,
    floors: "Office Tower",
    image: "/page_17_img_1.jpeg",
    bgImage: "/page_17_img_1.jpeg",
    price: "From RM 1.7M",
    features: ["Mid-size suite", "Flexible layout", "High-speed fibre", "Smart system"],
    highlight: false,
  },
  {
    type: "Office 3", label: "Corporate Suite",
    sqft: 1547, sqm: 143.7, beds: 0, baths: 1,
    floors: "Office Tower",
    image: "/page_17_img_2.jpeg",
    bgImage: "/page_17_img_2.jpeg",
    price: "From RM 2.4M",
    features: ["Full-floor option", "Business lounge", "Reception area", "Smart system"],
    highlight: false,
  },
];

type Unit = typeof residentialUnits[0];

/* ── BG image slider per unit ─────────────────────────── */
function UnitBg({ unit }: { unit: Unit }) {
  return (
    <div className="absolute inset-0">
      <motion.div
        key={unit.type}
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={unit.bgImage} alt={unit.label} className="w-full h-full object-cover" />
      </motion.div>
      {/* Deep navy overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#060914]/98 via-[#060914]/85 to-[#060914]/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#060914]/90 via-transparent to-[#060914]/60" />
    </div>
  );
}

/* ── Unit Detail Modal ────────────────────────────────── */
function UnitModal({ unit, onClose }: { unit: Unit; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-[#060914]/95 backdrop-blur-2xl" />
      <motion.div
        initial={{ scale: 0.92, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.93, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 max-w-3xl w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-[#c9a84c]/20 bg-gradient-to-br from-[#141218] to-[#0e0c12] max-h-[90vh] overflow-y-auto"
      >
        {/* Image */}
        <div className="relative h-40 sm:h-60 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={unit.image} alt={unit.label} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141218] via-transparent to-transparent" />
          <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#060914]/70 border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-all backdrop-blur-sm">
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-4 left-6">
            <div className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-bold mb-1">{unit.type} — {unit.label}</div>
            <div className="text-2xl font-heading font-black text-white">{unit.sqft} sq.ft.</div>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-5 sm:mb-6">
            {[
              { label: "Size", value: `${unit.sqft} sq.ft.`, icon: Maximize2 },
              { label: "Floor", value: unit.floors, icon: Building2 },
              { label: "Price", value: unit.price, icon: Star },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center p-3 rounded-xl bg-white/5 border border-white/8 text-center gap-1">
                <s.icon className="w-4 h-4 text-[#c9a84c]" />
                <div className="text-sm font-bold text-white">{s.value}</div>
                <div className="text-[10px] uppercase tracking-widest text-white/40">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-5 sm:mb-6">
            {unit.features.map((f) => (
              <span key={f} className="feature-tag">{f}</span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
            <a
              href={`https://wa.me/60112880808?text=Hi%2C%20I%27m%20interested%20in%20${encodeURIComponent(unit.type)}%20at%20Pavilion%20Square%20KL`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold flex-1 rounded-xl py-3 sm:py-3.5"
            >
              <MessageSquare className="w-4 h-4" />
              Enquire on WhatsApp
            </a>
            <a href="#contact" onClick={onClose} className="btn-ghost-gold flex-1 rounded-xl py-3 sm:py-3.5">
              Register Interest
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function UnitLayouts() {
  const [tab, setTab] = useState<"residential" | "corporate">("residential");
  const units = tab === "residential" ? residentialUnits : corporateUnits;
  const [activeIdx, setActiveIdx] = useState(0);
  const [modalUnit, setModalUnit] = useState<Unit | null>(null);
  const [paused, setPaused] = useState(false);
  const activeUnit = units[activeIdx] as Unit;

  /* Reset when tab changes */
  useEffect(() => { setActiveIdx(0); }, [tab]);

  /* Auto-advance */
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActiveIdx((i) => (i + 1) % units.length), 5500);
    return () => clearInterval(t);
  }, [paused, units.length]);

  const select = (i: number) => { setActiveIdx(i); setPaused(true); setTimeout(() => setPaused(false), 10000); };

  return (
    <section id="units" className="relative min-h-screen overflow-hidden bg-[#060914]">

      {/* Dynamic bg per unit */}
      <AnimatePresence>
        <UnitBg key={`${tab}-${activeIdx}`} unit={activeUnit} />
      </AnimatePresence>

      <div className="relative z-10 min-h-screen flex flex-col max-w-7xl mx-auto w-full px-4 sm:px-6 py-20 sm:py-28">

        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-badge mb-5"
          >
            <Building2 className="w-3 h-3" />
            Residences & Corporate Suites
          </motion.div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-2xl sm:text-4xl md:text-5xl font-heading font-black text-white leading-tight"
            >
              Unit <em style={{ fontStyle: "normal", WebkitTextFillColor: "transparent", background: "linear-gradient(135deg,#c9a84c,#ffd700)", WebkitBackgroundClip: "text", backgroundClip: "text" }}>Layouts</em>
            </motion.h2>

            {/* Tab switcher */}
            <div className="flex gap-1 p-1 sm:p-1.5 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 w-fit">
              {(["residential", "corporate"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`relative px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[10px] sm:text-xs uppercase tracking-widest font-bold transition-all duration-350 ${tab === t ? "bg-gradient-to-r from-[#c9a84c] to-[#ffd700] text-[#060914] shadow-[0_4px_16px_rgba(201,168,76,0.3)]" : "text-white/50 hover:text-white/80"}`}
                >
                  {t === "residential" ? "Luxury Residences" : "Corporate Suites"}
                </button>
              ))}
            </div>
          </div>
          <div className="section-divider mt-4" />
        </div>

        {/* Main grid */}
        <div className="flex-1 grid lg:grid-cols-5 gap-8">

          {/* Unit list — scrollable */}
          <div className="lg:col-span-2 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto lg:max-h-[70vh] pr-0 lg:pr-1 pb-2 lg:pb-0 scrollbar-hide">
            <AnimatePresence mode="popLayout">
              {units.map((u, i) => (
                <motion.button
                  key={u.type}
                  layout
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  onClick={() => select(i)}
                  className={`group relative text-left p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border transition-all duration-400 min-w-[160px] sm:min-w-[200px] lg:min-w-0 flex-shrink-0 lg:flex-shrink ${i === activeIdx
                    ? "border-[#c9a84c]/40 bg-gradient-to-r from-[#c9a84c]/12 to-[#c9a84c]/4 shadow-[0_0_24px_rgba(201,168,76,0.08)]"
                    : "border-white/8 bg-white/5 hover:border-white/18 hover:bg-white/8"}`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] uppercase tracking-widest font-bold ${i === activeIdx ? "text-[#c9a84c]" : "text-white/40 group-hover:text-white/60"}`}>
                        {(u as Unit).type}
                      </span>
                      {(u as Unit).highlight && (
                        <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#c9a84c]/15 border border-[#c9a84c]/30 text-[#c9a84c] font-semibold">Popular</span>
                      )}
                    </div>
                    <ArrowRight className={`w-3.5 h-3.5 transition-all duration-300 ${i === activeIdx ? "text-[#c9a84c] translate-x-0.5" : "text-white/20 group-hover:text-white/40 group-hover:translate-x-0.5"}`} />
                  </div>
                  <div className={`text-base font-heading font-bold ${i === activeIdx ? "text-white" : "text-white/70 group-hover:text-white/90"}`}>{(u as Unit).label}</div>
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-white/45">
                    <span>{(u as Unit).sqft} sq.ft.</span>
                    {(u as Unit).beds > 0 && (
                      <span className="flex items-center gap-1"><BedDouble className="w-3 h-3" />{(u as Unit).beds}</span>
                    )}
                    <span className="flex items-center gap-1"><Bath className="w-3 h-3" />{(u as Unit).baths}</span>
                  </div>
                  {i === activeIdx && (
                    <motion.div layoutId="unit-active" className="absolute left-0 top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#c9a84c] to-[#ffd700] rounded-full" />
                  )}
                </motion.button>
              ))}
            </AnimatePresence>
          </div>

          {/* Unit showcase */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`showcase-${tab}-${activeIdx}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-3 flex flex-col gap-4"
            >
              {/* Image card */}
              <div className="relative aspect-[3/2] sm:aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 group img-card-hover">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={activeUnit.image} alt={activeUnit.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060914]/80 via-[#060914]/20 to-transparent" />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="section-badge text-[10px]">{activeUnit.type}</span>
                  {activeUnit.highlight && <span className="section-badge text-[10px] bg-[#ffd700]/15 border-[#ffd700]/35 text-[#ffd700]">Most Popular</span>}
                </div>

                {/* Bottom info */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-2xl font-heading font-black text-white leading-tight">{activeUnit.label}</div>
                      <div className="text-sm text-white/60 mt-0.5 font-light">{activeUnit.floors}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-heading font-black stat-number">{activeUnit.sqft} <span className="text-base font-normal text-white/50">sq.ft.</span></div>
                      <div className="text-sm text-[#c9a84c] font-semibold mt-0.5">{activeUnit.price}</div>
                    </div>
                  </div>
                </div>

                {/* View button */}
                <button
                  onClick={() => setModalUnit(activeUnit)}
                  className="absolute top-4 right-4 flex items-center gap-2 px-3 py-2 rounded-xl bg-[#060914]/60 backdrop-blur-md border border-white/20 text-white/80 text-xs font-semibold hover:border-[#c9a84c]/50 hover:text-[#c9a84c] transition-all duration-300 lg:opacity-0 lg:group-hover:opacity-100"
                >
                  <Eye className="w-3.5 h-3.5" /> View Details
                </button>
              </div>

              {/* Quick info row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { icon: Maximize2, label: "Size", val: `${activeUnit.sqft} sqft` },
                  { icon: BedDouble, label: "Bedrooms", val: activeUnit.beds > 0 ? String(activeUnit.beds) : "—" },
                  { icon: Bath, label: "Bathrooms", val: String(activeUnit.baths) },
                  { icon: Building2, label: "Floors", val: activeUnit.floors.includes("L") ? activeUnit.floors : "Office" },
                ].map((s) => (
                  <div key={s.label} className="glow-card rounded-2xl p-3 flex flex-col items-center text-center gap-1">
                    <s.icon className="w-4 h-4 text-[#c9a84c]" />
                    <div className="text-sm font-bold text-white leading-tight">{s.val}</div>
                    <div className="text-[9px] uppercase tracking-wider text-white/40">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {activeUnit.features.map((f) => (
                  <span key={f} className="feature-tag">{f}</span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                <button className="btn-gold flex-1 rounded-xl py-3 sm:py-3.5" onClick={() => setModalUnit(activeUnit)}>
                  <Eye className="w-4 h-4" />View Floor Plan
                </button>
                <a
                  href={`https://wa.me/60112880808?text=I'm%20interested%20in%20${encodeURIComponent(activeUnit.type)}%20at%20Pavilion%20Square`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost-gold flex-1 rounded-xl py-3 sm:py-3.5"
                >
                  <MessageSquare className="w-4 h-4" />WhatsApp
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center gap-1.5 mt-8">
          {units.map((_, i) => (
            <button key={i} onClick={() => select(i)} className={`slider-dot ${i === activeIdx ? "active" : "w-1.5 h-1.5"}`} />
          ))}
        </div>
      </div>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/50 to-transparent" />

      {/* Modal */}
      <AnimatePresence>
        {modalUnit && <UnitModal unit={modalUnit} onClose={() => setModalUnit(null)} />}
      </AnimatePresence>
    </section>
  );
}
