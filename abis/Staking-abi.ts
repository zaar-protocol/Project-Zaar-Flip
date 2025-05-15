export const StakingAbi = [
    // Constructor
    {
      "type": "constructor",
      "inputs": [{ "name": "_manager", "type": "address", "internalType": "address" }],
      "stateMutability": "nonpayable"
    },
    
    // Constants
    {
      "type": "function",
      "name": "MAX_LIQUIDITY_PERCENTAGE",
      "inputs": [],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    
    // Token Management
    {
      "type": "function",
      "name": "acceptedTokens",
      "inputs": [{ "name": "", "type": "address", "internalType": "address" }],
      "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "addAcceptedToken",
      "inputs": [{ "name": "token", "type": "address", "internalType": "address" }],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "removeAcceptedToken",
      "inputs": [{ "name": "token", "type": "address", "internalType": "address" }],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "supportedTokens",
      "inputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
      "stateMutability": "view"
    },
    
    // Game Authorization
    {
      "type": "function",
      "name": "addAuthorizedGame",
      "inputs": [{ "name": "game", "type": "address", "internalType": "address" }],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "authorizedGames",
      "inputs": [{ "name": "", "type": "address", "internalType": "address" }],
      "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "removeAuthorizedGame",
      "inputs": [{ "name": "game", "type": "address", "internalType": "address" }],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "finalizeRemoveAuthorizedGame",
      "inputs": [{ "name": "game", "type": "address", "internalType": "address" }],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "removalInProgress",
      "inputs": [{ "name": "", "type": "address", "internalType": "address" }],
      "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
      "stateMutability": "view"
    },
    
    // Staking Functions
    {
      "type": "function",
      "name": "requestStake",
      "inputs": [
        { "name": "token", "type": "address", "internalType": "address" },
        { "name": "amount", "type": "uint256", "internalType": "uint256" },
        { "name": "minSharesOut", "type": "uint256", "internalType": "uint256" },
        { "name": "finalizeDeadline", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "finalizeStake",
      "inputs": [
        { "name": "token", "type": "address", "internalType": "address" },
        { "name": "user", "type": "address", "internalType": "address" }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "cancelExpiredStakeRequest",
      "inputs": [{ "name": "token", "type": "address", "internalType": "address" }],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "stakeRequests",
      "inputs": [
        { "name": "", "type": "address", "internalType": "address" },
        { "name": "", "type": "address", "internalType": "address" }
      ],
      "outputs": [
        { "name": "amount", "type": "uint256", "internalType": "uint256" },
        { "name": "requestTime", "type": "uint256", "internalType": "uint256" },
        { "name": "minSharesOut", "type": "uint256", "internalType": "uint256" },
        { "name": "finalizeDeadline", "type": "uint256", "internalType": "uint256" }
      ],
      "stateMutability": "view"
    },
    
    // Unstaking Functions
    {
      "type": "function",
      "name": "requestUnstake",
      "inputs": [
        { "name": "token", "type": "address", "internalType": "address" },
        { "name": "shares", "type": "uint256", "internalType": "uint256" },
        { "name": "minAmountOut", "type": "uint256", "internalType": "uint256" },
        { "name": "finalizeDeadline", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "finalizeUnstake",
      "inputs": [
        { "name": "token", "type": "address", "internalType": "address" },
        { "name": "user", "type": "address", "internalType": "address" },
        { "name": "minAmountOut", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "cancelExpiredUnstakeRequest",
      "inputs": [{ "name": "token", "type": "address", "internalType": "address" }],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "unstakeRequests",
      "inputs": [
        { "name": "", "type": "address", "internalType": "address" },
        { "name": "", "type": "address", "internalType": "address" }
      ],
      "outputs": [
        { "name": "shares", "type": "uint256", "internalType": "uint256" },
        { "name": "requestTime", "type": "uint256", "internalType": "uint256" },
        { "name": "minAmountOut", "type": "uint256", "internalType": "uint256" },
        { "name": "finalizeDeadline", "type": "uint256", "internalType": "uint256" }
      ],
      "stateMutability": "view"
    },
    
    // Liquidity Management
    {
      "type": "function",
      "name": "lockLiquidity",
      "inputs": [
        { "name": "token", "type": "address", "internalType": "address" },
        { "name": "amount", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "unlockLiquidity",
      "inputs": [
        { "name": "token", "type": "address", "internalType": "address" },
        { "name": "amount", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "forceUnlockLiquidity",
      "inputs": [
        { "name": "game", "type": "address", "internalType": "address" },
        { "name": "token", "type": "address", "internalType": "address" },
        { "name": "amount", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "lockedLiquidity",
      "inputs": [{ "name": "", "type": "address", "internalType": "address" }],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "gameLockedLiquidity",
      "inputs": [
        { "name": "", "type": "address", "internalType": "address" },
        { "name": "", "type": "address", "internalType": "address" }
      ],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    
    // Payout Management
    {
      "type": "function",
      "name": "claimPendingPayout",
      "inputs": [
        { "name": "token", "type": "address", "internalType": "address" },
        { "name": "receiver", "type": "address", "internalType": "address" }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "transferPayout",
      "inputs": [
        { "name": "token", "type": "address", "internalType": "address" },
        { "name": "recipient", "type": "address", "internalType": "address" },
        { "name": "amount", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "pendingPayouts",
      "inputs": [
        { "name": "", "type": "address", "internalType": "address" },
        { "name": "", "type": "address", "internalType": "address" }
      ],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    
    // Balance and Accounting
    {
      "type": "function",
      "name": "getAvailableBalance",
      "inputs": [{ "name": "token", "type": "address", "internalType": "address" }],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "shareBalances",
      "inputs": [
        { "name": "", "type": "address", "internalType": "address" },
        { "name": "", "type": "address", "internalType": "address" }
      ],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "tokenAccounting",
      "inputs": [{ "name": "", "type": "address", "internalType": "address" }],
      "outputs": [
        { "name": "totalPendingPayouts", "type": "uint256", "internalType": "uint256" },
        { "name": "totalPendingStakes", "type": "uint256", "internalType": "uint256" }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "tokenInfo",
      "inputs": [{ "name": "", "type": "address", "internalType": "address" }],
      "outputs": [
        { "name": "totalShares", "type": "uint256", "internalType": "uint256" },
        { "name": "lastUpdateTime", "type": "uint256", "internalType": "uint256" }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "totalOwed",
      "inputs": [
        { "name": "user", "type": "address", "internalType": "address" },
        { "name": "token", "type": "address", "internalType": "address" }
      ],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    
    // Configuration Getters
    {
      "type": "function",
      "name": "depositDelay",
      "inputs": [],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "manager",
      "inputs": [],
      "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
      "stateMutability": "view"
    },
    // {
    //   "type": "function",
    //   "name": "maxLiquidityPercentage",
    //   "inputs": [],
    //   "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    //   "stateMutability": "view"
    // },
    {
      "type": "function",
      "name": "unstakeDelay",
      "inputs": [],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    
    // Configuration Setters
    {
      "type": "function",
      "name": "setCooldownPeriod",
      "inputs": [{ "name": "newCooldownPeriod", "type": "uint256", "internalType": "uint256" }],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "setDepositDelay",
      "inputs": [{ "name": "newDepositDelay", "type": "uint256", "internalType": "uint256" }],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "setManager",
      "inputs": [{ "name": "newManager", "type": "address", "internalType": "address" }],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "setMaxLiquidityPercentage",
      "inputs": [{ "name": "newMaxLiquidityPercentage", "type": "uint256", "internalType": "uint256" }],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    
    // Ownership Functions
    {
      "type": "function",
      "name": "owner",
      "inputs": [],
      "outputs": [{ "name": "result", "type": "address", "internalType": "address" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "ownershipHandoverExpiresAt",
      "inputs": [{ "name": "pendingOwner", "type": "address", "internalType": "address" }],
      "outputs": [{ "name": "result", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "cancelOwnershipHandover",
      "inputs": [],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "completeOwnershipHandover",
      "inputs": [{ "name": "pendingOwner", "type": "address", "internalType": "address" }],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "renounceOwnership",
      "inputs": [],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "requestOwnershipHandover",
      "inputs": [],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "transferOwnership",
      "inputs": [{ "name": "newOwner", "type": "address", "internalType": "address" }],
      "outputs": [],
      "stateMutability": "payable"
    },
    
    // Events
    {
      "type": "event",
      "name": "CooldownPeriodUpdated",
      "inputs": [{ "name": "newCooldown", "type": "uint256", "indexed": false, "internalType": "uint256" }],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "DepositDelayUpdated",
      "inputs": [{ "name": "newDepositDelay", "type": "uint256", "indexed": false, "internalType": "uint256" }],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "ForcedLiquidityUnlocked",
      "inputs": [
        { "name": "game", "type": "address", "indexed": true, "internalType": "address" },
        { "name": "token", "type": "address", "indexed": true, "internalType": "address" },
        { "name": "amount", "type": "uint256", "indexed": false, "internalType": "uint256" }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "GameAuthorized",
      "inputs": [{ "name": "game", "type": "address", "indexed": true, "internalType": "address" }],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "GameRemovalInitiated",
      "inputs": [{ "name": "game", "type": "address", "indexed": true, "internalType": "address" }],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "GameUnauthorized",
      "inputs": [{ "name": "game", "type": "address", "indexed": true, "internalType": "address" }],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "ManagerUpdated",
      "inputs": [
        { "name": "oldManager", "type": "address", "indexed": true, "internalType": "address" },
        { "name": "newManager", "type": "address", "indexed": true, "internalType": "address" }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "MaxLiquidityPercentageUpdated",
      "inputs": [{ "name": "newPercentage", "type": "uint256", "indexed": false, "internalType": "uint256" }],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "OwnershipHandoverCanceled",
      "inputs": [{ "name": "pendingOwner", "type": "address", "indexed": true, "internalType": "address" }],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "OwnershipHandoverRequested",
      "inputs": [{ "name": "pendingOwner", "type": "address", "indexed": true, "internalType": "address" }],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "OwnershipTransferred",
      "inputs": [
        { "name": "oldOwner", "type": "address", "indexed": true, "internalType": "address" },
        { "name": "newOwner", "type": "address", "indexed": true, "internalType": "address" }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "PayoutTransferred",
      "inputs": [
        { "name": "token", "type": "address", "indexed": true, "internalType": "address" },
        { "name": "to", "type": "address", "indexed": true, "internalType": "address" },
        { "name": "amount", "type": "uint256", "indexed": false, "internalType": "uint256" }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "RewardClaimed",
      "inputs": [
        { "name": "user", "type": "address", "indexed": true, "internalType": "address" },
        { "name": "token", "type": "address", "indexed": true, "internalType": "address" },
        { "name": "amount", "type": "uint256", "indexed": false, "internalType": "uint256" }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "StakeRefunded",
      "inputs": [
        { "name": "user", "type": "address", "indexed": true, "internalType": "address" },
        { "name": "token", "type": "address", "indexed": true, "internalType": "address" },
        { "name": "amount", "type": "uint256", "indexed": false, "internalType": "uint256" }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "StakeRequested",
      "inputs": [
        { "name": "user", "type": "address", "indexed": true, "internalType": "address" },
        { "name": "token", "type": "address", "indexed": true, "internalType": "address" },
        { "name": "amount", "type": "uint256", "indexed": false, "internalType": "uint256" }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "Staked",
      "inputs": [
        { "name": "user", "type": "address", "indexed": true, "internalType": "address" },
        { "name": "token", "type": "address", "indexed": true, "internalType": "address" },
        { "name": "amount", "type": "uint256", "indexed": false, "internalType": "uint256" }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "TokenAdded",
      "inputs": [{ "name": "token", "type": "address", "indexed": true, "internalType": "address" }],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "TokenRemoved",
      "inputs": [{ "name": "token", "type": "address", "indexed": true, "internalType": "address" }],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "TransferFailed",
      "inputs": [
        { "name": "token", "type": "address", "indexed": true, "internalType": "address" },
        { "name": "to", "type": "address", "indexed": true, "internalType": "address" },
        { "name": "amount", "type": "uint256", "indexed": false, "internalType": "uint256" }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "UnstakeRequested",
      "inputs": [
        { "name": "user", "type": "address", "indexed": true, "internalType": "address" },
        { "name": "token", "type": "address", "indexed": true, "internalType": "address" },
        { "name": "shares", "type": "uint256", "indexed": false, "internalType": "uint256" }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "Unstaked",
      "inputs": [
        { "name": "user", "type": "address", "indexed": true, "internalType": "address" },
        { "name": "token", "type": "address", "indexed": true, "internalType": "address" },
        { "name": "amount", "type": "uint256", "indexed": false, "internalType": "uint256" }
      ],
      "anonymous": false
    },
    
    // Errors
    {
      "type": "error",
      "name": "AlreadyInitialized",
      "inputs": []
    },
    {
      "type": "error",
      "name": "NewOwnerIsZeroAddress",
      "inputs": []
    },
    {
      "type": "error",
      "name": "NoHandoverRequest",
      "inputs": []
    },
    {
      "type": "error",
      "name": "Reentrancy",
      "inputs": []
    },
    {
      "type": "error",
      "name": "Unauthorized",
      "inputs": []
    }
  ] as const