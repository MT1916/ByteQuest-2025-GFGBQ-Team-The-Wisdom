// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IZakaatFund {
    function releaseFunds(uint256 _campaignId, uint256 _amount, address payable _recipient) external;
    function freezeCampaign(uint256 _id, string memory _reason) external;
}

contract MilestoneValidator {
    
    IZakaatFund public zakaatFund;
    
    struct Milestone {
        uint256 id;
        uint256 campaignId;
        string name;
        uint256 budget;
        uint256 spent;
        MilestoneStatus status;
    }
    
    struct ExpenseProof {
        uint256 id;
        uint256 milestoneId;
        address ngo;
        uint256 amount;
        string ipfsHash;
        string description;
        ExpenseStatus status;
        address validator;
        uint256 submittedAt;
    }
    
    enum MilestoneStatus { ACTIVE, COMPLETED, FROZEN }
    enum ExpenseStatus { PENDING, APPROVED, REJECTED }
    
    uint256 public milestoneCount;
    uint256 public expenseCount;
    
    mapping(uint256 => Milestone) public milestones;
    mapping(uint256 => ExpenseProof) public expenses;
    mapping(bytes32 => bool) public usedReceiptHashes;
    
    event MilestoneCreated(uint256 indexed id, uint256 indexed campaignId, uint256 budget);
    event ExpenseSubmitted(uint256 indexed id, uint256 indexed milestoneId, string ipfsHash, uint256 amount);
    event ExpenseApproved(uint256 indexed id, address indexed validator);
    event ExpenseRejected(uint256 indexed id, string reason);
    event MisuseDetected(uint256 indexed campaignId, string reason);
    
    constructor(address _zakaatFundAddress) {
        zakaatFund = IZakaatFund(_zakaatFundAddress);
    }
    
    function createMilestone(
        uint256 _campaignId,
        string memory _name,
        uint256 _budget
    ) external {
        milestoneCount++;
        milestones[milestoneCount] = Milestone(
            milestoneCount,
            _campaignId,
            _name,
            _budget,
            0,
            MilestoneStatus.ACTIVE
        );
        emit MilestoneCreated(milestoneCount, _campaignId, _budget);
    }
    
    function submitExpenseProof(
        uint256 _milestoneId,
        uint256 _amount,
        string memory _ipfsHash
    ) external {
        Milestone storage milestone = milestones[_milestoneId];
        require(milestone.status == MilestoneStatus.ACTIVE, "Milestone not active");
        
        // Check duplicate receipt
        bytes32 hashKey = keccak256(abi.encodePacked(_ipfsHash));
        if (usedReceiptHashes[hashKey]) {
            emit MisuseDetected(milestone.campaignId, "Duplicate receipt detected");
            zakaatFund.freezeCampaign(milestone.campaignId, "Duplicate receipt");
            revert("Duplicate receipt - Campaign frozen");
        }
        
        // Check budget
        if (milestone.spent + _amount > milestone.budget) {
            emit MisuseDetected(milestone.campaignId, "Budget exceeded");
            zakaatFund.freezeCampaign(milestone.campaignId, "Budget exceeded");
            revert("Budget exceeded - Campaign frozen");
        }
        
        // Mark hash as used
        usedReceiptHashes[hashKey] = true;
        
        // Create expense record
        expenseCount++;
        expenses[expenseCount] = ExpenseProof(
            expenseCount,
            _milestoneId,
            msg.sender,
            _amount,
            _ipfsHash,
            "",
            ExpenseStatus.PENDING,
            address(0),
            block.timestamp
        );
        
        emit ExpenseSubmitted(expenseCount, _milestoneId, _ipfsHash, _amount);
    }
    
    function approveExpense(uint256 _expenseId) external {
        ExpenseProof storage expense = expenses[_expenseId];
        require(expense.status == ExpenseStatus.PENDING, "Not pending");
        
        Milestone storage milestone = milestones[expense.milestoneId];
        
        // Mark as approved
        expense.status = ExpenseStatus.APPROVED;
        expense.validator = msg.sender;
        
        // Update milestone spent
        milestone.spent += expense.amount;
        
        // Release funds from ZakaatFund
        zakaatFund.releaseFunds(
            milestone.campaignId,
            expense.amount,
            payable(expense.ngo)
        );
        
        emit ExpenseApproved(_expenseId, msg.sender);
    }
    
    function rejectExpense(uint256 _expenseId, string memory _reason) external {
        ExpenseProof storage expense = expenses[_expenseId];
        require(expense.status == ExpenseStatus.PENDING, "Not pending");
        
        expense.status = ExpenseStatus.REJECTED;
        expense.validator = msg.sender;
        expense.description = _reason;
        
        // Free up the receipt hash for resubmission
        bytes32 hashKey = keccak256(abi.encodePacked(expense.ipfsHash));
        usedReceiptHashes[hashKey] = false;
        
        emit ExpenseRejected(_expenseId, _reason);
    }
    
    function getMilestone(uint256 _id) external view returns (Milestone memory) {
        return milestones[_id];
    }
    
    function getExpense(uint256 _id) external view returns (ExpenseProof memory) {
        return expenses[_id];
    }
}
