"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Phone, Mail, MapPin, Clock, Facebook, Instagram, Globe,
  ExternalLink, CheckCircle, ChevronLeft, ChevronRight,
  MessageSquare, Send, AlertCircle,
} from "lucide-react";

/* ── Gallery images ──────────────────────────────────── */
const gallery = [
  "/pavilionmainview.jpeg",
  "/page_4_img_1.jpeg",
  "/page_9_img_1.jpeg",
  "/page_8_img_1.jpeg",
  "/page_10_img_2.jpeg",
  "/page_11_img_1.jpeg",
  "/page_12_img_1.jpeg",
  "/page_13_img_1.jpeg",
  "/page_15_img_1.jpeg",
  "/page_15_img_4.jpeg",
  "/page_16_img_1.jpeg",
  "/page_17_img_1.jpeg",
  "/page_18_img_1.jpeg",
  "/page_4_img_2.jpeg",
];

/* ── Form options ────────────────────────────────────── */
const unitTypes = [
  "Studio (Type A1/A2)",
  "1-Bedroom (Type B1/B2)",
  "2-Bedroom (Type C1/C2)",
  "3-Bedroom Penthouse",
  "Corner Suite (Type D)",
  "Corporate Suite (Type CS1)",
  "Corporate Loft (Type CS2)",
  "Business Suite (Type BS)",
];

const budgetRanges = [
  "RM 800,000 – RM 1.2M",
  "RM 1.2M – RM 1.8M",
  "RM 1.8M – RM 2.5M",
  "RM 2.5M – RM 3M",
  "Above RM 3M",
];

const hearAboutUs = [
  "iProperty.com.my",
  "PropertyGuru",
  "Mudah.my",
  "Facebook / Instagram",
  "Friend / Referral",
  "Sales Gallery Visit",
  "Newspaper / Magazine",
  "Other",
];

const nationalities = [
  "Malaysian",
  "Singaporean",
  "Chinese",
  "Taiwanese",
  "Hong Kong",
  "Indonesian",
  "Japanese",
  "Korean",
  "British",
  "Australian",
  "Other",
];

/* ── Contact details ─────────────────────────────────── */
const contactInfo = [
  { icon: Phone, label: "Sales Line", value: "+603 2332 8808", href: "tel:+60323328808" },
  { icon: Phone, label: "Mobile / WhatsApp", value: "+6011 2880 8088", href: "https://wa.link/kgsiw7" },
  { icon: Mail, label: "Email Enquiry", value: "sales@pavilionsquarekl.com", href: "mailto:sales@pavilionsquarekl.com" },
  { icon: MapPin, label: "Sales Gallery", value: "Level 3, Menara Khuan Choo, 75A Jalan Raja Chulan, 50200 Kuala Lumpur", href: "https://maps.google.com/?q=Pavilion+Square+KL" },
  { icon: Clock, label: "Opening Hours", value: "Monday – Sunday: 10:00 AM – 7:00 PM", href: null },
];

