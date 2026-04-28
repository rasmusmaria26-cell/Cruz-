import re

with open('src/app/components/LandingPage.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

# Root div
c = c.replace(
    'className="min-h-screen bg-[#04080f] text-[#f0ece4] font-[var(--font-dm-sans)] selection:bg-[var(--accent)] selection:text-white"',
    'className="min-h-screen bg-[#04080f] text-[#f0ece4] font-[var(--font-dm-sans)] selection:bg-[var(--accent)] selection:text-white overflow-x-hidden"'
)

# Navbar Logo Text
c = c.replace('text-3xl tracking-tighter leading-none">CRUZE MARINE', 'text-xl md:text-3xl tracking-tighter leading-none">CRUZE MARINE')

# Mobile Menu Overlay Links
c = c.replace('className="text-5xl font-[var(--font-bebas)] uppercase tracking-widest hover:text-[var(--accent)] transition-colors"', 'className="text-4xl md:text-5xl font-[var(--font-bebas)] uppercase tracking-widest hover:text-[var(--accent)] transition-colors min-h-[44px] flex items-center"')

# Hero Heading
c = c.replace('text-7xl md:text-[9rem]', 'text-[clamp(2.5rem,8vw,9rem)]')

# Buttons Touch Target
c = c.replace('px-10 py-5 bg-[var(--accent)] rounded-xl', 'px-10 py-5 bg-[var(--accent)] rounded-xl min-h-[44px] flex items-center justify-center')
c = c.replace('px-10 py-5 bg-white/5 border border-white/10 rounded-xl', 'px-10 py-5 bg-white/5 border border-white/10 rounded-xl min-h-[44px] flex items-center justify-center')

# Services Grid Container
c = c.replace('className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[800px]"', 'className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 h-auto"')

# Services Col Spans
c = c.replace('md:col-span-8 md:row-span-1', 'lg:col-span-8 lg:row-span-1 md:col-span-2')
c = c.replace('md:col-span-4 md:row-span-1', 'lg:col-span-4 lg:row-span-1 md:col-span-1')

# Services Padding
c = c.replace('p-10 h-full flex flex-col justify-end', 'p-5 md:p-8 lg:p-10 h-full flex flex-col justify-end')
c = c.replace('p-10 flex flex-col h-full justify-center', 'p-5 md:p-8 lg:p-10 flex flex-col h-full justify-center')
c = c.replace('p-10 h-full flex flex-col md:flex-row', 'p-5 md:p-8 lg:p-10 h-full flex flex-col md:flex-row')

# Services Headings
c = c.replace('text-5xl font-[var(--font-bebas)]', 'text-2xl md:text-4xl lg:text-5xl font-[var(--font-bebas)]')
c = c.replace('text-3xl font-[var(--font-bebas)]', 'text-2xl md:text-4xl font-[var(--font-bebas)]')

# About Section inner grid
c = c.replace('className="grid grid-cols-2 gap-4 relative z-10"', 'className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10"')

# Text content base md:lg
c = c.replace('className="text-[var(--text-muted)] leading-relaxed"', 'className="text-[var(--text-muted)] leading-relaxed text-base md:text-lg"')

# Process Timeline
c = c.replace('text-8xl md:text-9xl font-display text-white/5', 'hidden md:block text-8xl md:text-9xl font-display text-white/5')
c = c.replace('p-8 border border-white/5', 'p-5 md:p-8 border border-white/5')

# Testimonials Cards min-width
c = c.replace('min-w-[85vw] md:min-w-0', 'min-w-[90vw] sm:min-w-[75vw] md:min-w-0')

# Contact Section ghost text
c = c.replace('w-full opacity-[0.02]', 'hidden md:block w-full opacity-[0.02]')
c = c.replace('mt-20 grid grid-cols-1 md:grid-cols-3', 'mt-20 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3')

# Footer
c = c.replace('py-8 pb-24 md:pb-8', 'py-8 pb-32 md:pb-8')

# Floating WhatsApp FAB
# Verify padding Bottom
c = c.replace('className="md:hidden fixed bottom-6 left-6 right-6 z-[80] flex gap-4"', 'className="md:hidden fixed bottom-0 left-0 w-full bg-[var(--bg-surface)] border-t border-white/10 p-4 flex gap-4 z-40" style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}')

with open('src/app/components/LandingPage.tsx', 'w', encoding='utf-8') as f:
    f.write(c)
