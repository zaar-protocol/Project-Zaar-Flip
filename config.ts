import { type Chain } from 'viem'
import { Config, createConfig, http } from 'wagmi';

export const initia = {
  id: 1335097526422335,
  name: 'zaar-mainnet-1',
  nativeCurrency: { name: 'INIT', symbol: 'INIT', decimals: 18 },
  blockExplorers: {
    default: {
      name: 'Initia Scan',
      url: 'https://scan.initia.xyz/zaar-mainnet-1',
    },
  },
  rpcUrls: {
    default: {
      http: ['https://jsonrpc-zaar-mainnet-1.anvil.asia-southeast.initia.xyz/'], // Use array of URLs
    },
  },
} as const satisfies Chain

export const config: Config = createConfig({
  chains: [initia],
  transports: {
    [initia.id]: http('https://jsonrpc-zaar-mainnet-1.anvil.asia-southeast.initia.xyz/'),
  },
  ssr: true,
})