
import {mainnet} from 'wagmi/chains';
import { type Chain } from 'viem'
import { Config, createConfig, http } from 'wagmi';
import { authConnector } from '@web3modal/wagmi'

export const initia = {
  id: 3710952917853191,
  name: 'zaar-testnet-3',
  nativeCurrency: { name: 'MTK', symbol: 'MTK', decimals: 18 },
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
  connectors: [
    authConnector({
      chains: [initia],
      options: { projectId: '07a5775d26541dd4c353432b24a75b30' },
      email: true,
      socials: ['google', 'x', 'github', 'discord', 'apple', 'facebook', 'farcaster'],
      showWallets: true,
      walletFeatures: true,
    })
  ],
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