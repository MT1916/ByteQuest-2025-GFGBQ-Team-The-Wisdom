# 📋 Problem Statement

Traditional Zakaat (Islamic charitable giving) distribution systems suffer from:
- **Lack of Transparency**: Donors cannot track where their funds are being utilized
- **Trust Issues**: No verifiable proof that funds reach intended beneficiaries
- **Mismanagement**: Centralized systems are prone to corruption and fund misappropriation
- **No Accountability**: NGOs lack milestone-based fund release mechanisms
- **Limited Verification**: No decentralized validation of fund usage and impact

**ZakaatChain** solves these problems by leveraging blockchain technology to create a transparent, trustless, and accountable Zakaat distribution platform with milestone-based fund releases and community-driven validation.

---

## 🚀 Project Name

**ZakaatChain** - Transparent Zakaat Distribution on Blockchain

---

## 👥 Team Name

**The Wisdom**  

---

## 🌐 Deployed Link

**Live Application**: [YOUR_DEPLOYED_LINK]  
*Please update this section with your deployment URL (if available)*

---

## 🎥 2-Minute Demonstration Video Link

**Demo Video**: [YOUR_VIDEO_LINK]  
*Please update this section with your demonstration video URL*

---

## 📊 PPT Link

**Presentation**: [YOUR_PPT_LINK]  
*Please update this section with your presentation link*

---

# 📖 Project Overview

**ZakaatChain** is a blockchain-based platform that revolutionizes Islamic charitable giving (Zakaat) by ensuring complete transparency, accountability, and trust in the distribution process. Built on Ethereum-compatible networks, ZakaatChain uses smart contracts to manage donations, enforce milestone-based fund releases, and enable community-driven validation.

### 🎯 Key Features

- **🔐 Blockchain-Powered Transparency**: All transactions recorded immutably on-chain
- **👥 Role-Based Access Control**: Separate dashboards for Donors, NGOs, and Validators
- **📊 Milestone-Based Fund Release**: Funds released only after validator approval
- **🕌 Asnaf Category Compliance**: Ensures Zakaat is distributed to the 8 eligible categories
- **🔍 Real-Time Tracking**: Donors can track their donations from start to finish
- **📄 IPFS Document Storage**: Expense proofs stored on decentralized storage
- **🚨 Misuse Detection**: Automatic fund freezing on suspicious activity
- **💰 MetaMask Integration**: Seamless wallet connection for Web3 transactions
- **📱 Responsive Design**: Works on desktop, tablet, and mobile devices

### 🏗️ How It Works

1. **NGOs Create Campaigns**: NGOs register and create fundraising campaigns with specific Asnaf categories
2. **Donors Contribute**: Donors connect their wallets and donate to campaigns they trust
3. **Funds Held in Escrow**: Donations are held in smart contracts until milestones are met
4. **NGOs Submit Expenses**: NGOs upload expense proofs (invoices, receipts) to IPFS
5. **Validators Review**: Community validators review and approve/reject expense claims
6. **Funds Released**: Upon approval, funds are released to NGO wallets
7. **Misuse Prevention**: Automatic freezing if suspicious patterns detected

### �️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React + Vite | Fast, modern UI framework |
| **Styling** | Tailwind CSS | Responsive, utility-first styling |
| **Backend** | Node.js + Express | API server for off-chain logic |
| **Database** | Supabase | Real-time database for metadata |
| **Blockchain** | Solidity + Hardhat | Smart contract development |
| **Web3** | ethers.js | Blockchain interaction library |
| **Wallet** | MetaMask | Crypto wallet integration |
| **Storage** | IPFS | Decentralized file storage |
| **Network** | Polygon Mumbai | Low-cost testnet deployment |

---

## 📂 Project Structure

```
ZakaatChain/
├── client/                 # Frontend Application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # App pages (Home, Dashboard, Campaign)
│   │   ├── contracts/      # ABI files and contract addresses
│   │   ├── utils/          # IPFS and Web3 helpers
│   │   └── App.jsx
│   ├── tailwind.config.js
│   └── package.json
│
├── server/                 # Backend API (Optional off-chain logic)
│   ├── routes/             # API routes (Auth, Metadata)
│   ├── controllers/        # Business logic
│   ├── models/             # Database schemas (if using DB for caching)
│   ├── index.js            # Server entry point
│   └── package.json
│
├── smart-contracts/        # Blockchain Layer
│   ├── contracts/          # Solidity Smart Contracts (.sol)
│   ├── scripts/            # Deployment scripts
│   ├── test/               # Contract tests
│   ├── hardhat.config.js   # Hardhat configuration
│   └── package.json
│
└── README.md
```

