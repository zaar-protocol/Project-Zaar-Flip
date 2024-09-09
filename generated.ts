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
  '0xD5DeDc655a3000dF6318151940b3311f7a4cc931' as const

export const initiaTokenConfig = {
  address: initiaTokenAddress,
  abi: initiaTokenAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// zaarflip
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const zaarflipAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_stakingToken', internalType: 'address', type: 'address' },
      { name: '_maxCoins', internalType: 'uint256', type: 'uint256' },
      { name: '_feePercentage', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
  },
  { type: 'receive', stateMutability: 'payable' },
  {
    type: 'function',
    inputs: [],
    name: 'COOLDOWN_PERIOD',
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
    inputs: [],
    name: 'accumulatedFees',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
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
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'earned',
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
    inputs: [
      { name: 'betAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'numberOfCoins', internalType: 'uint256', type: 'uint256' },
      { name: 'headsRequired', internalType: 'uint256', type: 'uint256' },
      { name: 'token', internalType: 'address', type: 'address' },
    ],
    name: 'flip',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getReward',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'lastRewardPerTokenPaid',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'lastStakeTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'lastUpdateTime',
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
    inputs: [],
    name: 'rewardPerToken',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'rewardPerTokenStored',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'rewards',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
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
    inputs: [{ name: '_maxCoins', internalType: 'uint256', type: 'uint256' }],
    name: 'setMaxCoins',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'stake',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'stakedBalances',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'stakingToken',
    outputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'timeUntilUnstake',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalStaked',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
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
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'unstake',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'withdrawFunds',
    outputs: [],
    stateMutability: 'nonpayable',
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
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'reward',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'RewardPaid',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
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
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
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

export const zaarflipAddress =
  '0xea61cfA2508A27b149D475C9DDD89C77846Baaa6' as const

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
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zaarflipAbi}__
 */
export const useReadZaarflip = /*#__PURE__*/ createUseReadContract({
  abi: zaarflipAbi,
  address: zaarflipAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"COOLDOWN_PERIOD"`
 */
export const useReadZaarflipCooldownPeriod =
  /*#__PURE__*/ createUseReadContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'COOLDOWN_PERIOD',
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
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"accumulatedFees"`
 */
export const useReadZaarflipAccumulatedFees =
  /*#__PURE__*/ createUseReadContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'accumulatedFees',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"earned"`
 */
export const useReadZaarflipEarned = /*#__PURE__*/ createUseReadContract({
  abi: zaarflipAbi,
  address: zaarflipAddress,
  functionName: 'earned',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"feePercentage"`
 */
export const useReadZaarflipFeePercentage = /*#__PURE__*/ createUseReadContract(
  { abi: zaarflipAbi, address: zaarflipAddress, functionName: 'feePercentage' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"lastRewardPerTokenPaid"`
 */
export const useReadZaarflipLastRewardPerTokenPaid =
  /*#__PURE__*/ createUseReadContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'lastRewardPerTokenPaid',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"lastStakeTime"`
 */
export const useReadZaarflipLastStakeTime = /*#__PURE__*/ createUseReadContract(
  { abi: zaarflipAbi, address: zaarflipAddress, functionName: 'lastStakeTime' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"lastUpdateTime"`
 */
export const useReadZaarflipLastUpdateTime =
  /*#__PURE__*/ createUseReadContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'lastUpdateTime',
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
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"rewardPerToken"`
 */
export const useReadZaarflipRewardPerToken =
  /*#__PURE__*/ createUseReadContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'rewardPerToken',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"rewardPerTokenStored"`
 */
export const useReadZaarflipRewardPerTokenStored =
  /*#__PURE__*/ createUseReadContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'rewardPerTokenStored',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"rewards"`
 */
export const useReadZaarflipRewards = /*#__PURE__*/ createUseReadContract({
  abi: zaarflipAbi,
  address: zaarflipAddress,
  functionName: 'rewards',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"stakedBalances"`
 */
export const useReadZaarflipStakedBalances =
  /*#__PURE__*/ createUseReadContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'stakedBalances',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"stakingToken"`
 */
export const useReadZaarflipStakingToken = /*#__PURE__*/ createUseReadContract({
  abi: zaarflipAbi,
  address: zaarflipAddress,
  functionName: 'stakingToken',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"timeUntilUnstake"`
 */
export const useReadZaarflipTimeUntilUnstake =
  /*#__PURE__*/ createUseReadContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'timeUntilUnstake',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"totalStaked"`
 */
export const useReadZaarflipTotalStaked = /*#__PURE__*/ createUseReadContract({
  abi: zaarflipAbi,
  address: zaarflipAddress,
  functionName: 'totalStaked',
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
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"flip"`
 */
export const useWriteZaarflipFlip = /*#__PURE__*/ createUseWriteContract({
  abi: zaarflipAbi,
  address: zaarflipAddress,
  functionName: 'flip',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"getReward"`
 */
export const useWriteZaarflipGetReward = /*#__PURE__*/ createUseWriteContract({
  abi: zaarflipAbi,
  address: zaarflipAddress,
  functionName: 'getReward',
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
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"setMaxCoins"`
 */
export const useWriteZaarflipSetMaxCoins = /*#__PURE__*/ createUseWriteContract(
  { abi: zaarflipAbi, address: zaarflipAddress, functionName: 'setMaxCoins' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"stake"`
 */
export const useWriteZaarflipStake = /*#__PURE__*/ createUseWriteContract({
  abi: zaarflipAbi,
  address: zaarflipAddress,
  functionName: 'stake',
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
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"unstake"`
 */
export const useWriteZaarflipUnstake = /*#__PURE__*/ createUseWriteContract({
  abi: zaarflipAbi,
  address: zaarflipAddress,
  functionName: 'unstake',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"withdrawFunds"`
 */
export const useWriteZaarflipWithdrawFunds =
  /*#__PURE__*/ createUseWriteContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'withdrawFunds',
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
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"flip"`
 */
export const useSimulateZaarflipFlip = /*#__PURE__*/ createUseSimulateContract({
  abi: zaarflipAbi,
  address: zaarflipAddress,
  functionName: 'flip',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"getReward"`
 */
export const useSimulateZaarflipGetReward =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'getReward',
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
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"setMaxCoins"`
 */
export const useSimulateZaarflipSetMaxCoins =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'setMaxCoins',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"stake"`
 */
export const useSimulateZaarflipStake = /*#__PURE__*/ createUseSimulateContract(
  { abi: zaarflipAbi, address: zaarflipAddress, functionName: 'stake' },
)

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
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"unstake"`
 */
export const useSimulateZaarflipUnstake =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'unstake',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"withdrawFunds"`
 */
export const useSimulateZaarflipWithdrawFunds =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'withdrawFunds',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zaarflipAbi}__
 */
export const useWatchZaarflipEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: zaarflipAbi,
  address: zaarflipAddress,
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
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zaarflipAbi}__ and `eventName` set to `"RewardPaid"`
 */
export const useWatchZaarflipRewardPaidEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    eventName: 'RewardPaid',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zaarflipAbi}__ and `eventName` set to `"Staked"`
 */
export const useWatchZaarflipStakedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    eventName: 'Staked',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zaarflipAbi}__ and `eventName` set to `"Unstaked"`
 */
export const useWatchZaarflipUnstakedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    eventName: 'Unstaked',
  })
