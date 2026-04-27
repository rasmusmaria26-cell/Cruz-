"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Phone, MapPin, Mail, ShipWheel, CheckCircle2, ChevronRight, Menu, X, Star } from "lucide-react";
import { TextRotate } from "./ui/text-rotate";
import ScrollExpandMedia from "./ui/scroll-expansion-hero";

// --- Components ---

// 1. Magnetic Button
const MagneticButton = ({ children, className, onClick, href }: any) => {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement | any>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const props = {
    ref: buttonRef,
    className: className,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onClick: onClick,
    style: { transform: `translate(${position.x}px, ${position.y}px)` },
  };

  if (href) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return <button {...props}>{children}</button>;
};

// 2. Scramble Text
const ScrambleText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState(text.replace(/./g, " "));
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / 8; // 8 cycles per letter
    }, 40);

    return () => clearInterval(interval);
  }, [text]);

  return <>{displayText}</>;
};

// 3. 3D Tilt Card
const TiltCard = ({ children, className }: any) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Max rotation 8deg
    const rotateY = ((x / rect.width) - 0.5) * 16;
    const rotateX = ((y / rect.height) - 0.5) * -16;
    
    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ perspective: 1000, transformStyle: "preserve-3d" }}
      className={className}
    >
      <div style={{ transform: "translateZ(30px)" }}>{children}</div>
    </motion.div>
  );
};

