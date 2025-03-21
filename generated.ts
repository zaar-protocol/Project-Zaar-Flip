import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// erc20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc20Abi = [
  {
    type: 'event',
    inputs: [
      { name: 'owner', type: 'address', indexed: true },
      { name: 'spender', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    inputs: [
      { name: 'from', type: 'address', indexed: true },
      { name: 'to', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'sender', type: 'address' },
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// initiaToken
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const initiaTokenAbi = [
  {
    type: 'event',
    inputs: [
      { name: 'owner', type: 'address', indexed: true },
      { name: 'spender', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    inputs: [
      { name: 'from', type: 'address', indexed: true },
      { name: 'to', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'sender', type: 'address' },
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
] as const

export const initiaTokenAddress =
  '0xBdb128Cf29d40738875297E90aa42772D354c137' as const

export const initiaTokenConfig = {
  address: initiaTokenAddress,
  abi: initiaTokenAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// plinko
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const plinkoAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_feePercentage', type: 'uint256' },
      { name: '_vrfProvider', type: 'address' },
      { name: '_stakingContract', type: 'address' },
      { name: '_useVRF', type: 'bool' },
      { name: '_liquidityEdge', type: 'uint256' },
      { name: '_manager', type: 'address' },
      { name: '_managerWinFeePercentage', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'feePercentage',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'liquidityEdge',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'managerWinFeePercentage',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'manager',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'useVRF',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'vrfProvider',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'stakingContract',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_ROWS',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', type: 'uint256' }],
    name: 'multipliers',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', type: 'address' }],
    name: 'acceptedTokens',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', type: 'address' }],
    name: 'vrfConsumers',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', type: 'string' }],
    name: 'pendingGames',
    outputs: [
      { name: 'player', type: 'address' },
      { name: 'betAmount', type: 'uint256' },
      { name: 'rows', type: 'uint256' },
      { name: 'token', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', type: 'string' }],
    name: 'isGamePending',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'betAmount', type: 'uint256' },
      { name: 'rows', type: 'uint256' },
    ],
    name: 'calculatePayout',
    outputs: [
      { name: 'grossPayout', type: 'uint256' },
      { name: 'netPayout', type: 'uint256' },
      { name: 'fee', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'betAmount', type: 'uint256' },
      { name: 'rows', type: 'uint256' },
      { name: 'token', type: 'address' },
    ],
    name: 'play',
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'seed', type: 'string' }],
    name: 'completeGame',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_multipliers', type: 'uint256[]' }],
    name: 'setMultipliers',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'token', type: 'address' }],
    name: 'addAcceptedToken',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'token', type: 'address' }],
    name: 'removeAcceptedToken',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_feePercentage', type: 'uint256' }],
    name: 'setFeePercentage',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_liquidityEdge', type: 'uint256' }],
    name: 'setLiquidityEdge',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_manager', type: 'address' }],
    name: 'setManager',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_managerWinFeePercentage', type: 'uint256' }],
    name: 'setManagerWinFeePercentage',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_useVRF', type: 'bool' }],
    name: 'toggleRandomness',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getMultipliers',
    outputs: [{ name: '', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'player', type: 'address', indexed: true },
      { name: 'won', type: 'bool', indexed: false },
      { name: 'payout', type: 'uint256', indexed: false },
      { name: 'multiplier', type: 'uint256', indexed: false },
      { name: 'landingPosition', type: 'uint256', indexed: false },
    ],
    name: 'GameResult',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'gameId', type: 'string', indexed: true },
      { name: 'player', type: 'address', indexed: true },
      { name: 'betAmount', type: 'uint256', indexed: false },
      { name: 'rows', type: 'uint256', indexed: false },
      { name: 'token', type: 'address', indexed: false },
    ],
    name: 'GameCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'seed', type: 'string', indexed: false }],
    name: 'RandomnessRequested',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'useVRF', type: 'bool', indexed: false }],
    name: 'RandomnessToggled',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'newMultipliers', type: 'uint256[]', indexed: false }],
    name: 'MultipliersUpdated',
  },
  { type: 'receive', stateMutability: 'payable' },
] as const

export const plinkoAddress =
  '0x6283dA52Bce2D01C885d6977A5746fF7eA2e555D' as const

