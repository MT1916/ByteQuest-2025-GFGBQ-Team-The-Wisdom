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
