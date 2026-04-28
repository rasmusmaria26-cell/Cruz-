# -*- coding: utf-8 -*-
import re

with open('src/app/components/LandingPage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the import
content = content.replace('import { TextRotate } from "./ui/text-rotate";', 'import { GooeyText } from "./ui/gooey-text-morphing";')

# Define what we want to replace
text_rotate_block = '''<TextRotate
          texts={["CREW MANNING","COLLEGE ADMISSIONS",
                  "COURSES BOOKING","PASSPORT ONLINE"]}
          mainClassName="justify-start text-[var(--accent)]"
          staggerDuration={0.04}
          staggerFrom="first"
          rotationInterval={3000}
        />'''

gooey_block = '''<div className="relative h-24 md:h-32 w-full mt-2">
          <GooeyText
            texts={["CREW MANNING","COLLEGE ADMISSIONS", "COURSES BOOKING", "PASSPORT ONLINE"]}
            morphTime={1.2}
            cooldownTime={2.5}
            className="w-full h-full"
            textClassName="text-[var(--accent)]"
          />
        </div>'''

# Execute replacement
content = content.replace(text_rotate_block, gooey_block)

# Since TextRotate might have been copied to the Mobile Hero block in my previous script (Wait, did I put it there? No, the mobile hero uses static text in my last script: "MARITIME CAREER"). Let's just do a normal replace.

with open('src/app/components/LandingPage.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated LandingPage.tsx with GooeyText")
