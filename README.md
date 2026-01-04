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

**[YOUR_TEAM_NAME]**  
*Please update this section with your team name*

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

# 📖 Project Documentation

## 📂 Folder Structure

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

## 🔐 Environment Variables (.env)

### Client (`client/.env`)
```bash
VITE_CONTRACT_ADDRESS=0x...
VITE_RPC_URL=http://127.0.0.1:8545/
```

### Server (`server/.env`)
```bash
PORT=5000
PINATA_API_KEY=your_pinata_key # For IPFS
PINATA_SECRET_KEY=your_pinata_secret
```

### Smart Contracts (`smart-contracts/.env`)
```bash
PRIVATE_KEY=your_wallet_private_key # For testnet deployment
POLYGON_RPC_URL=https://rpc-mumbai.maticvigil.com/
```
