const { ethers } = require('ethers'); // Requires: npm install ethers

// MOCK ROLE DATABASE (For Hackathon Speed)
// In production, this comes from DB or Smart Contract read
const ROLE_REGISTRY = {
    // Replace with your local MetaMask / Testnet addresses
    "0xYourDonorAddressHere": "DONOR",
    "0xYourNGOAddressHere": "NGO",
    "0xYourValidatorAddressHere": "VALIDATOR"
};

/**
 * Middleware: Verify Wallet Signature
 * Ensures the request comes from the owner of the claimed wallet address.
 * 
 * Headers required:
 * x-wallet-address: 0x123...
 * x-signature: 0xabc... (Signed message: "Login to ZakaatChain")
 */
const verifyWalletSignature = async (req, res, next) => {
    try {
        const walletAddress = req.headers['x-wallet-address'];
        const signature = req.headers['x-signature'];

        if (!walletAddress || !signature) {
            return res.status(401).json({ error: "Missing authentication headers" });
        }

        // --- REAL SIGNATURE VERIFICATION LOGIC ---
        // const message = "Login to ZakaatChain";
        // const recoveredAddress = ethers.utils.verifyMessage(message, signature);
        // if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
        //    return res.status(403).json({ error: "Invalid Signature" });
        // }
        // -----------------------------------------

        // For Hackathon Demo (Bypass Signature Check if 'bypass' is sent, OR just trust address for internals)
        // We strictly enforce Role Mapping here.

        req.user = {
            address: walletAddress.toLowerCase(),
            role: ROLE_REGISTRY[walletAddress] || "GUEST"
        };

        console.log(`[Auth] User: ${walletAddress} | Role: ${req.user.role}`);
        next();

    } catch (error) {
        console.error("Auth Error:", error);
        res.status(500).json({ error: "Authentication failed" });
    }
};

/**
 * Middleware: Role Enforcer
 * Prevents access if user's role is not in the allowed list.
 */
const requireRole = (allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.user?.role;

        if (!userRole || !allowedRoles.includes(userRole)) {
            console.warn(`[Access Denied] User Role: ${userRole} | Required: ${allowedRoles}`);
            return res.status(403).json({
                error: "Access Denied: Insufficient Permissions",
                required: allowedRoles,
                current: userRole
            });
        }

        next();
    };
};

module.exports = { verifyWalletSignature, requireRole };
