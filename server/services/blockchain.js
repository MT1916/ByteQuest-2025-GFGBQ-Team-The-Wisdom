const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");
const { syncCampaignFromEvent } = require("../controllers/campaignController");

const CONTRACT_ADDRESS = process.env.VITE_ZAKAAT_CONTRACT_ADDRESS || "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const VALIDATOR_ADDRESS = process.env.VITE_MILESTONE_VALIDATOR_ADDRESS || "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

const ARTIFACT_PATH = path.join(__dirname, "../../client/src/contracts/artifacts/contracts/ZakaatFund.sol/ZakaatFund.json");
const VALIDATOR_ARTIFACT_PATH = path.join(__dirname, "../../client/src/contracts/artifacts/contracts/MilestoneValidator.sol/MilestoneValidator.json");

let provider;
let zakaatFundContract;
let validatorContract;

const initBlockchain = () => {
    try {
        if (!CONTRACT_ADDRESS) {
            console.log("⚠️  No Contract Address provided. Blockchain service disabled.");
            return;
        }

        if (!fs.existsSync(ARTIFACT_PATH)) {
            console.log("⚠️  Artifact not found. Compile contracts first.");
            return;
        }

        const zakaatArtifact = JSON.parse(fs.readFileSync(ARTIFACT_PATH, "utf8"));
        const validatorArtifact = JSON.parse(fs.readFileSync(VALIDATOR_ARTIFACT_PATH, "utf8"));

        provider = new ethers.JsonRpcProvider(process.env.RPC_URL || "http://127.0.0.1:8545");

        zakaatFundContract = new ethers.Contract(CONTRACT_ADDRESS, zakaatArtifact.abi, provider);
        validatorContract = new ethers.Contract(VALIDATOR_ADDRESS, validatorArtifact.abi, provider);

        console.log("✅ Blockchain Service Initialized");
        console.log("   ZakaatFund:", CONTRACT_ADDRESS);
        console.log("   Validator:", VALIDATOR_ADDRESS);

        // ========== ZAKAAT FUND EVENTS ==========

        zakaatFundContract.on("CampaignCreated", (id, title, category, event) => {
            console.log(`🔥 CampaignCreated: ID=${id}, Title=${title}, Category=${category}`);
            syncCampaignFromEvent({
                id: id.toString(),
                title: title,
                category: category.toString()
            });
        });

        zakaatFundContract.on("DonationReceived", (campaignId, donor, amount, event) => {
            console.log(`💰 DonationReceived: Campaign=${campaignId}, Donor=${donor}, Amount=${ethers.formatEther(amount)} ETH`);
            // TODO: Update database with donation
        });

        zakaatFundContract.on("FundsReleased", (campaignId, recipient, amount, event) => {
            console.log(`✅ FundsReleased: Campaign=${campaignId}, Recipient=${recipient}, Amount=${ethers.formatEther(amount)} ETH`);
            // TODO: Update expense status to RELEASED
        });

        zakaatFundContract.on("CampaignFrozen", (campaignId, reason, event) => {
            console.log(`🚨 CampaignFrozen: Campaign=${campaignId}, Reason=${reason}`);
            // TODO: Update campaign status to FROZEN, send alerts
        });

        // ========== MILESTONE VALIDATOR EVENTS ==========

        validatorContract.on("MilestoneCreated", (id, campaignId, budget, event) => {
            console.log(`📍 MilestoneCreated: ID=${id}, Campaign=${campaignId}, Budget=${ethers.formatEther(budget)} ETH`);
        });

        validatorContract.on("ExpenseSubmitted", (id, milestoneId, ipfsHash, amount, event) => {
            console.log(`📄 ExpenseSubmitted: ID=${id}, Milestone=${milestoneId}, Hash=${ipfsHash}, Amount=${ethers.formatEther(amount)} ETH`);
            // TODO: Notify validators
        });

        validatorContract.on("ExpenseApproved", (id, validator, event) => {
            console.log(`✅ ExpenseApproved: ID=${id}, Validator=${validator}`);
        });

        validatorContract.on("ExpenseRejected", (id, reason, event) => {
            console.log(`❌ ExpenseRejected: ID=${id}, Reason=${reason}`);
        });

        validatorContract.on("MisuseDetected", (campaignId, reason, event) => {
            console.log(`🚨🚨 MISUSE DETECTED: Campaign=${campaignId}, Reason=${reason}`);
            // TODO: Send urgent alerts to admins
        });

        console.log("📡 Listening for blockchain events...");

    } catch (error) {
        console.error("❌ Failed to init blockchain service:", error.message);
    }
};

module.exports = {
    initBlockchain,
    getZakaatFundContract: () => zakaatFundContract,
    getValidatorContract: () => validatorContract,
    getProvider: () => provider
};
