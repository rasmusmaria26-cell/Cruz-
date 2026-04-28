# -*- coding: utf-8 -*-
with open('src/app/globals.css', 'r', encoding='utf-8') as f:
    content = f.read()

# Add --font-chivo-mono and replace --font-display
if '--font-chivo-mono: var(--font-chivo-mono);' not in content:
    content = content.replace('--font-syncopate: var(--font-syncopate);', '--font-syncopate: var(--font-syncopate);\n      --font-chivo-mono: var(--font-chivo-mono);')

content = content.replace('--font-display: var(--font-nunito);', '--font-display: var(--font-chivo-mono);')
content = content.replace('--font-display: var(--font-syncopate);', '--font-display: var(--font-chivo-mono);')

with open('src/app/globals.css', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated globals.css")
