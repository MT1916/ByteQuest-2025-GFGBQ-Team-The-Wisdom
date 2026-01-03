# ZakaatChain - Complete API Contract

## BASE URL
```
Development: http://localhost:5000/api
Production: https://api.zakaatchain.com/api
```

## AUTHENTICATION
All protected endpoints require:
```
Headers:
  Authorization: Bearer <JWT_TOKEN>
  Content-Type: application/json
```

---

## 1. AUTHENTICATION ENDPOINTS

### POST /auth/login
**Purpose**: Authenticate user with wallet signature
**Role**: Public
**Request**:
```json
{
  "walletAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  "signature": "0x...", // Signed message from MetaMask
  "message": "Sign this message to login to ZakaatChain"
}
```
**Response**:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    "role": "NGO",
    "name": "Al-Khair Foundation"
  }
}
```
**Blockchain Action**: None (off-chain only)

---

### POST /auth/register
**Purpose**: Register new user with role
**Role**: Public (but role assignment requires admin approval in production)
**Request**:
```json
{
  "walletAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  "role": "NGO",
  "name": "Al-Khair Foundation",
  "email": "contact@alkhair.org"
}
```
**Response**:
```json
{
  "success": true,
  "message": "Registration pending admin approval",
  "userId": "usr_123"
}
```
**Blockchain Action**: Admin must call `grantRole(ROLE_NGO, address)` on ZakaatAccessControl contract

---

## 2. CAMPAIGN ENDPOINTS

### GET /campaigns
**Purpose**: Get all active campaigns
**Role**: Public
**Request**: None
**Response**:
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": 1,
      "blockchainId": 1,
      "title": "Winter Relief Kashmir",
      "description": "Emergency blankets and food",
      "targetAmount": "5000000000000000000", // 5 ETH in wei
      "currentAmount": "2000000000000000000", // 2 ETH
      "category": "FAQIR",
      "ngoAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
      "ngoName": "Al-Khair Foundation",
      "status": "ACTIVE",
      "deadline": "2026-03-01T00:00:00Z",
      "createdAt": "2026-01-03T10:00:00Z"
    }
  ]
}
```
**Blockchain Action**: None (reads from backend cache synced with blockchain events)

---

### POST /campaigns/create
**Purpose**: Create new campaign (metadata only, blockchain call happens from frontend)
**Role**: NGO
**Request**:
```json
{
  "title": "Winter Relief Kashmir",
  "description": "Emergency blankets and food for 500 families",
  "targetAmount": "5", // In ETH
  "category": "FAQIR",
  "documents": ["ipfs://Qm..."] // Optional supporting docs
}
```
**Response**:
```json
{
  "success": true,
  "data": {
    "id": 123,
    "ipfsHash": "QmXyz...", // Metadata uploaded to IPFS
    "status": "PENDING_BLOCKCHAIN"
  },
  "instruction": "Now call contract.createCampaign() from frontend"
}
```
**Blockchain Action**: 
- Frontend must call: `zakaatFund.createCampaign(title, ipfsHash, targetWei, categoryEnum)`
- Backend listens for `CampaignCreated` event to update status

---

