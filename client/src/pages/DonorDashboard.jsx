import React, { useState, useEffect } from 'react';
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
    Search,
    Clock,
    AlertTriangle,
    X
} from 'lucide-react';
import { getCampaigns } from '../services/api';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS } from '../utils/constants';
import ZakaatFund from '../contracts/artifacts/contracts/ZakaatFund.sol/ZakaatFund.json';
import { useWeb3 } from '../context/Web3Context';

const DonorDashboard = () => {
    const { zakaatFundContract, isConnected } = useWeb3();
    // Payment Modal State
    const [selectedNGO, setSelectedNGO] = useState(null);
    const [paymentStep, setPaymentStep] = useState(0); // 0: Hidden, 1: Config, 2: Confirm
    const [allocationMode, setAllocationMode] = useState('auto'); // 'auto' | 'manual'
    const [intentionConfirmed, setIntentionConfirmed] = useState(false);

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

    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        const fetchCampaigns = async () => {
            const res = await getCampaigns();
            if (res.success) {
                // Adapt API data to UI structure if needed, or just use as is
                // UI expects: { id, name, asnaf, status, reputation }
                const adapted = res.data.map(c => ({
                    id: c.id,
                    name: c.title, // Title as Name
                    asnaf: c.category,
                    status: "Live",
                    reputation: "Verified"
                }));
                if (adapted.length > 0) setCampaigns(adapted);
            }
        };
        fetchCampaigns();
    }, []);

    // Fallback if API hasn't populated yet
    const displayList = campaigns.length > 0 ? campaigns : [
        { id: 1, name: "Al-Khair Relief", asnaf: "Fuqara (The Poor)", status: "Approved", reputation: "High" },
        { id: 2, name: "Orphan Education Initiative", asnaf: "Masakin (The Needy)", status: "Approved", reputation: "High" },
        { id: 3, name: "Debt Relief Foundation", asnaf: "Al-Gharimin (Debtors)", status: "Approved", reputation: "Medium" }
    ];

    const utilizationProofs = [
        {
            id: 101,
            purpose: "Emergency Food Rations (Bihar)",
            ngo: "Al-Khair Relief",
            amount: 15000,
            date: "20 Dec 2025",
            hash: "0x8a...9f2",
            status: "Verified",
            asnafLock: true,
            lifecycle: [
                { stage: "Paid", time: "20 Dec", completed: true },
                { stage: "Locked", time: "20 Dec", completed: true },
                { stage: "Utilized", time: "22 Dec", completed: true },
                { stage: "Verified", time: "23 Dec", completed: true }
            ]
        },
        {
            id: 102,
            purpose: "School Fees for 5 Orphans",
            ngo: "Orphan Education Initiative",
            amount: 25000,
            date: "18 Dec 2025",
            hash: "0x7b...3c1",
            status: "Delayed",
            asnafLock: true,
            lifecycle: [
                { stage: "Paid", time: "18 Dec", completed: true },
                { stage: "Locked", time: "18 Dec", completed: true },
                { stage: "Utilized", time: "Pending", completed: false },
            ]
        }
    ];

    const handlePayClick = (ngo) => {
        setSelectedNGO(ngo);
        setPaymentStep(1);
        setIntentionConfirmed(false);
    };

    const handlePaymentSubmit = async () => {
        try {
            if (!selectedNGO) return;
            if (!isConnected || !zakaatFundContract) {
                throw new Error("Please connect your wallet first");
            }

            // Use fixed amount for demo (in production, get from form input)
            const amountEth = "0.01";
            const amountWei = ethers.parseEther(amountEth);

            console.log(`Donating ${amountEth} ETH to Campaign ID: ${selectedNGO.id}`);

            const tx = await zakaatFundContract.donate(selectedNGO.id, { value: amountWei });
            console.log("Donation Tx:", tx.hash);
            await tx.wait();

            alert("Zakaat Payment Processed on Blockchain!");
            setPaymentStep(0);
        } catch (err) {
            console.error(err);
            alert("Payment Failed: " + (err.reason || err.message));
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800 relative">
            {/* Top Navbar: Essential branding & Wallet only */}
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary p-2 rounded text-white">
                            <LayoutDashboard size={24} />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-serif text-xl font-bold text-primary-dark leading-none">ZakaatChain</span>
                            <span className="font-arabic text-xs text-primary/80">Donor</span>
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
                                {displayList.map((ngo) => (
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
                                            <button
                                                onClick={() => handlePayClick(ngo)}
                                                className="bg-primary hover:bg-primary-light text-white px-6 py-2 rounded-lg font-bold text-sm shadow-sm transition-all hover:shadow-md active:scale-95"
                                            >
                                                Pay Zakaat
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* 3. Zakaat Lifecycle & Utilization */}
                <section className="space-y-4">
                    <div className="flex justify-between items-end">
                        <h2 className="font-serif text-lg font-bold text-gray-800 flex items-center gap-2">
                            <FileText size={20} className="text-accent" /> Zakaat Lifecycle & Utilization Status
                        </h2>
                        <div className="flex gap-3">
                            <button className="flex items-center gap-2 text-primary-dark bg-primary/10 px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary/20 transition-colors">
                                <Download size={16} /> Annual Zakaat Report
                            </button>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {utilizationProofs.map((proof) => (
                            <div key={proof.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm relative group">
                                <div className="absolute top-4 right-4">
                                    <span className={`text-xs px-2 py-1 rounded border flex items-center gap-1 font-bold ${proof.status === 'Verified' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'
                                        }`}>
                                        {proof.status === 'Verified' ? <CheckCircle size={10} /> : <AlertCircle size={10} />} {proof.status === 'Verified' ? 'Verified' : 'Action Needed'}
                                    </span>
                                </div>
                                <h3 className="font-bold text-gray-900 mb-1">{proof.purpose}</h3>
                                <p className="text-sm text-gray-500 mb-2">via {proof.ngo} • {proof.date}</p>

                                {proof.asnafLock && (
                                    <div className="inline-flex items-center gap-1 text-xs font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded mb-4">
                                        <Lock size={10} /> Asnaf Lock: Enabled
                                    </div>
                                )}

                                {/* Lifecycle Tracker */}
                                <div className="mb-4 pt-2">
                                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                                        {proof.lifecycle.map((step, idx) => (
                                            <span key={idx} className={step.completed ? 'text-green-600 font-bold' : ''}>{step.stage}</span>
                                        ))}
                                    </div>
                                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden flex">
                                        {proof.lifecycle.map((step, idx) => (
                                            step.completed && <div key={idx} className="h-full bg-green-500 flex-1 border-r border-white/20"></div>
                                        ))}
                                    </div>
                                </div>

                                {/* Utilization Delay Alert */}
                                {proof.status === 'Delayed' && (
                                    <div className="bg-red-50 border border-red-100 rounded p-3 mb-4 flex items-start gap-2">
                                        <AlertTriangle size={16} className="text-red-600 shrink-0 mt-0.5" />
                                        <div className="text-sm">
                                            <span className="font-bold text-red-800">Utilization Pending - Funds Locked.</span>
                                            <div className="flex gap-2 mt-2">
                                                <button className="text-xs font-bold text-red-700 underline">Extend Deadline</button>
                                                <button className="text-xs font-bold text-red-700 underline">Reassign Funds</button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="bg-gray-50 p-3 rounded border border-gray-100 mb-4 flex justify-between items-center">
                                    <span className="text-xs font-mono text-gray-400 flex items-center gap-1">
                                        <ExternalLink size={10} /> {proof.hash}
                                    </span>
                                    <span className="font-bold text-gray-800">₹{proof.amount.toLocaleString()}</span>
                                </div>

                                <div className="flex gap-3">
                                    <button className={`flex-1 border text-sm font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2 ${proof.status === 'Verified' ? 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        }`}>
                                        <Download size={16} /> Receipt
                                    </button>
                                    <button className="flex-1 bg-primary/10 text-primary-dark border border-primary/20 py-2 rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors">
                                        View Details
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

            {/* PAYMENT MODAL */}
            {paymentStep > 0 && selectedNGO && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-fade-in relative">
                        <button onClick={() => setPaymentStep(0)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                            <X size={20} />
                        </button>

                        <div className="bg-primary p-6 text-white">
                            <h3 className="text-xl font-bold font-serif mb-1">Pay Zakaat</h3>
                            <p className="opacity-90 text-sm">To: {selectedNGO.name}</p>
                            <span className="inline-block bg-white/20 px-2 py-0.5 rounded text-xs mt-2">{selectedNGO.asnaf}</span>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* 1. Allocation Mode */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-3">1. Allocation Mode</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => setAllocationMode('auto')}
                                        className={`p-3 rounded-lg border text-sm font-medium transition-all ${allocationMode === 'auto'
                                            ? 'bg-primary/5 border-primary text-primary-dark ring-1 ring-primary/20'
                                            : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                                            }`}
                                    >
                                        Auto-Distribute
                                        <span className="block text-xs font-normal mt-1 opacity-70">Smart Contract Optimized</span>
                                    </button>
                                    <button
                                        onClick={() => setAllocationMode('manual')}
                                        className={`p-3 rounded-lg border text-sm font-medium transition-all ${allocationMode === 'manual'
                                            ? 'bg-primary/5 border-primary text-primary-dark ring-1 ring-primary/20'
                                            : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                                            }`}
                                    >
                                        Manual Allocation
                                        <span className="block text-xs font-normal mt-1 opacity-70">Set Custom %</span>
                                    </button>
                                </div>
                            </div>

                            {/* 2. Amount Input */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">2. Zakaat Amount (₹)</label>
                                <input type="number" placeholder="Enter amount..." className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none font-bold text-lg" />
                            </div>

                            {/* 3. Intention Declaration */}
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={intentionConfirmed}
                                        onChange={(e) => setIntentionConfirmed(e.target.checked)}
                                        className="mt-1 w-5 h-5 text-primary rounded focus:ring-primary border-gray-300"
                                    />
                                    <span className="text-sm text-gray-700 italic">
                                        "I declare this payment as <strong>Zakaat</strong> for eligible Asnaf only, for the sake of Allah. I understand funds will be locked until Shariah verification."
                                    </span>
                                </label>
                            </div>

                            <button
                                disabled={!intentionConfirmed}
                                onClick={handlePaymentSubmit}
                                className={`w-full py-3.5 rounded-lg font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 ${intentionConfirmed ? 'bg-primary hover:bg-primary-light hover:shadow-xl transform hover:-translate-y-0.5' : 'bg-gray-300 cursor-not-allowed'
                                    }`}
                            >
                                <Lock size={18} /> Confirm Payment
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DonorDashboard;