export const plinkoConfig = { address: plinkoAddress, abi: plinkoAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// zaarflip
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const zaarflipAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_maxCoins', internalType: 'uint256', type: 'uint256' },
      { name: '_feePercentage', internalType: 'uint256', type: 'uint256' },
      { name: '_stakingContract', internalType: 'address', type: 'address' },
      { name: '_useVRF', internalType: 'bool', type: 'bool' },
      { name: '_liquidityEdge', internalType: 'uint256', type: 'uint256' },
      { name: '_manager', internalType: 'address', type: 'address' },
      {
        name: '_managerWinFeePercentage',
        internalType: 'uint256',
        type: 'uint256',
      },
      { name: '_randomnessProvider', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_FEE_PERCENTAGE',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_LIQUIDITY_EDGE',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_MANAGER_WIN_FEE_PERCENTAGE',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'RETRY_DELAY',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'betAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'numberOfCoins', internalType: 'uint256', type: 'uint256' },
      { name: 'headsRequired', internalType: 'uint256', type: 'uint256' },
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'flip',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'gameId', internalType: 'string', type: 'string' },
      { name: 'randomNumber', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'completeGame',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'betAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'numberOfCoins', internalType: 'uint256', type: 'uint256' },
      { name: 'headsRequired', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'calculatePayout',
    outputs: [
      { name: 'grossPayout', internalType: 'uint256', type: 'uint256' },
      { name: 'netPayout', internalType: 'uint256', type: 'uint256' },
      { name: 'fee', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'gameId', internalType: 'string', type: 'string' }],
    name: 'cancelGame',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'acceptedTokens',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'addAcceptedToken',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'removeAcceptedToken',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'receiver', internalType: 'address', type: 'address' },
    ],
    name: 'claimPendingWithdrawal',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'string', type: 'string' }],
    name: 'isGamePending',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'string', type: 'string' }],
    name: 'pendingGames',
    outputs: [
      { name: 'player', internalType: 'address', type: 'address' },
      { name: 'betAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'numberOfCoins', internalType: 'uint256', type: 'uint256' },
      { name: 'headsRequired', internalType: 'uint256', type: 'uint256' },
      { name: 'netPayout', internalType: 'uint256', type: 'uint256' },
      { name: 'fee', internalType: 'uint256', type: 'uint256' },
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'gameStartTime', internalType: 'uint256', type: 'uint256' },
      {
        name: 'gameStakingContract',
        internalType: 'contract Staking',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'pendingWithdrawals',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'feePercentage',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'gameTimeout',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'liquidityEdge',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'manager',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'managerWinFeePercentage',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'maxCoins',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'randomnessProvider',
    outputs: [
      {
        name: '',
        internalType: 'contract IRandomnessProvider',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'stakingContract',
    outputs: [{ name: '', internalType: 'contract Staking', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'useVRF',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_feePercentage', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setFeePercentage',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_gameTimeout', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setGameTimeout',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_liquidityEdge', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setLiquidityEdge',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_manager', internalType: 'address', type: 'address' }],
    name: 'setManager',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_managerWinFeePercentage',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    name: 'setManagerWinFeePercentage',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_maxCoins', internalType: 'uint256', type: 'uint256' }],
    name: 'setMaxCoins',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_randomnessProvider', internalType: 'address', type: 'address' },
    ],
    name: 'setRandomnessProvider',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_stakingContract', internalType: 'address', type: 'address' },
    ],
    name: 'setStakingContract',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_useVRF', internalType: 'bool', type: 'bool' }],
    name: 'toggleRandomness',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: 'result', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'pendingOwner', internalType: 'address', type: 'address' },
    ],
    name: 'ownershipHandoverExpiresAt',
    outputs: [{ name: 'result', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'cancelOwnershipHandover',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'pendingOwner', internalType: 'address', type: 'address' },
    ],
    name: 'completeOwnershipHandover',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'requestOwnershipHandover',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newFeePercentage',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'FeePercentageUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'player',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'betAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'GameCancelled',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'gameId', internalType: 'string', type: 'string', indexed: true },
      {
        name: 'player',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'betAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'numberOfCoins',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'headsRequired',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'token',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'GameCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'player',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'won', internalType: 'bool', type: 'bool', indexed: false },
      {
        name: 'payout',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'GameResult',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newTimeout',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'GameTimeoutUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newLiquidityEdge',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'LiquidityEdgeUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newManager',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'ManagerUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newPercentage',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'ManagerWinFeePercentageUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newMaxCoins',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'MaxCoinsUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'pendingOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipHandoverCanceled',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'pendingOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipHandoverRequested',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'oldOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newProvider',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'RandomnessProviderUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'seed', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'RandomnessRequested',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'useVRF', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'RandomnessToggled',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newStakingContract',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'StakingContractUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'token',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'TokenAdded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'token',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'TokenRemoved',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'token',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TransferFailed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'token',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TransferSucceeded',
  },
  { type: 'error', inputs: [], name: 'AlreadyInitialized' },
  { type: 'error', inputs: [], name: 'NewOwnerIsZeroAddress' },
  { type: 'error', inputs: [], name: 'NoHandoverRequest' },
  { type: 'error', inputs: [], name: 'Reentrancy' },
  { type: 'error', inputs: [], name: 'Unauthorized' },
] as const

export const zaarflipAddress =
  '0xA5E835BAAb3A78505dEA4369B3D862bFF90F1322' as const

