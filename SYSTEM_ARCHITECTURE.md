# ZakaatChain - Complete System Architecture

## 1. SYSTEM ARCHITECTURE DIAGRAM

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND (React)                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Donor      │  │     NGO      │  │  Validator   │          │
│  │  Dashboard   │  │  Dashboard   │  │  Dashboard   │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
│         │                 │                  │                   │
│         └─────────────────┼──────────────────┘                   │
│                           │                                      │
│                    ┌──────▼──────┐                              │
│                    │   Ethers.js  │                              │
│                    │  + MetaMask  │                              │
│                    └──────┬───────┘                              │
└───────────────────────────┼──────────────────────────────────────┘
                            │
                    ┌───────▼────────┐
                    │   HTTP/REST    │
                    └───────┬────────┘
                            │
┌───────────────────────────▼──────────────────────────────────────┐
│                      BACKEND (Express)                            │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              Authentication Middleware                    │   │
│  │  - JWT Validation                                         │   │
│  │  - Wallet Signature Verification                          │   │
│  │  - Role-Based Access Control (RBAC)                       │   │
│  └────────────────────┬─────────────────────────────────────┘   │
│                       │                                           │
│  ┌────────────────────▼─────────────────────────────────────┐   │
│  │                 API Controllers                           │   │
│  │  - Campaign Controller (NGO creates, Donor views)         │   │
│  │  - Donation Controller (Donor pays)                       │   │
│  │  - Expense Controller (NGO submits proof)                 │   │
│  │  - Validation Controller (Validator approves/rejects)     │   │
│  └────────────────────┬─────────────────────────────────────┘   │
│                       │                                           │
│  ┌────────────────────▼─────────────────────────────────────┐   │
│  │              Blockchain Service Layer                     │   │
│  │  - Contract Instance Management                           │   │
│  │  - Transaction Building & Signing                         │   │
│  │  - Event Listening & Syncing                              │   │
│  │  - Gas Estimation                                         │   │
│  └────────────────────┬─────────────────────────────────────┘   │
│                       │                                           │
│  ┌────────────────────▼─────────────────────────────────────┐   │
│  │                 IPFS Service                              │   │
│  │  - Upload receipts/documents                              │   │
│  │  - Return IPFS hash                                       │   │
│  │  - Duplicate detection                                    │   │
│  └───────────────────────────────────────────────────────────┘   │
└───────────────────────────┬──────────────────────────────────────┘
                            │
                    ┌───────▼────────┐
                    │   JSON-RPC     │
                    └───────┬────────┘
                            │
┌───────────────────────────▼──────────────────────────────────────┐
│                  BLOCKCHAIN (Polygon/Localhost)                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │           ZakaatAccessControl.sol                         │   │
│  │  - Role definitions (ADMIN, DONOR, NGO, VALIDATOR)        │   │
│  │  - Role assignment/revocation                             │   │
│  │  - Access modifiers (onlyNGO, onlyValidator, etc.)        │   │
│  └────────────────────┬─────────────────────────────────────┘   │
│                       │                                           │
│  ┌────────────────────▼─────────────────────────────────────┐   │
│  │              ZakaatFund.sol (Main Contract)               │   │
│  │                                                            │   │
│  │  STATE:                                                    │   │
│  │  - campaigns[] (id, ngo, title, target, current, status)  │   │
│  │  - donorBalances[campaignId][donor]                       │   │
│  │  - milestoneValidatorContract address                     │   │
│  │                                                            │   │
│  │  FUNCTIONS:                                                │   │
│  │  - createCampaign(title, desc, target, asnafCategory)     │   │
│  │  - donate(campaignId) payable                             │   │
│  │  - releaseFunds(campaignId, amount, recipient)            │   │
│  │  - freezeCampaign(campaignId, reason)                     │   │
│  │                                                            │   │
│  │  EVENTS:                                                   │   │
│  │  - CampaignCreated(id, title, category)                   │   │
│  │  - DonationReceived(id, donor, amount)                    │   │
│  │  - FundsReleased(campaignId, recipient, amount)           │   │
│  │  - CampaignFrozen(campaignId, reason)                     │   │
│  └────────────────────┬─────────────────────────────────────┘   │
│                       │                                           │
│  ┌────────────────────▼─────────────────────────────────────┐   │
│  │         MilestoneValidator.sol                            │   │
│  │                                                            │   │
│  │  STATE:                                                    │   │
│  │  - milestones[] (id, campaignId, budget, spent, status)   │   │
│  │  - expenseProofs[] (milestoneId, ipfsHash, amount)        │   │
│  │  - usedReceiptHashes[hash] => bool (duplicate check)      │   │
│  │                                                            │   │
│  │  FUNCTIONS:                                                │   │
│  │  - submitExpenseProof(milestoneId, amount, ipfsHash)      │   │
│  │  - approveExpense(expenseId)                              │   │
│  │  - rejectExpense(expenseId, reason)                       │   │
│  │  - detectMisuse(expenseId) => freezes if violated         │   │
│  │                                                            │   │
│  │  FREEZE TRIGGERS:                                          │   │
│  │  - Duplicate IPFS hash                                    │   │
│  │  - Budget exceeded                                        │   │
│  │  - Invalid Asnaf category mismatch                        │   │
│  │  - Validator rejection                                    │   │
│  │                                                            │   │
│  │  EVENTS:                                                   │   │
│  │  - ExpenseSubmitted(id, milestoneId, ipfsHash, amount)    │   │
│  │  - ExpenseApproved(id, validatorAddress)                  │   │
│  │  - ExpenseRejected(id, reason)                            │   │
│  │  - MisuseDetected(campaignId, reason)                     │   │
│  └───────────────────────────────────────────────────────────┘   │
└───────────────────────────────────────────────────────────────────┘

                            │
                    ┌───────▼────────┐
                    │      IPFS      │
                    │  (Pinata/Web3  │
                    │    Storage)    │
                    └────────────────┘
