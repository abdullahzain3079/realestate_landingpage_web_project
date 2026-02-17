"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const sections = [
  { id: "hero", label: "Home" },
  { id: "location", label: "Location" },
  { id: "units", label: "Units" },
  { id: "facilities", label: "Facilities" },
  { id: "concierge", label: "Concierge" },
  { id: "contact", label: "Gallery" },
];

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 25, restDelta: 0.001 });
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.3, rootMargin: "-80px 0px -40% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-[80] hidden xl:flex flex-col items-center gap-3">
      {/* Progress line */}
      <div className="w-px h-32 bg-glass-border relative mb-2">
        <motion.div
          className="absolute top-0 left-0 w-full bg-gold origin-top"
          style={{ scaleY, height: "100%" }}
        />
      </div>
      {/* Section dots */}
      {sections.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          className="group relative flex items-center"
          aria-label={label}
        >
          <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
            active === id ? "bg-gold scale-125 shadow-[0_0_8px_rgba(196,162,101,0.4)]" : "bg-glass-border hover:bg-gold/40"
          }`} />
          <div className="absolute right-6 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[9px] uppercase tracking-widest text-text-muted bg-dark-card/90 backdrop-blur-sm px-2 py-1 rounded pointer-events-none">
            {label}
          </div>
        </a>
      ))}
    </div>
  );
}
