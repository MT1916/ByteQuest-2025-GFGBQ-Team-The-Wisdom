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

(https://video.pictory.ai/20260104082127901ae3331e1f77848fc8f3efa93ed3645da/2026010408273022704uwSrB0JBqbjIb)

---

## 📊 PPT Link

(https://gamma.app/docs/ZakaatChain-t2luxp5jj7vi4qw)

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
<img width="1915" height="868" alt="Screenshot 2026-01-04 131151" src="https://github.com/user-attachments/assets/cc091b73-3cd9-41ef-8d94-a0e71a54c3f4" />


---

### 💰 Donor Dashboard
![Donor Dashboard](./screenshots/donor-dashboard.png)
<img width="1916" height="875" alt="Screenshot 2026-01-04 131608" src="https://github.com/user-attachments/assets/187b8ce0-59e6-431e-843f-5305339cf67c" />
<img width="1912" height="867" alt="Screenshot 2026-01-04 131619" src="https://github.com/user-attachments/assets/eda48a21-5e1d-48b2-989b-0cdcbadbf08d" />


---

### 🏢 NGO Dashboard
![NGO Dashboard](./screenshots/ngo-dashboard.png)
<img width="1919" height="877" alt="Screenshot 2026-01-04 131646" src="https://github.com/user-attachments/assets/2dcebc5d-6959-4b6d-81e8-14ef8700606d" />
<img width="1912" height="874" alt="Screenshot 2026-01-04 131707" src="https://github.com/user-attachments/assets/3a06e347-18e4-41dd-be71-17173606c39e" />

---

### ✅ Validator Dashboard
![Validator Dashboard](./screenshots/validator-dashboard.png)
<img width="1899" height="375" alt="Screenshot 2026-01-04 131724" src="https://github.com/user-attachments/assets/c18a740e-8149-4301-9ce2-efdfc1bfcdbe" />
<img width="1912" height="868" alt="Screenshot 2026-01-04 131754" src="https://github.com/user-attachments/assets/a662bc23-9078-4af7-8199-8cfcc3a386c2" />

---

### 🔗 Wallet Connection
![Wallet Connection](./screenshots/wallet-connection.png)
<img width="1906" height="875" alt="Screenshot 2026-01-04 133024" src="https://github.com/user-attachments/assets/aed22f4d-1f57-4967-a05d-4099986c6281" />
<img width="1895" height="876" alt="Screenshot 2026-01-04 133118" src="https://github.com/user-attachments/assets/3a4dcd8f-8637-4e8b-bba2-2bc2a4ca7651" />


---

## 📄 License

This project is licensed under the MIT License.
