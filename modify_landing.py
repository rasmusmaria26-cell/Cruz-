# -*- coding: utf-8 -*-
import re

with open('src/app/components/LandingPage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Replace imports
content = content.replace('import ParallaxStackHero from "./ui/ParallaxStackHero";', 
                          'import ScrollExpandMedia from "./ui/scroll-expansion-hero";\nimport { SparklesCore } from "./ui/sparkles";')

# 2. Find the ParallaxStackHero block
start_tag = '<ParallaxStackHero'
end_tag = '</ParallaxStackHero>'
start_idx = content.find(start_tag)
end_idx = content.find(end_tag) + len(end_tag)

if start_idx != -1 and end_idx != -1:
    parallax_block = content[start_idx:end_idx]
    
    # Extract the inner children block
    # It starts at: <div ref={heroRef} onClick={handleHeroClick}>
    # and ends right before </ParallaxStackHero>
    inner_start = parallax_block.find('<div ref={heroRef}')
    inner_end = parallax_block.rfind('</div>') + len('</div>')
    
    inner_content = parallax_block[inner_start:inner_end]
    
    # We will construct the new heroes block
    desktop_hero = f'''
        {{/* Desktop Hero Section — Cinematic Scroll */}}
        <div className="hidden md:block">
          <section id="home-desktop" className="relative overflow-hidden">
            <ScrollExpandMedia
              mediaType="video"
              mediaSrc="/hero-video.mp4"
              bgImageSrc="/hero-bg.jpg"
              title="CRUZE MARINE"
              date="Est. Tuticorin"
              scrollToExpand="Scroll to Explore"
              textBlend={{true}}
            >
              {inner_content}
            </ScrollExpandMedia>
          </section>
        </div>
'''

    mobile_hero = f'''
        {{/* Mobile Hero Section — Sparkles */}}
        <div className="block md:hidden relative w-full bg-[var(--bg-base)] flex flex-col items-center justify-center overflow-hidden" style={{{{ minHeight: "100dvh" }}}}>
          <div className="absolute inset-0 z-0">
            <SparklesCore
              id="tsparticlesmobile"
              background="transparent"
              minSize={{0.6}}
              maxSize={{1.4}}
              particleDensity={{100}}
              className="w-full h-full"
              particleColor="#FFFFFF"
              speed={{1}}
            />
          </div>
          
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[var(--bg-base)] to-transparent pointer-events-none z-10" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--bg-base)] to-transparent pointer-events-none z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(196,98,45,0.1)_0%,transparent_70%)] pointer-events-none z-10" />

          <div className="relative z-20 w-full px-5 py-24 flex flex-col justify-center items-center text-center">
            {inner_content.replace('ref={heroRef}', '').replace('onClick={handleHeroClick}', '')}
          </div>
        </div>
'''
    
    new_heroes = desktop_hero + mobile_hero
    content = content[:start_idx] + new_heroes + content[end_idx:]

with open('src/app/components/LandingPage.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated LandingPage.tsx")
