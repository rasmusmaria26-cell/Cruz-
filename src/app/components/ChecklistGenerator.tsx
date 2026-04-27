"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckSquare, Download, FileText, ChevronDown } from "lucide-react";

const CHECKLIST_DATA: Record<string, string[]> = {
    "CDC Renewal": ["Old CDC (First & Last Page)", "Passport (Front & Back)", "Passport Size Photo (White Background)", "Medical Certificate (DG Approved)", "INDOS Number"],
    "DGS Profile Update": ["Recent Passport Size Photo", "Signature (Black Ink on White Paper)", "10th Marksheet", "Address Proof (Aadhar/Passport)", "Email & Phone Number"],
    "STCW Courses": ["Passport (Front & Back)", "INDOS Number", "Medical Certificate", "CDC (if available)"],
    "INDOS Registration": ["Passport (Front & Back)", "10th Marksheet", "Passport Size Photo", "Signature"],
    "Watchkeeping (COP)": ["Sea Service Testimonials", "Tar Book Pages", "Passport (All stamped pages)", "CDC (All stamped pages)", "Medical Fitness Certificate"],
};

export default function ChecklistGenerator() {
    const [selectedService, setSelectedService] = useState<string>("CDC Renewal");
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

    const handleCheck = (item: string) => {
        setCheckedItems((prev) => ({ ...prev, [item]: !prev[item] }));
    };

    const progress = Math.round(
        (Object.values(checkedItems).filter(Boolean).length / CHECKLIST_DATA[selectedService].length) * 100
    );

    return (
        <div className="bg-[#1e293b]/50 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <CheckSquare size={20} />
                </div>
                <h3 className="text-xl font-bold">Document Checklist</h3>
            </div>

            <div className="mb-6">
                <label className="block text-sm text-gray-400 mb-2">Select Service</label>
                <div className="relative">
                    <select
                        value={selectedService}
                        onChange={(e) => {
                            setSelectedService(e.target.value);
                            setCheckedItems({});
                        }}
                        className="w-full bg-[#020817] border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-blue-400 transition-colors cursor-pointer"
                    >
                        {Object.keys(CHECKLIST_DATA).map((service) => (
                            <option key={service} value={service}>
                                {service}
                            </option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>
            </div>

            <div className="space-y-3 mb-8">
                <AnimatePresence mode="wait">
                    {CHECKLIST_DATA[selectedService].map((item, index) => (
                        <motion.div
                            key={item}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-center gap-3 p-3 rounded-xl bg-[#020817]/50 border border-white/5 hover:border-white/10 transition-colors cursor-pointer"
                            onClick={() => handleCheck(item)}
                        >
                            <div
                                className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${checkedItems[item]
                                        ? "bg-blue-500 border-blue-500"
                                        : "border-gray-500"
                                    }`}
                            >
                                {checkedItems[item] && <FileText size={12} className="text-white" />}
                            </div>
                            <span className={`text-sm ${checkedItems[item] ? "text-gray-400 line-through" : "text-gray-200"}`}>
                                {item}
                            </span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Completion</span>
                    <span>{progress}%</span>
                </div>
                <div className="w-full h-2 bg-[#020817] rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-full bg-gradient-to-r from-blue-400 to-blue-600"
                    />
                </div>

                <button
                    onClick={() => {
                        const text = `*Document Checklist for ${selectedService}*\n\n` +
                            CHECKLIST_DATA[selectedService].map(item => `- [ ] ${item}`).join("\n");

                        const blob = new Blob([text], { type: "text/plain" });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = `${selectedService.replace(/\s+/g, "_")}_Checklist.txt`;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                    }}
                    className="w-full py-3 rounded-xl bg-blue-500/10 text-blue-400 font-bold text-sm hover:bg-blue-500/20 transition-colors flex items-center justify-center gap-2"
                >
                    <Download size={16} /> Download Checklist
                </button>
            </div>
        </div>
    );
}
