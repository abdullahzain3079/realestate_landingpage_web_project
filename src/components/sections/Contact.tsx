"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import { useInView } from "@/hooks/useAnimations";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Phone, Mail, MapPin, Clock, ChevronLeft, ChevronRight,
  Send, Instagram, Facebook, ArrowUpRight, ExternalLink,
} from "lucide-react";

const IMG = "https://www.pavillionsquare.com.my/wp-content/uploads/2025/07";

const galleryImages = [
  { src: `${IMG}/Pavillion-Square-Dropoff-Area-v2.webp`, label: "Residential Drop-off" },
  { src: `${IMG}/Pavillion-Square-Grand-Lobby-v1.webp`, label: "Grand Lobby" },
  { src: `${IMG}/Pavillion-Square-Entertainment-Room.webp`, label: "Entertainment Room" },
  { src: `${IMG}/Pavillion-Square-Facility-v1.webp`, label: "Indoor Gymnasium" },
  { src: `${IMG}/Pavillion-Square-Sunken-Garden.webp`, label: "Sunken Garden" },
  { src: `${IMG}/Pavillion-Square-Sky-Facilities.webp`, label: "Sky Facilities" },
  { src: `${IMG}/Pavillion-Square-Grand-Lobby-v2.webp`, label: "Corporate Grand Lobby" },
  { src: `${IMG}/Pavillion-Square-Street-View.webp`, label: "Street View" },
  { src: `${IMG}/Pavillion-Square-Luxury-Residences-1.webp`, label: "Luxury Residences" },
  { src: `${IMG}/Pavillion-Square-Luxury-Residences-2.webp`, label: "Premium Interiors" },
  { src: `${IMG}/Pavillion-Square-Corporate-Suites-1.webp`, label: "Corporate Suites" },
  { src: `${IMG}/Pavillion-Square-level12.webp`, label: "Level 12 Courtyard" },
];

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(8, "Valid phone number is required"),
  interest: z.string().min(1, "Please select an interest"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

/* ── Gallery Component (no slide numbers, auto-slide) ─────────── */
function Gallery() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", slidesToScroll: 1 },
    [Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true })]
  );
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="relative">
      {/* Main Carousel */}
      <div ref={emblaRef} className="embla rounded-2xl overflow-hidden">
        <div className="embla__container">
          {galleryImages.map((img, i) => (
            <div key={i} className="embla__slide px-1">
              <div
                className="relative aspect-[16/9] overflow-hidden cursor-pointer group"
                onClick={() => setLightboxIndex(i)}
              >
                <img
                  src={img.src}
                  alt={img.label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 z-10">
                  <div className="text-xs uppercase tracking-widest text-gold mb-1">{img.label}</div>
                </div>
                <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 rounded-full bg-gold/20 backdrop-blur-sm flex items-center justify-center">
                    <ArrowUpRight className="w-4 h-4 text-gold" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls — NO slide counter */}
      <div className="flex items-center justify-center mt-6 gap-3">
        <button onClick={scrollPrev} className="w-10 h-10 border border-glass-border rounded-full flex items-center justify-center text-text-muted hover:text-gold hover:border-gold/40 transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button onClick={scrollNext} className="w-10 h-10 border border-glass-border rounded-full flex items-center justify-center text-text-muted hover:text-gold hover:border-gold/40 transition-colors">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setLightboxIndex(null)}
          >
            <motion.img
              key={lightboxIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={galleryImages[lightboxIndex].src}
              alt={galleryImages[lightboxIndex].label}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-8 text-center w-full">
              <div className="text-sm text-gold tracking-widest uppercase">{galleryImages[lightboxIndex].label}</div>
            </div>
            {/* Nav */}
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + galleryImages.length) % galleryImages.length); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % galleryImages.length); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Contact Form ─────────────────────────────────────────────── */
function ContactForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <input
            {...register("name")}
            placeholder="Full Name"
            className="w-full px-5 py-3.5 bg-dark-card border border-glass-border text-champagne text-sm placeholder:text-text-muted/50 focus:outline-none focus:border-gold/40 transition-colors"
          />
          {errors.name && <span className="text-xs text-red-400 mt-1">{errors.name.message}</span>}
        </div>
        <div>
          <input
            {...register("email")}
            type="email"
            placeholder="Email Address"
            className="w-full px-5 py-3.5 bg-dark-card border border-glass-border text-champagne text-sm placeholder:text-text-muted/50 focus:outline-none focus:border-gold/40 transition-colors"
          />
          {errors.email && <span className="text-xs text-red-400 mt-1">{errors.email.message}</span>}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <input
            {...register("phone")}
            placeholder="Phone Number"
            className="w-full px-5 py-3.5 bg-dark-card border border-glass-border text-champagne text-sm placeholder:text-text-muted/50 focus:outline-none focus:border-gold/40 transition-colors"
          />
          {errors.phone && <span className="text-xs text-red-400 mt-1">{errors.phone.message}</span>}
        </div>
        <div>
          <select
            {...register("interest")}
            className="w-full px-5 py-3.5 bg-dark-card border border-glass-border text-champagne text-sm focus:outline-none focus:border-gold/40 transition-colors appearance-none"
          >
            <option value="">Select Interest</option>
            <option value="studio">Studio (504 sq.ft.)</option>
            <option value="1bed">1-Bedroom</option>
            <option value="2bed">2-Bedroom</option>
            <option value="3bed">3-Bedroom</option>
            <option value="corporate">Corporate Suite</option>
            <option value="penthouse">Penthouse</option>
          </select>
          {errors.interest && <span className="text-xs text-red-400 mt-1">{errors.interest.message}</span>}
        </div>
      </div>
      <div>
        <textarea
          {...register("message")}
          rows={4}
          placeholder="Tell us more about your requirements..."
          className="w-full px-5 py-3.5 bg-dark-card border border-glass-border text-champagne text-sm placeholder:text-text-muted/50 focus:outline-none focus:border-gold/40 transition-colors resize-none"
        />
      </div>
      <button
        type="submit"
        className="w-full py-4 bg-gold text-dark-bg text-sm uppercase tracking-[0.25em] font-semibold hover:bg-gold-bright transition-colors flex items-center justify-center gap-2"
      >
        <Send className="w-4 h-4" /> Register Interest
      </button>
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center text-sm text-gold"
          >
            Thank you for your interest! We will contact you shortly.
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}

