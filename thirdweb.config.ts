import { defineChain } from "thirdweb";

export const thirdwebInitiaChain = defineChain({
    id: 3710952917853191,
    name: "zaar-testnet",
    rpc: 'https://jsonrpc-1-zaar-testnet-3.anvil.initia.xyz',
    nativeCurrency: { name: 'MTK', symbol: 'MTK', decimals: 18 }
})

