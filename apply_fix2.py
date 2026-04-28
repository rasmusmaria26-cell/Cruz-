# -*- coding: utf-8 -*-

with open('src/app/components/LandingPage.tsx', 'r', encoding='utf-8') as f:
    landing = f.read()

landing = landing.replace(
    'className="text-8xl md:text-9xl hidden sm:block font-display text-white/5 sm:mb-[-40px] md:mb-[-60px] mb-0 pointer-events-none select-none"',
    'className="hidden sm:block text-8xl md:text-9xl font-[var(--font-nunito)] font-black text-white/5 sm:mb-[-40px] md:mb-[-60px] mb-0 pointer-events-none select-none"'
)

landing = landing.replace(
    'className="w-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-warm)] text-black font-bold py-4 min-h-[52px] rounded-sm hover:shadow-[0_0_20px_rgba(196,98,45,0.4)] transition-shadow tracking-wide mt-2 uppercase font-serif"',
    'className="w-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-warm)] text-black font-bold py-4 min-h-[52px] rounded-sm hover:shadow-[0_0_20px_rgba(196,98,45,0.4)] transition-shadow tracking-wide mt-2 uppercase font-[var(--font-nunito)]"'
)

with open('src/app/components/LandingPage.tsx', 'w', encoding='utf-8') as f:
    f.write(landing)

print("Fixes applied.")
