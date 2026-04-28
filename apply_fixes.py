import sys

def replace_in_file(path, old, new):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    if old in content:
        content = content.replace(old, new)
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Successfully replaced "{old[:30]}..." in {path}')
    else:
        print(f'Warning: Could not find "{old[:30]}..." in {path}')

path = 'src/app/components/LandingPage.tsx'

# 1. ROOT WRAPPER
replace_in_file(path, 'pb-24 md:pb-0', 'pb-28 md:pb-0')

# 2. NAVBAR
replace_in_file(path, 'max-w-7xl mx-auto px-6 flex justify-between items-center', 'max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center')
replace_in_file(path, 'text-xl md:text-3xl tracking-wider', 'text-lg sm:text-xl md:text-3xl tracking-wider')
replace_in_file(path, '<button className="lg:hidden" onClick={() => setMobileMenuOpen(true)}>', '<button className="lg:hidden p-2 -mr-2 min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation" onClick={() => setMobileMenuOpen(true)}>')

# 3. MOBILE MENU OVERLAY
replace_in_file(path, '<button className="absolute top-6 right-6" onClick={() => setMobileMenuOpen(false)}>', '<button className="absolute top-6 right-6 min-h-[44px] min-w-[44px] flex items-center justify-center" onClick={() => setMobileMenuOpen(false)}>')
replace_in_file(path, 'text-center text-4xl font-serif', 'text-center text-3xl sm:text-4xl font-serif')
replace_in_file(path, 'fixed inset-0 z-[60] bg-[var(--bg-base)] flex flex-col justify-center items-center', 'fixed inset-0 z-[60] bg-[var(--bg-base)] flex flex-col justify-center items-center pb-[env(safe-area-inset-bottom)]')

# 4. HERO
replace_in_file(path, 'px-4 py-1.5 border border-white/10 rounded-full text-xs uppercase', 'px-3 py-1.5 border border-white/10 rounded-full text-[10px] sm:text-xs sm:px-4 uppercase')
replace_in_file(path, 'text-[clamp(2.5rem,8vw,8rem)]', 'text-[clamp(2rem,7vw,8rem)]')
replace_in_file(path, 'text-xl md:text-4xl font-serif text-[var(--text-muted)]', 'text-base sm:text-xl md:text-4xl font-serif text-[var(--text-muted)]')
replace_in_file(path, 'text-base md:text-xl text-[var(--text-muted)]', 'text-sm sm:text-base md:text-xl text-[var(--text-muted)]')
replace_in_file(path, 'w-full md:w-auto px-8 py-4 bg-[var(--accent)]', 'w-full md:w-auto px-8 py-4 min-h-[48px] bg-[var(--accent)]')
replace_in_file(path, 'w-full md:w-auto px-8 py-4 border border-[var(--border)]', 'w-full md:w-auto px-8 py-4 min-h-[48px] border border-[var(--border)]')

