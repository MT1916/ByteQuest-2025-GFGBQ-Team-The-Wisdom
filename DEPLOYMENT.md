# 🚀 ZakaatChain Vercel Deployment Guide

This guide will help you deploy your ZakaatChain application to Vercel. The project consists of:
- **Frontend (Client)**: React + Vite application
- **Backend (Server)**: Express.js API
- **Smart Contracts**: Hardhat contracts (deployed separately)

---

## 📋 Pre-Deployment Checklist

### ✅ 1. Ensure All Changes Are Pushed to GitHub
Your code is already on GitHub. Verify at your repository.

### ✅ 2. Install Vercel CLI (Optional but Recommended)
```bash
npm install -g vercel
```

---

## 🎯 Deployment Options

You have **TWO** deployment strategies:

### **Option A: Deploy as Monorepo (Recommended for Hackathons)**
Deploy both client and server together from the root directory.

### **Option B: Deploy Separately**
Deploy client and server as separate Vercel projects.

---

## 🚀 Option A: Monorepo Deployment (RECOMMENDED)

### Step 1: Prepare Your Project

The following files have been created for you:
- ✅ `vercel.json` (root) - Monorepo configuration
- ✅ `server/vercel.json` - Server configuration

### Step 2: Deploy via Vercel Dashboard

