import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import {mainnet} from 'wagmi/chains';
import { type Chain } from 'viem'

export const initia = {
  id: 2594729740794688,
  name: 'initia',
  nativeCurrency: { name: 'GAS', symbol: '	GAS', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://json-rpc.stoneevm-16.initia.xyz'], // Use array of URLs
    },
  },
  blockExplorers: {
    default: { name: 'Initia', url: 'https://json-rpc.stoneevm-16.initia.xyz' },
  },
} as const satisfies Chain

export const config = getDefaultConfig({
    appName: 'ZaarFlip',
    projectId: '07a5775d26541dd4c353432b24a75b30',
    chains: [
      initia,
    ],
    ssr: true,
  });