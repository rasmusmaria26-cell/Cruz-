# -*- coding: utf-8 -*-
with open('src/app/components/ui/ParallaxStackHero.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace malformed bullet point
content = content.replace('-?', '●')
content = content.replace('', '●')

with open('src/app/components/ui/ParallaxStackHero.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
