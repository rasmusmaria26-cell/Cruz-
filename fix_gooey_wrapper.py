# -*- coding: utf-8 -*-
with open('src/app/components/LandingPage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove overflow-hidden from the specific GooeyText wrapper to prevent clipping the blur
old_wrapper_desktop = 'text-[clamp(2rem,8vw,8rem)] leading-[0.88] font-[var(--font-chivo-mono)] font-black tracking-[-0.02em] mb-4 text-white overflow-hidden'
new_wrapper_desktop = 'text-[clamp(2rem,8vw,8rem)] leading-[0.88] font-[var(--font-chivo-mono)] font-black tracking-[-0.02em] mb-4 text-white relative'

if old_wrapper_desktop in content:
    content = content.replace(old_wrapper_desktop, new_wrapper_desktop)

# Also let's check if the height restriction h-24 md:h-32 is clipping. We can add some padding or change it to min-h.
# Instead of h-24 md:h-32, maybe h-[120px] md:h-[180px] to give room for the blur?
old_height = 'relative h-24 md:h-32 w-full mt-2'
new_height = 'relative h-[120px] md:h-[180px] w-full mt-2'

if old_height in content:
    content = content.replace(old_height, new_height)

with open('src/app/components/LandingPage.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated LandingPage.tsx wrapper")
