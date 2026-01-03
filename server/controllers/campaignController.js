const supabase = require('../services/supabase');

const getAllCampaigns = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('campaigns')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        res.status(200).json({ success: true, count: data.length, data: data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const createCampaignMetadata = async (req, res) => {
    try {
        const { title, description, targetAmount, category, ngoAddress } = req.body;

        if (!title || !description) {
            return res.status(400).json({ success: false, error: "Missing fields" });
        }

        // Mock IPFS upload
        const mockIpfsHash = "Qm" + Math.random().toString(36).substring(7);

        const { data, error } = await supabase
            .from('campaigns')
            .insert([{
                title,
                description,
                target_amount: targetAmount,
                category,
                ngo_address: ngoAddress,
                ipfs_hash: mockIpfsHash,
                status: "PENDING_BLOCKCHAIN"
            }])
            .select();

        if (error) throw error;

        res.status(201).json({
            success: true,
            data: data[0],
            instruction: "Now send transaction to Smart Contract with this IPFS hash/metadata."
        });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const syncCampaignFromEvent = async (eventData) => {
    try {
        // Attempt to match by title for this hackathon example
        // In prod, use a UUID passed in the transaction
        const { data: pending } = await supabase
            .from('campaigns')
            .select('*')
            .eq('title', eventData.title)
            .eq('status', 'PENDING_BLOCKCHAIN')
            .single();

        if (pending) {
            console.log(`Syncing Campaign DB_ID=${pending.id} to Chain_ID=${eventData.id}`);
            await supabase
                .from('campaigns')
                .update({
                    status: 'ON_CHAIN',
                    blockchain_id: eventData.id
                })
                .eq('id', pending.id);
        } else {
            console.log(`Creating new campaign from on-chain event: ${eventData.title}`);
            await supabase
                .from('campaigns')
                .insert([{
                    title: eventData.title,
                    blockchain_id: eventData.id,
                    category: eventData.category,
                    status: 'ON_CHAIN (Synced)',
                    target_amount: 0 // Unknown unless we query contract
                }]);
        }
    } catch (err) {
        console.error("Supabase Sync Error:", err.message);
    }
};

module.exports = {
    getAllCampaigns,
    createCampaignMetadata,
    syncCampaignFromEvent
};
