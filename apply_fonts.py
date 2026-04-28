# -*- coding: utf-8 -*-
import re

# Update layout.tsx
with open('src/app/layout.tsx', 'r', encoding='utf-8') as f:
    layout = f.read()

layout = layout.replace(
    'import { Outfit, Playfair_Display, Inter, Syncopate } from "next/font/google";',
    'import { Outfit, Playfair_Display, Inter, Syncopate, Nunito } from "next/font/google";'
)

if 'const nunito' not in layout:
    syncopate_config = 'const syncopate = Syncopate({\n  weight: ["400", "700"],\n  subsets: ["latin"],\n  variable: "--font-syncopate",\n});\n'
    nunito_config = '\nconst nunito = Nunito({\n  subsets: ["latin"],\n  weight: ["400", "600", "700", "800", "900"],\n  variable: "--font-nunito",\n});\n'
    layout = layout.replace(syncopate_config, syncopate_config + nunito_config)

layout = layout.replace(
    '    antialiased',
    '     antialiased'
)

with open('src/app/layout.tsx', 'w', encoding='utf-8') as f:
    f.write(layout)


# Update globals.css
with open('src/app/globals.css', 'r', encoding='utf-8') as f:
    css = f.read()

if '--font-nunito:' not in css:
    css = css.replace(
        '  --font-sans: var(--font-inter);',
        '  --font-nunito: var(--font-nunito);\n  --font-sans: var(--font-inter);'
    )

css = css.replace(
    '--font-display: var(--font-outfit);',
    '--font-display: var(--font-nunito);'
)
css = css.replace(
    '--font-hero: var(--font-syncopate);',
    '--font-hero: var(--font-nunito);'
)
css = css.replace(
    'font-family: var(--font-display), sans-serif;',
    'font-family: var(--font-nunito), sans-serif;'
)

with open('src/app/globals.css', 'w', encoding='utf-8') as f:
    f.write(css)


# Update LandingPage.tsx
with open('src/app/components/LandingPage.tsx', 'r', encoding='utf-8') as f:
    landing = f.read()

