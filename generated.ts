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
  '0x58dA30dA557A48ab0c6941699baFFA01401aea64' as const

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
      { name: '_maxCoins', type: 'uint256' },
      { name: '_feePercentage', type: 'uint256' },
      { name: '_vrfProvider', type: 'address' },
      { name: '_stakingContract', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_maxCoins', type: 'uint256' }],
    name: 'setMaxCoins',
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
    inputs: [
      { name: 'betAmount', type: 'uint256' },
      { name: 'numberOfCoins', type: 'uint256' },
      { name: 'headsRequired', type: 'uint256' },
      { name: 'token', type: 'address' },
    ],
    name: 'flip',
    outputs: [{ name: '', type: 'bytes32' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'seed', type: 'string' },
      { name: 'time', type: 'uint64' },
      { name: 'result', type: 'bytes32' },
    ],
    name: 'consume',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'maxCoins',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
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
    name: 'COOLDOWN_PERIOD',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_RETRIES',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'RETRY_DELAY',
    outputs: [{ name: '', type: 'uint256' }],
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
    name: 'latestRandomness',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'resultReceived',
    outputs: [{ name: '', type: 'bool' }],
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
    name: 'lastFlipTimestamp',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', type: 'bytes32' }],
    name: 'pendingGames',
    outputs: [
      { name: 'player', type: 'address' },
      { name: 'betAmount', type: 'uint256' },
      { name: 'numberOfCoins', type: 'uint256' },
      { name: 'headsRequired', type: 'uint256' },
      { name: 'token', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', type: 'bytes32' }],
    name: 'isGamePending',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'player', type: 'address', indexed: true },
      { name: 'won', type: 'bool', indexed: false },
      { name: 'payout', type: 'uint256', indexed: false },
    ],
    name: 'GameResult',
  },
  { type: 'event', anonymous: false, inputs: [], name: 'Blah' },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '', type: 'uint256', indexed: false }],
    name: 'Bloop',
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
    inputs: [
      { name: 'gameId', type: 'bytes32', indexed: true },
      { name: 'player', type: 'address', indexed: true },
      { name: 'betAmount', type: 'uint256', indexed: false },
      { name: 'numberOfCoins', type: 'uint256', indexed: false },
      { name: 'headsRequired', type: 'uint256', indexed: false },
      { name: 'token', type: 'address', indexed: false },
    ],
    name: 'GameCreated',
  },
] as const

export const zaarflipAddress =
  '0x397BFd2415B7688D9e65748c5E8066284284345E' as const

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
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"maxCoins"`
 */
export const useReadZaarflipMaxCoins = /*#__PURE__*/ createUseReadContract({
  abi: zaarflipAbi,
  address: zaarflipAddress,
  functionName: 'maxCoins',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"feePercentage"`
 */
export const useReadZaarflipFeePercentage = /*#__PURE__*/ createUseReadContract(
  { abi: zaarflipAbi, address: zaarflipAddress, functionName: 'feePercentage' },
)

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
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"MAX_RETRIES"`
 */
export const useReadZaarflipMaxRetries = /*#__PURE__*/ createUseReadContract({
  abi: zaarflipAbi,
  address: zaarflipAddress,
  functionName: 'MAX_RETRIES',
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
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"vrfProvider"`
 */
export const useReadZaarflipVrfProvider = /*#__PURE__*/ createUseReadContract({
  abi: zaarflipAbi,
  address: zaarflipAddress,
  functionName: 'vrfProvider',
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
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"latestRandomness"`
 */
export const useReadZaarflipLatestRandomness =
  /*#__PURE__*/ createUseReadContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'latestRandomness',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"resultReceived"`
 */
export const useReadZaarflipResultReceived =
  /*#__PURE__*/ createUseReadContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'resultReceived',
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
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"lastFlipTimestamp"`
 */
export const useReadZaarflipLastFlipTimestamp =
  /*#__PURE__*/ createUseReadContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'lastFlipTimestamp',
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
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"isGamePending"`
 */
export const useReadZaarflipIsGamePending = /*#__PURE__*/ createUseReadContract(
  { abi: zaarflipAbi, address: zaarflipAddress, functionName: 'isGamePending' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zaarflipAbi}__
 */
export const useWriteZaarflip = /*#__PURE__*/ createUseWriteContract({
  abi: zaarflipAbi,
  address: zaarflipAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"setMaxCoins"`
 */
export const useWriteZaarflipSetMaxCoins = /*#__PURE__*/ createUseWriteContract(
  { abi: zaarflipAbi, address: zaarflipAddress, functionName: 'setMaxCoins' },
)

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
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"flip"`
 */
export const useWriteZaarflipFlip = /*#__PURE__*/ createUseWriteContract({
  abi: zaarflipAbi,
  address: zaarflipAddress,
  functionName: 'flip',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"consume"`
 */
export const useWriteZaarflipConsume = /*#__PURE__*/ createUseWriteContract({
  abi: zaarflipAbi,
  address: zaarflipAddress,
  functionName: 'consume',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zaarflipAbi}__
 */
export const useSimulateZaarflip = /*#__PURE__*/ createUseSimulateContract({
  abi: zaarflipAbi,
  address: zaarflipAddress,
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
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"setFeePercentage"`
 */
export const useSimulateZaarflipSetFeePercentage =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'setFeePercentage',
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
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"flip"`
 */
export const useSimulateZaarflipFlip = /*#__PURE__*/ createUseSimulateContract({
  abi: zaarflipAbi,
  address: zaarflipAddress,
  functionName: 'flip',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zaarflipAbi}__ and `functionName` set to `"consume"`
 */
export const useSimulateZaarflipConsume =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    functionName: 'consume',
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
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zaarflipAbi}__ and `eventName` set to `"Blah"`
 */
export const useWatchZaarflipBlahEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    eventName: 'Blah',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zaarflipAbi}__ and `eventName` set to `"Bloop"`
 */
export const useWatchZaarflipBloopEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    eventName: 'Bloop',
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
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zaarflipAbi}__ and `eventName` set to `"GameCreated"`
 */
export const useWatchZaarflipGameCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zaarflipAbi,
    address: zaarflipAddress,
    eventName: 'GameCreated',
  })
