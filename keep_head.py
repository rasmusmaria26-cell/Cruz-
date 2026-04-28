with open('src/app/components/LandingPage.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
skip = False
for line in lines:
    if line.startswith('======='):
        skip = True
        continue
    if line.startswith('<<<<<<< HEAD'):
        continue
    if skip and line.startswith('>>>>>>>'):
        skip = False
        continue
    if not skip:
        new_lines.append(line)

with open('src/app/components/LandingPage.tsx', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)