```

## 2. DATA FLOW EXAMPLES

### Example 1: NGO Creates Campaign
```
1. NGO clicks "Create Campaign" → enters data
2. Frontend validates inputs
3. Frontend calls: POST /api/campaigns/create
4. Backend:
   - Verifies JWT token
   - Checks user has ROLE_NGO
   - Uploads metadata to IPFS (optional)
   - Returns IPFS hash
5. Frontend:
   - Prompts MetaMask
   - Calls contract.createCampaign(title, desc, target, category)
6. Smart Contract:
   - Verifies msg.sender has ROLE_NGO (via modifier)
   - Creates campaign struct
   - Emits CampaignCreated event
7. Backend Event Listener:
   - Catches CampaignCreated event
   - Updates database with blockchain ID
8. Frontend:
   - Shows success message
   - Refreshes campaign list
```

### Example 2: Donor Makes Payment
```
1. Donor selects campaign → clicks "Pay Zakaat"
2. Frontend validates amount
3. Frontend calls: POST /api/donations/initiate
   - Body: { campaignId, amount }
4. Backend:
   - Verifies JWT
   - Checks campaign exists and is active
   - Returns: { approved: true, campaignId }
5. Frontend:
   - Prompts MetaMask
   - Calls contract.donate(campaignId, { value: amountWei })
6. Smart Contract:
   - Accepts payment
   - Updates campaign.currentAmount
   - Updates donorBalances[campaignId][donor]
   - Emits DonationReceived event
7. Backend Event Listener:
   - Catches DonationReceived
   - Updates database
   - Sends confirmation email (optional)
8. Frontend:
   - Shows transaction hash
   - Updates UI with new balance
```

### Example 3: NGO Submits Expense Proof
```
1. NGO uploads receipt PDF
2. Frontend uploads to IPFS via backend
3. Frontend calls: POST /api/expenses/submit
   - Body: { milestoneId, amount, ipfsHash, description }
4. Backend:
   - Verifies JWT + ROLE_NGO
   - Validates IPFS hash exists
   - Checks milestone belongs to this NGO
   - Returns: { approved: true }
5. Frontend:
   - Prompts MetaMask
   - Calls milestoneValidator.submitExpenseProof(milestoneId, amount, ipfsHash)
6. Smart Contract:
   - Checks duplicate hash (usedReceiptHashes[hash])
   - If duplicate → FREEZE + emit MisuseDetected
   - Checks budget not exceeded
   - If exceeded → FREEZE
   - Stores expense proof
   - Emits ExpenseSubmitted
7. Backend Event Listener:
   - Catches ExpenseSubmitted or MisuseDetected
   - Updates database status
   - Notifies validators
8. Frontend:
   - Shows "Submitted for Review" or "FROZEN - Duplicate Receipt"
```

### Example 4: Validator Approves Expense
```
1. Validator reviews expense details + IPFS receipt
2. Validator clicks "Approve"
3. Frontend calls: POST /api/validation/approve
   - Body: { expenseId }
