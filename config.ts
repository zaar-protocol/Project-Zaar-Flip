
import {mainnet} from 'wagmi/chains';
import { type Chain } from 'viem'
import { Config, createConfig, http } from 'wagmi';

export const initia = {
  id: 3710952917853191,
  name: 'zaar-testnet-3',
  nativeCurrency: { name: 'fZAAR', symbol: 'fZAAR', decimals: 18 },
  blockExplorers: {
    default: {
      name: 'Initia Scan',
      url: 'https://scan.testnet.initia.xyz/zaar-testnet-3',
    },
  },
  rpcUrls: {
    default: {
      http: ['https://jsonrpc-1-zaar-testnet-3.anvil.initia.xyz'], // Use array of URLs
    },
  },
} as const satisfies Chain

export const config: Config = createConfig({
  chains: [initia],
  transports: {
    [initia.id]: http('https://jsonrpc-1-zaar-testnet-3.anvil.initia.xyz'),
  },
  ssr: true,
})

// export const config = getDefaultConfig({
//     appName: 'ZaarFlip',
//     projectId: '07a5775d26541dd4c353432b24a75b30',
//     chains: [
//       initia,
//     ],
//     ssr: true,
//   });