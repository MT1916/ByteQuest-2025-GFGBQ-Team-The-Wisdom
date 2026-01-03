// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./ZakaatAccessControl.sol";

contract ZakaatFund is ZakaatAccessControl {

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

    // --- State Variables ---
    uint256 public campaignCount;
    mapping(uint256 => Campaign) public campaigns;
    mapping(uint256 => mapping(address => uint256)) public donorBalances; // For refunds

    address public milestoneValidatorContract;

    // --- Events ---
    event CampaignCreated(uint256 indexed id, string title, AsnafCategory category);
    event DonationReceived(uint256 indexed id, address indexed donor, uint256 amount);
    event FundsReleased(uint256 indexed campaignId, address indexed recipient, uint256 amount);
    event CampaignFrozen(uint256 indexed campaignId, string reason);
    event ValidatorContractUpdated(address indexed newValidatorContract);

    // --- Modifiers ---
    modifier onlyMilestoneValidator() {
        require(msg.sender == milestoneValidatorContract, "Caller is not the MilestoneValidator");
        _;
    }



    constructor() {
        // Deployer gets admin role by default via ZakaatAccessControl constructor
    }

    // --- Configuration ---
    function setMilestoneValidator(address _validatorContract) external onlyAdmin {
        milestoneValidatorContract = _validatorContract;
        emit ValidatorContractUpdated(_validatorContract);
    }

    // --- Core Functions ---

    function createCampaign(
        string memory _title, 
        string memory _desc, 
        uint256 _target, 
        AsnafCategory _cat
    ) external onlyNGO {
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

    // --- Restricted Access (Called by MilestoneValidator) ---

    // Allow the Validator Contract to release funds after approval
    function releaseFunds(uint256 _campaignId, uint256 _amount, address payable _recipient) external onlyMilestoneValidator {
        Campaign storage c = campaigns[_campaignId];
        require(c.status != CampaignStatus.FROZEN, "Campaign is Frozen");
        require(_amount <= c.currentAmount, "Insufficient campaign funds");
        require(_amount <= address(this).balance, "Insufficient contract balance");

        c.currentAmount -= _amount; // Deduct from campaign tracking
        
        (bool sent, ) = _recipient.call{value: _amount}("");
        require(sent, "Transfer failed");

        emit FundsReleased(_campaignId, _recipient, _amount);
    }

    function freezeCampaign(uint256 _id, string memory _reason) external onlyValidator {
        campaigns[_id].status = CampaignStatus.FROZEN;
        emit CampaignFrozen(_id, _reason);
    }

    // --- View Functions ---
    function getCampaign(uint256 _id) external view returns (Campaign memory) {
        return campaigns[_id];
    }
}
