export const abi = [
  {
    inputs: [
      { name: "_maxCoins", type: "uint256" },
      { name: "_feePercentage", type: "uint256" },
      { name: "_vrfProvider", type: "address" },
      { name: "_stakingContract", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [{ name: "_maxCoins", type: "uint256" }],
    name: "setMaxCoins",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "_feePercentage", type: "uint256" }],
    name: "setFeePercentage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "token", type: "address" }],
    name: "addAcceptedToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "token", type: "address" }],
    name: "removeAcceptedToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { name: "betAmount", type: "uint256" },
      { name: "numberOfCoins", type: "uint256" },
      { name: "headsRequired", type: "uint256" },
      { name: "token", type: "address" },
    ],
    name: "flip",
    outputs: [{ name: "", type: "bytes32" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { name: "seed", type: "string" },
      { name: "time", type: "uint64" },
      { name: "result", type: "bytes32" },
    ],
    name: "consume",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "maxCoins",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "feePercentage",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "COOLDOWN_PERIOD",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MAX_RETRIES",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "RETRY_DELAY",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "vrfProvider",
    outputs: [{ name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "stakingContract",
    outputs: [{ name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "latestRandomness",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "resultReceived",
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "", type: "address" }],
    name: "acceptedTokens",
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "", type: "address" }],
    name: "lastFlipTimestamp",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "", type: "bytes32" }],
    name: "pendingGames",
    outputs: [
      { name: "player", type: "address" },
      { name: "betAmount", type: "uint256" },
      { name: "numberOfCoins", type: "uint256" },
      { name: "headsRequired", type: "uint256" },
      { name: "token", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "", type: "bytes32" }],
    name: "isGamePending",
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "player", type: "address" },
      { indexed: false, name: "won", type: "bool" },
      { indexed: false, name: "payout", type: "uint256" },
    ],
    name: "GameResult",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [],
    name: "Blah",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: "", type: "uint256" }],
    name: "Bloop",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: "seed", type: "string" }],
    name: "RandomnessRequested",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "gameId", type: "bytes32" },
      { indexed: true, name: "player", type: "address" },
      { indexed: false, name: "betAmount", type: "uint256" },
      { indexed: false, name: "numberOfCoins", type: "uint256" },
      { indexed: false, name: "headsRequired", type: "uint256" },
      { indexed: false, name: "token", type: "address" },
    ],
    name: "GameCreated",
    type: "event",
  },
] as const;

export const zaarStakingAbi = [
  // ... other ABI entries
  {
    inputs: [
      { name: "token", type: "address" },
      { name: "user", type: "address" }
    ],
    name: "stakedBalances",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { name: "user", type: "address" },
      { name: "token", type: "address" }
    ],
    name: "earned",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ name: "token", type: "address" }],
    name: "totalStaked",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { name: "user", type: "address" },
      { name: "token", type: "address" }
    ],
    name: "timeUntilUnstake",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  }
] as const;

export const plinkoAbi = [
  {
    inputs: [
      { name: "_feePercentage", type: "uint256" },
      { name: "_vrfProvider", type: "address" },
      { name: "_stakingContract", type: "address" },
      { name: "_useVRF", type: "bool" },
      { name: "_liquidityEdge", type: "uint256" },
      { name: "_manager", type: "address" },
      { name: "_managerWinFeePercentage", type: "uint256" }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    inputs: [],
    name: "feePercentage",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "liquidityEdge",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "managerWinFeePercentage",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "manager",
    outputs: [{ name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "useVRF",
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "vrfProvider",
    outputs: [{ name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "stakingContract",
    outputs: [{ name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "MAX_ROWS",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ name: "", type: "uint256" }],
    name: "multipliers",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ name: "", type: "address" }],
    name: "acceptedTokens",
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ name: "", type: "address" }],
    name: "vrfConsumers",
    outputs: [{ name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ name: "", type: "string" }],
    name: "pendingGames",
    outputs: [
      { name: "player", type: "address" },
      { name: "betAmount", type: "uint256" },
      { name: "rows", type: "uint256" },
      { name: "token", type: "address" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ name: "", type: "string" }],
    name: "isGamePending",
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { name: "betAmount", type: "uint256" },
      { name: "rows", type: "uint256" }
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
  {
    inputs: [
      { name: "betAmount", type: "uint256" },
      { name: "rows", type: "uint256" },
      { name: "token", type: "address" }
    ],
    name: "play",
    outputs: [{ name: "", type: "string" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ name: "seed", type: "string" }],
    name: "completeGame",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ name: "_multipliers", type: "uint256[]" }],
    name: "setMultipliers",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ name: "token", type: "address" }],
    name: "addAcceptedToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ name: "token", type: "address" }],
    name: "removeAcceptedToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ name: "_feePercentage", type: "uint256" }],
    name: "setFeePercentage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ name: "_liquidityEdge", type: "uint256" }],
    name: "setLiquidityEdge",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ name: "_manager", type: "address" }],
    name: "setManager",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ name: "_managerWinFeePercentage", type: "uint256" }],
    name: "setManagerWinFeePercentage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ name: "_useVRF", type: "bool" }],
    name: "toggleRandomness",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "getMultipliers",
    outputs: [{ name: "", type: "uint256[]" }],
    stateMutability: "view",
    type: "function"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "player", type: "address" },
      { indexed: false, name: "won", type: "bool" },
      { indexed: false, name: "payout", type: "uint256" },
      { indexed: false, name: "multiplier", type: "uint256" },
      { indexed: false, name: "landingPosition", type: "uint256" }
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
      { indexed: false, name: "rows", type: "uint256" },
      { indexed: false, name: "token", type: "address" }
    ],
    name: "GameCreated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: "seed", type: "string" }],
    name: "RandomnessRequested",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: "useVRF", type: "bool" }],
    name: "RandomnessToggled",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: "newMultipliers", type: "uint256[]" }],
    name: "MultipliersUpdated",
    type: "event"
  },
  {
    stateMutability: "payable",
    type: "receive"
  }
] as const;