export const zaarflipConfig = {
  address: zaarflipAddress,
  abi: zaarflipAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useReadErc20 = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"allowance"`
 */
export const useReadErc20Allowance = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadErc20BalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"decimals"`
 */
export const useReadErc20Decimals = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"name"`
 */
export const useReadErc20Name = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"symbol"`
 */
export const useReadErc20Symbol = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadErc20TotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useWriteErc20 = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 */
export const useWriteErc20Approve = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useWriteErc20Transfer = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteErc20TransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useSimulateErc20 = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 */
export const useSimulateErc20Approve = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateErc20Transfer = /*#__PURE__*/ createUseSimulateContract(
  { abi: erc20Abi, functionName: 'transfer' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateErc20TransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc20Abi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__
 */
export const useWatchErc20Event = /*#__PURE__*/ createUseWatchContractEvent({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Approval"`
 */
export const useWatchErc20ApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20Abi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchErc20TransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20Abi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link initiaTokenAbi}__
 */
export const useReadInitiaToken = /*#__PURE__*/ createUseReadContract({
  abi: initiaTokenAbi,
  address: initiaTokenAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link initiaTokenAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadInitiaTokenAllowance = /*#__PURE__*/ createUseReadContract({
  abi: initiaTokenAbi,
  address: initiaTokenAddress,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link initiaTokenAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadInitiaTokenBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: initiaTokenAbi,
  address: initiaTokenAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link initiaTokenAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadInitiaTokenDecimals = /*#__PURE__*/ createUseReadContract({
  abi: initiaTokenAbi,
  address: initiaTokenAddress,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link initiaTokenAbi}__ and `functionName` set to `"name"`
 */
export const useReadInitiaTokenName = /*#__PURE__*/ createUseReadContract({
  abi: initiaTokenAbi,
  address: initiaTokenAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link initiaTokenAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadInitiaTokenSymbol = /*#__PURE__*/ createUseReadContract({
  abi: initiaTokenAbi,
  address: initiaTokenAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link initiaTokenAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadInitiaTokenTotalSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: initiaTokenAbi,
    address: initiaTokenAddress,
    functionName: 'totalSupply',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link initiaTokenAbi}__
 */
export const useWriteInitiaToken = /*#__PURE__*/ createUseWriteContract({
  abi: initiaTokenAbi,
  address: initiaTokenAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link initiaTokenAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteInitiaTokenApprove = /*#__PURE__*/ createUseWriteContract({
  abi: initiaTokenAbi,
  address: initiaTokenAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link initiaTokenAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteInitiaTokenTransfer = /*#__PURE__*/ createUseWriteContract(
  {
    abi: initiaTokenAbi,
    address: initiaTokenAddress,
    functionName: 'transfer',
  },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link initiaTokenAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteInitiaTokenTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: initiaTokenAbi,
    address: initiaTokenAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link initiaTokenAbi}__
 */
export const useSimulateInitiaToken = /*#__PURE__*/ createUseSimulateContract({
  abi: initiaTokenAbi,
  address: initiaTokenAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link initiaTokenAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateInitiaTokenApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: initiaTokenAbi,
    address: initiaTokenAddress,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link initiaTokenAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateInitiaTokenTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: initiaTokenAbi,
    address: initiaTokenAddress,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link initiaTokenAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateInitiaTokenTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: initiaTokenAbi,
    address: initiaTokenAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link initiaTokenAbi}__
 */
export const useWatchInitiaTokenEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: initiaTokenAbi,
    address: initiaTokenAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link initiaTokenAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchInitiaTokenApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: initiaTokenAbi,
    address: initiaTokenAddress,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link initiaTokenAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchInitiaTokenTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: initiaTokenAbi,
    address: initiaTokenAddress,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link plinkoAbi}__
 */
export const useReadPlinko = /*#__PURE__*/ createUseReadContract({
  abi: plinkoAbi,
  address: plinkoAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link plinkoAbi}__ and `functionName` set to `"feePercentage"`
 */
export const useReadPlinkoFeePercentage = /*#__PURE__*/ createUseReadContract({
  abi: plinkoAbi,
  address: plinkoAddress,
  functionName: 'feePercentage',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link plinkoAbi}__ and `functionName` set to `"liquidityEdge"`
 */
export const useReadPlinkoLiquidityEdge = /*#__PURE__*/ createUseReadContract({
  abi: plinkoAbi,
  address: plinkoAddress,
  functionName: 'liquidityEdge',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link plinkoAbi}__ and `functionName` set to `"managerWinFeePercentage"`
 */
export const useReadPlinkoManagerWinFeePercentage =
  /*#__PURE__*/ createUseReadContract({
    abi: plinkoAbi,
    address: plinkoAddress,
    functionName: 'managerWinFeePercentage',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link plinkoAbi}__ and `functionName` set to `"manager"`
 */
export const useReadPlinkoManager = /*#__PURE__*/ createUseReadContract({
  abi: plinkoAbi,
  address: plinkoAddress,
  functionName: 'manager',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link plinkoAbi}__ and `functionName` set to `"useVRF"`
 */
export const useReadPlinkoUseVrf = /*#__PURE__*/ createUseReadContract({
  abi: plinkoAbi,
  address: plinkoAddress,
  functionName: 'useVRF',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link plinkoAbi}__ and `functionName` set to `"vrfProvider"`
 */
export const useReadPlinkoVrfProvider = /*#__PURE__*/ createUseReadContract({
  abi: plinkoAbi,
  address: plinkoAddress,
  functionName: 'vrfProvider',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link plinkoAbi}__ and `functionName` set to `"stakingContract"`
 */
export const useReadPlinkoStakingContract = /*#__PURE__*/ createUseReadContract(
  { abi: plinkoAbi, address: plinkoAddress, functionName: 'stakingContract' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link plinkoAbi}__ and `functionName` set to `"MAX_ROWS"`
 */
export const useReadPlinkoMaxRows = /*#__PURE__*/ createUseReadContract({
  abi: plinkoAbi,
  address: plinkoAddress,
  functionName: 'MAX_ROWS',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link plinkoAbi}__ and `functionName` set to `"multipliers"`
 */
export const useReadPlinkoMultipliers = /*#__PURE__*/ createUseReadContract({
  abi: plinkoAbi,
  address: plinkoAddress,
  functionName: 'multipliers',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link plinkoAbi}__ and `functionName` set to `"acceptedTokens"`
 */
export const useReadPlinkoAcceptedTokens = /*#__PURE__*/ createUseReadContract({
  abi: plinkoAbi,
  address: plinkoAddress,
  functionName: 'acceptedTokens',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link plinkoAbi}__ and `functionName` set to `"vrfConsumers"`
 */
export const useReadPlinkoVrfConsumers = /*#__PURE__*/ createUseReadContract({
  abi: plinkoAbi,
  address: plinkoAddress,
  functionName: 'vrfConsumers',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link plinkoAbi}__ and `functionName` set to `"pendingGames"`
 */
export const useReadPlinkoPendingGames = /*#__PURE__*/ createUseReadContract({
  abi: plinkoAbi,
  address: plinkoAddress,
  functionName: 'pendingGames',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link plinkoAbi}__ and `functionName` set to `"isGamePending"`
 */
export const useReadPlinkoIsGamePending = /*#__PURE__*/ createUseReadContract({
  abi: plinkoAbi,
  address: plinkoAddress,
  functionName: 'isGamePending',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link plinkoAbi}__ and `functionName` set to `"calculatePayout"`
 */
export const useReadPlinkoCalculatePayout = /*#__PURE__*/ createUseReadContract(
  { abi: plinkoAbi, address: plinkoAddress, functionName: 'calculatePayout' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link plinkoAbi}__ and `functionName` set to `"getMultipliers"`
 */
export const useReadPlinkoGetMultipliers = /*#__PURE__*/ createUseReadContract({
  abi: plinkoAbi,
  address: plinkoAddress,
  functionName: 'getMultipliers',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link plinkoAbi}__
 */
export const useWritePlinko = /*#__PURE__*/ createUseWriteContract({
  abi: plinkoAbi,
  address: plinkoAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link plinkoAbi}__ and `functionName` set to `"play"`
 */
export const useWritePlinkoPlay = /*#__PURE__*/ createUseWriteContract({
  abi: plinkoAbi,
  address: plinkoAddress,
  functionName: 'play',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link plinkoAbi}__ and `functionName` set to `"completeGame"`
 */
export const useWritePlinkoCompleteGame = /*#__PURE__*/ createUseWriteContract({
  abi: plinkoAbi,
  address: plinkoAddress,
  functionName: 'completeGame',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link plinkoAbi}__ and `functionName` set to `"setMultipliers"`
 */
export const useWritePlinkoSetMultipliers =
  /*#__PURE__*/ createUseWriteContract({
    abi: plinkoAbi,
    address: plinkoAddress,
    functionName: 'setMultipliers',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link plinkoAbi}__ and `functionName` set to `"addAcceptedToken"`
 */
export const useWritePlinkoAddAcceptedToken =
  /*#__PURE__*/ createUseWriteContract({
    abi: plinkoAbi,
    address: plinkoAddress,
    functionName: 'addAcceptedToken',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link plinkoAbi}__ and `functionName` set to `"removeAcceptedToken"`
 */
export const useWritePlinkoRemoveAcceptedToken =
  /*#__PURE__*/ createUseWriteContract({
    abi: plinkoAbi,
    address: plinkoAddress,
    functionName: 'removeAcceptedToken',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link plinkoAbi}__ and `functionName` set to `"setFeePercentage"`
 */
export const useWritePlinkoSetFeePercentage =
  /*#__PURE__*/ createUseWriteContract({
    abi: plinkoAbi,
    address: plinkoAddress,
    functionName: 'setFeePercentage',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link plinkoAbi}__ and `functionName` set to `"setLiquidityEdge"`
 */
export const useWritePlinkoSetLiquidityEdge =
  /*#__PURE__*/ createUseWriteContract({
    abi: plinkoAbi,
    address: plinkoAddress,
    functionName: 'setLiquidityEdge',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link plinkoAbi}__ and `functionName` set to `"setManager"`
 */
export const useWritePlinkoSetManager = /*#__PURE__*/ createUseWriteContract({
  abi: plinkoAbi,
  address: plinkoAddress,
  functionName: 'setManager',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link plinkoAbi}__ and `functionName` set to `"setManagerWinFeePercentage"`
 */
export const useWritePlinkoSetManagerWinFeePercentage =
  /*#__PURE__*/ createUseWriteContract({
    abi: plinkoAbi,
    address: plinkoAddress,
    functionName: 'setManagerWinFeePercentage',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link plinkoAbi}__ and `functionName` set to `"toggleRandomness"`
 */
export const useWritePlinkoToggleRandomness =
  /*#__PURE__*/ createUseWriteContract({
    abi: plinkoAbi,
    address: plinkoAddress,
    functionName: 'toggleRandomness',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link plinkoAbi}__
 */
export const useSimulatePlinko = /*#__PURE__*/ createUseSimulateContract({
  abi: plinkoAbi,
  address: plinkoAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link plinkoAbi}__ and `functionName` set to `"play"`
 */
export const useSimulatePlinkoPlay = /*#__PURE__*/ createUseSimulateContract({
  abi: plinkoAbi,
  address: plinkoAddress,
  functionName: 'play',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link plinkoAbi}__ and `functionName` set to `"completeGame"`
 */
export const useSimulatePlinkoCompleteGame =
  /*#__PURE__*/ createUseSimulateContract({
    abi: plinkoAbi,
    address: plinkoAddress,
    functionName: 'completeGame',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link plinkoAbi}__ and `functionName` set to `"setMultipliers"`
 */
export const useSimulatePlinkoSetMultipliers =
  /*#__PURE__*/ createUseSimulateContract({
    abi: plinkoAbi,
    address: plinkoAddress,
    functionName: 'setMultipliers',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link plinkoAbi}__ and `functionName` set to `"addAcceptedToken"`
 */
export const useSimulatePlinkoAddAcceptedToken =
  /*#__PURE__*/ createUseSimulateContract({
    abi: plinkoAbi,
    address: plinkoAddress,
    functionName: 'addAcceptedToken',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link plinkoAbi}__ and `functionName` set to `"removeAcceptedToken"`
 */
export const useSimulatePlinkoRemoveAcceptedToken =
  /*#__PURE__*/ createUseSimulateContract({
    abi: plinkoAbi,
    address: plinkoAddress,
    functionName: 'removeAcceptedToken',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link plinkoAbi}__ and `functionName` set to `"setFeePercentage"`
 */
export const useSimulatePlinkoSetFeePercentage =
  /*#__PURE__*/ createUseSimulateContract({
    abi: plinkoAbi,
    address: plinkoAddress,
    functionName: 'setFeePercentage',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link plinkoAbi}__ and `functionName` set to `"setLiquidityEdge"`
 */
export const useSimulatePlinkoSetLiquidityEdge =
  /*#__PURE__*/ createUseSimulateContract({
    abi: plinkoAbi,
    address: plinkoAddress,
    functionName: 'setLiquidityEdge',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link plinkoAbi}__ and `functionName` set to `"setManager"`
 */
export const useSimulatePlinkoSetManager =
  /*#__PURE__*/ createUseSimulateContract({
    abi: plinkoAbi,
    address: plinkoAddress,
    functionName: 'setManager',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link plinkoAbi}__ and `functionName` set to `"setManagerWinFeePercentage"`
 */
export const useSimulatePlinkoSetManagerWinFeePercentage =
  /*#__PURE__*/ createUseSimulateContract({
    abi: plinkoAbi,
    address: plinkoAddress,
    functionName: 'setManagerWinFeePercentage',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link plinkoAbi}__ and `functionName` set to `"toggleRandomness"`
 */
export const useSimulatePlinkoToggleRandomness =
  /*#__PURE__*/ createUseSimulateContract({
    abi: plinkoAbi,
    address: plinkoAddress,
    functionName: 'toggleRandomness',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link plinkoAbi}__
 */
export const useWatchPlinkoEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: plinkoAbi,
  address: plinkoAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link plinkoAbi}__ and `eventName` set to `"GameResult"`
 */
export const useWatchPlinkoGameResultEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: plinkoAbi,
    address: plinkoAddress,
    eventName: 'GameResult',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link plinkoAbi}__ and `eventName` set to `"GameCreated"`
 */
export const useWatchPlinkoGameCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: plinkoAbi,
    address: plinkoAddress,
    eventName: 'GameCreated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link plinkoAbi}__ and `eventName` set to `"RandomnessRequested"`
 */
export const useWatchPlinkoRandomnessRequestedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: plinkoAbi,
    address: plinkoAddress,
    eventName: 'RandomnessRequested',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link plinkoAbi}__ and `eventName` set to `"RandomnessToggled"`
 */
export const useWatchPlinkoRandomnessToggledEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: plinkoAbi,
    address: plinkoAddress,
    eventName: 'RandomnessToggled',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link plinkoAbi}__ and `eventName` set to `"MultipliersUpdated"`
 */
export const useWatchPlinkoMultipliersUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: plinkoAbi,
    address: plinkoAddress,
    eventName: 'MultipliersUpdated',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zaarflipAbi}__
 */
export const useReadZaarflip = /*#__PURE__*/ createUseReadContract({
  abi: zaarflipAbi,
  address: zaarflipAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"MAX_FEE_PERCENTAGE"`
 */
export const useReadZaarflipMaxFeePercentage =
  /*#__PURE__*/ createUseReadContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'MAX_FEE_PERCENTAGE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"MAX_LIQUIDITY_EDGE"`
 */
export const useReadZaarflipMaxLiquidityEdge =
  /*#__PURE__*/ createUseReadContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'MAX_LIQUIDITY_EDGE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"MAX_MANAGER_WIN_FEE_PERCENTAGE"`
 */
export const useReadZaarflipMaxManagerWinFeePercentage =
  /*#__PURE__*/ createUseReadContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'MAX_MANAGER_WIN_FEE_PERCENTAGE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"RETRY_DELAY"`
 */
export const useReadZaarflipRetryDelay = /*#__PURE__*/ createUseReadContract({
  abi: zaarflipAbi,
  address: zaarflipAddress,
  functionName: 'RETRY_DELAY',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"calculatePayout"`
 */
export const useReadZaarflipCalculatePayout =
  /*#__PURE__*/ createUseReadContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'calculatePayout',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"acceptedTokens"`
 */
export const useReadZaarflipAcceptedTokens =
  /*#__PURE__*/ createUseReadContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'acceptedTokens',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"isGamePending"`
 */
export const useReadZaarflipIsGamePending = /*#__PURE__*/ createUseReadContract(
  { abi: zaarflipAbi, address: zaarflipAddress, functionName: 'isGamePending' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"pendingGames"`
 */
export const useReadZaarflipPendingGames = /*#__PURE__*/ createUseReadContract({
  abi: zaarflipAbi,
  address: zaarflipAddress,
  functionName: 'pendingGames',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"pendingWithdrawals"`
 */
export const useReadZaarflipPendingWithdrawals =
  /*#__PURE__*/ createUseReadContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'pendingWithdrawals',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"feePercentage"`
 */
export const useReadZaarflipFeePercentage = /*#__PURE__*/ createUseReadContract(
  { abi: zaarflipAbi, address: zaarflipAddress, functionName: 'feePercentage' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"gameTimeout"`
 */
export const useReadZaarflipGameTimeout = /*#__PURE__*/ createUseReadContract({
  abi: zaarflipAbi,
  address: zaarflipAddress,
  functionName: 'gameTimeout',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"liquidityEdge"`
 */
export const useReadZaarflipLiquidityEdge = /*#__PURE__*/ createUseReadContract(
  { abi: zaarflipAbi, address: zaarflipAddress, functionName: 'liquidityEdge' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"manager"`
 */
export const useReadZaarflipManager = /*#__PURE__*/ createUseReadContract({
  abi: zaarflipAbi,
  address: zaarflipAddress,
  functionName: 'manager',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"managerWinFeePercentage"`
 */
export const useReadZaarflipManagerWinFeePercentage =
  /*#__PURE__*/ createUseReadContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'managerWinFeePercentage',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"maxCoins"`
 */
export const useReadZaarflipMaxCoins = /*#__PURE__*/ createUseReadContract({
  abi: zaarflipAbi,
  address: zaarflipAddress,
  functionName: 'maxCoins',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"randomnessProvider"`
 */
export const useReadZaarflipRandomnessProvider =
  /*#__PURE__*/ createUseReadContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'randomnessProvider',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"stakingContract"`
 */
export const useReadZaarflipStakingContract =
  /*#__PURE__*/ createUseReadContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'stakingContract',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"useVRF"`
 */
export const useReadZaarflipUseVrf = /*#__PURE__*/ createUseReadContract({
  abi: zaarflipAbi,
  address: zaarflipAddress,
  functionName: 'useVRF',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"owner"`
 */
export const useReadZaarflipOwner = /*#__PURE__*/ createUseReadContract({
  abi: zaarflipAbi,
  address: zaarflipAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"ownershipHandoverExpiresAt"`
 */
export const useReadZaarflipOwnershipHandoverExpiresAt =
  /*#__PURE__*/ createUseReadContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'ownershipHandoverExpiresAt',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zaarflipAbi}__
 */
export const useWriteZaarflip = /*#__PURE__*/ createUseWriteContract({
  abi: zaarflipAbi,
  address: zaarflipAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"flip"`
 */
export const useWriteZaarflipFlip = /*#__PURE__*/ createUseWriteContract({
  abi: zaarflipAbi,
  address: zaarflipAddress,
  functionName: 'flip',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"completeGame"`
 */
export const useWriteZaarflipCompleteGame =
  /*#__PURE__*/ createUseWriteContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'completeGame',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"cancelGame"`
 */
export const useWriteZaarflipCancelGame = /*#__PURE__*/ createUseWriteContract({
  abi: zaarflipAbi,
  address: zaarflipAddress,
  functionName: 'cancelGame',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"addAcceptedToken"`
 */
export const useWriteZaarflipAddAcceptedToken =
  /*#__PURE__*/ createUseWriteContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'addAcceptedToken',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"removeAcceptedToken"`
 */
export const useWriteZaarflipRemoveAcceptedToken =
  /*#__PURE__*/ createUseWriteContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'removeAcceptedToken',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"claimPendingWithdrawal"`
 */
export const useWriteZaarflipClaimPendingWithdrawal =
  /*#__PURE__*/ createUseWriteContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'claimPendingWithdrawal',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"setFeePercentage"`
 */
export const useWriteZaarflipSetFeePercentage =
  /*#__PURE__*/ createUseWriteContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'setFeePercentage',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"setGameTimeout"`
 */
export const useWriteZaarflipSetGameTimeout =
  /*#__PURE__*/ createUseWriteContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'setGameTimeout',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"setLiquidityEdge"`
 */
export const useWriteZaarflipSetLiquidityEdge =
  /*#__PURE__*/ createUseWriteContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'setLiquidityEdge',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"setManager"`
 */
export const useWriteZaarflipSetManager = /*#__PURE__*/ createUseWriteContract({
  abi: zaarflipAbi,
  address: zaarflipAddress,
  functionName: 'setManager',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"setManagerWinFeePercentage"`
 */
export const useWriteZaarflipSetManagerWinFeePercentage =
  /*#__PURE__*/ createUseWriteContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'setManagerWinFeePercentage',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"setMaxCoins"`
 */
export const useWriteZaarflipSetMaxCoins = /*#__PURE__*/ createUseWriteContract(
  { abi: zaarflipAbi, address: zaarflipAddress, functionName: 'setMaxCoins' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"setRandomnessProvider"`
 */
export const useWriteZaarflipSetRandomnessProvider =
  /*#__PURE__*/ createUseWriteContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'setRandomnessProvider',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"setStakingContract"`
 */
export const useWriteZaarflipSetStakingContract =
  /*#__PURE__*/ createUseWriteContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'setStakingContract',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"toggleRandomness"`
 */
export const useWriteZaarflipToggleRandomness =
  /*#__PURE__*/ createUseWriteContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'toggleRandomness',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"cancelOwnershipHandover"`
 */
export const useWriteZaarflipCancelOwnershipHandover =
  /*#__PURE__*/ createUseWriteContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'cancelOwnershipHandover',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"completeOwnershipHandover"`
 */
export const useWriteZaarflipCompleteOwnershipHandover =
  /*#__PURE__*/ createUseWriteContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'completeOwnershipHandover',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteZaarflipRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"requestOwnershipHandover"`
 */
export const useWriteZaarflipRequestOwnershipHandover =
  /*#__PURE__*/ createUseWriteContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'requestOwnershipHandover',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteZaarflipTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zaarflipAbi}__
 */
export const useSimulateZaarflip = /*#__PURE__*/ createUseSimulateContract({
  abi: zaarflipAbi,
  address: zaarflipAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"flip"`
 */
export const useSimulateZaarflipFlip = /*#__PURE__*/ createUseSimulateContract({
  abi: zaarflipAbi,
  address: zaarflipAddress,
  functionName: 'flip',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"completeGame"`
 */
export const useSimulateZaarflipCompleteGame =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'completeGame',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"cancelGame"`
 */
export const useSimulateZaarflipCancelGame =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'cancelGame',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"addAcceptedToken"`
 */
export const useSimulateZaarflipAddAcceptedToken =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'addAcceptedToken',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"removeAcceptedToken"`
 */
export const useSimulateZaarflipRemoveAcceptedToken =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'removeAcceptedToken',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"claimPendingWithdrawal"`
 */
export const useSimulateZaarflipClaimPendingWithdrawal =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'claimPendingWithdrawal',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"setFeePercentage"`
 */
export const useSimulateZaarflipSetFeePercentage =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'setFeePercentage',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"setGameTimeout"`
 */
export const useSimulateZaarflipSetGameTimeout =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'setGameTimeout',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"setLiquidityEdge"`
 */
export const useSimulateZaarflipSetLiquidityEdge =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'setLiquidityEdge',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"setManager"`
 */
export const useSimulateZaarflipSetManager =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'setManager',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"setManagerWinFeePercentage"`
 */
export const useSimulateZaarflipSetManagerWinFeePercentage =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'setManagerWinFeePercentage',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"setMaxCoins"`
 */
export const useSimulateZaarflipSetMaxCoins =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'setMaxCoins',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"setRandomnessProvider"`
 */
export const useSimulateZaarflipSetRandomnessProvider =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'setRandomnessProvider',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"setStakingContract"`
 */
export const useSimulateZaarflipSetStakingContract =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'setStakingContract',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"toggleRandomness"`
 */
export const useSimulateZaarflipToggleRandomness =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'toggleRandomness',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"cancelOwnershipHandover"`
 */
export const useSimulateZaarflipCancelOwnershipHandover =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'cancelOwnershipHandover',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"completeOwnershipHandover"`
 */
export const useSimulateZaarflipCompleteOwnershipHandover =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'completeOwnershipHandover',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateZaarflipRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"requestOwnershipHandover"`
 */
export const useSimulateZaarflipRequestOwnershipHandover =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'requestOwnershipHandover',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateZaarflipTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zaarflipAbi}__
 */
export const useWatchZaarflipEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: zaarflipAbi,
  address: zaarflipAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zaarflipAbi}__ and `eventName` set to `"FeePercentageUpdated"`
 */
export const useWatchZaarflipFeePercentageUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    eventName: 'FeePercentageUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zaarflipAbi}__ and `eventName` set to `"GameCancelled"`
 */
export const useWatchZaarflipGameCancelledEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    eventName: 'GameCancelled',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zaarflipAbi}__ and `eventName` set to `"GameCreated"`
 */
export const useWatchZaarflipGameCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    eventName: 'GameCreated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zaarflipAbi}__ and `eventName` set to `"GameResult"`
 */
export const useWatchZaarflipGameResultEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    eventName: 'GameResult',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zaarflipAbi}__ and `eventName` set to `"GameTimeoutUpdated"`
 */
export const useWatchZaarflipGameTimeoutUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    eventName: 'GameTimeoutUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zaarflipAbi}__ and `eventName` set to `"LiquidityEdgeUpdated"`
 */
export const useWatchZaarflipLiquidityEdgeUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    eventName: 'LiquidityEdgeUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zaarflipAbi}__ and `eventName` set to `"ManagerUpdated"`
 */
export const useWatchZaarflipManagerUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    eventName: 'ManagerUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zaarflipAbi}__ and `eventName` set to `"ManagerWinFeePercentageUpdated"`
 */
export const useWatchZaarflipManagerWinFeePercentageUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    eventName: 'ManagerWinFeePercentageUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zaarflipAbi}__ and `eventName` set to `"MaxCoinsUpdated"`
 */
export const useWatchZaarflipMaxCoinsUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    eventName: 'MaxCoinsUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zaarflipAbi}__ and `eventName` set to `"OwnershipHandoverCanceled"`
 */
export const useWatchZaarflipOwnershipHandoverCanceledEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    eventName: 'OwnershipHandoverCanceled',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zaarflipAbi}__ and `eventName` set to `"OwnershipHandoverRequested"`
 */
export const useWatchZaarflipOwnershipHandoverRequestedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    eventName: 'OwnershipHandoverRequested',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zaarflipAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchZaarflipOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zaarflipAbi}__ and `eventName` set to `"RandomnessProviderUpdated"`
 */
export const useWatchZaarflipRandomnessProviderUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    eventName: 'RandomnessProviderUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zaarflipAbi}__ and `eventName` set to `"RandomnessRequested"`
 */
export const useWatchZaarflipRandomnessRequestedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    eventName: 'RandomnessRequested',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zaarflipAbi}__ and `eventName` set to `"RandomnessToggled"`
 */
export const useWatchZaarflipRandomnessToggledEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    eventName: 'RandomnessToggled',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zaarflipAbi}__ and `eventName` set to `"StakingContractUpdated"`
 */
export const useWatchZaarflipStakingContractUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    eventName: 'StakingContractUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zaarflipAbi}__ and `eventName` set to `"TokenAdded"`
 */
export const useWatchZaarflipTokenAddedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    eventName: 'TokenAdded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zaarflipAbi}__ and `eventName` set to `"TokenRemoved"`
 */
export const useWatchZaarflipTokenRemovedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    eventName: 'TokenRemoved',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zaarflipAbi}__ and `eventName` set to `"TransferFailed"`
 */
export const useWatchZaarflipTransferFailedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    eventName: 'TransferFailed',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zaarflipAbi}__ and `eventName` set to `"TransferSucceeded"`
 */
export const useWatchZaarflipTransferSucceededEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    eventName: 'TransferSucceeded',
  })
