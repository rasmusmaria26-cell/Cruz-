import { FileText, Award, CheckCircle, Anchor, Settings, Camera, BookOpen, Globe } from 'lucide-react';

const services = [
    {
        category: "Documentation & Profile",
        items: [
            { name: "DGS Profile Updation", icon: Settings },
            { name: "Fresh INDOS Registration", icon: FileText },
            { name: "Correction of Personal Details in INDOS", icon: CheckCircle },
            { name: "Photo & Signature Updation", icon: Camera },
        ]
    },
    {
        category: "Certificates (CDC & COC)",
        items: [
            { name: "CDC Application (Fresh, Renewal & Replacement)", icon: FileText },
            { name: "Watch-keeping Certificate COP-AB & Oiler", icon: Award },
            { name: "Cookery Certificate (Cook COC)", icon: Award },
            { name: "Duplicate of CDC, Cook COC", icon: FileText },
        ]
    },
    {
        category: "Endorsements & Courses",
        items: [
            { name: "DC Endorsement Basic", icon: CheckCircle },
            { name: "DC Endorsement Renewal", icon: CheckCircle },
            { name: "DC Endorsement Level II", icon: CheckCircle },
            { name: "STCW Online Course Booking", icon: BookOpen },
        ]
    },
    {
        category: "Other Services",
        items: [
            { name: "Crew Manning Support", icon: Anchor },
            { name: "eSIM Data Plans", icon: Globe },
        ]
    }
];

export default function Services() {
    return (
        <section id="services" className="py-20 px-6 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold font-oswald text-navy text-center mb-12">
                    Our <span className="text-gold">Services</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((category, idx) => (
                        <div key={idx} className="bg-white p-6 shadow-lg border-t-4 border-navy">
                            <h3 className="text-xl font-bold font-oswald text-navy mb-4 border-b border-gray-200 pb-2">
                                {category.category}
                            </h3>
                            <ul className="space-y-3">
                                {category.items.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <item.icon className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                                        <span className="text-gray-700 text-sm font-medium">{item.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
