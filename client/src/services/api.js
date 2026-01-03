import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const getCampaigns = async () => {
    try {
        const response = await api.get('/campaigns');
        return response.data;
    } catch (error) {
        console.error("Error fetching campaigns:", error);
        return { success: false, data: [] };
    }
};

export const createCampaign = async (campaignData) => {
    try {
        const response = await api.post('/campaigns/create', campaignData);
        return response.data;
    } catch (error) {
        console.error("Error creating campaign:", error);
        throw error;
    }
};

export const getPendingReviews = async () => {
    // Mock API call - in real app would fetch from backend/blockchain
    return {
        success: true,
        data: [
            { id: 1, ngo: "Al-Khair Relief", amount: 120000, category: "Fuqara (Poor)", status: "Pending", purpose: "Emergency Food Rations", document: "Invoice_Dec.pdf", hash: "0x89...21a" },
            { id: 2, ngo: "Orphan Care", amount: 45000, category: "Masakin (Needy)", status: "Pending", purpose: "School Fees", document: "Fee_Structure.pdf", hash: "0x12...99b" }
        ]
    };
};

export const submitVerdict = async (reviewId, verdict, notes) => {
    console.log(`Submitting verdict for ${reviewId}: ${verdict}`);
    return { success: true };
};
