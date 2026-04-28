# -*- coding: utf-8 -*-
with open('src/app/components/ui/ParallaxStackHero.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('font-[var(--font-syncopate)]', 'font-[var(--font-nunito)] font-black')
content = content.replace('font-[var(--font-outfit)]', 'font-[var(--font-nunito)] font-black')
# Also remove tracking-wider from "YOUR GATEWAY TO A" to match the tight tracking of Nunito black
content = content.replace('tracking-wider', 'tracking-tight')

with open('src/app/components/ui/ParallaxStackHero.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated ParallaxStackHero.tsx fonts!")
