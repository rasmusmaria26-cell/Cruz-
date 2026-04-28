# -*- coding: utf-8 -*-
with open('src/app/components/LandingPage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Hero text wrapper
content = content.replace(
    'text-[clamp(2rem,9vw,8rem)] leading-[0.88] font-[var(--font-nunito)] font-black tracking-[-0.03em] mb-4 text-white overflow-hidden text-shimmer',
    'text-[clamp(2rem,8vw,8rem)] leading-[0.88] font-[var(--font-chivo-mono)] font-black tracking-[-0.02em] mb-4 text-white overflow-hidden'
)

# 2. GooeyText props (to apply bold as requested)
content = content.replace(
    'textClassName="text-[var(--accent)]"',
    'textClassName="text-[var(--accent)] font-bold font-[var(--font-chivo-mono)]"'
)

# 3. Hero Subtitle
content = content.replace(
    'text-sm sm:text-base md:text-2xl font-[var(--font-nunito)] font-semibold text-[var(--text-muted)] mb-4 sm:mb-6 uppercase tracking-[0.2em]',
    'text-sm sm:text-base md:text-2xl font-[var(--font-chivo-mono)] font-semibold text-[var(--text-muted)] mb-4 sm:mb-6 uppercase tracking-[0.25em]'
)

# 4. Navbar Logo
content = content.replace(
    'font-display text-xl md:text-3xl tracking-wider leading-none',
    'font-[var(--font-chivo-mono)] font-black text-lg sm:text-xl md:text-3xl tracking-[0.08em] leading-none'
)

# 5. Footer Logo
content = content.replace(
    'font-display tracking-wider text-lg text-white',
    'font-[var(--font-chivo-mono)] font-black tracking-[0.08em] text-lg text-white'
)

# 6. Process Step Ghost Numbers
content = content.replace(
    'text-8xl md:text-9xl font-display text-white/5 mb-[-40px] md:mb-[-60px] pointer-events-none select-none',
    'hidden sm:block text-8xl md:text-9xl font-[var(--font-chivo-mono)] font-black text-white/5 sm:mb-[-40px] md:mb-[-60px] pointer-events-none select-none'
)

# 7. Process Step Titles h4
content = content.replace(
    'text-3xl font-display tracking-wide mb-4 text-white uppercase',
    'text-xl sm:text-2xl md:text-3xl font-[var(--font-chivo-mono)] font-bold tracking-[0.06em] mb-3 md:mb-4 text-white uppercase'
)

# 8. Services Ghost Number
content = content.replace(
    'absolute -top-10 -right-10 text-9xl font-display text-white/5',
    'absolute -top-10 -right-10 text-9xl font-[var(--font-chivo-mono)] text-white/5'
)

# 9. Services Num
content = content.replace(
    'text-5xl font-display text-[var(--accent)] mb-6',
    'text-3xl md:text-5xl font-[var(--font-chivo-mono)] font-black text-[var(--accent)] mb-4 md:mb-6 tabular-nums'
)

with open('src/app/components/LandingPage.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated LandingPage.tsx with Chivo Mono classes")
