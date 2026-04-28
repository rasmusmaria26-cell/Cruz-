import re

with open('src/app/components/LandingPage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace Navbar logo
navbar_old = '''              <div className="flex items-center gap-3">
                <ShipWheel className="w-8 h-8 text-[var(--accent)]" />
                <div>
                  <h1 className="font-[var(--font-nunito)] font-black text-lg sm:text-xl md:text-3xl tracking-tight leading-none">CRUZE</h1>
                  <p className="text-[8px] md:text-[10px] uppercase tracking-widest text-[var(--text-muted)]">Marine Service</p>
                </div>
              </div>'''

navbar_new = '''              <div className="flex items-center">
                <img src="/cruz-logo.png" alt="Cruze Marine Service" className="h-10 md:h-14 w-auto object-contain" />
              </div>'''

# Replace Footer logo
footer_old = '''              <div className="flex items-center gap-2">
                <ShipWheel className="w-5 h-5 text-[var(--accent)]" />
                <span className="font-[var(--font-nunito)] font-black tracking-tight text-lg text-white">CRUZE</span>
              </div>'''

footer_new = '''              <div className="flex items-center">
                <img src="/cruz-logo.png" alt="Cruze Marine Service" className="h-6 sm:h-8 w-auto object-contain grayscale opacity-80" />
              </div>'''

if navbar_old in content:
    content = content.replace(navbar_old, navbar_new)
else:
    print("Navbar logo not found")

if footer_old in content:
    content = content.replace(footer_old, footer_new)
else:
    print("Footer logo not found")

with open('src/app/components/LandingPage.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated Logos")
