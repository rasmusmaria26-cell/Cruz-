import Link from 'next/link';
import { Phone, Anchor } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="bg-navy text-white py-4 px-6 shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <Anchor className="h-8 w-8 text-gold" />
                    <span className="text-2xl font-bold font-oswald tracking-wide text-gold">
                        SAILORS CONSULTANCY
                    </span>
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex space-x-8 font-semibold">
                    <Link href="#" className="hover:text-gold transition-colors">Home</Link>
                    <Link href="#services" className="hover:text-gold transition-colors">Services</Link>
                    <Link href="#insurance" className="hover:text-gold transition-colors">Insurance</Link>
                    <Link href="#contact" className="hover:text-gold transition-colors">Contact</Link>
                </div>

                {/* Call Button */}
                <a
                    href="tel:+919004749908"
                    className="bg-gold text-navy font-bold py-2 px-6 hover:bg-white hover:text-navy transition-colors flex items-center gap-2"
                >
                    <Phone size={18} />
                    CALL NOW
                </a>
            </div>
        </nav>
    );
}