## 🛠 Tech Stack Justification

*   **Frontend**: **React + Tailwind CSS**
    *   *Why*: Fast development, component reusability, and rapid styling for a polished hackathon UI
*   **Backend**: **Node.js + Express**
    *   *Why*: Simple, familiar JS environment for handling off-chain logic (like specialized auth or metadata caching) and IPFS interaction via API if needed
*   **Blockchain**: **Solidity (Generic EVM)**
    *   *Why*: Deploys to Polygon/Ethereum (low fees on Polygon, industry standard)
*   **Wallet**: **MetaMask**
    *   *Why*: The standard browser wallet for Web3 interaction
*   **Storage**: **IPFS (via Pinata or similar)**
    *   *Why*: Decentralized, immutable storage for proofs/receipts
*   **Auth**: **Role-based (Smart Contract)**
    *   *Why*: Immutable roles (Donor, NGO, Validator) managed directly on-chain for trust

## 🚀 Local Development Setup

### Prerequisites
*   Node.js (v16+)
*   MetaMask Extension
*   Git

### 1. Smart Contracts
```bash
cd smart-contracts
npm install
npx hardhat compile
npx hardhat node # (Keep running in a separate terminal)
npx hardhat run scripts/deploy.js --network localhost
# Copy the deployed Contract Address and ABI to client/src/contracts/
```

### 2. Backend (Server)
```bash
cd ../server
npm install
npm run dev # Runs on localhost:5000
```

### 3. Frontend (Client)
```bash
cd ../client
npm install
npm run dev # Runs on localhost:5173 (Vite)
```

## 🔐 Environment Variables

### Client (`client/.env`)

**Required for Frontend:**

| Variable | Description | Example Value |
|----------|-------------|---------------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | `https://xxxxx.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous/public key | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |

**Example `.env` file:**
```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> **Note:** Contract addresses are hardcoded in `client/src/utils/constants.js`:
> - `CONTRACT_ADDRESS`: `0x5FbDB2315678afecb367f032d93F642f64180aa3`
> - `VALIDATOR_ADDRESS`: `0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512`
> 
> Update these after deploying your smart contracts.

---

### Server (`server/.env`)

**Required for Backend:**

| Variable | Description | Example Value |
|----------|-------------|---------------|
| `PORT` | Server port number | `5000` |
| `SUPABASE_URL` | Your Supabase project URL | `https://xxxxx.supabase.co` |
| `SUPABASE_KEY` | Supabase service role key (secret) | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |
| `RPC_URL` | Blockchain RPC endpoint | `http://127.0.0.1:8545` (local) or `https://polygon-mumbai.g.alchemy.com/v2/YOUR_KEY` |
| `VITE_ZAKAAT_CONTRACT_ADDRESS` | ZakaatFund contract address | `0x5FbDB2315678afecb367f032d93F642f64180aa3` |
| `VITE_MILESTONE_VALIDATOR_ADDRESS` | MilestoneValidator contract address | `0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512` |

**Example `.env` file:**
```bash
PORT=5000
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_supabase_service_role_key
RPC_URL=http://127.0.0.1:8545
VITE_ZAKAAT_CONTRACT_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3
VITE_MILESTONE_VALIDATOR_ADDRESS=0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
```

---

### Smart Contracts (`smart-contracts/.env`)

**Required for Contract Deployment:**

| Variable | Description | Example Value |
|----------|-------------|---------------|
| `PRIVATE_KEY` | Wallet private key for deployment | `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80` |
| `POLYGON_RPC_URL` | Polygon Mumbai testnet RPC | `https://polygon-mumbai.g.alchemy.com/v2/YOUR_ALCHEMY_KEY` |

**Example `.env` file:**
```bash
PRIVATE_KEY=your_wallet_private_key
POLYGON_RPC_URL=https://polygon-mumbai.g.alchemy.com/v2/YOUR_ALCHEMY_KEY
```

> ⚠️ **Security Warning:** Never commit `.env` files to Git. Use `.env.example` as a template.

---

## 🚀 Vercel Deployment - Environment Variables

When deploying to Vercel, add these environment variables in the Vercel dashboard:

### For Client Deployment:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### For Server Deployment:
```
PORT=5000
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_supabase_service_role_key
RPC_URL=https://polygon-mumbai.g.alchemy.com/v2/YOUR_KEY
VITE_ZAKAAT_CONTRACT_ADDRESS=0xYourDeployedContractAddress
VITE_MILESTONE_VALIDATOR_ADDRESS=0xYourDeployedValidatorAddress
```

---

## 📖 Usage Instructions