### GET /campaigns/:id
**Purpose**: Get campaign details
**Role**: Public
**Request**: None
**Response**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "blockchainId": 1,
    "title": "Winter Relief Kashmir",
    "ngo": {
      "address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
      "name": "Al-Khair Foundation",
      "verified": true
    },
    "milestones": [
      {
        "id": 1,
        "name": "Phase 1: Blanket Distribution",
        "budget": "2000000000000000000",
        "spent": "1500000000000000000",
        "status": "ACTIVE"
      }
    ],
    "donations": [
      {
        "donor": "0x123...",
        "amount": "1000000000000000000",
        "timestamp": "2026-01-03T12:00:00Z",
        "txHash": "0xabc..."
      }
    ]
  }
}
```
**Blockchain Action**: None (cached data)

---

## 3. DONATION ENDPOINTS

### POST /donations/initiate
**Purpose**: Validate donation before blockchain transaction
**Role**: DONOR (or public)
**Request**:
```json
{
  "campaignId": 1,
  "amount": "0.5" // In ETH
}
```
**Response**:
```json
{
  "success": true,
  "validation": {
    "campaignActive": true,
    "amountValid": true,
    "gasEstimate": "21000"
  },
  "instruction": "Call contract.donate(campaignId, { value: amountWei })"
}
```
**Blockchain Action**:
- Frontend calls: `zakaatFund.donate(campaignId, { value: ethers.parseEther(amount) })`
- Backend listens for `DonationReceived` event

---

### GET /donations/my-donations
**Purpose**: Get donor's donation history
**Role**: DONOR
**Request**: None (user identified by JWT)
**Response**:
```json
{
  "success": true,
  "totalDonated": "5000000000000000000",
  "donations": [
    {
      "campaignId": 1,
      "campaignTitle": "Winter Relief",
      "amount": "1000000000000000000",
      "timestamp": "2026-01-03T12:00:00Z",
      "txHash": "0xabc...",
      "status": "CONFIRMED"
    }
  ]
}
```
**Blockchain Action**: None (reads from indexed events)

---

## 4. EXPENSE ENDPOINTS

### POST /expenses/upload-receipt
**Purpose**: Upload receipt to IPFS
**Role**: NGO
**Request**: 
```
Content-Type: multipart/form-data

file: [PDF/Image file]
milestoneId: 1
```
**Response**:
```json
{
  "success": true,
  "ipfsHash": "QmXyz123...",
  "fileSize": 245678,
  "mimeType": "application/pdf"
}
```
**Blockchain Action**: None (IPFS upload only)

---

### POST /expenses/submit
**Purpose**: Submit expense proof for validation
**Role**: NGO
**Request**:
```json
{
  "milestoneId": 1,
  "amount": "0.5", // In ETH
  "ipfsHash": "QmXyz123...",
  "description": "Blanket purchase - 200 units",
  "vendor": "Kashmir Textiles Ltd"
}
```
**Response**:
```json
{
  "success": true,
  "expenseId": 456,
  "validation": {
    "budgetAvailable": true,
    "hashUnique": true,
    "categoryValid": true
  },
  "instruction": "Call milestoneValidator.submitExpenseProof()"
}
```
**Blockchain Action**:
- Frontend calls: `milestoneValidator.submitExpenseProof(milestoneId, amountWei, ipfsHash)`
- Contract checks duplicate hash, budget limits
- Emits `ExpenseSubmitted` or `MisuseDetected`

---

### GET /expenses/pending
**Purpose**: Get expenses awaiting validation
**Role**: VALIDATOR
**Request**: None
**Response**:
```json
{
  "success": true,
  "count": 5,
  "expenses": [
    {
      "id": 456,
      "blockchainId": 12,
      "milestoneId": 1,
      "campaignTitle": "Winter Relief",
      "ngo": "Al-Khair Foundation",
      "amount": "500000000000000000",
      "ipfsHash": "QmXyz...",
      "description": "Blanket purchase",
      "submittedAt": "2026-01-03T14:00:00Z",
      "status": "PENDING_VALIDATION"
    }
  ]
}
```
**Blockchain Action**: None (reads from events)

---

## 5. VALIDATION ENDPOINTS

### POST /validation/approve
**Purpose**: Approve expense and release funds
**Role**: VALIDATOR
**Request**:
```json
{
  "expenseId": 12,
  "notes": "Receipt verified. Vendor confirmed. Asnaf category correct."
}
```
**Response**:
```json
{
  "success": true,
  "instruction": "Call milestoneValidator.approveExpense(expenseId)"
}
```
**Blockchain Action**:
- Frontend calls: `milestoneValidator.approveExpense(expenseId)`
- Contract calls: `zakaatFund.releaseFunds(campaignId, amount, ngoAddress)`
- Emits `ExpenseApproved` + `FundsReleased`

---

### POST /validation/reject
**Purpose**: Reject expense with reason
**Role**: VALIDATOR
**Request**:
```json
{
  "expenseId": 12,
  "reason": "Receipt does not match claimed amount. Resubmit with correct invoice."
}
```
**Response**:
```json
{
  "success": true,
  "instruction": "Call milestoneValidator.rejectExpense(expenseId, reason)"
}
```
**Blockchain Action**:
- Frontend calls: `milestoneValidator.rejectExpense(expenseId, reason)`
- Emits `ExpenseRejected`
- Funds remain locked

---

## 6. ADMIN ENDPOINTS

### POST /admin/grant-role
**Purpose**: Grant role to user (for testing/demo)
**Role**: ADMIN
**Request**:
```json
{
  "walletAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  "role": "NGO"
}
```
**Response**:
```json
{
  "success": true,
  "instruction": "Call zakaatAccessControl.grantRole(ROLE_NGO, address)"
}
```
**Blockchain Action**:
- Frontend calls: `zakaatAccessControl.grantRole(roleHash, address)`
- Emits `RoleGranted`

---

## 7. IPFS ENDPOINTS

### POST /ipfs/upload
**Purpose**: Upload any file to IPFS
**Role**: Authenticated users
**Request**:
```
Content-Type: multipart/form-data

