"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Receipt, Printer, RefreshCw, Lock } from "lucide-react";

export default function InvoiceGenerator() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pin, setPin] = useState("");
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        service: "CDC Renewal",
        amount: "1500",
        date: new Date().toISOString().split('T')[0]
    });
    const [showInvoice, setShowInvoice] = useState(false);
    const invoiceRef = useRef<HTMLDivElement>(null);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (pin === "SAILOR2024") { // Simple client-side PIN
            setIsAuthenticated(true);
            setError("");
        } else {
            setError("Invalid PIN");
        }
    };

    const handlePrint = () => {
        const printContent = invoiceRef.current?.innerHTML;
        const originalContent = document.body.innerHTML;

        if (printContent) {
            document.body.innerHTML = printContent;
            window.print();
            document.body.innerHTML = originalContent;
            window.location.reload(); // Reload to restore state/events
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="bg-[#1e293b]/50 p-8 rounded-3xl border border-white/10 backdrop-blur-sm h-full flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 mb-6">
                    <Lock size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">Admin Access Only</h3>
                <p className="text-gray-400 text-sm mb-6">Enter PIN to generate invoices.</p>

                <form onSubmit={handleLogin} className="w-full max-w-xs space-y-4">
                    <input
                        type="password"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        placeholder="Enter PIN"
                        className="w-full bg-[#020817] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-400 transition-colors text-center tracking-widest"
                    />
                    {error && <p className="text-red-400 text-xs">{error}</p>}
                    <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-orange-500 text-white font-bold text-sm hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20"
                    >
                        Access Tool
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="bg-[#1e293b]/50 p-8 rounded-3xl border border-white/10 backdrop-blur-sm h-full flex flex-col">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400">
                    <Receipt size={20} />
                </div>
                <h3 className="text-xl font-bold">Invoice Generator</h3>
                <button
                    onClick={() => setIsAuthenticated(false)}
                    className="ml-auto text-xs text-gray-500 hover:text-white"
                >
                    Logout
                </button>
            </div>

            {!showInvoice ? (
                <div className="space-y-4 flex-1">
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Client Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Enter Name"
                            className="w-full bg-[#020817] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-400 transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Service</label>
                        <select
                            value={formData.service}
                            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                            className="w-full bg-[#020817] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-400 transition-colors"
                        >
                            <option>CDC Renewal</option>
                            <option>DGS Profile Update</option>
                            <option>STCW Courses</option>
                            <option>INDOS Registration</option>
                            <option>Watchkeeping</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Amount (₹)</label>
                        <input
                            type="number"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            className="w-full bg-[#020817] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-400 transition-colors"
                        />
                    </div>

                    <button
                        onClick={() => setShowInvoice(true)}
                        className="w-full mt-4 py-3 rounded-xl bg-orange-500 text-white font-bold text-sm hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20"
                    >
                        Generate Receipt
                    </button>
                </div>
            ) : (
                <div className="flex-1 flex flex-col">
                    <div className="bg-white text-black p-6 rounded-xl mb-6 flex-1 text-sm" ref={invoiceRef}>
                        <div className="text-center border-b-2 border-black pb-4 mb-4">
                            <h2 className="text-xl font-bold uppercase tracking-wider">Sailors Consultancy</h2>
                            <p className="text-xs text-gray-600">Documentation & Insurance Services</p>
                            <p className="text-xs text-gray-600">Navi Mumbai, India | +91 90047 9908</p>
                        </div>

                        <div className="flex justify-between mb-4">
                            <div>
                                <p className="text-xs text-gray-500">Billed To:</p>
                                <p className="font-bold">{formData.name || "Client"}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-gray-500">Date:</p>
                                <p className="font-bold">{formData.date}</p>
                            </div>
                        </div>

                        <table className="w-full mb-4">
                            <thead>
                                <tr className="border-b border-gray-300">
                                    <th className="text-left py-2">Description</th>
                                    <th className="text-right py-2">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="py-2">{formData.service}</td>
                                    <td className="text-right py-2">₹{formData.amount}</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr className="border-t-2 border-black font-bold">
                                    <td className="py-2">Total</td>
                                    <td className="text-right py-2">₹{formData.amount}</td>
                                </tr>
                            </tfoot>
                        </table>

                        <div className="text-center text-xs text-gray-500 mt-8">
                            <p>Thank you for your business!</p>
                            <p>This is a computer-generated receipt.</p>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => setShowInvoice(false)}
                            className="flex-1 py-3 rounded-xl bg-[#020817] border border-white/10 text-white font-bold text-sm hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
                        >
                            <RefreshCw size={16} /> New
                        </button>
                        <button
                            onClick={handlePrint}
                            className="flex-1 py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                        >
                            <Printer size={16} /> Print
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
