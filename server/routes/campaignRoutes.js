const express = require('express');
const router = express.Router();
const { getAllCampaigns, createCampaignMetadata } = require('../controllers/campaignController');

router.get('/', getAllCampaigns);
router.post('/create', createCampaignMetadata);

module.exports = router;
