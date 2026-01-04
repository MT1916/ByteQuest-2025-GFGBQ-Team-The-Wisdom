# 📋 Problem Statement

Traditional Zakaat (Islamic charitable giving) distribution systems suffer from:

- **Lack of Transparency** – Donors cannot track where their funds are utilized  
- **Trust Issues** – No verifiable proof that funds reach intended beneficiaries  
- **Mismanagement Risks** – Centralized systems are prone to misuse  
- **No Accountability** – No milestone-based fund release mechanism  
- **Limited Verification** – No decentralized validation of fund usage  

**ZakaatChain** addresses these challenges by using blockchain technology to create a transparent, trustless, and accountable Zakaat distribution platform with milestone-based fund releases and community-driven validation.

---

## 🚀 Project Name

**ZakaatChain – Transparent Zakaat Distribution on Blockchain**

---

## 👥 Team Name

**The Wisdom**

---

## 🌐 Deployed Link (Optional)

https://zakaat-chain.vercel.app/

---

## 🎥 2-Minute Demonstration Video Link

[ADD_DEMO_VIDEO_LINK_HERE]

---

## 📊 PPT Link

[ADD_PPT_LINK_HERE]

---

# 📖 Project Overview

**ZakaatChain** is a blockchain-based platform that modernizes Islamic charitable giving by ensuring **transparency, trust, and accountability**.

The platform leverages smart contracts to securely manage donations, enforce milestone-based fund release, and allow community-driven validation of fund usage.

---

## ✨ Key Features

- Blockchain-based transparent transactions  
- Role-based dashboards for Donors, NGOs, and Validators  
- Milestone-based fund release system  
- Asnaf category compliance for Zakaat distribution  
- IPFS-based storage for expense proofs  
- MetaMask wallet integration  
- Responsive web interface  

---

## 🏗️ How It Works

1. NGOs create Zakaat campaigns  
2. Donors donate using MetaMask  
3. Funds are locked in smart contracts  
4. NGOs submit expense proofs  
5. Validators review and approve claims  
6. Funds are released upon approval  

---

## 🧱 Tech Stack

| Layer | Technology |
|------|------------|
| Frontend | React + Vite |
| Styling | Tailwind CSS |
| Backend | Node.js + Express |
| Blockchain | Solidity (EVM Compatible) |
| Web3 | ethers.js |
| Wallet | MetaMask |
| Storage | IPFS |
| Network | Polygon Mumbai Testnet |

---

## ⚙️ Setup & Installation Instructions

### Prerequisites
- Node.js  
- Git  
- MetaMask  

### Run Locally
```bash
git clone https://github.com/your-username/zakaatchain.git
cd zakaatchain
npm install
npm run dev
```

## 📖 Usage Instructions

### 👤 For Donors

1. **Connect Wallet**
   - Click the **Connect Wallet** button in the header
   - Approve MetaMask connection
   - Ensure you are on the correct network (Polygon Mumbai testnet)

2. **Browse Campaigns**
   - Navigate to the **Campaigns** page
   - View all active fundraising campaigns
   - Filter by Asnaf category (Fuqara, Miskin, etc.)

3. **Make a Donation**
   - Click on a campaign to view details
   - Enter donation amount in ETH/MATIC
   - Click **Donate Now**
   - Confirm the transaction in MetaMask
   - Receive transaction confirmation and hash

4. **Track Your Donations**
   - Go to the **Donor Dashboard**
   - View past donations
   - Track campaign progress and fund utilization
   - View validator approvals for expense releases

---

### 🏢 For NGOs

1. **Register as NGO**
   - Connect wallet with NGO role
   - Complete NGO profile setup

2. **Create Campaign**
   - Navigate to **NGO Dashboard**
   - Click **Create New Campaign**
   - Fill campaign details:
     - Title and description
     - Funding goal
     - Asnaf category
     - Beneficiary details
   - Submit campaign to blockchain
   - Wait for transaction confirmation

3. **Submit Expense Proofs**
   - Upload invoices/receipts to IPFS
   - Submit expense claim with IPFS hash
   - Wait for validator review

4. **Withdraw Funds**
   - Once validators approve expenses
   - Click **Withdraw Funds**
   - Funds are transferred to NGO wallet

---

### ✅ For Validators

1. **Access Validator Dashboard**
   - Connect wallet with validator role
   - Navigate to **Validator Dashboard**

2. **Review Expense Claims**
   - View pending expense submissions
   - Download and verify IPFS documents
   - Check expense legitimacy

3. **Vote on Claims**
   - Approve legitimate expenses
   - Reject suspicious claims with reason
   - Submit vote to blockchain

4. **Monitor Campaigns**
   - Track all active campaigns
   - Flag suspicious activities
   - Trigger fund freeze if misuse is detected

---

## 📸 Screenshots

### 🏠 Landing Page
![Landing Page](./screenshots/landing-page.png)

---

### 💰 Donor Dashboard
![Donor Dashboard](./screenshots/donor-dashboard.png)

---

### 🏢 NGO Dashboard
![NGO Dashboard](./screenshots/ngo-dashboard.png)

---

### ✅ Validator Dashboard
![Validator Dashboard](./screenshots/validator-dashboard.png)

---

### 📊 Campaign Details
![Campaign Details](./screenshots/campaign-details.png)

---

### 🔗 Wallet Connection
![Wallet Connection](./screenshots/wallet-connection.png)




---

## 📄 License

This project is licensed under the MIT License.