4. Backend:
   - Verifies JWT + ROLE_VALIDATOR
   - Checks expense is pending
   - Returns: { approved: true }
5. Frontend:
   - Prompts MetaMask
   - Calls milestoneValidator.approveExpense(expenseId)
6. Smart Contract:
   - Marks expense as approved
   - Calls zakaatFund.releaseFunds(campaignId, amount, ngoAddress)
   - Transfers ETH to NGO
   - Emits ExpenseApproved + FundsReleased
7. Backend Event Listener:
   - Catches events
   - Updates database
   - Notifies NGO
8. Frontend:
   - Shows "Funds Released: 0x..."
   - Updates NGO wallet balance
```

## 3. SECURITY & ALIGNMENT GUARANTEES

### Frontend → Backend Alignment
- **JWT Authentication**: Every API call includes JWT token
- **Request Validation**: Backend validates all inputs before blockchain interaction
- **Response Codes**: 
  - 200: Success
  - 401: Unauthorized (no token or invalid)
  - 403: Forbidden (wrong role)
  - 400: Bad request (validation failed)

### Backend → Blockchain Alignment
- **Role Verification**: Backend checks role BEFORE allowing contract call
- **Transaction Building**: Backend can build unsigned transactions for frontend to sign
- **Event Listening**: Backend listens to ALL contract events to stay in sync
- **Retry Logic**: If blockchain call fails, backend marks as "PENDING_RETRY"

### Blockchain → Frontend Alignment
- **Event Subscriptions**: Frontend listens to contract events via ethers.js
- **Polling Fallback**: If WebSocket fails, poll backend API every 5 seconds
- **Optimistic UI**: Show "Pending..." immediately, confirm on event
- **Error Handling**: If transaction reverts, show exact revert reason

## 4. FAILURE PREVENTION

### Common Failure: Frontend calls contract without backend knowledge
**Prevention**: 
- All contract calls MUST be preceded by backend API call
- Backend returns a "nonce" or "approval token" that frontend includes in transaction data
- Smart contract can verify this token (optional for hackathon)

### Common Failure: Duplicate receipt upload
**Prevention**:
- Smart contract maintains `mapping(bytes32 => bool) usedReceiptHashes`
- Before accepting expense, check: `require(!usedReceiptHashes[hash], "Duplicate receipt")`
- If duplicate detected → emit MisuseDetected → freeze campaign

### Common Failure: Budget exceeded
**Prevention**:
- Milestone tracks: `uint256 budget` and `uint256 spent`
- Before approving expense: `require(spent + amount <= budget, "Budget exceeded")`
- If exceeded → freeze campaign

### Common Failure: Wrong Asnaf category
**Prevention**:
- Campaign has `AsnafCategory category` (enum)
- Expense must specify intended category
- Validator checks if expense purpose matches campaign category
- If mismatch → reject expense

### Common Failure: Gas estimation fails
**Prevention**:
- Backend pre-estimates gas before returning approval
- If gas > threshold → return error to frontend
- Frontend shows: "Transaction too expensive, try smaller amount"

### Common Failure: Event not caught
**Prevention**:
- Backend runs event listener in separate process
- If listener crashes → auto-restart
- Missed events are backfilled by scanning past blocks on startup

## 5. HACKATHON SIMPLIFICATIONS (ACCEPTABLE)

1. **Authentication**: Use simple JWT instead of full OAuth
2. **IPFS**: Use Pinata API instead of running own node
3. **Database**: Use in-memory array instead of MongoDB (for demo)
4. **Roles**: Pre-assign roles instead of on-chain registration flow
5. **Gas**: Use localhost Hardhat node (free gas) for demo
6. **Email**: Console.log instead of actual email service

## 6. PRODUCTION READINESS CHECKLIST

- [ ] All API endpoints have role-based access control
- [ ] All smart contract functions have access modifiers
- [ ] All user inputs are validated (frontend + backend + contract)
- [ ] All events are emitted and listened to
- [ ] All errors have user-friendly messages
- [ ] All transactions have gas estimation
- [ ] All IPFS uploads have duplicate detection
- [ ] All fund releases require validator approval
- [ ] All misuse triggers auto-freeze
- [ ] All frozen campaigns prevent further actions

---

**This architecture ensures ZERO disconnected logic. Every action flows through all three layers with proper validation and synchronization.**
