"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Package, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export default function ApplicationTracker() {
    const [appId, setAppId] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [result, setResult] = useState<{ status: string; message: string; date: string } | null>(null);

    const handleTrack = (e: React.FormEvent) => {
        e.preventDefault();
        if (!appId.trim()) return;

        setStatus("loading");
        setResult(null);

        // Simulate API call
        setTimeout(() => {
            const id = appId.toUpperCase();
            if (id.startsWith("A")) {
                setResult({ status: "Approved", message: "Your application has been approved and dispatched.", date: "Today" });
                setStatus("success");
            } else if (id.startsWith("R")) {
                setResult({ status: "Rejected", message: "Document mismatch. Please contact support.", date: "Yesterday" });
                setStatus("error");
            } else {
                setResult({ status: "Processing", message: "Your application is currently under review at DGS.", date: "2 days ago" });
                setStatus("success");
            }
        }, 1500);
    };

    return (
        <div className="bg-[#1e293b]/50 p-8 rounded-3xl border border-white/10 backdrop-blur-sm h-full flex flex-col">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                    <Package size={20} />
                </div>
                <h3 className="text-xl font-bold">Track Application</h3>
            </div>

            <form onSubmit={handleTrack} className="space-y-4 mb-6">
                <div>
                    <label className="block text-sm text-gray-400 mb-2">Application ID</label>
                    <div className="relative">
                        <input
                            type="text"
                            value={appId}
                            onChange={(e) => setAppId(e.target.value)}
                            placeholder="e.g., APP123456"
                            className="w-full bg-[#020817] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-400 transition-colors"
                        />
                        <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full py-3 rounded-xl bg-purple-500 text-white font-bold text-sm hover:bg-purple-600 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {status === "loading" ? <Loader2 size={18} className="animate-spin" /> : "Track Status"}
                </button>
            </form>

            <div className="flex-1">
                {result && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`p-6 rounded-2xl border ${result.status === "Rejected"
                                ? "bg-red-500/10 border-red-500/20"
                                : result.status === "Approved"
                                    ? "bg-green-500/10 border-green-500/20"
                                    : "bg-yellow-500/10 border-yellow-500/20"
                            }`}
                    >
                        <div className="flex items-start gap-3">
                            <div className={`mt-1 ${result.status === "Rejected" ? "text-red-400" : result.status === "Approved" ? "text-green-400" : "text-yellow-400"
                                }`}>
                                {result.status === "Rejected" ? <AlertCircle size={20} /> : <CheckCircle size={20} />}
                            </div>
                            <div>
                                <div className={`font-bold text-lg mb-1 ${result.status === "Rejected" ? "text-red-400" : result.status === "Approved" ? "text-green-400" : "text-yellow-400"
                                    }`}>
                                    {result.status}
                                </div>
                                <p className="text-sm text-gray-300 mb-2">{result.message}</p>
                                <div className="text-xs text-gray-500">Last Updated: {result.date}</div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {!result && status !== "loading" && (
                    <div className="text-center text-gray-500 text-sm mt-4">
                        Enter your Application ID to check real-time status.
                    </div>
                )}
            </div>
        </div>
    );
}