const socials = [
  { icon: Facebook, label: "Facebook", href: "https://facebook.com/pavilionsquarekl" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/pavilionsquarekl" },
  { icon: Globe, label: "Website", href: "https://www.pavillionsquare.com.my" },
];

const quickLinks = [
  { label: "About Pavilion Square", href: "#" },
  { label: "Unit Layouts", href: "#unit-layouts" },
  { label: "Facilities", href: "#facilities" },
  { label: "Virtual Tour", href: "#virtual-tour" },
  { label: "Concierge Services", href: "#concierge" },
  { label: "Location", href: "#location" },
];

/* ── Form field helper ───────────────────────────────── */
function InputField({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[12px] font-semibold text-white/55 uppercase tracking-[0.15em]">
        {label} {required && <span className="text-[#c9a84c]">*</span>}
      </label>
      {children}
      {error && (
        <div className="flex items-center gap-1.5 text-red-400 text-[11px]">
          <AlertCircle className="w-3 h-3" />
          {error}
        </div>
      )}
    </div>
  );
}

const inputCls =
  "w-full bg-[#1a1620]/70 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#c9a84c]/60 focus:bg-[#1a1620] focus:shadow-[0_0_0_3px_rgba(201,168,76,0.12)] transition-all duration-200";

const selectCls = inputCls + " appearance-none cursor-pointer";

/* ── Component ───────────────────────────────────────── */
export default function Contact() {
  /* Gallery state */
  const [galIdx, setGalIdx] = useState(0);
  const galPaused = useRef(false);
  useEffect(() => {
    const t = setInterval(() => { if (!galPaused.current) setGalIdx((i) => (i + 1) % gallery.length); }, 3800);
    return () => clearInterval(t);
  }, []);
  const galPrev = () => { galPaused.current = true; setGalIdx((i) => (i - 1 + gallery.length) % gallery.length); setTimeout(() => { galPaused.current = false; }, 7000); };
  const galNext = () => { galPaused.current = true; setGalIdx((i) => (i + 1) % gallery.length); setTimeout(() => { galPaused.current = false; }, 7000); };

  /* Form state */
  const [form, setForm] = useState({ salutation: "Mr", name: "", nric: "", nationality: "Malaysian", email: "", phone: "", propertyType: "Residential", unitType: "", budget: "", hearAbout: "", message: "", pdpa: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const set = (k: string, v: string | boolean) => { setForm((f) => ({ ...f, [k]: v })); if (errors[k]) setErrors((e) => { const n = { ...e }; delete n[k]; return n; }); };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Valid email required";
    if (!form.phone.match(/^(\+?6?0)[0-9]{8,10}$/)) e.phone = "Valid Malaysian phone required";
    if (!form.unitType) e.unitType = "Please select a unit type";
    if (!form.pdpa) e.pdpa = "PDPA consent is required";
    return e;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500)); // ~API call
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-[#060914]">

      {/* ── GALLERY HERO ──────────────────────────────── */}
      <div className="relative h-[60vh] sm:h-[70vh] overflow-hidden">
        {gallery.map((src, i) => (
          <motion.div key={i} className="absolute inset-0" animate={{ opacity: i === galIdx ? 1 : 0 }} transition={{ duration: 1.4 }}>
            <Image src={src} alt="Pavilion Square" fill sizes="100vw" priority={i === 0} className="object-cover kb-zoom-bg" style={{ filter: "brightness(0.45)" }} />
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-[#060914]/60 via-transparent to-[#060914]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060914]/80 to-transparent" />

        {/* Gallery controls */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-5 z-10">
          <button onClick={galPrev} className="slider-arrow"><ChevronLeft className="w-4 h-4" /></button>
          <button onClick={galNext} className="slider-arrow"><ChevronRight className="w-4 h-4" /></button>
        </div>
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 overflow-x-auto max-w-[90vw] scrollbar-hide px-2 gap-1.5">
          {gallery.map((_, i) => <button key={i} onClick={() => { galPaused.current = true; setGalIdx(i); setTimeout(() => { galPaused.current = false; }, 7000); }} className={`slider-dot ${i === galIdx ? "active" : ""}`} />)}
        </div>

        {/* Headline */}
        <div className="absolute bottom-12 left-0 right-0 px-6 max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-badge mb-4">
            <Mail className="w-3 h-3" />Get In Touch
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-2xl sm:text-3xl md:text-4xl font-heading font-black text-white leading-tight mb-4">
            Register Your <em style={{ fontStyle: "normal", WebkitTextFillColor: "transparent", background: "linear-gradient(135deg,#c9a84c,#ffd700)", WebkitBackgroundClip: "text", backgroundClip: "text" }}>Interest</em>
          </motion.h2>
        </div>
      </div>

      {/* ── CONTENT ───────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-28">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-16 items-start">

          {/* Left — contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            <div>
              <div className="section-divider mb-5" />
              <p className="text-white/55 text-sm sm:text-[15px] leading-relaxed mb-6 sm:mb-8">
                Speak with our dedicated sales consultants to schedule a private viewing at our gallery in the heart of KL City Centre.
              </p>
            </div>

            {/* Contact items */}
            <div className="flex flex-col gap-3">
              {contactInfo.map((c) => (
                <div key={c.label} className="group glow-card glow-card-slow rounded-2xl p-4 flex items-start gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#c9a84c]/15 to-transparent border border-[#c9a84c]/20 flex items-center justify-center flex-shrink-0">
                    <c.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#c9a84c]" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-white group-hover:text-[#c9a84c] transition-colors">{c.label}</div>
                    {c.href ? (
                      <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="text-[11px] sm:text-xs text-white/50 hover:text-[#ffd700] transition-colors duration-200">
                        {c.value}
                      </a>
                    ) : (
                      <div className="text-[11px] sm:text-xs text-white/50">{c.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/25 mb-3 font-semibold">Follow Us</div>
              <div className="flex gap-2 sm:gap-3">
                {socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="group w-10 h-10 rounded-xl bg-[#1a1620] border border-white/10 flex items-center justify-center hover:border-[#c9a84c]/50 hover:shadow-[0_0_14px_rgba(201,168,76,0.18)] transition-all duration-300"
                  >
                    <s.icon className="w-4 h-4 text-white/40 group-hover:text-[#c9a84c] transition-colors duration-300" />
                  </a>
                ))}
                <a href="https://www.pavillionsquare.com.my" target="_blank" rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-4 h-10 rounded-xl bg-[#1a1620] border border-white/10 text-[12px] text-white/40 hover:text-[#c9a84c] hover:border-[#c9a84c]/50 transition-all duration-300">
                  <ExternalLink className="w-3.5 h-3.5" />Official Site
                </a>
              </div>
            </div>

            {/* WhatsApp button */}
            <a href="https://wa.link/kgsiw7" target="_blank" rel="noopener noreferrer"
              className="btn-gold rounded-xl py-4 justify-center"
            >
              <MessageSquare className="w-4 h-4" />Chat on WhatsApp
            </a>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glow-card rounded-3xl p-12 flex flex-col items-center text-center gap-6"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#c9a84c]/20 to-[#ffd700]/10 border border-[#c9a84c]/35 flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-[#c9a84c]" />
                  </div>
                  <div>
                    <div className="text-2xl font-heading font-bold text-white mb-2">Thank You!</div>
                    <div className="text-white/55 text-[14px] leading-relaxed max-w-sm">
                      Your enquiry has been received. Our sales team will contact you within 24 hours via your preferred channel.
                    </div>
                  </div>
                  <a href="https://wa.link/kgsiw7" target="_blank" rel="noopener noreferrer" className="btn-gold rounded-xl px-8 py-3">
                    <MessageSquare className="w-4 h-4" />Also Reach Us on WhatsApp
                  </a>
                  <button onClick={() => setSubmitted(false)} className="text-[12px] text-white/30 hover:text-white/60 transition-colors">Submit another enquiry</button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="glow-card rounded-3xl p-7 md:p-9 flex flex-col gap-5"
                  noValidate
                >
                  <div className="text-[10px] uppercase tracking-[0.3em] text-[#c9a84c]/70 font-semibold mb-1">Registration Form</div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <InputField label="Salutation">
                      <select value={form.salutation} onChange={(e) => set("salutation", e.target.value)} className={selectCls}>
                        {["Mr", "Ms", "Mrs", "Dr", "Dato", "Tan Sri"].map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </InputField>
                    <InputField label="Full Name" required error={errors.name}>
                      <input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="As per NRIC / Passport" className={inputCls + " sm:col-span-2"} />
                    </InputField>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <InputField label="NRIC / Passport">
                      <input value={form.nric} onChange={(e) => set("nric", e.target.value)} placeholder="e.g. 950101-07-1234" className={inputCls} />
                    </InputField>
                    <InputField label="Nationality">
                      <select value={form.nationality} onChange={(e) => set("nationality", e.target.value)} className={selectCls}>
                        {nationalities.map((n) => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </InputField>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <InputField label="Email" required error={errors.email}>
                      <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="your@email.com" className={inputCls} />
                    </InputField>
                    <InputField label="Phone Number" required error={errors.phone}>
                      <input value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+60 12-345 6789" className={inputCls} />
                    </InputField>
                  </div>

                  <InputField label="Property Type Interest">
                    <div className="flex gap-2">
                      {["Residential", "Corporate", "Both"].map((t) => (
                        <button key={t} type="button" onClick={() => set("propertyType", t)}
                          className={`flex-1 py-2.5 rounded-xl text-[12px] font-semibold border transition-all duration-200 ${form.propertyType === t ? "bg-gradient-to-r from-[#c9a84c] to-[#b8963a] border-[#c9a84c] text-[#060914] shadow-[0_0_18px_rgba(201,168,76,0.3)]" : "bg-[#1a1620]/60 border-white/10 text-white/50 hover:border-[#c9a84c]/30 hover:text-white/70"}`}
                        >{t}</button>
                      ))}
                    </div>
                  </InputField>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <InputField label="Unit Type" required error={errors.unitType}>
                      <select value={form.unitType} onChange={(e) => set("unitType", e.target.value)} className={selectCls}>
                        <option value="">Select unit type</option>
                        {unitTypes.map((u) => <option key={u} value={u}>{u}</option>)}
                      </select>
                    </InputField>
                    <InputField label="Budget Range">
                      <select value={form.budget} onChange={(e) => set("budget", e.target.value)} className={selectCls}>
                        <option value="">Select range</option>
                        {budgetRanges.map((b) => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </InputField>
                  </div>

                  <InputField label="How Did You Hear About Us">
                    <select value={form.hearAbout} onChange={(e) => set("hearAbout", e.target.value)} className={selectCls}>
                      <option value="">Select source</option>
                      {hearAboutUs.map((h) => <option key={h} value={h}>{h}</option>)}
                    </select>
                  </InputField>

                  <InputField label="Message / Specific Requirements">
                    <textarea
                      value={form.message}
                      onChange={(e) => set("message", e.target.value)}
                      rows={3}
                      placeholder="Tell us your preferred floor, view, move-in date or any other requirements..."
                      className={inputCls + " resize-none"}
                    />
                  </InputField>

                  {/* PDPA consent */}
                  <div className="flex items-start gap-3 sm:gap-4 group">
                    <button
                      type="button"
                      onClick={() => set("pdpa", !form.pdpa)}
                      className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${form.pdpa ? "bg-gradient-to-br from-[#c9a84c] to-[#b8963a] border-[#c9a84c]" : "bg-transparent border-white/25 hover:border-[#c9a84c]/50"}`}
                    >
                      {form.pdpa && <CheckCircle className="w-3 h-3 text-[#060914]" />}
                    </button>
                    <p className="text-[11px] text-white/40 leading-relaxed">
                      I consent to YNH Property Berhad collecting, using and disclosing my personal data in accordance with their <a href="https://www.pavillionsquare.com.my" target="_blank" rel="noopener noreferrer" className="text-[#c9a84c] hover:underline">Privacy Policy</a> and Malaysia&apos;s Personal Data Protection Act 2010 (PDPA). <span className="text-[#c9a84c]">*</span>
                    </p>
                  </div>
                  {errors.pdpa && <div className="flex items-center gap-1.5 text-red-400 text-[11px] -mt-3"><AlertCircle className="w-3 h-3" />{errors.pdpa}</div>}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-gold w-full rounded-xl py-3 sm:py-4 text-center mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="60" strokeDashoffset="15" /></svg>
                        Submitting…
                      </>
                    ) : (
                      <><Send className="w-4 h-4" />Submit Enquiry</>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* ── FOOTER ────────────────────────────────────── */}
      <footer className="relative mt-20">
        <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c]/40 to-transparent mb-0 relative z-10" />
        <div className="relative bg-[#030611] overflow-hidden">

          {/* Background Image to replace plain black */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/page_3_img_1.jpeg"
              alt="Pavilion Square KL"
              fill
              sizes="100vw"
              className="object-cover"
            />
            {/* Dark overlays to create contrast for the white text while keeping the beautiful image visible */}
            <div className="absolute inset-0 bg-[#030611]/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030611] via-transparent to-[#030611]/90" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 pt-8 sm:pt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">

            {/* Brand */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <div className="text-2xl font-heading font-black">
                <span className="text-white">PAVILION</span>{" "}
                <span style={{ WebkitTextFillColor: "transparent", background: "linear-gradient(135deg,#c9a84c,#ffd700)", WebkitBackgroundClip: "text", backgroundClip: "text" }}>SQUARE</span>
              </div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-white/60 font-semibold">Kuala Lumpur • Malaysia</div>
              <p className="text-[13px] text-white/80 leading-relaxed max-w-xs">
                A landmark dual-tower mixed-use development by YNH Property Berhad, rising 62 floors above the heart of KLCC Precinct. Residences from RM 800K.
              </p>
              <div className="text-[11px] text-white/50">Developer: YNH Property Berhad</div>
            </div>

            {/* Quick links */}
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/70 font-semibold mb-4">Quick Links</div>
              <ul className="flex flex-col gap-2">
                {quickLinks.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-[13px] text-white/90 hover:text-[#c9a84c] transition-colors duration-200 hover-underline-gold">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact mini */}
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/70 font-semibold mb-4">Contact Us</div>
              <div className="flex flex-col gap-3">
                <a href="tel:+60323328808" className="flex items-center gap-2 text-[13px] text-white/90 hover:text-[#c9a84c] transition-colors">
                  <Phone className="w-3.5 h-3.5" />+603 2332 8808
                </a>
                <a href="https://wa.link/kgsiw7" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[13px] text-white/90 hover:text-[#c9a84c] transition-colors">
                  <MessageSquare className="w-3.5 h-3.5" />+6011 2880 8088
                </a>
                <div className="flex items-start gap-2 text-[12px] text-white/80">
                  <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                  <span>Jalan Raja Chulan, 50200 Kuala Lumpur</span>
                </div>
                <div className="flex gap-2 mt-1">
                  {socials.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center hover:border-[#c9a84c]/40 hover:bg-[#c9a84c]/8 transition-all duration-200"
                    >
                      <s.icon className="w-3.5 h-3.5 text-white/70 hover:text-[#c9a84c]" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/5 px-6 py-5 max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="text-[11px] text-white/50">
              © {new Date().getFullYear()} YNH Property Berhad. All rights reserved. Registration No.: 197701003905 (34592-A).
            </div>
            <div className="text-[11px] text-white/40 text-center sm:text-right max-w-sm">
              Renders and information are indicative only. All data subject to change without notice. PDPA 2010 compliant.
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}
