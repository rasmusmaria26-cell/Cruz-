import { Phone, MessageCircle } from 'lucide-react';

export default function Hero() {
    return (
        <section className="bg-navy text-white py-20 px-6 md:py-32">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-6xl font-bold font-oswald mb-6 leading-tight">
                    Complete Certification & <span className="text-gold">Insurance Support</span> for Seafarers
                </h1>
                <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                    We handle DGS, CDC, INDOS, STCW, and Insurance. Trustworthy support for your maritime career.
                </p>

                <div className="flex flex-col md:flex-row justify-center gap-4">
                    <a
                        href="tel:+919004749908"
                        className="bg-gold text-navy font-bold py-3 px-8 text-lg hover:bg-white transition-colors flex items-center justify-center gap-2"
                    >
                        <Phone size={20} />
                        CALL NOW
                    </a>
                    <a
                        href="https://wa.me/919004749908"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-600 text-white font-bold py-3 px-8 text-lg hover:bg-green-500 transition-colors flex items-center justify-center gap-2"
                    >
                        <MessageCircle size={20} />
                        WHATSAPP US
                    </a>
                </div>
            </div>
        </section>
    );
}
