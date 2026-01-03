// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title ZakaatAccessControl
 * @dev Implements Role-Based Access Control (RBAC) specifically for ZakaatChain.
 *      Enforces strictly defined roles: DONOR, NGO, VALIDATOR.
 *      Follows the principle of Amanah (Trust) - power separation.
 */
contract ZakaatAccessControl {
    
    // Role Definitions (Immutable hashes for gas efficiency)
    bytes32 public constant ROLE_ADMIN = keccak256("ROLE_ADMIN"); // deployer/system owner
    bytes32 public constant ROLE_DONOR = keccak256("ROLE_DONOR");
    bytes32 public constant ROLE_NGO = keccak256("ROLE_NGO");
    bytes32 public constant ROLE_VALIDATOR = keccak256("ROLE_VALIDATOR");

    // Role Mapping: Address => Role Hash => boolean
    // Ideally, an address should only have ONE primary role in this context to avoid conflict,
    // but standard RBAC allows multiple. We will enforce checks.
    mapping(bytes32 => mapping(address => bool)) private _roles;

    // Events for transparency (Audit Trail)
    event RoleGranted(bytes32 indexed role, address indexed account, address indexed sender);
    event RoleRevoked(bytes32 indexed role, address indexed account, address indexed sender);
    event UnauthorizedAccess(address indexed account, bytes32 requiredRole);

    constructor() {
        // Assign Admin role to deployer
        _grantRole(ROLE_ADMIN, msg.sender);
    }

    // ==========================================
    // MODIFIERS
    // ==========================================

    modifier onlyAdmin() {
        require(hasRole(ROLE_ADMIN, msg.sender), "Access Denied: Admin only");
        _;
    }

    modifier onlyNGO() {
        if (!hasRole(ROLE_NGO, msg.sender)) {
            emit UnauthorizedAccess(msg.sender, ROLE_NGO);
            revert("Access Denied: NGO only");
        }
        _;
    }

    modifier onlyValidator() {
        if (!hasRole(ROLE_VALIDATOR, msg.sender)) {
            emit UnauthorizedAccess(msg.sender, ROLE_VALIDATOR);
            revert("Access Denied: Validator only");
        }
        _;
    }

    modifier onlyDonor() {
        if (!hasRole(ROLE_DONOR, msg.sender)) {
            emit UnauthorizedAccess(msg.sender, ROLE_DONOR);
            revert("Access Denied: Donor only");
        }
        _;
    }

    // ==========================================
    // INTERNAL LOGIC
    // ==========================================

    function hasRole(bytes32 role, address account) public view returns (bool) {
        return _roles[role][account];
    }

    function _grantRole(bytes32 role, address account) internal {
        if (!_roles[role][account]) {
            _roles[role][account] = true;
            emit RoleGranted(role, account, msg.sender);
        }
    }

    function _revokeRole(bytes32 role, address account) internal {
        if (_roles[role][account]) {
            _roles[role][account] = false;
            emit RoleRevoked(role, account, msg.sender);
        }
    }

    // ==========================================
    // ADMIN FUNCTIONS (Strictly Controlled)
    // ==========================================

    /**
     * @dev Assigns a role to a user. In a real hackathon simplified flow, 
     * this might be automated or pre-seeded.
     */
    function grantRole(bytes32 role, address account) external onlyAdmin {
        require(account != address(0), "Invalid address");
        // Optional: Enforce single-role policy if strictly required
        _grantRole(role, account);
    }

    function revokeRole(bytes32 role, address account) external onlyAdmin {
        require(account != msg.sender, "Cannot revoke self");
        _revokeRole(role, account);
    }
}
