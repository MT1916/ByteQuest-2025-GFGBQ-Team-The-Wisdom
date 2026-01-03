require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initBlockchain } = require("./services/blockchain");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/campaigns", require("./routes/campaignRoutes"));

const { verifyWalletSignature, requireRole } = require('./middleware/auth');

app.get('/', (req, res) => {
  res.send('ZakaatChain API is running');
});

// --- RBAC DEMO ROUTES ---

// 1. Secured Endpoint: NGO Only
app.post('/api/ngo/secure-action', verifyWalletSignature, requireRole(['NGO']), (req, res) => {
  res.json({ message: "Action authorized for NGO", user: req.user });
});

// 2. Secured Endpoint: Validator Only
app.post('/api/validator/audit', verifyWalletSignature, requireRole(['VALIDATOR']), (req, res) => {
  res.json({ message: "Audit data access granted", auditor: req.user });
});

// 3. Public/Donor Endpoint (Authentication Required, but any role or specific donor)
app.get('/api/projects', verifyWalletSignature, (req, res) => {
  // Accessible by anyone with a valid wallet signature
  res.json({ message: "Public project data" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  initBlockchain();
});
