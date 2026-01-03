# ZakaatChain Smart Contract Design

## 1. ZakaatFund.sol (Core Treasury)
**Responsibility**: Holds all donations, manages Campaign creation, and enforces "Zakaat Purity" (funds only move to whitelisted Asnaf).

### Enums
- `AsnafCategory` { FAQIR, MISKIN, MUALLAF, RIQAB, GHARIMIN, FISABILILLAH, IBN_SABIL }
- `CampaignStatus` { OPEN, FUNDED, LOCKED, COMPLETED, FROZEN }

### State Variables
- `mapping(uint => Campaign) public campaigns`
- `mapping(address => bool) public approvedNGOs`
- `mapping(address => bool) public validators`
- `uint public totalDonations`
- `uint public totalDistributed`

### Key Functions
- `createCampaign(title, description, targetAmount, asnafCategory)`: NGO creates a need.
- `donate(campaignId)`: Donor sends ETH/MATIC. Funds stay in Contract (Escrow), NOT sent to NGO.
- `approveExpense(campaignId, amount, recipient)`: **Only Validator** can call. Triggers transfer.
- `refundDonors(campaignId)`: If frozen/cancelled, Donors can pull funds back.

### Events
- `DonationReceived(indexed donor, indexed campaignId, uint amount)`
- `CampaignStatusChanged(indexed campaignId, CampaignStatus status)`
- `FundReleased(indexed campaignId, address indexed finalRecipient, uint amount)`

---

## 2. MilestoneValidator.sol (Governance & checks)
**Responsibility**: Validates proof-of-work/need before releasing funds. This contract acts as the "Gatekeeper".

### State Variables
- `mapping(uint => Milestone[]) public campaignMilestones`
- `struct Milestone { description, amountRequested, isApproved, proofHash }`

### Key Functions
- `submitMilestone(campaignId, proofHash)`: NGO uploads receipt hash (IPFS).
- `validateMilestone(campaignId, milestoneId, status)`: Validator approves/rejects.
- `triggerEmergencyFreeze(campaignId)`: **Misuse Logic**. If a Validator flags suspicious activity, the campaign status flips to `FROZEN`. No funds can leave.

### Misuse Detection Logic (Simplest Implementation)
1.  **Double Spending**: Campaign cannot request > Target Amount.
2.  **Wrong Category**: Funds approved for `RIQAB` cannot be sent to an address flagged as `STORE_LUXURY`. (Off-chain oracle check or simple whitelist).
3.  **Community Veto**: If > 51% validators vote "Freeze", `ZakaatFund.freeze(id)` is called.

