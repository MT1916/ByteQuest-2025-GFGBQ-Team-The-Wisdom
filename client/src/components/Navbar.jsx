import React, { useState, useEffect } from 'react';
import { Wallet, Menu, X, Layers } from 'lucide-react';
import { useWeb3 } from '../context/Web3Context';
import { ethers } from 'ethers';

const Navbar = () => {
    const { connectWallet, account, isConnecting, disconnectWallet, provider } = useWeb3();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [balance, setBalance] = useState("0");

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const fetchBalance = async () => {
            if (account && provider) {
                try {
                    const bal = await provider.getBalance(account);
                    setBalance(parseFloat(ethers.formatEther(bal)).toFixed(4));
                } catch (err) {
                    console.error("Failed to fetch balance", err);
                }
            } else {
                setBalance("0");
            }
        };
        fetchBalance();
    }, [account, provider]);

    const formatAddress = (addr) => {
        return addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : '';
    };

    const handleConnect = async () => {
        if (account) {
            disconnectWallet();
        } else {
            try {
                await connectWallet();
            } catch (error) {
                console.error("Connection failed", error);
                alert("Failed to connect wallet: " + error.message);
            }
        }
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center gap-2 group cursor-pointer">
                    <div className="bg-primary p-2 rounded-lg text-white group-hover:bg-primary-light transition-colors">
                        <Layers size={24} />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-serif text-xl font-bold text-primary-dark leading-none">ZakaatChain</span>
                        <span className="font-arabic text-xs text-primary/80">زكاة بلوكشين</span>
                    </div>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    {['Features', 'How It Works', 'Campaigns'].map((item) => (
                        <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-gray-600 hover:text-primary font-medium transition-colors">
                            {item}
                        </a>
                    ))}
                </div>

                {/* Connect Wallet Button */}
                <div className="hidden md:block">
                    <button
                        onClick={handleConnect}
                        disabled={isConnecting}
                        className="flex items-center gap-2 bg-primary hover:bg-primary-light text-white px-6 py-2.5 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        <Wallet size={18} />
                        <span>
                            {isConnecting ? 'Connecting...' : account ? `${balance} ETH | ${formatAddress(account)}` : 'Connect MetaMask'}
                        </span>
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-primary-dark" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 px-4 flex flex-col gap-4 animate-fade-in">
                    {['Features', 'How It Works', 'Campaigns'].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                            className="text-gray-600 hover:text-primary font-medium py-2 border-b border-gray-100"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {item}
                        </a>
                    ))}
                    <button
                        onClick={() => {
                            handleConnect();
                            setIsMobileMenuOpen(false);
                        }}
                        disabled={isConnecting}
                        className="flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium w-full disabled:opacity-70"
                    >
                        <Wallet size={18} />
                        <span>
                            {isConnecting ? 'Connecting...' : account ? formatAddress(account) : 'Connect MetaMask'}
                        </span>
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