/* ── Main Contact Section ─────────────────────────────────────── */
export default function Contact() {
  const { ref: titleRef, isInView: titleVisible } = useInView();

  return (
    <section id="contact" className="relative py-32 overflow-hidden luxury-gradient-warm">
      <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(196,162,101,0.5) 1px, transparent 0)", backgroundSize: "50px 50px" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={titleVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block text-[10px] uppercase tracking-[0.5em] text-gold mb-4"
          >
            Gallery & Contact
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={titleVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-champagne mb-6"
          >
            Experience
            <br />
            <span className="gold-gradient-text">Pavilion Square</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={titleVisible ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="section-divider mx-auto"
          />
        </div>

        {/* Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <Gallery />
        </motion.div>

        {/* Contact Section */}
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl font-heading font-bold text-champagne mb-8">
              Get in Touch
            </h3>
            <div className="space-y-6 mb-10">
              {[
                { icon: Phone, label: "Phone", value: "+603 2332 8808 / +6011 2880 8088", href: "tel:+60323328808" },
                { icon: MapPin, label: "Property Gallery", value: "Level 3, Menara Khuan Choo, 75A Jalan Raja Chulan, 50200 Kuala Lumpur", href: "#" },
                { icon: Clock, label: "Operating Hours", value: "Mon–Sun: 10:00 AM – 7:00 PM", href: "#" },
                { icon: Mail, label: "Email", value: "info@pavilionsquarekl.com", href: "mailto:info@pavilionsquarekl.com" },
              ].map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 group cursor-pointer"
                >
                  <div className="icon-luxury !w-10 !h-10 flex-shrink-0">
                    <item.icon className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-text-muted mb-1">{item.label}</div>
                    <div className="text-sm text-champagne group-hover:text-gold transition-colors">{item.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: "https://www.facebook.com/1PavilionCollectionOfficial", label: "Facebook" },
                { icon: Instagram, href: "https://www.instagram.com/1pavilioncollection/", label: "Instagram" },
                { icon: ExternalLink, href: "https://www.pavillionsquare.com.my", label: "Website" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-luxury !w-10 !h-10 !rounded-lg"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 text-gold" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="gradient-border-card p-8"
          >
            <h3 className="text-xl font-heading font-semibold text-champagne mb-6">Register Your Interest</h3>
            <ContactForm />
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 mt-32 border-t border-glass-border pt-12 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Logo & Developer */}
          <div>
            <div className="text-2xl font-heading font-bold gold-gradient-text mb-3">
              PAVILION SQUARE
            </div>
            <p className="text-xs text-text-muted leading-relaxed">
              By Pavilion Group — Malaysia&apos;s premier developer of large-scale retail
              and integrated mixed-use developments in prime city locations.
            </p>
          </div>
          {/* Quick Links */}
          <div>
            <div className="text-[10px] uppercase tracking-widest text-text-muted mb-4">Quick Links</div>
            <div className="space-y-2">
              {["Location", "Units", "Facilities", "360° Tour", "Concierge", "Contact"].map((link) => (
                <a
                  key={link}
                  href={`#${link === "360° Tour" ? "virtual-tour" : link.toLowerCase()}`}
                  className="block text-sm text-text-secondary hover:text-gold transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
          {/* Developer */}
          <div>
            <div className="text-[10px] uppercase tracking-widest text-text-muted mb-4">Developer</div>
            <p className="text-sm text-text-secondary mb-2">Armani Hartajaya Sdn Bhd</p>
            <p className="text-xs text-text-muted leading-relaxed">
              75A, Jalan Raja Chulan, 50200 Kuala Lumpur, Malaysia
            </p>
          </div>
        </div>
        <div className="border-t border-glass-border pt-6 pb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-text-muted">
            © {new Date().getFullYear()} Pavilion Square KL. All rights reserved.
          </div>
          <div className="flex gap-4 text-xs text-text-muted">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-gold transition-colors">Disclaimer</a>
          </div>
        </div>
      </footer>
    </section>
  );
}
