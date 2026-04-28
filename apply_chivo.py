# -*- coding: utf-8 -*-
with open('src/app/layout.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

if 'Chivo_Mono' not in content:
    content = content.replace('Syncopate, Nunito }', 'Syncopate, Nunito, Chivo_Mono }')
    content = content.replace('import { Outfit, Playfair_Display, Inter, Syncopate }', 'import { Outfit, Playfair_Display, Inter, Syncopate, Chivo_Mono }')

    chivo_config = '''const chivoMono = Chivo_Mono({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-chivo-mono",
});'''
    if 'const nunito' in content:
        content = content.replace('const nunito', chivo_config + '\n\nconst nunito')
    else:
        content = content.replace('const syncopate', chivo_config + '\n\nconst syncopate')

    content = content.replace('', ' ')

with open('src/app/layout.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated layout.tsx")
