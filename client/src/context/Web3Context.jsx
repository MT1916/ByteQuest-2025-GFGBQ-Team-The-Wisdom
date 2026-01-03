import React, { createContext, useState, useEffect, useContext } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, VALIDATOR_ADDRESS } from '../utils/constants';
import ZakaatFund from '../contracts/artifacts/contracts/ZakaatFund.sol/ZakaatFund.json';
import MilestoneValidator from '../contracts/artifacts/contracts/MilestoneValidator.sol/MilestoneValidator.json';

const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [account, setAccount] = useState(null);
    const [chainId, setChainId] = useState(null);
    const [zakaatFundContract, setZakaatFundContract] = useState(null);
    const [validatorContract, setValidatorContract] = useState(null);
    const [isConnecting, setIsConnecting] = useState(false);
    const [error, setError] = useState(null);

    const connectWallet = async () => {
        try {
            setIsConnecting(true);
            setError(null);

            if (!window.ethereum) {
                throw new Error("MetaMask not installed. Please install MetaMask to continue.");
            }

            // Request account access
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });

            // Create provider and signer
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const network = await provider.getNetwork();

            // Create contract instances
            const zakaatFund = new ethers.Contract(
                CONTRACT_ADDRESS,
                ZakaatFund.abi,
                signer
            );

            const validator = new ethers.Contract(
                VALIDATOR_ADDRESS,
                MilestoneValidator.abi,
                signer
            );

            // Update state
            setProvider(provider);
            setSigner(signer);
            setAccount(accounts[0]);
            setChainId(network.chainId.toString());
            setZakaatFundContract(zakaatFund);
            setValidatorContract(validator);

            // Setup event listeners
            setupEventListeners(zakaatFund, validator);

            console.log("✅ Wallet connected:", accounts[0]);
            console.log("   Network:", network.chainId);

        } catch (err) {
            console.error("Wallet connection error:", err);
            setError(err.message);
            throw err;
        } finally {
            setIsConnecting(false);
        }
    };

    const setupEventListeners = (zakaatFund, validator) => {
        // ZakaatFund Events
        zakaatFund.on("CampaignCreated", (id, title, category) => {
            console.log("🔥 CampaignCreated:", { id: id.toString(), title, category: category.toString() });
            // Trigger UI refresh
            window.dispatchEvent(new CustomEvent('campaignCreated', {
                detail: { id: id.toString(), title, category: category.toString() }
            }));
        });

        zakaatFund.on("DonationReceived", (campaignId, donor, amount) => {
            console.log("💰 DonationReceived:", {
                campaignId: campaignId.toString(),
                donor,
                amount: ethers.formatEther(amount)
            });
            window.dispatchEvent(new CustomEvent('donationReceived', {
                detail: { campaignId: campaignId.toString(), donor, amount: amount.toString() }
            }));
        });

        zakaatFund.on("FundsReleased", (campaignId, recipient, amount) => {
            console.log("✅ FundsReleased:", {
                campaignId: campaignId.toString(),
                recipient,
                amount: ethers.formatEther(amount)
            });
        });

        zakaatFund.on("CampaignFrozen", (campaignId, reason) => {
            console.log("🚨 CampaignFrozen:", { campaignId: campaignId.toString(), reason });
            alert(`⚠️ Campaign ${campaignId} has been FROZEN: ${reason}`);
        });

        // MilestoneValidator Events
        validator.on("ExpenseSubmitted", (id, milestoneId, ipfsHash, amount) => {
            console.log("📄 ExpenseSubmitted:", {
                id: id.toString(),
                milestoneId: milestoneId.toString(),
                ipfsHash,
                amount: ethers.formatEther(amount)
            });
        });

        validator.on("ExpenseApproved", (id, validatorAddress) => {
            console.log("✅ ExpenseApproved:", { id: id.toString(), validatorAddress });
        });

        validator.on("ExpenseRejected", (id, reason) => {
            console.log("❌ ExpenseRejected:", { id: id.toString(), reason });
        });

        validator.on("MisuseDetected", (campaignId, reason) => {
            console.log("🚨🚨 MISUSE DETECTED:", { campaignId: campaignId.toString(), reason });
            alert(`🚨 CRITICAL: Misuse detected in Campaign ${campaignId}\nReason: ${reason}`);
        });
    };

    const disconnectWallet = () => {
        setProvider(null);
        setSigner(null);
        setAccount(null);
        setChainId(null);
        setZakaatFundContract(null);
        setValidatorContract(null);
        console.log("Wallet disconnected");
    };

    // Listen for account changes
    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', (accounts) => {
                if (accounts.length === 0) {
                    disconnectWallet();
                } else {
                    setAccount(accounts[0]);
                    console.log("Account changed to:", accounts[0]);
                }
            });

            window.ethereum.on('chainChanged', () => {
                window.location.reload();
            });
        }

        return () => {
            if (window.ethereum) {
                window.ethereum.removeAllListeners('accountsChanged');
                window.ethereum.removeAllListeners('chainChanged');
            }
        };
    }, []);

    const value = {
        provider,
        signer,
        account,
        chainId,
        zakaatFundContract,
        validatorContract,
        isConnecting,
        error,
        connectWallet,
        disconnectWallet,
        isConnected: !!account
    };

    return (
        <Web3Context.Provider value={value}>
            {children}
        </Web3Context.Provider>
    );
};

export const useWeb3 = () => {
    const context = useContext(Web3Context);
    if (!context) {
        throw new Error('useWeb3 must be used within Web3Provider');
    }
    return context;
};

export default Web3Context;
