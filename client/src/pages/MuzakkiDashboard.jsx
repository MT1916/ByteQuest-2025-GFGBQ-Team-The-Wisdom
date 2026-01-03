import React, { useState } from 'react';
import {
    Wallet,
    FileText,
    ShieldCheck,
    Download,
    ExternalLink,
    AlertCircle,
    CheckCircle,
    Lock,
    LayoutDashboard,
    ChevronRight,
    Search
} from 'lucide-react';

const MuzakkiDashboard = () => {
    // Mock Data for Essential Components
    const zakaatObligation = {
        totalDue: 125000,
        currency: "INR",
        breakdown: [
            { type: "Gold & Silver", amount: 85000 },
            { type: "Cash Savings", amount: 25000 },
            { type: "Business Assets", amount: 15000 }
        ]
    };

    const ngoList = [
        { id: 1, name: "Al-Khair Relief", asnaf: "Fuqara (The Poor)", status: "Approved", reputation: "High" },
        { id: 2, name: "Orphan Education Initiative", asnaf: "Masakin (The Needy)", status: "Approved", reputation: "High" },
        { id: 3, name: "Debt Relief Foundation", asnaf: "Al-Gharimin (Debtors)", status: "Approved", reputation: "Medium" }
    ];

    const utilizationProofs = [
        { id: 101, purpose: "Emergency Food Rations (Bihar)", ngo: "Al-Khair Relief", amount: 15000, date: "20 Dec 2025", hash: "0x8a...9f2", status: "Verified" },
        { id: 102, purpose: "School Fees for 5 Orphans", ngo: "Orphan Education Initiative", amount: 25000, date: "18 Dec 2025", hash: "0x7b...3c1", status: "Verified" }
    ];

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
            {/* Top Navbar: Essential branding & Wallet only */}
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary p-2 rounded text-white">
                            <LayoutDashboard size={24} />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-serif text-xl font-bold text-primary-dark leading-none">ZakaatChain</span>
                            <span className="font-arabic text-xs text-primary/80">المزكي (Zakaat Giver)</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="px-3 py-1 bg-green-50 border border-green-200 rounded-full flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
                            <span className="text-xs font-bold text-green-800">Wallet Connected</span>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="container mx-auto px-4 py-8 max-w-5xl space-y-8">

                {/* 1. Zakaat Obligation Card */}
                <section className="bg-white rounded-xl border border-primary/20 shadow-sm overflow-hidden">
                    <div className="bg-primary/5 px-6 py-4 border-b border-primary/10 flex justify-between items-center">
                        <h2 className="font-serif text-lg font-bold text-primary-dark flex items-center gap-2">
                            <Wallet size={20} /> Zakaat Obligation
                        </h2>
                        <span className="text-xs uppercase tracking-wider font-bold text-gray-400">Nisab Met</span>
                    </div>
                    <div className="p-6 grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Total Zakaat Due (Calculated)</p>
                            <div className="text-4xl font-bold text-gray-900 mb-2">₹{zakaatObligation.totalDue.toLocaleString()}</div>
                            <div className="text-xs text-gray-400">Based on 2.5% of eligible assets</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Gold & Silver Holdings</span>
                                <span className="font-mono font-medium">₹{zakaatObligation.breakdown[0].amount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Cash & Savings</span>
                                <span className="font-mono font-medium">₹{zakaatObligation.breakdown[1].amount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Business Assets</span>
                                <span className="font-mono font-medium">₹{zakaatObligation.breakdown[2].amount.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. Shariah-Approved NGO List */}
                <section className="space-y-4">
                    <h2 className="font-serif text-lg font-bold text-gray-800 flex items-center gap-2">
                        <ShieldCheck size={20} className="text-green-600" /> Pay Zakaat to Checked Asnaf
                    </h2>
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">NGO Name</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Asnaf Category</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Shariah Status</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {ngoList.map((ngo) => (
                                    <tr key={ngo.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 font-semibold text-gray-900">{ngo.name}</td>
                                        <td className="px-6 py-4">
                                            <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium border border-blue-100">
                                                {ngo.asnaf}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1.5 text-green-700 text-sm font-medium">
                                                <ShieldCheck size={16} /> Verified Halal
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="bg-primary hover:bg-primary-light text-white px-6 py-2 rounded-lg font-bold text-sm shadow-sm transition-all hover:shadow-md active:scale-95">
                                                Pay Zakaat
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* 3. Fund Utilization & Proofs */}
                <section className="space-y-4">
                    <div className="flex justify-between items-end">
                        <h2 className="font-serif text-lg font-bold text-gray-800 flex items-center gap-2">
                            <FileText size={20} className="text-accent" /> Utilization Proof & Receipts
                        </h2>
                        <button className="text-primary text-sm font-medium hover:underline">View All History</button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {utilizationProofs.map((proof) => (
                            <div key={proof.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm relative group">
                                <div className="absolute top-4 right-4">
                                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded border border-green-200 flex items-center gap-1">
                                        <CheckCircle size={10} /> {proof.status}
                                    </span>
                                </div>
                                <h3 className="font-bold text-gray-900 mb-1">{proof.purpose}</h3>
                                <p className="text-sm text-gray-500 mb-4">via {proof.ngo} • {proof.date}</p>

                                <div className="bg-gray-50 p-3 rounded border border-gray-100 mb-4 flex justify-between items-center">
                                    <span className="text-xs font-mono text-gray-400 flex items-center gap-1">
                                        <ExternalLink size={10} /> {proof.hash}
                                    </span>
                                    <span className="font-bold text-gray-800">₹{proof.amount.toLocaleString()}</span>
                                </div>

                                <div className="flex gap-3">
                                    <button className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                                        <Download size={16} /> Get Receipt
                                    </button>
                                    <button className="flex-1 bg-primary/10 text-primary-dark border border-primary/20 py-2 rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors">
                                        View Proof
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Transparency Guarantee Banner */}
                <div className="bg-accent/10 rounded-xl p-4 border border-accent/20 flex items-start gap-3">
                    <AlertCircle className="text-accent-dark shrink-0 mt-0.5" size={20} />
                    <div className="text-sm text-accent-dark">
                        <span className="font-bold">TransparentZakaat Guarantee:</span> All funds are locked in smart contracts until the NGO uploads valid utilization proof verified by a Shariah Board Validator. Your Zakaat is 100% traceable.
                    </div>
                </div>

            </main>
        </div>
    );
};

export default MuzakkiDashboard;
