'use client'

import React, { useRef, useState, useEffect, ReactNode } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ParallaxStackHeroProps {
  title: string;
  subtitle: string;
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  children: ReactNode;
}

export default function ParallaxStackHero({
  title,
  subtitle,
  mediaSrc,
  posterSrc,
  bgImageSrc,
  children
}: ParallaxStackHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const springConfig = { stiffness: 80, damping: 20, mass: 0.5 };

  const l1Range = isMobile ? [0, 0.35] : [0, 0.4];
  const l2Range = isMobile ? [0.3, 0.65] : [0.35, 0.7];
  const l3Range = isMobile ? [0.55, 1.0] : [0.6, 1.0];

  const layer1YRaw = useTransform(scrollYProgress, l1Range, ["0%", "-100%"]);
  const layer1Y = useSpring(layer1YRaw, springConfig);

  const titleWord1XRaw = useTransform(scrollYProgress, l1Range, ["0vw", "-25vw"]);
  const titleWord1X = useSpring(titleWord1XRaw, springConfig);

  const titleWord2XRaw = useTransform(scrollYProgress, l1Range, ["0vw", "25vw"]);
  const titleWord2X = useSpring(titleWord2XRaw, springConfig);

  const layer2YRaw = useTransform(scrollYProgress, l2Range, ["0%", "-100%"]);
  const layer2Y = useSpring(layer2YRaw, springConfig);

  const layer2OpacityRange = isMobile ? [0.5, 0.65] : [0.55, 0.7];
  const layer2Opacity = useTransform(scrollYProgress, layer2OpacityRange, [1, 0]);

  const layer3YRaw = useTransform(scrollYProgress, l3Range, ["100%", "0%"]);
  const layer3Y = useSpring(layer3YRaw, springConfig);

  const layer3ScaleRaw = useTransform(scrollYProgress, l3Range, [0.96, 1]);
  const layer3Scale = useSpring(layer3ScaleRaw, springConfig);

  const words = title.split(' ');
  const word1 = words[0] || '';
  const word2 = words.slice(1).join(' ') || '';

  return (
    <section 
      id="home"
      ref={containerRef} 
      className="parallax-stack-root relative w-full"
      style={{ height: isMobile ? "280vh" : "300vh" }}
    >
      <div className="sticky top-0 w-full h-[100dvh] overflow-hidden bg-black">
        
        {/* LAYER 1 - Background & Title */}
        <motion.div 
          className="absolute inset-0 w-full h-full"
          style={{ y: layer1Y, willChange: "transform" }}
        >
          <div className="absolute inset-0 w-full h-full">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload={isMobile ? "none" : "auto"}
              poster={posterSrc || bgImageSrc}
              className="w-full h-full object-cover"
            >
              <source src={mediaSrc} type="video/mp4" />
            </video>
          </div>
          
          <div className="absolute inset-0 bg-black/50" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <motion.div 
              style={{ x: titleWord1X, willChange: "transform" }}
              className="font-[var(--font-nunito)] font-black text-[clamp(2.5rem,10vw,6rem)] md:text-[clamp(3rem,12vw,10rem)] tracking-[0.15em] uppercase text-shimmer leading-none"
            >
              {word1}
            </motion.div>
            <motion.div 
              style={{ x: titleWord2X, willChange: "transform" }}
              className="font-[var(--font-nunito)] font-black text-[clamp(2.5rem,10vw,6rem)] md:text-[clamp(3rem,12vw,10rem)] tracking-[0.15em] uppercase text-shimmer leading-none"
            >
              {word2}
            </motion.div>
          </div>

          <motion.div 
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
            animate={{ opacity: isMobile ? 0 : 1 }}
          >
            <span className="text-[9px] tracking-[0.4em] opacity-60 text-white uppercase">SCROLL</span>
            <div className="relative w-[1px] h-8 bg-white/40 overflow-hidden">
              <motion.div 
                className="w-full h-2 bg-white"
                animate={{ y: [0, 24] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* LAYER 2 - Title + Tagline Card */}
        <motion.div 
          className="absolute inset-0 w-full h-full bg-[var(--bg-base)] flex flex-col items-center justify-center text-center px-5 sm:px-8"
          style={{ 
            y: layer2Y, 
            opacity: layer2Opacity,
            willChange: "transform, opacity",
            backgroundImage: "radial-gradient(ellipse at center, rgba(196,98,45,0.12) 0%, transparent 70%)"
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="border border-[var(--accent)]/30 bg-[var(--accent)]/10 backdrop-blur-sm text-[10px] uppercase tracking-[0.3em] px-4 py-2 rounded-full mb-6 text-white"
          >
            <span className="text-[var(--accent)] mr-1">●</span> Tuticorin's Maritime Experts
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <h4 className="text-[var(--text-muted)] font-[var(--font-nunito)] font-black text-[clamp(1.2rem,4vw,3.5rem)] tracking-tight">
              YOUR GATEWAY TO A
            </h4>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-white font-[var(--font-nunito)] font-black text-[clamp(2rem,7vw,7rem)] tracking-tight leading-none mt-2 mb-6">
              MARITIME CAREER
            </h2>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45 }}
            className="w-24 h-[1px] bg-[var(--accent)] mx-auto mb-6"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-[var(--text-muted)] text-sm md:text-base tracking-widest text-center max-w-2xl"
          >
            Crew Manning · College Admissions · Courses · Passport
          </motion.p>
        </motion.div>

        {/* LAYER 3 - Hero Content / CTA */}
        <motion.div 
          className="absolute inset-0 w-full h-full bg-[var(--bg-base)] border-t border-[var(--accent)]/20"
          style={{ 
            y: layer3Y, 
            scale: layer3Scale,
            willChange: "transform" 
          }}
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--accent)]/8 blur-[120px] rounded-full pointer-events-none" />
          
          <div className={`max-w-7xl mx-auto px-4 sm:px-6 h-full flex flex-col justify-center ${isMobile ? 'pt-20' : 'pt-24'} pb-8 relative z-10`}>
            {children}
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}