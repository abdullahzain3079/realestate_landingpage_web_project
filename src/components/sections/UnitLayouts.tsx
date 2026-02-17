"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, Suspense } from "react";
import { useInView } from "@/hooks/useAnimations";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import { BedDouble, Bath, Maximize, ChevronRight, X, LayoutGrid, Building2 } from "lucide-react";
import * as THREE from "three";

const IMG = "https://www.pavillionsquare.com.my/wp-content/uploads/2025/07";

type UnitType = {
  id: string; name: string; category: "residential" | "corporate"; beds: string;
  baths: number; size: string; level: string; image: string; layoutSvg: string;
};

const units: UnitType[] = [
  { id: "A", name: "Type A", category: "residential", beds: "Studio", baths: 1, size: "504 sq.ft.", level: "13A–37 & 39–62", image: `${IMG}/Pavillion-Square-Luxury-Residences-3.webp`, layoutSvg: `${IMG}/Layout-Type-A.svg` },
  { id: "B1", name: "Type B1", category: "residential", beds: "1 Bed", baths: 1, size: "614 sq.ft.", level: "13A–37 & 39–62", image: `${IMG}/Pavillion-Square-Luxury-Residences-1.webp`, layoutSvg: `${IMG}/Layout-Type-A.svg` },
  { id: "B2", name: "Type B2", category: "residential", beds: "1 Bed", baths: 1, size: "678 sq.ft.", level: "13A–37 & 39–62", image: `${IMG}/Pavillion-Square-Luxury-Residences-2.webp`, layoutSvg: `${IMG}/Type-A.svg` },
  { id: "C1", name: "Type C1", category: "residential", beds: "2 Bed", baths: 2, size: "872 sq.ft.", level: "13A–37 & 39–62", image: `${IMG}/Pavillion-Square-Grand-Lobby-v1.webp`, layoutSvg: `${IMG}/Layout-Type-A.svg` },
  { id: "C2", name: "Type C2", category: "residential", beds: "2 Bed", baths: 2, size: "958 sq.ft.", level: "13A–37 & 39–62", image: `${IMG}/Pavillion-Square-Entertainment-Room.webp`, layoutSvg: `${IMG}/Type-A.svg` },
  { id: "C3", name: "Type C3", category: "residential", beds: "2 Bed", baths: 2, size: "1,023 sq.ft.", level: "13A–37", image: `${IMG}/Pavillion-Square-Dropoff-Area-v2.webp`, layoutSvg: `${IMG}/Layout-Type-A.svg` },
  { id: "C4", name: "Type C4", category: "residential", beds: "2 Bed", baths: 2, size: "1,131 sq.ft.", level: "39–62", image: `${IMG}/Pavillion-Square-Sunken-Garden.webp`, layoutSvg: `${IMG}/Type-A.svg` },
  { id: "D", name: "Type D", category: "residential", beds: "3 Bed", baths: 2, size: "1,272 sq.ft.", level: "39–62", image: `${IMG}/Pavillion-Square-Luxury-Residences-3.webp`, layoutSvg: `${IMG}/Layout-Type-A.svg` },
  { id: "O1", name: "Office 1", category: "corporate", beds: "Office", baths: 1, size: "2,464 sq.ft.", level: "3–25", image: `${IMG}/Pavillion-Square-Corporate-Suites-1.webp`, layoutSvg: `${IMG}/Pavillion-Square-Office1.svg` },
  { id: "O2", name: "Office 2", category: "corporate", beds: "Office", baths: 1, size: "1,093 sq.ft.", level: "3–25", image: `${IMG}/Pavillion-Square-Corporate-Suites-2.webp`, layoutSvg: `${IMG}/Pavillion-Square-Office1.1.svg` },
  { id: "O3", name: "Office 3", category: "corporate", beds: "Office", baths: 1, size: "1,547 sq.ft.", level: "3–25", image: `${IMG}/Pavillion-Square-Corporate-Suites-3.webp`, layoutSvg: `${IMG}/Pavillion-Square-Office1.svg` },
];

const filters = [
  { key: "all", label: "All Units" },
  { key: "residential", label: "Residences" },
  { key: "corporate", label: "Corporate" },
];

