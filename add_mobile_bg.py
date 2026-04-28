import re

with open('src/app/components/LandingPage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add import if not exists
if 'import Image from "next/image"' not in content:
    content = content.replace('import React, { useState, useEffect, useRef } from "react";', 'import React, { useState, useEffect, useRef } from "react";\nimport Image from "next/image";')

# Inject background image into mobile hero
mobile_hero_target = '''        {/* Mobile Hero Section — Sparkles */}
        <div className="block md:hidden relative w-full bg-[var(--bg-base)] flex flex-col items-center justify-center overflow-hidden" style={{ minHeight: "100dvh" }}>'''

mobile_hero_replacement = '''        {/* Mobile Hero Section — Sparkles */}
        <div className="block md:hidden relative w-full bg-[var(--bg-base)] flex flex-col items-center justify-center overflow-hidden" style={{ minHeight: "100dvh" }}>
          <div className="absolute inset-0 z-0">
            <Image src="/ocean-bg.png" alt="Background" fill className="object-cover opacity-20" priority />
          </div>'''

if mobile_hero_target in content:
    content = content.replace(mobile_hero_target, mobile_hero_replacement)

with open('src/app/components/LandingPage.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated background")
