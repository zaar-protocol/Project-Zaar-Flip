
import {mainnet} from 'wagmi/chains';
import { type Chain } from 'viem'
import { Config, createConfig, http } from 'wagmi';

export const initia = {
  id: 2285582334439122,
  name: 'zaar-testnet-4',
  nativeCurrency: { name: 'fZAAR', symbol: 'fZAAR', decimals: 18 },
  blockExplorers: {
    default: {
      name: 'Initia Scan',
      url: 'https://scan.testnet.initia.xyz/zaar-testnet-4',
    },
  },
  rpcUrls: {
    default: {
      http: ['https://jsonrpc-0-zaar-testnet-4.anvil.asia-southeast.initia.xyz/'], // Use array of URLs
    },
  },
} as const satisfies Chain

export const config: Config = createConfig({
  chains: [initia],
  transports: {
    [initia.id]: http('https://jsonrpc-0-zaar-testnet-4.anvil.asia-southeast.initia.xyz/'),
  },
  ssr: true,
})