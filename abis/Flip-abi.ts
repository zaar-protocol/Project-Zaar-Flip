export const FlipAbi = [
  // Constructor
  {
    inputs: [
      { name: "_maxCoins", type: "uint256" },
      { name: "_feePercentage", type: "uint256" },
      { name: "_stakingContract", type: "address" },
      { name: "_useVRF", type: "bool" },
      { name: "_liquidityEdge", type: "uint256" },
      { name: "_manager", type: "address" },
      { name: "_managerWinFeePercentage", type: "uint256" },
      { name: "_randomnessProvider", type: "address" },
      { name: "_maxLiquidityPercentage", type: "uint256" }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },

  // Core Game Functions
  {
    inputs: [
      { name: "betAmount", type: "uint256" },
      { name: "numberOfCoins", type: "uint256" },
      { name: "headsRequired", type: "uint256" },
      { name: "token", type: "address" }
    ],
    name: "flip",
    outputs: [{ name: "", type: "string" }],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      { name: "gameId", type: "string" },
      { name: "randomNumber", type: "uint256" }
    ],
    name: "completeGame",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { name: "betAmount", type: "uint256" },
      { name: "numberOfCoins", type: "uint256" },
      { name: "headsRequired", type: "uint256" }
    ],
    name: "calculatePayout",
    outputs: [
      { name: "grossPayout", type: "uint256" },
      { name: "netPayout", type: "uint256" },
      { name: "fee", type: "uint256" }
    ],
    stateMutability: "view",
    type: "function"
  },

  // View Functions
  {
    inputs: [],
    name: "randomnessProvider",
    outputs: [{ name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ name: "token", type: "address" }],
    name: "acceptedTokens",
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ name: "gameId", type: "string" }],
    name: "pendingGames",
    outputs: [
      { name: "player", type: "address" },
      { name: "betAmount", type: "uint256" },
      { name: "numberOfCoins", type: "uint256" },
      { name: "headsRequired", type: "uint256" },
      { name: "netPayout", type: "uint256" },
      { name: "token", type: "address" },
      { name: "gameStartTime", type: "uint256" }
    ],
    stateMutability: "view",
    type: "function"
  },

  // Events
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "player", type: "address" },
      { indexed: false, name: "won", type: "bool" },
      { indexed: false, name: "payout", type: "uint256" }
    ],
    name: "GameResult",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "gameId", type: "string" },
      { indexed: true, name: "player", type: "address" },
      { indexed: false, name: "betAmount", type: "uint256" },
      { indexed: false, name: "numberOfCoins", type: "uint256" },
      { indexed: false, name: "headsRequired", type: "uint256" },
      { indexed: false, name: "token", type: "address" }
    ],
    name: "GameCreated",
    type: "event"
  },

  // Fallback
  {
    stateMutability: "payable",
    type: "receive"
  }
] as const;
  