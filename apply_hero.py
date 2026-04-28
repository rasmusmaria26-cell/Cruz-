# -*- coding: utf-8 -*-
import re

with open('src/app/components/LandingPage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Imports
content = content.replace('import ScrollExpandMedia from "./ui/scroll-expansion-hero";', 'import ParallaxStackHero from "./ui/ParallaxStackHero";')

# 2. Replace section
pattern = r'<section id="home" className="relative overflow-hidden">.*?</section>'
replacement = """<ParallaxStackHero
  title="CRUZE MARINE"
  subtitle="Est. Tuticorin"
  mediaSrc="/hero-video.mp4"
  posterSrc="/hero-bg.jpg"
  bgImageSrc="/hero-bg.jpg"
>
  {/* This becomes Layer 3 content */}
  <div ref={heroRef} onClick={handleHeroClick}>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={!isLoading ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="inline-flex items-center gap-2 px-3 py-1.5 border border-white/10 rounded-full text-[10px] uppercase tracking-widest text-[var(--text-muted)] bg-white/5 backdrop-blur-md mb-6 sm:mb-8"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
      Tuticorin's Maritime Experts
    </motion.div>

    <div className="text-[clamp(2rem,7vw,8rem)] leading-[0.9] font-[var(--font-display)] tracking-wide mb-4 text-white overflow-hidden">
      <TextRotate
        texts={["CREW MANNING","COLLEGE ADMISSIONS",
                "COURSES BOOKING","PASSPORT ONLINE"]}
        mainClassName="justify-start text-[var(--accent)]"
        staggerDuration={0.04}
        staggerFrom="first"
        rotationInterval={3000}
      />
    </div>

    <h3 className="text-sm sm:text-base md:text-2xl font-serif text-[var(--text-muted)] mb-4 sm:mb-6 uppercase tracking-widest">
      Your Gateway to a Maritime Career
    </h3>

    <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-xl mb-8 leading-relaxed">
      Crew Manning · College Admissions · Courses · Passport Services — from Tuticorin to the world's oceans.
    </p>

    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
      <MagneticButton
        href="#services"
        className="w-full sm:w-auto px-7 py-4 min-h-[48px] bg-[var(--accent)] hover:bg-[var(--accent-warm)] transition-colors text-black font-semibold rounded-sm tracking-wide text-center"
      >
        Our Services
      </MagneticButton>
      <MagneticButton
        href="https://wa.me/919003354028"
        className="w-full sm:w-auto px-7 py-4 min-h-[48px] border border-[var(--border)] hover:border-[var(--accent)] transition-colors text-white font-semibold rounded-sm tracking-wide backdrop-blur-sm bg-white/5 text-center"
      >
        WhatsApp Us
      </MagneticButton>
    </div>

  </div>
</ParallaxStackHero>"""

new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)

with open('src/app/components/LandingPage.tsx', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Replacement done!")
