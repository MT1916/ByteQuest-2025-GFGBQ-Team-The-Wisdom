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
    FileCheck,
    Clock,
    XCircle,
    FileText,
    ListFilter,
    Plus
} from 'lucide-react';
import { createCampaign } from '../services/api';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS } from '../utils/constants';
import ZakaatFund from '../contracts/artifacts/contracts/ZakaatFund.sol/ZakaatFund.json';
import { useWeb3 } from '../context/Web3Context';

const NGODashboard = () => {
    const { zakaatFundContract, account, isConnected } = useWeb3();
    const [activeTab, setActiveTab] = useState('campaigns');
    const [submissionStatus, setSubmissionStatus] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    // --- STATE: Campaigns ---
    const [campaignForm, setCampaignForm] = useState({
        title: '',
        description: '',
        targetAmount: '',
        category: 'FAQIR',
        ngoAddress: '0x123...'
    });

    // --- STATE: Expenses & Wallet ---
    const [asnafBalances, setAsnafBalances] = useState({
        fuqara: { label: "Fuqara (The Poor)", balance: 500000, locked: false },
        masakin: { label: "Masakin (The Needy)", balance: 350000, locked: false },
        riqab: { label: "Riqab (Debt Relief)", balance: 0, locked: true },
    });

    const [expenseForm, setExpenseForm] = useState({
        asnaf: "",
        amount: "",
        milestoneId: "",
        proof: null
    });

    // --- STATE: Milestones ---
    const [milestones, setMilestones] = useState([
        { id: 1, name: "Ramadan Food Packs (Phase 1)", budget: 200000, remaining: 120000, deadline: "2024-03-10", status: "Active" },
        { id: 2, name: "Emergency Medical Camp", budget: 150000, remaining: 150000, deadline: "2024-04-01", status: "Active" }
    ]);

    // Mock Data
    const expenseHistory = [
        { id: "EXP-881", date: "2024-02-28", category: "Fuqara", amount: 25000, status: "Verified", hash: "0x7d...2a9" },
        { id: "EXP-882", date: "2024-03-01", category: "Masakin", amount: 12000, status: "Pending", hash: "0x8a...1b4" }
    ];

    const deadlineAlert = { active: true, message: "Urgent: 'Fuqara' fund batch #882 expiring in 48h. Submit utilization or funds will auto-reallocate." };

    // --- HANDLERS ---
    const handleCampaignChange = (e) => {
        setCampaignForm({ ...campaignForm, [e.target.name]: e.target.value });
    };

    const handleCreateCampaign = async () => {
        try {
            if (!isConnected || !zakaatFundContract) {
                throw new Error("Please connect your wallet first");
            }

            // 1. Save Metadata to Server
            const res = await createCampaign(campaignForm);
            if (!res.success) throw new Error(res.error || "API Failed");

            console.log("Metadata saved:", res.data);

            // 2. Blockchain Transaction
            const CATEGORY_MAP = {
                'FAQIR': 0, 'MISKIN': 1, 'AMIL': 2, 'MUALLAF': 3,
                'RIQAB': 4, 'GHARIMIN': 5, 'FISABILILLAH': 6, 'IBN_SABIL': 7
            };

            const catEnum = CATEGORY_MAP[campaignForm.category] || 0;
            const targetWei = ethers.parseEther(campaignForm.targetAmount.toString());

            console.log("Sending Transaction...");
            const tx = await zakaatFundContract.createCampaign(
                campaignForm.title,
                campaignForm.description,
                targetWei,
                catEnum
            );

            console.log("Tx sent:", tx.hash);
            setSubmissionStatus('pending');

            await tx.wait();
            console.log("Tx mined!");

            setSubmissionStatus('success');
            setErrorMessage('');
            setCampaignForm({ title: '', description: '', targetAmount: '', category: 'FAQIR', ngoAddress: '0x123...' });
            setTimeout(() => setSubmissionStatus(null), 3000);

        } catch (err) {
            console.error(err);
            setSubmissionStatus(null);
            setErrorMessage("Failed: " + (err.reason || err.message));
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setExpenseForm(prev => ({ ...prev, [name]: value }));
        if (errorMessage) setErrorMessage("");
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setExpenseForm(prev => ({ ...prev, proof: e.target.files[0] }));
        }
    };

    const handleSubmitExpense = () => {
        if (!expenseForm.asnaf || !expenseForm.amount || !expenseForm.milestoneId || !expenseForm.proof) {
            setErrorMessage("All fields including proof upload are mandatory.");
            return;
        }

        const selectedAsnafData = asnafBalances[expenseForm.asnaf];
        if (!selectedAsnafData || selectedAsnafData.balance < Number(expenseForm.amount)) {
            setErrorMessage(`Insufficient funds in ${selectedAsnafData?.label || 'selected category'}.`);
            return;
        }

        const selectedMilestone = milestones.find(m => m.id.toString() === expenseForm.milestoneId);
        if (selectedMilestone && selectedMilestone.remaining < Number(expenseForm.amount)) {
            setErrorMessage(`Exceeds remaining budget for milestone '${selectedMilestone.name}'.`);
            return;
        }

        setSubmissionStatus('success');
        setTimeout(() => setSubmissionStatus(null), 3000);
    };

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden font-sans text-gray-800">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col z-10">
                <div className="p-6 border-b border-gray-100 flex items-center gap-2">
                    <div className="bg-primary p-1.5 rounded text-white"><Layout size={20} /></div>
                    <span className="font-serif text-lg font-bold text-primary-dark">NGO Portal</span>
                </div>
                <div className="p-4 space-y-1 flex-1">
                    <button onClick={() => setActiveTab('campaigns')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'campaigns' ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-100'}`}>
                        <UploadCloud size={20} /> <span className="font-medium">Create Campaign</span>
                    </button>
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
                    <div className="flex items-center gap-4">
                        <div className="bg-green-50 text-green-700 border border-green-100 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                            <Shield size={12} /> Account Active
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-6 space-y-6">

                    {/* Global Alert */}
                    {deadlineAlert.active && (
                        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r shadow-sm flex items-start justify-between">
                            <div className="flex gap-3">
                                <Clock className="text-amber-600 shrink-0" size={20} />
                                <div>
                                    <h3 className="font-bold text-amber-800 text-sm">Utilization Deadline Approaching</h3>
                                    <p className="text-sm text-amber-700">{deadlineAlert.message}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* === CAMPAIGNS TAB === */}
                    {activeTab === 'campaigns' && (
                        <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden fade-in">
                            <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                                <h2 className="text-lg font-bold text-gray-800">Launch New Zakaat Campaign</h2>
                                <p className="text-sm text-gray-500">Create a verified cause for donors to fund.</p>
                            </div>
                            <div className="p-8 max-w-2xl">
                                {submissionStatus === 'success' && (
                                    <div className="bg-green-100 text-green-800 p-4 rounded-lg flex items-center gap-2 mb-6">
                                        <CheckCircle2 size={20} /> Campaign Created Successfully!
                                    </div>
                                )}
                                {errorMessage && (
                                    <div className="bg-red-50 text-red-700 p-3 rounded-lg flex items-center gap-2 mb-6">
                                        <XCircle size={18} /> {errorMessage}
                                    </div>
                                )}

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Campaign Title</label>
                                        <input name="title" value={campaignForm.title} onChange={handleCampaignChange} className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-primary/20" placeholder="e.g. Winter Blankets for Kashmir" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                                        <textarea name="description" value={campaignForm.description} onChange={handleCampaignChange} className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-primary/20" rows="3" placeholder="Describe the need..." />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Target Amount (₹)</label>
                                            <input type="number" name="targetAmount" value={campaignForm.targetAmount} onChange={handleCampaignChange} className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-primary/20" placeholder="50000" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Asnaf Category</label>
                                            <select name="category" value={campaignForm.category} onChange={handleCampaignChange} className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-primary/20 bg-white">
                                                <option value="FAQIR">Faqir (Poor)</option>
                                                <option value="MISKIN">Miskin (Needy)</option>
                                                <option value="RIQAB">Riqab (Slave/Captive)</option>
                                                <option value="GHARIMIN">Gharimin (Debtor)</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button onClick={handleCreateCampaign} className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-light transition-colors mt-4">
                                        Create Campaign
                                    </button>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* === EXPENSES TAB === */}
                    {activeTab === 'expenses' && (
                        <div className="space-y-6 fade-in">
                            {/* Wallet Summary */}
                            <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
                                <h3 className="text-sm font-medium text-gray-500 mb-2">Total Restricted Balance</h3>
                                <div className="text-3xl font-bold text-gray-900 mb-4">₹8,50,000 <span className="text-sm font-normal text-gray-500">INR</span></div>
                                <div className="space-y-2">
                                    {Object.entries(asnafBalances).map(([key, data]) => (
                                        <div key={key} className={`flex justify-between text-sm p-2 rounded ${data.balance > 0 ? 'bg-gray-50' : 'bg-red-50 opacity-60'}`}>
                                            <span className="text-gray-700 font-medium">{data.label}</span>
                                            <span className={`font-mono font-bold ${data.balance > 0 ? 'text-primary-dark' : 'text-red-400'}`}>₹{data.balance.toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Expense Form */}
                            <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                                    <h2 className="text-lg font-bold text-gray-800">Submit Zakaat Expense Claim</h2>
                                </div>
                                <div className="p-8 max-w-3xl mx-auto">
                                    {submissionStatus === 'success' && (
                                        <div className="bg-green-100 text-green-800 p-4 rounded-lg flex items-center gap-2 mb-6">
                                            <CheckCircle2 size={20} /> Expense Submitted!
                                        </div>
                                    )}
                                    {errorMessage && (
                                        <div className="bg-red-50 text-red-700 p-3 rounded-lg -flex items-center gap-2 mb-6">
                                            <XCircle size={18} /> {errorMessage}
                                        </div>
                                    )}

                                    <div className="grid md:grid-cols-2 gap-6 mb-4">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Funded Asnaf Category</label>
                                            <select name="asnaf" value={expenseForm.asnaf} onChange={handleInputChange} className="w-full p-3 border rounded-lg bg-white">
                                                <option value="">Select Category...</option>
                                                {Object.entries(asnafBalances).map(([key, data]) => (
                                                    <option key={key} value={key} disabled={data.balance <= 0}>{data.label}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Link Milestone</label>
                                            <select name="milestoneId" value={expenseForm.milestoneId} onChange={handleInputChange} className="w-full p-3 border rounded-lg bg-white">
                                                <option value="">Select Milestone...</option>
                                                {milestones.map(m => (
                                                    <option key={m.id} value={m.id}>{m.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Amount (₹)</label>
                                        <input type="number" name="amount" value={expenseForm.amount} onChange={handleInputChange} className="w-full p-3 border rounded-lg" placeholder="0.00" />
                                    </div>
                                    <div className="mb-6">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Proof Upload</label>
                                        <input type="file" onChange={handleFileChange} className="w-full p-2 border rounded-lg" />
                                    </div>
                                    <button onClick={handleSubmitExpense} className="w-full bg-primary text-white py-3 rounded-lg font-bold">Submit Claim</button>
                                </div>
                            </section>

                            {/* History */}
                            <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <h3 className="font-bold text-gray-800 mb-4">Recent Claims</h3>
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-gray-50 text-gray-500 font-bold">
                                        <tr><th className="p-3">ID</th><th className="p-3">Amount</th><th className="p-3">Status</th></tr>
                                    </thead>
                                    <tbody>
                                        {expenseHistory.map(exp => (
                                            <tr key={exp.id} className="border-t">
                                                <td className="p-3">{exp.id}</td>
                                                <td className="p-3">₹{exp.amount.toLocaleString()}</td>
                                                <td className="p-3">{exp.status}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </section>
                        </div>
                    )}

                    {/* === MILESTONES TAB === */}
                    {activeTab === 'milestones' && (
                        <div className="space-y-6 fade-in">
                            <h2 className="text-2xl font-serif font-bold text-gray-800">Project Milestones</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {milestones.map(m => (
                                    <div key={m.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                                        <div className="flex justify-between mb-2">
                                            <h3 className="font-bold text-gray-900">{m.name}</h3>
                                            <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded">{m.status}</span>
                                        </div>
                                        <p className="text-sm text-gray-500 mb-4">Deadline: {m.deadline}</p>
                                        <div className="text-sm">
                                            <div className="flex justify-between mb-1">
                                                <span>Progress</span>
                                                <span>{((1 - m.remaining / m.budget) * 100).toFixed(0)}%</span>
                                            </div>
                                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-primary" style={{ width: `${((1 - m.remaining / m.budget) * 100)}%` }}></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </main>
            </div>
        </div>
    );
};

export default NGODashboard;
