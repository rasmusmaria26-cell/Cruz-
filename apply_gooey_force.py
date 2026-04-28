# -*- coding: utf-8 -*-
with open('src/app/components/LandingPage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

start_tag = '<TextRotate'
end_tag = '/>'
start_idx = content.find(start_tag)

if start_idx != -1:
    end_idx = content.find(end_tag, start_idx) + len(end_tag)
    
    gooey_block = '''<div className="relative h-24 md:h-32 w-full mt-2">
          <GooeyText
            texts={["CREW MANNING", "COLLEGE ADMISSIONS", "COURSES BOOKING", "PASSPORT ONLINE"]}
            morphTime={1.2}
            cooldownTime={2.5}
            className="w-full h-full"
            textClassName="text-[var(--accent)]"
          />
        </div>'''
        
    content = content[:start_idx] + gooey_block + content[end_idx:]

with open('src/app/components/LandingPage.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated LandingPage.tsx with GooeyText FORCE")