### For Donors

1. **Connect Wallet**
   - Click "Connect Wallet" button in the header
   - Approve MetaMask connection
   - Ensure you're on the correct network (Polygon Mumbai for testnet)

2. **Browse Campaigns**
   - Navigate to "Campaigns" page
   - View all active fundraising campaigns
   - Filter by Asnaf category (Fuqara, Miskin, etc.)

3. **Make a Donation**
   - Click on a campaign to view details
   - Enter donation amount in ETH/MATIC
   - Click "Donate Now"
   - Confirm transaction in MetaMask
   - Receive confirmation and transaction hash

4. **Track Your Donations**
   - Go to "Donor Dashboard"
   - View all your past donations
   - Track campaign progress and fund utilization
   - See validator approvals for expense releases

### For NGOs

1. **Register as NGO**
   - Connect wallet with NGO role
   - Complete NGO profile setup

2. **Create Campaign**
   - Navigate to "NGO Dashboard"
   - Click "Create New Campaign"
   - Fill in campaign details:
     - Title and description
     - Funding goal
     - Asnaf category
     - Beneficiary details
   - Submit to blockchain
   - Wait for transaction confirmation

3. **Submit Expense Proofs**
   - Upload invoices/receipts to IPFS
   - Submit expense claim with IPFS hash
   - Wait for validator review

4. **Withdraw Funds**
   - Once validators approve expenses
   - Click "Withdraw Funds"
   - Funds transferred to your wallet

### For Validators

1. **Access Validator Dashboard**
   - Connect wallet with validator role
   - Navigate to "Validator Dashboard"

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
   - Trigger fund freeze if misuse detected

---

## 📸 Screenshots

### 🏠 Landing Page
*Beautiful hero section with clear call-to-action and platform overview*

![Landing Page](./screenshots/landing-page.png)

---

### 💰 Donor Dashboard
*Track all your donations, view campaign progress, and monitor fund utilization*

![Donor Dashboard](./screenshots/donor-dashboard.png)

---

### 🏢 NGO Dashboard
*Create campaigns, submit expense proofs, and manage fundraising activities*

![NGO Dashboard](./screenshots/ngo-dashboard.png)

---

### ✅ Validator Dashboard
*Review expense claims, vote on approvals, and ensure fund integrity*

![Validator Dashboard](./screenshots/validator-dashboard.png)

---

### 📊 Campaign Details
*Detailed view of campaign information, progress, and donation history*

![Campaign Details](./screenshots/campaign-details.png)

---

### 🔗 Wallet Connection
*Seamless MetaMask integration for secure Web3 transactions*

![Wallet Connection](./screenshots/wallet-connection.png)

---

## 🎯 Smart Contract Features

### ZakaatFund Contract
- Campaign creation and management
- Donation acceptance and tracking
- Asnaf category enforcement
- Fund release mechanisms
- Automatic misuse detection
- Emergency fund freezing

### MilestoneValidator Contract
- Expense submission and storage
- Multi-validator voting system
- IPFS hash verification
- Approval/rejection logic
- Misuse flagging and reporting

---

## 🔒 Security Features

- ✅ **Role-Based Access Control**: Only authorized users can perform specific actions
- ✅ **Multi-Signature Validation**: Multiple validators must approve fund releases
- ✅ **Immutable Records**: All transactions recorded permanently on blockchain
- ✅ **Automatic Freezing**: Suspicious activities trigger automatic fund locks
- ✅ **IPFS Verification**: Document hashes ensure proof authenticity
- ✅ **Smart Contract Auditing**: Code follows best practices and security patterns

---

## 🚀 Future Enhancements

- [ ] Mobile app (iOS & Android)
- [ ] Multi-chain support (Ethereum, BSC, Avalanche)
- [ ] AI-powered fraud detection
- [ ] Automated Zakaat calculation tools
- [ ] Integration with traditional payment gateways
- [ ] Multi-language support (Arabic, Urdu, etc.)
- [ ] Advanced analytics and reporting
- [ ] NFT-based donation certificates

---

## 👥 Team - The Wisdom

*Add your team member details here*

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Polygon** for providing low-cost blockchain infrastructure
- **Supabase** for real-time database services
- **IPFS** for decentralized storage
- **MetaMask** for wallet integration
- **Hardhat** for smart contract development tools

---

## 📞 Contact & Support

For questions, issues, or contributions:
- **GitHub Issues**: [Report a bug or request a feature]
- **Email**: [Your team email]
- **Discord**: [Your Discord server]

---

**Built with ❤️ by Team The Wisdom for [Hackathon Name]**

---

*Last Updated: January 2026*