// --- Main Page Component ---

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);

  // Parallax Hooks
  const { scrollY } = useScroll();
  const yVideo = useTransform(scrollY, [0, 500], [0, 150]);
  const yWave = useTransform(scrollY, [0, 500], [0, 80]);
  const yContent = useTransform(scrollY, [0, 500], [0, 30]);

  // How It Works Sticky Scroll
  const { scrollYProgress: howItWorksProgress } = useScroll({
    target: howItWorksRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    // Lock scroll during loader
    document.body.style.overflow = "hidden";
    
    // Loader timeout
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "";
    }, 1800);

    // Scroll listener for navbar
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = "";
    };
  }, []);

  const handleHeroClick = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const ripple = document.createElement('div');
    const rect = heroRef.current.getBoundingClientRect();
    
    ripple.style.cssText = `
      position: absolute;
      left: ${e.clientX - rect.left}px;
      top: ${e.clientY - rect.top}px;
      width: 0; height: 0;
      border: 2px solid rgba(196,98,45,0.6);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      animation: ripple 0.8s ease-out forwards;
      pointer-events: none;
      z-index: 20;
    `;
    heroRef.current.appendChild(ripple);
    setTimeout(() => ripple.remove(), 800);
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="relative w-32 h-32"
            >
              <motion.svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="1"
                className="w-full h-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  d="M12 2v20m10-10H2m17.07-7.07l-14.14 14.14M4.93 4.93l14.14 14.14M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z"
                />
              </motion.svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`min-h-screen relative bg-[var(--bg-base)] text-[var(--text-primary)] font-[var(--font-dm-sans)] overflow-x-hidden`}>
        
        {/* Navbar */}
        <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[var(--bg-base)]/90 backdrop-blur-md py-3 shadow-lg border-b border-white/5' : 'bg-transparent py-5'}`}>
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <ShipWheel className="w-8 h-8 text-[var(--accent)]" />
              <div>
                <h1 className="font-[var(--font-bebas)] text-3xl tracking-wider leading-none">CRUZE</h1>
                <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)]">Marine Service</p>
              </div>
            </div>

            <nav className="hidden md:flex gap-8 items-center text-sm font-medium tracking-wide">
              {['Home', 'Services', 'Process', 'Contact'].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-[var(--accent)] transition-colors">
                  {item}
                </a>
              ))}
            </nav>

            <div className="hidden md:block">
              <MagneticButton href="tel:+919003354028" className="bg-gradient-to-r from-[var(--accent)] to-[var(--accent-warm)] px-6 py-2.5 rounded-sm font-semibold shadow-lg hover:shadow-[var(--accent)]/30 transition-all text-black transition-transform">
                Call Now
              </MagneticButton>
            </div>

            <button className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </header>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-0 z-[60] bg-[var(--bg-base)] flex flex-col justify-center items-center"
            >
              <button className="absolute top-6 right-6" onClick={() => setMobileMenuOpen(false)}>
                <X className="w-8 h-8 text-[var(--text-muted)]" />
              </button>
              <div className="flex flex-col gap-8 text-center text-2xl font-[var(--font-barlow)]">
                {['Home', 'Services', 'Process', 'Contact'].map(item => (
                  <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} className="hover:text-[var(--accent)] transition-colors">
                    {item}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Section — Scroll Expansion */}
        <section id="home" className="relative overflow-hidden">
          <ScrollExpandMedia
            mediaType="video"
            mediaSrc="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-the-sea-at-night-4609-large.mp4"
            bgImageSrc="https://images.unsplash.com/photo-1504608524841-42584120d693?w=1920&q=80"
            title="CRUZE MARINE"
            date="Est. Tuticorin"
            scrollToExpand="Scroll to Explore"
            textBlend={true}
          >
            {/* Content revealed after scroll expansion */}
            <div ref={heroRef} className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={!isLoading ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 border border-white/10 rounded-full text-xs uppercase tracking-widest text-[var(--text-muted)] bg-white/5 backdrop-blur-md mb-8"
              >
                <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                Tuticorin's Maritime Experts
              </motion.div>

              <div className="text-[clamp(3rem,8vw,8rem)] leading-[0.9] font-[var(--font-bebas)] tracking-wide mb-4 text-white drop-shadow-2xl">
                <TextRotate
                  texts={["CREW MANNING", "COLLEGE ADMISSIONS", "COURSES BOOKING", "PASSPORT ONLINE"]}
                  mainClassName="justify-start text-[var(--accent)]"
                  staggerDuration={0.04}
                  staggerFrom="first"
                  rotationInterval={3000}
                />
              </div>

              <h3 className="text-2xl md:text-4xl font-[var(--font-barlow)] text-[var(--text-muted)] mb-6 uppercase tracking-widest">
                Your Gateway to a Maritime Career
              </h3>

              <p className="text-lg md:text-xl text-[var(--text-muted)] max-w-2xl mb-10 leading-relaxed">
                Crew Manning · College Admissions · Courses · Passport Services — from Tuticorin to the world's oceans.
              </p>

              <div className="flex flex-wrap gap-4">
                <MagneticButton href="#services" className="px-8 py-4 bg-[var(--accent)] hover:bg-[var(--accent-warm)] transition-colors text-black font-semibold rounded-sm tracking-wide">
                  Our Services
                </MagneticButton>
                <MagneticButton href="https://wa.me/919003354028" className="px-8 py-4 border border-[var(--border)] hover:border-[var(--accent)] transition-colors text-white font-semibold rounded-sm tracking-wide backdrop-blur-sm bg-white/5">
                  WhatsApp Us
                </MagneticButton>
              </div>
            </div>
          </ScrollExpandMedia>
        </section>

        {/* Services Section */}
        <section id="services" className="py-32 px-6 relative bg-[var(--bg-base)]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(196,98,45,0.06)_0%,transparent_60%)] pointer-events-none" />
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-[var(--font-barlow)] text-[var(--text-muted)] uppercase tracking-widest flex items-center gap-4">
                <span className="w-12 h-[1px] bg-[var(--accent)]"></span> What We Do
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { num: "01", title: "Crew Manning", desc: "We place qualified seafarers with reputed shipping companies worldwide." },
                { num: "02", title: "Marine College Admission", desc: "Guidance and processing for admissions to top maritime institutions." },
                { num: "03", title: "Courses Booking", desc: "End-to-end booking for STCW, watchkeeping, and certification courses." },
                { num: "04", title: "Passport Online", desc: "Fast-track passport application and renewal assistance for seafarers." }
              ].map((service, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <TiltCard className="bg-[var(--bg-card)] border-l-4 border-[var(--accent)] p-8 md:p-12 h-full hover:shadow-[0_0_30px_rgba(196,98,45,0.15)] transition-shadow cursor-default group relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 text-9xl font-[var(--font-bebas)] text-white/5 group-hover:text-white/10 transition-colors pointer-events-none">
                      {service.num}
                    </div>
                    <div className="text-5xl font-[var(--font-bebas)] text-[var(--accent)] mb-6">{service.num}</div>
                    <h3 className="text-3xl font-[var(--font-barlow)] mb-4 text-white uppercase tracking-wider">{service.title}</h3>
                    <p className="text-[var(--text-muted)] mb-8 text-lg leading-relaxed">{service.desc}</p>
                    <a href="https://wa.me/919003354028" className="inline-flex items-center text-[var(--accent)] font-medium hover:text-[var(--accent-warm)] transition-colors group/link">
                      Enquire on WhatsApp <ChevronRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                    </a>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Cruze Section */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(196,98,45,0.08)_0%,rgba(4,8,15,0)_70%)] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12 text-center md:text-left">
              {[
                { icon: MapPin, title: "Local Experts", desc: "Based in Tuticorin — we know the port, the process, and the people." },
                { icon: ShipWheel, title: "End-to-End Service", desc: "From college admission to your first posting — we handle it all." },
                { icon: CheckCircle2, title: "Fast Processing", desc: "Most applications processed and submitted within 48 hours." }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center md:items-start"
                >
                  <item.icon className="w-16 h-16 text-[var(--accent)] mb-6 stroke-[1.5]" />
                  <h3 className="text-2xl font-[var(--font-barlow)] uppercase tracking-wider mb-3">{item.title}</h3>
                  <p className="text-[var(--text-muted)]">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works - Sticky Scroll Section */}
        <section id="process" ref={howItWorksRef} className="h-[400vh] relative bg-[var(--bg-surface)]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(196,98,45,0.05)_0%,transparent_50%)] pointer-events-none" />
          <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
            <div className="max-w-7xl mx-auto w-full px-6 flex flex-col md:flex-row gap-8 md:gap-16 items-center">
              
              <div className="md:w-5/12 flex flex-col h-full justify-center">
                <h2 className="text-5xl md:text-8xl font-[var(--font-barlow)] uppercase tracking-widest mb-16 text-white drop-shadow-lg">
                   Process
                </h2>
                
                {/* Timeline Line */}
                <div className="relative h-[50vh] w-2 bg-white/5 ml-6 rounded-full overflow-hidden shadow-inner">
                  <motion.div 
                    className="absolute top-0 left-0 w-full bg-gradient-to-b from-[var(--accent)] to-[var(--accent-warm)] shadow-[0_0_15px_rgba(196,98,45,0.8)]"
                    style={{ height: useTransform(howItWorksProgress, [0, 1], ["0%", "100%"]) }}
                  />
                </div>
              </div>

              <div className="md:w-7/12 relative h-[60vh] flex items-center w-full">
                {/* Step 1 */}
                <motion.div 
                  className="absolute w-full"
                  style={{ 
                    opacity: useTransform(howItWorksProgress, [0, 0.15, 0.3, 0.35], [0, 1, 1, 0]),
                    y: useTransform(howItWorksProgress, [0, 0.15, 0.3, 0.35], [80, 0, 0, -80]),
                    scale: useTransform(howItWorksProgress, [0, 0.15, 0.3, 0.35], [0.9, 1, 1, 1.1])
                  }}
                >
                  <div className="absolute -top-32 -left-10 text-[18rem] font-[var(--font-bebas)] text-white/5 pointer-events-none">01</div>
                  <h3 className="text-[var(--accent)] text-2xl font-bold tracking-widest mb-4 font-[var(--font-barlow)] uppercase">Step 01</h3>
                  <h4 className="text-5xl md:text-8xl font-[var(--font-bebas)] tracking-wide mb-8 text-white">Reach Out</h4>
                  <p className="text-2xl text-[var(--text-muted)] max-w-xl leading-relaxed">Call or WhatsApp us with your requirement. We provide a clear roadmap and checklist immediately.</p>
                </motion.div>

                {/* Step 2 */}
                <motion.div 
                  className="absolute w-full"
                  style={{ 
                    opacity: useTransform(howItWorksProgress, [0.35, 0.45, 0.65, 0.7], [0, 1, 1, 0]),
                    y: useTransform(howItWorksProgress, [0.35, 0.45, 0.65, 0.7], [80, 0, 0, -80]),
                    scale: useTransform(howItWorksProgress, [0.35, 0.45, 0.65, 0.7], [0.9, 1, 1, 1.1])
                  }}
                >
                  <div className="absolute -top-32 -left-10 text-[18rem] font-[var(--font-bebas)] text-white/5 pointer-events-none">02</div>
                  <h3 className="text-[var(--accent)] text-2xl font-bold tracking-widest mb-4 font-[var(--font-barlow)] uppercase">Step 02</h3>
                  <h4 className="text-5xl md:text-8xl font-[var(--font-bebas)] tracking-wide mb-8 text-white">Send Documents</h4>
                  <p className="text-2xl text-[var(--text-muted)] max-w-xl leading-relaxed">Share soft copies via WhatsApp or Email. We verify everything to ensure zero rejections.</p>
                </motion.div>

                {/* Step 3 */}
                <motion.div 
                  className="absolute w-full"
                  style={{ 
                    opacity: useTransform(howItWorksProgress, [0.7, 0.8, 1, 1], [0, 1, 1, 1]),
                    y: useTransform(howItWorksProgress, [0.7, 0.8, 1, 1], [80, 0, 0, 0]),
                    scale: useTransform(howItWorksProgress, [0.7, 0.8, 1, 1], [0.9, 1, 1, 1])
                  }}
                >
                  <div className="absolute -top-32 -left-10 text-[18rem] font-[var(--font-bebas)] text-white/5 pointer-events-none">03</div>
                  <h3 className="text-[var(--accent)] text-2xl font-bold tracking-widest mb-4 font-[var(--font-barlow)] uppercase">Step 03</h3>
                  <h4 className="text-5xl md:text-8xl font-[var(--font-bebas)] tracking-wide mb-8 text-white">We Handle It</h4>
                  <p className="text-2xl text-[var(--text-muted)] max-w-xl leading-relaxed">We process, submit, and confirm everything. You receive the final documents without the hassle.</p>
                </motion.div>
              </div>

            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 px-6 relative bg-[var(--bg-base)]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(196,98,45,0.05)_0%,transparent_50%)] pointer-events-none" />
          <div className="max-w-7xl mx-auto relative z-10">
            <h2 className="text-3xl md:text-4xl font-[var(--font-barlow)] text-[var(--text-muted)] uppercase tracking-widest text-center mb-16">
              Trusted by Seafarers
            </h2>
            
            <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-6 pb-8 snap-x snap-mandatory hide-scrollbar">
              {[
                { name: "Karthik Selvam", role: "Deck Cadet", text: "Got my college admission processed in 3 days. Very professional team." },
                { name: "Murugan R.", role: "Chief Officer", text: "Cruze handled my crew manning paperwork flawlessly. Highly recommended." },
                { name: "Anitha Devi", role: "Parent", text: "My son's passport and college admission — all done through Cruze. Trustworthy." }
              ].map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="min-w-[85vw] md:min-w-0 snap-center bg-[var(--bg-card)] p-8 rounded-sm border border-white/5"
                >
                  <div className="flex gap-1 mb-6">
                    {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-[var(--accent)] text-[var(--accent)]" />)}
                  </div>
                  <p className="text-lg italic mb-8 text-white/90">"{t.text}"</p>
                  <div>
                    <h4 className="font-bold tracking-wide uppercase font-[var(--font-barlow)]">{t.name}</h4>
                    <p className="text-sm text-[var(--text-muted)]">{t.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 px-6 relative border-t border-white/5 bg-[var(--bg-surface)]">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-[var(--font-barlow)] uppercase tracking-widest mb-8">
                Get In Touch
              </h2>
              
              <div className="space-y-6 text-[var(--text-muted)] mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-sm bg-white/5 flex items-center justify-center shrink-0 border border-white/5">
                    <Phone className="w-5 h-5 text-[var(--accent)]" />
                  </div>
                  <div className="pt-1">
                    <p className="text-white font-medium">Call Us</p>
                    <p>90033 54028</p>
                    <p>90256 04842</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-sm bg-white/5 flex items-center justify-center shrink-0 border border-white/5">
                    <Mail className="w-5 h-5 text-[var(--accent)]" />
                  </div>
                  <div className="pt-1">
                    <p className="text-white font-medium">Email</p>
                    <p>cruze1612@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-sm bg-white/5 flex items-center justify-center shrink-0 border border-white/5">
                    <MapPin className="w-5 h-5 text-[var(--accent)]" />
                  </div>
                  <div className="pt-1">
                    <p className="text-white font-medium">Office</p>
                    <p>146/3, Cruzpuram,</p>
                    <p>Tuticorin – 628 001</p>
                  </div>
                </div>
              </div>

              {/* Map embedded */}
              <div className="w-full h-64 bg-white/5 rounded-sm overflow-hidden border border-white/5 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3943.435032549303!2d78.1360!3d8.7944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwNDcnMzkuOCJOIDc4wrAwOCcwOS42IkU!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Cruze Marine Service Location"
                ></iframe>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[var(--bg-card)] p-8 md:p-10 rounded-sm border border-[var(--border)] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent)]/10 blur-[50px] pointer-events-none" />
              <h3 className="text-2xl font-[var(--font-barlow)] mb-6 uppercase tracking-wider text-white">Send a Message</h3>
              
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  const text = `Hi Cruze Marine, I need help with ${fd.get('service')}.%0A%0A*Name:* ${fd.get('name')}%0A*Phone:* ${fd.get('phone')}%0A*Message:* ${fd.get('message')}`;
                  window.open(`https://wa.me/919003354028?text=${text}`, '_blank');
                }}
                className="space-y-4 relative z-10"
              >
                <input required name="name" type="text" placeholder="Your Name" className="w-full bg-[var(--bg-base)] border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-[var(--accent)] transition-colors" />
                <input required name="phone" type="tel" placeholder="Phone Number" className="w-full bg-[var(--bg-base)] border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-[var(--accent)] transition-colors" />
                <select name="service" className="w-full bg-[var(--bg-base)] border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-[var(--accent)] transition-colors appearance-none">
                  <option value="Crew Manning">Crew Manning</option>
                  <option value="Marine College Admission">Marine College Admission</option>
                  <option value="Courses Booking">Courses Booking</option>
                  <option value="Passport Online">Passport Online</option>
                  <option value="General Enquiry">General Enquiry</option>
                </select>
                <textarea required name="message" rows={4} placeholder="Your message..." className="w-full bg-[var(--bg-base)] border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-[var(--accent)] transition-colors resize-none" />
                
                <button type="submit" className="w-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-warm)] text-black font-bold py-4 rounded-sm hover:shadow-[0_0_20px_rgba(196,98,45,0.4)] transition-shadow tracking-wide mt-2 uppercase font-[var(--font-barlow)]">
                  Submit via WhatsApp
                </button>
              </form>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[var(--bg-base)] border-t border-white/5 py-8 pb-24 md:pb-8">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[var(--text-muted)]">
            <div className="flex items-center gap-2">
              <ShipWheel className="w-5 h-5 text-[var(--accent)]" />
              <span className="font-[var(--font-bebas)] tracking-wider text-lg text-white">CRUZE</span>
            </div>
            <p>© {new Date().getFullYear()} Cruze Marine Service. Tuticorin.</p>
            <div className="flex gap-4">
              <a href="https://wa.me/919003354028" className="hover:text-[var(--accent)] transition-colors">WhatsApp</a>
              <a href="tel:+919003354028" className="hover:text-[var(--accent)] transition-colors">Call Us</a>
            </div>
          </div>
        </footer>

        {/* Floating WhatsApp FAB */}
        <a 
          href="https://wa.me/919003354028" 
          target="_blank" 
          rel="noopener noreferrer"
          className="fixed bottom-24 md:bottom-8 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform animate-pulse-ring"
        >
          <svg className="w-8 h-8 text-white fill-current" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-5.824 4.74-10.563 10.564-10.563 5.826 0 10.564 4.74 10.564 10.563 0 5.824-4.74 10.563-10.563 10.563z"/>
          </svg>
        </a>

        {/* Mobile Sticky Bar */}
        <div className="md:hidden fixed bottom-0 left-0 w-full bg-[var(--bg-surface)] border-t border-white/10 p-4 flex gap-4 z-40">
          <a href="tel:+919003354028" className="flex-1 bg-white/5 border border-white/10 text-white font-medium py-3 rounded-sm flex items-center justify-center gap-2">
            <Phone className="w-5 h-5" /> Call
          </a>
          <a href="https://wa.me/919003354028" className="flex-1 bg-[var(--accent)] text-black font-semibold py-3 rounded-sm flex items-center justify-center gap-2">
            WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
