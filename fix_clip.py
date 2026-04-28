# -*- coding: utf-8 -*-
with open('src/app/globals.css', 'r', encoding='utf-8') as f:
    css = f.read()

css = css.replace('overflow-x: hidden;', 'overflow-x: clip;')

with open('src/app/globals.css', 'w', encoding='utf-8') as f:
    f.write(css)
