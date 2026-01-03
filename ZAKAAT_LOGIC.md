# ZakaatChain: Islamic Finance & Blockchain Logic

## 1. Asnaf Categories (The 8 Eligible Beneficiaries)
*Enum logic for Smart Contract & Frontend Selection*

1.  **Faqir** (The Poor) - Has insufficient means for livelihood.
2.  **Miskin** (The Needy) - Has barely enough to survive.
3.  **Amil** (Zakaat Administrators) - *Note: On our platform, this is handled via a separate "Platform Fee" or "Tip" mechanic, NOT from the Zakaat pool itself to ensure 100% Zakaat purity, or strictly capped.*
4.  **Muallaf** (Reconciliation of Hearts) - New Muslims or friends of the community.
5.  **Riqab** (Bondage/Slavery) - freeing captives (modern application: liberating derived debt/human trafficking).
6.  **Gharimin** (Debtors) - Those overwhelmed by debt (basic needs debt only).
7.  **Fisabilillah** (In the Cause of Allah) - Generic charitable/educational/medical causes aligned with Sharia.
8.  **Ibn Sabil** (The Wayfarer) - Travelers stranded without resources.

## 2. Allowed & Disallowed Expenses

| Type | Status | Rule |
| :--- | :--- | :--- |
| **Direct Cash Transfer** | ✅ **ALLOWED** | Preferred method (Tamlik). Funds go directly to Beneficiary Wallet. |
| **Essential Goods** | ✅ **ALLOWED** | Food, Medicine, Shelter cost. Must have receipt proof using IPFS. |
| **Debt Repayment** | ✅ **ALLOWED** | Direct payment to creditor for eligible debtor (Gharimin). |
| **Admin Salaries** | ❌ **FORBIDDEN** | Zakaat capital cannot be used for operational costs/salaries of the NGO. |
| **Infrastructure** | ⚠️ **CONDITIONAL** | Generally Forbidden (Sadqa Jariyah) unless specifically for Fisabilillah (e.g., Hospital) and ownsership is public. |
| **Investments** | ❌ **FORBIDDEN** | Zakaat must be spent/distributed, not invested for profit. |

## 3. Rule Validation Logic (System Enforceable)

1.  **Separation of Funds (The "Purity" Check)**
    *   *Logic*: `if (fundType == ZAKAAT) { assert(recipient.category != ADMIN); }`
    *   *Constraint*: Zakaat wallets cannot initiate transactions to Validator/Admin wallets unless explicitly tagged as separate 'Gas/Fee' sub-transaction (paid by Donor, not deducted from Zakaat).

2.  **Milestone-Based Release (The "Amanah" Check)**
    *   *Logic*: Campaign Total: 10 ETH.
    *   *Initial*: Release 20%.
    *   *Next*: `require(ProofOfImpact == Verified) -> Release next 20%`.
    *   *Outcome*: If Proof is rejected by Validators, remaining funds strictly frozen or returned to Donors (Refund), never to NGO.

3.  **Tamlik (Transfer of Ownership)**
    *   *Logic*: The system must verify the final destination address belongs to an individual (Beneficiary) or a service provider (Hospital/Grocery), not a holding pool.

## 4. Mapping Principles to System Behavior

| Islamic Principle | Concept | System Behavior |
| :--- | :--- | :--- |
| **Amanah** | Trust/Custody | **Multi-Sig Wallets**: NGO cannot withdraw freely. Validators must sign off. |
| **Halal/Haram** | Permissible/Forbidden | **Smart Contract Whitelists**: Funds blocked from blacklisted categories (e.g., interest-bearing protocols, gambling sites). |
| **Niyyah** | Intention | **Metadata Tagging**: Every donation tx carries a "Niyyah" tag (Zakaat vs Sadqa) which dictates the logic path. |
| **Haqq** | Right of the Receiver | **Pull Payments**: Beneficiaries can "claim" their allocated Zakaat if valid, rather than waiting for NGO push (reducing delay). |

