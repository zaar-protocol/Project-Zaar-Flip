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
  '0x7Fb2A94A13186E3C338f0DA9728B4835D86b1a7B' as const

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
// staking
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const stakingAbi = [
  {
    type: 'constructor',
    inputs: [{ name: '_manager', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_LIQUIDITY_PERCENTAGE',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
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
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'supportedTokens',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'game', internalType: 'address', type: 'address' }],
    name: 'addAuthorizedGame',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'authorizedGames',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'game', internalType: 'address', type: 'address' }],
    name: 'removeAuthorizedGame',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'game', internalType: 'address', type: 'address' }],
    name: 'finalizeRemoveAuthorizedGame',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'removalInProgress',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'minSharesOut', internalType: 'uint256', type: 'uint256' },
      { name: 'finalizeDeadline', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'requestStake',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'user', internalType: 'address', type: 'address' },
    ],
    name: 'finalizeStake',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'cancelExpiredStakeRequest',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'stakeRequests',
    outputs: [
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'requestTime', internalType: 'uint256', type: 'uint256' },
      { name: 'minSharesOut', internalType: 'uint256', type: 'uint256' },
      { name: 'finalizeDeadline', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'shares', internalType: 'uint256', type: 'uint256' },
      { name: 'minAmountOut', internalType: 'uint256', type: 'uint256' },
      { name: 'finalizeDeadline', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'requestUnstake',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'minAmountOut', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'finalizeUnstake',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'cancelExpiredUnstakeRequest',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'unstakeRequests',
    outputs: [
      { name: 'shares', internalType: 'uint256', type: 'uint256' },
      { name: 'requestTime', internalType: 'uint256', type: 'uint256' },
      { name: 'minAmountOut', internalType: 'uint256', type: 'uint256' },
      { name: 'finalizeDeadline', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'lockLiquidity',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'unlockLiquidity',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'game', internalType: 'address', type: 'address' },
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'forceUnlockLiquidity',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'lockedLiquidity',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'gameLockedLiquidity',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'receiver', internalType: 'address', type: 'address' },
    ],
    name: 'claimPendingPayout',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferPayout',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'pendingPayouts',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'getAvailableBalance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'shareBalances',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'tokenAccounting',
    outputs: [
      { name: 'totalPendingPayouts', internalType: 'uint256', type: 'uint256' },
      { name: 'totalPendingStakes', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'tokenInfo',
    outputs: [
      { name: 'totalShares', internalType: 'uint256', type: 'uint256' },
      { name: 'lastUpdateTime', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'token', internalType: 'address', type: 'address' },
    ],
    name: 'totalOwed',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'depositDelay',
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
    name: 'unstakeDelay',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newCooldownPeriod', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setCooldownPeriod',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newDepositDelay', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setDepositDelay',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newManager', internalType: 'address', type: 'address' }],
    name: 'setManager',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'newMaxLiquidityPercentage',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    name: 'setMaxLiquidityPercentage',
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
        name: 'newCooldown',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'CooldownPeriodUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newDepositDelay',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'DepositDelayUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'game', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'token',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'ForcedLiquidityUnlocked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'game', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'GameAuthorized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'game', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'GameRemovalInitiated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'game', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'GameUnauthorized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'oldManager',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newManager',
        internalType: 'address',
        type: 'address',
        indexed: true,
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
    name: 'MaxLiquidityPercentageUpdated',
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
    name: 'PayoutTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'token',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'RewardClaimed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'token',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'StakeRefunded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'token',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'StakeRequested',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'token',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Staked',
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
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'token',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'shares',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'UnstakeRequested',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'token',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Unstaked',
  },
  { type: 'error', inputs: [], name: 'AlreadyInitialized' },
  { type: 'error', inputs: [], name: 'NewOwnerIsZeroAddress' },
  { type: 'error', inputs: [], name: 'NoHandoverRequest' },
  { type: 'error', inputs: [], name: 'Reentrancy' },
  { type: 'error', inputs: [], name: 'Unauthorized' },
] as const

export const stakingAddress =
  '0x5c1c830c3032311FAd3e5E5E764105b4Af2b0c87' as const

export const stakingConfig = {
  address: stakingAddress,
  abi: stakingAbi,
} as const

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
    inputs: [{ name: 'gameId', internalType: 'bytes32', type: 'bytes32' }],
    name: 'cancelGame',
    outputs: [],
    stateMutability: 'nonpayable',
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
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'receiver', internalType: 'address', type: 'address' },
    ],
    name: 'claimPendingWithdrawal',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'gameId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'randomNumber', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'completeGame',
    outputs: [],
    stateMutability: 'nonpayable',
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
    name: 'feePercentage',
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
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'payable',
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
    inputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    name: 'isGamePending',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
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
    inputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
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
    name: 'randomnessProvider',
    outputs: [
      {
        name: '',
        internalType: 'contract IManualRandomnessProvider',
        type: 'address',
      },
    ],
    stateMutability: 'view',
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
    inputs: [],
    name: 'stakingContract',
    outputs: [{ name: '', internalType: 'contract Staking', type: 'address' }],
    stateMutability: 'view',
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
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'useVRF',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
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
      {
        name: 'gameId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
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
        name: 'gameId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
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
      {
        name: 'gameId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
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
        name: 'gameId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
    ],
    name: 'TestBytes',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'gameId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
    ],
    name: 'TestBytesCompleteGame',
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
  '0x2d9b949CC6Db80A63270B351fA29C9b6cc26B083' as const

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
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__
 */
