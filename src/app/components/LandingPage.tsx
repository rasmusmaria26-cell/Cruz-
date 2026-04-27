"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MapPin, Mail, ShipWheel, CheckCircle2, ChevronRight, Menu, X, Star, Anchor, Compass, ShieldCheck, Ship, ArrowRight, ExternalLink } from "lucide-react";

// --- Custom Components ---

const GlassCard = ({ children, className, delay = 0 }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className={`bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:bg-white/[0.05] transition-all duration-300 group ${className}`}
  >
    {children}
  </motion.div>
);

const SectionTitle = ({ subtitle, title, description }: any) => (
  <div className="mb-16">
    <motion.span
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="text-[var(--accent)] font-bold uppercase tracking-[0.4em] text-[10px] block mb-4"
    >
      {subtitle}
    </motion.span>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-5xl md:text-7xl font-[var(--font-bebas)] text-white uppercase leading-none mb-6 tracking-tight"
    >
      {title}
    </motion.h2>
    {description && (
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-[var(--text-muted)] text-lg max-w-2xl leading-relaxed"
      >
        {description}
      </motion.p>
    )}
  </div>
);

// --- Main Page Component ---

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const services = [
    {
      title: "Crew Manning",
      description: "Recruiting top-tier maritime professionals for global shipping giants.",
      icon: Ship,
      image: "https://images.unsplash.com/photo-1544625345-d85c8846c4f7?w=800&q=80",
      color: "#c4622d"
    },
    {
      title: "College Admission",
      description: "Helping aspiring sailors join the best maritime academies in India and abroad.",
      icon: Anchor,
      image: "https://images.unsplash.com/photo-1541339907198-e08759df9a73?w=800&q=80",
      color: "#3b82f6"
    },
    {
      title: "Courses Booking",
      description: "Hassle-free booking for all DG Shipping approved STCW & modular courses.",
      icon: Compass,
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
      color: "#10b981"
    },
    {
      title: "Passport Online",
      description: "Fast-track passport applications and maritime documentation support.",
      icon: ShieldCheck,
      image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&q=80",
      color: "#f59e0b"
    }
  ];

  return (
    <div className="min-h-screen bg-[#04080f] text-[#f0ece4] font-[var(--font-dm-sans)] selection:bg-[var(--accent)] selection:text-white">
      
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[var(--accent)]/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full" />
      </div>

      {/* Navbar */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-[#04080f]/80 backdrop-blur-xl border-b border-white/5 py-4' : 'py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[var(--accent)] rounded-lg flex items-center justify-center rotate-3">
              <ShipWheel className="w-6 h-6 text-black -rotate-3" />
            </div>
            <div>
              <h1 className="font-[var(--font-bebas)] text-3xl tracking-tighter leading-none">CRUZE MARINE</h1>
              <span className="text-[7px] uppercase tracking-[0.5em] text-[var(--accent)] font-bold">Consultancy Tuticorin</span>
            </div>
          </div>

          <nav className="hidden lg:flex gap-10 items-center text-[10px] uppercase tracking-[0.2em] font-bold">
            {['Home', 'Services', 'About', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-[var(--accent)] transition-colors opacity-70 hover:opacity-100">
                {item}
              </a>
            ))}
            <a href="https://wa.me/919003354028" className="bg-white/5 border border-white/10 px-6 py-3 rounded-full hover:bg-[var(--accent)] hover:text-black hover:border-[var(--accent)] transition-all">
              WhatsApp Us
            </a>
          </nav>

          <button className="lg:hidden p-2" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#04080f] flex flex-col items-center justify-center gap-8"
          >
            <button className="absolute top-8 right-8" onClick={() => setMobileMenuOpen(false)}>
              <X className="w-8 h-8" />
            </button>
            {['Home', 'Services', 'About', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} className="text-5xl font-[var(--font-bebas)] uppercase tracking-widest hover:text-[var(--accent)] transition-colors">
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 px-6">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#04080f]/20 via-[#04080f]/60 to-[#04080f] z-10" />
          <video 
            autoPlay 
            muted 
            loop 
            className="w-full h-full object-cover opacity-40 grayscale"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-the-sea-at-night-4609-large.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="relative z-20 max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Placing Future Sailors Since 2014</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-7xl md:text-[9rem] font-[var(--font-bebas)] uppercase leading-[0.85] tracking-tighter mb-10"
          >
            Your Gateway to a <br/> <span className="text-[var(--accent)]">Maritime Career</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col md:flex-row gap-6 justify-center items-center"
          >
            <a href="tel:+919003354028" className="w-full md:w-auto px-10 py-5 bg-[var(--accent)] rounded-xl text-black font-bold uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all shadow-[0_10px_40px_-10px_rgba(196,98,45,0.5)]">
              Connect With Consultant
            </a>
            <a href="#services" className="w-full md:w-auto px-10 py-5 bg-white/5 border border-white/10 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-all backdrop-blur-sm">
              Explore Services
            </a>
          </motion.div>
        </div>
      </section>

      {/* Services Section - Bento Grid */}
      <section id="services" className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            subtitle="Our Expertise" 
            title="Comprehensive Marine Solutions" 
            description="From initial counseling to final placement, we navigate every step of your maritime journey with professional precision."
          />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[800px]">
            {/* Service 1: Crew Manning - Large Box */}
            <GlassCard className="md:col-span-8 md:row-span-1 relative" delay={0.1}>
              <div className="absolute inset-0 z-0">
                <img src={services[0].image} className="w-full h-full object-cover opacity-20 grayscale transition-all duration-500 group-hover:scale-110" alt="" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#04080f] to-transparent" />
              </div>
              <div className="relative z-10 p-10 h-full flex flex-col justify-end">
                <div className="w-16 h-16 rounded-2xl bg-[var(--accent)]/10 flex items-center justify-center mb-6 border border-[var(--accent)]/20">
                  {React.createElement(services[0].icon, { className: "w-8 h-8 text-[var(--accent)]" })}
                </div>
                <h3 className="text-5xl font-[var(--font-bebas)] mb-4 tracking-wide uppercase">{services[0].title}</h3>
                <p className="text-[var(--text-muted)] text-xl max-w-md">{services[0].description}</p>
                <button className="mt-8 flex items-center gap-2 text-[var(--accent)] font-bold uppercase tracking-widest text-[10px] group/btn">
                  Learn More <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                </button>
              </div>
            </GlassCard>

            {/* Service 2: College Admission */}
            <GlassCard className="md:col-span-4 md:row-span-1" delay={0.2}>
              <div className="p-10 flex flex-col h-full justify-center">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20">
                  {React.createElement(services[1].icon, { className: "w-6 h-6 text-blue-400" })}
                </div>
                <h3 className="text-3xl font-[var(--font-bebas)] mb-4 tracking-wide uppercase">{services[1].title}</h3>
                <p className="text-[var(--text-muted)]">{services[1].description}</p>
              </div>
            </GlassCard>

            {/* Service 3: Courses Booking */}
            <GlassCard className="md:col-span-4 md:row-span-1" delay={0.3}>
              <div className="p-10 flex flex-col h-full justify-center">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 border border-emerald-500/20">
                  {React.createElement(services[2].icon, { className: "w-6 h-6 text-emerald-400" })}
                </div>
                <h3 className="text-3xl font-[var(--font-bebas)] mb-4 tracking-wide uppercase">{services[2].title}</h3>
                <p className="text-[var(--text-muted)]">{services[2].description}</p>
              </div>
            </GlassCard>

            {/* Service 4: Passport Online - Horizontal box */}
            <GlassCard className="md:col-span-8 md:row-span-1" delay={0.4}>
              <div className="p-10 h-full flex flex-col md:flex-row md:items-center justify-between gap-10">
                <div className="max-w-md">
                  <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-6 border border-orange-500/20">
                    {React.createElement(services[3].icon, { className: "w-6 h-6 text-orange-400" })}
                  </div>
                  <h3 className="text-3xl font-[var(--font-bebas)] mb-4 tracking-wide uppercase">{services[3].title}</h3>
                  <p className="text-[var(--text-muted)]">{services[3].description}</p>
                </div>
                <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden grayscale opacity-30">
                   <img src={services[3].image} className="w-full h-full object-cover" alt="" />
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* About Section - Modern Grid */}
      <section id="about" className="py-32 px-6 bg-white/[0.02] border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-[var(--accent)]/10 blur-[100px] z-0" />
            <div className="grid grid-cols-2 gap-4 relative z-10">
              <div className="space-y-4">
                <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&q=80" className="w-full h-64 object-cover rounded-2xl grayscale" alt="" />
                <div className="bg-[var(--accent)] p-8 rounded-2xl text-black">
                  <div className="text-5xl font-[var(--font-bebas)]">10+</div>
                  <div className="text-[9px] uppercase tracking-widest font-bold">Years Experience</div>
                </div>
              </div>
              <div className="space-y-4 pt-12">
                 <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm">
                    <div className="text-5xl font-[var(--font-bebas)]">1000+</div>
                    <div className="text-[9px] uppercase tracking-widest font-bold text-[var(--accent)]">Successful Placements</div>
                 </div>
                 <img src="https://images.unsplash.com/photo-1544625345-d85c8846c4f7?w=600&q=80" className="w-full h-80 object-cover rounded-2xl grayscale" alt="" />
              </div>
            </div>
          </div>
          
          <div>
            <SectionTitle 
              subtitle="Why Choose Us" 
              title="Your Compass in the <br/> Global Shipping Industry"
            />
            <div className="space-y-8">
              {[
                { title: "Licensed Expertise", desc: "Registered and approved consultancy with deep roots in Tuticorin's maritime history." },
                { title: "Direct Placements", desc: "Strong partnerships with international ship management companies." },
                { title: "Carrier Support", desc: "End-to-end support from documentation to boarding your first vessel." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-[var(--accent)]/10 flex items-center justify-center border border-[var(--accent)]/20">
                    <CheckCircle2 className="w-6 h-6 text-[var(--accent)]" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                    <p className="text-[var(--text-muted)] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-12 px-10 py-4 bg-white text-black font-bold uppercase tracking-widest text-[10px] rounded-full hover:bg-[var(--accent)] transition-all">
               View Success Stories
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-40 px-6 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full opacity-[0.02] font-[var(--font-bebas)] text-[30rem] leading-none pointer-events-none whitespace-nowrap">
          CONTACT US
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-7xl md:text-9xl font-[var(--font-bebas)] text-white uppercase leading-none mb-12 tracking-tighter">
            Ready to <br/> <span className="text-[var(--accent)]">Take Command?</span>
          </h2>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <a href="https://wa.me/919003354028" className="group flex items-center gap-4 bg-[#25D366] px-10 py-5 rounded-2xl text-black font-bold uppercase tracking-widest text-xs hover:scale-105 transition-all">
              <Phone className="w-6 h-6" /> WhatsApp Consultant
            </a>
            <a href="mailto:cruze1612@gmail.com" className="flex items-center gap-4 bg-white/5 border border-white/10 px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-all backdrop-blur-sm">
              <Mail className="w-6 h-6 text-[var(--accent)]" /> Email Inquiry
            </a>
          </div>
          
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
               <MapPin className="w-8 h-8 text-[var(--accent)] mx-auto mb-4" />
               <p className="text-sm font-bold opacity-70">146/3, Cruzpuram, Tuticorin – 628 001</p>
            </div>
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
               <Phone className="w-8 h-8 text-[var(--accent)] mx-auto mb-4" />
               <p className="text-sm font-bold opacity-70">+91 90033 54028<br/>+91 90256 04842</p>
            </div>
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
               <Mail className="w-8 h-8 text-[var(--accent)] mx-auto mb-4" />
               <p className="text-sm font-bold opacity-70">cruze1612@gmail.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] uppercase tracking-widest font-bold opacity-50">
          <div>© {new Date().getFullYear()} Cruze Marine Service. Tuticorin.</div>
          <div className="flex gap-10">
            <a href="#" className="hover:text-[var(--accent)] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[var(--accent)] transition-colors">Terms</a>
            <a href="#" className="hover:text-[var(--accent)] transition-colors">Careers</a>
          </div>
          <div className="flex items-center gap-2">
            Built for Excellence <ShipWheel className="w-4 h-4 text-[var(--accent)]" />
          </div>
        </div>
      </footer>

      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 z-[80] flex gap-4">
        <a href="tel:+919003354028" className="flex-1 bg-[var(--accent)] py-4 text-center text-black font-bold uppercase text-[10px] tracking-widest rounded-2xl shadow-2xl">
          Call Now
        </a>
        <a href="https://wa.me/919003354028" className="flex-1 bg-[#25D366] py-4 text-center text-black font-bold uppercase text-[10px] tracking-widest rounded-2xl shadow-2xl">
          WhatsApp
        </a>
      </div>

    </div>
  );
}