replacements = {
    'className="text-[clamp(2rem,7vw,8rem)] leading-[0.9] font-[var(--font-display)] tracking-wide mb-4 text-white overflow-hidden"': 'className="text-[clamp(2rem,9vw,8rem)] leading-[0.88] font-[var(--font-nunito)] font-black tracking-[-0.03em] mb-4 text-white overflow-hidden text-shimmer"',
    
    'className="text-sm sm:text-base md:text-2xl font-serif text-[var(--text-muted)] mb-4 sm:mb-6 uppercase tracking-widest"': 'className="text-sm sm:text-base md:text-2xl font-[var(--font-nunito)] font-semibold text-[var(--text-muted)] mb-4 sm:mb-6 uppercase tracking-[0.2em]"',
    
    'className="font-display text-lg sm:text-xl md:text-3xl tracking-wider leading-none"': 'className="font-[var(--font-nunito)] font-black text-lg sm:text-xl md:text-3xl tracking-tight leading-none"',
    
    'className="flex flex-col gap-8 text-center text-3xl sm:text-4xl font-serif"': 'className="flex flex-col gap-6 sm:gap-8 text-center text-3xl sm:text-4xl font-[var(--font-nunito)] font-black tracking-tight"',
    
    'className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-[var(--text-muted)] uppercase tracking-widest flex items-center gap-4"': 'className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-[var(--font-nunito)] font-black text-[var(--text-muted)] uppercase tracking-tight flex items-center gap-4"',
    
    'className="absolute -top-10 -right-10 text-7xl md:text-9xl font-display text-white/5 group-hover:text-white/10 transition-colors pointer-events-none"': 'className="absolute -top-10 -right-10 text-7xl md:text-9xl font-[var(--font-nunito)] font-black text-white/5 group-hover:text-white/10 transition-colors pointer-events-none"',
    
    'className="text-3xl md:text-5xl font-display text-[var(--accent)] mb-6"': 'className="text-3xl md:text-5xl font-[var(--font-nunito)] font-black text-[var(--accent)] mb-4 md:mb-6"',
    
    'className="text-xl sm:text-2xl md:text-3xl font-serif mb-4 text-white uppercase tracking-wider"': 'className="text-xl sm:text-2xl md:text-3xl font-[var(--font-nunito)] font-black mb-3 md:mb-4 text-white uppercase tracking-tight"',
    
    'className="text-lg md:text-2xl font-serif uppercase tracking-wider mb-3"': 'className="text-lg md:text-2xl font-[var(--font-nunito)] font-black uppercase tracking-tight mb-2 md:mb-3"',
    
    'className="text-3xl sm:text-4xl md:text-6xl font-serif text-white uppercase tracking-widest mb-6 drop-shadow-lg"': 'className="text-3xl sm:text-4xl md:text-6xl font-[var(--font-nunito)] font-black text-white uppercase tracking-tight mb-4 md:mb-6"',
    
    'className="hidden sm:block text-8xl md:text-9xl font-display text-white/5 sm:mb-[-40px] md:mb-[-60px] mb-0 pointer-events-none select-none"': 'className="hidden sm:block text-8xl md:text-9xl font-[var(--font-nunito)] font-black text-white/5 sm:mb-[-40px] md:mb-[-60px] mb-0 pointer-events-none select-none"',
    
    'className="text-xl sm:text-2xl md:text-3xl font-display tracking-wide mb-4 text-white uppercase"': 'className="text-xl sm:text-2xl md:text-3xl font-[var(--font-nunito)] font-black tracking-tight mb-3 md:mb-4 text-white uppercase"',
    
    'className="text-[var(--accent)] text-xs sm:text-sm md:text-lg font-bold tracking-widest mb-2 font-serif uppercase"': 'className="text-[var(--accent)] text-xs sm:text-sm font-[var(--font-nunito)] font-bold tracking-[0.2em] mb-2 uppercase"',
    
    'className="text-2xl sm:text-3xl md:text-4xl font-serif text-[var(--text-muted)] uppercase tracking-widest text-center mb-16"': 'className="text-2xl sm:text-3xl md:text-4xl font-[var(--font-nunito)] font-black text-[var(--text-muted)] uppercase tracking-tight text-center mb-10 md:mb-16"',
    
    'className="font-bold tracking-wide uppercase font-serif"': 'className="font-[var(--font-nunito)] font-black tracking-tight uppercase text-sm"',
    
    'className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif uppercase tracking-widest mb-8"': 'className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-[var(--font-nunito)] font-black uppercase tracking-tight mb-6 md:mb-8"',
    
    'className="text-2xl font-serif mb-6 uppercase tracking-wider text-white"': 'className="text-xl md:text-2xl font-[var(--font-nunito)] font-black mb-5 md:mb-6 uppercase tracking-tight text-white"',
    
    'className="w-full bg-[var(--accent)] hover:bg-[var(--accent-warm)] transition-colors text-black font-bold py-4 min-h-[52px] rounded-sm uppercase tracking-wider font-serif"': 'className="w-full bg-[var(--accent)] hover:bg-[var(--accent-warm)] transition-colors text-black font-bold py-4 min-h-[52px] rounded-sm uppercase tracking-wider font-[var(--font-nunito)]"',
    
    'className="font-display tracking-wider text-lg text-white"': 'className="font-[var(--font-nunito)] font-black tracking-tight text-lg text-white"'
}

for old, new in replacements.items():
    if old in landing:
        landing = landing.replace(old, new)
        print(f"Replaced '{old[:40]}...'")
    else:
        print(f"Warning: Could not find exactly '{old[:40]}...'")
        
        # specific fallbacks based on what could be wrong
        if "text-lg sm:text-xl md:text-3xl tracking-wider leading-none" in old:
            # Maybe the class order is different in my file
            pass

with open('src/app/components/LandingPage.tsx', 'w', encoding='utf-8') as f:
    f.write(landing)
