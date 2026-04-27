'use client';

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const delta = e.deltaY * 0.0009;
        const next = Math.min(Math.max(scrollProgress + delta, 0), 1);
        setScrollProgress(next);
        if (next >= 1) { setMediaFullyExpanded(true); setShowContent(true); }
        else if (next < 0.75) setShowContent(false);
      }
    };

    const handleTouchStart = (e: TouchEvent) => setTouchStartY(e.touches[0].clientY);

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartY) return;
      const delta = touchStartY - e.touches[0].clientY;
      if (mediaFullyExpanded && delta < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false); e.preventDefault(); return;
      }
      if (!mediaFullyExpanded) {
        e.preventDefault();
        const factor = delta < 0 ? 0.008 : 0.005;
        const next = Math.min(Math.max(scrollProgress + delta * factor, 0), 1);
        setScrollProgress(next);
        if (next >= 1) { setMediaFullyExpanded(true); setShowContent(true); }
        else if (next < 0.75) setShowContent(false);
        setTouchStartY(e.touches[0].clientY);
      }
    };

    const handleScroll = () => { if (!mediaFullyExpanded) window.scrollTo(0, 0); };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', () => setTouchStartY(0));

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [scrollProgress, mediaFullyExpanded, touchStartY]);

  const w = 300 + scrollProgress * (isMobile ? 650 : 1250);
  const h = 400 + scrollProgress * (isMobile ? 200 : 400);
  const tx = scrollProgress * (isMobile ? 180 : 150);

  const firstWord = title?.split(' ')[0] ?? '';
  const rest = title?.split(' ').slice(1).join(' ') ?? '';

  return (
    <div className="transition-colors duration-700 ease-in-out overflow-x-hidden">
      <section className="relative flex flex-col items-center justify-start min-h-[100dvh]">
        <div className="relative w-full flex flex-col items-center min-h-[100dvh]">
          {/* Background image */}
          <motion.div
            className="absolute inset-0 z-0 h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 - scrollProgress }}
            transition={{ duration: 0.1 }}
          >
            <Image src={bgImageSrc} alt="Background" fill className="object-cover object-center" />
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>

          <div className="container mx-auto flex flex-col items-center justify-start relative z-10">
            <div className="flex flex-col items-center justify-center w-full h-[100dvh] relative">
              {/* Media card */}
              <div
                className="absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl transition-none overflow-hidden"
                style={{ width: `${w}px`, height: `${h}px`, maxWidth: '95vw', maxHeight: '85vh', boxShadow: '0 0 60px rgba(0,0,0,0.5)' }}
              >
                {mediaType === 'video' ? (
                  <div className="relative w-full h-full pointer-events-none">
                    <video src={mediaSrc} poster={posterSrc} autoPlay muted loop playsInline className="w-full h-full object-cover" />
                    <motion.div className="absolute inset-0 bg-black/40 rounded-xl" animate={{ opacity: 0.5 - scrollProgress * 0.3 }} />
                  </div>
                ) : (
                  <div className="relative w-full h-full">
                    <Image src={mediaSrc} alt={title ?? 'Media'} fill className="object-cover" />
                    <motion.div className="absolute inset-0 bg-black/50 rounded-xl" animate={{ opacity: 0.7 - scrollProgress * 0.3 }} />
                  </div>
                )}

                <div className="flex flex-col items-center text-center relative z-10 mt-4">
                  {date && (
                    <p className="text-xl text-[var(--accent)] font-light italic" style={{ transform: `translateX(-${tx}vw)` }}>{date}</p>
                  )}
                  {scrollToExpand && (
                    <p className="text-[var(--text-muted)] text-sm uppercase tracking-widest" style={{ transform: `translateX(${tx}vw)` }}>{scrollToExpand}</p>
                  )}
                </div>
              </div>

              {/* Title text split */}
              <div className="flex items-center justify-center text-center gap-2 w-full relative z-10 flex-col">
                <motion.h2
                  className="text-[12vw] md:text-[10vw] font-hero text-shimmer uppercase tracking-[0.2em] leading-none whitespace-nowrap"
                  style={{ transform: `translateX(-${tx}vw)` }}
                >{firstWord}</motion.h2>
                <motion.h2
                  className="text-[12vw] md:text-[10vw] font-hero text-shimmer uppercase tracking-[0.2em] leading-none text-center whitespace-nowrap"
                  style={{ transform: `translateX(${tx}vw)` }}
                >{rest}</motion.h2>
              </div>
            </div>

            {/* Revealed content */}
            <motion.section
              className="flex flex-col w-full px-8 py-10 md:px-16 lg:py-20 bg-[var(--bg-base)] text-[var(--text-primary)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.7 }}
            >
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