/* ── 3D Floor Plan Viewer ─────────────────────────────────────── */
function FloorPlanScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={0.7} />
      <pointLight position={[-3, 4, -3]} intensity={0.3} color="#c4a265" />

      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
        <group scale={0.8}>
          {/* Floor */}
          <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[5, 4]} />
            <meshStandardMaterial color="#1c1e35" roughness={0.5} metalness={0.3} />
          </mesh>
          {/* Walls */}
          {[
            { pos: [0, 0.7, -2] as [number, number, number], args: [5, 1.4, 0.1] as [number, number, number] },
            { pos: [0, 0.7, 2] as [number, number, number], args: [5, 1.4, 0.1] as [number, number, number] },
            { pos: [-2.5, 0.7, 0] as [number, number, number], args: [0.1, 1.4, 4] as [number, number, number] },
            { pos: [2.5, 0.7, 0] as [number, number, number], args: [0.1, 1.4, 4] as [number, number, number] },
            { pos: [0, 0.7, 0] as [number, number, number], args: [0.08, 1.4, 2.5] as [number, number, number] },
          ].map((wall, i) => (
            <mesh key={i} position={wall.pos}>
              <boxGeometry args={wall.args} />
              <meshStandardMaterial color="#2a2a45" roughness={0.4} metalness={0.5} transparent opacity={0.8} />
            </mesh>
          ))}
          {/* Window */}
          <mesh position={[2.51, 0.8, -0.5]}>
            <planeGeometry args={[0.01, 0.8]} />
            <meshStandardMaterial color="#c4a265" emissive="#c4a265" emissiveIntensity={0.5} transparent opacity={0.6} />
          </mesh>
          {/* Bed */}
          <mesh position={[-1.2, 0.25, -1]}>
            <boxGeometry args={[1.4, 0.3, 1.8]} />
            <meshStandardMaterial color="#3a3048" roughness={0.6} />
          </mesh>
          {/* Table */}
          <mesh position={[1.2, 0.35, 1]}>
            <boxGeometry args={[1, 0.05, 0.6]} />
            <meshStandardMaterial color="#c4a265" roughness={0.3} metalness={0.6} />
          </mesh>
        </group>
      </Float>
      <OrbitControls enableZoom={true} enablePan={false} maxPolarAngle={Math.PI / 2.2} minDistance={4} maxDistance={12} autoRotate autoRotateSpeed={1.5} />
    </>
  );
}

