import React, { useState } from 'react';
import {
    Gavel,
    AlertCircle,
    Check,
    X,
    FileText,
    ExternalLink,
    ShieldCheck,
    Lock
} from 'lucide-react';

const ValidatorDashboard = () => {
    // Essential Mock Data
    const reviewQueue = [
        { id: 1, ngo: "Al-Khair Relief", amount: 120000, category: "Fuqara (Poor)", status: "Pending" },
        { id: 2, ngo: "Orphan Care", amount: 45000, category: "Masakin (Needy)", status: "Pending" }
    ];

    const currentReview = {
        id: 1,
        ngo: "Al-Khair Relief",
        amount: 120000,
        purpose: "Emergency Food Rations for 100 Families",
        proofDocument: "Invoice_Food_Dec25.pdf",
        contractHash: "0x89...21a"
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800 flex flex-col h-screen overflow-hidden">
            {/* Minimal Header */}
            <header className="bg-white border-b border-gray-200 py-4 px-6 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-2">
                    <div className="bg-primary-dark p-2 rounded text-white"><Gavel size={20} /></div>
                    <span className="font-serif text-lg font-bold text-gray-900">Shariah Validator Console</span>
                </div>
                <div className="text-sm font-bold text-gray-600">
                    Mufti Abdullah (ID: VAL-001)
                </div>
            </header>

            <main className="flex-1 flex overflow-hidden">

                {/* 1. Pending Queue (Left Panel) */}
                <aside className="w-80 bg-white border-r border-gray-200 flex flex-col">
                    <div className="p-4 border-b border-gray-100 bg-gray-50 font-bold text-gray-700 text-sm uppercase tracking-wide">
                        Review Queue ({reviewQueue.length})
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {reviewQueue.map((item) => (
                            <div key={item.id} className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer border-l-4 border-l-primary">
                                <h4 className="font-bold text-gray-800 text-sm">{item.ngo}</h4>
                                <div className="flex justify-between items-center mt-1">
                                    <span className="text-primary-dark font-bold text-sm">₹{item.amount.toLocaleString()}</span>
                                    <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">{item.category}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>

                {/* 2. Detail & Decision Area (Right Panel) */}
                <section className="flex-1 flex flex-col bg-gray-50 h-full overflow-hidden">
                    <div className="flex-1 overflow-y-auto p-8">
                        <div className="max-w-4xl mx-auto space-y-6">

                            {/* Expense Details Card */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900 mb-1">{currentReview.purpose}</h2>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <span>{currentReview.ngo}</span>
                                            <span>•</span>
                                            <span className="font-mono text-xs bg-gray-100 px-1 rounded">{currentReview.contractHash}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-primary-dark">₹{currentReview.amount.toLocaleString()}</div>
                                        <div className="text-xs text-gray-500 uppercase font-bold">Claimed Amount</div>
                                    </div>
                                </div>

                                {/* Expense Evidence Viewer */}
                                <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl h-64 flex flex-col items-center justify-center text-gray-500 mb-6 relative group cursor-pointer hover:bg-gray-200 transition-colors">
                                    <FileText size={48} className="mb-2 opacity-50" />
                                    <span className="font-medium">Preview Proof: {currentReview.proofDocument}</span>
                                    <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-xs font-bold border border-gray-200 shadow-sm flex items-center gap-1">
                                        <ExternalLink size={10} /> Open Original
                                    </div>
                                </div>

                                {/* Asnaf & Shariah Checklist */}
                                <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
                                    <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                        <ShieldCheck size={18} className="text-primary" /> Shariah Compliance Audit
                                    </h3>
                                    <div className="space-y-3">
                                        <label className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 cursor-pointer hover:border-primary/50 transition-colors">
                                            <input type="checkbox" className="w-5 h-5 text-primary rounded focus:ring-primary" />
                                            <span className="text-sm font-medium text-gray-700">Valid Asnaf Category (Fuqara/Masakin confirmed)</span>
                                        </label>
                                        <label className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 cursor-pointer hover:border-primary/50 transition-colors">
                                            <input type="checkbox" className="w-5 h-5 text-primary rounded focus:ring-primary" />
                                            <span className="text-sm font-medium text-gray-700">Valid Proof of Ownership Transfer (Tamleek)</span>
                                        </label>
                                        <label className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 cursor-pointer hover:border-primary/50 transition-colors">
                                            <input type="checkbox" className="w-5 h-5 text-primary rounded focus:ring-primary" />
                                            <span className="text-sm font-medium text-gray-700">No Conflict of Interest / Overhead within Limits</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Decision Action Bar (Sticky Bottom) */}
                    <div className="bg-white border-t border-gray-200 p-6 shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                        <div className="max-w-4xl mx-auto flex items-center justify-between">
                            <div className="text-sm text-gray-500">
                                Action will be recorded on <strong>Immutable Decision Ledger</strong>
                            </div>
                            <div className="flex gap-4">
                                <button className="px-6 py-3 bg-red-50 text-red-700 font-bold rounded-lg hover:bg-red-100 border border-red-200 flex items-center gap-2 transition-colors">
                                    <Lock size={18} /> Reject & Freeze Funds
                                </button>
                                <button className="px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 shadow-lg shadow-green-600/20 flex items-center gap-2 transition-colors">
                                    <Check size={18} /> Approve as Shariah-Compliant
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
};

export default ValidatorDashboard;
