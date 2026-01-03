// Core Zakaat Constants & Logic Helpers

export const ASNAF_CATEGORIES = {
    FAQIR: { id: 1, label: 'Faqir (The Poor)', desc: 'Those with insufficient means for livelihood.' },
    MISKIN: { id: 2, label: 'Miskin (The Needy)', desc: 'Those with barely enough to survive.' },
    AMIL: { id: 3, label: 'Amil (Administrators)', desc: 'Those who distribute Zakaat.' },
    MUALLAF: { id: 4, label: 'Muallaf', desc: 'Those whose hearts are to be reconciled.' },
    RIQAB: { id: 5, label: 'Riqab', desc: 'Freeing those in bondage/debt.' },
    GHARIMIN: { id: 6, label: 'Gharimin (Debtors)', desc: 'Those overwhelmed by debt.' },
    FISABILILLAH: { id: 7, label: 'Fisabilillah', desc: 'In the cause of Allah.' },
    IBN_SABIL: { id: 8, label: 'Ibn Sabil (Wayfarer)', desc: 'Travelers stranded without resources.' },
};

export const FUND_TYPES = {
    ZAKAAT: 'ZAKAAT',
    SADQA: 'SADQA',
    GENERAL: 'GENERAL',
};

export const RULES = {
    NO_ADMIN_SALARIES: "Zakaat funds cannot be used for admin salaries.",
    SEPARATE_FUNDS: "Zakaat funds must be stored separately from Sadqa/General funds.",
    MILESTONE_REQUIRED: "Funds > 1 ETH require validator approval for release.",
};

export const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
export const VALIDATOR_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