export default function UnitLayouts() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedUnit, setSelectedUnit] = useState<UnitType | null>(null);
  const { ref: titleRef, isInView: titleVisible } = useInView();

  const filtered = useMemo(
    () => activeFilter === "all" ? units : units.filter((u) => u.category === activeFilter),
    [activeFilter]
  );

  return (
    <section id="units" className="relative py-32 overflow-hidden luxury-gradient-warm">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(196,162,101,0.5) 1px, transparent 0)", backgroundSize: "40px 40px" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={titleVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block text-[10px] uppercase tracking-[0.5em] text-gold mb-4"
          >
            Floor Plans
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={titleVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl font-heading font-bold text-champagne mb-6"
          >
            Thoughtfully Designed
            <br />
            <span className="gold-gradient-text">Unit Layouts</span>
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
            From cosy 504 sq.ft. studios to practical 1,272 sq.ft. suites — each unit is
            designed to maximise space, light, and luxury.
          </motion.p>
        </div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center gap-2 mb-12"
        >
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`px-6 py-2.5 text-xs uppercase tracking-widest font-medium transition-all duration-500 ${activeFilter === f.key
                  ? "bg-gold text-dark-bg"
                  : "bg-dark-card border border-glass-border text-text-secondary hover:text-gold hover:border-gold/30"
                }`}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Units Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((unit, i) => (
              <motion.div
                key={unit.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: "easeOut" as const }}
                className="gradient-border-card group cursor-pointer overflow-hidden"
                onClick={() => setSelectedUnit(unit)}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={unit.image}
                    alt={unit.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className={`px-3 py-1 text-[9px] uppercase tracking-widest font-bold ${unit.category === "residential" ? "bg-gold/90 text-dark-bg" : "bg-dark-elevated/90 text-gold border border-gold/30"
                      }`}>
                      {unit.category === "residential" ? "Residence" : "Corporate"}
                    </span>
                  </div>
                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  </div>
                </div>
                {/* Info */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-heading font-semibold text-champagne">{unit.name}</h3>
                    <ChevronRight className="w-4 h-4 text-gold opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1" />
                  </div>
                  <div className="flex items-center gap-4 text-xs text-text-muted mb-3">
                    <span className="flex items-center gap-1.5">
                      <BedDouble className="w-3.5 h-3.5 text-gold/60" /> {unit.beds}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Bath className="w-3.5 h-3.5 text-gold/60" /> {unit.baths}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Maximize className="w-3.5 h-3.5 text-gold/60" /> {unit.size}
                    </span>
                  </div>
                  <div className="text-[10px] text-text-muted uppercase tracking-widest">
                    Level {unit.level}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: "Studio", range: "504 sq.ft.", icon: LayoutGrid },
            { label: "1-Bedroom", range: "614–678 sq.ft.", icon: BedDouble },
            { label: "2-Bedroom", range: "872–1,131 sq.ft.", icon: BedDouble },
            { label: "3-Bedroom", range: "1,272 sq.ft.", icon: Building2 },
          ].map((item, i) => (
            <div key={i} className="glass-panel-gold rounded-xl p-5 text-center">
              <div className="icon-luxury !w-10 !h-10 mx-auto mb-2">
                <item.icon className="w-5 h-5 text-gold" />
              </div>
              <div className="text-sm font-semibold text-champagne mb-1">{item.label}</div>
              <div className="text-xs text-text-muted">{item.range}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Unit Detail Modal */}
      <AnimatePresence>
        {selectedUnit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
            onClick={() => setSelectedUnit(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 40 }}
              transition={{ duration: 0.4, ease: "easeOut" as const }}
              className="bg-dark-surface border border-glass-border rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid md:grid-cols-2">
                {/* Left: 3D + Image */}
                <div className="relative">
                  <div className="h-64 md:h-full">
                    <Suspense fallback={<div className="w-full h-full bg-dark-card flex items-center justify-center text-text-muted text-sm">Loading 3D View...</div>}>
                      <Canvas camera={{ position: [6, 5, 6], fov: 45 }} dpr={[1, 1.5]}>
                        <FloorPlanScene />
                      </Canvas>
                    </Suspense>
                  </div>
                  <div className="absolute top-3 left-3 px-3 py-1 bg-gold/90 text-dark-bg text-[9px] uppercase tracking-widest font-bold">
                    3D Floor Plan
                  </div>
                </div>
                {/* Right: Details */}
                <div className="p-8">
                  <button onClick={() => setSelectedUnit(null)} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full border border-glass-border text-text-muted hover:text-white hover:border-gold/40 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                  <span className={`inline-block px-3 py-1 text-[9px] uppercase tracking-widest font-bold mb-4 ${selectedUnit.category === "residential" ? "bg-gold/20 text-gold" : "bg-dark-elevated text-gold border border-gold/20"
                    }`}>
                    {selectedUnit.category === "residential" ? "Luxury Residence" : "Corporate Suite"}
                  </span>
                  <h3 className="text-3xl font-heading font-bold text-champagne mb-2">{selectedUnit.name}</h3>
                  <div className="section-divider mb-6" />
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-3 bg-dark-card rounded-lg">
                      <BedDouble className="w-5 h-5 text-gold mx-auto mb-1" />
                      <div className="text-xs text-text-muted">{selectedUnit.beds}</div>
                    </div>
                    <div className="text-center p-3 bg-dark-card rounded-lg">
                      <Bath className="w-5 h-5 text-gold mx-auto mb-1" />
                      <div className="text-xs text-text-muted">{selectedUnit.baths} Bath</div>
                    </div>
                    <div className="text-center p-3 bg-dark-card rounded-lg">
                      <Maximize className="w-5 h-5 text-gold mx-auto mb-1" />
                      <div className="text-xs text-text-muted">{selectedUnit.size}</div>
                    </div>
                  </div>
                  <div className="mb-6">
                    <div className="text-[10px] uppercase tracking-widest text-text-muted mb-1">Floor Level</div>
                    <div className="text-sm text-champagne">Level {selectedUnit.level}</div>
                  </div>
                  {/* Layout diagram */}
                  <div className="bg-dark-card rounded-xl p-4 mb-6">
                    <img src={selectedUnit.layoutSvg} alt={`${selectedUnit.name} layout`} className="w-full h-auto invert opacity-80" />
                  </div>
                  <a
                    href="https://wa.link/9ckvr8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-3.5 bg-gold text-dark-bg text-center text-sm uppercase tracking-widest font-semibold hover:bg-gold-bright transition-colors"
                  >
                    Enquire About {selectedUnit.name}
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
