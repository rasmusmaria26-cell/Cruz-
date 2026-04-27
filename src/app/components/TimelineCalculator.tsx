"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Calendar, ChevronDown, ArrowRight } from "lucide-react";

const TIMELINE_DATA: Record<string, { days: number; note: string }> = {
    "CDC Renewal": { days: 7, note: "Includes shipping time" },
    "DGS Profile Update": { days: 2, note: "Subject to DGS server uptime" },
    "INDOS Registration": { days: 2, note: "Working days only" },
    "Watchkeeping (COP)": { days: 20, note: "After physical submission" },
    "DC Endorsement": { days: 5, note: "Level 1 & 2" },
    "STCW Certificate": { days: 1, note: "Instant after course completion" },
};

export default function TimelineCalculator() {
    const [selectedService, setSelectedService] = useState<string>("CDC Renewal");
    const [calculatedDate, setCalculatedDate] = useState<string | null>(null);

    const calculateDate = () => {
        const days = TIMELINE_DATA[selectedService].days;
        const date = new Date();
        date.setDate(date.getDate() + days);
        setCalculatedDate(date.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    };

    return (
        <div className="bg-[#1e293b]/50 p-8 rounded-3xl border border-white/10 backdrop-blur-sm h-full flex flex-col">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                    <Clock size={20} />
                </div>
                <h3 className="text-xl font-bold">Timeline Calculator</h3>
            </div>

            <div className="flex-1 space-y-6">
                <div>
                    <label className="block text-sm text-gray-400 mb-2">Select Service</label>
                    <div className="relative">
                        <select
                            value={selectedService}
                            onChange={(e) => {
                                setSelectedService(e.target.value);
                                setCalculatedDate(null);
                            }}
                            className="w-full bg-[#020817] border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-green-400 transition-colors cursor-pointer"
                        >
                            {Object.keys(TIMELINE_DATA).map((service) => (
                                <option key={service} value={service}>
                                    {service}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                    </div>
                </div>

                <div className="bg-[#020817]/50 p-4 rounded-xl border border-white/5">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-400">Estimated Time</span>
                        <span className="font-bold text-green-400">{TIMELINE_DATA[selectedService].days} Days</span>
                    </div>
                    <p className="text-xs text-gray-500 italic">{TIMELINE_DATA[selectedService].note}</p>
                </div>

                {calculatedDate && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-green-500/10 p-4 rounded-xl border border-green-500/20"
                    >
                        <div className="text-xs text-green-400 mb-1 font-bold uppercase tracking-wider">Estimated Completion</div>
                        <div className="text-lg font-bold text-white flex items-center gap-2">
                            <Calendar size={18} /> {calculatedDate}
                        </div>
                    </motion.div>
                )}
            </div>

            <button
                onClick={calculateDate}
                className="w-full mt-6 py-3 rounded-xl bg-green-500 text-black font-bold text-sm hover:bg-green-400 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-green-500/20"
            >
                Calculate Date <ArrowRight size={16} />
            </button>
        </div>
    );
}
