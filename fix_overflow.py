# -*- coding: utf-8 -*-
with open('src/app/components/LandingPage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('font-sans overflow-x-hidden pb-28 md:pb-0', 'font-sans pb-28 md:pb-0 clip-path-fix')

with open('src/app/components/LandingPage.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
