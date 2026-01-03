// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ZakaatFund {
    // --- Enums & Structs ---
    enum AsnafCategory { FAQIR, MISKIN, AMIL, MUALLAF, RIQAB, GHARIMIN, FISABILILLAH, IBN_SABIL }
    enum CampaignStatus { OPEN, ACTIVE, COMPLETED, FROZEN }

    struct Campaign {
        uint256 id;
        address payable ngo;
        string title;
        string description;
        uint256 targetAmount;
        uint256 currentAmount;
        AsnafCategory category;
        CampaignStatus status;
        uint256 deadline;
    }

    struct Milestone {
        string description;
        uint256 amount;
        bool isApproved;
        string proofHash; // IPFS Hash of receipt/photo
        address payable recipient; // Final end-user (vendor/beneficiary)
    }

    // --- State Variables ---
    uint256 public campaignCount;
    mapping(uint256 => Campaign) public campaigns;
    mapping(uint256 => Milestone[]) public milestones;
    mapping(address => bool) public validators;
    mapping(uint256 => mapping(address => uint256)) public donorBalances; // For refunds

    // --- Events ---
    event CampaignCreated(uint256 indexed id, string title, AsnafCategory category);
    event DonationReceived(uint256 indexed id, address indexed donor, uint256 amount);
    event MilestoneSubmitted(uint256 indexed campaignId, uint256 milestoneIndex);
    event FundsReleased(uint256 indexed campaignId, address indexed recipient, uint256 amount);
    event CampaignFrozen(uint256 indexed campaignId, string reason);

    // --- Modifiers ---
    modifier onlyValidator() {
        require(validators[msg.sender], "Not a authorized validator");
        _;
    }

    modifier onlyNGO(uint256 _id) {
        require(campaigns[_id].ngo == msg.sender, "Not the campaign owner");
        _;
    }

    constructor() {
        validators[msg.sender] = true; // Deployer is first validator for hackathon simplicity
    }

    // --- Core Functions ---

    function createCampaign(
        string memory _title, 
        string memory _desc, 
        uint256 _target, 
        AsnafCategory _cat
    ) external {
        campaignCount++;
        campaigns[campaignCount] = Campaign(
            campaignCount,
            payable(msg.sender),
            _title,
            _desc,
            _target,
            0,
            _cat,
            CampaignStatus.OPEN,
            block.timestamp + 30 days
        );
        emit CampaignCreated(campaignCount, _title, _cat);
    }

    function donate(uint256 _id) external payable {
        Campaign storage c = campaigns[_id];
        require(c.status == CampaignStatus.OPEN || c.status == CampaignStatus.ACTIVE, "Campaign not active");
        require(msg.value > 0, "Donation must be > 0");
        
        c.currentAmount += msg.value;
        donorBalances[_id][msg.sender] += msg.value;
        
        if(c.status == CampaignStatus.OPEN) {
            c.status = CampaignStatus.ACTIVE;
        }

        emit DonationReceived(_id, msg.sender, msg.value);
    }

    // --- Validation & Release Logic ---

    function submitMilestone(
        uint256 _id, 
        string memory _desc, 
        uint256 _amount, 
        string memory _proofHash,
        address payable _recipient
    ) external onlyNGO(_id) {
        Campaign storage c = campaigns[_id];
        require(c.status != CampaignStatus.FROZEN, "Campaign is Frozen");
        require(_amount <= address(this).balance, "Insufficient contract balance"); // Simplified check
        
        milestones[_id].push(Milestone({
            description: _desc,
            amount: _amount,
            isApproved: false,
            proofHash: _proofHash,
            recipient: _recipient
        }));

        emit MilestoneSubmitted(_id, milestones[_id].length - 1);
    }

    function approveMilestone(uint256 _id, uint256 _milestoneIndex) external onlyValidator {
        Milestone storage m = milestones[_id][_milestoneIndex];
        Campaign storage c = campaigns[_id];
        
        require(!m.isApproved, "Already approved");
        require(c.status != CampaignStatus.FROZEN, "Campaign Frozen");

        m.isApproved = true;
        
        // DIRECT TRANSFER: Principle of Tamlik
        // Funds go to the End Recipient, rarely to the NGO directly
        (bool sent, ) = m.recipient.call{value: m.amount}("");
        require(sent, "Transfer failed");

        emit FundsReleased(_id, m.recipient, m.amount);
    }

    // --- Safety Valve ---

    function freezeCampaign(uint256 _id, string memory _reason) external onlyValidator {
        campaigns[_id].status = CampaignStatus.FROZEN;
        emit CampaignFrozen(_id, _reason);
    }
}
