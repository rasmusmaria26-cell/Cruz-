import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
    return (
        <footer id="contact" className="bg-black text-white py-12 px-6 border-t-4 border-gold">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                <div>
                    <h3 className="text-2xl font-bold font-oswald text-gold mb-4">SAILORS CONSULTANCY</h3>
                    <p className="text-gray-400 text-sm">
                        Your trusted partner for all maritime certification and insurance needs.
                    </p>
                </div>

                <div>
                    <h4 className="text-xl font-bold font-oswald text-white mb-4">Contact Us</h4>
                    <div className="space-y-3 flex flex-col items-center md:items-start">
                        <a href="tel:+919004749908" className="flex items-center gap-2 text-gray-300 hover:text-gold transition-colors">
                            <Phone size={16} /> +91 9004749908
                        </a>
                        <a href="tel:+919486277143" className="flex items-center gap-2 text-gray-300 hover:text-gold transition-colors">
                            <Phone size={16} /> +91 9486277143
                        </a>
                        <a href="mailto:sailorsconsultancy@gmail.com" className="flex items-center gap-2 text-gray-300 hover:text-gold transition-colors">
                            <Mail size={16} /> sailorsconsultancy@gmail.com
                        </a>
                    </div>
                </div>

                <div>
                    <h4 className="text-xl font-bold font-oswald text-white mb-4">Address</h4>
                    <div className="flex items-start justify-center md:justify-start gap-2 text-gray-300">
                        <MapPin size={16} className="mt-1 shrink-0" />
                        <p>
                            Office No. 123, Maritime Hub,<br />
                            Sector 11, CBD Belapur,<br />
                            Navi Mumbai, India.
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} Sailors Consultancy. All rights reserved.
            </div>
        </footer>
    );
}