file: [Any file]
```
**Response**:
```json
{
  "success": true,
  "ipfsHash": "QmXyz...",
  "url": "https://gateway.pinata.cloud/ipfs/QmXyz...",
  "size": 123456
}
```
**Blockchain Action**: None

---

### GET /ipfs/check-duplicate/:hash
**Purpose**: Check if IPFS hash already used
**Role**: NGO
**Request**: None
**Response**:
```json
{
  "success": true,
  "duplicate": false,
  "usedIn": null
}
```
OR
```json
{
  "success": true,
  "duplicate": true,
  "usedIn": {
    "expenseId": 123,
    "campaignId": 1,
    "timestamp": "2026-01-02T10:00:00Z"
  }
}
```
**Blockchain Action**: Reads from contract's `usedReceiptHashes` mapping

---

## ERROR RESPONSES

All endpoints return errors in this format:
```json
{
  "success": false,
  "error": "Unauthorized: Invalid token",
  "code": "AUTH_INVALID_TOKEN"
}
```

Common error codes:
- `AUTH_INVALID_TOKEN`: JWT expired or invalid
- `AUTH_INSUFFICIENT_ROLE`: User doesn't have required role
- `VALIDATION_FAILED`: Input validation failed
- `BLOCKCHAIN_ERROR`: Smart contract call failed
- `IPFS_UPLOAD_FAILED`: IPFS upload failed
- `DUPLICATE_RECEIPT`: Receipt hash already used
- `BUDGET_EXCEEDED`: Expense exceeds milestone budget
- `CAMPAIGN_FROZEN`: Campaign is frozen due to misuse

---

## WEBHOOK EVENTS (Optional for Production)

Backend can send webhooks to frontend when blockchain events occur:

### Event: campaign.created
```json
{
  "event": "campaign.created",
  "data": {
    "campaignId": 1,
    "title": "Winter Relief",
    "ngo": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
  },
  "timestamp": "2026-01-03T10:00:00Z"
}
```

### Event: donation.received
```json
{
  "event": "donation.received",
  "data": {
    "campaignId": 1,
    "donor": "0x123...",
    "amount": "1000000000000000000",
    "txHash": "0xabc..."
  }
}
```

### Event: expense.approved
```json
{
  "event": "expense.approved",
  "data": {
    "expenseId": 12,
    "amount": "500000000000000000",
    "ngo": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
  }
}
```

### Event: campaign.frozen
```json
{
  "event": "campaign.frozen",
  "data": {
    "campaignId": 1,
    "reason": "Duplicate receipt detected",
    "severity": "HIGH"
  }
}
```

---

**This API contract ensures perfect alignment between frontend, backend, and blockchain. Every action is validated at multiple layers.**
