import React, { useState } from 'react';
import {
    Layout,
    Wallet,
    Shield,
    LogOut,
    Bell,
    ChevronRight,
    UploadCloud,
    AlertTriangle,
    Lock,
    CheckCircle2,
    FileCheck
} from 'lucide-react';

const NGODashboard = () => {
    const [activeTab, setActiveTab] = useState('expenses');

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden font-sans text-gray-800">
            {/* Minimal Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col z-10">
                <div className="p-6 border-b border-gray-100 flex items-center gap-2">
                    <div className="bg-primary p-1.5 rounded text-white"><Layout size={20} /></div>
                    <span className="font-serif text-lg font-bold text-primary-dark">NGO Portal</span>
                </div>
                <div className="p-4 space-y-1 flex-1">
                    <button onClick={() => setActiveTab('expenses')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'expenses' ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-100'}`}>
                        <Wallet size={20} /> <span className="font-medium">Zakaat Wallet</span>
                    </button>
                    <button onClick={() => setActiveTab('milestones')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'milestones' ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-100'}`}>
                        <FileCheck size={20} /> <span className="font-medium">Milestones</span>
                    </button>
                </div>
                <div className="p-4 border-t border-gray-100">
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <LogOut size={20} /> <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white border-b border-gray-200 py-4 px-6 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-gray-800">Al-Khair Foundation (Verified)</h1>
                    <div className="bg-red-50 text-red-700 border border-red-100 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <Lock size={12} /> Zakaat Funds Locked
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-6 space-y-6">

                    {/* 1. Zakaat Wallet (Locked Status) */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
                            <div className="absolute right-0 top-0 p-6 opacity-5"><Lock size={100} /></div>
                            <h3 className="text-sm font-medium text-gray-500 mb-2">Restricted Zakaat Balance</h3>
                            <div className="text-3xl font-bold text-gray-900 mb-1">₹8,50,000 <span className="text-sm font-normal text-gray-500">INR</span></div>
                            <div className="mt-4 flex items-center gap-2 text-xs text-orange-600 font-medium bg-orange-50 px-2 py-1 rounded w-fit">
                                <AlertTriangle size={12} /> Funds released only upon Validated Expense Proof
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                            <h3 className="text-sm font-medium text-gray-500 mb-4">Smart Contract Status</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-600">Contract Address</span>
                                    <span className="font-mono text-primary bg-primary/5 px-2 py-0.5 rounded">0x71...B39</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-600">Audit Status</span>
                                    <span className="text-green-600 font-bold flex items-center gap-1"><Shield size={14} /> Passive / Secure</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-600">Last Disbursement</span>
                                    <span className="text-gray-900 font-medium">₹1,20,000 (3 days ago)</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 2. Purpose-Restricted Expense Form */}
                    <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                            <h2 className="text-lg font-bold text-gray-800">Submit Zakaat Expense Claim</h2>
                            <p className="text-sm text-gray-500">Funds will be unlocked only for Shariah-compliant Asnaf categories.</p>
                        </div>
                        <div className="p-8 max-w-2xl">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Asnaf Category (Purpose)</label>
                                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none bg-white">
                                        <option value="">Select Asnaf Category...</option>
                                        <option value="fuqara">Fuqara (The Poor) - Food/Ration</option>
                                        <option value="masakin">Masakin (The Needy) - Medical/Shelter</option>
                                        <option value="riqab">Riqab (Those in Bondage) - Debt Relief</option>
                                        <option value="ibnsabil">Ibn Sabil (Wayfarer) - Travel Aid</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Expense Amount (₹ INR)</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">₹</span>
                                        <input type="number" placeholder="0.00" className="w-full p-3 pl-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Mandatory Proof Upload</label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer text-gray-500 hover:text-primary">
                                        <UploadCloud size={32} className="mb-2" />
                                        <span className="font-medium text-sm">Upload Invoice / Receiver Acknowlegment</span>
                                        <span className="text-xs mt-1 text-gray-400">PDF, JPG (Max 5MB)</span>
                                    </div>
                                </div>

                                <div className="pt-4 flex gap-4">
                                    <button className="flex-1 bg-primary hover:bg-primary-light text-white py-3 rounded-lg font-bold shadow-lg shadow-primary/20 transition-all">
                                        Submit for Validator Review
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 3. Milestone Declaration (Essential) */}
                    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <CheckCircle2 size={18} className="text-green-600" /> Active Milestones
                        </h3>
                        <div className="border border-gray-100 rounded-lg overflow-hidden">
                            <div className="bg-gray-50 p-4 flex justify-between items-center border-b border-gray-100">
                                <div>
                                    <h4 className="font-bold text-gray-900">Education Kit Distribution (Phase 1)</h4>
                                    <p className="text-xs text-gray-500">Target: 500 Students • Deadline: 30 Jan</p>
                                </div>
                                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded font-bold">In Progress</span>
                            </div>
                            <div className="p-4 flex items-center justify-between">
                                <div className="text-sm text-gray-600">350/500 Distributed</div>
                                <button className="text-primary text-sm font-bold hover:underline">Update Progress</button>
                            </div>
                        </div>
                    </section>

                </main>
            </div>
        </div>
    );
};

export default NGODashboard;
