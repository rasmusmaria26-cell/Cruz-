import { Shield, Car, Heart } from 'lucide-react';

const partners = [
    "Tata AIG", "HDFC Ergo", "Bharti AXA", "Bajaj Allianz", "Reliance",
    "Shriram", "Magma HDI", "Digit", "IFFCO-Tokio", "ICICI Lombard",
    "Liberty", "Care", "Manipal Cigna", "Kotak", "Star Health"
];

export default function Insurance() {
    return (
        <section id="insurance" className="py-20 px-6 bg-navy text-white">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold font-oswald mb-4">
                    Insurance <span className="text-gold">Partners</span>
                </h2>
                <p className="text-gray-300 mb-12 max-w-2xl mx-auto">
                    We provide all types of Vehicle and Health Insurance with top partners.
                </p>

                <div className="flex flex-col md:flex-row justify-center gap-8 mb-16">
                    <div className="bg-white/10 p-6 backdrop-blur-sm border border-white/20 flex flex-col items-center w-full md:w-64">
                        <Car className="h-12 w-12 text-gold mb-4" />
                        <h3 className="text-xl font-bold font-oswald">Vehicle Insurance</h3>
                    </div>
                    <div className="bg-white/10 p-6 backdrop-blur-sm border border-white/20 flex flex-col items-center w-full md:w-64">
                        <Heart className="h-12 w-12 text-gold mb-4" />
                        <h3 className="text-xl font-bold font-oswald">Health Insurance</h3>
                    </div>
                </div>

                <div className="bg-white/5 p-8 rounded-lg">
                    <h3 className="text-xl font-bold font-oswald mb-6 text-gold">Our Trusted Partners</h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        {partners.map((partner, idx) => (
                            <span key={idx} className="bg-white text-navy font-bold py-2 px-4 text-sm shadow-md">
                                {partner}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