1. **Go to [Vercel Dashboard](https://vercel.com/)**
   - Sign in with GitHub

2. **Click "Add New Project"**

3. **Import Your Repository**
   - Select your `ZakaatChain` repository
   - Click "Import"

4. **Configure Project Settings**
   
   **Framework Preset**: `Other`
   
   **Root Directory**: `./` (leave as root)
   
   **Build Settings**:
   - Build Command: `cd client && npm install && npm run build`
   - Output Directory: `client/dist`
   - Install Command: `npm install`

5. **Add Environment Variables**
   
   Click "Environment Variables" and add:
   
   **For Client (Frontend)**:
   ```
   VITE_API_URL=https://your-project.vercel.app/api
   VITE_RPC_URL=https://polygon-mumbai.g.alchemy.com/v2/YOUR_KEY
   VITE_CONTRACT_ADDRESS=0xYourDeployedContractAddress
   ```
   
   **For Server (Backend)**:
   ```
   PORT=5000
   DATABASE_URL=your_mongodb_or_supabase_url
   RPC_URL=https://polygon-mumbai.g.alchemy.com/v2/YOUR_KEY
   PRIVATE_KEY=your_wallet_private_key_for_backend
   ```

6. **Click "Deploy"**
   - Wait for the build to complete (2-5 minutes)
   - You'll get a deployment URL like: `https://zakaat-chain-xxx.vercel.app`

---

## 🚀 Option B: Separate Deployments

### Deploy Client (Frontend)

1. **Go to [Vercel Dashboard](https://vercel.com/)**

2. **Click "Add New Project"**

3. **Import Repository**
   - Select `ZakaatChain`

4. **Configure Client**:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. **Environment Variables**:
   ```
   VITE_API_URL=https://your-server.vercel.app/api
   VITE_RPC_URL=https://polygon-mumbai.g.alchemy.com/v2/YOUR_KEY
   VITE_CONTRACT_ADDRESS=0xYourContractAddress
   ```

6. **Deploy**

### Deploy Server (Backend)

1. **Create Another New Project**

2. **Import Same Repository**

3. **Configure Server**:
   - **Framework Preset**: `Other`
   - **Root Directory**: `server`
   - **Build Command**: (leave empty)
   - **Output Directory**: (leave empty)
   - **Install Command**: `npm install`

4. **Environment Variables**:
   ```
   PORT=5000
   DATABASE_URL=your_database_url
   RPC_URL=https://polygon-mumbai.g.alchemy.com/v2/YOUR_KEY
   PRIVATE_KEY=your_private_key
   ```

5. **Deploy**

6. **Update Client Environment**:
   - Go back to your client project
   - Update `VITE_API_URL` with your server URL
   - Redeploy client

---

## 🔧 Deploy Using Vercel CLI (Alternative)

### For Monorepo:

```bash
# Navigate to project root
cd c:\Users\MT\Desktop\Hackthon\ZakaatChain

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? zakaat-chain
# - Directory? ./ (root)
# - Override settings? No

# For production deployment:
vercel --prod
```

### For Client Only:

```bash
cd client
vercel

# Follow prompts and set environment variables when asked
```

### For Server Only:

```bash
cd server
vercel

# Follow prompts and set environment variables when asked
```

---

## 🔐 Environment Variables Setup

### Required Environment Variables

**Client (.env)**:
```env
VITE_API_URL=https://your-api-url.vercel.app/api
VITE_RPC_URL=https://polygon-mumbai.g.alchemy.com/v2/YOUR_ALCHEMY_KEY
VITE_CONTRACT_ADDRESS=0xYourDeployedSmartContractAddress
```

**Server (.env)**:
```env
PORT=5000
DATABASE_URL=mongodb+srv://user:pass@cluster.mongodb.net/zakaatchain
RPC_URL=https://polygon-mumbai.g.alchemy.com/v2/YOUR_ALCHEMY_KEY
PRIVATE_KEY=0xYourWalletPrivateKey
```

### How to Add Environment Variables in Vercel:

1. Go to your project in Vercel Dashboard
2. Click "Settings" → "Environment Variables"
3. Add each variable:
   - **Key**: Variable name (e.g., `VITE_API_URL`)
   - **Value**: Variable value
   - **Environment**: Select `Production`, `Preview`, and `Development`
4. Click "Save"
5. Redeploy your project for changes to take effect

---

## 📱 Smart Contract Deployment

Your smart contracts need to be deployed separately to a blockchain network.

### Deploy to Polygon Mumbai Testnet:

```bash
cd smart-contracts

# Install dependencies
npm install

# Create .env file
# Add: PRIVATE_KEY=your_private_key
# Add: POLYGON_RPC_URL=https://polygon-mumbai.g.alchemy.com/v2/YOUR_KEY

# Compile contracts
npx hardhat compile

# Deploy to Mumbai testnet
npx hardhat run scripts/deploy.js --network mumbai

# Copy the deployed contract address
# Update VITE_CONTRACT_ADDRESS in client environment variables
```

---

## ✅ Post-Deployment Checklist

After deployment, verify:

1. **Frontend Loads**: Visit your Vercel URL
2. **API Works**: Check `https://your-url.vercel.app/api` or root endpoint
3. **Wallet Connection**: Test MetaMask connection
4. **Smart Contract Interaction**: Test contract calls
5. **Environment Variables**: Ensure all are set correctly

---

## 🐛 Common Issues & Solutions

### Issue 1: Build Fails
**Solution**: 
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Run `npm run build` locally first

### Issue 2: API Routes Return 404
**Solution**:
- Verify `vercel.json` routing configuration
- Check that server is properly configured
- Ensure API routes start with `/api`

### Issue 3: Environment Variables Not Working
**Solution**:
- Redeploy after adding environment variables
- Use `VITE_` prefix for client variables
- Check variable names match exactly

### Issue 4: CORS Errors
**Solution**:
Update `server/index.js` CORS configuration:
```javascript
app.use(cors({
  origin: ['https://your-frontend.vercel.app', 'http://localhost:5173'],
  credentials: true
}));
```

### Issue 5: Smart Contract Not Connecting
**Solution**:
- Verify contract address in environment variables
- Ensure RPC URL is correct
- Check network in MetaMask matches deployed network

---

## 🔄 Redeployment

### Automatic Redeployment:
- Every push to `main` branch triggers automatic deployment
- Vercel will rebuild and redeploy automatically

### Manual Redeployment:
1. Go to Vercel Dashboard
2. Select your project
3. Click "Deployments"
4. Click "Redeploy" on latest deployment

### Via CLI:
```bash
vercel --prod
```

---

## 📊 Monitoring Your Deployment

### View Logs:
1. Vercel Dashboard → Your Project → "Logs"
2. Filter by deployment or function
3. Monitor real-time logs

### Analytics:
- Vercel Dashboard → Your Project → "Analytics"
- View traffic, performance, and errors

---

## 🎉 Final Steps

1. **Get Your Deployment URL**
   - Copy from Vercel dashboard
   - Example: `https://zakaat-chain.vercel.app`

2. **Update README.md**
   - Add deployment link to README
   - Replace `[YOUR_DEPLOYED_LINK]` with actual URL

3. **Test Everything**
   - Visit your live site
   - Test all features
   - Verify wallet connection
   - Test campaign creation and donations

4. **Share Your Project**
   - Update hackathon submission with live link
   - Share with team and judges

---

## 📞 Need Help?

- **Vercel Docs**: https://vercel.com/docs
- **Vercel Support**: https://vercel.com/support
- **Hardhat Docs**: https://hardhat.org/getting-started/

---

## 🎯 Quick Deployment Summary

**Fastest Way to Deploy:**

1. Push code to GitHub ✅ (Already done)
2. Go to https://vercel.com/new
3. Import your `ZakaatChain` repository
4. Set root directory to `client` for frontend-only deployment
5. Add environment variables
6. Click Deploy
7. Get your live URL
8. Update README with deployment link

**Estimated Time**: 10-15 minutes

---

Good luck with your deployment! 🚀