# 5. SERVICES SECTION
replace_in_file(path, 'py-32 px-6 relative bg-[var(--bg-base)]', 'py-16 md:py-32 px-4 sm:px-6 relative bg-[var(--bg-base)]')
replace_in_file(path, 'text-4xl md:text-5xl font-serif', 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif')
replace_in_file(path, 'p-8 md:p-12 h-full', 'p-5 sm:p-8 md:p-12 h-full')
replace_in_file(path, 'text-9xl font-display', 'text-7xl md:text-9xl font-display')
replace_in_file(path, 'text-5xl font-display', 'text-3xl md:text-5xl font-display')
replace_in_file(path, 'text-3xl font-serif', 'text-xl sm:text-2xl md:text-3xl font-serif')
replace_in_file(path, 'text-lg leading-relaxed', 'text-sm sm:text-base md:text-lg leading-relaxed')
replace_in_file(path, 'className="inline-flex items-center text-[var(--accent)]', 'className="min-h-[44px] inline-flex items-center text-[var(--accent)]')

# 6. WHY CRUZE SECTION
replace_in_file(path, 'py-24 px-6 relative overflow-hidden', 'py-14 md:py-24 px-4 sm:px-6 relative overflow-hidden')
replace_in_file(path, 'w-16 h-16 text-[var(--accent)]', 'w-10 h-10 md:w-16 md:h-16 text-[var(--accent)]')
replace_in_file(path, 'text-2xl font-serif uppercase tracking-wider', 'text-lg md:text-2xl font-serif uppercase tracking-wider')

# 7. PROCESS / TIMELINE SECTION
replace_in_file(path, 'py-32 px-6 relative bg-fixed', 'py-16 md:py-32 px-4 sm:px-6 relative bg-fixed')
replace_in_file(path, 'text-4xl md:text-6xl font-serif', 'text-3xl sm:text-4xl md:text-6xl font-serif')
replace_in_file(path, 'text-8xl md:text-9xl font-display', 'text-8xl md:text-9xl hidden sm:block font-display')
replace_in_file(path, 'mb-[-40px] md:mb-[-60px]', 'sm:mb-[-40px] md:mb-[-60px] mb-0')
replace_in_file(path, 'p-8 border border-white/5', 'p-5 sm:p-8 border border-white/5')
replace_in_file(path, 'text-[var(--accent)] text-lg font-bold', 'text-[var(--accent)] text-xs sm:text-sm md:text-lg font-bold')
replace_in_file(path, 'text-3xl font-display tracking-wide', 'text-xl sm:text-2xl md:text-3xl font-display tracking-wide')
replace_in_file(path, 'relative border-l border-white/10 md:border-l-0 md:border-none pl-8 md:pl-0', 'relative border-l border-white/10 md:border-l-0 md:border-none pl-8 md:pl-0 ml-2')

# 8. TESTIMONIALS SECTION
replace_in_file(path, 'py-24 px-6 relative bg-[var(--bg-base)]', 'py-14 md:py-24 px-4 sm:px-6 relative bg-[var(--bg-base)]')
replace_in_file(path, 'text-3xl md:text-4xl font-serif', 'text-2xl sm:text-3xl md:text-4xl font-serif')
replace_in_file(path, 'min-w-[85vw] md:min-w-0 snap-center bg-[var(--bg-card)] p-8', 'min-w-[82vw] sm:min-w-[70vw] md:min-w-0 snap-center bg-[var(--bg-card)] p-5 sm:p-8')
replace_in_file(path, 'text-lg italic mb-8', 'text-sm sm:text-base md:text-lg italic mb-8')

# 9. CONTACT SECTION
replace_in_file(path, 'py-24 px-6 relative border-t border-white/5', 'py-14 md:py-24 px-4 sm:px-6 relative border-t border-white/5')
replace_in_file(path, 'max-w-7xl mx-auto grid md:grid-cols-2 gap-16', 'max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-16')
replace_in_file(path, 'text-4xl md:text-5xl font-serif uppercase tracking-widest', 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif uppercase tracking-widest')
replace_in_file(path, 'h-64 bg-white/5', 'h-48 sm:h-64 bg-white/5')
replace_in_file(path, 'p-8 md:p-10 rounded-sm', 'p-5 sm:p-8 md:p-10 rounded-sm')
replace_in_file(path, '<input required name="name" type="text" placeholder="Your Name" className="w-full bg-[var(--bg-base)] border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-[var(--accent)] transition-colors" />', '<input required name="name" type="text" placeholder="Your Name" className="w-full bg-[var(--bg-base)] border border-white/10 rounded-sm px-4 py-3 text-base min-h-[48px] text-white focus:outline-none focus:border-[var(--accent)] transition-colors" />')
replace_in_file(path, '<input required name="phone" type="tel" placeholder="Phone Number" className="w-full bg-[var(--bg-base)] border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-[var(--accent)] transition-colors" />', '<input required name="phone" type="tel" placeholder="Phone Number" className="w-full bg-[var(--bg-base)] border border-white/10 rounded-sm px-4 py-3 text-base min-h-[48px] text-white focus:outline-none focus:border-[var(--accent)] transition-colors" />')
replace_in_file(path, '<select name="service" className="w-full bg-[var(--bg-base)] border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-[var(--accent)] transition-colors appearance-none">', '<select name="service" className="w-full bg-[var(--bg-base)] border border-white/10 rounded-sm px-4 py-3 text-base min-h-[48px] text-white focus:outline-none focus:border-[var(--accent)] transition-colors appearance-none">')
replace_in_file(path, '<textarea required name="message" rows={4} placeholder="Your message..." className="w-full bg-[var(--bg-base)] border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-[var(--accent)] transition-colors resize-none" />', '<textarea required name="message" rows={4} placeholder="Your message..." className="w-full bg-[var(--bg-base)] border border-white/10 rounded-sm px-4 py-3 text-base min-h-[48px] text-white focus:outline-none focus:border-[var(--accent)] transition-colors resize-none" />')
replace_in_file(path, 'text-black font-bold py-4 rounded-sm', 'text-black font-bold py-4 min-h-[52px] rounded-sm')

# 10. FOOTER
replace_in_file(path, 'py-8 pb-24 md:pb-8', 'py-8 pb-28 md:pb-8')
replace_in_file(path, 'max-w-7xl mx-auto px-6 flex flex-col', 'max-w-7xl mx-auto px-4 sm:px-6 flex flex-col')
replace_in_file(path, 'gap-4 text-sm text-[var(--text-muted)]', 'gap-4 text-xs sm:text-sm text-[var(--text-muted)]')

# 11. FLOATING WHATSAPP FAB
replace_in_file(path, 'className="fixed bottom-24 md:bottom-8 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform animate-pulse-ring"', 'className="fixed bottom-24 md:bottom-8 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-transform animate-pulse-ring"')

# 12. MOBILE STICKY CTA BAR
replace_in_file(path, 'p-4 pb-[max(1rem,env(safe-area-inset-bottom))] flex gap-4', 'p-4 pb-[max(1rem,env(safe-area-inset-bottom))] pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] flex gap-4')
replace_in_file(path, 'flex-1 bg-white/5 border border-white/10 text-white font-medium py-3 rounded-sm flex items-center justify-center gap-2', 'flex-1 bg-white/5 border border-white/10 text-white font-medium py-3 min-h-[48px] active:opacity-80 rounded-sm flex items-center justify-center gap-2')
replace_in_file(path, 'flex-1 bg-[var(--accent)] text-black font-semibold py-3 rounded-sm flex items-center justify-center gap-2', 'flex-1 bg-[var(--accent)] text-black font-semibold py-3 min-h-[48px] active:opacity-80 rounded-sm flex items-center justify-center gap-2')

print("All replacements done!")