export const useReadStaking = /*#__PURE__*/ createUseReadContract({
  abi: stakingAbi,
  address: stakingAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"MAX_LIQUIDITY_PERCENTAGE"`
 */
export const useReadStakingMaxLiquidityPercentage =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'MAX_LIQUIDITY_PERCENTAGE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"acceptedTokens"`
 */
export const useReadStakingAcceptedTokens = /*#__PURE__*/ createUseReadContract(
  { abi: stakingAbi, address: stakingAddress, functionName: 'acceptedTokens' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"supportedTokens"`
 */
export const useReadStakingSupportedTokens =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'supportedTokens',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"authorizedGames"`
 */
export const useReadStakingAuthorizedGames =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'authorizedGames',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"removalInProgress"`
 */
export const useReadStakingRemovalInProgress =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'removalInProgress',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"stakeRequests"`
 */
export const useReadStakingStakeRequests = /*#__PURE__*/ createUseReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'stakeRequests',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"unstakeRequests"`
 */
export const useReadStakingUnstakeRequests =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'unstakeRequests',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"lockedLiquidity"`
 */
export const useReadStakingLockedLiquidity =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'lockedLiquidity',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"gameLockedLiquidity"`
 */
export const useReadStakingGameLockedLiquidity =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'gameLockedLiquidity',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"pendingPayouts"`
 */
export const useReadStakingPendingPayouts = /*#__PURE__*/ createUseReadContract(
  { abi: stakingAbi, address: stakingAddress, functionName: 'pendingPayouts' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"getAvailableBalance"`
 */
export const useReadStakingGetAvailableBalance =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'getAvailableBalance',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"shareBalances"`
 */
export const useReadStakingShareBalances = /*#__PURE__*/ createUseReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'shareBalances',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"tokenAccounting"`
 */
export const useReadStakingTokenAccounting =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'tokenAccounting',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"tokenInfo"`
 */
export const useReadStakingTokenInfo = /*#__PURE__*/ createUseReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'tokenInfo',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"totalOwed"`
 */
export const useReadStakingTotalOwed = /*#__PURE__*/ createUseReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'totalOwed',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"depositDelay"`
 */
export const useReadStakingDepositDelay = /*#__PURE__*/ createUseReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'depositDelay',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"manager"`
 */
export const useReadStakingManager = /*#__PURE__*/ createUseReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'manager',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"unstakeDelay"`
 */
export const useReadStakingUnstakeDelay = /*#__PURE__*/ createUseReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'unstakeDelay',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"owner"`
 */
export const useReadStakingOwner = /*#__PURE__*/ createUseReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"ownershipHandoverExpiresAt"`
 */
export const useReadStakingOwnershipHandoverExpiresAt =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'ownershipHandoverExpiresAt',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__
 */
export const useWriteStaking = /*#__PURE__*/ createUseWriteContract({
  abi: stakingAbi,
  address: stakingAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"addAcceptedToken"`
 */
export const useWriteStakingAddAcceptedToken =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'addAcceptedToken',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"removeAcceptedToken"`
 */
export const useWriteStakingRemoveAcceptedToken =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'removeAcceptedToken',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"addAuthorizedGame"`
 */
export const useWriteStakingAddAuthorizedGame =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'addAuthorizedGame',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"removeAuthorizedGame"`
 */
export const useWriteStakingRemoveAuthorizedGame =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'removeAuthorizedGame',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"finalizeRemoveAuthorizedGame"`
 */
export const useWriteStakingFinalizeRemoveAuthorizedGame =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'finalizeRemoveAuthorizedGame',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"requestStake"`
 */
export const useWriteStakingRequestStake = /*#__PURE__*/ createUseWriteContract(
  { abi: stakingAbi, address: stakingAddress, functionName: 'requestStake' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"finalizeStake"`
 */
export const useWriteStakingFinalizeStake =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'finalizeStake',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"cancelExpiredStakeRequest"`
 */
export const useWriteStakingCancelExpiredStakeRequest =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'cancelExpiredStakeRequest',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"requestUnstake"`
 */
export const useWriteStakingRequestUnstake =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'requestUnstake',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"finalizeUnstake"`
 */
export const useWriteStakingFinalizeUnstake =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'finalizeUnstake',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"cancelExpiredUnstakeRequest"`
 */
export const useWriteStakingCancelExpiredUnstakeRequest =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'cancelExpiredUnstakeRequest',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"lockLiquidity"`
 */
export const useWriteStakingLockLiquidity =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'lockLiquidity',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"unlockLiquidity"`
 */
export const useWriteStakingUnlockLiquidity =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'unlockLiquidity',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"forceUnlockLiquidity"`
 */
export const useWriteStakingForceUnlockLiquidity =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'forceUnlockLiquidity',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"claimPendingPayout"`
 */
export const useWriteStakingClaimPendingPayout =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'claimPendingPayout',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"transferPayout"`
 */
export const useWriteStakingTransferPayout =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'transferPayout',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"setCooldownPeriod"`
 */
export const useWriteStakingSetCooldownPeriod =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'setCooldownPeriod',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"setDepositDelay"`
 */
export const useWriteStakingSetDepositDelay =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'setDepositDelay',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"setManager"`
 */
export const useWriteStakingSetManager = /*#__PURE__*/ createUseWriteContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'setManager',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"setMaxLiquidityPercentage"`
 */
export const useWriteStakingSetMaxLiquidityPercentage =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'setMaxLiquidityPercentage',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"cancelOwnershipHandover"`
 */
export const useWriteStakingCancelOwnershipHandover =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'cancelOwnershipHandover',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"completeOwnershipHandover"`
 */
export const useWriteStakingCompleteOwnershipHandover =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'completeOwnershipHandover',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteStakingRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"requestOwnershipHandover"`
 */
export const useWriteStakingRequestOwnershipHandover =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'requestOwnershipHandover',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteStakingTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__
 */
export const useSimulateStaking = /*#__PURE__*/ createUseSimulateContract({
  abi: stakingAbi,
  address: stakingAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"addAcceptedToken"`
 */
export const useSimulateStakingAddAcceptedToken =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'addAcceptedToken',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"removeAcceptedToken"`
 */
export const useSimulateStakingRemoveAcceptedToken =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'removeAcceptedToken',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"addAuthorizedGame"`
 */
export const useSimulateStakingAddAuthorizedGame =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'addAuthorizedGame',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"removeAuthorizedGame"`
 */
export const useSimulateStakingRemoveAuthorizedGame =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'removeAuthorizedGame',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"finalizeRemoveAuthorizedGame"`
 */
export const useSimulateStakingFinalizeRemoveAuthorizedGame =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'finalizeRemoveAuthorizedGame',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"requestStake"`
 */
export const useSimulateStakingRequestStake =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'requestStake',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"finalizeStake"`
 */
export const useSimulateStakingFinalizeStake =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'finalizeStake',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"cancelExpiredStakeRequest"`
 */
export const useSimulateStakingCancelExpiredStakeRequest =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'cancelExpiredStakeRequest',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"requestUnstake"`
 */
export const useSimulateStakingRequestUnstake =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'requestUnstake',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"finalizeUnstake"`
 */
export const useSimulateStakingFinalizeUnstake =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'finalizeUnstake',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"cancelExpiredUnstakeRequest"`
 */
export const useSimulateStakingCancelExpiredUnstakeRequest =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'cancelExpiredUnstakeRequest',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"lockLiquidity"`
 */
export const useSimulateStakingLockLiquidity =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'lockLiquidity',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"unlockLiquidity"`
 */
export const useSimulateStakingUnlockLiquidity =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'unlockLiquidity',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"forceUnlockLiquidity"`
 */
export const useSimulateStakingForceUnlockLiquidity =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'forceUnlockLiquidity',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"claimPendingPayout"`
 */
export const useSimulateStakingClaimPendingPayout =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'claimPendingPayout',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"transferPayout"`
 */
export const useSimulateStakingTransferPayout =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'transferPayout',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"setCooldownPeriod"`
 */
export const useSimulateStakingSetCooldownPeriod =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'setCooldownPeriod',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"setDepositDelay"`
 */
export const useSimulateStakingSetDepositDelay =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'setDepositDelay',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"setManager"`
 */
export const useSimulateStakingSetManager =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'setManager',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"setMaxLiquidityPercentage"`
 */
export const useSimulateStakingSetMaxLiquidityPercentage =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'setMaxLiquidityPercentage',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"cancelOwnershipHandover"`
 */
export const useSimulateStakingCancelOwnershipHandover =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'cancelOwnershipHandover',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"completeOwnershipHandover"`
 */
export const useSimulateStakingCompleteOwnershipHandover =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'completeOwnershipHandover',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateStakingRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"requestOwnershipHandover"`
 */
export const useSimulateStakingRequestOwnershipHandover =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'requestOwnershipHandover',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateStakingTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__
 */
export const useWatchStakingEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakingAbi,
  address: stakingAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"CooldownPeriodUpdated"`
 */
export const useWatchStakingCooldownPeriodUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: 'CooldownPeriodUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"DepositDelayUpdated"`
 */
export const useWatchStakingDepositDelayUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: 'DepositDelayUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"ForcedLiquidityUnlocked"`
 */
export const useWatchStakingForcedLiquidityUnlockedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: 'ForcedLiquidityUnlocked',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"GameAuthorized"`
 */
export const useWatchStakingGameAuthorizedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: 'GameAuthorized',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"GameRemovalInitiated"`
 */
export const useWatchStakingGameRemovalInitiatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: 'GameRemovalInitiated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"GameUnauthorized"`
 */
export const useWatchStakingGameUnauthorizedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: 'GameUnauthorized',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"ManagerUpdated"`
 */
export const useWatchStakingManagerUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: 'ManagerUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"MaxLiquidityPercentageUpdated"`
 */
export const useWatchStakingMaxLiquidityPercentageUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: 'MaxLiquidityPercentageUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"OwnershipHandoverCanceled"`
 */
export const useWatchStakingOwnershipHandoverCanceledEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: 'OwnershipHandoverCanceled',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"OwnershipHandoverRequested"`
 */
export const useWatchStakingOwnershipHandoverRequestedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: 'OwnershipHandoverRequested',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchStakingOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"PayoutTransferred"`
 */
export const useWatchStakingPayoutTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: 'PayoutTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"RewardClaimed"`
 */
export const useWatchStakingRewardClaimedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: 'RewardClaimed',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"StakeRefunded"`
 */
export const useWatchStakingStakeRefundedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: 'StakeRefunded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"StakeRequested"`
 */
export const useWatchStakingStakeRequestedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: 'StakeRequested',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"Staked"`
 */
export const useWatchStakingStakedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: 'Staked',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"TokenAdded"`
 */
export const useWatchStakingTokenAddedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: 'TokenAdded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"TokenRemoved"`
 */
export const useWatchStakingTokenRemovedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: 'TokenRemoved',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"TransferFailed"`
 */
export const useWatchStakingTransferFailedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: 'TransferFailed',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"UnstakeRequested"`
 */
export const useWatchStakingUnstakeRequestedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: 'UnstakeRequested',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"Unstaked"`
 */
export const useWatchStakingUnstakedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: 'Unstaked',
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
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"acceptedTokens"`
 */
export const useReadZaarflipAcceptedTokens =
  /*#__PURE__*/ createUseReadContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'acceptedTokens',
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
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"isGamePending"`
 */
export const useReadZaarflipIsGamePending = /*#__PURE__*/ createUseReadContract(
  { abi: zaarflipAbi, address: zaarflipAddress, functionName: 'isGamePending' },
)

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
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zaarflipAbi}__
 */
export const useWriteZaarflip = /*#__PURE__*/ createUseWriteContract({
  abi: zaarflipAbi,
  address: zaarflipAddress,
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
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"cancelGame"`
 */
export const useWriteZaarflipCancelGame = /*#__PURE__*/ createUseWriteContract({
  abi: zaarflipAbi,
  address: zaarflipAddress,
  functionName: 'cancelGame',
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
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"claimPendingWithdrawal"`
 */
export const useWriteZaarflipClaimPendingWithdrawal =
  /*#__PURE__*/ createUseWriteContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'claimPendingWithdrawal',
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
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"completeOwnershipHandover"`
 */
export const useWriteZaarflipCompleteOwnershipHandover =
  /*#__PURE__*/ createUseWriteContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'completeOwnershipHandover',
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
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"removeAcceptedToken"`
 */
export const useWriteZaarflipRemoveAcceptedToken =
  /*#__PURE__*/ createUseWriteContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'removeAcceptedToken',
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
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"addAcceptedToken"`
 */
export const useSimulateZaarflipAddAcceptedToken =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'addAcceptedToken',
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
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"cancelOwnershipHandover"`
 */
export const useSimulateZaarflipCancelOwnershipHandover =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'cancelOwnershipHandover',
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
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"completeGame"`
 */
export const useSimulateZaarflipCompleteGame =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'completeGame',
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
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"flip"`
 */
export const useSimulateZaarflipFlip = /*#__PURE__*/ createUseSimulateContract({
  abi: zaarflipAbi,
  address: zaarflipAddress,
  functionName: 'flip',
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
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zaarflipAbi}__ and `eventName` set to `"TestBytes"`
 */
export const useWatchZaarflipTestBytesEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    eventName: 'TestBytes',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zaarflipAbi}__ and `eventName` set to `"TestBytesCompleteGame"`
 */
export const useWatchZaarflipTestBytesCompleteGameEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    eventName: 'TestBytesCompleteGame',
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
