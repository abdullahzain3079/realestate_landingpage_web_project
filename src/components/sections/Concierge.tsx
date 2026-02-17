"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useAnimations";
import { Canvas } from "@react-three/fiber";
import { Float, Environment, MeshReflectorMaterial } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import {
  Car, Plane, Ship, Building2, Eye,
  Phone, Shield, Shirt, Utensils, ConciergeBell, Crown,
} from "lucide-react";

const IMG = "https://www.pavillionsquare.com.my/wp-content/uploads/2025/07";

const services = [
  { icon: ConciergeBell, title: "24/7 Concierge", description: "Dedicated concierge team to attend to your every need, from restaurant reservations to event planning." },
  { icon: Car, title: "Limousine Service", description: "Chauffeur-driven luxury vehicles for seamless airport transfers and city commutes." },
  { icon: Plane, title: "Private Jet Charter", description: "Exclusive access to private aviation services for business and leisure travel." },
  { icon: Ship, title: "Yacht Charter", description: "Premium yacht arrangements for coastal getaways and waterfront celebrations." },
  { icon: Building2, title: "Property Management", description: "Comprehensive property management including maintenance, housekeeping, and rental services." },
  { icon: Eye, title: "Exclusive Viewing", description: "Private show unit tours with personalised consultations and design walkthroughs." },
];

const features = [
  { icon: Crown, title: "HDA Compliant", desc: "Protected under the Housing Development Act" },
  { icon: Shirt, title: "Fully Furnished", desc: "Move-in ready with luxury furnishings" },
  { icon: Shield, title: "Multi-tier Security", desc: "24/7 security with smart access systems" },
  { icon: Utensils, title: "F&B at Your Door", desc: "Direct access to Pavilion KL dining" },
];

/* ── 3D Lobby Scene ───────────────────────────────────────────── */
function ChandelierOrb() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = 3.5 + Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
      ref.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });
  return (
    <mesh ref={ref} position={[0, 3.5, 0]}>
      <icosahedronGeometry args={[0.6, 2]} />
      <meshStandardMaterial color="#c4a265" emissive="#c4a265" emissiveIntensity={0.8} wireframe transparent opacity={0.6} />
    </mesh>
  );
}

function LobbyScene() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 5, 0]} intensity={1.2} color="#e8d5a8" distance={15} decay={2} />
      <pointLight position={[-4, 2, 2]} intensity={0.3} color="#c4a265" />
      <spotLight position={[0, 6, 0]} angle={0.5} penumbra={0.8} intensity={0.8} color="#ffd480" />
      <Environment preset="night" />

      {/* Reflective floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[20, 20]} />
        <MeshReflectorMaterial
          mirror={0.5}
          resolution={512}
          mixBlur={8}
          mixStrength={0.6}
          color="#141628"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Pillars */}
      {[-3, -1.5, 1.5, 3].map((x, i) => (
        <Float key={i} speed={0.8} rotationIntensity={0} floatIntensity={0.1}>
          <mesh position={[x, 2, -3]}>
            <cylinderGeometry args={[0.12, 0.15, 4, 12]} />
            <meshStandardMaterial color="#1c1828" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[x, 4.05, -3]}>
            <boxGeometry args={[0.4, 0.1, 0.4]} />
            <meshStandardMaterial color="#c4a265" emissive="#c4a265" emissiveIntensity={0.3} metalness={0.95} roughness={0.05} />
          </mesh>
        </Float>
      ))}

      {/* Chandelier */}
      <ChandelierOrb />

      {/* Reception desk */}
      <mesh position={[0, 0.5, -2]}>
        <boxGeometry args={[3, 1, 0.6]} />
        <meshStandardMaterial color="#1c1828" metalness={0.7} roughness={0.2} />
      </mesh>
      <mesh position={[0, 1.01, -2]}>
        <boxGeometry args={[3.1, 0.03, 0.65]} />
        <meshStandardMaterial color="#c4a265" emissive="#c4a265" emissiveIntensity={0.15} metalness={0.95} roughness={0.05} />
      </mesh>
    </>
  );
}

export default function Concierge() {
  const { ref: titleRef, isInView: titleVisible } = useInView();

  return (
    <section id="concierge" className="relative py-32 overflow-hidden">
      {/* Background — increased brightness */}
      <div className="absolute inset-0">
        <img
          src={`${IMG}/Pavillion-Square-Grand-Lobby-v1.webp`}
          alt="Grand Lobby"
          className="w-full h-full object-cover kenburns"
          style={{ filter: "brightness(0.2) saturate(0.6)" }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/70 via-transparent to-dark-bg/80" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={titleVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block text-[10px] uppercase tracking-[0.5em] text-gold mb-4"
          >
            White Glove Service
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={titleVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-champagne mb-6"
          >
            Bespoke
            <br />
            <span className="gold-gradient-text">Concierge Services</span>
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
            Experience unparalleled luxury with our dedicated concierge team,
            providing world-class services tailored to your every need.
          </motion.p>
        </div>

        {/* Services Grid — improved icons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="gradient-border-card p-7 group hover:bg-dark-elevated transition-all duration-500"
            >
              <div className="icon-luxury mb-5">
                <service.icon className="w-6 h-6 text-gold" />
              </div>
              <h3 className="text-lg font-heading font-semibold text-champagne mb-3">{service.title}</h3>
              <p className="text-sm text-text-muted leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>

        {/* 3D Lobby + Features */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 3D Lobby */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative h-[450px] rounded-2xl overflow-hidden glow-border-gold"
          >
            <Suspense fallback={<div className="w-full h-full bg-dark-card flex items-center justify-center text-text-muted text-sm">Loading 3D Lobby...</div>}>
              <Canvas camera={{ position: [0, 3, 7], fov: 50 }} dpr={[1, 1.5]}>
                <LobbyScene />
              </Canvas>
            </Suspense>
            <div className="absolute top-4 left-4 glass-panel-gold rounded-lg px-4 py-2">
              <div className="text-xs font-semibold text-gold tracking-widest uppercase">Interactive 3D Lobby</div>
            </div>
          </motion.div>

          {/* Features — improved icons */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="space-y-5"
          >
            <h3 className="text-2xl font-heading font-semibold text-champagne mb-6">
              Living Beyond Expectations
            </h3>
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 p-5 rounded-xl bg-dark-card/60 border border-glass-border hover:border-gold/20 transition-all duration-500 group"
              >
                <div className="icon-luxury !w-11 !h-11 flex-shrink-0">
                  <f.icon className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-champagne mb-1">{f.title}</div>
                  <div className="text-xs text-text-muted">{f.desc}</div>
                </div>
              </motion.div>
            ))}

            {/* CTA */}
            <div className="pt-4">
              <a
                href="https://wa.link/9ckvr8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gold text-dark-bg text-sm uppercase tracking-[0.2em] font-semibold hover:bg-gold-bright transition-colors"
              >
                <Phone className="w-4 h-4" />
                Schedule a Private Viewing
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
